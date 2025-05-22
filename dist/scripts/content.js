(function () {
    'use strict';

    const removeAllEffects = () => {
        console.log("Removing all visual effects from the page");
        // Remove CRT effect style
        const styleElement = document.getElementById("crt-effect-style");
        if (styleElement) {
            styleElement.remove();
        }
        // Remove tooltip style
        const tooltipStyle = document.getElementById("tooltip-style");
        if (tooltipStyle) {
            tooltipStyle.remove();
        }
        // Remove Orbitron font
        const fontStyle = document.getElementById("orbitron-font-style");
        if (fontStyle) {
            fontStyle.remove();
        }
        document.body.classList.remove("crt");
        document.body.setAttribute("data-crt-active", "false");
        const targetSpans = document.querySelectorAll(".target_identified");
        console.log(`Found ${targetSpans.length} highlighted spans to restore`);
        targetSpans.forEach((span, index) => {
            try {
                const originalText = span.textContent || "";
                const textNode = document.createTextNode(originalText);
                span.parentNode?.replaceChild(textNode, span);
            }
            catch (error) {
                console.error(`Error restoring span #${index}:`, error);
            }
        });
        document.body.removeAttribute("data-crosshairs-applied");
        console.log("All visual effects removed from the page");
    };
    const addCRTEffect = () => {
        console.log("Adding CRT effect to the page");
        // check if we already added the style
        if (document.getElementById("crt-effect-style")) {
            console.log("CRT effect already added");
            return;
        }
        // create a style element for the CRT effect
        const styleElement = document.createElement("style");
        styleElement.id = "crt-effect-style";
        styleElement.textContent = `
        @keyframes flicker {
          0% {
            opacity: 0.27861;
          }
          5% {
            opacity: 0.34769;
          }
          10% {
            opacity: 0.23604;
          }
          15% {
            opacity: 0.90626;
          }
          20% {
            opacity: 0.18128;
          }
          25% {
            opacity: 0.83891;
          }
          30% {
            opacity: 0.65583;
          }
          35% {
            opacity: 0.67807;
          }
          40% {
            opacity: 0.26559;
          }
          45% {
            opacity: 0.84693;
          }
          50% {
            opacity: 0.96019;
          }
          55% {
            opacity: 0.08594;
          }
          60% {
            opacity: 0.20313;
          }
          65% {
            opacity: 0.71988;
          }
          70% {
            opacity: 0.53455;
          }
          75% {
            opacity: 0.37288;
          }
          80% {
            opacity: 0.71428;
          }
          85% {
            opacity: 0.70419;
          }
          90% {
            opacity: 0.7003;
          }
          95% {
            opacity: 0.36108;
          }
          100% {
            opacity: 0.24387;
          }
        }
        @keyframes textShadow {
          0% {
            text-shadow: 0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          5% {
            text-shadow: 2.7928974010788217px 0 1px rgba(0,30,255,0.5), -2.7928974010788217px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          10% {
            text-shadow: 0.02956275843481219px 0 1px rgba(0,30,255,0.5), -0.02956275843481219px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          15% {
            text-shadow: 0.40218538552878136px 0 1px rgba(0,30,255,0.5), -0.40218538552878136px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          20% {
            text-shadow: 3.4794037899852017px 0 1px rgba(0,30,255,0.5), -3.4794037899852017px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          25% {
            text-shadow: 1.6125630401149584px 0 1px rgba(0,30,255,0.5), -1.6125630401149584px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          30% {
            text-shadow: 0.7015590085143956px 0 1px rgba(0,30,255,0.5), -0.7015590085143956px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          35% {
            text-shadow: 3.896914047650351px 0 1px rgba(0,30,255,0.5), -3.896914047650351px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          40% {
            text-shadow: 3.870905614848819px 0 1px rgba(0,30,255,0.5), -3.870905614848819px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          45% {
            text-shadow: 2.231056963361899px 0 1px rgba(0,30,255,0.5), -2.231056963361899px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          50% {
            text-shadow: 0.08084290417898504px 0 1px rgba(0,30,255,0.5), -0.08084290417898504px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          55% {
            text-shadow: 2.3758461067427543px 0 1px rgba(0,30,255,0.5), -2.3758461067427543px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          60% {
            text-shadow: 2.202193051050636px 0 1px rgba(0,30,255,0.5), -2.202193051050636px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          65% {
            text-shadow: 2.8638780614874975px 0 1px rgba(0,30,255,0.5), -2.8638780614874975px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          70% {
            text-shadow: 0.48874025155497314px 0 1px rgba(0,30,255,0.5), -0.48874025155497314px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          75% {
            text-shadow: 1.8948491305757957px 0 1px rgba(0,30,255,0.5), -1.8948491305757957px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          80% {
            text-shadow: 0.0833037308038857px 0 1px rgba(0,30,255,0.5), -0.0833037308038857px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          85% {
            text-shadow: 0.09769827255241735px 0 1px rgba(0,30,255,0.5), -0.09769827255241735px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          90% {
            text-shadow: 3.443339761481782px 0 1px rgba(0,30,255,0.5), -3.443339761481782px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          95% {
            text-shadow: 2.1841838852799786px 0 1px rgba(0,30,255,0.5), -2.1841838852799786px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
          100% {
            text-shadow: 2.6208764473832513px 0 1px rgba(0,30,255,0.5), -2.6208764473832513px 0 1px rgba(255,0,80,0.3), 0 0 3px;
          }
        }
        .crt::after {
          content: " ";
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: rgba(18, 16, 16, 0.1);
          opacity: 0;
          z-index: 9998;
          pointer-events: none;
          animation: flicker 0.15s infinite;
        }
        .crt::before {
          content: " ";
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 9997;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
        .crt {
          animation: textShadow 1.6s infinite;
        }
      `;
        document.head.appendChild(styleElement);
        document.body.classList.add("crt");
        document.body.setAttribute("data-crt-active", "true");
        // add a click listener to the document to remove CRT effect on any click
        if (!document.body.hasAttribute("data-crt-click-listener")) {
            document.body.setAttribute("data-crt-click-listener", "true");
            document.addEventListener("click", (event) => {
                // only process if CRT is active and this is not a click on a popup button
                // (popup buttons won't be in the main document)
                if (document.body.getAttribute("data-crt-active") === "true") {
                    // check if the clicked element is a span with our target class
                    const target = event.target;
                    const isOurSpan = target.classList?.contains("target_identified");
                    const isButton = target.tagName === "BUTTON";
                    // if it's not our span or a button, remove the effect
                    if (!isOurSpan && !isButton) {
                        console.log("Click detected outside of targets, removing all effects");
                        removeAllEffects();
                    }
                }
            });
        }
        // add visibility change listener if not already added
        if (!document.body.hasAttribute("data-crt-visibility-listener")) {
            document.body.setAttribute("data-crt-visibility-listener", "true");
            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "hidden" &&
                    document.body.getAttribute("data-crt-active") === "true") {
                    console.log("Page visibility changed to hidden, removing all effects");
                    removeAllEffects();
                }
            });
        }
        console.log("CRT effect added to the page");
    };

    console.log("🔥 Content script starting to load");
    // Announce that content script is ready
    browser.runtime
        .sendMessage({ action: "contentScriptReady" })
        .then(() => console.log("✅ Content script announced itself"))
        .catch((error) => console.log("❌ Failed to announce content script:", error));
    function initializeContentScript() {
        console.log("🎯 Content script initializing");
        // Register listener immediately
        browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
            console.log("📩 Content script received message:", message);
            try {
                if (message.action === "scanPage") {
                    console.log("🔍 Starting page scan");
                    addCRTEffect();
                    // handleScanPage();
                    sendResponse({ received: true, status: "scan started" });
                }
            }
            catch (error) {
                console.error("❌ Error handling message:", error);
                sendResponse({
                    received: false,
                    error: error instanceof Error ? error.message : String(error),
                });
            }
            return true;
        });
        // Log that we're ready to receive messages
        console.log("✅ Message listener registered and ready");
    }
    // Initialize as soon as possible
    initializeContentScript();
    // Also ensure initialization on DOM ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeContentScript);
    }
    else {
        initializeContentScript();
    }
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

})();
