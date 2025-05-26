export interface CharData {
  replacement: string;
  label: string;
  category: string;
  count: number;
}

export type CharMap = Record<string, CharData>;

// Unified character map with all characters organized by category
export const allCharactersMap: CharMap = {
  // Hidden/Control Characters
  "\u00AD": {
    replacement: "",
    label: "Soft Hyphen",
    category: "hiddenControl",
    count: 0,
  },
  "\u180E": {
    replacement: "",
    label: "Mongolian Vowel Separator",
    category: "hiddenControl",
    count: 0,
  },
  "\u200B": {
    replacement: "",
    label: "Zero-width Space",
    category: "hiddenControl",
    count: 0,
  },
  "\u200C": {
    replacement: "",
    label: "Zero-width Non-joiner",
    category: "hiddenControl",
    count: 0,
  },
  "\u200D": {
    replacement: "",
    label: "Zero-width Joiner",
    category: "hiddenControl",
    count: 0,
  },
  "\u200E": {
    replacement: "",
    label: "Left-to-Right Mark",
    category: "hiddenControl",
    count: 0,
  },
  "\u200F": {
    replacement: "",
    label: "Right-to-Left Mark",
    category: "hiddenControl",
    count: 0,
  },
  "\u202A": {
    replacement: "",
    label: "Left-to-Right Embedding",
    category: "hiddenControl",
    count: 0,
  },
  "\u202B": {
    replacement: "",
    label: "Right-to-Left Embedding",
    category: "hiddenControl",
    count: 0,
  },
  "\u202C": {
    replacement: "",
    label: "Pop Directional Formatting",
    category: "hiddenControl",
    count: 0,
  },
  "\u202D": {
    replacement: "",
    label: "Left-to-Right Override",
    category: "hiddenControl",
    count: 0,
  },
  "\u202E": {
    replacement: "",
    label: "Right-to-Left Override",
    category: "hiddenControl",
    count: 0,
  },
  "\u2060": {
    replacement: "",
    label: "Word Joiner",
    category: "hiddenControl",
    count: 0,
  },
  "\u2061": {
    replacement: "",
    label: "Function Application",
    category: "hiddenControl",
    count: 0,
  },
  "\u2062": {
    replacement: "",
    label: "Invisible Times",
    category: "hiddenControl",
    count: 0,
  },
  "\u2063": {
    replacement: "",
    label: "Invisible Separator",
    category: "hiddenControl",
    count: 0,
  },
  "\u2064": {
    replacement: "",
    label: "Invisible Plus",
    category: "hiddenControl",
    count: 0,
  },
  "\u206A": {
    replacement: "",
    label: "Inhibit Symmetric Swapping",
    category: "hiddenControl",
    count: 0,
  },
  "\u206B": {
    replacement: "",
    label: "Activate Symmetric Swapping",
    category: "hiddenControl",
    count: 0,
  },
  "\u206C": {
    replacement: "",
    label: "Inhibit Arabic Form Shaping",
    category: "hiddenControl",
    count: 0,
  },
  "\u206D": {
    replacement: "",
    label: "Activate Arabic Form Shaping",
    category: "hiddenControl",
    count: 0,
  },
  "\u206E": {
    replacement: "",
    label: "National Digit Shapes",
    category: "hiddenControl",
    count: 0,
  },
  "\u206F": {
    replacement: "",
    label: "Nominal Digit Shapes",
    category: "hiddenControl",
    count: 0,
  },
  "\uFEFF": {
    replacement: "",
    label: "Byte Order Mark",
    category: "hiddenControl",
    count: 0,
  },

  // Variation Selectors
  "\uFE00": {
    replacement: "",
    label: "Variation Selector-1",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE01": {
    replacement: "",
    label: "Variation Selector-2",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE02": {
    replacement: "",
    label: "Variation Selector-3",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE03": {
    replacement: "",
    label: "Variation Selector-4",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE04": {
    replacement: "",
    label: "Variation Selector-5",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE05": {
    replacement: "",
    label: "Variation Selector-6",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE06": {
    replacement: "",
    label: "Variation Selector-7",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE07": {
    replacement: "",
    label: "Variation Selector-8",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE08": {
    replacement: "",
    label: "Variation Selector-9",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE09": {
    replacement: "",
    label: "Variation Selector-10",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE0A": {
    replacement: "",
    label: "Variation Selector-11",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE0B": {
    replacement: "",
    label: "Variation Selector-12",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE0C": {
    replacement: "",
    label: "Variation Selector-13",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE0D": {
    replacement: "",
    label: "Variation Selector-14",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE0E": {
    replacement: "",
    label: "Variation Selector-15",
    category: "variationSelectors",
    count: 0,
  },
  "\uFE0F": {
    replacement: "",
    label: "Variation Selector-16",
    category: "variationSelectors",
    count: 0,
  },

  // Unusual Spaces
  "\u00A0": {
    replacement: " ",
    label: "Non-breaking Space",
    category: "unusualSpaces",
    count: 0,
  },
  "\u1680": {
    replacement: " ",
    label: "Ogham Space Mark",
    category: "unusualSpaces",
    count: 0,
  },
  "\u2000": {
    replacement: " ",
    label: "En Quad",
    category: "unusualSpaces",
    count: 0,
  },
  "\u2001": {
    replacement: " ",
    label: "Em Quad",
    category: "unusualSpaces",
    count: 0,
  },
  "\u2002": {
    replacement: " ",
    label: "En Space",
    category: "unusualSpaces",
    count: 0,
  },
  "\u2003": {
    replacement: " ",
    label: "Em Space",
    category: "unusualSpaces",
    count: 0,
  },
  "\u2004": {
    replacement: " ",
    label: "Three-Per-Em Space",
    category: "unusualSpaces",
    count: 0,
  },
  "\u2005": {
    replacement: " ",
    label: "Four-Per-Em Space",
    category: "unusualSpaces",
    count: 0,
  },
  "\u2006": {
    replacement: " ",
    label: "Six-Per-Em Space",
    category: "unusualSpaces",
    count: 0,
  },
  "\u2007": {
    replacement: " ",
    label: "Figure Space",
    category: "unusualSpaces",
    count: 0,
  },
  "\u2008": {
    replacement: " ",
    label: "Punctuation Space",
    category: "unusualSpaces",
    count: 0,
  },
  "\u2009": {
    replacement: " ",
    label: "Thin Space",
    category: "unusualSpaces",
    count: 0,
  },
  "\u200A": {
    replacement: " ",
    label: "Hair Space",
    category: "unusualSpaces",
    count: 0,
  },
  "\u202F": {
    replacement: " ",
    label: "Narrow No-Break Space",
    category: "unusualSpaces",
    count: 0,
  },
  "\u205F": {
    replacement: " ",
    label: "Medium Mathematical Space",
    category: "unusualSpaces",
    count: 0,
  },
  "\u3000": {
    replacement: " ",
    label: "Ideographic Space",
    category: "unusualSpaces",
    count: 0,
  },

  // Non-standard Dashes
  "\u2012": {
    replacement: "-",
    label: "Figure Dash",
    category: "nonStandardDashes",
    count: 0,
  },
  "\u2013": {
    replacement: "-",
    label: "En Dash",
    category: "nonStandardDashes",
    count: 0,
  },
  "\u2014": {
    replacement: "-",
    label: "Em Dash",
    category: "nonStandardDashes",
    count: 0,
  },
  "\u2015": {
    replacement: "-",
    label: "Horizontal Bar",
    category: "nonStandardDashes",
    count: 0,
  },
  "\u2212": {
    replacement: "-",
    label: "Minus Sign",
    category: "nonStandardDashes",
    count: 0,
  },

  // Smart Quotes
  "\u2018": {
    replacement: "'",
    label: "Left Single Quotation Mark",
    category: "smartQuotes",
    count: 0,
  },
  "\u2019": {
    replacement: "'",
    label: "Right Single Quotation Mark",
    category: "smartQuotes",
    count: 0,
  },
  "\u201A": {
    replacement: "'",
    label: "Single Low-9 Quotation Mark",
    category: "smartQuotes",
    count: 0,
  },
  "\u201B": {
    replacement: "'",
    label: "Single High-Reversed-9 Quotation Mark",
    category: "smartQuotes",
    count: 0,
  },
  "\u201C": {
    replacement: '"',
    label: "Left Double Quotation Mark",
    category: "smartQuotes",
    count: 0,
  },
  "\u201D": {
    replacement: '"',
    label: "Right Double Quotation Mark",
    category: "smartQuotes",
    count: 0,
  },
  "\u201E": {
    replacement: '"',
    label: "Double Low-9 Quotation Mark",
    category: "smartQuotes",
    count: 0,
  },
  "\u201F": {
    replacement: '"',
    label: "Double High-Reversed-9 Quotation Mark",
    category: "smartQuotes",
    count: 0,
  },
  "\u2032": {
    replacement: "'",
    label: "Prime",
    category: "smartQuotes",
    count: 0,
  },
  "\u2033": {
    replacement: '"',
    label: "Double Prime",
    category: "smartQuotes",
    count: 0,
  },
  "\u2034": {
    replacement: "'''",
    label: "Triple Prime",
    category: "smartQuotes",
    count: 0,
  },
  "\u2035": {
    replacement: "'",
    label: "Reversed Prime",
    category: "smartQuotes",
    count: 0,
  },
  "\u2036": {
    replacement: '"',
    label: "Reversed Double Prime",
    category: "smartQuotes",
    count: 0,
  },
  "\u00AB": {
    replacement: '"',
    label: "Left-Pointing Double Angle Quotation Mark",
    category: "smartQuotes",
    count: 0,
  },
  "\u00BB": {
    replacement: '"',
    label: "Right-Pointing Double Angle Quotation Mark",
    category: "smartQuotes",
    count: 0,
  },
};

// Legacy exports for backward compatibility (these can be removed later)
export const charactersMap: CharMap = allCharactersMap;

export const controlChars: CharMap = Object.fromEntries(
  Object.entries(allCharactersMap).filter(
    ([_, data]) => data.category === "hiddenControl"
  )
);

export const selectorChars: CharMap = Object.fromEntries(
  Object.entries(allCharactersMap).filter(
    ([_, data]) => data.category === "variationSelectors"
  )
);

export const spaceChars: CharMap = Object.fromEntries(
  Object.entries(allCharactersMap).filter(
    ([_, data]) => data.category === "unusualSpaces"
  )
);

export const dashChars: CharMap = Object.fromEntries(
  Object.entries(allCharactersMap).filter(
    ([_, data]) => data.category === "nonStandardDashes"
  )
);

export const quoteChars: CharMap = Object.fromEntries(
  Object.entries(allCharactersMap).filter(
    ([_, data]) => data.category === "smartQuotes"
  )
);
