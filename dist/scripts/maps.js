// Main characters map with all character data
export const charactersMap = {
    // Vowels (for testing)
    a: { replacement: "a", label: "Lowercase A" },
    e: { replacement: "e", label: "Lowercase E" },
    i: { replacement: "i", label: "Lowercase I" },
    o: { replacement: "o", label: "Lowercase O" },
    u: { replacement: "u", label: "Lowercase U" },
    // Invisible Unicode characters
    "\u200B": { replacement: "␣", label: "Zero-width space" },
    "\u200C": { replacement: "⁠", label: "Zero-width non-joiner" },
    "\u200D": { replacement: "‍", label: "Zero-width joiner" },
    "\u2060": { replacement: "⁠", label: "Word joiner" },
    "\u2061": { replacement: "⁡", label: "Function application" },
    "\u2062": { replacement: "⁢", label: "Invisible times" },
    "\u2063": { replacement: "⁣", label: "Invisible separator" },
    "\u2064": { replacement: "⁤", label: "Invisible plus" },
    "\uFEFF": { replacement: "⁥", label: "Zero-width non-breaking space" },
};
// Function to create a fresh count object
export const createCountObject = () => {
    // Initialize count object
    const countData = {
        totalCount: 0,
        byCharacter: {},
    };
    // Initialize counts for each character
    Object.keys(charactersMap).forEach((char) => {
        countData.byCharacter[char] = 0;
    });
    return countData;
};
// Function to update count for a character
export const incrementCharCount = (countData, char) => {
    // Increment counts
    countData.totalCount++;
    countData.byCharacter[char.toLowerCase()]++;
};
// Helper functions
export const isTrackedCharacter = (char) => {
    return !!charactersMap[char.toLowerCase()];
};
export const getCharacterData = (char) => {
    return charactersMap[char.toLowerCase()];
};
