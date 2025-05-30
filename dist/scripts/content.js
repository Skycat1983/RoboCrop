(function () {
    'use strict';

    const invisibleReplacement = "";
    const selectorReplacement = "";
    const spaceReplacement = "";
    const dashReplacement = "-";
    // const invisibleReplacement = "X";
    // const selectorReplacement = "X";
    // const spaceReplacement = "X";
    // const dashReplacement = "X";
    // Unified character map with all characters organized by category
    const charactersMap = {
        // Hidden/Control Characters
        "\u00AD": {
            replacement: invisibleReplacement,
            label: "Soft Hyphen",
            category: "invisible",
            count: 0,
        },
        "\u180E": {
            replacement: invisibleReplacement,
            label: "Mongolian Vowel Separator",
            category: "invisible",
            count: 0,
        },
        "\u200B": {
            replacement: invisibleReplacement,
            label: "Zero-width Space",
            category: "invisible",
            count: 0,
        },
        "\u200C": {
            replacement: invisibleReplacement,
            label: "Zero-width Non-joiner",
            category: "invisible",
            count: 0,
        },
        "\u200D": {
            replacement: invisibleReplacement,
            label: "Zero-width Joiner",
            category: "invisible",
            count: 0,
        },
        "\u200E": {
            replacement: invisibleReplacement,
            label: "Left-to-Right Mark",
            category: "invisible",
            count: 0,
        },
        "\u200F": {
            replacement: invisibleReplacement,
            label: "Right-to-Left Mark",
            category: "invisible",
            count: 0,
        },
        "\u202A": {
            replacement: invisibleReplacement,
            label: "Left-to-Right Embedding",
            category: "invisible",
            count: 0,
        },
        "\u202B": {
            replacement: invisibleReplacement,
            label: "Right-to-Left Embedding",
            category: "invisible",
            count: 0,
        },
        "\u202C": {
            replacement: invisibleReplacement,
            label: "Pop Directional Formatting",
            category: "invisible",
            count: 0,
        },
        "\u202D": {
            replacement: invisibleReplacement,
            label: "Left-to-Right Override",
            category: "invisible",
            count: 0,
        },
        "\u202E": {
            replacement: invisibleReplacement,
            label: "Right-to-Left Override",
            category: "invisible",
            count: 0,
        },
        "\u2060": {
            replacement: invisibleReplacement,
            label: "Word Joiner",
            category: "invisible",
            count: 0,
        },
        "\u2061": {
            replacement: invisibleReplacement,
            label: "Function Application",
            category: "invisible",
            count: 0,
        },
        "\u2062": {
            replacement: invisibleReplacement,
            label: "Invisible Times",
            category: "invisible",
            count: 0,
        },
        "\u2063": {
            replacement: invisibleReplacement,
            label: "Invisible Separator",
            category: "invisible",
            count: 0,
        },
        "\u2064": {
            replacement: invisibleReplacement,
            label: "Invisible Plus",
            category: "invisible",
            count: 0,
        },
        "\u206A": {
            replacement: invisibleReplacement,
            label: "Inhibit Symmetric Swapping",
            category: "invisible",
            count: 0,
        },
        "\u206B": {
            replacement: invisibleReplacement,
            label: "Activate Symmetric Swapping",
            category: "invisible",
            count: 0,
        },
        "\u206C": {
            replacement: invisibleReplacement,
            label: "Inhibit Arabic Form Shaping",
            category: "invisible",
            count: 0,
        },
        "\u206D": {
            replacement: invisibleReplacement,
            label: "Activate Arabic Form Shaping",
            category: "invisible",
            count: 0,
        },
        "\u206E": {
            replacement: invisibleReplacement,
            label: "National Digit Shapes",
            category: "invisible",
            count: 0,
        },
        "\u206F": {
            replacement: invisibleReplacement,
            label: "Nominal Digit Shapes",
            category: "invisible",
            count: 0,
        },
        "\uFEFF": {
            replacement: invisibleReplacement,
            label: "Byte Order Mark",
            category: "invisible",
            count: 0,
        },
        // Variation Selectors
        "\uFE00": {
            replacement: selectorReplacement,
            label: "Variation Selector-1",
            category: "selectors",
            count: 0,
        },
        "\uFE01": {
            replacement: selectorReplacement,
            label: "Variation Selector-2",
            category: "selectors",
            count: 0,
        },
        "\uFE02": {
            replacement: selectorReplacement,
            label: "Variation Selector-3",
            category: "selectors",
            count: 0,
        },
        "\uFE03": {
            replacement: selectorReplacement,
            label: "Variation Selector-4",
            category: "selectors",
            count: 0,
        },
        "\uFE04": {
            replacement: selectorReplacement,
            label: "Variation Selector-5",
            category: "selectors",
            count: 0,
        },
        "\uFE05": {
            replacement: selectorReplacement,
            label: "Variation Selector-6",
            category: "selectors",
            count: 0,
        },
        "\uFE06": {
            replacement: selectorReplacement,
            label: "Variation Selector-7",
            category: "selectors",
            count: 0,
        },
        "\uFE07": {
            replacement: selectorReplacement,
            label: "Variation Selector-8",
            category: "selectors",
            count: 0,
        },
        "\uFE08": {
            replacement: selectorReplacement,
            label: "Variation Selector-9",
            category: "selectors",
            count: 0,
        },
        "\uFE09": {
            replacement: selectorReplacement,
            label: "Variation Selector-10",
            category: "selectors",
            count: 0,
        },
        "\uFE0A": {
            replacement: selectorReplacement,
            label: "Variation Selector-11",
            category: "selectors",
            count: 0,
        },
        "\uFE0B": {
            replacement: selectorReplacement,
            label: "Variation Selector-12",
            category: "selectors",
            count: 0,
        },
        "\uFE0C": {
            replacement: selectorReplacement,
            label: "Variation Selector-13",
            category: "selectors",
            count: 0,
        },
        "\uFE0D": {
            replacement: selectorReplacement,
            label: "Variation Selector-14",
            category: "selectors",
            count: 0,
        },
        "\uFE0E": {
            replacement: selectorReplacement,
            label: "Variation Selector-15",
            category: "selectors",
            count: 0,
        },
        "\uFE0F": {
            replacement: selectorReplacement,
            label: "Variation Selector-16",
            category: "selectors",
            count: 0,
        },
        // Unusual Spaces
        "\u00A0": {
            replacement: spaceReplacement,
            label: "Non-breaking Space",
            category: "spaces",
            count: 0,
        },
        "\u1680": {
            replacement: spaceReplacement,
            label: "Ogham Space Mark",
            category: "spaces",
            count: 0,
        },
        "\u2000": {
            replacement: spaceReplacement,
            label: "En Quad",
            category: "spaces",
            count: 0,
        },
        "\u2001": {
            replacement: spaceReplacement,
            label: "Em Quad",
            category: "spaces",
            count: 0,
        },
        "\u2002": {
            replacement: spaceReplacement,
            label: "En Space",
            category: "spaces",
            count: 0,
        },
        "\u2003": {
            replacement: spaceReplacement,
            label: "Em Space",
            category: "spaces",
            count: 0,
        },
        "\u2004": {
            replacement: spaceReplacement,
            label: "Three-Per-Em Space",
            category: "spaces",
            count: 0,
        },
        "\u2005": {
            replacement: spaceReplacement,
            label: "Four-Per-Em Space",
            category: "spaces",
            count: 0,
        },
        "\u2006": {
            replacement: spaceReplacement,
            label: "Six-Per-Em Space",
            category: "spaces",
            count: 0,
        },
        "\u2007": {
            replacement: spaceReplacement,
            label: "Figure Space",
            category: "spaces",
            count: 0,
        },
        "\u2008": {
            replacement: spaceReplacement,
            label: "Punctuation Space",
            category: "spaces",
            count: 0,
        },
        "\u2009": {
            replacement: spaceReplacement,
            label: "Thin Space",
            category: "spaces",
            count: 0,
        },
        "\u200A": {
            replacement: spaceReplacement,
            label: "Hair Space",
            category: "spaces",
            count: 0,
        },
        "\u202F": {
            replacement: spaceReplacement,
            label: "Narrow No-Break Space",
            category: "spaces",
            count: 0,
        },
        "\u205F": {
            replacement: spaceReplacement,
            label: "Medium Mathematical Space",
            category: "spaces",
            count: 0,
        },
        "\u3000": {
            replacement: spaceReplacement,
            label: "Ideographic Space",
            category: "spaces",
            count: 0,
        },
        // Non-standard Dashes
        "\u2012": {
            replacement: dashReplacement,
            label: "Figure Dash",
            category: "dashes",
            count: 0,
        },
        "\u2013": {
            replacement: dashReplacement,
            label: "En Dash",
            category: "dashes",
            count: 0,
        },
        "\u2014": {
            replacement: dashReplacement,
            label: "Em Dash",
            category: "dashes",
            count: 0,
        },
        "\u2015": {
            replacement: dashReplacement,
            label: "Horizontal Bar",
            category: "dashes",
            count: 0,
        },
        "\u2212": {
            replacement: dashReplacement,
            label: "Minus Sign",
            category: "dashes",
            count: 0,
        },
    };
    //! Smart Quotes
    //? removed for now
    // "\u2018": {
    //   replacement: "'",
    //   label: "Left Single Quotation Mark",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u2019": {
    //   replacement: "'",
    //   label: "Right Single Quotation Mark",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u201A": {
    //   replacement: "'",
    //   label: "Single Low-9 Quotation Mark",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u201B": {
    //   replacement: "'",
    //   label: "Single High-Reversed-9 Quotation Mark",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u201C": {
    //   replacement: '"',
    //   label: "Left Double Quotation Mark",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u201D": {
    //   replacement: '"',
    //   label: "Right Double Quotation Mark",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u201E": {
    //   replacement: '"',
    //   label: "Double Low-9 Quotation Mark",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u201F": {
    //   replacement: '"',
    //   label: "Double High-Reversed-9 Quotation Mark",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u2032": {
    //   replacement: "'",
    //   label: "Prime",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u2033": {
    //   replacement: '"',
    //   label: "Double Prime",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u2034": {
    //   replacement: "'''",
    //   label: "Triple Prime",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u2035": {
    //   replacement: "'",
    //   label: "Reversed Prime",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u2036": {
    //   replacement: '"',
    //   label: "Reversed Double Prime",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u00AB": {
    //   replacement: '"',
    //   label: "Left-Pointing Double Angle Quotation Mark",
    //   category: "quotes",
    //   count: 0,
    // },
    // "\u00BB": {
    //   replacement: '"',
    //   label: "Right-Pointing Double Angle Quotation Mark",
    //   category: "quotes",
    //   count: 0,
    // },
    // };

    // =============================================================================
    // COLLECT RESULTS
    // =============================================================================
    /*
    This function collects the results of the highlighting process.

    It collects the total number of characters highlighted, and the number of characters highlighted by category.

    these values are sent back to the popup to be displayed to the user in the stats tab
    */
    const collectResults = () => {
        const targetSpans = document.querySelectorAll(".robocrop-character");
        const results = {
            totalCount: targetSpans.length,
            byCategory: {},
        };
        // Get unique categories from the unified map
        const categories = [
            ...new Set(Object.values(charactersMap).map((data) => data.category)),
        ];
        // Initialize categories
        categories.forEach((category) => {
            results.byCategory[category] = { count: 0, characters: {} };
        });
        // Collect data from existing spans
        targetSpans.forEach((span) => {
            const category = span.getAttribute("data-category") || "";
            const char = span.getAttribute("data-character") || "";
            if (results.byCategory[category]) {
                results.byCategory[category].count++;
                results.byCategory[category].characters[char] =
                    (results.byCategory[category].characters[char] || 0) + 1;
            }
        });
        return results;
    };

    // =============================================================================
    // COLLECT TEXT NODES
    // =============================================================================
    /*
    This function collects all text nodes in the document.

    We need to collect all text nodes to be able to wrap them in boundary-preserving spans, which in turn enables us to add/remove highlighting, or restore the page more easily.

    */
    const collectTextNodes = () => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        const textNodes = [];
        let currentNode;
        while ((currentNode = walker.nextNode())) {
            const textNode = currentNode;
            const parent = textNode.parentNode;
            // Skip script, style, noscript tags
            if (parent && ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.nodeName)) {
                continue;
            }
            // Skip empty text nodes
            if (!textNode.textContent?.trim()) {
                continue;
            }
            textNodes.push(textNode);
        }
        return textNodes;
    };

    // =============================================================================
    // SHOULD TRACK CHARACTER
    // =============================================================================
    /*
    This function checks if a character should be tracked based on the settings provided.
    */
    const shouldTrackCharacter = (char, settings) => {
        console.log(`Helper: checking char "${char}" with settings:`, settings);
        const charData = charactersMap[char];
        if (charData != undefined) {
            console.log(`CharData found:`, charData);
        }
        if (!charData) {
            console.log(`No charData for "${char}"`);
            return false;
        }
        const category = charData.category;
        // Map categories to settings
        switch (category) {
            case "invisible":
                return settings.invisible;
            case "selectors":
                return settings.selectors;
            case "spaces":
                return settings.spaces;
            case "dashes":
                return settings.dashes;
            // case "quotes":
            //   return settings.quotes;
            default:
                console.log(`Unknown category: ${category}`);
                return false;
        }
    };

    // =============================================================================
    // WRAP TEXT NODES
    // =============================================================================
    /*
    This function wraps the provided text nodes in boundary-preserving spans.

    By wrapping the text nodes in spans, we have an easily identifiable boundary to work with.

    The boundary spans enable us to add or remove highlighting without affecting the text content/boundaries.
    */
    const wrapTextNodes = (textNodes) => {
        const wrappedSpans = [];
        textNodes.forEach((textNode, index) => {
            const parent = textNode.parentNode;
            if (!parent)
                return;
            const boundarySpan = document.createElement("span");
            boundarySpan.className = "robocrop-text-boundary";
            boundarySpan.setAttribute("data-boundary-id", index.toString());
            boundarySpan.setAttribute("data-original-text", textNode.textContent || "");
            boundarySpan.textContent = textNode.textContent;
            parent.replaceChild(boundarySpan, textNode);
            wrappedSpans.push(boundarySpan);
        });
        return wrappedSpans;
    };
    // =============================================================================
    // WRAP CHARS IN SPANS
    // =============================================================================
    /*
    This function receives the boundary spans and wraps individual the characters in spans, accoding to the settings provided.

    It also adds the necessary attributes to the spans to identify the characters and their replacements.

    It also adds the visual effects to the spans.

    NOTE: some attributes are likely no longer in use. They were added at a time when i thought I would 'replace' the characters using saud attributes as a way to identify the characters. Later i realised it would be quicker and less complicated just to restore the page and loop the nodes again from scratch
    */
    const wrapChars = (boundarySpans, settings) => {
        boundarySpans.forEach((boundarySpan) => {
            const text = boundarySpan.textContent || "";
            if (!text)
                return;
            const fragments = [];
            let lastIndex = 0;
            let spanHighlighted = false;
            // Check each character
            for (let i = 0; i < text.length; i++) {
                // Get character at current index
                const char = text[i];
                // Check if character should be tracked
                if (shouldTrackCharacter(char, settings)) {
                    // Get character data from charactersMap
                    const charData = charactersMap[char];
                    if (i > lastIndex) {
                        fragments.push(text.substring(lastIndex, i));
                    }
                    // Create container for character span and crosshairs
                    const charContainer = document.createElement("span");
                    // Base classes for identification and counting
                    charContainer.className = "robocrop-character";
                    charContainer.classList.add("robocrop-styles");
                    // Add the category as an attribute to the target span
                    charContainer.setAttribute("data-category", charData.category);
                    // Add the character as an attribute to the target span
                    charContainer.setAttribute("data-character", char);
                    // Add the replacement character as an attribute to the target span
                    charContainer.setAttribute("data-replacement", charData.replacement);
                    // Add the character code as an attribute to the target span
                    //? charCodeAt(0) gets the Unicode code point of the first character. toString(16) converts the code point to a hexadecimal string
                    charContainer.setAttribute("data-char-code", char.charCodeAt(0).toString(16));
                    // Add the label as an attribute to the target span
                    charContainer.setAttribute("data-label", charData.label);
                    // Add the label as a title to the target span
                    //? do we benefit from this AND data-label?
                    charContainer.title = charData.label;
                    // Create horizontal crosshair line
                    const horizontalLine = document.createElement("div");
                    horizontalLine.className = "crosshair-horizontal";
                    charContainer.appendChild(horizontalLine);
                    // Create vertical crosshair line
                    const verticalLine = document.createElement("div");
                    verticalLine.className = "crosshair-vertical";
                    charContainer.appendChild(verticalLine);
                    // Create text wrapper for the character
                    const textWrapper = document.createElement("span");
                    textWrapper.className = "text-wrapper";
                    textWrapper.textContent = char;
                    charContainer.appendChild(textWrapper);
                    fragments.push(charContainer);
                    lastIndex = i + 1;
                    spanHighlighted = true;
                }
            }
            // Only process this span if we found target characters
            if (spanHighlighted) {
                // Add remaining text
                if (lastIndex < text.length) {
                    fragments.push(text.substring(lastIndex));
                }
                // Clear the boundary span and add our fragment (prevents dupes)
                boundarySpan.innerHTML = "";
                fragments.forEach((fragment) => {
                    if (typeof fragment === "string") {
                        boundarySpan.appendChild(document.createTextNode(fragment));
                    }
                    else {
                        boundarySpan.appendChild(fragment);
                    }
                });
            }
        });
    };

    // =============================================================================
    // FIND CHARACTERS
    // =============================================================================
    /*
    This function acts as controller for the process.

    It collects the text nodes, wraps them in boundary-preserving spans, and highlights the characters based on the settings provided.

    It then collects the results and returns them.
    */
    const findCharacters = (settings) => {
        const textNodes = collectTextNodes();
        const spans = wrapTextNodes(textNodes);
        wrapChars(spans, settings);
        const results = collectResults();
        return results;
    };
    // =============================================================================
    // REPLACE CHARACTERS
    // =============================================================================
    /*
    This function replaces the characters based on the settings provided.
    */
    const replaceCharacters = (settings) => {
        const textNodes = collectTextNodes();
        let totalReplacements = 0;
        textNodes.forEach((textNode, nodeIndex) => {
            const text = textNode.textContent || "";
            let newText = "";
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const isTracked = shouldTrackCharacter(char, settings);
                if (isTracked) {
                    const charData = charactersMap[char];
                    newText += charData.replacement;
                    totalReplacements++;
                }
                else {
                    newText += char;
                }
            }
            if (newText !== text) {
                textNode.textContent = newText;
            }
        });
        return {
            success: true,
            replacements: totalReplacements,
        };
    };
    // =============================================================================
    // RESTORE PAGE
    // =============================================================================
    /*
    This function restores the page to its original state using the boundary spans, and the original-text attribute.

    It then removes the boundary spans.
    */
    const restorePage = () => {
        // Find all boundary spans
        const boundarySpans = document.querySelectorAll(".robocrop-text-boundary");
        if (boundarySpans.length === 0) {
            return;
        }
        boundarySpans.forEach((boundarySpan, index) => {
            const parent = boundarySpan.parentNode;
            if (!parent)
                return;
            // Get the original text from the data attribute
            const originalText = boundarySpan.getAttribute("data-original-text") || "";
            // Create a new text node with the original content
            const textNode = document.createTextNode(originalText);
            // Replace the boundary span with the original text node
            parent.replaceChild(textNode, boundarySpan);
        });
    };

    // =============================================================================
    // ADD CRT EFFECT
    // =============================================================================
    /*
    This function adds the CRT effect to the page.

    This is done separately in case we want to add more granular control over which effects are applied/not applied.
    */
    const addCRTEffect = () => {
        // Check if effect is already active
        if (document.body.classList.contains("crt-effect")) {
            return;
        }
        // Add the CRT effect class
        document.body.classList.add("crt-effect");
    };
    // =============================================================================
    // REMOVE CRT EFFECT
    // =============================================================================
    /*
    This function removes the CRT effect from the page.
    */
    const removeCRTEffect = () => {
        // Remove the CRT effect class
        document.body.classList.remove("crt-effect");
    };

    // =============================================================================
    // INJECT CSS
    // =============================================================================
    /*
    This was the only way I could get the CSS to work.

    configuring webresources in manifest.json was giving me issues.
    */
    const injectCSS = () => {
        try {
            // Check if CSS is already injected to avoid duplicates
            if (document.getElementById("robocrop-styles")) {
                return;
            }
            const link = document.createElement("link");
            link.id = "robocrop-styles";
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = browser.runtime.getURL("src/styles/content.css");
            document.head.appendChild(link);
        }
        catch (error) {
            console.error("❌ Failed to inject CSS:", error);
        }
    };

    // =============================================================================
    // INITIALIZE CONTENT SCRIPT
    // =============================================================================
    /*
    This function initializes the content script.

    It also injects the CSS into the page.

    It also listens for messages from the popup.

    When a message is received from the popup, it will call the appropriate function to handle the request.

    It also restores the page to its original state when the window is clicked, which trades off efficiency (because we have to loop through all the nodes again) to avoid complexity (I added so many spans/attributes and classnames when 'finding' the characters that deconstructing and reassumebling select parts of the html just seemed to be more hassle than it was worth.

    It also adds/removes the CRT effect to the page

    restorePage is also added to the window click event listener because... it just felt weird when the CSS persisted after closing the popup.
    */
    function initializeContentScript() {
        injectCSS();
        browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
            const { action, settings } = message;
            restorePage();
            removeCRTEffect();
            if (action === "findCharacters") {
                const results = findCharacters(settings);
                const response = {
                    success: true,
                    results: results,
                };
                if (results.totalCount > 0) {
                    addCRTEffect();
                }
                sendResponse(response);
                return;
            }
            if (action === "replaceCharacters") {
                const results = replaceCharacters(settings);
                const response = {
                    success: true,
                    replacements: results.replacements,
                };
                sendResponse(response);
                return true;
            }
            return true;
        });
    }
    initializeContentScript();
    window.addEventListener("click", () => {
        removeCRTEffect();
        restorePage();
    });

})();
