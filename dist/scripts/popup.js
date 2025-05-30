(function () {
  "use strict";

  const buttonId = "my-button";
  // Default settings
  const defaultSettings = {
    invisible: true,
    selectors: true,
    spaces: true,
    dashes: true,
    // quotes: true,
    // vfx: true,
  };
  // Setting descriptions
  const settingDescriptions = {
    invisible:
      "Detects invisible control characters that can affect text layout and behavior but are not visible to the naked eye.",
    selectors:
      "Identifies special characters that modify the appearance of emojis and other Unicode symbols.",
    spaces:
      "Finds non-standard space characters that may look like regular spaces but behave differently.",
    dashes:
      "Locates typographic dashes (like em-dash or en-dash) that differ from standard hyphens.",
    // quotes:
    //   "Detects smart or curly quotes and apostrophes that replace straight quotes.",
    // vfx: "Toggles visual effects to highlight detected special characters in the text.",
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
  // GET SETTINGS
  // =============================================================================
  /*
    This function gets the settings from the checkboxes.
    */
  const getSettings = () => {
    return {
      invisible: document.getElementById("invisible").checked,
      selectors: document.getElementById("selectors").checked,
      spaces: document.getElementById("spaces").checked,
      dashes: document.getElementById("dashes").checked,
      // quotes: (document.getElementById("quotes") as HTMLInputElement).checked,
      // vfx: (document.getElementById("vfx") as HTMLInputElement).checked,
    };
  };
  // =============================================================================
  // LOAD SETTINGS
  // =============================================================================
  /*
    This function loads the settings from the browser storage.

    It also sets the checkboxes to the saved settings, or the defaults if no settings are found.
    */
  const loadSettings = async () => {
    const result = await browser.storage.local.get("robocropSettings");
    const savedSettings = result.robocropSettings;
    if (savedSettings) {
      document.getElementById("invisible").checked = savedSettings.invisible;
      document.getElementById("selectors").checked = savedSettings.selectors;
      document.getElementById("spaces").checked = savedSettings.spaces;
      document.getElementById("dashes").checked = savedSettings.dashes;
    } else {
      await browser.storage.local.set({ robocropSettings: defaultSettings });
    }
  };

  // =============================================================================
  // HANDLE TAB SWITCH
  // =============================================================================
  /*
    This function handles the tab switch (between stats and settings tabs)
    */
  const handleTabSwitch = (e) => {
    const target = e.target;
    if (!target.classList.contains("tab")) return;
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
  // =============================================================================
  // UPDATE STATISTICS TAB
  // =============================================================================
  /*
    This function updates the statistics tab with the results of the scan.
    */
  const updateStatisticsTab = (results) => {
    // Update individual category counts
    Object.entries(results.byCategory).forEach(([category, categoryData]) => {
      const statItem = document.querySelector(`[data-category="${category}"]`);
      const statElement = document.querySelector(
        `[data-category="${category}"] .stat-value`
      );
      if (statElement && statItem) {
        const count = categoryData.count;
        statElement.textContent = count.toString();
        // Update CSS classes based on count
        if (count > 0) {
          statItem.classList.remove("stat-inactive");
          statItem.classList.add("stat-active");
          statElement.classList.remove("stat-value-inactive");
          statElement.classList.add("stat-value-active");
        } else {
          statItem.classList.remove("stat-active");
          statItem.classList.add("stat-inactive");
          statElement.classList.remove("stat-value-active");
          statElement.classList.add("stat-value-inactive");
        }
      }
    });
    // Update total count
    const totalItem = document.querySelector(`[data-category="total"]`);
    const totalElement = document.querySelector(
      `[data-category="total"] .stat-value`
    );
    if (totalElement && totalItem) {
      const totalCount = results.totalCount;
      totalElement.textContent = totalCount.toString();
      // Update CSS classes for total
      if (totalCount > 0) {
        totalItem.classList.remove("stat-inactive");
        totalItem.classList.add("stat-active");
        totalElement.classList.remove("stat-value-inactive");
        totalElement.classList.add("stat-value-active");
      } else {
        totalItem.classList.remove("stat-active");
        totalItem.classList.add("stat-inactive");
        totalElement.classList.remove("stat-value-active");
        totalElement.classList.add("stat-value-inactive");
      }
    } else {
      console.warn("Could not find total stat element");
    }
  };
  // =============================================================================
  // RESET STATISTICS TAB
  // =============================================================================
  /*
    This function resets the statistics tab.

    It runs on each button click for simplicity.
    */
  const resetStatisticsTab = () => {
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
  // =============================================================================
  // CONFIGURE TABS
  // =============================================================================
  /*
    This function configures the tabs on page load.
    */
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

  // =============================================================================
  // GET ACTIVE BROWSER TAB
  // =============================================================================
  /*
    This function gets the active browser tab.

    it is used by the request functions to ensure the content script is running in the correct tab.
    */
  const getActiveBrowserTab = async () => {
    const [activeTab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!activeTab?.id) {
      throw new Error("No active tab found");
    }
    return activeTab;
  };

  // =============================================================================
  // REQUEST CHARACTER SCAN
  // =============================================================================
  /*
    This function requests the characters to be scanned.

    It sends the settings to the content script to find the characters and await the response.
    */
  const requestCharacterScan = async (settings) => {
    try {
      const activeTab = await getActiveBrowserTab();
      const response = await browser.tabs.sendMessage(activeTab.id, {
        action: "findCharacters",
        settings: settings,
      });
      return response;
    } catch (error) {
      console.error("🔴 Popup: Failed to scan for characters:", error);
      throw error;
    }
  };
  // =============================================================================
  // REQUEST CHARACTER REPLACE
  // =============================================================================
  /*
    This function requests the characters to be replaced.

    once again, it sends the settings .
    */
  const requestCharacterReplace = async (settings) => {
    try {
      const activeTab = await getActiveBrowserTab();
      // TODO: Send eliminate message to content script
      await browser.tabs.sendMessage(activeTab.id, {
        action: "replaceCharacters",
        settings: settings,
      });
      return;
    } catch (error) {
      console.error("🔴 Popup: Failed to eliminate characters:", error);
      throw error;
    }
  };

  // =============================================================================
  // DISABLE BUTTON
  // =============================================================================
  /*
    This function disables the button.

    it is invoked when the user has disabled all the settings, leaving no characters to be highlighted.
    */
  const disableButton = () => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.setAttribute("disabled", "true");
      button.style.opacity = "0.5";
      button.style.cursor = "not-allowed";
      button.classList.add("button-white");
    }
  };
  // =============================================================================
  // ENABLE BUTTON
  // =============================================================================
  /*
    This function enables the button.

    it is invoked when the user has enabled at least one setting, allowing characters to be highlighted.
    */
  const enableButton = () => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.removeAttribute("disabled");
      button.style.opacity = "1";
      button.style.cursor = "pointer";
      button.classList.remove("button-white");
    }
  };
  // =============================================================================
  // SET BUTTON STATE
  // =============================================================================
  /*
    This function sets the button state.

    It just makes it a bit easier to switch between the three varieties we use
    */
  const setButtonState = (button, state) => {
    // Clear all state classes
    button.classList.remove("button-blue", "button-green", "button-red");
    switch (state) {
      case "scan":
        button.classList.add("button-blue");
        button.textContent = "Scan";
        break;
      case "eliminate":
        button.classList.add("button-red");
        button.textContent = "Eliminate";
        break;
      case "clear":
        button.classList.add("button-green");
        button.textContent = "Clear";
        break;
    }
  };
  // =============================================================================
  // GET CURRENT BUTTON STATE
  // =============================================================================
  /*
    This function gets the current button state.

    Therr was a time when this was used more than it is at present
    */
  const getCurrentButtonState = (button) => {
    console.dir("🔵 Popup: Button text:", button.textContent);
    const text = button.textContent?.toLowerCase() || "";
    if (text.includes("eliminate")) return "eliminate";
    if (text.includes("clear")) return "clear";
    if (text.includes("scan")) return "scan";
    return "scan";
  };
  // =============================================================================
  // HANDLE SCAN BUTTON CLICK
  // =============================================================================
  /*
    This function handles the scan button click.

    It requests the characters to be scanned, updates the button state to reflect the results of the scan, and also updates the statistics accordingly
    */
  const handleScanButtonClick = async () => {
    const button = document.getElementById(buttonId);
    const settings = getSettings();
    const { results } = await requestCharacterScan(settings);
    console.dir("results in handleScanButtonClick:", results);
    if (results.totalCount > 0) {
      setButtonState(button, "eliminate");
    } else {
      setButtonState(button, "clear");
    }
    updateStatisticsTab(results);
    return;
  };
  // =============================================================================
  // HANDLE ELIMINATE BUTTON CLICK
  // =============================================================================
  /*
    This function handles the eliminate button click.

    Pointless at present; a hangover from when i thought this would have more responsibility
    */
  const handleEliminateButtonClick = async () => {
    const settings = getSettings();
    await requestCharacterReplace(settings);
  };
  // =============================================================================
  // HANDLE BUTTON CLICK
  // =============================================================================
  /*
    This function handles the button click, invoking the appropriate function based on the button state.

    It also resets the statistics at the start of each action.
    */
  const handleButtonClick = async (e) => {
    const button = e.target;
    // Reset statistics at the start of each action
    resetStatisticsTab();
    const currentState = getCurrentButtonState(button);
    switch (currentState) {
      case "scan":
        await handleScanButtonClick();
        break;
      case "eliminate":
        await handleEliminateButtonClick();
        await handleScanButtonClick();
        break;
      case "clear":
        await handleScanButtonClick();
        break;
      default:
        console.warn("Unknown button state:", currentState);
        break;
    }
  };
  // =============================================================================
  // CONFIGURE BUTTONS
  // =============================================================================
  /*
    This function configures the buttons on page load
    */
  const configButtons = () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", handleButtonClick);
    });
  };

  // =============================================================================
  // CONFIGURE TOOLTIPS
  // =============================================================================
  /*
    This function configures the tooltips on page load.

    the tooltips are added to the checkboxes, and the labels, to help the user understand the settings.
    */
  const configureTooltips = () => {
    // Get all checkbox containers
    const checkboxContainers = document.querySelectorAll(".checkbox-item");
    checkboxContainers.forEach((container) => {
      // Get the input and label within this container
      const input = container.querySelector('input[type="checkbox"]');
      const label = container.querySelector("label");
      if (!input || !label) return;
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
        label.setAttribute(
          "aria-label",
          `${label.textContent} - ${description}`
        );
      }
    });
  };

  // =============================================================================
  // HANDLE CHECKBOX CHANGE
  // =============================================================================
  /*
    This function handles the checkbox change.
    */
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
      const enabledSettings = Object.entries(updatedSettings).filter(
        ([key, value]) => {
          return value === true;
        }
      );
      if (!enabledSettings.length) {
        disableButton();
      } else {
        enableButton();
      }
      await browser.storage.local.set({ robocropSettings: updatedSettings });
    } catch (error) {
      console.error(`Error saving checkbox state in handleChange: `, error);
    }
  };
  // =============================================================================
  // CONFIGURE CHECKBOXES
  // =============================================================================
  /*
    This function configures the checkboxes on page load.
    */
  const configureCheckboxes = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", handleCheckboxChange);
    });
  };

  // =============================================================================
  // INITIALIZE POPUP
  // =============================================================================
  /*
    This function initializes the popup once the DOM has loaded.

    It loads the settings, configures the tabs, checkboxes, tooltips, and buttons.
    */
  async function initializePopup() {
    try {
      await loadSettings();
      configTabs();
      configureCheckboxes();
      configureTooltips();
      configButtons();
    } catch (error) {
      console.error("Error initializing:", error);
    }
  }
  document.addEventListener("DOMContentLoaded", initializePopup);
})();
