export const disabledScanButton = () => {
  let processPageButton = document.getElementById("processPage");
  if (processPageButton) {
    processPageButton.setAttribute("disabled", "true");
    processPageButton.style.opacity = "0.5";
    processPageButton.style.cursor = "not-allowed";
  }
};
