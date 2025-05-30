import { charactersMap } from "../constants/constants";
import { RobocropSettings, ScanResults } from "../types/types";
import { collectResults } from "./collectResults";
import { collectTextNodes } from "./collectTextNodes";
import { wrapChars, wrapTextNodes } from "./createWrappers";
import { shouldTrackCharacter } from "./helpers";

// =============================================================================
// FIND CHARACTERS
// =============================================================================

/*
This function acts as controller for the process.

It collects the text nodes, wraps them in boundary-preserving spans, and highlights the characters based on the settings provided.

It then collects the results and returns them.
*/

export const findCharacters = (settings: RobocropSettings) => {
  const textNodes: Text[] = collectTextNodes();
  const spans: HTMLSpanElement[] = wrapTextNodes(textNodes);
  wrapChars(spans, settings);

  const results: ScanResults = collectResults();

  return results;
};

// =============================================================================
// REPLACE CHARACTERS
// =============================================================================

/*
This function replaces the characters based on the settings provided.
*/

export const replaceCharacters = (settings: RobocropSettings) => {
  const textNodes = collectTextNodes();

  let totalReplacements = 0;
  textNodes.forEach((textNode, nodeIndex) => {
    const text = textNode.textContent || "";
    let newText = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      const isTracked = shouldTrackCharacter(char, settings);

      if (isTracked) {
        const charData = charactersMap[char];
        newText += charData.replacement;
        totalReplacements++;
      } else {
        newText += char;
      }
    }

    if (newText !== text) {
      textNode.textContent = newText;
    }
  });

  return {
    success: true,
    replacements: totalReplacements,
  };
};

// =============================================================================
// RESTORE PAGE
// =============================================================================

/*
This function restores the page to its original state using the boundary spans, and the original-text attribute.

It then removes the boundary spans.
*/

export const restorePage = () => {
  // Find all boundary spans
  const boundarySpans = document.querySelectorAll(".robocrop-text-boundary");

  if (boundarySpans.length === 0) {
    return;
  }

  boundarySpans.forEach((boundarySpan, index) => {
    const parent = boundarySpan.parentNode;
    if (!parent) return;

    // Get the original text from the data attribute
    const originalText = boundarySpan.getAttribute("data-original-text") || "";

    // Create a new text node with the original content
    const textNode = document.createTextNode(originalText);

    // Replace the boundary span with the original text node
    parent.replaceChild(textNode, boundarySpan);
  });
};
