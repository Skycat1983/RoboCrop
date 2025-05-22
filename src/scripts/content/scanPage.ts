const traverseDocument = () => {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  const nodesToProcess = [];
  let currentNode;

  while ((currentNode = walker.nextNode())) {
    const parentNode = currentNode.parentNode;
    if (
      parentNode &&
      (parentNode.nodeName === "SCRIPT" ||
        parentNode.nodeName === "STYLE" ||
        parentNode.nodeName === "NOSCRIPT")
    ) {
      continue;
    }

    if (currentNode.textContent && currentNode.textContent.trim()) {
      nodesToProcess.push(currentNode);
    }
  }

  console.log(`Found ${nodesToProcess.length} text nodes to process`);
};
