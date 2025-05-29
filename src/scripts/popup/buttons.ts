import { buttonId } from "../constants/constants";
import { resetStatisticsTab, updateStatisticsTab } from "./tabs";
import { requestCharacterReplace } from "./requests";
import { requestCharacterScan } from "./requests";
import { ScanResponse } from "../types/types";

type ButtonState = "scan" | "eliminate" | "clear";

export const disableButton = () => {
  const button = document.getElementById(buttonId);
  if (button) {
    button.setAttribute("disabled", "true");
    button.style.opacity = "0.5";
    button.style.cursor = "not-allowed";
    button.classList.add("button-white");
  }
};

export const enableButton = () => {
  const button = document.getElementById(buttonId);
  if (button) {
    button.removeAttribute("disabled");
    button.style.opacity = "1";
    button.style.cursor = "pointer";
    button.classList.remove("button-white");
  }
};

export const resetButton = () => {
  const button = document.getElementById(buttonId) as HTMLButtonElement;
  if (button) {
    setButtonState(button, "scan");
  }
};

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

const getCurrentButtonState = (button: HTMLButtonElement): ButtonState => {
  console.dir("🔵 Popup: Button text:", button.textContent);
  const text = button.textContent?.toLowerCase() || "";

  if (text.includes("eliminate")) return "eliminate";
  if (text.includes("clear")) return "clear";
  if (text.includes("scan")) return "scan";
  return "scan";
};

export const handleScanButtonClick = async (): Promise<void> => {
  const button = document.getElementById(buttonId) as HTMLButtonElement;
  const { results } = await requestCharacterScan();
  console.dir("results in handleScanButtonClick:", results);
  if (results.totalCount > 0) {
    setButtonState(button, "eliminate");
  } else {
    setButtonState(button, "clear");
  }
  updateStatisticsTab(results);
  return;
};

export const handleEliminateButtonClick = async (): Promise<void> => {
  await requestCharacterReplace();
};

export const handleButtonClick = async (e: Event): Promise<void> => {
  const button = e.target as HTMLButtonElement;
  console.dir("🔵 Popup: Button clicked", button.textContent);

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
      await requestCharacterScan();
      break;

    default:
      console.warn("Unknown button state:", currentState);
      break;
  }
};

export const configButtons = () => {
  const buttons = document.querySelectorAll<HTMLButtonElement>("button");
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });
};
