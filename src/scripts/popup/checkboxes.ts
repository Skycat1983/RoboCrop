import { disableButton, enableButton } from "./buttons";
import { RobocropSettings } from "../types/types";
import { defaultSettings } from "../constants/constants";

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

export const configureCheckboxes = () => {
  const checkboxes = document.querySelectorAll<HTMLInputElement>(
    'input[type="checkbox"]'
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });
};
