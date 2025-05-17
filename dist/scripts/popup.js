(function () {
    'use strict';

    // Get the checkboxes from the DOM
    const getCheckboxes = () => {
        return {
            hiddenControl: document.getElementById("setting-hidden-control"),
            variationSelectors: document.getElementById("setting-variation-selectors"),
            spaces: document.getElementById("setting-spaces"),
            dashes: document.getElementById("setting-dashes"),
            quotes: document.getElementById("setting-quotes"),
            vfx: document.getElementById("setting-vfx"),
        };
    };
    const handleChange = (e) => {
        console.log("checkbox changed", e.target);
        const checkbox = e.target;
        const id = checkbox.id;
        const checked = checkbox.checked;
        console.log("checkbox id", id);
        console.log("checkbox checked", checked);
    };
    const configureCheckboxes = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", handleChange);
        });
    };

    // Default settings
    const defaultSettings = {
        hiddenControl: true,
        variationSelectors: true,
        spaces: true,
        dashes: true,
        quotes: true,
        vfx: true,
    };
    const settingDescriptions = {
        "setting-hidden-control": "Detects invisible control characters that can affect text layout and behavior but are not visible to the naked eye.",
        "setting-variation-selectors": "Identifies special characters that modify the appearance of emojis and other Unicode symbols.",
        "setting-spaces": "Finds non-standard space characters that may look like regular spaces but behave differently.",
        "setting-dashes": "Locates typographic dashes (like em-dash or en-dash) that differ from standard hyphens.",
        "setting-quotes": "Detects smart or curly quotes and apostrophes that replace straight quotes.",
        "setting-vfx": "Toggles visual effects to highlight detected special characters in the text.",
    };

    // Load the settings from the browser storage
    const loadSettings = async () => {
        const checkboxes = getCheckboxes();
        const result = await browser.storage.local.get("characterSettings");
        const savedSettings = result.characterSettings;
        if (savedSettings) {
            // console.dir("Loaded saved settings:", savedSettings);
            checkboxes.hiddenControl.checked = savedSettings.hiddenControl;
            checkboxes.variationSelectors.checked = savedSettings.variationSelectors;
            checkboxes.spaces.checked = savedSettings.spaces;
            checkboxes.dashes.checked = savedSettings.dashes;
            checkboxes.quotes.checked = savedSettings.quotes;
            checkboxes.vfx.checked = savedSettings.vfx;
        }
        else {
            console.log("No saved settings found, using defaults");
            await browser.storage.local.set({ characterSettings: defaultSettings });
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
            vfx: checkboxes.vfx?.checked || false,
        };
    };
    // Save the settings to the browser storage
    // export const saveSettings = async (
    //   processPageButton: HTMLButtonElement | null,
    //   processCharactersButton: HTMLButtonElement | null
    // ) => {
    //   const checkboxes = getCheckboxes();
    //   const settings: CharacterSettings = {
    //     hiddenControl: checkboxes.hiddenControl?.checked || false,
    //     variationSelectors: checkboxes.variationSelectors?.checked || false,
    //     spaces: checkboxes.spaces?.checked || false,
    //     dashes: checkboxes.dashes?.checked || false,
    //     quotes: checkboxes.quotes?.checked || false,
    //     vfx: checkboxes.vfx?.checked || false,
    //   };
    //   console.log("Saving settings:", settings);
    //   await browser.storage.local.set({ characterSettings: settings });
    //   const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    //   if (tabs[0]?.id) {
    //     console.log("Settings changed, sending cleanup message to reset effects");
    //     await browser.tabs.sendMessage(tabs[0].id, { action: "cleanup" });
    //   }
    //   // Reset buttons to initial state
    //   if (processPageButton) {
    //     processPageButton.textContent = "Scan";
    //     processPageButton.className = "button-blue";
    //   }
    //   if (processCharactersButton) {
    //     processCharactersButton.textContent = "Eliminate";
    //     processCharactersButton.className = "button-white";
    //     processCharactersButton.setAttribute("disabled", "true");
    //     processCharactersButton.style.opacity = "0.5";
    //     processCharactersButton.style.cursor = "not-allowed";
    //   }
    // };

    const handleScanPage = (e) => {
        e.preventDefault();
        console.log("clicked scan page", e.target);
        const settings = getCurrentSettings();
        console.dir("Settings in handleScanPage:", settings);
    };
    const handleReplaceChars = () => {
        console.log("clicked replace chars");
        const settings = getCurrentSettings();
        console.dir("Settings in handleReplaceChars:", settings);
    };
    const configureButtons = () => {
        const findCharsButtonId = "processPage";
        const replaceCharsButtonId = "processCharacters";
        const findCharsButton = document.getElementById(findCharsButtonId);
        const replaceCharsButton = document.getElementById(replaceCharsButtonId);
        if (findCharsButton) {
            findCharsButton.addEventListener("click", handleScanPage);
        }
        if (replaceCharsButton) {
            replaceCharsButton.addEventListener("click", handleReplaceChars);
        }
    };

    const configureTooltips = () => {
        // Get all checkbox containers
        const checkboxContainers = document.querySelectorAll(".checkbox-item");
        checkboxContainers.forEach((container) => {
            // Get the input and label within this container
            const input = container.querySelector('input[type="checkbox"]');
            const label = container.querySelector("label");
            if (!input || !label)
                return;
            const description = settingDescriptions[input.id];
            if (description) {
                // Add tooltip to container for larger hover area
                container.setAttribute("title", description);
                container.setAttribute("aria-label", description);
                // Add tooltip to input for accessibility
                input.setAttribute("title", description);
                input.setAttribute("aria-description", description);
                // Add tooltip to label for accessibility
                label.setAttribute("title", description);
                label.setAttribute("aria-label", `${label.textContent} - ${description}`);
            }
        });
    };

    console.log("Popup index script loaded");
    async function initialize() {
        console.log("Initializing popup");
        try {
            await loadSettings();
            configureButtons();
            configureTooltips();
            configureCheckboxes();
        }
        catch (error) {
            console.error("Error loading settings:", error);
        }
    }
    document.addEventListener("DOMContentLoaded", initialize);

})();
