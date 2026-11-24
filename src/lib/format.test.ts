import { formatPopulation } from "./format";

describe("formatPopulation", () => {
    it("shows millions with one decimal", () => {
        expect(formatPopulation(1762949)).toBe("1.8M");
    });

    it("shows thousands with a K", () => {
        expect(formatPopulation(45000)).toBe("45K");
    });

    it("leaves small numbers as they are", () => {
        expect(formatPopulation(812)).toBe("812");
    });

    it("shows zero as 0", () => {
        expect(formatPopulation(0)).toBe("0");
    });

    it("puts a minus in front of a negative number", () => {
        expect(formatPopulation(-45000)).toBe("-45K");
    });
});
