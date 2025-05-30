import { RobocropSettings } from "../types/types";
import { defaultSettings } from "../constants/constants";

// =============================================================================
// GET SETTINGS
// =============================================================================

/*
This function gets the settings from the checkboxes.
*/

export const getSettings = (): RobocropSettings => {
  return {
    invisible: (document.getElementById("invisible") as HTMLInputElement)
      .checked,
    selectors: (document.getElementById("selectors") as HTMLInputElement)
      .checked,
    spaces: (document.getElementById("spaces") as HTMLInputElement).checked,
    dashes: (document.getElementById("dashes") as HTMLInputElement).checked,
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

export const loadSettings = async () => {
  const result = await browser.storage.local.get("robocropSettings");
  const savedSettings = result.robocropSettings as RobocropSettings;

  if (savedSettings) {
    (document.getElementById("invisible") as HTMLInputElement).checked =
      savedSettings.invisible;
    (document.getElementById("selectors") as HTMLInputElement).checked =
      savedSettings.selectors;
    (document.getElementById("spaces") as HTMLInputElement).checked =
      savedSettings.spaces;
    (document.getElementById("dashes") as HTMLInputElement).checked =
      savedSettings.dashes;
  } else {
    await browser.storage.local.set({ robocropSettings: defaultSettings });
  }
};
