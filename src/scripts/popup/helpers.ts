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
