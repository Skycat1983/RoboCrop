import { settingDescriptions } from "./constants";

type SettingId = keyof typeof settingDescriptions;

// Get the checkboxes from the DOM
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

export const handleChange = (e: Event) => {
  console.log("checkbox changed", e.target);
  const checkbox = e.target as HTMLInputElement;
  const id = checkbox.id;
  const checked = checkbox.checked;
  console.log("checkbox id", id);
  console.log("checkbox checked", checked);
};

export const configureCheckboxes = () => {
  const checkboxes = document.querySelectorAll<HTMLInputElement>(
    'input[type="checkbox"]'
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleChange);
  });
};
