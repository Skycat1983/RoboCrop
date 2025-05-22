import { buttonId } from "./constants";

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

export const handleButtonClick = async (e: Event): Promise<void> => {
  const target = e.target as HTMLElement;
  console.log("🔵 Popup: Button clicked", target);
  const id = target.id;

  console.log("🔵 Popup: Button clicked", id);

  try {
    const [activeTab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!activeTab?.id) {
      throw new Error("No active tab found");
    }

    const response = await browser.tabs.sendMessage(activeTab.id, {
      action: "scan",
    });

    if (!response?.received) {
      throw new Error(response?.error || "Unknown error from content script");
    }
  } catch (error) {
    console.error("🔴 Popup: Failed to activate content script:", error);
    throw error;
  }
};

export const configButtons = () => {
  const buttons = document.querySelectorAll<HTMLButtonElement>("button");
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });
};

// export const handleActivateScanContentScript = async (
//   e: Event
// ): Promise<void> => {
//   e.preventDefault();

//   try {
//     const [activeTab] = await browser.tabs.query({
//       active: true,
//       currentWindow: true,
//     });

//     if (!activeTab?.id) {
//       throw new Error("No active tab found");
//     }

//     const response = await browser.tabs.sendMessage(activeTab.id, {
//       action: "scanPage",
//     });

//     if (!response?.received) {
//       throw new Error(response?.error || "Unknown error from content script");
//     }
//   } catch (error: unknown) {
//     console.error("🔴 Popup: Failed to activate content script:", error);
//     throw error;
//   }
// };

// ... rest of the code stays the same ...
// export const handleReplaceChars = () => {
//   console.log("clicked replace chars");
//   const settings = getSettings();
// };

// const handleTabSwitch = (e: Event) => {
//   const target = e.target as HTMLElement;
//   if (!target.classList.contains("tab")) return;

//   document
//     .querySelectorAll(".tab")
//     .forEach((tab) => tab.classList.remove("active"));
//   document
//     .querySelectorAll(".tab-content")
//     .forEach((content) => content.classList.remove("active"));

//   target.classList.add("active");
//   const tabId = `${target.getAttribute("data-tab")}-tab`;
//   document.getElementById(tabId)?.classList.add("active");
// };

// export const configureButtons = () => {
//   const findCharsButtonId = "processPage";
//   const replaceCharsButtonId = "processCharacters";

//   document
//     .getElementById(findCharsButtonId)
//     ?.addEventListener("click", handleActivateScanContentScript);
//   document
//     .getElementById(replaceCharsButtonId)
//     ?.addEventListener("click", handleReplaceChars);

//   document.querySelector(".tabs")?.addEventListener("click", handleTabSwitch);
// };
