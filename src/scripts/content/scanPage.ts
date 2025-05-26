import { RobocropSettings } from "../popup/constants";
import {
  CharMap,
  controlChars,
  selectorChars,
  spaceChars,
  dashChars,
  quoteChars,
  allCharactersMap,
} from "./constants";
import { getCharacterData, isTrackedChar } from "./utils";

// Type definition for character detection results
export interface FoundCharacter {
  char: string; // The actual character found (e.g., " ", "—", "'")
  charCode: number; // The numeric Unicode code point (e.g., 8212)
  hexCode: string; // The Unicode hex representation (e.g., "U+2014")
  label: string; // Human-readable description (e.g., "Em Dash")
  replacement: string; // What to replace it with (e.g., "-")
  category: string; // Which map this character belongs to
  textNode: Text; // Reference to the DOM text node
  position: number; // Character position within the text node
}

// Type definition for counting results organized by category
export interface CountData {
  totalCount: number;
  byCategory: Record<
    string,
    { count: number; characters: Record<string, number> }
  >;
}

// Type definition for scan results that includes both detection and location data
export interface ScanResults {
  countData: CountData;
  foundCharacters: FoundCharacter[];
  textNodes: Text[];
}

// =============================================================================
// PHASE 1: TEXT NODE COLLECTION
// =============================================================================

// Helper function: Collect all processable text nodes from the document
const collectTextNodes = (): Text[] => {
  console.log("🔍 PHASE 1: Collecting text nodes...");

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  const nodesToProcess: Text[] = [];
  let currentNode;

  while ((currentNode = walker.nextNode())) {
    const parentNode = currentNode.parentNode;

    // Skip text nodes inside script, style, or noscript tags
    if (
      parentNode &&
      (parentNode.nodeName === "SCRIPT" ||
        parentNode.nodeName === "STYLE" ||
        parentNode.nodeName === "NOSCRIPT")
    ) {
      continue;
    }

    // Only process nodes that actually have text content
    if (currentNode.textContent && currentNode.textContent.trim()) {
      nodesToProcess.push(currentNode as Text);
    }
  }

  console.log(`✅ Found ${nodesToProcess.length} text nodes to process`);
  return nodesToProcess;
};

// =============================================================================
// PHASE 2: CHARACTER DETECTION & ANALYSIS
// =============================================================================

// Helper function: Create a count data object initialized by category
const createCountObject = (): CountData => {
  const countData: CountData = {
    totalCount: 0,
    byCategory: {},
  };

  // Get unique categories from the unified map
  const categories = [
    ...new Set(Object.values(allCharactersMap).map((data) => data.category)),
  ];

  categories.forEach((category) => {
    countData.byCategory[category] = { count: 0, characters: {} };

    // Initialize character counts for this category
    Object.entries(allCharactersMap)
      .filter(([_, data]) => data.category === category)
      .forEach(([char, _]) => {
        countData.byCategory[category].characters[char] = 0;
      });
  });

  return countData;
};

// Helper function: Increment character count with category tracking
const incrementCharCount = (
  countData: CountData,
  char: string,
  category: string
): void => {
  countData.totalCount++;

  if (countData.byCategory[category]) {
    countData.byCategory[category].count++;
    countData.byCategory[category].characters[char]++;
  }
};

// Main detection function: Analyze text nodes and find target characters
export const detectCharacters = async (
  settings: RobocropSettings,
  textNodes: Text[]
): Promise<ScanResults> => {
  console.log("🔍 PHASE 2: Detecting characters...");
  console.log("🔧 DEBUG: Settings received:", settings);

  const countData = createCountObject();
  const foundCharacters: FoundCharacter[] = [];

  textNodes.forEach((textNode, nodeIndex) => {
    const text = textNode.textContent || "";

    // Scan through each character in the text
    for (let charIndex = 0; charIndex < text.length; charIndex++) {
      const char = text[charIndex];

      // Debug: Log some characters we're checking
      if (nodeIndex < 3 && charIndex < 10) {
        console.log(
          `🔧 DEBUG: Checking char "${char}" (${char.charCodeAt(
            0
          )}) in node ${nodeIndex}`
        );
      }

      // Check if this character matches any enabled detection rules
      if (isTrackedChar(settings, char)) {
        console.log(
          `🎯 DEBUG: Found tracked character "${char}" (${char.charCodeAt(
            0
          )}) at position ${charIndex}`
        );

        const charData = getCharacterData(settings, char);

        if (charData && allCharactersMap[char]) {
          const category = allCharactersMap[char].category;

          foundCharacters.push({
            char,
            charCode: char.charCodeAt(0),
            hexCode: `U+${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
            label: charData.label,
            replacement: charData.replacement,
            category: category,
            textNode: textNode,
            position: charIndex,
          });

          // Update count data
          incrementCharCount(countData, char, category);
        }
      }
    }
  });

  console.log(
    `✅ Detection complete: ${foundCharacters.length} characters found`
  );
  console.log("🔧 DEBUG: Found characters:", foundCharacters);
  return {
    countData,
    foundCharacters,
    textNodes,
  };
};

// =============================================================================
// PHASE 3: RESULTS REPORTING
// =============================================================================

// Helper function: Log organized results breakdown
const logScanResults = (scanResults: ScanResults): void => {
  console.log("=== FINAL SCAN RESULTS ===");
  console.log(`Total characters found: ${scanResults.countData.totalCount}`);

  Object.entries(scanResults.countData.byCategory).forEach(
    ([categoryName, categoryData]) => {
      if (categoryData.count > 0) {
        console.log(`\n${categoryName}: ${categoryData.count} characters`);
        Object.entries(categoryData.characters).forEach(([char, count]) => {
          if (count > 0) {
            const hexCode = `U+${char
              .charCodeAt(0)
              .toString(16)
              .padStart(4, "0")}`;
            const charData = allCharactersMap[char];
            console.log(
              `  ${hexCode} (${charData?.label || "Unknown"}): ${count}`
            );
          }
        });
      }
    }
  );
};

// =============================================================================
// MAIN ORCHESTRATOR FUNCTION
// =============================================================================

// Main function: Orchestrate the complete scan process
export const scanPage = async (
  settings: RobocropSettings
): Promise<ScanResults> => {
  console.log("🚀 Starting page scan...");

  // Phase 1: Collect text nodes
  const textNodes = collectTextNodes();

  // Phase 2: Detect and analyze characters
  const scanResults = await detectCharacters(settings, textNodes);

  // Phase 3: Log results
  logScanResults(scanResults);

  console.log("✅ Page scan complete!");
  return scanResults;
};
