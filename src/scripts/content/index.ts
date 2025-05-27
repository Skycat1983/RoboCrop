import { CountData, scanPage } from "./scanPage";
import { highlightCharacters, removeHighlighting } from "./highlightCharacters";
import { addCRTEffect, removeAllEffects } from "./vfx";
import { ScanMessage } from "../popup/buttons";

export interface ScanResponse {
  received: boolean;
  status: string;
  countData: CountData;
  foundCount: number;
}

const getSettings = async () => {
  const { robocropSettings } = await browser.storage.local.get(
    "robocropSettings"
  );
  return robocropSettings;
};

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

    // Handle async operations properly
    const handleMessage = async () => {
      try {
        if (message.action === "scan") {
          console.log("🔍 Starting page scan");
          const { settings } = message as ScanMessage;
          const { enhancedVisuals } = settings;
          console.log("settings in content script", settings);

          // Phase 1: Scan for characters
          const scanResults = await scanPage(settings);
          console.log("scan results in content script", scanResults);

          // Phase 2: Apply highlighting if characters were found
          if (scanResults.foundCharacters.length > 0) {
            const highlightResults = await highlightCharacters(scanResults);
            console.log(
              "highlight results in content script",
              highlightResults
            );
          }

          // Phase 3: Apply enhanced visuals if enabled
          if (enhancedVisuals) {
            addCRTEffect();
          }

          const response: ScanResponse = {
            received: true,
            status: "scan completed",
            countData: scanResults.countData,
            foundCount: scanResults.foundCharacters.length,
          };

          sendResponse(response);
          return;
        }

        if (message.action === "cleanup") {
          console.log("🧹 Received cleanup message from popup");
          try {
            // Remove highlighting
            removeHighlighting();

            // Remove CRT effects
            removeAllEffects();

            sendResponse({ received: true, status: "cleanup completed" });
          } catch (error) {
            console.error("❌ Error during cleanup:", error);
            sendResponse({
              received: false,
              error: error instanceof Error ? error.message : String(error),
            });
          }
          return;
        }
      } catch (error: unknown) {
        console.error("❌ Error handling message:", error);
        sendResponse({
          received: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    };

    // Execute async handler
    handleMessage();

    // Return true to indicate we will send a response asynchronously
    return true;
  });
}

// Initialize once when the script loads
initializeContentScript();

// Log that we reached the end of the script
console.log("🔥 Content script evaluation complete");
