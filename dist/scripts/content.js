"use strict";
document.body.style.border = "5px solid green";
const charactersMap = {
    a: { replacement: "x", label: "Lowercase A" },
    e: { replacement: "x", label: "Lowercase E" },
    i: { replacement: "x", label: "Lowercase I" },
    o: { replacement: "x", label: "Lowercase O" },
    u: { replacement: "x", label: "Lowercase U" },
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
const createCountObject = () => {
    const countData = {
        totalCount: 0,
        byCharacter: {},
    };
    Object.keys(charactersMap).forEach((char) => {
        countData.byCharacter[char] = 0;
    });
    return countData;
};
const isTrackedCharacter = (char) => {
    return !!charactersMap[char.toLowerCase()];
};
const getCharacterData = (char) => {
    return charactersMap[char.toLowerCase()];
};
const incrementCharCount = (countData, char) => {
    countData.totalCount++;
    countData.byCharacter[char.toLowerCase()]++;
};
const findForbiddenChars = () => {
    const countData = createCountObject();
    console.log("Starting search for forbidden characters");
    console.log("Characters being tracked:", Object.keys(charactersMap).map((char) => {
        if (char.charCodeAt(0) < 32 ||
            (char.charCodeAt(0) >= 0x200b && char.charCodeAt(0) <= 0xfeff)) {
            return `U+${char.charCodeAt(0).toString(16).padStart(4, "0")} (${charactersMap[char].label})`;
        }
        return `'${char}' (${charactersMap[char].label})`;
    }));
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    const nodesToProcess = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
        const parentNode = currentNode.parentNode;
        if (parentNode &&
            (parentNode.nodeName === "SCRIPT" ||
                parentNode.nodeName === "STYLE" ||
                parentNode.nodeName === "NOSCRIPT")) {
            continue;
        }
        if (currentNode.textContent && currentNode.textContent.trim()) {
            nodesToProcess.push(currentNode);
        }
    }
    console.log(`Found ${nodesToProcess.length} text nodes to process`);
    nodesToProcess.forEach((textNode, index) => {
        const text = textNode.textContent || "";
        // Check if this text contains any target characters
        let hasTarget = false;
        const foundChars = [];
        for (const char of text.toLowerCase()) {
            if (isTrackedCharacter(char)) {
                hasTarget = true;
                foundChars.push({
                    char,
                    charCode: char.charCodeAt(0),
                    hexCode: `U+${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
                });
            }
        }
        if (!hasTarget)
            return;
        console.log(`Node #${index}: Found ${foundChars.length} target characters in text "${text.substring(0, 50)}${text.length > 50 ? "..." : ""}"`);
        console.log("Characters:", foundChars);
        console.log("Node parent:", textNode.parentNode?.nodeName);
        // Create a document fragment for this text node
        const fragment = document.createDocumentFragment();
        // Process each character
        for (let i = 0; i < text.length; i++) {
            const char = text[i].toLowerCase();
            if (isTrackedCharacter(char)) {
                const charData = getCharacterData(char);
                // Create a span for the target character
                const span = document.createElement("span");
                span.className = "target_identified";
                // Add character data as attributes
                span.setAttribute("data-char-code", char.charCodeAt(0).toString(16));
                if (charData?.label) {
                    span.setAttribute("data-char-label", charData.label);
                    span.title = charData.label; // Add tooltip
                }
                // Check if this is an invisible character
                const isInvisible = /[\u200B\u200C\u200D\u2060-\u2064\uFEFF]/.test(char);
                // Style appropriately
                span.style.display = "inline";
                if (isInvisible) {
                    // Styling for invisible characters
                    span.style.backgroundColor = "lightpink";
                    span.style.color = "darkred";
                    span.style.border = "1px dashed red";
                    span.style.padding = "0 2px";
                    span.style.margin = "0 1px";
                    // Use replacement character from our map
                    span.textContent = charData?.replacement || "□";
                }
                else {
                    // Styling for visible characters (like vowels)
                    span.style.color = "green";
                    span.textContent = text[i]; // Keep original case
                }
                fragment.appendChild(span);
                // Update count
                incrementCharCount(countData, char);
            }
            else {
                // Add non-target characters as text nodes
                fragment.appendChild(document.createTextNode(text[i]));
            }
        }
        // Replace the original text node with our fragment
        if (textNode.parentNode) {
            textNode.parentNode.replaceChild(fragment, textNode);
        }
    });
    console.log("Final count data:", countData);
    console.log("Character breakdown:", countData.byCharacter);
    return countData;
};
// Function to eliminate the highlighted characters
const eliminateHighlightedChars = () => {
    try {
        // Find all spans with our custom class
        const targetSpans = document.querySelectorAll(".target_identified");
        console.log(`Found ${targetSpans.length} spans with class 'target_identified' to eliminate`);
        let replacedCount = 0;
        // Process each highlighted span
        targetSpans.forEach((span, index) => {
            const charCodeHex = span.getAttribute("data-char-code") || "0";
            const charCode = parseInt(charCodeHex, 16);
            const char = String.fromCharCode(charCode);
            const charData = getCharacterData(char);
            console.log(`Span #${index}: char code ${charCodeHex} (U+${charCodeHex.padStart(4, "0")}), label: ${span.getAttribute("data-char-label")}`);
            if (charData) {
                // Replace with the replacement character
                const textNode = document.createTextNode(charData.replacement);
                span.parentNode?.replaceChild(textNode, span);
                replacedCount++;
            }
        });
        // Change the border to signify completion
        document.body.style.border = "5px solid blue";
        console.log(`Eliminated ${replacedCount} characters`);
        return {
            success: true,
            replacedCount: replacedCount,
        };
    }
    catch (error) {
        console.error("Error eliminating characters:", error);
        return {
            success: false,
            replacedCount: 0,
        };
    }
};
// Listen for messages from the popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Content script received message:", message);
    if (message.action === "activate") {
        try {
            // Call the find and replace function
            const countData = findForbiddenChars();
            console.log("Result:", countData);
            // Send the results back to the popup
            sendResponse({
                success: true,
                countData: countData,
            });
        }
        catch (error) {
            console.error("Error in text replacement:", error);
            sendResponse({
                success: false,
                error: error instanceof Error ? error.message : String(error),
            });
        }
        return true;
    }
    if (message.action === "eliminate") {
        try {
            // Perform elimination
            const result = eliminateHighlightedChars();
            // Send the results back to the popup
            sendResponse({
                success: true,
                replacedCount: result.replacedCount,
            });
        }
        catch (error) {
            console.error("Error in elimination:", error);
            sendResponse({
                success: false,
                error: error instanceof Error ? error.message : String(error),
            });
        }
        return true;
    }
});
