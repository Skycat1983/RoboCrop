console.log("Popup script loaded");

document.addEventListener("DOMContentLoaded", () => {
  let processPageButton = document.getElementById("processPage");

  processPageButton?.addEventListener("click", () => {
    console.log("Process page button clicked");

    // Send a message to the active tab's content script
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        if (tabs[0]?.id) {
          return browser.tabs.sendMessage(tabs[0].id, {
            action: "activate",
          });
        }
      })
      .then((response) => {
        console.log("Response from content script:", response);
        // Display the results in the popup
        const resultDiv = document.createElement("div");
        resultDiv.id = "result";
        resultDiv.textContent = `Found ${response.count} instances of the character`;
        document.body.appendChild(resultDiv);
      })
      .catch((error) => {
        console.error("Error communicating with content script:", error);
      });
  });
});
