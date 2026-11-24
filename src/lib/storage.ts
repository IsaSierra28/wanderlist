import AsyncStorage from "@react-native-async-storage/async-storage";
import { parsePlaces } from "./parsing";
import { Place } from "./types";

const KEY = "wanderlist.places";

export async function savePlaces(places: Place[]) {
    // AsyncStorage stores text and nothing else - the array has to become a string.
    await AsyncStorage.setItem(KEY, JSON.stringify(places));
}

export async function loadPlaces(): Promise<Place[] | null> {
    // This file has to touch the device. Deciding what the stored text means
    // does not, so that half lives in parsing.ts, where a test can reach it.
    return parsePlaces(await AsyncStorage.getItem(KEY));
}
