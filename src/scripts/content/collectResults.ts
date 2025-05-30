import { charactersMap } from "../constants/constants";
import { ScanResults } from "../types/types";

// =============================================================================
// COLLECT RESULTS
// =============================================================================

/*
This function collects the results of the highlighting process.

It collects the total number of characters highlighted, and the number of characters highlighted by category.

these values are sent back to the popup to be displayed to the user in the stats tab
*/

export const collectResults = (): ScanResults => {
  const targetSpans = document.querySelectorAll(".robocrop-character");

  const results = {
    totalCount: targetSpans.length,
    byCategory: {} as Record<
      string,
      { count: number; characters: Record<string, number> }
    >,
  };

  // Get unique categories from the unified map
  const categories = [
    ...new Set(Object.values(charactersMap).map((data) => data.category)),
  ];

  // Initialize categories
  categories.forEach((category) => {
    results.byCategory[category] = { count: 0, characters: {} };
  });

  // Collect data from existing spans
  targetSpans.forEach((span) => {
    const category = span.getAttribute("data-category") || "";
    const char = span.getAttribute("data-character") || "";

    if (results.byCategory[category]) {
      results.byCategory[category].count++;
      results.byCategory[category].characters[char] =
        (results.byCategory[category].characters[char] || 0) + 1;
    }
  });

  return results satisfies ScanResults;
};
