import { RobocropSettings, defaultSettings } from "./constants";

export const getCheckboxes = () => {
  return {
    hiddenControl: document.getElementById(
      "setting-hidden-control"
    ) as HTMLInputElement,
    variationSelectors: document.getElementById(
      "setting-variation-selectors"
    ) as HTMLInputElement,
    spaces: document.getElementById("setting-spaces") as HTMLInputElement,
    dashes: document.getElementById("setting-dashes") as HTMLInputElement,
    quotes: document.getElementById("setting-quotes") as HTMLInputElement,
    vfx: document.getElementById("setting-vfx") as HTMLInputElement,
  };
};

export const handleCheckboxChange = async (e: Event) => {
  const checkbox = e.target as HTMLInputElement;
  const id = checkbox.id.replace("setting-", "") as keyof RobocropSettings;
  const checked = checkbox.checked;

  try {
    // get current settings
    const result = await browser.storage.local.get("robocropSettings");
    const currentSettings = result.robocropSettings || defaultSettings;

    // update the specific setting
    const updatedSettings: RobocropSettings = {
      ...currentSettings,
      [id]: checked,
    };

    // save all settings
    await browser.storage.local.set({ robocropSettings: updatedSettings });
    console.log(`Updated settings in storage:`, updatedSettings);
  } catch (error) {
    console.error(`Error saving checkbox state in handleChange: `, error);
  }
};

export const configureCheckboxes = () => {
  const checkboxes = document.querySelectorAll<HTMLInputElement>(
    'input[type="checkbox"]'
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });
};
