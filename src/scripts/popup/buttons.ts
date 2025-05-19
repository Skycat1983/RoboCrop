import { getSettings } from "./settings";

const disableButton = (id: string) => {
  let button = document.getElementById(id);
  if (button) {
    button.setAttribute("disabled", "true");
    button.style.opacity = "0.5";
    button.style.cursor = "not-allowed";
  }
};

const enableButton = (id: string) => {
  let button = document.getElementById(id);
  if (button) {
    button.removeAttribute("disabled");
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  }
};

export const resetButtons = () => {
  const findCharsButtonId = "processPage";
  const replaceCharsButtonId = "processCharacters";
  disableButton(findCharsButtonId);
  disableButton(replaceCharsButtonId);
};

export const handleScanPage = (e: Event) => {
  e.preventDefault();
  console.log("clicked scan page", e.target);
  const {
    illegalControl,
    unauthorizedSelectors,
    anomalousSpaces,
    illegitimateDashes,
    prohibitedQuotes,
    enhancedVisuals,
  } = getSettings();
};

export const handleReplaceChars = () => {
  console.log("clicked replace chars");
  const settings = getSettings();
};

const handleTabSwitch = (e: Event) => {
  const target = e.target as HTMLElement;
  if (!target.classList.contains("tab")) return;

  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));

  target.classList.add("active");
  const tabId = `${target.getAttribute("data-tab")}-tab`;
  document.getElementById(tabId)?.classList.add("active");
};

export const configureButtons = () => {
  const findCharsButtonId = "processPage";
  const replaceCharsButtonId = "processCharacters";

  document
    .getElementById(findCharsButtonId)
    ?.addEventListener("click", handleScanPage);
  document
    .getElementById(replaceCharsButtonId)
    ?.addEventListener("click", handleReplaceChars);

  document.querySelector(".tabs")?.addEventListener("click", handleTabSwitch);
};
