// Turns a big number into a short label for the screen: 1762949 -> "1.8M", 45000 -> "45K".
export function formatPopulation(n: number): string {
    // A negative number gets the same label with a minus in front: -45000 -> "-45K".
    if (n < 0) return "-" + formatPopulation(-n);

    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return Math.round(n / 1000) + "K";

    // Small numbers (and zero) stay as they are.
    return String(n);
}
