export interface CharData {
  replacement: string;
  label: string;
}

export const charactersMap: Record<string, CharData> = {
  // Hidden/control characters
  "\u00AD": { replacement: "", label: "Soft Hyphen" },
  "\u180E": { replacement: "", label: "Mongolian Vowel Separator" },
  "\u200B": { replacement: "", label: "Zero-width Space" },
  "\u200C": { replacement: "", label: "Zero-width Non-joiner" },
  "\u200D": { replacement: "", label: "Zero-width Joiner" },
  "\u200E": { replacement: "", label: "Left-to-Right Mark" },
  "\u200F": { replacement: "", label: "Right-to-Left Mark" },
  "\u202A": { replacement: "", label: "Left-to-Right Embedding" },
  "\u202B": { replacement: "", label: "Right-to-Left Embedding" },
  "\u202C": { replacement: "", label: "Pop Directional Formatting" },
  "\u202D": { replacement: "", label: "Left-to-Right Override" },
  "\u202E": { replacement: "", label: "Right-to-Left Override" },
  "\u2060": { replacement: "", label: "Word Joiner" },
  "\u2061": { replacement: "", label: "Function Application" },
  "\u2062": { replacement: "", label: "Invisible Times" },
  "\u2063": { replacement: "", label: "Invisible Separator" },
  "\u2064": { replacement: "", label: "Invisible Plus" },
  "\u206A": { replacement: "", label: "Inhibit Symmetric Swapping" },
  "\u206B": { replacement: "", label: "Activate Symmetric Swapping" },
  "\u206C": { replacement: "", label: "Inhibit Arabic Form Shaping" },
  "\u206D": { replacement: "", label: "Activate Arabic Form Shaping" },
  "\u206E": { replacement: "", label: "National Digit Shapes" },
  "\u206F": { replacement: "", label: "Nominal Digit Shapes" },
  "\uFEFF": { replacement: "", label: "Byte Order Mark" },

  // Variation selectors
  "\uFE00": { replacement: "", label: "Variation Selector-1" },
  "\uFE01": { replacement: "", label: "Variation Selector-2" },
  "\uFE02": { replacement: "", label: "Variation Selector-3" },
  "\uFE03": { replacement: "", label: "Variation Selector-4" },
  "\uFE04": { replacement: "", label: "Variation Selector-5" },
  "\uFE05": { replacement: "", label: "Variation Selector-6" },
  "\uFE06": { replacement: "", label: "Variation Selector-7" },
  "\uFE07": { replacement: "", label: "Variation Selector-8" },
  "\uFE08": { replacement: "", label: "Variation Selector-9" },
  "\uFE09": { replacement: "", label: "Variation Selector-10" },
  "\uFE0A": { replacement: "", label: "Variation Selector-11" },
  "\uFE0B": { replacement: "", label: "Variation Selector-12" },
  "\uFE0C": { replacement: "", label: "Variation Selector-13" },
  "\uFE0D": { replacement: "", label: "Variation Selector-14" },
  "\uFE0E": { replacement: "", label: "Variation Selector-15" },
  "\uFE0F": { replacement: "", label: "Variation Selector-16" },

  // Space characters
  "\u00A0": { replacement: " ", label: "Non-breaking Space" },
  "\u1680": { replacement: " ", label: "Ogham Space Mark" },
  "\u2000": { replacement: " ", label: "En Quad" },
  "\u2001": { replacement: " ", label: "Em Quad" },
  "\u2002": { replacement: " ", label: "En Space" },
  "\u2003": { replacement: " ", label: "Em Space" },
  "\u2004": { replacement: " ", label: "Three-Per-Em Space" },
  "\u2005": { replacement: " ", label: "Four-Per-Em Space" },
  "\u2006": { replacement: " ", label: "Six-Per-Em Space" },
  "\u2007": { replacement: " ", label: "Figure Space" },
  "\u2008": { replacement: " ", label: "Punctuation Space" },
  "\u2009": { replacement: " ", label: "Thin Space" },
  "\u200A": { replacement: " ", label: "Hair Space" },
  "\u202F": { replacement: " ", label: "Narrow No-Break Space" },
  "\u205F": { replacement: " ", label: "Medium Mathematical Space" },
  "\u3000": { replacement: " ", label: "Ideographic Space" },

  // Dashes
  "\u2012": { replacement: "-", label: "Figure Dash" },
  "\u2013": { replacement: "-", label: "En Dash" },
  "\u2014": { replacement: "-", label: "Em Dash" },
  "\u2015": { replacement: "-", label: "Horizontal Bar" },
  "\u2212": { replacement: "-", label: "Minus Sign" },

  // Quotes and Apostrophes
  "\u2018": { replacement: "'", label: "Left Single Quotation Mark" },
  "\u2019": { replacement: "'", label: "Right Single Quotation Mark" },
  "\u201A": { replacement: "'", label: "Single Low-9 Quotation Mark" },
  "\u201B": {
    replacement: "'",
    label: "Single High-Reversed-9 Quotation Mark",
  },
  "\u201C": { replacement: '"', label: "Left Double Quotation Mark" },
  "\u201D": { replacement: '"', label: "Right Double Quotation Mark" },
  "\u201E": { replacement: '"', label: "Double Low-9 Quotation Mark" },
  "\u201F": {
    replacement: '"',
    label: "Double High-Reversed-9 Quotation Mark",
  },
  "\u2032": { replacement: "'", label: "Prime" },
  "\u2033": { replacement: '"', label: "Double Prime" },
  "\u2034": { replacement: "'''", label: "Triple Prime" },
  "\u2035": { replacement: "'", label: "Reversed Prime" },
  "\u2036": { replacement: '"', label: "Reversed Double Prime" },
  "\u00AB": {
    replacement: '"',
    label: "Left-Pointing Double Angle Quotation Mark",
  },
  "\u00BB": {
    replacement: '"',
    label: "Right-Pointing Double Angle Quotation Mark",
  },
};

export const controlChars: Record<string, CharData> = {
  // Hidden/control characters
  "\u00AD": { replacement: "", label: "Soft Hyphen" },
  "\u180E": { replacement: "", label: "Mongolian Vowel Separator" },
  "\u200B": { replacement: "", label: "Zero-width Space" },
  "\u200C": { replacement: "", label: "Zero-width Non-joiner" },
  "\u200D": { replacement: "", label: "Zero-width Joiner" },
  "\u200E": { replacement: "", label: "Left-to-Right Mark" },
  "\u200F": { replacement: "", label: "Right-to-Left Mark" },
  "\u202A": { replacement: "", label: "Left-to-Right Embedding" },
  "\u202B": { replacement: "", label: "Right-to-Left Embedding" },
  "\u202C": { replacement: "", label: "Pop Directional Formatting" },
  "\u202D": { replacement: "", label: "Left-to-Right Override" },
  "\u202E": { replacement: "", label: "Right-to-Left Override" },
  "\u2060": { replacement: "", label: "Word Joiner" },
  "\u2061": { replacement: "", label: "Function Application" },
  "\u2062": { replacement: "", label: "Invisible Times" },
  "\u2063": { replacement: "", label: "Invisible Separator" },
  "\u2064": { replacement: "", label: "Invisible Plus" },
  "\u206A": { replacement: "", label: "Inhibit Symmetric Swapping" },
  "\u206B": { replacement: "", label: "Activate Symmetric Swapping" },
  "\u206C": { replacement: "", label: "Inhibit Arabic Form Shaping" },
  "\u206D": { replacement: "", label: "Activate Arabic Form Shaping" },
  "\u206E": { replacement: "", label: "National Digit Shapes" },
  "\u206F": { replacement: "", label: "Nominal Digit Shapes" },
  "\uFEFF": { replacement: "", label: "Byte Order Mark" },
};

export const selectorChars: Record<string, CharData> = {
  // Variation selectors
  "\uFE00": { replacement: "", label: "Variation Selector-1" },
  "\uFE01": { replacement: "", label: "Variation Selector-2" },
  "\uFE02": { replacement: "", label: "Variation Selector-3" },
  "\uFE03": { replacement: "", label: "Variation Selector-4" },
  "\uFE04": { replacement: "", label: "Variation Selector-5" },
  "\uFE05": { replacement: "", label: "Variation Selector-6" },
  "\uFE06": { replacement: "", label: "Variation Selector-7" },
  "\uFE07": { replacement: "", label: "Variation Selector-8" },
  "\uFE08": { replacement: "", label: "Variation Selector-9" },
  "\uFE09": { replacement: "", label: "Variation Selector-10" },
  "\uFE0A": { replacement: "", label: "Variation Selector-11" },
  "\uFE0B": { replacement: "", label: "Variation Selector-12" },
  "\uFE0C": { replacement: "", label: "Variation Selector-13" },
  "\uFE0D": { replacement: "", label: "Variation Selector-14" },
  "\uFE0E": { replacement: "", label: "Variation Selector-15" },
  "\uFE0F": { replacement: "", label: "Variation Selector-16" },
};

export const spaceChars: Record<string, CharData> = {
  // Space characters
  "\u00A0": { replacement: " ", label: "Non-breaking Space" },
  "\u1680": { replacement: " ", label: "Ogham Space Mark" },
  "\u2000": { replacement: " ", label: "En Quad" },
  "\u2001": { replacement: " ", label: "Em Quad" },
  "\u2002": { replacement: " ", label: "En Space" },
  "\u2003": { replacement: " ", label: "Em Space" },
  "\u2004": { replacement: " ", label: "Three-Per-Em Space" },
  "\u2005": { replacement: " ", label: "Four-Per-Em Space" },
  "\u2006": { replacement: " ", label: "Six-Per-Em Space" },
  "\u2007": { replacement: " ", label: "Figure Space" },
  "\u2008": { replacement: " ", label: "Punctuation Space" },
  "\u2009": { replacement: " ", label: "Thin Space" },
  "\u200A": { replacement: " ", label: "Hair Space" },
  "\u202F": { replacement: " ", label: "Narrow No-Break Space" },
  "\u205F": { replacement: " ", label: "Medium Mathematical Space" },
  "\u3000": { replacement: " ", label: "Ideographic Space" },
};

export const dashChars: Record<string, CharData> = {
  // Dashes
  "\u2012": { replacement: "-", label: "Figure Dash" },
  "\u2013": { replacement: "-", label: "En Dash" },
  "\u2014": { replacement: "-", label: "Em Dash" },
  "\u2015": { replacement: "-", label: "Horizontal Bar" },
};

export const quoteChars: Record<string, CharData> = {
  // Quotes and Apostrophes
  "\u2018": { replacement: "'", label: "Left Single Quotation Mark" },
  "\u2019": { replacement: "'", label: "Right Single Quotation Mark" },
  "\u201A": { replacement: "'", label: "Single Low-9 Quotation Mark" },
  "\u201B": {
    replacement: "'",
    label: "Single High-Reversed-9 Quotation Mark",
  },
  "\u201C": { replacement: '"', label: "Left Double Quotation Mark" },
  "\u201D": { replacement: '"', label: "Right Double Quotation Mark" },
  "\u201E": { replacement: '"', label: "Double Low-9 Quotation Mark" },
  "\u201F": {
    replacement: '"',
    label: "Double High-Reversed-9 Quotation Mark",
  },
  "\u2032": { replacement: "'", label: "Prime" },
  "\u2033": { replacement: '"', label: "Double Prime" },
  "\u2034": { replacement: "'''", label: "Triple Prime" },
  "\u2035": { replacement: "'", label: "Reversed Prime" },
  "\u2036": { replacement: '"', label: "Reversed Double Prime" },
  "\u00AB": {
    replacement: '"',
    label: "Left-Pointing Double Angle Quotation Mark",
  },
  "\u00BB": {
    replacement: '"',
    label: "Right-Pointing Double Angle Quotation Mark",
  },
};
