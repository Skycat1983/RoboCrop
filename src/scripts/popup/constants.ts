// Define interface for settings
export interface RobocropSettings {
  hiddenControl: boolean;
  variationSelectors: boolean;
  spaces: boolean;
  dashes: boolean;
  quotes: boolean;
  vfx: boolean;
}

// Default settings
export const defaultSettings: RobocropSettings = {
  hiddenControl: true,
  variationSelectors: true,
  spaces: true,
  dashes: true,
  quotes: true,
  vfx: true,
};

export const settingDescriptions = {
  "setting-hidden-control":
    "Detects invisible control characters that can affect text layout and behavior but are not visible to the naked eye.",
  "setting-variation-selectors":
    "Identifies special characters that modify the appearance of emojis and other Unicode symbols.",
  "setting-spaces":
    "Finds non-standard space characters that may look like regular spaces but behave differently.",
  "setting-dashes":
    "Locates typographic dashes (like em-dash or en-dash) that differ from standard hyphens.",
  "setting-quotes":
    "Detects smart or curly quotes and apostrophes that replace straight quotes.",
  "setting-vfx":
    "Toggles visual effects to highlight detected special characters in the text.",
};
