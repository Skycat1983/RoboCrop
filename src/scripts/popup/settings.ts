import { getCheckboxes } from "./checkboxes";
import { RobocropSettings, defaultSettings } from "./constants";

export const getSettings = (): RobocropSettings => {
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

// Load the settings from the browser storage
export const loadSettings = async () => {
  const checkboxes = getCheckboxes();

  const result = await browser.storage.local.get("robocropSettings");
  const savedSettings = result.robocropSettings as RobocropSettings;

  if (savedSettings) {
    // console.dir("Loaded saved settings:", savedSettings);
    checkboxes.hiddenControl.checked = savedSettings.hiddenControl;
    checkboxes.variationSelectors.checked = savedSettings.variationSelectors;
    checkboxes.spaces.checked = savedSettings.spaces;
    checkboxes.dashes.checked = savedSettings.dashes;
    checkboxes.quotes.checked = savedSettings.quotes;
    checkboxes.vfx.checked = savedSettings.vfx;
  } else {
    console.log("No saved settings found, using defaults");
    await browser.storage.local.set({ characterSettings: defaultSettings });
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
