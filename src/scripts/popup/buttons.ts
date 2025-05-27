import { ScanResponse } from "../content/index";
import { buttonId, RobocropSettings } from "./constants";
import { getSettings } from "./settings";
import { resetStatisticsTab, updateStatisticsTab } from "./tabs";

export const disableButton = () => {
  let button = document.getElementById(buttonId);
  if (button) {
    button.setAttribute("disabled", "true");
    button.style.opacity = "0.5";
    button.style.cursor = "not-allowed";
    button.classList.add("button-white");
  }
};

export const enableButton = () => {
  let button = document.getElementById(buttonId);
  if (button) {
    button.removeAttribute("disabled");
    button.style.opacity = "1";
    button.style.cursor = "pointer";
    button.classList.remove("button-white");
  }
};

export interface ScanMessage {
  action: "scan";
  settings: RobocropSettings;
}

export const handleButtonClick = async (e: Event): Promise<void> => {
  const target = e.target as HTMLElement;
  console.log("🔵 Popup: Button clicked", target);
  const id = target.id;

  console.log("🔵 Popup: Button clicked", id);

  // Reset statistics at the start of each scan
  resetStatisticsTab();

  try {
    const [activeTab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!activeTab?.id) {
      throw new Error("No active tab found");
    }

    const settings = getSettings();

    const response: ScanResponse = await browser.tabs.sendMessage(
      activeTab.id,
      {
        action: "scan",
        settings: settings,
      } as ScanMessage
    );

    console.log("response in handleButtonClick:", response);
    console.log("response type:", typeof response);
    console.log("response.received:", response?.received);
    console.log("response.foundCount:", response?.foundCount);
    console.dir("response.countData:", response?.countData);

    if (!response?.received) {
      throw new Error("Unknown error from content script");
    }

    // change the button text to show 'eliminate' if there are characters found
    if (response.foundCount > 0) {
      target.classList.remove("button-blue");
      target.classList.add("button-red");
      target.textContent = "Eliminate";
    } else {
      target.textContent = "Scan";
      target.classList.remove("button-red");
      target.classList.add("button-blue");
    }

    updateStatisticsTab(response.countData);
  } catch (error) {
    console.error("🔴 Popup: Failed to activate content script:", error);
    throw error;
  }
};

export const configButtons = () => {
  // Initialize statistics display

  const buttons = document.querySelectorAll<HTMLButtonElement>("button");
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });
};
