import { getCheckboxes } from "./checkboxes";
import { RobocropSettings, defaultSettings } from "./constants";

export const getSettings = (): RobocropSettings => {
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
export const loadSettings = async () => {
  const checkboxes = getCheckboxes();

  const result = await browser.storage.local.get("robocropSettings");
  const savedSettings = result.robocropSettings as RobocropSettings;

  if (savedSettings) {
    // console.dir("Loaded saved settings:", savedSettings);
    checkboxes.illegalControl.checked = savedSettings.illegalControl;
    checkboxes.unauthorizedSelectors.checked =
      savedSettings.unauthorizedSelectors;
    checkboxes.anomalousSpaces.checked = savedSettings.anomalousSpaces;
    checkboxes.illegitimateDashes.checked = savedSettings.illegitimateDashes;
    checkboxes.prohibitedQuotes.checked = savedSettings.prohibitedQuotes;
    checkboxes.enhancedVisuals.checked = savedSettings.enhancedVisuals;
  } else {
    console.log("No saved settings found, using defaults");
    await browser.storage.local.set({ robocropSettings: defaultSettings });
  }
};
