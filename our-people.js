const filterToggle = document.querySelector('#our-filter-toggle');
const filterPanel = document.querySelector('#our-filter-panel');
const filterValue = document.querySelector('#our-filter-value');
const filterOptions = [...document.querySelectorAll('#our-filter-panel [role="option"]')];
const doctorCards = [...document.querySelectorAll('.doctor-card')];
const doctorEmpty = document.querySelector('#our-empty');

if (filterToggle && filterPanel && doctorCards.length) {
  let activeSpeciality = 'all';

  const applyFilter = () => {
    let visibleCount = 0;
    for (const card of doctorCards) {
      const matches = activeSpeciality === 'all' || card.dataset.speciality === activeSpeciality;
      card.hidden = !matches;
      if (matches) visibleCount++;
    }
    if (doctorEmpty) doctorEmpty.hidden = visibleCount > 0;
  };

  const setOptionState = () => {
    for (const option of filterOptions) {
      option.setAttribute('aria-selected', String(option.dataset.speciality === activeSpeciality));
    }
  };

  const openPanel = () => {
    filterPanel.hidden = false;
    filterToggle.setAttribute('aria-expanded', 'true');
    const selected = filterOptions.find(option => option.dataset.speciality === activeSpeciality);
    (selected || filterOptions[0])?.focus();
  };

  const closePanel = (returnFocus = false) => {
    filterPanel.hidden = true;
    filterToggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) filterToggle.focus();
  };

  const selectOption = option => {
    activeSpeciality = option.dataset.speciality;
    filterValue.textContent = option.textContent;
    setOptionState();
    applyFilter();
    closePanel(true);
  };

  filterToggle.addEventListener('click', () => {
    if (filterPanel.hidden) openPanel();
    else closePanel(true);
  });

  filterOptions.forEach((option, index) => {
    option.addEventListener('click', () => selectOption(option));
    option.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePanel(true);
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectOption(option);
        return;
      }
      let nextIndex;
      if (event.key === 'ArrowDown') nextIndex = (index + 1) % filterOptions.length;
      if (event.key === 'ArrowUp') nextIndex = (index - 1 + filterOptions.length) % filterOptions.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = filterOptions.length - 1;
      if (nextIndex !== undefined) {
        event.preventDefault();
        filterOptions[nextIndex].focus();
      }
    });
  });

  filterToggle.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' && filterPanel.hidden) {
      event.preventDefault();
      openPanel();
    }
  });

  document.addEventListener('click', event => {
    if (filterPanel.hidden) return;
    if (filterPanel.contains(event.target) || filterToggle.contains(event.target)) return;
    closePanel();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !filterPanel.hidden) {
      event.preventDefault();
      closePanel(true);
    }
  });
}
