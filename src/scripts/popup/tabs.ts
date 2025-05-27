import { ScanResponse } from "../content/index";

const handleTabSwitch = (e: Event) => {
  const target = e.target as HTMLElement;
  if (!target.classList.contains("tab")) return;

  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));

  target.classList.add("active");
  const tabId = `${target.getAttribute("data-tab")}-tab`;
  document.getElementById(tabId)?.classList.add("active");
};

export const updateStatisticsTab = (
  countData: ScanResponse["countData"]
): void => {
  console.log("📊 Updating statistics display with countData:", countData);

  // Update individual category counts
  Object.entries(countData.byCategory).forEach(([category, categoryData]) => {
    const statItem = document.querySelector(
      `[data-category="${category}"]`
    ) as HTMLElement;
    const statElement = document.querySelector(
      `[data-category="${category}"] .stat-value`
    ) as HTMLElement;

    if (statElement && statItem) {
      const count = categoryData.count;
      statElement.textContent = count.toString();

      // Update CSS classes based on count
      if (count > 0) {
        statItem.classList.remove("stat-inactive");
        statItem.classList.add("stat-active");
        statElement.classList.remove("stat-value-inactive");
        statElement.classList.add("stat-value-active");
      } else {
        statItem.classList.remove("stat-active");
        statItem.classList.add("stat-inactive");
        statElement.classList.remove("stat-value-active");
        statElement.classList.add("stat-value-inactive");
      }

      console.log(
        `Updated ${category}: ${count} (${count > 0 ? "active" : "inactive"})`
      );
    } else {
      console.warn(`Could not find stat element for category: ${category}`);
    }
  });

  // Update total count
  const totalItem = document.querySelector(
    `[data-category="total"]`
  ) as HTMLElement;
  const totalElement = document.querySelector(
    `[data-category="total"] .stat-value`
  ) as HTMLElement;

  if (totalElement && totalItem) {
    const totalCount = countData.totalCount;
    totalElement.textContent = totalCount.toString();

    // Update CSS classes for total
    if (totalCount > 0) {
      totalItem.classList.remove("stat-inactive");
      totalItem.classList.add("stat-active");
      totalElement.classList.remove("stat-value-inactive");
      totalElement.classList.add("stat-value-active");
    } else {
      totalItem.classList.remove("stat-active");
      totalItem.classList.add("stat-inactive");
      totalElement.classList.remove("stat-value-active");
      totalElement.classList.add("stat-value-inactive");
    }

    console.log(
      `Updated total: ${totalCount} (${totalCount > 0 ? "active" : "inactive"})`
    );
  } else {
    console.warn("Could not find total stat element");
  }
};

export const resetStatisticsTab = (): void => {
  console.log("📊 Resetting statistics display");

  // Reset all stat values to 0 and set inactive state
  const statItems = document.querySelectorAll(
    ".stat-item"
  ) as NodeListOf<HTMLElement>;
  const statElements = document.querySelectorAll(
    ".stat-value"
  ) as NodeListOf<HTMLElement>;

  statItems.forEach((item) => {
    item.classList.remove("stat-active");
    item.classList.add("stat-inactive");
  });

  statElements.forEach((element) => {
    element.textContent = "0";
    element.classList.remove("stat-value-active");
    element.classList.add("stat-value-inactive");
  });
};

export const configTabs = () => {
  // setup for tab buttons
  const tabs = document.querySelectorAll<HTMLDivElement>(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", handleTabSwitch);
  });

  // set initial inactive state for all stat tab items
  const statItems = document.querySelectorAll(
    ".stat-item"
  ) as NodeListOf<HTMLElement>;
  const statElements = document.querySelectorAll(
    ".stat-value"
  ) as NodeListOf<HTMLElement>;

  statItems.forEach((item) => {
    item.classList.add("stat-inactive");
  });

  statElements.forEach((element) => {
    element.classList.add("stat-value-inactive");
  });
};
