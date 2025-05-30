import { RobocropSettings } from "../types/types";
import { getCheckboxes } from "./checkboxes";
import { defaultSettings } from "../constants/constants";

// =============================================================================
// GET SETTINGS
// =============================================================================

/*
This function gets the settings from the checkboxes.
*/

export const getSettings = (): RobocropSettings => {
  const checkboxes = getCheckboxes();

  return {
    invisible: checkboxes.invisible.checked,
    selectors: checkboxes.selectors.checked,
    spaces: checkboxes.spaces.checked,
    dashes: checkboxes.dashes.checked,
    // quotes: checkboxes.quotes.checked,
    // vfx: checkboxes.vfx.checked,
  };
};

// =============================================================================
// LOAD SETTINGS
// =============================================================================

/*
This function loads the settings from the browser storage.

It also sets the checkboxes to the saved settings, or the defaults if no settings are found.
*/

export const loadSettings = async () => {
  const checkboxes = getCheckboxes();

  const result = await browser.storage.local.get("robocropSettings");
  const savedSettings = result.robocropSettings as RobocropSettings;

  if (savedSettings) {
    // console.dir("Loaded saved settings:", savedSettings);
    checkboxes.invisible.checked = savedSettings.invisible;
    checkboxes.selectors.checked = savedSettings.selectors;
    checkboxes.spaces.checked = savedSettings.spaces;
    checkboxes.dashes.checked = savedSettings.dashes;
    // checkboxes.quotes.checked = savedSettings.quotes;
    // checkboxes.vfx.checked = savedSettings.vfx;
  } else {
    await browser.storage.local.set({ robocropSettings: defaultSettings });
  }
};
