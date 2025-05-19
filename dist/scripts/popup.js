(function () {
    'use strict';

    // Default settings
    const defaultSettings = {
        illegalControl: true,
        unauthorizedSelectors: true,
        anomalousSpaces: true,
        illegitimateDashes: true,
        prohibitedQuotes: true,
        enhancedVisuals: true,
    };
    const settingDescriptions = {
        illegalControl: "Detects invisible control characters that can affect text layout and behavior but are not visible to the naked eye.",
        unauthorizedSelectors: "Identifies special characters that modify the appearance of emojis and other Unicode symbols.",
        anomalousSpaces: "Finds non-standard space characters that may look like regular spaces but behave differently.",
        illegitimateDashes: "Locates typographic dashes (like em-dash or en-dash) that differ from standard hyphens.",
        prohibitedQuotes: "Detects smart or curly quotes and apostrophes that replace straight quotes.",
        enhancedVisuals: "Toggles visual effects to highlight detected special characters in the text.",
    };

    const getCheckboxes = () => {
        return {
            illegalControl: document.getElementById("illegalControl"),
            unauthorizedSelectors: document.getElementById("unauthorizedSelectors"),
            anomalousSpaces: document.getElementById("anomalousSpaces"),
            illegitimateDashes: document.getElementById("illegitimateDashes"),
            prohibitedQuotes: document.getElementById("prohibitedQuotes"),
            enhancedVisuals: document.getElementById("enhancedVisuals"),
        };
    };
    const handleCheckboxChange = async (e) => {
        const checkbox = e.target;
        const id = checkbox.id;
        const checked = checkbox.checked;
        try {
            const result = await browser.storage.local.get("robocropSettings");
            const currentSettings = result.robocropSettings || defaultSettings;
            const updatedSettings = {
                ...currentSettings,
                [id]: checked,
            };
            await browser.storage.local.set({ robocropSettings: updatedSettings });
            console.dir(`Updated settings in storage:`, updatedSettings);
        }
        catch (error) {
            console.error(`Error saving checkbox state in handleChange: `, error);
        }
    };
    const configureCheckboxes = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", handleCheckboxChange);
        });
    };

    const getSettings = () => {
        const checkboxes = getCheckboxes();
        return {
            illegalControl: checkboxes.illegalControl?.checked || false,
            unauthorizedSelectors: checkboxes.unauthorizedSelectors?.checked || false,
            anomalousSpaces: checkboxes.anomalousSpaces?.checked || false,
            illegitimateDashes: checkboxes.illegitimateDashes?.checked || false,
            prohibitedQuotes: checkboxes.prohibitedQuotes?.checked || false,
            enhancedVisuals: checkboxes.enhancedVisuals?.checked || false,
        };
    };
    // Load the settings from the browser storage
    const loadSettings = async () => {
        const checkboxes = getCheckboxes();
        const result = await browser.storage.local.get("robocropSettings");
        const savedSettings = result.robocropSettings;
        if (savedSettings) {
            // console.dir("Loaded saved settings:", savedSettings);
            checkboxes.illegalControl.checked = savedSettings.illegalControl;
            checkboxes.unauthorizedSelectors.checked =
                savedSettings.unauthorizedSelectors;
            checkboxes.anomalousSpaces.checked = savedSettings.anomalousSpaces;
            checkboxes.illegitimateDashes.checked = savedSettings.illegitimateDashes;
            checkboxes.prohibitedQuotes.checked = savedSettings.prohibitedQuotes;
            checkboxes.enhancedVisuals.checked = savedSettings.enhancedVisuals;
        }
        else {
            console.log("No saved settings found, using defaults");
            await browser.storage.local.set({ robocropSettings: defaultSettings });
        }
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
        getSettings();
    };
    const handleReplaceChars = () => {
        console.log("clicked replace chars");
        getSettings();
    };
    const handleTabSwitch = (e) => {
        const target = e.target;
        if (!target.classList.contains("tab"))
            return;
        document
            .querySelectorAll(".tab")
            .forEach((tab) => tab.classList.remove("active"));
        document
            .querySelectorAll(".tab-content")
            .forEach((content) => content.classList.remove("active"));
        target.classList.add("active");
        const tabId = `${target.getAttribute("data-tab")}-tab`;
        document.getElementById(tabId)?.classList.add("active");
    };
    const configureButtons = () => {
        const findCharsButtonId = "processPage";
        const replaceCharsButtonId = "processCharacters";
        document
            .getElementById(findCharsButtonId)
            ?.addEventListener("click", handleScanPage);
        document
            .getElementById(replaceCharsButtonId)
            ?.addEventListener("click", handleReplaceChars);
        document.querySelector(".tabs")?.addEventListener("click", handleTabSwitch);
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
