// Define interface for settings
export interface CharacterSettings {
  hiddenControl: boolean;
  variationSelectors: boolean;
  spaces: boolean;
  dashes: boolean;
  quotes: boolean;
}

// Default settings
export const defaultSettings: CharacterSettings = {
  hiddenControl: true,
  variationSelectors: true,
  spaces: true,
  dashes: true,
  quotes: true,
};
