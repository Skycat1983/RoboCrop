import { CharMap, RobocropSettings } from "../types/types";

export const buttonId = "my-button";

// Default settings
export const defaultSettings: RobocropSettings = {
  invisible: true,
  selectors: true,
  spaces: true,
  dashes: true,
  quotes: true,
  vfx: true,
};

// Setting descriptions
export const settingDescriptions = {
  invisible:
    "Detects invisible control characters that can affect text layout and behavior but are not visible to the naked eye.",
  selectors:
    "Identifies special characters that modify the appearance of emojis and other Unicode symbols.",
  spaces:
    "Finds non-standard space characters that may look like regular spaces but behave differently.",
  dashes:
    "Locates typographic dashes (like em-dash or en-dash) that differ from standard hyphens.",
  quotes:
    "Detects smart or curly quotes and apostrophes that replace straight quotes.",
  vfx: "Toggles visual effects to highlight detected special characters in the text.",
};

// Unified character map with all characters organized by category
export const charactersMap: CharMap = {
  // Hidden/Control Characters
  "\u00AD": {
    replacement: "",
    label: "Soft Hyphen",
    category: "invisible",
    count: 0,
  },
  "\u180E": {
    replacement: "",
    label: "Mongolian Vowel Separator",
    category: "invisible",
    count: 0,
  },
  "\u200B": {
    replacement: "",
    label: "Zero-width Space",
    category: "invisible",
    count: 0,
  },
  "\u200C": {
    replacement: "",
    label: "Zero-width Non-joiner",
    category: "invisible",
    count: 0,
  },
  "\u200D": {
    replacement: "",
    label: "Zero-width Joiner",
    category: "invisible",
    count: 0,
  },
  "\u200E": {
    replacement: "",
    label: "Left-to-Right Mark",
    category: "invisible",
    count: 0,
  },
  "\u200F": {
    replacement: "",
    label: "Right-to-Left Mark",
    category: "invisible",
    count: 0,
  },
  "\u202A": {
    replacement: "",
    label: "Left-to-Right Embedding",
    category: "invisible",
    count: 0,
  },
  "\u202B": {
    replacement: "",
    label: "Right-to-Left Embedding",
    category: "invisible",
    count: 0,
  },
  "\u202C": {
    replacement: "",
    label: "Pop Directional Formatting",
    category: "invisible",
    count: 0,
  },
  "\u202D": {
    replacement: "",
    label: "Left-to-Right Override",
    category: "invisible",
    count: 0,
  },
  "\u202E": {
    replacement: "",
    label: "Right-to-Left Override",
    category: "invisible",
    count: 0,
  },
  "\u2060": {
    replacement: "",
    label: "Word Joiner",
    category: "invisible",
    count: 0,
  },
  "\u2061": {
    replacement: "",
    label: "Function Application",
    category: "invisible",
    count: 0,
  },
  "\u2062": {
    replacement: "",
    label: "Invisible Times",
    category: "invisible",
    count: 0,
  },
  "\u2063": {
    replacement: "",
    label: "Invisible Separator",
    category: "invisible",
    count: 0,
  },
  "\u2064": {
    replacement: "",
    label: "Invisible Plus",
    category: "invisible",
    count: 0,
  },
  "\u206A": {
    replacement: "",
    label: "Inhibit Symmetric Swapping",
    category: "invisible",
    count: 0,
  },
  "\u206B": {
    replacement: "",
    label: "Activate Symmetric Swapping",
    category: "invisible",
    count: 0,
  },
  "\u206C": {
    replacement: "",
    label: "Inhibit Arabic Form Shaping",
    category: "invisible",
    count: 0,
  },
  "\u206D": {
    replacement: "",
    label: "Activate Arabic Form Shaping",
    category: "invisible",
    count: 0,
  },
  "\u206E": {
    replacement: "",
    label: "National Digit Shapes",
    category: "invisible",
    count: 0,
  },
  "\u206F": {
    replacement: "",
    label: "Nominal Digit Shapes",
    category: "invisible",
    count: 0,
  },
  "\uFEFF": {
    replacement: "",
    label: "Byte Order Mark",
    category: "invisible",
    count: 0,
  },

  // Variation Selectors
  "\uFE00": {
    replacement: "",
    label: "Variation Selector-1",
    category: "selectors",
    count: 0,
  },
  "\uFE01": {
    replacement: "",
    label: "Variation Selector-2",
    category: "selectors",
    count: 0,
  },
  "\uFE02": {
    replacement: "",
    label: "Variation Selector-3",
    category: "selectors",
    count: 0,
  },
  "\uFE03": {
    replacement: "",
    label: "Variation Selector-4",
    category: "selectors",
    count: 0,
  },
  "\uFE04": {
    replacement: "",
    label: "Variation Selector-5",
    category: "selectors",
    count: 0,
  },
  "\uFE05": {
    replacement: "",
    label: "Variation Selector-6",
    category: "selectors",
    count: 0,
  },
  "\uFE06": {
    replacement: "",
    label: "Variation Selector-7",
    category: "selectors",
    count: 0,
  },
  "\uFE07": {
    replacement: "",
    label: "Variation Selector-8",
    category: "selectors",
    count: 0,
  },
  "\uFE08": {
    replacement: "",
    label: "Variation Selector-9",
    category: "selectors",
    count: 0,
  },
  "\uFE09": {
    replacement: "",
    label: "Variation Selector-10",
    category: "selectors",
    count: 0,
  },
  "\uFE0A": {
    replacement: "",
    label: "Variation Selector-11",
    category: "selectors",
    count: 0,
  },
  "\uFE0B": {
    replacement: "",
    label: "Variation Selector-12",
    category: "selectors",
    count: 0,
  },
  "\uFE0C": {
    replacement: "",
    label: "Variation Selector-13",
    category: "selectors",
    count: 0,
  },
  "\uFE0D": {
    replacement: "",
    label: "Variation Selector-14",
    category: "selectors",
    count: 0,
  },
  "\uFE0E": {
    replacement: "",
    label: "Variation Selector-15",
    category: "selectors",
    count: 0,
  },
  "\uFE0F": {
    replacement: "",
    label: "Variation Selector-16",
    category: "selectors",
    count: 0,
  },

  // Unusual Spaces
  "\u00A0": {
    replacement: " ",
    label: "Non-breaking Space",
    category: "spaces",
    count: 0,
  },
  "\u1680": {
    replacement: " ",
    label: "Ogham Space Mark",
    category: "spaces",
    count: 0,
  },
  "\u2000": {
    replacement: " ",
    label: "En Quad",
    category: "spaces",
    count: 0,
  },
  "\u2001": {
    replacement: " ",
    label: "Em Quad",
    category: "spaces",
    count: 0,
  },
  "\u2002": {
    replacement: " ",
    label: "En Space",
    category: "spaces",
    count: 0,
  },
  "\u2003": {
    replacement: " ",
    label: "Em Space",
    category: "spaces",
    count: 0,
  },
  "\u2004": {
    replacement: " ",
    label: "Three-Per-Em Space",
    category: "spaces",
    count: 0,
  },
  "\u2005": {
    replacement: " ",
    label: "Four-Per-Em Space",
    category: "spaces",
    count: 0,
  },
  "\u2006": {
    replacement: " ",
    label: "Six-Per-Em Space",
    category: "spaces",
    count: 0,
  },
  "\u2007": {
    replacement: " ",
    label: "Figure Space",
    category: "spaces",
    count: 0,
  },
  "\u2008": {
    replacement: " ",
    label: "Punctuation Space",
    category: "spaces",
    count: 0,
  },
  "\u2009": {
    replacement: " ",
    label: "Thin Space",
    category: "spaces",
    count: 0,
  },
  "\u200A": {
    replacement: " ",
    label: "Hair Space",
    category: "spaces",
    count: 0,
  },
  "\u202F": {
    replacement: " ",
    label: "Narrow No-Break Space",
    category: "spaces",
    count: 0,
  },
  "\u205F": {
    replacement: " ",
    label: "Medium Mathematical Space",
    category: "spaces",
    count: 0,
  },
  "\u3000": {
    replacement: " ",
    label: "Ideographic Space",
    category: "spaces",
    count: 0,
  },

  // Non-standard Dashes
  "\u2012": {
    replacement: "-",
    label: "Figure Dash",
    category: "dashes",
    count: 0,
  },
  "\u2013": {
    replacement: "-",
    label: "En Dash",
    category: "dashes",
    count: 0,
  },
  "\u2014": {
    replacement: "-",
    label: "Em Dash",
    category: "dashes",
    count: 0,
  },
  "\u2015": {
    replacement: "-",
    label: "Horizontal Bar",
    category: "dashes",
    count: 0,
  },
  "\u2212": {
    replacement: "-",
    label: "Minus Sign",
    category: "dashes",
    count: 0,
  },

  // Smart Quotes
  "\u2018": {
    replacement: "'",
    label: "Left Single Quotation Mark",
    category: "quotes",
    count: 0,
  },
  "\u2019": {
    replacement: "'",
    label: "Right Single Quotation Mark",
    category: "quotes",
    count: 0,
  },
  "\u201A": {
    replacement: "'",
    label: "Single Low-9 Quotation Mark",
    category: "quotes",
    count: 0,
  },
  "\u201B": {
    replacement: "'",
    label: "Single High-Reversed-9 Quotation Mark",
    category: "quotes",
    count: 0,
  },
  "\u201C": {
    replacement: '"',
    label: "Left Double Quotation Mark",
    category: "quotes",
    count: 0,
  },
  "\u201D": {
    replacement: '"',
    label: "Right Double Quotation Mark",
    category: "quotes",
    count: 0,
  },
  "\u201E": {
    replacement: '"',
    label: "Double Low-9 Quotation Mark",
    category: "quotes",
    count: 0,
  },
  "\u201F": {
    replacement: '"',
    label: "Double High-Reversed-9 Quotation Mark",
    category: "quotes",
    count: 0,
  },
  "\u2032": {
    replacement: "'",
    label: "Prime",
    category: "quotes",
    count: 0,
  },
  "\u2033": {
    replacement: '"',
    label: "Double Prime",
    category: "quotes",
    count: 0,
  },
  "\u2034": {
    replacement: "'''",
    label: "Triple Prime",
    category: "quotes",
    count: 0,
  },
  "\u2035": {
    replacement: "'",
    label: "Reversed Prime",
    category: "quotes",
    count: 0,
  },
  "\u2036": {
    replacement: '"',
    label: "Reversed Double Prime",
    category: "quotes",
    count: 0,
  },
  "\u00AB": {
    replacement: '"',
    label: "Left-Pointing Double Angle Quotation Mark",
    category: "quotes",
    count: 0,
  },
  "\u00BB": {
    replacement: '"',
    label: "Right-Pointing Double Angle Quotation Mark",
    category: "quotes",
    count: 0,
  },
};
