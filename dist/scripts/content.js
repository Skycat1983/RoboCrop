"use strict";
// document.body.style.border = "5px solid green";
const charactersMap = {
    // Test vowels - comment out or remove in production
    // a: { replacement: "x", label: "Lowercase A" },
    // e: { replacement: "x", label: "Lowercase E" },
    // i: { replacement: "x", label: "Lowercase I" },
    // o: { replacement: "x", label: "Lowercase O" },
    // u: { replacement: "x", label: "Lowercase U" },
    // Hidden/control characters
    "\u00AD": { replacement: "", label: "Soft Hyphen" },
    "\u180E": { replacement: "", label: "Mongolian Vowel Separator" },
    "\u200B": { replacement: "", label: "Zero-width Space" },
    "\u200C": { replacement: "", label: "Zero-width Non-joiner" },
    "\u200D": { replacement: "", label: "Zero-width Joiner" },
    "\u200E": { replacement: "", label: "Left-to-Right Mark" },
    "\u200F": { replacement: "", label: "Right-to-Left Mark" },
    "\u202A": { replacement: "", label: "Left-to-Right Embedding" },
    "\u202B": { replacement: "", label: "Right-to-Left Embedding" },
    "\u202C": { replacement: "", label: "Pop Directional Formatting" },
    "\u202D": { replacement: "", label: "Left-to-Right Override" },
    "\u202E": { replacement: "", label: "Right-to-Left Override" },
    "\u2060": { replacement: "", label: "Word Joiner" },
    "\u2061": { replacement: "", label: "Function Application" },
    "\u2062": { replacement: "", label: "Invisible Times" },
    "\u2063": { replacement: "", label: "Invisible Separator" },
    "\u2064": { replacement: "", label: "Invisible Plus" },
    "\u206A": { replacement: "", label: "Inhibit Symmetric Swapping" },
    "\u206B": { replacement: "", label: "Activate Symmetric Swapping" },
    "\u206C": { replacement: "", label: "Inhibit Arabic Form Shaping" },
    "\u206D": { replacement: "", label: "Activate Arabic Form Shaping" },
    "\u206E": { replacement: "", label: "National Digit Shapes" },
    "\u206F": { replacement: "", label: "Nominal Digit Shapes" },
    "\uFEFF": { replacement: "", label: "Byte Order Mark" },
    // Variation selectors
    "\uFE00": { replacement: "", label: "Variation Selector-1" },
    "\uFE01": { replacement: "", label: "Variation Selector-2" },
    "\uFE02": { replacement: "", label: "Variation Selector-3" },
    "\uFE03": { replacement: "", label: "Variation Selector-4" },
    "\uFE04": { replacement: "", label: "Variation Selector-5" },
    "\uFE05": { replacement: "", label: "Variation Selector-6" },
    "\uFE06": { replacement: "", label: "Variation Selector-7" },
    "\uFE07": { replacement: "", label: "Variation Selector-8" },
    "\uFE08": { replacement: "", label: "Variation Selector-9" },
    "\uFE09": { replacement: "", label: "Variation Selector-10" },
    "\uFE0A": { replacement: "", label: "Variation Selector-11" },
    "\uFE0B": { replacement: "", label: "Variation Selector-12" },
    "\uFE0C": { replacement: "", label: "Variation Selector-13" },
    "\uFE0D": { replacement: "", label: "Variation Selector-14" },
    "\uFE0E": { replacement: "", label: "Variation Selector-15" },
    "\uFE0F": { replacement: "", label: "Variation Selector-16" },
    // Space characters
    "\u00A0": { replacement: " ", label: "Non-breaking Space" },
    "\u1680": { replacement: " ", label: "Ogham Space Mark" },
    "\u2000": { replacement: " ", label: "En Quad" },
    "\u2001": { replacement: " ", label: "Em Quad" },
    "\u2002": { replacement: " ", label: "En Space" },
    "\u2003": { replacement: " ", label: "Em Space" },
    "\u2004": { replacement: " ", label: "Three-Per-Em Space" },
    "\u2005": { replacement: " ", label: "Four-Per-Em Space" },
    "\u2006": { replacement: " ", label: "Six-Per-Em Space" },
    "\u2007": { replacement: " ", label: "Figure Space" },
    "\u2008": { replacement: " ", label: "Punctuation Space" },
    "\u2009": { replacement: " ", label: "Thin Space" },
    "\u200A": { replacement: " ", label: "Hair Space" },
    "\u202F": { replacement: " ", label: "Narrow No-Break Space" },
    "\u205F": { replacement: " ", label: "Medium Mathematical Space" },
    "\u3000": { replacement: " ", label: "Ideographic Space" },
    // Dashes
    "\u2012": { replacement: "-", label: "Figure Dash" },
    "\u2013": { replacement: "-", label: "En Dash" },
    "\u2014": { replacement: "-", label: "Em Dash" },
    "\u2015": { replacement: "-", label: "Horizontal Bar" },
    "\u2212": { replacement: "-", label: "Minus Sign" },
    // Quotes and Apostrophes
    "\u2018": { replacement: "'", label: "Left Single Quotation Mark" },
    "\u2019": { replacement: "'", label: "Right Single Quotation Mark" },
    "\u201A": { replacement: "'", label: "Single Low-9 Quotation Mark" },
    "\u201B": {
        replacement: "'",
        label: "Single High-Reversed-9 Quotation Mark",
    },
    "\u201C": { replacement: '"', label: "Left Double Quotation Mark" },
    "\u201D": { replacement: '"', label: "Right Double Quotation Mark" },
    "\u201E": { replacement: '"', label: "Double Low-9 Quotation Mark" },
    "\u201F": {
        replacement: '"',
        label: "Double High-Reversed-9 Quotation Mark",
    },
    "\u2032": { replacement: "'", label: "Prime" },
    "\u2033": { replacement: '"', label: "Double Prime" },
    "\u2034": { replacement: "'''", label: "Triple Prime" },
    "\u2035": { replacement: "'", label: "Reversed Prime" },
    "\u2036": { replacement: '"', label: "Reversed Double Prime" },
    "\u00AB": {
        replacement: '"',
        label: "Left-Pointing Double Angle Quotation Mark",
    },
    "\u00BB": {
        replacement: '"',
        label: "Right-Pointing Double Angle Quotation Mark",
    },
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
    return !!charactersMap[char];
};
const getCharacterData = (char) => {
    return charactersMap[char];
};
const incrementCharCount = (countData, char) => {
    countData.totalCount++;
    countData.byCharacter[char]++;
};
const findForbiddenChars = () => {
    // add marker to indicate this has been run
    if (document.body.getAttribute("data-crosshairs-applied") === "true") {
        console.log("Crosshairs already applied, not adding again");
        // return existing count data if possible
        const existingSpans = document.querySelectorAll(".target_identified");
        if (existingSpans.length > 0) {
            const countData = createCountObject();
            countData.totalCount = existingSpans.length;
            // reconstruct character counts
            existingSpans.forEach((span) => {
                const charCodeHex = span.getAttribute("data-char-code");
                if (charCodeHex) {
                    const charCode = parseInt(charCodeHex, 16);
                    const char = String.fromCharCode(charCode);
                    if (countData.byCharacter[char] !== undefined) {
                        countData.byCharacter[char]++;
                    }
                }
            });
            return countData;
        }
        return createCountObject();
    }
    // mark as having been applied
    document.body.setAttribute("data-crosshairs-applied", "true");
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
        // check text for target characters
        let hasTarget = false;
        const foundChars = [];
        for (const char of text) {
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
        // create a document fragment for this text node
        const fragment = document.createDocumentFragment();
        // Process each character
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (isTrackedCharacter(char)) {
                const charData = getCharacterData(char);
                // Create a span for the target character
                const span = document.createElement("span");
                span.className = "target_identified";
                // Add character data as attributes
                span.setAttribute("data-char-code", char.charCodeAt(0).toString(16));
                if (charData?.label) {
                    span.setAttribute("data-char-label", charData.label);
                }
                span.style.display = "inline-flex";
                span.style.justifyContent = "center";
                span.style.alignItems = "center";
                span.style.border = "1px solid #00ff00";
                span.style.boxShadow = "0 0 5px #00ff00, 0 0 10px #00ff00";
                span.style.minWidth = "1em"; // min width for zero-width characters
                span.style.height = "1.2em"; // fixed height relative to font size
                span.style.padding = "0 2px"; // add a bit of padding for wide characters
                span.style.margin = "0 1px";
                span.style.verticalAlign = "middle";
                span.style.boxSizing = "border-box"; // include padding in width/height calculation
                span.style.position = "relative"; // for absolute positioning of crosshair lines
                span.style.zIndex = "1";
                span.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // dim background
                span.title = charData?.label || "Unknown character"; // keep tooltip
                // horizontal crosshair
                const horizontalLine = document.createElement("div");
                horizontalLine.style.position = "absolute";
                horizontalLine.style.left = "-15px"; // extend left by fixed amount
                horizontalLine.style.right = "-15px"; // extend right by fixed amount
                horizontalLine.style.top = "50%";
                horizontalLine.style.height = "1px"; // line thickness
                // gradient background to fade at the edges
                horizontalLine.style.background =
                    "linear-gradient(to right, transparent, #00ff00 15px, #00ff00 calc(100% - 15px), transparent)";
                horizontalLine.style.transform = "translateY(-50%)";
                horizontalLine.style.pointerEvents = "none"; // don't interfere with hover events
                horizontalLine.style.zIndex = "0";
                horizontalLine.style.boxShadow = "0 0 3px #00ff00"; // neon glow for the line
                span.appendChild(horizontalLine);
                //  vertical crosshair line
                const verticalLine = document.createElement("div");
                verticalLine.style.position = "absolute";
                verticalLine.style.top = "-15px"; // extend up by fixed amount
                verticalLine.style.bottom = "-15px"; // extend down by fixed amount
                verticalLine.style.left = "50%";
                verticalLine.style.width = "1px"; // line thickness
                // gradient background to fade at the edges
                verticalLine.style.background =
                    "linear-gradient(to bottom, transparent, #00ff00 15px, #00ff00 calc(100% - 15px), transparent)";
                verticalLine.style.transform = "translateX(-50%)";
                verticalLine.style.pointerEvents = "none"; // don't interfere with hover events
                verticalLine.style.zIndex = "0";
                verticalLine.style.boxShadow = "0 0 3px #00ff00"; // neon glow for the line
                span.appendChild(verticalLine);
                // wrap the text in span
                const textWrapper = document.createElement("span");
                textWrapper.style.position = "relative";
                textWrapper.style.zIndex = "2";
                textWrapper.style.color = "#ffffff"; // white text for visibility against dark background
                textWrapper.style.textShadow = "0 0 2px #00ff00"; // slight neon glow for text
                textWrapper.textContent = text[i];
                span.appendChild(textWrapper);
                fragment.appendChild(span);
                incrementCharCount(countData, char);
            }
            else {
                fragment.appendChild(document.createTextNode(text[i]));
            }
        }
        // replace the original text node with our fragment
        if (textNode.parentNode) {
            textNode.parentNode.replaceChild(fragment, textNode);
        }
    });
    console.log("Final count data:", countData);
    console.log("Character breakdown:", countData.byCharacter);
    return countData;
};
const eliminateHighlightedChars = () => {
    try {
        // find all spans with our custom class
        const targetSpans = document.querySelectorAll(".target_identified");
        console.log(`Found ${targetSpans.length} spans with class 'target_identified' to eliminate`);
        let replacedCount = 0;
        // process each highlighted span
        targetSpans.forEach((span, index) => {
            const charCodeHex = span.getAttribute("data-char-code") || "0";
            const charCode = parseInt(charCodeHex, 16);
            const char = String.fromCharCode(charCode);
            const charData = getCharacterData(char);
            console.log(`Span #${index}: char code ${charCodeHex} (U+${charCodeHex.padStart(4, "0")}), label: ${span.getAttribute("data-char-label")}`);
            if (charData) {
                const replacement = charData.replacement;
                const textNode = document.createTextNode(replacement);
                span.parentNode?.replaceChild(textNode, span);
                replacedCount++;
                console.log(`Replaced character (${span.getAttribute("title") || charData.label}) with '${replacement === "" ? "[empty]" : replacement}'`);
            }
        });
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
const addCRTEffect = () => {
    console.log("Adding CRT effect to the page");
    // check if we already added the style
    if (document.getElementById("crt-effect-style")) {
        console.log("CRT effect already added");
        return;
    }
    // create a style element for the CRT effect
    const styleElement = document.createElement("style");
    styleElement.id = "crt-effect-style";
    styleElement.textContent = `
    @keyframes flicker {
      0% {
        opacity: 0.27861;
      }
      5% {
        opacity: 0.34769;
      }
      10% {
        opacity: 0.23604;
      }
      15% {
        opacity: 0.90626;
      }
      20% {
        opacity: 0.18128;
      }
      25% {
        opacity: 0.83891;
      }
      30% {
        opacity: 0.65583;
      }
      35% {
        opacity: 0.67807;
      }
      40% {
        opacity: 0.26559;
      }
      45% {
        opacity: 0.84693;
      }
      50% {
        opacity: 0.96019;
      }
      55% {
        opacity: 0.08594;
      }
      60% {
        opacity: 0.20313;
      }
      65% {
        opacity: 0.71988;
      }
      70% {
        opacity: 0.53455;
      }
      75% {
        opacity: 0.37288;
      }
      80% {
        opacity: 0.71428;
      }
      85% {
        opacity: 0.70419;
      }
      90% {
        opacity: 0.7003;
      }
      95% {
        opacity: 0.36108;
      }
      100% {
        opacity: 0.24387;
      }
    }
    @keyframes textShadow {
      0% {
        text-shadow: 0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      5% {
        text-shadow: 2.7928974010788217px 0 1px rgba(0,30,255,0.5), -2.7928974010788217px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      10% {
        text-shadow: 0.02956275843481219px 0 1px rgba(0,30,255,0.5), -0.02956275843481219px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      15% {
        text-shadow: 0.40218538552878136px 0 1px rgba(0,30,255,0.5), -0.40218538552878136px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      20% {
        text-shadow: 3.4794037899852017px 0 1px rgba(0,30,255,0.5), -3.4794037899852017px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      25% {
        text-shadow: 1.6125630401149584px 0 1px rgba(0,30,255,0.5), -1.6125630401149584px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      30% {
        text-shadow: 0.7015590085143956px 0 1px rgba(0,30,255,0.5), -0.7015590085143956px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      35% {
        text-shadow: 3.896914047650351px 0 1px rgba(0,30,255,0.5), -3.896914047650351px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      40% {
        text-shadow: 3.870905614848819px 0 1px rgba(0,30,255,0.5), -3.870905614848819px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      45% {
        text-shadow: 2.231056963361899px 0 1px rgba(0,30,255,0.5), -2.231056963361899px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      50% {
        text-shadow: 0.08084290417898504px 0 1px rgba(0,30,255,0.5), -0.08084290417898504px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      55% {
        text-shadow: 2.3758461067427543px 0 1px rgba(0,30,255,0.5), -2.3758461067427543px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      60% {
        text-shadow: 2.202193051050636px 0 1px rgba(0,30,255,0.5), -2.202193051050636px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      65% {
        text-shadow: 2.8638780614874975px 0 1px rgba(0,30,255,0.5), -2.8638780614874975px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      70% {
        text-shadow: 0.48874025155497314px 0 1px rgba(0,30,255,0.5), -0.48874025155497314px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      75% {
        text-shadow: 1.8948491305757957px 0 1px rgba(0,30,255,0.5), -1.8948491305757957px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      80% {
        text-shadow: 0.0833037308038857px 0 1px rgba(0,30,255,0.5), -0.0833037308038857px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      85% {
        text-shadow: 0.09769827255241735px 0 1px rgba(0,30,255,0.5), -0.09769827255241735px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      90% {
        text-shadow: 3.443339761481782px 0 1px rgba(0,30,255,0.5), -3.443339761481782px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      95% {
        text-shadow: 2.1841838852799786px 0 1px rgba(0,30,255,0.5), -2.1841838852799786px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
      100% {
        text-shadow: 2.6208764473832513px 0 1px rgba(0,30,255,0.5), -2.6208764473832513px 0 1px rgba(255,0,80,0.3), 0 0 3px;
      }
    }
    .crt::after {
      content: " ";
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba(18, 16, 16, 0.1);
      opacity: 0;
      z-index: 9998;
      pointer-events: none;
      animation: flicker 0.15s infinite;
    }
    .crt::before {
      content: " ";
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
      z-index: 9997;
      background-size: 100% 2px, 3px 100%;
      pointer-events: none;
    }
    .crt {
      animation: textShadow 1.6s infinite;
    }
  `;
    document.head.appendChild(styleElement);
    document.body.classList.add("crt");
    document.body.setAttribute("data-crt-active", "true");
    // add a click listener to the document to remove CRT effect on any click
    if (!document.body.hasAttribute("data-crt-click-listener")) {
        document.body.setAttribute("data-crt-click-listener", "true");
        document.addEventListener("click", (event) => {
            // only process if CRT is active and this is not a click on a popup button
            // (popup buttons won't be in the main document)
            if (document.body.getAttribute("data-crt-active") === "true") {
                // check if the clicked element is a span with our target class
                const target = event.target;
                const isOurSpan = target.classList?.contains("target_identified");
                const isButton = target.tagName === "BUTTON";
                // if it's not our span or a button, remove the effect
                if (!isOurSpan && !isButton) {
                    console.log("Click detected outside of targets, removing all effects");
                    removeAllEffects();
                }
            }
        });
    }
    // add visibility change listener if not already added
    if (!document.body.hasAttribute("data-crt-visibility-listener")) {
        document.body.setAttribute("data-crt-visibility-listener", "true");
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden" &&
                document.body.getAttribute("data-crt-active") === "true") {
                console.log("Page visibility changed to hidden, removing all effects");
                removeAllEffects();
            }
        });
    }
    console.log("CRT effect added to the page");
};
const removeAllEffects = () => {
    console.log("Removing all visual effects from the page");
    const styleElement = document.getElementById("crt-effect-style");
    if (styleElement) {
        styleElement.remove();
    }
    document.body.classList.remove("crt");
    document.body.setAttribute("data-crt-active", "false");
    const targetSpans = document.querySelectorAll(".target_identified");
    console.log(`Found ${targetSpans.length} highlighted spans to restore`);
    targetSpans.forEach((span, index) => {
        try {
            const originalText = span.textContent || "";
            const textNode = document.createTextNode(originalText);
            span.parentNode?.replaceChild(textNode, span);
        }
        catch (error) {
            console.error(`Error restoring span #${index}:`, error);
        }
    });
    document.body.removeAttribute("data-crosshairs-applied");
    console.log("All visual effects removed from the page");
};
const removeCRTEffect = () => {
    console.log("Calling removeAllEffects from removeCRTEffect for backward compatibility");
    removeAllEffects();
};
// listen for messages from the popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Content script received message:", message);
    if (message.action === "activate") {
        try {
            addCRTEffect();
            const countData = findForbiddenChars();
            console.log("Result:", countData);
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
            const result = eliminateHighlightedChars();
            removeAllEffects();
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
    if (message.action === "cleanup") {
        console.log("Received cleanup message from popup");
        try {
            if (document.body.classList.contains("crt")) {
                console.log("Removing CRT effect due to popup close");
                removeAllEffects();
            }
        }
        catch (error) {
            console.error("Error during cleanup:", error);
        }
        return true;
    }
});
