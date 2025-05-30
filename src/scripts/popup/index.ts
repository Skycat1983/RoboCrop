import { loadSettings } from "./settings";
import { configButtons } from "./buttons";
import { configureTooltips } from "./tooltips";
import { configureCheckboxes } from "./checkboxes";
import { configTabs } from "./tabs";

// =============================================================================
// INITIALIZE POPUP
// =============================================================================

/*
This function initializes the popup once the DOM has loaded.

It loads the settings, configures the tabs, checkboxes, tooltips, and buttons.
*/

async function initializePopup() {
  console.log("Initializing popup");
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
