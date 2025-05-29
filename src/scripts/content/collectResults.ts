import { charactersMap } from "../constants/constants";
import { ScanResults } from "../types/types";

export const collectResults = (): ScanResults => {
  console.log("📊 Collecting highlight results from page...");

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

  console.log(`📈 Results collected: ${results.totalCount} total characters`);
  return results satisfies ScanResults;
};
