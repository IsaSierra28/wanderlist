import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loadPlaces, savePlaces } from "./storage";
import { Place } from "./types";

type PlacesValue = {
    places: Place[];
    addPlace: (place: Place) => void;
    clearPlaces: () => void;
    resetPlaces: () => void;
    removePlace: (id: string) => void;
    setPhoto: (id: string, photoUri?: string) => void;
};

const PlacesContext = createContext<PlacesValue | null>(null);

const startingPlaces: Place[] = [
    {
        id: "kyoto",
        name: "Kyoto",
        notes: "Temples in autumn",
        category: "city",
    },
    {
        id: "banff",
        name: "Banff",
        notes: "Lake Louise at sunrise",
        category: "nature",
    },
    {
        id: "lisbon",
        name: "Lisbon",
        notes: "Pasteis de nata tour",
        category: "food",
    },
];

export function PlacesProvider({ children }: { children: ReactNode }) {
    const [places, setPlaces] = useState<Place[]>(startingPlaces);
    const [ready, setReady] = useState(false);

    // Load on mount
    useEffect(() => {
        async function load() {
            const saved = await loadPlaces();
            if (saved) setPlaces(saved);
            setReady(true);
        }
        load();
    }, []);

    // Save when the places change
    useEffect(() => {
        if (!ready) return;
        savePlaces(places);
    }, [places, ready]);

    function addPlace(place: Place) {
        setPlaces([...places, place]);
    }

    function clearPlaces() {
        setPlaces([]);
    }

    function resetPlaces() {
        setPlaces(startingPlaces);
    }

    function removePlace(id: string) {
        setPlaces(places.filter((place) => place.id !== id));
    }

    function setPhoto(id: string, photoUri?: string) {
        setPlaces(
            places.map((place) => (place.id === id ? { ...place, photoUri } : place)),
        );
    }

    return (
        <PlacesContext.Provider value={{ places, addPlace, clearPlaces, resetPlaces, removePlace, setPhoto }}>
            {children}
        </PlacesContext.Provider>
    );
}

export function usePlaces() {
    const value = useContext(PlacesContext);
    if (!value) throw new Error("usePlaces must be used inside PlacesProvider");
    return value;
}
