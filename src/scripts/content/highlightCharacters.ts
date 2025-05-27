import { FoundCharacter, ScanResults } from "./scanPage";

// =============================================================================
// PHASE 2: CHARACTER HIGHLIGHTING & VISUALIZATION
// =============================================================================

// Helper function: Inject CSS styles into the document
const injectHighlightingStyles = (): void => {
  // Check if styles are already injected
  if (document.getElementById("robocrop-highlighting-styles")) {
    return;
  }

  // Create style element with inline CSS (like the old code)
  const styleElement = document.createElement("style");
  styleElement.id = "robocrop-highlighting-styles";
  styleElement.textContent = `
    .target_identified {
      display: inline-flex !important;
      justify-content: center !important;
      align-items: center !important;
      border: 1px solid #00ff00 !important;
      box-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00 !important;
      min-width: 1em !important;
      height: 1.2em !important;
      padding: 0 2px !important;
      margin: 0 1px !important;
      vertical-align: middle !important;
      box-sizing: border-box !important;
      position: relative !important;
      z-index: 1 !important;
      background-color: rgba(0, 0, 0, 0.7) !important;
    }
    
    .crosshair-horizontal {
      position: absolute !important;
      left: -15px !important;
      right: -15px !important;
      top: 50% !important;
      height: 1px !important;
      background: linear-gradient(to right, transparent, #00ff00 15px, #00ff00 calc(100% - 15px), transparent) !important;
      transform: translateY(-50%) !important;
      pointer-events: none !important;
      z-index: 0 !important;
      box-shadow: 0 0 3px #00ff00 !important;
    }
    
    .crosshair-vertical {
      position: absolute !important;
      top: -15px !important;
      bottom: -15px !important;
      left: 50% !important;
      width: 1px !important;
      background: linear-gradient(to bottom, transparent, #00ff00 15px, #00ff00 calc(100% - 15px), transparent) !important;
      transform: translateX(-50%) !important;
      pointer-events: none !important;
      z-index: 0 !important;
      box-shadow: 0 0 3px #00ff00 !important;
    }
    
    .text-wrapper {
      position: relative !important;
      z-index: 2 !important;
      color: #ffffff !important;
      text-shadow: 0 0 2px #00ff00 !important;
    }
    
    .target_identified:hover::after {
      content: attr(title) !important;
      position: absolute !important;
      bottom: 125% !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      padding: 5px 10px !important;
      background: rgba(0, 0, 0, 0.8) !important;
      color: #00ff00 !important;
      font-family: 'Orbitron', sans-serif !important;
      font-weight: 600 !important;
      font-size: 12px !important;
      white-space: nowrap !important;
      z-index: 1000 !important;
      border: 1px solid #00ff00 !important;
      box-shadow: 0 0 5px rgba(0, 255, 0, 0.5) !important;
      border-radius: 4px !important;
      pointer-events: none !important;
    }
  `;

  document.head.appendChild(styleElement);

  //  inject Google Font for tooltips
  if (!document.getElementById("orbitron-font-style")) {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap";
    fontLink.id = "orbitron-font-style";
    document.head.appendChild(fontLink);
  }
};

// Helper function: Create a span element for a target character
const createCharacterSpan = (foundChar: FoundCharacter): HTMLSpanElement => {
  const span = document.createElement("span");
  span.className = "target_identified";

  // Add character data as attributes for later reference
  span.setAttribute("data-char-code", foundChar.charCode.toString(16));
  span.setAttribute("data-char-label", foundChar.label);
  span.setAttribute("data-category", foundChar.category);
  span.title = foundChar.label; // Tooltip text

  // Create horizontal crosshair line
  const horizontalLine = document.createElement("div");
  horizontalLine.className = "crosshair-horizontal";
  span.appendChild(horizontalLine);

  // Create vertical crosshair line
  const verticalLine = document.createElement("div");
  verticalLine.className = "crosshair-vertical";
  span.appendChild(verticalLine);

  // Create text wrapper for the character
  const textWrapper = document.createElement("span");
  textWrapper.className = "text-wrapper";
  textWrapper.textContent = foundChar.char;
  span.appendChild(textWrapper);

  return span;
};

// Helper function: Process a single text node and create highlighted fragments
const processTextNode = (
  textNode: Text,
  foundCharacters: FoundCharacter[]
): DocumentFragment => {
  const text = textNode.textContent || "";
  const fragment = document.createDocumentFragment();

  // Get characters that belong to this specific text node
  const nodeCharacters = foundCharacters.filter(
    (foundChar) => foundChar.textNode === textNode
  );

  // Sort by position to process in order
  nodeCharacters.sort((a, b) => a.position - b.position);

  let lastPosition = 0;

  nodeCharacters.forEach((foundChar) => {
    // Add any regular text before this character
    if (foundChar.position > lastPosition) {
      const beforeText = text.substring(lastPosition, foundChar.position);
      fragment.appendChild(document.createTextNode(beforeText));
    }

    // Create and add the highlighted span for this character
    const span = createCharacterSpan(foundChar);
    fragment.appendChild(span);

    lastPosition = foundChar.position + 1;
  });

  // Add any remaining text after the last character
  if (lastPosition < text.length) {
    const afterText = text.substring(lastPosition);
    fragment.appendChild(document.createTextNode(afterText));
  }

  return fragment;
};

// Main highlighting function: Apply visual highlighting to detected characters
export const highlightCharacters = async (
  scanResults: ScanResults
): Promise<{ success: boolean; highlightedCount: number }> => {
  console.log("🎨 PHASE 2: Highlighting characters...");

  try {
    // Check if highlighting has already been applied
    if (document.body.getAttribute("data-robocrop-highlighted") === "true") {
      console.log("⚠️ Characters already highlighted, skipping");
      return { success: true, highlightedCount: 0 };
    }

    // Inject CSS styles
    injectHighlightingStyles();

    // Mark as highlighted to prevent duplicate processing
    document.body.setAttribute("data-robocrop-highlighted", "true");

    let highlightedCount = 0;

    // Group found characters by their text node for efficient processing
    const nodeMap = new Map<Text, FoundCharacter[]>();
    scanResults.foundCharacters.forEach((foundChar) => {
      if (!nodeMap.has(foundChar.textNode)) {
        nodeMap.set(foundChar.textNode, []);
      }
      nodeMap.get(foundChar.textNode)!.push(foundChar);
    });

    console.log(`📝 Processing ${nodeMap.size} text nodes with characters`);

    // Process each text node that contains target characters
    nodeMap.forEach((characters, textNode) => {
      try {
        // Create the highlighted fragment for this text node
        const fragment = processTextNode(textNode, characters);

        // Replace the original text node with our highlighted fragment
        if (textNode.parentNode) {
          textNode.parentNode.replaceChild(fragment, textNode);
          highlightedCount += characters.length;
        }
      } catch (error) {
        console.error("❌ Error processing text node:", error);
      }
    });

    console.log(
      `✅ Highlighting complete: ${highlightedCount} characters highlighted`
    );

    return { success: true, highlightedCount };
  } catch (error) {
    console.error("❌ Error in highlighting phase:", error);
    return { success: false, highlightedCount: 0 };
  }
};

// Helper function: Remove all highlighting from the page
export const removeHighlighting = (): {
  success: boolean;
  removedCount: number;
} => {
  console.log("🧹 Removing character highlighting...");

  try {
    // Find all highlighted spans
    const targetSpans = document.querySelectorAll(".target_identified");
    let removedCount = 0;

    targetSpans.forEach((span) => {
      try {
        // Get the original character text from the text wrapper
        const textWrapper = span.querySelector(".text-wrapper");
        const originalText = textWrapper?.textContent || "";

        // Create a text node with the original character
        const textNode = document.createTextNode(originalText);

        // Replace the span with the text node
        span.parentNode?.replaceChild(textNode, span);
        removedCount++;
      } catch (error) {
        console.error("❌ Error removing span:", error);
      }
    });

    // Remove the highlighting styles
    const styleElement = document.getElementById(
      "robocrop-highlighting-styles"
    );
    if (styleElement) {
      styleElement.remove();
    }

    // Remove the highlighted marker
    document.body.removeAttribute("data-robocrop-highlighted");

    console.log(`✅ Removed ${removedCount} highlighted characters`);

    return { success: true, removedCount };
  } catch (error) {
    console.error("❌ Error removing highlighting:", error);
    return { success: false, removedCount: 0 };
  }
};
