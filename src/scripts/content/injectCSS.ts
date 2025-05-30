// =============================================================================
// INJECT CSS
// =============================================================================

/*
This was the only way I could get the CSS to work.

configuring webresources in manifest.json was giving me issues.
*/

export const injectCSS = () => {
  try {
    // Check if CSS is already injected to avoid duplicates
    if (document.getElementById("robocrop-styles")) {
      console.log("🎨 CSS already injected, skipping");
      return;
    }

    const link = document.createElement("link");
    link.id = "robocrop-styles";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = browser.runtime.getURL("src/styles/content.css");

    document.head.appendChild(link);
    console.log("🎨 CSS injected successfully");
  } catch (error) {
    console.error("❌ Failed to inject CSS:", error);
  }
};
