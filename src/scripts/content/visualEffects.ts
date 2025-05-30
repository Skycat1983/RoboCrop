// =============================================================================
// ADD CRT EFFECT
// =============================================================================

/*
This function adds the CRT effect to the page.

This is done separately in case we want to add more granular control over which effects are applied/not applied.
*/

export const addCRTEffect = (): void => {
  // Check if effect is already active
  if (document.body.classList.contains("crt-effect")) {
    return;
  }

  // Add the CRT effect class
  document.body.classList.add("crt-effect");
};

// =============================================================================
// REMOVE CRT EFFECT
// =============================================================================

/*
This function removes the CRT effect from the page.
*/

export const removeCRTEffect = (): void => {
  // Remove the CRT effect class
  document.body.classList.remove("crt-effect");
};
