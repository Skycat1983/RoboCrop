import { disableButton, enableButton } from "./buttons";
import { RobocropSettings } from "../types/types";
import { defaultSettings } from "../constants/constants";

// =============================================================================
// GET CHECKBOXES
// =============================================================================

/*
This function gets the checkboxes from the page.
*/

export const getCheckboxes = () => {
  return {
    invisible: document.getElementById("invisible") as HTMLInputElement,
    selectors: document.getElementById("selectors") as HTMLInputElement,
    spaces: document.getElementById("spaces") as HTMLInputElement,
    dashes: document.getElementById("dashes") as HTMLInputElement,
    // quotes: document.getElementById("quotes") as HTMLInputElement,
    // vfx: document.getElementById("vfx") as HTMLInputElement,
  };
};

// =============================================================================
// HANDLE CHECKBOX CHANGE
// =============================================================================

/*
This function handles the checkbox change.
*/

export const handleCheckboxChange = async (e: Event) => {
  const checkbox = e.target as HTMLInputElement;
  const id = checkbox.id as keyof RobocropSettings;
  const checked = checkbox.checked;

  try {
    const result = await browser.storage.local.get("robocropSettings");
    const currentSettings = result.robocropSettings || defaultSettings;
    const updatedSettings: RobocropSettings = {
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
    console.log("🔵 Popup: Enabled settings:", enabledSettings);
    await browser.storage.local.set({ robocropSettings: updatedSettings });
    console.dir(`Updated settings in storage:`, updatedSettings);
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

export const configureCheckboxes = () => {
  const checkboxes = document.querySelectorAll<HTMLInputElement>(
    'input[type="checkbox"]'
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });
};
