(function () {
    'use strict';

    // Unified character map with all characters organized by category
    const allCharactersMap = {
        // Hidden/Control Characters
        "\u00AD": {
            replacement: "",
            label: "Soft Hyphen",
            category: "hiddenControl",
            count: 0,
        },
        "\u180E": {
            replacement: "",
            label: "Mongolian Vowel Separator",
            category: "hiddenControl",
            count: 0,
        },
        "\u200B": {
            replacement: "",
            label: "Zero-width Space",
            category: "hiddenControl",
            count: 0,
        },
        "\u200C": {
            replacement: "",
            label: "Zero-width Non-joiner",
            category: "hiddenControl",
            count: 0,
        },
        "\u200D": {
            replacement: "",
            label: "Zero-width Joiner",
            category: "hiddenControl",
            count: 0,
        },
        "\u200E": {
            replacement: "",
            label: "Left-to-Right Mark",
            category: "hiddenControl",
            count: 0,
        },
        "\u200F": {
            replacement: "",
            label: "Right-to-Left Mark",
            category: "hiddenControl",
            count: 0,
        },
        "\u202A": {
            replacement: "",
            label: "Left-to-Right Embedding",
            category: "hiddenControl",
            count: 0,
        },
        "\u202B": {
            replacement: "",
            label: "Right-to-Left Embedding",
            category: "hiddenControl",
            count: 0,
        },
        "\u202C": {
            replacement: "",
            label: "Pop Directional Formatting",
            category: "hiddenControl",
            count: 0,
        },
        "\u202D": {
            replacement: "",
            label: "Left-to-Right Override",
            category: "hiddenControl",
            count: 0,
        },
        "\u202E": {
            replacement: "",
            label: "Right-to-Left Override",
            category: "hiddenControl",
            count: 0,
        },
        "\u2060": {
            replacement: "",
            label: "Word Joiner",
            category: "hiddenControl",
            count: 0,
        },
        "\u2061": {
            replacement: "",
            label: "Function Application",
            category: "hiddenControl",
            count: 0,
        },
        "\u2062": {
            replacement: "",
            label: "Invisible Times",
            category: "hiddenControl",
            count: 0,
        },
        "\u2063": {
            replacement: "",
            label: "Invisible Separator",
            category: "hiddenControl",
            count: 0,
        },
        "\u2064": {
            replacement: "",
            label: "Invisible Plus",
            category: "hiddenControl",
            count: 0,
        },
        "\u206A": {
            replacement: "",
            label: "Inhibit Symmetric Swapping",
            category: "hiddenControl",
            count: 0,
        },
        "\u206B": {
            replacement: "",
            label: "Activate Symmetric Swapping",
            category: "hiddenControl",
            count: 0,
        },
        "\u206C": {
            replacement: "",
            label: "Inhibit Arabic Form Shaping",
            category: "hiddenControl",
            count: 0,
        },
        "\u206D": {
            replacement: "",
            label: "Activate Arabic Form Shaping",
            category: "hiddenControl",
            count: 0,
        },
        "\u206E": {
            replacement: "",
            label: "National Digit Shapes",
            category: "hiddenControl",
            count: 0,
        },
        "\u206F": {
            replacement: "",
            label: "Nominal Digit Shapes",
            category: "hiddenControl",
            count: 0,
        },
        "\uFEFF": {
            replacement: "",
            label: "Byte Order Mark",
            category: "hiddenControl",
            count: 0,
        },
        // Variation Selectors
        "\uFE00": {
            replacement: "",
            label: "Variation Selector-1",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE01": {
            replacement: "",
            label: "Variation Selector-2",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE02": {
            replacement: "",
            label: "Variation Selector-3",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE03": {
            replacement: "",
            label: "Variation Selector-4",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE04": {
            replacement: "",
            label: "Variation Selector-5",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE05": {
            replacement: "",
            label: "Variation Selector-6",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE06": {
            replacement: "",
            label: "Variation Selector-7",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE07": {
            replacement: "",
            label: "Variation Selector-8",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE08": {
            replacement: "",
            label: "Variation Selector-9",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE09": {
            replacement: "",
            label: "Variation Selector-10",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE0A": {
            replacement: "",
            label: "Variation Selector-11",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE0B": {
            replacement: "",
            label: "Variation Selector-12",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE0C": {
            replacement: "",
            label: "Variation Selector-13",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE0D": {
            replacement: "",
            label: "Variation Selector-14",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE0E": {
            replacement: "",
            label: "Variation Selector-15",
            category: "variationSelectors",
            count: 0,
        },
        "\uFE0F": {
            replacement: "",
            label: "Variation Selector-16",
            category: "variationSelectors",
            count: 0,
        },
        // Unusual Spaces
        "\u00A0": {
            replacement: " ",
            label: "Non-breaking Space",
            category: "unusualSpaces",
            count: 0,
        },
        "\u1680": {
            replacement: " ",
            label: "Ogham Space Mark",
            category: "unusualSpaces",
            count: 0,
        },
        "\u2000": {
            replacement: " ",
            label: "En Quad",
            category: "unusualSpaces",
            count: 0,
        },
        "\u2001": {
            replacement: " ",
            label: "Em Quad",
            category: "unusualSpaces",
            count: 0,
        },
        "\u2002": {
            replacement: " ",
            label: "En Space",
            category: "unusualSpaces",
            count: 0,
        },
        "\u2003": {
            replacement: " ",
            label: "Em Space",
            category: "unusualSpaces",
            count: 0,
        },
        "\u2004": {
            replacement: " ",
            label: "Three-Per-Em Space",
            category: "unusualSpaces",
            count: 0,
        },
        "\u2005": {
            replacement: " ",
            label: "Four-Per-Em Space",
            category: "unusualSpaces",
            count: 0,
        },
        "\u2006": {
            replacement: " ",
            label: "Six-Per-Em Space",
            category: "unusualSpaces",
            count: 0,
        },
        "\u2007": {
            replacement: " ",
            label: "Figure Space",
            category: "unusualSpaces",
            count: 0,
        },
        "\u2008": {
            replacement: " ",
            label: "Punctuation Space",
            category: "unusualSpaces",
            count: 0,
        },
        "\u2009": {
            replacement: " ",
            label: "Thin Space",
            category: "unusualSpaces",
            count: 0,
        },
        "\u200A": {
            replacement: " ",
            label: "Hair Space",
            category: "unusualSpaces",
            count: 0,
        },
        "\u202F": {
            replacement: " ",
            label: "Narrow No-Break Space",
            category: "unusualSpaces",
            count: 0,
        },
        "\u205F": {
            replacement: " ",
            label: "Medium Mathematical Space",
            category: "unusualSpaces",
            count: 0,
        },
        "\u3000": {
            replacement: " ",
            label: "Ideographic Space",
            category: "unusualSpaces",
            count: 0,
        },
        // Non-standard Dashes
        "\u2012": {
            replacement: "-",
            label: "Figure Dash",
            category: "nonStandardDashes",
            count: 0,
        },
        "\u2013": {
            replacement: "-",
            label: "En Dash",
            category: "nonStandardDashes",
            count: 0,
        },
        "\u2014": {
            replacement: "-",
            label: "Em Dash",
            category: "nonStandardDashes",
            count: 0,
        },
        "\u2015": {
            replacement: "-",
            label: "Horizontal Bar",
            category: "nonStandardDashes",
            count: 0,
        },
        "\u2212": {
            replacement: "-",
            label: "Minus Sign",
            category: "nonStandardDashes",
            count: 0,
        },
        // Smart Quotes
        "\u2018": {
            replacement: "'",
            label: "Left Single Quotation Mark",
            category: "smartQuotes",
            count: 0,
        },
        "\u2019": {
            replacement: "'",
            label: "Right Single Quotation Mark",
            category: "smartQuotes",
            count: 0,
        },
        "\u201A": {
            replacement: "'",
            label: "Single Low-9 Quotation Mark",
            category: "smartQuotes",
            count: 0,
        },
        "\u201B": {
            replacement: "'",
            label: "Single High-Reversed-9 Quotation Mark",
            category: "smartQuotes",
            count: 0,
        },
        "\u201C": {
            replacement: '"',
            label: "Left Double Quotation Mark",
            category: "smartQuotes",
            count: 0,
        },
        "\u201D": {
            replacement: '"',
            label: "Right Double Quotation Mark",
            category: "smartQuotes",
            count: 0,
        },
        "\u201E": {
            replacement: '"',
            label: "Double Low-9 Quotation Mark",
            category: "smartQuotes",
            count: 0,
        },
        "\u201F": {
            replacement: '"',
            label: "Double High-Reversed-9 Quotation Mark",
            category: "smartQuotes",
            count: 0,
        },
        "\u2032": {
            replacement: "'",
            label: "Prime",
            category: "smartQuotes",
            count: 0,
        },
        "\u2033": {
            replacement: '"',
            label: "Double Prime",
            category: "smartQuotes",
            count: 0,
        },
        "\u2034": {
            replacement: "'''",
            label: "Triple Prime",
            category: "smartQuotes",
            count: 0,
        },
        "\u2035": {
            replacement: "'",
            label: "Reversed Prime",
            category: "smartQuotes",
            count: 0,
        },
        "\u2036": {
            replacement: '"',
            label: "Reversed Double Prime",
            category: "smartQuotes",
            count: 0,
        },
        "\u00AB": {
            replacement: '"',
            label: "Left-Pointing Double Angle Quotation Mark",
            category: "smartQuotes",
            count: 0,
        },
        "\u00BB": {
            replacement: '"',
            label: "Right-Pointing Double Angle Quotation Mark",
            category: "smartQuotes",
            count: 0,
        },
    };
    const controlChars = Object.fromEntries(Object.entries(allCharactersMap).filter(([_, data]) => data.category === "hiddenControl"));
    const selectorChars = Object.fromEntries(Object.entries(allCharactersMap).filter(([_, data]) => data.category === "variationSelectors"));
    const spaceChars = Object.fromEntries(Object.entries(allCharactersMap).filter(([_, data]) => data.category === "unusualSpaces"));
    const dashChars = Object.fromEntries(Object.entries(allCharactersMap).filter(([_, data]) => data.category === "nonStandardDashes"));
    const quoteChars = Object.fromEntries(Object.entries(allCharactersMap).filter(([_, data]) => data.category === "smartQuotes"));

    const isTrackedChar = (settings, char) => {
        // Check each enabled setting and its corresponding character map
        if (settings.illegalControl && controlChars[char])
            return true;
        if (settings.unauthorizedSelectors && selectorChars[char])
            return true;
        if (settings.anomalousSpaces && spaceChars[char])
            return true;
        if (settings.illegitimateDashes && dashChars[char])
            return true;
        if (settings.prohibitedQuotes && quoteChars[char])
            return true;
        return false;
    };
    const getCharacterData = (settings, char) => {
        // Return the character data from whichever map contains this character
        if (settings.illegalControl && controlChars[char])
            return controlChars[char];
        if (settings.unauthorizedSelectors && selectorChars[char])
            return selectorChars[char];
        if (settings.anomalousSpaces && spaceChars[char])
            return spaceChars[char];
        if (settings.illegitimateDashes && dashChars[char])
            return dashChars[char];
        if (settings.prohibitedQuotes && quoteChars[char])
            return quoteChars[char];
        return null;
    };

    // =============================================================================
    // PHASE 1: TEXT NODE COLLECTION
    // =============================================================================
    // Helper function: Collect all processable text nodes from the document
    const collectTextNodes = () => {
        console.log("🔍 PHASE 1: Collecting text nodes...");
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        const nodesToProcess = [];
        let currentNode;
        while ((currentNode = walker.nextNode())) {
            const parentNode = currentNode.parentNode;
            // Skip text nodes inside script, style, or noscript tags
            if (parentNode &&
                (parentNode.nodeName === "SCRIPT" ||
                    parentNode.nodeName === "STYLE" ||
                    parentNode.nodeName === "NOSCRIPT")) {
                continue;
            }
            // Only process nodes that actually have text content
            if (currentNode.textContent && currentNode.textContent.trim()) {
                nodesToProcess.push(currentNode);
            }
        }
        console.log(`✅ Found ${nodesToProcess.length} text nodes to process`);
        return nodesToProcess;
    };
    // =============================================================================
    // PHASE 2: CHARACTER DETECTION & ANALYSIS
    // =============================================================================
    // Helper function: Create a count data object initialized by category
    const createCountObject = () => {
        const countData = {
            totalCount: 0,
            byCategory: {},
        };
        // Get unique categories from the unified map
        const categories = [
            ...new Set(Object.values(allCharactersMap).map((data) => data.category)),
        ];
        categories.forEach((category) => {
            countData.byCategory[category] = { count: 0, characters: {} };
            // Initialize character counts for this category
            Object.entries(allCharactersMap)
                .filter(([_, data]) => data.category === category)
                .forEach(([char, _]) => {
                countData.byCategory[category].characters[char] = 0;
            });
        });
        return countData;
    };
    // Helper function: Increment character count with category tracking
    const incrementCharCount = (countData, char, category) => {
        countData.totalCount++;
        if (countData.byCategory[category]) {
            countData.byCategory[category].count++;
            countData.byCategory[category].characters[char]++;
        }
    };
    // Main detection function: Analyze text nodes and find target characters
    const detectCharacters = async (settings, textNodes) => {
        console.log("🔍 PHASE 2: Detecting characters...");
        console.log("🔧 DEBUG: Settings received:", settings);
        const countData = createCountObject();
        const foundCharacters = [];
        textNodes.forEach((textNode, nodeIndex) => {
            const text = textNode.textContent || "";
            // Scan through each character in the text
            for (let charIndex = 0; charIndex < text.length; charIndex++) {
                const char = text[charIndex];
                // Debug: Log some characters we're checking
                if (nodeIndex < 3 && charIndex < 10) {
                    console.log(`🔧 DEBUG: Checking char "${char}" (${char.charCodeAt(0)}) in node ${nodeIndex}`);
                }
                // Check if this character matches any enabled detection rules
                if (isTrackedChar(settings, char)) {
                    console.log(`🎯 DEBUG: Found tracked character "${char}" (${char.charCodeAt(0)}) at position ${charIndex}`);
                    const charData = getCharacterData(settings, char);
                    if (charData && allCharactersMap[char]) {
                        const category = allCharactersMap[char].category;
                        foundCharacters.push({
                            char,
                            charCode: char.charCodeAt(0),
                            hexCode: `U+${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
                            label: charData.label,
                            replacement: charData.replacement,
                            category: category,
                            textNode: textNode,
                            position: charIndex,
                        });
                        // Update count data
                        incrementCharCount(countData, char, category);
                    }
                }
            }
        });
        console.log(`✅ Detection complete: ${foundCharacters.length} characters found`);
        console.log("🔧 DEBUG: Found characters:", foundCharacters);
        return {
            countData,
            foundCharacters,
            textNodes,
        };
    };
    // =============================================================================
    // PHASE 3: RESULTS REPORTING
    // =============================================================================
    // Helper function: Log organized results breakdown
    const logScanResults = (scanResults) => {
        console.log("=== FINAL SCAN RESULTS ===");
        console.log(`Total characters found: ${scanResults.countData.totalCount}`);
        Object.entries(scanResults.countData.byCategory).forEach(([categoryName, categoryData]) => {
            if (categoryData.count > 0) {
                console.log(`\n${categoryName}: ${categoryData.count} characters`);
                Object.entries(categoryData.characters).forEach(([char, count]) => {
                    if (count > 0) {
                        const hexCode = `U+${char
                        .charCodeAt(0)
                        .toString(16)
                        .padStart(4, "0")}`;
                        const charData = allCharactersMap[char];
                        console.log(`  ${hexCode} (${charData?.label || "Unknown"}): ${count}`);
                    }
                });
            }
        });
    };
    // =============================================================================
    // MAIN ORCHESTRATOR FUNCTION
    // =============================================================================
    // Main function: Orchestrate the complete scan process
    const scanPage = async (settings) => {
        console.log("🚀 Starting page scan...");
        // Phase 1: Collect text nodes
        const textNodes = collectTextNodes();
        // Phase 2: Detect and analyze characters
        const scanResults = await detectCharacters(settings, textNodes);
        // Phase 3: Log results
        logScanResults(scanResults);
        console.log("✅ Page scan complete!");
        return scanResults;
    };

    // =============================================================================
    // PHASE 2: CHARACTER HIGHLIGHTING & VISUALIZATION
    // =============================================================================
    // Helper function: Inject CSS styles into the document
    const injectHighlightingStyles = () => {
        // Check if styles are already injected
        if (document.getElementById("robocrop-highlighting-styles")) {
            return;
        }
        // Create style element with inline CSS (like the old code)
        const styleElement = document.createElement("style");
        styleElement.id = "robocrop-highlighting-styles";
        styleElement.textContent = `
    .target_identified {
      display: inline-flex !important;
      justify-content: center !important;
      align-items: center !important;
      border: 1px solid #00ff00 !important;
      box-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00 !important;
      min-width: 1em !important;
      height: 1.2em !important;
      padding: 0 2px !important;
      margin: 0 1px !important;
      vertical-align: middle !important;
      box-sizing: border-box !important;
      position: relative !important;
      z-index: 1 !important;
      background-color: rgba(0, 0, 0, 0.7) !important;
    }
    
    .crosshair-horizontal {
      position: absolute !important;
      left: -15px !important;
      right: -15px !important;
      top: 50% !important;
      height: 1px !important;
      background: linear-gradient(to right, transparent, #00ff00 15px, #00ff00 calc(100% - 15px), transparent) !important;
      transform: translateY(-50%) !important;
      pointer-events: none !important;
      z-index: 0 !important;
      box-shadow: 0 0 3px #00ff00 !important;
    }
    
    .crosshair-vertical {
      position: absolute !important;
      top: -15px !important;
      bottom: -15px !important;
      left: 50% !important;
      width: 1px !important;
      background: linear-gradient(to bottom, transparent, #00ff00 15px, #00ff00 calc(100% - 15px), transparent) !important;
      transform: translateX(-50%) !important;
      pointer-events: none !important;
      z-index: 0 !important;
      box-shadow: 0 0 3px #00ff00 !important;
    }
    
    .text-wrapper {
      position: relative !important;
      z-index: 2 !important;
      color: #ffffff !important;
      text-shadow: 0 0 2px #00ff00 !important;
    }
    
    .target_identified:hover::after {
      content: attr(title) !important;
      position: absolute !important;
      bottom: 125% !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      padding: 5px 10px !important;
      background: rgba(0, 0, 0, 0.8) !important;
      color: #00ff00 !important;
      font-family: 'Orbitron', sans-serif !important;
      font-weight: 600 !important;
      font-size: 12px !important;
      white-space: nowrap !important;
      z-index: 1000 !important;
      border: 1px solid #00ff00 !important;
      box-shadow: 0 0 5px rgba(0, 255, 0, 0.5) !important;
      border-radius: 4px !important;
      pointer-events: none !important;
    }
  `;
        document.head.appendChild(styleElement);
        // Also inject Google Font for tooltips if not already present
        if (!document.getElementById("orbitron-font-style")) {
            const fontLink = document.createElement("link");
            fontLink.rel = "stylesheet";
            fontLink.href =
                "https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap";
            fontLink.id = "orbitron-font-style";
            document.head.appendChild(fontLink);
        }
    };
    // Helper function: Create a span element for a target character
    const createCharacterSpan = (foundChar) => {
        const span = document.createElement("span");
        span.className = "target_identified";
        // Add character data as attributes for later reference
        span.setAttribute("data-char-code", foundChar.charCode.toString(16));
        span.setAttribute("data-char-label", foundChar.label);
        span.setAttribute("data-category", foundChar.category);
        span.title = foundChar.label; // Tooltip text
        // Create horizontal crosshair line
        const horizontalLine = document.createElement("div");
        horizontalLine.className = "crosshair-horizontal";
        span.appendChild(horizontalLine);
        // Create vertical crosshair line
        const verticalLine = document.createElement("div");
        verticalLine.className = "crosshair-vertical";
        span.appendChild(verticalLine);
        // Create text wrapper for the character
        const textWrapper = document.createElement("span");
        textWrapper.className = "text-wrapper";
        textWrapper.textContent = foundChar.char;
        span.appendChild(textWrapper);
        return span;
    };
    // Helper function: Process a single text node and create highlighted fragments
    const processTextNode = (textNode, foundCharacters) => {
        const text = textNode.textContent || "";
        const fragment = document.createDocumentFragment();
        // Get characters that belong to this specific text node
        const nodeCharacters = foundCharacters.filter((foundChar) => foundChar.textNode === textNode);
        // Sort by position to process in order
        nodeCharacters.sort((a, b) => a.position - b.position);
        let lastPosition = 0;
        nodeCharacters.forEach((foundChar) => {
            // Add any regular text before this character
            if (foundChar.position > lastPosition) {
                const beforeText = text.substring(lastPosition, foundChar.position);
                fragment.appendChild(document.createTextNode(beforeText));
            }
            // Create and add the highlighted span for this character
            const span = createCharacterSpan(foundChar);
            fragment.appendChild(span);
            lastPosition = foundChar.position + 1;
        });
        // Add any remaining text after the last character
        if (lastPosition < text.length) {
            const afterText = text.substring(lastPosition);
            fragment.appendChild(document.createTextNode(afterText));
        }
        return fragment;
    };
    // Main highlighting function: Apply visual highlighting to detected characters
    const highlightCharacters = async (scanResults) => {
        console.log("🎨 PHASE 2: Highlighting characters...");
        try {
            // Check if highlighting has already been applied
            if (document.body.getAttribute("data-robocrop-highlighted") === "true") {
                console.log("⚠️ Characters already highlighted, skipping");
                return { success: true, highlightedCount: 0 };
            }
            // Inject CSS styles
            injectHighlightingStyles();
            // Mark as highlighted to prevent duplicate processing
            document.body.setAttribute("data-robocrop-highlighted", "true");
            let highlightedCount = 0;
            // Group found characters by their text node for efficient processing
            const nodeMap = new Map();
            scanResults.foundCharacters.forEach((foundChar) => {
                if (!nodeMap.has(foundChar.textNode)) {
                    nodeMap.set(foundChar.textNode, []);
                }
                nodeMap.get(foundChar.textNode).push(foundChar);
            });
            console.log(`📝 Processing ${nodeMap.size} text nodes with characters`);
            // Process each text node that contains target characters
            nodeMap.forEach((characters, textNode) => {
                try {
                    // Create the highlighted fragment for this text node
                    const fragment = processTextNode(textNode, characters);
                    // Replace the original text node with our highlighted fragment
                    if (textNode.parentNode) {
                        textNode.parentNode.replaceChild(fragment, textNode);
                        highlightedCount += characters.length;
                    }
                }
                catch (error) {
                    console.error("❌ Error processing text node:", error);
                }
            });
            console.log(`✅ Highlighting complete: ${highlightedCount} characters highlighted`);
            return { success: true, highlightedCount };
        }
        catch (error) {
            console.error("❌ Error in highlighting phase:", error);
            return { success: false, highlightedCount: 0 };
        }
    };
    // Helper function: Remove all highlighting from the page
    const removeHighlighting = () => {
        console.log("🧹 Removing character highlighting...");
        try {
            // Find all highlighted spans
            const targetSpans = document.querySelectorAll(".target_identified");
            let removedCount = 0;
            targetSpans.forEach((span) => {
                try {
                    // Get the original character text (simplified - just the textContent)
                    const originalText = span.textContent || "";
                    // Create a text node with the original character
                    const textNode = document.createTextNode(originalText);
                    // Replace the span with the text node
                    span.parentNode?.replaceChild(textNode, span);
                    removedCount++;
                }
                catch (error) {
                    console.error("❌ Error removing span:", error);
                }
            });
            // Remove the highlighting styles
            const styleElement = document.getElementById("robocrop-highlighting-styles");
            if (styleElement) {
                styleElement.remove();
            }
            // Remove the highlighted marker
            document.body.removeAttribute("data-robocrop-highlighted");
            console.log(`✅ Removed ${removedCount} highlighted characters`);
            return { success: true, removedCount };
        }
        catch (error) {
            console.error("❌ Error removing highlighting:", error);
            return { success: false, removedCount: 0 };
        }
    };

    const removeAllEffects = () => {
        console.log("Removing all visual effects from the page");
        // Remove CRT effect style
        const styleElement = document.getElementById("crt-effect-style");
        if (styleElement) {
            styleElement.remove();
        }
        // Remove tooltip style
        const tooltipStyle = document.getElementById("tooltip-style");
        if (tooltipStyle) {
            tooltipStyle.remove();
        }
        // Remove Orbitron font
        const fontStyle = document.getElementById("orbitron-font-style");
        if (fontStyle) {
            fontStyle.remove();
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

    const getSettings = async () => {
        const { robocropSettings } = await browser.storage.local.get("robocropSettings");
        return robocropSettings;
    };
    console.log("🔥 Content script starting to load");
    // Announce that content script is ready
    browser.runtime
        .sendMessage({ action: "contentScriptReady" })
        .then(() => console.log("✅ Content script announced itself"))
        .catch((error) => console.log("❌ Failed to announce content script:", error));
    function initializeContentScript() {
        console.log("🎯 Content script initializing on:", window.location.href);
        browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
            console.log("📩 Content script received message:", message);
            try {
                if (message.action === "scan") {
                    console.log("🔍 Starting page scan");
                    const settings = await getSettings();
                    const { enhancedVisuals } = settings;
                    console.log("settings in content script", settings);
                    // Phase 1: Scan for characters
                    const scanResults = await scanPage(settings);
                    console.log("scan results in content script", scanResults);
                    // Phase 2: Apply highlighting if characters were found
                    if (scanResults.foundCharacters.length > 0) {
                        const highlightResults = await highlightCharacters(scanResults);
                        console.log("highlight results in content script", highlightResults);
                    }
                    // Phase 3: Apply enhanced visuals if enabled
                    if (enhancedVisuals) {
                        addCRTEffect();
                    }
                    sendResponse({
                        received: true,
                        status: "scan completed",
                        countData: scanResults.countData,
                        foundCount: scanResults.foundCharacters.length,
                    });
                }
                if (message.action === "cleanup") {
                    console.log("🧹 Received cleanup message from popup");
                    try {
                        // Remove highlighting
                        removeHighlighting();
                        // Remove CRT effects
                        removeAllEffects();
                        sendResponse({ received: true, status: "cleanup completed" });
                    }
                    catch (error) {
                        console.error("❌ Error during cleanup:", error);
                        sendResponse({
                            received: false,
                            error: error instanceof Error ? error.message : String(error),
                        });
                    }
                }
            }
            catch (error) {
                console.error("❌ Error handling message:", error);
                sendResponse({
                    received: false,
                    error: error instanceof Error ? error.message : String(error),
                });
            }
            return true;
        });
    }
    // Initialize once when the script loads
    initializeContentScript();
    // Log that we reached the end of the script
    console.log("🔥 Content script evaluation complete");
    // content/index.ts
    // console.log("🚀 CONTENT SCRIPT LOADING", window.location.href);
    // // Make sure we're in a web page context
    // if (
    //   window.location.protocol !== "about:" &&
    //   window.location.protocol !== "mozilla:" &&
    //   window.location.protocol !== "chrome:"
    // ) {
    //   const handleScanPage = () => {
    //     console.log("Scanning page");
    //   };
    //   function initialiseContentScript() {
    //     console.log("🎯 CONTENT SCRIPT INITIALIZED", window.location.href);
    //     // Remove any existing listeners to avoid duplicates
    //     browser.runtime.onMessage.removeListener(messageHandler);
    //     // Define message handler separately so we can remove it
    //     function messageHandler(message: any, sender: any, sendResponse: any) {
    //       console.log("📨 CONTENT SCRIPT RECEIVED MESSAGE", message);
    //       if (message.action === "scanPage") {
    //         handleScanPage();
    //         sendResponse({ received: true });
    //         return true; // Keep the message channel open for async response
    //       }
    //     }
    //     // Add the listener
    //     browser.runtime.onMessage.addListener(messageHandler);
    //     // Log success
    //     console.log("✅ Content script ready for messages");
    //   }
    //   // Initialize immediately
    //   initialiseContentScript();
    // }
    // // listen for messages from the popup
    // browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //   console.log("Content script received message:", message);
    //   if (message.action === "activate") {
    //     try {
    //       addCRTEffect();
    //       //   const countData = findForbiddenChars(message.settings);
    //       //   console.log("Result:", countData);
    //       sendResponse({
    //         success: true,
    //         // countData: countData,
    //       });
    //     } catch (error) {
    //       console.error("Error in text replacement:", error);
    //       sendResponse({
    //         success: false,
    //         error: error instanceof Error ? error.message : String(error),
    //       });
    //     }
    //     return true;
    //   }
    //   if (message.action === "eliminate") {
    //     try {
    //       // const result = eliminateHighlightedChars();
    //       removeAllEffects();
    //       sendResponse({
    //         success: true,
    //         // replacedCount: result.replacedCount,
    //       });
    //     } catch (error) {
    //       console.error("Error in elimination:", error);
    //       sendResponse({
    //         success: false,
    //         error: error instanceof Error ? error.message : String(error),
    //       });
    //     }
    //     return true;
    //   }
    //   if (message.action === "cleanup") {
    //     console.log("Received cleanup message from popup");
    //     try {
    //       if (document.body.classList.contains("crt")) {
    //         console.log("Removing CRT effect due to popup close");
    //         removeAllEffects();
    //       }
    //     } catch (error) {
    //       console.error("Error during cleanup:", error);
    //     }
    //     return true;
    //   }
    // });

})();
