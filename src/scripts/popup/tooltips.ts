import { SettingId } from "../types/types";
import { settingDescriptions } from "../constants/constants";

// =============================================================================
// CONFIGURE TOOLTIPS
// =============================================================================

/*
This function configures the tooltips on page load.

the tooltips are added to the checkboxes, and the labels, to help the user understand the settings.
*/

export const configureTooltips = () => {
  // Get all checkbox containers
  const checkboxContainers =
    document.querySelectorAll<HTMLElement>(".checkbox-item");

  checkboxContainers.forEach((container) => {
    // Get the input and label within this container
    const input = container.querySelector<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    const label = container.querySelector<HTMLLabelElement>("label");

    if (!input || !label) return;

    const description = settingDescriptions[input.id as SettingId];
    if (description) {
      // Add tooltip to container for larger hover area
      container.setAttribute("title", description);
      container.setAttribute("aria-label", description);

      // Add tooltip to input for accessibility
      input.setAttribute("title", description);
      input.setAttribute("aria-description", description);

      // Add tooltip to label for accessibility
      label.setAttribute("title", description);
      label.setAttribute("aria-label", `${label.textContent} - ${description}`);
    }
  });
};
