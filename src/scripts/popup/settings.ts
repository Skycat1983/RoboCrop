import { defaultSettings } from "./constants";

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
  };
};

export const loadSettings = async () => {
  const checkboxes = getCheckboxes();

  const result = await browser.storage.local.get("characterSettings");
  const savedSettings = result.characterSettings as CharacterSettings;

  if (savedSettings) {
    console.log("Loaded saved settings:", savedSettings);
    checkboxes.hiddenControl.checked = savedSettings.hiddenControl;
    checkboxes.variationSelectors.checked = savedSettings.variationSelectors;
    checkboxes.spaces.checked = savedSettings.spaces;
    checkboxes.dashes.checked = savedSettings.dashes;
    checkboxes.quotes.checked = savedSettings.quotes;
  } else {
    console.log("No saved settings found, using defaults");
    await browser.storage.local.set({ characterSettings: defaultSettings });
  }
};

export const saveSettings = async (
  processPageButton: HTMLButtonElement | null,
  processCharactersButton: HTMLButtonElement | null
) => {
  const checkboxes = getCheckboxes();

  const settings: CharacterSettings = {
    hiddenControl: checkboxes.hiddenControl?.checked || false,
    variationSelectors: checkboxes.variationSelectors?.checked || false,
    spaces: checkboxes.spaces?.checked || false,
    dashes: checkboxes.dashes?.checked || false,
    quotes: checkboxes.quotes?.checked || false,
  };

  console.log("Saving settings:", settings);
  await browser.storage.local.set({ characterSettings: settings });

  const tabs = await browser.tabs.query({ active: true, currentWindow: true });

  if (tabs[0]?.id) {
    console.log("Settings changed, sending cleanup message to reset effects");
    await browser.tabs.sendMessage(tabs[0].id, { action: "cleanup" });
  }

  // Reset buttons to initial state
  if (processPageButton) {
    processPageButton.textContent = "Scan";
    processPageButton.className = "button-blue";
  }
  if (processCharactersButton) {
    processCharactersButton.textContent = "Eliminate";
    processCharactersButton.className = "button-white";
    processCharactersButton.setAttribute("disabled", "true");
    processCharactersButton.style.opacity = "0.5";
    processCharactersButton.style.cursor = "not-allowed";
  }
};

export const getCurrentSettings = () => {
  const checkboxes = getCheckboxes();

  return {
    hiddenControl: checkboxes.hiddenControl?.checked || false,
    variationSelectors: checkboxes.variationSelectors?.checked || false,
    spaces: checkboxes.spaces?.checked || false,
    dashes: checkboxes.dashes?.checked || false,
    quotes: checkboxes.quotes?.checked || false,
  };
};
