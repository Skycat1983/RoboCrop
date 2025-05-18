import { loadSettings } from "./settings";

import { configureButtons } from "./buttons";
import { configureTooltips } from "./tooltips";
import { configureCheckboxes } from "./checkboxes";
console.log("Popup index script loaded");

async function initialize() {
  console.log("Initializing popup");
  try {
    await loadSettings();
    configureButtons();
    configureTooltips();
    configureCheckboxes();
  } catch (error) {
    console.error("Error loading settings:", error);
  }
}

document.addEventListener("DOMContentLoaded", initialize);
