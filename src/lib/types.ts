export type Place = {
    id: string;
    name: string;
    notes?: string;
    photoUri?: string;
    category: "city" | "nature" | "food" | "other";
};
