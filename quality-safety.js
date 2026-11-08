const safetyTabs = [...document.querySelectorAll('.safety-tab')];

function selectSafetyTab(selectedTab, moveFocus = false) {
  for (const tab of safetyTabs) {
    const selected = tab === selectedTab;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
  }
  if (moveFocus) selectedTab.focus();
}

safetyTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectSafetyTab(tab));
  tab.addEventListener('keydown', event => {
    let nextIndex;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % safetyTabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + safetyTabs.length) % safetyTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = safetyTabs.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      selectSafetyTab(safetyTabs[nextIndex], true);
    }
  });
});
