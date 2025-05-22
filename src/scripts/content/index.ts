import { traverseDocument } from "./scanPage";
import { addCRTEffect, removeAllEffects } from "./vfx";

console.log("🔥 Content script starting to load");

// Announce that content script is ready
browser.runtime
  .sendMessage({ action: "contentScriptReady" })
  .then(() => console.log("✅ Content script announced itself"))
  .catch((error) =>
    console.log("❌ Failed to announce content script:", error)
  );

function initializeContentScript() {
  console.log("🎯 Content script initializing on:", window.location.href);

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("📩 Content script received message:", message);

    try {
      if (message.action === "scan") {
        console.log("🔍 Starting page scan");
        addCRTEffect();
        traverseDocument();

        sendResponse({ received: true, status: "scan started" });
      }
    } catch (error: unknown) {
      console.error("❌ Error handling message:", error);
      sendResponse({
        received: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
    return true;
  });
}

// Initialize once when the script loads
initializeContentScript();

// Log that we reached the end of the script
console.log("🔥 Content script evaluation complete");

// content/index.ts
// console.log("🚀 CONTENT SCRIPT LOADING", window.location.href);

// // Make sure we're in a web page context
// if (
//   window.location.protocol !== "about:" &&
//   window.location.protocol !== "mozilla:" &&
//   window.location.protocol !== "chrome:"
// ) {
//   const handleScanPage = () => {
//     console.log("Scanning page");
//   };

//   function initialiseContentScript() {
//     console.log("🎯 CONTENT SCRIPT INITIALIZED", window.location.href);

//     // Remove any existing listeners to avoid duplicates
//     browser.runtime.onMessage.removeListener(messageHandler);

//     // Define message handler separately so we can remove it
//     function messageHandler(message: any, sender: any, sendResponse: any) {
//       console.log("📨 CONTENT SCRIPT RECEIVED MESSAGE", message);
//       if (message.action === "scanPage") {
//         handleScanPage();
//         sendResponse({ received: true });
//         return true; // Keep the message channel open for async response
//       }
//     }

//     // Add the listener
//     browser.runtime.onMessage.addListener(messageHandler);

//     // Log success
//     console.log("✅ Content script ready for messages");
//   }

//   // Initialize immediately
//   initialiseContentScript();
// }

// // listen for messages from the popup
// browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("Content script received message:", message);

//   if (message.action === "activate") {
//     try {
//       addCRTEffect();

//       //   const countData = findForbiddenChars(message.settings);

//       //   console.log("Result:", countData);

//       sendResponse({
//         success: true,
//         // countData: countData,
//       });
//     } catch (error) {
//       console.error("Error in text replacement:", error);
//       sendResponse({
//         success: false,
//         error: error instanceof Error ? error.message : String(error),
//       });
//     }
//     return true;
//   }

//   if (message.action === "eliminate") {
//     try {
//       // const result = eliminateHighlightedChars();

//       removeAllEffects();

//       sendResponse({
//         success: true,
//         // replacedCount: result.replacedCount,
//       });
//     } catch (error) {
//       console.error("Error in elimination:", error);
//       sendResponse({
//         success: false,
//         error: error instanceof Error ? error.message : String(error),
//       });
//     }
//     return true;
//   }

//   if (message.action === "cleanup") {
//     console.log("Received cleanup message from popup");
//     try {
//       if (document.body.classList.contains("crt")) {
//         console.log("Removing CRT effect due to popup close");
//         removeAllEffects();
//       }
//     } catch (error) {
//       console.error("Error during cleanup:", error);
//     }
//     return true;
//   }
// });
