import { CharMap, RobocropSettings } from "../types/types";

export const buttonId = "my-button";

// Default settings
export const defaultSettings: RobocropSettings = {
  invisible: true,
  selectors: true,
  spaces: true,
  dashes: true,
  // quotes: true,
  // vfx: true,
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
  // quotes:
  //   "Detects smart or curly quotes and apostrophes that replace straight quotes.",
  // vfx: "Toggles visual effects to highlight detected special characters in the text.",
};

// const invisibleReplacement = "";
// const selectorReplacement = "";
// const spaceReplacement = "";
// const dashReplacement = "-";

const invisibleReplacement = "X";
const selectorReplacement = "X";
const spaceReplacement = "X";
const dashReplacement = "X";

// Unified character map with all characters organized by category
export const charactersMap: CharMap = {
  // Hidden/Control Characters
  "\u00AD": {
    replacement: invisibleReplacement,
    label: "Soft Hyphen",
    category: "invisible",
    count: 0,
  },
  "\u180E": {
    replacement: invisibleReplacement,
    label: "Mongolian Vowel Separator",
    category: "invisible",
    count: 0,
  },
  "\u200B": {
    replacement: invisibleReplacement,
    label: "Zero-width Space",
    category: "invisible",
    count: 0,
  },
  "\u200C": {
    replacement: invisibleReplacement,
    label: "Zero-width Non-joiner",
    category: "invisible",
    count: 0,
  },
  "\u200D": {
    replacement: invisibleReplacement,
    label: "Zero-width Joiner",
    category: "invisible",
    count: 0,
  },
  "\u200E": {
    replacement: invisibleReplacement,
    label: "Left-to-Right Mark",
    category: "invisible",
    count: 0,
  },
  "\u200F": {
    replacement: invisibleReplacement,
    label: "Right-to-Left Mark",
    category: "invisible",
    count: 0,
  },
  "\u202A": {
    replacement: invisibleReplacement,
    label: "Left-to-Right Embedding",
    category: "invisible",
    count: 0,
  },
  "\u202B": {
    replacement: invisibleReplacement,
    label: "Right-to-Left Embedding",
    category: "invisible",
    count: 0,
  },
  "\u202C": {
    replacement: invisibleReplacement,
    label: "Pop Directional Formatting",
    category: "invisible",
    count: 0,
  },
  "\u202D": {
    replacement: invisibleReplacement,
    label: "Left-to-Right Override",
    category: "invisible",
    count: 0,
  },
  "\u202E": {
    replacement: invisibleReplacement,
    label: "Right-to-Left Override",
    category: "invisible",
    count: 0,
  },
  "\u2060": {
    replacement: invisibleReplacement,
    label: "Word Joiner",
    category: "invisible",
    count: 0,
  },
  "\u2061": {
    replacement: invisibleReplacement,
    label: "Function Application",
    category: "invisible",
    count: 0,
  },
  "\u2062": {
    replacement: invisibleReplacement,
    label: "Invisible Times",
    category: "invisible",
    count: 0,
  },
  "\u2063": {
    replacement: invisibleReplacement,
    label: "Invisible Separator",
    category: "invisible",
    count: 0,
  },
  "\u2064": {
    replacement: invisibleReplacement,
    label: "Invisible Plus",
    category: "invisible",
    count: 0,
  },
  "\u206A": {
    replacement: invisibleReplacement,
    label: "Inhibit Symmetric Swapping",
    category: "invisible",
    count: 0,
  },
  "\u206B": {
    replacement: invisibleReplacement,
    label: "Activate Symmetric Swapping",
    category: "invisible",
    count: 0,
  },
  "\u206C": {
    replacement: invisibleReplacement,
    label: "Inhibit Arabic Form Shaping",
    category: "invisible",
    count: 0,
  },
  "\u206D": {
    replacement: invisibleReplacement,
    label: "Activate Arabic Form Shaping",
    category: "invisible",
    count: 0,
  },
  "\u206E": {
    replacement: invisibleReplacement,
    label: "National Digit Shapes",
    category: "invisible",
    count: 0,
  },
  "\u206F": {
    replacement: invisibleReplacement,
    label: "Nominal Digit Shapes",
    category: "invisible",
    count: 0,
  },
  "\uFEFF": {
    replacement: invisibleReplacement,
    label: "Byte Order Mark",
    category: "invisible",
    count: 0,
  },

  // Variation Selectors
  "\uFE00": {
    replacement: selectorReplacement,
    label: "Variation Selector-1",
    category: "selectors",
    count: 0,
  },
  "\uFE01": {
    replacement: selectorReplacement,
    label: "Variation Selector-2",
    category: "selectors",
    count: 0,
  },
  "\uFE02": {
    replacement: selectorReplacement,
    label: "Variation Selector-3",
    category: "selectors",
    count: 0,
  },
  "\uFE03": {
    replacement: selectorReplacement,
    label: "Variation Selector-4",
    category: "selectors",
    count: 0,
  },
  "\uFE04": {
    replacement: selectorReplacement,
    label: "Variation Selector-5",
    category: "selectors",
    count: 0,
  },
  "\uFE05": {
    replacement: selectorReplacement,
    label: "Variation Selector-6",
    category: "selectors",
    count: 0,
  },
  "\uFE06": {
    replacement: selectorReplacement,
    label: "Variation Selector-7",
    category: "selectors",
    count: 0,
  },
  "\uFE07": {
    replacement: selectorReplacement,
    label: "Variation Selector-8",
    category: "selectors",
    count: 0,
  },
  "\uFE08": {
    replacement: selectorReplacement,
    label: "Variation Selector-9",
    category: "selectors",
    count: 0,
  },
  "\uFE09": {
    replacement: selectorReplacement,
    label: "Variation Selector-10",
    category: "selectors",
    count: 0,
  },
  "\uFE0A": {
    replacement: selectorReplacement,
    label: "Variation Selector-11",
    category: "selectors",
    count: 0,
  },
  "\uFE0B": {
    replacement: selectorReplacement,
    label: "Variation Selector-12",
    category: "selectors",
    count: 0,
  },
  "\uFE0C": {
    replacement: selectorReplacement,
    label: "Variation Selector-13",
    category: "selectors",
    count: 0,
  },
  "\uFE0D": {
    replacement: selectorReplacement,
    label: "Variation Selector-14",
    category: "selectors",
    count: 0,
  },
  "\uFE0E": {
    replacement: selectorReplacement,
    label: "Variation Selector-15",
    category: "selectors",
    count: 0,
  },
  "\uFE0F": {
    replacement: selectorReplacement,
    label: "Variation Selector-16",
    category: "selectors",
    count: 0,
  },

  // Unusual Spaces
  "\u00A0": {
    replacement: spaceReplacement,
    label: "Non-breaking Space",
    category: "spaces",
    count: 0,
  },
  "\u1680": {
    replacement: spaceReplacement,
    label: "Ogham Space Mark",
    category: "spaces",
    count: 0,
  },
  "\u2000": {
    replacement: spaceReplacement,
    label: "En Quad",
    category: "spaces",
    count: 0,
  },
  "\u2001": {
    replacement: spaceReplacement,
    label: "Em Quad",
    category: "spaces",
    count: 0,
  },
  "\u2002": {
    replacement: spaceReplacement,
    label: "En Space",
    category: "spaces",
    count: 0,
  },
  "\u2003": {
    replacement: spaceReplacement,
    label: "Em Space",
    category: "spaces",
    count: 0,
  },
  "\u2004": {
    replacement: spaceReplacement,
    label: "Three-Per-Em Space",
    category: "spaces",
    count: 0,
  },
  "\u2005": {
    replacement: spaceReplacement,
    label: "Four-Per-Em Space",
    category: "spaces",
    count: 0,
  },
  "\u2006": {
    replacement: spaceReplacement,
    label: "Six-Per-Em Space",
    category: "spaces",
    count: 0,
  },
  "\u2007": {
    replacement: spaceReplacement,
    label: "Figure Space",
    category: "spaces",
    count: 0,
  },
  "\u2008": {
    replacement: spaceReplacement,
    label: "Punctuation Space",
    category: "spaces",
    count: 0,
  },
  "\u2009": {
    replacement: spaceReplacement,
    label: "Thin Space",
    category: "spaces",
    count: 0,
  },
  "\u200A": {
    replacement: spaceReplacement,
    label: "Hair Space",
    category: "spaces",
    count: 0,
  },
  "\u202F": {
    replacement: spaceReplacement,
    label: "Narrow No-Break Space",
    category: "spaces",
    count: 0,
  },
  "\u205F": {
    replacement: spaceReplacement,
    label: "Medium Mathematical Space",
    category: "spaces",
    count: 0,
  },
  "\u3000": {
    replacement: spaceReplacement,
    label: "Ideographic Space",
    category: "spaces",
    count: 0,
  },

  // Non-standard Dashes
  "\u2012": {
    replacement: dashReplacement,
    label: "Figure Dash",
    category: "dashes",
    count: 0,
  },
  "\u2013": {
    replacement: dashReplacement,
    label: "En Dash",
    category: "dashes",
    count: 0,
  },
  "\u2014": {
    replacement: dashReplacement,
    label: "Em Dash",
    category: "dashes",
    count: 0,
  },
  "\u2015": {
    replacement: dashReplacement,
    label: "Horizontal Bar",
    category: "dashes",
    count: 0,
  },
  "\u2212": {
    replacement: dashReplacement,
    label: "Minus Sign",
    category: "dashes",
    count: 0,
  },
};
//! Smart Quotes
//? removed for now
// "\u2018": {
//   replacement: "'",
//   label: "Left Single Quotation Mark",
//   category: "quotes",
//   count: 0,
// },
// "\u2019": {
//   replacement: "'",
//   label: "Right Single Quotation Mark",
//   category: "quotes",
//   count: 0,
// },
// "\u201A": {
//   replacement: "'",
//   label: "Single Low-9 Quotation Mark",
//   category: "quotes",
//   count: 0,
// },
// "\u201B": {
//   replacement: "'",
//   label: "Single High-Reversed-9 Quotation Mark",
//   category: "quotes",
//   count: 0,
// },
// "\u201C": {
//   replacement: '"',
//   label: "Left Double Quotation Mark",
//   category: "quotes",
//   count: 0,
// },
// "\u201D": {
//   replacement: '"',
//   label: "Right Double Quotation Mark",
//   category: "quotes",
//   count: 0,
// },
// "\u201E": {
//   replacement: '"',
//   label: "Double Low-9 Quotation Mark",
//   category: "quotes",
//   count: 0,
// },
// "\u201F": {
//   replacement: '"',
//   label: "Double High-Reversed-9 Quotation Mark",
//   category: "quotes",
//   count: 0,
// },
// "\u2032": {
//   replacement: "'",
//   label: "Prime",
//   category: "quotes",
//   count: 0,
// },
// "\u2033": {
//   replacement: '"',
//   label: "Double Prime",
//   category: "quotes",
//   count: 0,
// },
// "\u2034": {
//   replacement: "'''",
//   label: "Triple Prime",
//   category: "quotes",
//   count: 0,
// },
// "\u2035": {
//   replacement: "'",
//   label: "Reversed Prime",
//   category: "quotes",
//   count: 0,
// },
// "\u2036": {
//   replacement: '"',
//   label: "Reversed Double Prime",
//   category: "quotes",
//   count: 0,
// },
// "\u00AB": {
//   replacement: '"',
//   label: "Left-Pointing Double Angle Quotation Mark",
//   category: "quotes",
//   count: 0,
// },
// "\u00BB": {
//   replacement: '"',
//   label: "Right-Pointing Double Angle Quotation Mark",
//   category: "quotes",
//   count: 0,
// },
// };
