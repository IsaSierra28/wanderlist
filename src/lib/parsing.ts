import { Place } from "./types";

// What the stored text means. No AsyncStorage here, so a test can call it
// without a phone. storage.ts keeps only the part that touches the device.
export function parsePlaces(raw: string | null): Place[] | null {
    // null is not an error: it is what a brand new install looks like.
    if (!raw) return null;

    let parsed: unknown;
    try {
        parsed = JSON.parse(raw);
    } catch {
        // Half-written or hand-edited storage. Starting fresh beats a crash on launch.
        return null;
    }

    // Storage keeps whatever an older version of the app wrote into it.
    if (!Array.isArray(parsed)) return null;

    // Keep only what looks like a place: drop a place with no name, or a 42.
    return parsed.filter(isPlace);
}

function isPlace(item: unknown): item is Place {
    return (
        typeof item === "object" &&
        item !== null &&
        typeof (item as Place).name === "string"
    );
}
