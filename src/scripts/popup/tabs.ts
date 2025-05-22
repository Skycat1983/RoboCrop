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

export const configTabs = () => {
  const tabs = document.querySelectorAll<HTMLDivElement>(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", handleTabSwitch);
  });
};
