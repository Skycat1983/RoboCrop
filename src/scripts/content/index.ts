import {
  findCharacters,
  replaceCharacters,
  restorePage,
} from "./processCharacters";
import { ReplaceResponse, ScanResponse } from "../types/types";
import { addCRTEffect, removeCRTEffect } from "./visualEffects";
import { injectCSS } from "./injectCSS";

// =============================================================================
// INITIALIZE CONTENT SCRIPT
// =============================================================================

/*
This function initializes the content script.

It also injects the CSS into the page.

It also listens for messages from the popup.

When a message is received from the popup, it will call the appropriate function to handle the request.

It also restores the page to its original state when the window is clicked, which trades off efficiency (because we have to loop through all the nodes again) to avoid complexity (I added so many spans/attributes and classnames when 'finding' the characters that deconstructing and reassumebling select parts of the html just seemed to be more hassle than it was worth.

It also adds/removes the CRT effect to the page

restorePage is also added to the window click event listener because... it just felt weird when the CSS persisted after closing the popup.
*/

function initializeContentScript() {
  injectCSS();

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { action, settings } = message;

    restorePage();
    removeCRTEffect();

    if (action === "findCharacters") {
      const results = findCharacters(settings);

      const response: ScanResponse = {
        success: true,
        results: results,
      };
      if (results.totalCount > 0) {
        addCRTEffect();
      }

      sendResponse(response);
      return;
    }

    if (action === "replaceCharacters") {
      const results = replaceCharacters(settings);

      const response: ReplaceResponse = {
        success: true,
        replacements: results.replacements,
      };

      sendResponse(response);
      return true;
    }

    return true;
  });
}

initializeContentScript();

window.addEventListener("click", () => {
  removeCRTEffect();
  restorePage();
});
