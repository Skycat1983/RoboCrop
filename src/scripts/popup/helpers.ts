// =============================================================================
// GET ACTIVE BROWSER TAB
// =============================================================================

/*
This function gets the active browser tab.

it is used by the request functions to ensure the content script is running in the correct tab.
*/

export const getActiveBrowserTab = async () => {
  const [activeTab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!activeTab?.id) {
    throw new Error("No active tab found");
  }

  return activeTab;
};
