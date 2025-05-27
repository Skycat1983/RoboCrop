(function () {
    'use strict';

    const buttonId = "my-button";
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
    const updateStatisticsTab = (countData) => {
        console.log("📊 Updating statistics display with countData:", countData);
        // Update individual category counts
        Object.entries(countData.byCategory).forEach(([category, categoryData]) => {
            const statItem = document.querySelector(`[data-category="${category}"]`);
            const statElement = document.querySelector(`[data-category="${category}"] .stat-value`);
            if (statElement && statItem) {
                const count = categoryData.count;
                statElement.textContent = count.toString();
                // Update CSS classes based on count
                if (count > 0) {
                    statItem.classList.remove("stat-inactive");
                    statItem.classList.add("stat-active");
                    statElement.classList.remove("stat-value-inactive");
                    statElement.classList.add("stat-value-active");
                }
                else {
                    statItem.classList.remove("stat-active");
                    statItem.classList.add("stat-inactive");
                    statElement.classList.remove("stat-value-active");
                    statElement.classList.add("stat-value-inactive");
                }
                console.log(`Updated ${category}: ${count} (${count > 0 ? "active" : "inactive"})`);
            }
            else {
                console.warn(`Could not find stat element for category: ${category}`);
            }
        });
        // Update total count
        const totalItem = document.querySelector(`[data-category="total"]`);
        const totalElement = document.querySelector(`[data-category="total"] .stat-value`);
        if (totalElement && totalItem) {
            const totalCount = countData.totalCount;
            totalElement.textContent = totalCount.toString();
            // Update CSS classes for total
            if (totalCount > 0) {
                totalItem.classList.remove("stat-inactive");
                totalItem.classList.add("stat-active");
                totalElement.classList.remove("stat-value-inactive");
                totalElement.classList.add("stat-value-active");
            }
            else {
                totalItem.classList.remove("stat-active");
                totalItem.classList.add("stat-inactive");
                totalElement.classList.remove("stat-value-active");
                totalElement.classList.add("stat-value-inactive");
            }
            console.log(`Updated total: ${totalCount} (${totalCount > 0 ? "active" : "inactive"})`);
        }
        else {
            console.warn("Could not find total stat element");
        }
    };
    const resetStatisticsTab = () => {
        console.log("📊 Resetting statistics display");
        // Reset all stat values to 0 and set inactive state
        const statItems = document.querySelectorAll(".stat-item");
        const statElements = document.querySelectorAll(".stat-value");
        statItems.forEach((item) => {
            item.classList.remove("stat-active");
            item.classList.add("stat-inactive");
        });
        statElements.forEach((element) => {
            element.textContent = "0";
            element.classList.remove("stat-value-active");
            element.classList.add("stat-value-inactive");
        });
    };
    const configTabs = () => {
        // setup for tab buttons
        const tabs = document.querySelectorAll(".tab");
        tabs.forEach((tab) => {
            tab.addEventListener("click", handleTabSwitch);
        });
        // set initial inactive state for all stat tab items
        const statItems = document.querySelectorAll(".stat-item");
        const statElements = document.querySelectorAll(".stat-value");
        statItems.forEach((item) => {
            item.classList.add("stat-inactive");
        });
        statElements.forEach((element) => {
            element.classList.add("stat-value-inactive");
        });
    };

    const disableButton = () => {
        let button = document.getElementById(buttonId);
        if (button) {
            button.setAttribute("disabled", "true");
            button.style.opacity = "0.5";
            button.style.cursor = "not-allowed";
            button.classList.add("button-white");
        }
    };
    const enableButton = () => {
        let button = document.getElementById(buttonId);
        if (button) {
            button.removeAttribute("disabled");
            button.style.opacity = "1";
            button.style.cursor = "pointer";
            button.classList.remove("button-white");
        }
    };
    const handleButtonClick = async (e) => {
        const target = e.target;
        console.log("🔵 Popup: Button clicked", target);
        const id = target.id;
        console.log("🔵 Popup: Button clicked", id);
        // Reset statistics at the start of each scan
        resetStatisticsTab();
        try {
            const [activeTab] = await browser.tabs.query({
                active: true,
                currentWindow: true,
            });
            if (!activeTab?.id) {
                throw new Error("No active tab found");
            }
            const settings = getSettings();
            const response = await browser.tabs.sendMessage(activeTab.id, {
                action: "scan",
                settings: settings,
            });
            console.log("response in handleButtonClick:", response);
            console.log("response type:", typeof response);
            console.log("response.received:", response?.received);
            console.log("response.foundCount:", response?.foundCount);
            console.dir("response.countData:", response?.countData);
            if (!response?.received) {
                throw new Error("Unknown error from content script");
            }
            // change the button text to show 'eliminate' if there are characters found
            if (response.foundCount > 0) {
                target.classList.remove("button-blue");
                target.classList.add("button-red");
                target.textContent = "Eliminate";
            }
            else {
                target.textContent = "Scan";
                target.classList.remove("button-red");
                target.classList.add("button-blue");
            }
            updateStatisticsTab(response.countData);
        }
        catch (error) {
            console.error("🔴 Popup: Failed to activate content script:", error);
            throw error;
        }
    };
    const configButtons = () => {
        // Initialize statistics display
        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
            button.addEventListener("click", handleButtonClick);
        });
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
            const enabledSettings = Object.entries(updatedSettings).filter(([key, value]) => {
                return value === true;
            });
            if (!enabledSettings.length) {
                disableButton();
            }
            else {
                enableButton();
            }
            console.log("🔵 Popup: Enabled settings:", enabledSettings);
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
            illegalControl: checkboxes.illegalControl.checked,
            unauthorizedSelectors: checkboxes.unauthorizedSelectors.checked,
            anomalousSpaces: checkboxes.anomalousSpaces.checked,
            illegitimateDashes: checkboxes.illegitimateDashes.checked,
            prohibitedQuotes: checkboxes.prohibitedQuotes.checked,
            enhancedVisuals: checkboxes.enhancedVisuals.checked,
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
    async function initializePopup() {
        console.log("Initializing popup");
        try {
            await loadSettings();
            configTabs();
            configureCheckboxes();
            configureTooltips();
            configButtons();
        }
        catch (error) {
            console.error("Error initializing:", error);
        }
    }
    document.addEventListener("DOMContentLoaded", initializePopup);

})();
