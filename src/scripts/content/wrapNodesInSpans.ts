// =============================================================================
// WRAP NODES IN SPANS
// =============================================================================

/*
This function wraps the provided text nodes in boundary-preserving spans.

By wrapping the text nodes in spans, we have an easily identifiable boundary to work with.

The boundary spans enable us to add or remove highlighting without affecting the text content/boundaries.
*/
export const wrapTextNodesInSpans = (textNodes: Text[]): HTMLSpanElement[] => {
  console.log("📍 Wrapping text nodes in boundary spans...");

  const wrappedSpans: HTMLSpanElement[] = [];

  textNodes.forEach((textNode, index) => {
    const parent = textNode.parentNode;
    if (!parent) return;

    const boundarySpan = document.createElement("span");
    boundarySpan.className = "robocrop-text-boundary";
    boundarySpan.setAttribute("data-boundary-id", index.toString());
    boundarySpan.setAttribute("data-original-text", textNode.textContent || "");
    boundarySpan.textContent = textNode.textContent;

    parent.replaceChild(boundarySpan, textNode);
    wrappedSpans.push(boundarySpan);
  });

  console.log(`✅ Wrapped ${wrappedSpans.length} text nodes`);
  return wrappedSpans;
};
