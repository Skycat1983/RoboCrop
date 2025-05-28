// =============================================================================
// CHARACTER DATA
// =============================================================================

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

// =============================================================================
// SETTINGS
// =============================================================================

export interface RobocropSettings {
  invisible: boolean;
  selectors: boolean;
  spaces: boolean;
  dashes: boolean;
  quotes: boolean;
  vfx: boolean;
}

// =============================================================================
// SCAN PAGE
// =============================================================================

export interface CountData {
  totalCount: number;
  byCategory: Record<
    string,
    { count: number; characters: Record<string, number> }
  >;
}

export interface ScanResults {
  countData: CountData;
  foundCharacters: FoundCharacter[];
  textNodes: Text[];
}

// =============================================================================
// MESSAGE TYPES
// =============================================================================

export interface ScanMessage {
  action: "findCharacters";
  settings: RobocropSettings;
}

export interface ScanResponse {
  received: boolean;
  status: string;
  countData: CountData;
  foundCount: number;
}
