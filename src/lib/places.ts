import { Place } from "./types";

// The order of the Places list, out of the screen. Pure: it returns a new sorted list
// and never changes the one it was given (that would change the provider's state).
export function sortPlacesByName(places: Place[]): Place[] {
    return [...places].sort((a, b) => a.name.localeCompare(b.name));
}
