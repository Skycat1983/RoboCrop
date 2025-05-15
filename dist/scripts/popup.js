(function () {
    'use strict';

    // Default settings
    const defaultSettings = {
        hiddenControl: true,
        variationSelectors: true,
        spaces: true,
        dashes: true,
        quotes: true,
    };

    const getCheckboxes = () => {
        return {
            hiddenControl: document.getElementById("setting-hidden-control"),
            variationSelectors: document.getElementById("setting-variation-selectors"),
            spaces: document.getElementById("setting-spaces"),
            dashes: document.getElementById("setting-dashes"),
            quotes: document.getElementById("setting-quotes"),
        };
    };
    const loadSettings = async () => {
        const checkboxes = getCheckboxes();
        const result = await browser.storage.local.get("characterSettings");
        const savedSettings = result.characterSettings;
        if (savedSettings) {
            console.log("Loaded saved settings:", savedSettings);
            checkboxes.hiddenControl.checked = savedSettings.hiddenControl;
            checkboxes.variationSelectors.checked = savedSettings.variationSelectors;
            checkboxes.spaces.checked = savedSettings.spaces;
            checkboxes.dashes.checked = savedSettings.dashes;
            checkboxes.quotes.checked = savedSettings.quotes;
        }
        else {
            console.log("No saved settings found, using defaults");
            await browser.storage.local.set({ characterSettings: defaultSettings });
        }
    };
    const saveSettings = async (processPageButton, processCharactersButton) => {
        const checkboxes = getCheckboxes();
        const settings = {
            hiddenControl: checkboxes.hiddenControl?.checked || false,
            variationSelectors: checkboxes.variationSelectors?.checked || false,
            spaces: checkboxes.spaces?.checked || false,
            dashes: checkboxes.dashes?.checked || false,
            quotes: checkboxes.quotes?.checked || false,
        };
        console.log("Saving settings:", settings);
        await browser.storage.local.set({ characterSettings: settings });
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        if (tabs[0]?.id) {
            console.log("Settings changed, sending cleanup message to reset effects");
            await browser.tabs.sendMessage(tabs[0].id, { action: "cleanup" });
        }
        // Reset buttons to initial state
        if (processPageButton) {
            processPageButton.textContent = "Scan";
            processPageButton.className = "button-blue";
        }
        if (processCharactersButton) {
            processCharactersButton.textContent = "Eliminate";
            processCharactersButton.className = "button-white";
            processCharactersButton.setAttribute("disabled", "true");
            processCharactersButton.style.opacity = "0.5";
            processCharactersButton.style.cursor = "not-allowed";
        }
    };
    const getCurrentSettings = () => {
        const checkboxes = getCheckboxes();
        return {
            hiddenControl: checkboxes.hiddenControl?.checked || false,
            variationSelectors: checkboxes.variationSelectors?.checked || false,
            spaces: checkboxes.spaces?.checked || false,
            dashes: checkboxes.dashes?.checked || false,
            quotes: checkboxes.quotes?.checked || false,
        };
    };

    console.log("Popup index script loaded");
    // Send a message when the popup is being unloaded/closed
    window.addEventListener("unload", () => {
        console.log("Popup closing, sending cleanup message");
        // Send a cleanup message to active tab
        browser.tabs
            .query({ active: true, currentWindow: true })
            .then((tabs) => {
            if (tabs[0]?.id) {
                browser.tabs
                    .sendMessage(tabs[0].id, {
                    action: "cleanup",
                })
                    .catch((err) => {
                    // Ignore error if content script isn't ready or tab is no longer available
                    console.log("Cleanup message may not have been delivered:", err);
                });
            }
        })
            .catch((err) => {
            console.error("Error sending cleanup message:", err);
        });
    });
    document.addEventListener("DOMContentLoaded", () => {
        let processPageButton = document.getElementById("processPage");
        let processCharactersButton = document.getElementById("processCharacters");
        // Initially disable the processCharactersButton
        if (processCharactersButton) {
            processCharactersButton.setAttribute("disabled", "true");
            processCharactersButton.style.opacity = "0.5";
            processCharactersButton.style.cursor = "not-allowed";
        }
        // Load settings
        loadSettings().catch((error) => {
            console.error("Error loading settings:", error);
        });
        // Add event listeners to checkboxes
        const checkboxes = getCheckboxes();
        Object.values(checkboxes).forEach((checkbox) => {
            checkbox?.addEventListener("change", () => saveSettings(processPageButton, processCharactersButton).catch((error) => console.error("Error saving settings:", error)));
        });
        processPageButton?.addEventListener("click", () => {
            console.log("Process page button clicked");
            browser.tabs
                .query({ active: true, currentWindow: true })
                .then((tabs) => {
                if (tabs[0]?.id) {
                    const currentSettings = getCurrentSettings();
                    console.log("Sending settings to content script:", currentSettings);
                    return browser.tabs.sendMessage(tabs[0].id, {
                        action: "activate",
                        settings: currentSettings,
                    });
                }
            })
                .then((response) => {
                console.log("Response from content script:");
                console.dir(response);
                if (response?.countData && processPageButton) {
                    console.log("response.countData:");
                    console.dir(response.countData);
                    // Log detailed character breakdown
                    console.log("Character breakdown:");
                    for (const [char, count] of Object.entries(response.countData.byCharacter)) {
                        if (count > 0) {
                            const charCode = char.charCodeAt(0);
                            console.log(`Character: ${char === "\u00A0"
                            ? "U+00A0 (non-breaking space)"
                            : char === "\u200B"
                                ? "U+200B (zero-width space)"
                                : char === "\u200C"
                                    ? "U+200C (zero-width non-joiner)"
                                    : char === "\u200D"
                                        ? "U+200D (zero-width joiner)"
                                        : char === "\u2060"
                                            ? "U+2060 (word joiner)"
                                            : char === "\u2061"
                                                ? "U+2061 (function application)"
                                                : char === "\u2062"
                                                    ? "U+2062 (invisible times)"
                                                    : char === "\u2063"
                                                        ? "U+2063 (invisible separator)"
                                                        : char === "\u2064"
                                                            ? "U+2064 (invisible plus)"
                                                            : char === "\uFEFF"
                                                                ? "U+FEFF (byte order mark)"
                                                                : `'${char}' (U+${charCode.toString(16).padStart(4, "0")})`}, 
                          Count: ${count}`);
                        }
                    }
                    const totalCount = response.countData.totalCount;
                    console.log(`Total targets found: ${totalCount}`);
                    // Update the processPage button text and style based on count
                    if (totalCount > 0) {
                        processPageButton.textContent = `Tracking ${totalCount} targets`;
                        processPageButton.className = "button-green";
                        // Enable the processCharactersButton and change its style
                        if (processCharactersButton) {
                            processCharactersButton.removeAttribute("disabled");
                            processCharactersButton.style.opacity = "1";
                            processCharactersButton.style.cursor = "pointer";
                            processCharactersButton.className = "button-red"; // Change to red style
                        }
                    }
                    else {
                        processPageButton.textContent = "Area secure";
                        processPageButton.className = "button-green";
                        // Keep the eliminate button disabled if no targets found
                        if (processCharactersButton) {
                            processCharactersButton.setAttribute("disabled", "true");
                            processCharactersButton.style.opacity = "0.5";
                            processCharactersButton.style.cursor = "not-allowed";
                        }
                    }
                }
            })
                .catch((error) => {
                console.error("Error communicating with content script:", error);
            });
        });
        // Add listener for the Eliminate button
        processCharactersButton?.addEventListener("click", () => {
            console.log("Process characters button clicked");
            // Send a message to the active tab's content script to eliminate characters
            browser.tabs
                .query({ active: true, currentWindow: true })
                .then((tabs) => {
                console.log("tabs for eliminate:");
                console.dir(tabs);
                if (tabs[0]?.id) {
                    return browser.tabs.sendMessage(tabs[0].id, {
                        action: "eliminate",
                    });
                }
            })
                .then((response) => {
                console.log("Response from eliminate action:");
                console.dir(response);
                if (response?.success && processCharactersButton) {
                    console.log(`Eliminated ${response.replacedCount} characters`);
                    // Update the eliminate button text to show success
                    processCharactersButton.textContent = `Eliminated ${response.replacedCount} characters`;
                    processCharactersButton.className = "button-white";
                    processCharactersButton.setAttribute("disabled", "true");
                    processCharactersButton.style.opacity = "0.7";
                    // Reset the processPage button to initial state
                    if (processPageButton) {
                        processPageButton.textContent = "Scan";
                        processPageButton.className = "button-blue";
                    }
                }
            })
                .catch((error) => {
                console.error("Error during elimination:", error);
            });
        });
    });

})();
