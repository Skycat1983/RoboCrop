import { ReplaceMessage, RobocropSettings, ScanMessage } from "../types/types";
import { ScanResponse } from "../types/types";
import { getActiveBrowserTab } from "./helpers";

// =============================================================================
// REQUEST CHARACTER SCAN
// =============================================================================

/*
This function requests the characters to be scanned.

It sends the settings to the content script to find the characters and await the response.
*/

export const requestCharacterScan = async (
  settings: RobocropSettings
): Promise<ScanResponse> => {
  try {
    const activeTab = await getActiveBrowserTab();

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

// =============================================================================
// REQUEST CHARACTER REPLACE
// =============================================================================

/*
This function requests the characters to be replaced.

once again, it sends the settings .
*/

export const requestCharacterReplace = async (
  settings: RobocropSettings
): Promise<void> => {
  try {
    const activeTab = await getActiveBrowserTab();

    // TODO: Send eliminate message to content script
    await browser.tabs.sendMessage(activeTab.id!, {
      action: "replaceCharacters",
      settings: settings,
    } as ReplaceMessage);
    return;
  } catch (error) {
    console.error("🔴 Popup: Failed to eliminate characters:", error);
    throw error;
  }
};
