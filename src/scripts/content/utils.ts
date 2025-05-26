import { RobocropSettings } from "../popup/constants";
import {
  controlChars,
  selectorChars,
  spaceChars,
  dashChars,
  quoteChars,
} from "./constants";

export const isTrackedChar = (
  settings: RobocropSettings,
  char: string
): boolean => {
  // Check each enabled setting and its corresponding character map
  if (settings.illegalControl && controlChars[char]) return true;
  if (settings.unauthorizedSelectors && selectorChars[char]) return true;
  if (settings.anomalousSpaces && spaceChars[char]) return true;
  if (settings.illegitimateDashes && dashChars[char]) return true;
  if (settings.prohibitedQuotes && quoteChars[char]) return true;

  return false;
};

export const getCharacterData = (settings: RobocropSettings, char: string) => {
  // Return the character data from whichever map contains this character
  if (settings.illegalControl && controlChars[char]) return controlChars[char];
  if (settings.unauthorizedSelectors && selectorChars[char])
    return selectorChars[char];
  if (settings.anomalousSpaces && spaceChars[char]) return spaceChars[char];
  if (settings.illegitimateDashes && dashChars[char]) return dashChars[char];
  if (settings.prohibitedQuotes && quoteChars[char]) return quoteChars[char];

  return null;
};
