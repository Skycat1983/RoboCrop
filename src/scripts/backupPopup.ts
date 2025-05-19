// import { loadSettings, getCurrentSettings } from "./popup/settings";
// import { getCheckboxes } from "./popup/checkboxes";
// import { configureButtons } from "./popup/buttons";
// console.log("Popup index script loaded");

// async function initialize() {
//   console.log("Initializing popup");
//   try {
//     await loadSettings();
//     configureButtons();
//   } catch (error) {
//     console.error("Error loading settings:", error);
//   }
// }
// }

// document.addEventListener("DOMContentLoaded", initialize);

// document.addEventListener("DOMContentLoaded", () => {
//   let processPageButton = document.getElementById(
//     "processPage"
//   ) as HTMLButtonElement | null;
//   let processCharactersButton = document.getElementById(
//     "processCharacters"
//   ) as HTMLButtonElement | null;

//   // Initially disable the processCharactersButton
//   if (processCharactersButton) {
//     processCharactersButton.setAttribute("disabled", "true");
//     processCharactersButton.style.opacity = "0.5";
//     processCharactersButton.style.cursor = "not-allowed";
//   }

//   // Load settings
//   loadSettings().catch((error) => {
//     console.error("Error loading settings:", error);
//   });

//   // Add event listeners to checkboxes
//   const checkboxes = getCheckboxes();
//   Object.values(checkboxes).forEach((checkbox) => {
//     checkbox?.addEventListener("change", () =>
//       saveSettings(processPageButton, processCharactersButton).catch((error) =>
//         console.error("Error saving settings:", error)
//       )
//     );
//   });

//   processPageButton?.addEventListener("click", () => {
//     console.log("Process page button clicked");

//     browser.tabs
//       .query({ active: true, currentWindow: true })
//       .then((tabs) => {
//         if (tabs[0]?.id) {
//           const currentSettings = getCurrentSettings();
//           console.log("Sending settings to content script:", currentSettings);

//           return browser.tabs.sendMessage(tabs[0].id, {
//             action: "activate",
//             settings: currentSettings,
//           });
//         }
//       })
//       .then((response) => {
//         console.log("Response from content script:");
//         console.dir(response);

//         if (response?.countData && processPageButton) {
//           console.log("response.countData:");
//           console.dir(response.countData);

//           // Log detailed character breakdown
//           console.log("Character breakdown:");
//           for (const [char, count] of Object.entries(
//             response.countData.byCharacter
//           )) {
//             if ((count as number) > 0) {
//               const charCode = char.charCodeAt(0);
//               console.log(`Character: ${
//                 char === "\u00A0"
//                   ? "U+00A0 (non-breaking space)"
//                   : char === "\u200B"
//                   ? "U+200B (zero-width space)"
//                   : char === "\u200C"
//                   ? "U+200C (zero-width non-joiner)"
//                   : char === "\u200D"
//                   ? "U+200D (zero-width joiner)"
//                   : char === "\u2060"
//                   ? "U+2060 (word joiner)"
//                   : char === "\u2061"
//                   ? "U+2061 (function application)"
//                   : char === "\u2062"
//                   ? "U+2062 (invisible times)"
//                   : char === "\u2063"
//                   ? "U+2063 (invisible separator)"
//                   : char === "\u2064"
//                   ? "U+2064 (invisible plus)"
//                   : char === "\uFEFF"
//                   ? "U+FEFF (byte order mark)"
//                   : `'${char}' (U+${charCode.toString(16).padStart(4, "0")})`
//               },
//                             Count: ${count}`);
//             }
//           }

//           const totalCount = response.countData.totalCount;
//           console.log(`Total targets found: ${totalCount}`);

//           // Update the processPage button text and style based on count
//           if (totalCount > 0) {
//             processPageButton.textContent = `Tracking ${totalCount} targets`;
//             processPageButton.className = "button-green";

//             // Enable the processCharactersButton and change its style
//             if (processCharactersButton) {
//               processCharactersButton.removeAttribute("disabled");
//               processCharactersButton.style.opacity = "1";
//               processCharactersButton.style.cursor = "pointer";
//               processCharactersButton.className = "button-red"; // Change to red style
//             }
//           } else {
//             processPageButton.textContent = "Area secure";
//             processPageButton.className = "button-green";

//             // Keep the eliminate button disabled if no targets found
//             if (processCharactersButton) {
//               processCharactersButton.setAttribute("disabled", "true");
//               processCharactersButton.style.opacity = "0.5";
//               processCharactersButton.style.cursor = "not-allowed";
//             }
//           }
//         }
//       })
//       .catch((error) => {
//         console.error("Error communicating with content script:", error);
//       });
//   });

//   // Add listener for the Eliminate button
//   processCharactersButton?.addEventListener("click", () => {
//     console.log("Process characters button clicked");

//     // Send a message to the active tab's content script to eliminate characters
//     browser.tabs
//       .query({ active: true, currentWindow: true })
//       .then((tabs) => {
//         console.log("tabs for eliminate:");
//         console.dir(tabs);
//         if (tabs[0]?.id) {
//           return browser.tabs.sendMessage(tabs[0].id, {
//             action: "eliminate",
//           });
//         }
//       })
//       .then((response) => {
//         console.log("Response from eliminate action:");
//         console.dir(response);

//         if (response?.success && processCharactersButton) {
//           console.log(`Eliminated ${response.replacedCount} characters`);

//           // Update the eliminate button text to show success
//           processCharactersButton.textContent = `Eliminated ${response.replacedCount} characters`;
//           processCharactersButton.className = "button-white";
//           processCharactersButton.setAttribute("disabled", "true");
//           processCharactersButton.style.opacity = "0.7";

//           // Reset the processPage button to initial state
//           if (processPageButton) {
//             processPageButton.textContent = "Scan";
//             processPageButton.className = "button-blue";
//           }
//         }
//       })
//       .catch((error) => {
//         console.error("Error during elimination:", error);
//       });
//   });
// });

// Send a message when the popup is being unloaded/closed
// window.addEventListener("unload", () => {
//   console.log("Popup closing, sending cleanup message");
//   // Send a cleanup message to active tab
//   browser.tabs
//     .query({ active: true, currentWindow: true })
//     .then((tabs) => {
//       if (tabs[0]?.id) {
//         browser.tabs
//           .sendMessage(tabs[0].id, {
//             action: "cleanup",
//           })
//           .catch((err) => {
//             // Ignore error if content script isn't ready or tab is no longer available
//             console.log("Cleanup message may not have been delivered:", err);
//           });
//       }
//     })
//     .catch((err) => {
//       console.error("Error sending cleanup message:", err);
//     });
// });
