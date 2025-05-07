/*
If you don't supply a popup, then a click event is dispatched to your extension when the user clicks the button. If you do supply a popup, the click event is not dispatched, but instead, the popup is opened. We want a popup, so let's create that next.
*/

function replaceVowels(text) {
  const vowelMap = {
    a: "@",
    e: "3",
    i: "!",
    o: "0",
    u: "#",
  };

  return text.replace(/[aeiou]/gi, function (match) {
    return vowelMap[match.toLowerCase()] || match;
  });
}

function findAndReplaceDivText() {
  try {
    const tags = document.getElementsByTagName("h6");
    console.log("Number of h6 tags found:", tags.length);

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      console.log("Checking tag:", tag.textContent);

      if (tag.textContent && tag.textContent.includes("ChatGPT said:")) {
        const div = tag.nextElementSibling;
        if (div) {
          console.log("Found div, original text:", div.textContent);

          if (!div.hasAttribute("data-modified")) {
            const newText = replaceVowels(div.textContent || "");
            div.textContent = newText;
            div.setAttribute("data-modified", "true");

            console.log("Modified text to:", newText);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in text replacement:", error);
  }
}

findAndReplaceDivText();
