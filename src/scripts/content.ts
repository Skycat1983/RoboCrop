console.log("Content script loaded on page:", window.location.href);

// Apply initial red border to show the script is active
document.body.style.border = "5px solid red";

interface ReplacementMap {
  [key: string]: string;
}

interface ReplacementResult {
  count: number;
  replacedCount: number;
}

function findAndReplaceInvisibleCharacters(): ReplacementResult {
  console.log("Finding and replacing invisible characters");
  const characterMap: ReplacementMap = {
    "\u3164": "[INV]", // Hangul Filler
    "\u2800": "[INV]", // Braille Pattern Blank
    "\u200B": "[INV]", // Zero Width Space
    "\u200C": "[INV]", // Zero Width Non-Joiner
    "\u200D": "[INV]", // Zero Width Joiner
    "\u2060": "[INV]", // Word Joiner
    "\uFEFF": "[INV]", // Zero Width No-Break Space
    "\u00A0": "[NBSP]", // Non-Breaking Space
    "\u180E": "[INV]", // Mongolian Vowel Separator (historical invisible)
    "\u202F": "[NBSP]", // Narrow No-Break Space
    "\u205F": "[NBSP]", // Medium Mathematical Space
    "\u1680": "[INV]", // Ogham Space Mark
    "\u2000": "[NBSP]", // En Quad
    "\u2001": "[NBSP]", // Em Quad
    "\u2002": "[NBSP]", // En Space
    "\u2003": "[NBSP]", // Em Space
    "\u2004": "[NBSP]", // Three-Per-Em Space
    "\u2005": "[NBSP]", // Four-Per-Em Space
    "\u2006": "[NBSP]", // Six-Per-Em Space
    "\u2007": "[NBSP]", // Figure Space
    "\u2008": "[NBSP]", // Punctuation Space
    "\u2009": "[NBSP]", // Thin Space
    "\u200A": "[NBSP]", // Hair Space
  };

  let totalCount = 0;
  let replacedCount = 0;

  // Function to process a text node
  const processTextNode = (node: Text): void => {
    let text = node.nodeValue || "";
    let modified = false;

    // Check for each character in our map
    Object.keys(characterMap).forEach((char) => {
      const regex = new RegExp(char, "g");
      const matches = (text.match(regex) || []).length;

      if (matches > 0) {
        totalCount += matches;
        text = text.replace(regex, characterMap[char]);
        modified = true;
      }
    });

    // Only update the node if we made changes
    if (modified) {
      replacedCount++;
      node.nodeValue = text;
    }
  };

  // Recursive function to traverse the DOM
  const traverseDOM = (node: Node): void => {
    // Process text nodes
    if (node.nodeType === Node.TEXT_NODE) {
      console.log("Processing text node:", node.nodeValue);
      processTextNode(node as Text);
      return;
    }

    // Skip script and style elements
    if (node.nodeName === "SCRIPT" || node.nodeName === "STYLE") {
      return;
    }

    // Recursively process child nodes
    const children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
      traverseDOM(children[i]);
    }
  };

  // Start traversing from the body
  traverseDOM(document.body);

  // Add a visible indicator that the page was processed
  const indicator = document.createElement("div");
  indicator.style.position = "fixed";
  indicator.style.top = "10px";
  indicator.style.right = "10px";
  indicator.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  indicator.style.color = "white";
  indicator.style.padding = "10px";
  indicator.style.borderRadius = "5px";
  indicator.style.zIndex = "9999";
  indicator.style.fontSize = "14px";
  indicator.textContent = `Found ${totalCount} invisible characters in ${replacedCount} nodes`;

  // Remove any existing indicators
  const existingIndicator = document.getElementById("robocrop-indicator");
  if (existingIndicator) {
    existingIndicator.remove();
  }

  indicator.id = "robocrop-indicator";
  document.body.appendChild(indicator);

  return {
    count: totalCount,
    replacedCount: replacedCount,
  };
}

// Listen for messages from the popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Content script received message:", message);

  if (message.action === "activate") {
    try {
      // Call your find and replace function
      const result = findAndReplaceInvisibleCharacters();

      // Send the results back to the popup
      sendResponse({
        success: true,
        count: result.count,
        replacedCount: result.replacedCount,
      });
    } catch (error) {
      console.error("Error in text replacement:", error);
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
    return true;
  }
});

// interface VowelMap {
//   [key: string]: string;
// }

// interface ModifiableElement extends HTMLElement {
//   textContent: string | null;
// }

// function replaceVowels(text: string): string {
//   const vowelMap: VowelMap = {
//     a: "@",
//     e: "3",
//     i: "!",
//     o: "0",
//     u: "#",
//   };

//   return text.replace(/[aeiou]/gi, (match: string): string => {
//     return vowelMap[match.toLowerCase()] || match;
//   });
// }

// function findAndReplaceDivText(): void {
//   try {
//     const tags: HTMLCollectionOf<HTMLHeadingElement> =
//       document.getElementsByTagName("h6");
//     console.log("Number of h6 tags found:", tags.length);

//     Array.from(tags).forEach((tag: HTMLHeadingElement) => {
//       console.log("Checking tag:", tag.textContent);

//       if (tag.textContent?.includes("ChatGPT said:")) {
//         const div = tag.nextElementSibling as ModifiableElement;
//         if (div) {
//           console.log("Found div, original text:", div.textContent);

//           if (!div.hasAttribute("data-modified")) {
//             const newText = replaceVowels(div.textContent || "");
//             div.textContent = newText;
//             div.setAttribute("data-modified", "true");
//             console.log("Modified text to:", newText);
//           }
//         }
//       }
//     });
//   } catch (error) {
//     console.error(
//       "Error in text replacement:",
//       error instanceof Error ? error.message : String(error)
//     );
//   }
// }

// // Execute the function
// findAndReplaceDivText();
