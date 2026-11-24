import { parsePlaces } from "./parsing";
import { Place } from "./types";

describe("parsePlaces", () => {
    it("returns null on a brand new install", () => {
        expect(parsePlaces(null)).toBeNull();
    });

    it("returns null when the stored text is not JSON", () => {
        expect(parsePlaces("{ half a write")).toBeNull();
    });

    it("returns null when the stored JSON is not a list", () => {
        expect(parsePlaces('{"name":"Kyoto"}')).toBeNull();
    });

    it("returns null when storage holds an empty string", () => {
        expect(parsePlaces("")).toBeNull();
    });

    it("returns null when storage holds the text null", () => {
        expect(parsePlaces("null")).toBeNull();
    });

    it("drops a place that has no name", () => {
        const raw = JSON.stringify([
            { id: "kyoto", name: "Kyoto", category: "city" },
            { id: "ghost", category: "city" },
        ]);
        expect(parsePlaces(raw)).toEqual([{ id: "kyoto", name: "Kyoto", category: "city" }]);
    });

    it("drops something in the list that is not a place, like 42", () => {
        const raw = JSON.stringify([42, { id: "kyoto", name: "Kyoto", category: "city" }]);
        expect(parsePlaces(raw)).toEqual([{ id: "kyoto", name: "Kyoto", category: "city" }]);
    });

    it("gives back exactly what savePlaces wrote (round trip)", () => {
        const places: Place[] = [
            { id: "kyoto", name: "Kyoto", notes: "Temples in autumn", category: "city" },
            { id: "banff", name: "Banff", category: "nature", photoUri: "file:///photo.jpg" },
        ];
        expect(parsePlaces(JSON.stringify(places))).toEqual(places);
    });

    it("returns the places when the stored text is a list", () => {
        const raw = JSON.stringify([{ id: "kyoto", name: "Kyoto", category: "city" }]);
        expect(parsePlaces(raw)).toEqual([{ id: "kyoto", name: "Kyoto", category: "city" }]);
    });
});
