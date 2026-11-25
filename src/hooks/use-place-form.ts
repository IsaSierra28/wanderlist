import { router } from "expo-router";
import { useState } from "react";
import { usePlaces } from "../lib/places-context";
import { Place } from "../lib/types";
import { FormErrors, isValid, validatePlaceForm } from "../lib/validation";

// The screen logic of the Add form, out of the screen.
export function usePlaceForm() {
    const { places, addPlace } = usePlaces();
    const [name, setName] = useState("");
    const [notes, setNotes] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});

    function validate() {
        const found = validatePlaceForm({ name, notes, category }, places);
        setErrors(found);
        return isValid(found);
    }

    function submit() {
        if (!validate()) return;
        const newPlace: Place = {
            id: Date.now(),
            name: name.trim(),
            notes: notes.trim() || undefined,
            category: category.trim().toLowerCase() as Place["category"],
        };
        addPlace(newPlace);
        setName("");
        setNotes("");
        setCategory("");
        setErrors({});
        router.navigate("/");
    }

    return {
        places,
        name,
        setName,
        notes,
        setNotes,
        category,
        setCategory,
        errors,
        submit,
    };
}
