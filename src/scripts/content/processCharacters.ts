import { charactersMap } from "../constants/constants";
import { RobocropSettings, ScanResults } from "../types/types";
import { collectResults } from "./collectResults";
import { collectTextNodes } from "./collectTextNodes";
import { wrapChars, wrapTextNodes } from "./createWrappers";
import { shouldTrackCharacter } from "./helpers";

export const findCharacters = (settings: RobocropSettings) => {
  const textNodes: Text[] = collectTextNodes();
  console.dir("textNodes", textNodes);
  const spans: HTMLSpanElement[] = wrapTextNodes(textNodes);
  wrapChars(spans, settings);
  console.dir("spans", spans);

  const results: ScanResults = collectResults();
  console.log("📈 Final scan results:", results);

  return results;
};

export const replaceCharacters = (settings: RobocropSettings) => {
  const textNodes = collectTextNodes();
  console.log(`🔍 Found ${textNodes.length} text nodes to process`);

  let totalReplacements = 0;
  textNodes.forEach((textNode, nodeIndex) => {
    const text = textNode.textContent || "";
    let newText = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (shouldTrackCharacter(char, settings)) {
        const charData = charactersMap[char];
        console.log(
          `🔄 Found char "${char}" (${char.charCodeAt(0)}) -> replacing with "${
            charData.replacement
          }"`
        );
        newText += charData.replacement;
        totalReplacements++;
      } else {
        newText += char;
      }
    }

    if (newText !== text) {
      console.log(`📝 Node ${nodeIndex}: BEFORE: "${text}"`);
      console.log(`📝 Node ${nodeIndex}: AFTER:  "${newText}"`);
      textNode.textContent = newText;
      console.log(`📝 Node ${nodeIndex}: ACTUAL: "${textNode.textContent}"`);
    }
  });

  console.log(`🎯 Total replacements made: ${totalReplacements}`);
  return {
    success: true,
    replacements: totalReplacements,
  };
};

export const restorePage = () => {
  console.log("🧹 Starting cleanup...");

  // Find all boundary spans
  const boundarySpans = document.querySelectorAll(".robocrop-text-boundary");

  if (boundarySpans.length === 0) {
    console.log("🔄 No boundary spans found, returning");
    return;
  }

  console.log(`Found ${boundarySpans.length} boundary spans to restore`);

  boundarySpans.forEach((boundarySpan, index) => {
    const parent = boundarySpan.parentNode;
    if (!parent) return;

    // Get the original text from the data attribute
    const originalText = boundarySpan.getAttribute("data-original-text") || "";

    console.log("originalText", originalText);

    // Create a new text node with the original content
    const textNode = document.createTextNode(originalText);

    // Replace the boundary span with the original text node
    parent.replaceChild(textNode, boundarySpan);
  });
};
