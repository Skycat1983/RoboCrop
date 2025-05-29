import { ReplaceMessage, ReplaceResponse, ScanMessage } from "../types/types";
import { ScanResponse } from "../types/types";
import { getActiveBrowserTab } from "./helpers";
import { getSettings } from "./settings";

export const requestCharacterScan = async (): Promise<ScanResponse> => {
  try {
    const activeTab = await getActiveBrowserTab();
    const settings = getSettings();

    const response: ScanResponse = await browser.tabs.sendMessage(
      activeTab.id!,
      {
        action: "findCharacters",
        settings: settings,
      } as ScanMessage
    );

    return response;
  } catch (error) {
    console.error("🔴 Popup: Failed to scan for characters:", error);
    throw error;
  }
};

export const requestCharacterReplace = async (): Promise<void> => {
  try {
    const activeTab = await getActiveBrowserTab();

    // TODO: Send eliminate message to content script
    await browser.tabs.sendMessage(activeTab.id!, {
      action: "replaceCharacters",
    } as ReplaceMessage);
    return;
  } catch (error) {
    console.error("🔴 Popup: Failed to eliminate characters:", error);
    throw error;
  }
};
