export const buttonId = "my-button";

// Define interface for settings
export interface RobocropSettings {
  illegalControl: boolean;
  unauthorizedSelectors: boolean;
  anomalousSpaces: boolean;
  illegitimateDashes: boolean;
  prohibitedQuotes: boolean;
  enhancedVisuals: boolean;
}

// Default settings
export const defaultSettings: RobocropSettings = {
  illegalControl: true,
  unauthorizedSelectors: true,
  anomalousSpaces: true,
  illegitimateDashes: true,
  prohibitedQuotes: true,
  enhancedVisuals: true,
};

export const settingDescriptions = {
  illegalControl:
    "Detects invisible control characters that can affect text layout and behavior but are not visible to the naked eye.",
  unauthorizedSelectors:
    "Identifies special characters that modify the appearance of emojis and other Unicode symbols.",
  anomalousSpaces:
    "Finds non-standard space characters that may look like regular spaces but behave differently.",
  illegitimateDashes:
    "Locates typographic dashes (like em-dash or en-dash) that differ from standard hyphens.",
  prohibitedQuotes:
    "Detects smart or curly quotes and apostrophes that replace straight quotes.",
  enhancedVisuals:
    "Toggles visual effects to highlight detected special characters in the text.",
};
