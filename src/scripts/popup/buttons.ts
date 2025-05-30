import { buttonId } from "../constants/constants";
import { resetStatisticsTab, updateStatisticsTab } from "./tabs";
import { requestCharacterReplace } from "./requests";
import { requestCharacterScan } from "./requests";
import { ButtonState } from "../types/types";
import { getSettings } from "./settings";

// =============================================================================
// DISABLE BUTTON
// =============================================================================

/*
This function disables the button.

it is invoked when the user has disabled all the settings, leaving no characters to be highlighted.
*/

export const disableButton = () => {
  const button = document.getElementById(buttonId);
  if (button) {
    button.setAttribute("disabled", "true");
    button.style.opacity = "0.5";
    button.style.cursor = "not-allowed";
    button.classList.add("button-white");
  }
};

// =============================================================================
// ENABLE BUTTON
// =============================================================================

/*
This function enables the button.

it is invoked when the user has enabled at least one setting, allowing characters to be highlighted.
*/

export const enableButton = () => {
  const button = document.getElementById(buttonId);
  if (button) {
    button.removeAttribute("disabled");
    button.style.opacity = "1";
    button.style.cursor = "pointer";
    button.classList.remove("button-white");
  }
};

// =============================================================================
// SET BUTTON STATE
// =============================================================================

/*
This function sets the button state.

It just makes it a bit easier to switch between the three varieties we use
*/

export const setButtonState = (
  button: HTMLButtonElement,
  state: ButtonState
) => {
  // Clear all state classes
  button.classList.remove("button-blue", "button-green", "button-red");

  switch (state) {
    case "scan":
      button.classList.add("button-blue");
      button.textContent = "Scan";
      break;
    case "eliminate":
      button.classList.add("button-red");
      button.textContent = "Eliminate";
      break;
    case "clear":
      button.classList.add("button-green");
      button.textContent = "Clear";
      break;
  }
};

// =============================================================================
// GET CURRENT BUTTON STATE
// =============================================================================

/*
This function gets the current button state.

Therr was a time when this was used more than it is at present
*/

const getCurrentButtonState = (button: HTMLButtonElement): ButtonState => {
  const text = button.textContent?.toLowerCase() || "";

  if (text.includes("eliminate")) return "eliminate";
  if (text.includes("clear")) return "clear";
  if (text.includes("scan")) return "scan";
  return "scan";
};

// =============================================================================
// HANDLE SCAN BUTTON CLICK
// =============================================================================

/*
This function handles the scan button click.

It requests the characters to be scanned, updates the button state to reflect the results of the scan, and also updates the statistics accordingly
*/

export const handleScanButtonClick = async (): Promise<void> => {
  const button = document.getElementById(buttonId) as HTMLButtonElement;
  const settings = getSettings();
  const { results } = await requestCharacterScan(settings);
  if (results.totalCount > 0) {
    setButtonState(button, "eliminate");
  } else {
    setButtonState(button, "clear");
  }
  updateStatisticsTab(results);
  return;
};

// =============================================================================
// HANDLE ELIMINATE BUTTON CLICK
// =============================================================================

/*
This function handles the eliminate button click.

Pointless at present; a hangover from when i thought this would have more responsibility
*/

export const handleEliminateButtonClick = async (): Promise<void> => {
  const settings = getSettings();
  await requestCharacterReplace(settings);
};

// =============================================================================
// HANDLE BUTTON CLICK
// =============================================================================

/*
This function handles the button click, invoking the appropriate function based on the button state.

It also resets the statistics at the start of each action.
*/

export const handleButtonClick = async (e: Event): Promise<void> => {
  const button = e.target as HTMLButtonElement;

  // Reset statistics at the start of each action
  resetStatisticsTab();

  const currentState = getCurrentButtonState(button);

  switch (currentState) {
    case "scan":
      await handleScanButtonClick();
      break;

    case "eliminate":
      await handleEliminateButtonClick();
      await handleScanButtonClick();
      break;

    case "clear":
      await handleScanButtonClick();
      break;

    default:
      console.warn("Unknown button state:", currentState);
      break;
  }
};

// =============================================================================
// CONFIGURE BUTTONS
// =============================================================================

/*
This function configures the buttons on page load
*/

export const configButtons = () => {
  const buttons = document.querySelectorAll<HTMLButtonElement>("button");
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });
};
