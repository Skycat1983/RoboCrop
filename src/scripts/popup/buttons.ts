import { getCurrentSettings } from "./settings";

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
  const settings = getCurrentSettings();
  console.dir("Settings in handleScanPage:", settings);
};

export const handleReplaceChars = () => {
  console.log("clicked replace chars");
  const settings = getCurrentSettings();
  console.dir("Settings in handleReplaceChars:", settings);
};

export const configureButtons = () => {
  const findCharsButtonId = "processPage";
  const replaceCharsButtonId = "processCharacters";

  const findCharsButton = document.getElementById(findCharsButtonId);
  const replaceCharsButton = document.getElementById(replaceCharsButtonId);

  if (findCharsButton) {
    findCharsButton.addEventListener("click", handleScanPage);
  }

  if (replaceCharsButton) {
    replaceCharsButton.addEventListener("click", handleReplaceChars);
  }
};
