import { RobocropSettings, defaultSettings } from "./constants";

export const getCheckboxes = () => {
  return {
    illegalControl: document.getElementById(
      "illegalControl"
    ) as HTMLInputElement,
    unauthorizedSelectors: document.getElementById(
      "unauthorizedSelectors"
    ) as HTMLInputElement,
    anomalousSpaces: document.getElementById(
      "anomalousSpaces"
    ) as HTMLInputElement,
    illegitimateDashes: document.getElementById(
      "illegitimateDashes"
    ) as HTMLInputElement,
    prohibitedQuotes: document.getElementById(
      "prohibitedQuotes"
    ) as HTMLInputElement,
    enhancedVisuals: document.getElementById(
      "enhancedVisuals"
    ) as HTMLInputElement,
  };
};

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
    await browser.storage.local.set({ robocropSettings: updatedSettings });
    console.dir(`Updated settings in storage:`, updatedSettings);
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
