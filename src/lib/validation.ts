import { Place } from "./types";

export type PlaceDraft = {
    name: string;
    notes: string;
    category: string;
};

export type FormErrors = {
    name?: string;
    notes?: string;
    category?: string;
};

export const categories = ["city", "nature", "food", "other"];

function isValidCategory(value: string): boolean {
    return categories.includes(value.trim().toLowerCase());
}

// Same input, same output, no state and no screen. That is what "pure" means,
// and it is the whole reason this can be tested while the Add screen cannot.
export function validatePlaceForm(
    draft: PlaceDraft,
    places: Place[],
): FormErrors {
    const errors: FormErrors = {};
    if (!draft.name.trim()) errors.name = "Name is required.";
    if (draft.name.trim().length > 40) {
        errors.name = "Name must be 40 characters or fewer.";
    }
    if (/^\d+$/.test(draft.name.trim())) {
        errors.name = "A name can't be only numbers.";
    }
    if (draft.name.trim().length === 1) {
        errors.name = "Name must be at least 2 characters.";
    }
    if (places.some((p) => p.name === draft.name.trim())) {
        errors.name = "That place is already in the list.";
    }
    if (draft.notes.trim().length > 200) {
        errors.notes = "Notes must be 200 characters or fewer.";
    }
    if (!isValidCategory(draft.category)) {
        errors.category = `Category must be one of: ${categories.join(", ")}.`;
    }
    return errors;
}

export function isValid(errors: FormErrors): boolean {
    return Object.keys(errors).length === 0;
}
