import { validatePlaceForm } from "./validation";

const goodDraft = { name: "Paris", notes: "", category: "city" };

describe("validatePlaceForm", () => {
    it("accepts a good place", () => {
        expect(validatePlaceForm(goodDraft, [])).toEqual({});
    });

    it("rejects an empty name", () => {
        const errors = validatePlaceForm({ ...goodDraft, name: "" }, []);
        expect(errors.name).toBe("Name is required.");
    });

    it("rejects a name that is only spaces", () => {
        const errors = validatePlaceForm({ ...goodDraft, name: "   " }, []);
        expect(errors.name).toBe("Name is required.");
    });

    it("rejects a name that is only numbers", () => {
        const errors = validatePlaceForm({ ...goodDraft, name: "123" }, []);
        expect(errors.name).toBe("A name can't be only numbers.");
    });

    it("rejects a one-letter name", () => {
        const errors = validatePlaceForm({ ...goodDraft, name: "a" }, []);
        expect(errors.name).toBe("Name must be at least 2 characters.");
    });

    it("rejects a category that is not in the list", () => {
        const errors = validatePlaceForm({ ...goodDraft, category: "beach" }, []);
        expect(errors.category).toBe("Category must be one of: city, nature, food, other.");
    });
});
