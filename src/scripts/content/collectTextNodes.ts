// =============================================================================
// COLLECT TEXT NODES
// =============================================================================

/*
This function collects all text nodes in the document.

We need to collect all text nodes to be able to wrap them in boundary-preserving spans, which in turn enables us to add/remove highlighting, or restore the page more easily.

*/

export const collectTextNodes = (): Text[] => {
  console.log("📍 Collecting text nodes...");

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  const textNodes: Text[] = [];
  let currentNode;

  while ((currentNode = walker.nextNode())) {
    const textNode = currentNode as Text;
    const parent = textNode.parentNode;

    // Skip script, style, noscript tags
    if (parent && ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.nodeName)) {
      continue;
    }

    // Skip empty text nodes
    if (!textNode.textContent?.trim()) {
      continue;
    }

    textNodes.push(textNode);
  }

  console.log(`Found ${textNodes.length} text nodes`);
  return textNodes;
};
