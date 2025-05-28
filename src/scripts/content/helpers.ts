import { charactersMap } from "../constants/constants";
import { RobocropSettings } from "../types/types";

export const shouldTrackCharacter = (
  char: string,
  settings: RobocropSettings
): boolean => {
  const charData = charactersMap[char];
  if (!charData) return false;

  const category = charData.category;

  // Map categories to settings
  switch (category) {
    case "invisible":
      return settings.invisible;
    case "selectors":
      return settings.selectors;
    case "spaces":
      return settings.spaces;
    case "dashes":
      return settings.dashes;
    case "quotes":
      return settings.quotes;
    default:
      return false;
  }
};
