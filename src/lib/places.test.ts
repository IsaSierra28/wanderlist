import { sortPlacesByName } from "./places";
import { Place } from "./types";

const kyoto: Place = { id: "kyoto", name: "Kyoto", category: "city" };
const banff: Place = { id: "banff", name: "Banff", category: "nature" };
const lisbon: Place = { id: "lisbon", name: "Lisbon", category: "food" };

describe("sortPlacesByName", () => {
    it("sorts the places by name", () => {
        const sorted = sortPlacesByName([kyoto, lisbon, banff]);
        expect(sorted.map((p) => p.name)).toEqual(["Banff", "Kyoto", "Lisbon"]);
    });

    it("does not change the list it was given", () => {
        const original = [kyoto, lisbon, banff];
        sortPlacesByName(original);
        expect(original.map((p) => p.name)).toEqual(["Kyoto", "Lisbon", "Banff"]);
    });

    it("returns an empty list when there are no places", () => {
        expect(sortPlacesByName([])).toEqual([]);
    });
});
