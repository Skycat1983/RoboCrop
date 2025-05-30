import { charactersMap } from "../constants/constants";
import { RobocropSettings } from "../types/types";

// =============================================================================
// SHOULD TRACK CHARACTER
// =============================================================================

/*
This function checks if a character should be tracked based on the settings provided.
*/

export const shouldTrackCharacter = (
  char: string,
  settings: RobocropSettings
): boolean => {
  console.log(`Helper: checking char "${char}" with settings:`, settings);

  const charData = charactersMap[char];

  if (charData != undefined) {
    console.log(`CharData found:`, charData);
  }

  if (!charData) {
    console.log(`No charData for "${char}"`);
    return false;
  }

  const category = charData.category;
  console.log(`Category: ${category}`);

  // Map categories to settings
  switch (category) {
    case "invisible":
      console.log(`Invisible setting: ${settings.invisible}`);
      return settings.invisible;
    case "selectors":
      console.log(`Selectors setting: ${settings.selectors}`);
      return settings.selectors;
    case "spaces":
      console.log(`Spaces setting: ${settings.spaces}`);
      return settings.spaces;
    case "dashes":
      console.log(`Dashes setting: ${settings.dashes}`);
      return settings.dashes;
    // case "quotes":
    //   return settings.quotes;
    default:
      console.log(`Unknown category: ${category}`);
      return false;
  }
};
