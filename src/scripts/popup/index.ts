import { loadSettings } from "./settings";
import { configButtons } from "./buttons";
import { configureTooltips } from "./tooltips";
import { configureCheckboxes } from "./checkboxes";
import { configTabs } from "./tabs";
console.log("Popup index script loaded");

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
