const serviceInput = document.querySelector('#service-query');
const serviceItems = [...document.querySelectorAll('[data-service]')];
const serviceGroups = [...document.querySelectorAll('[data-service-group]')];
const serviceEmpty = document.querySelector('#service-search-empty');
const serviceForm = document.querySelector('#service-search');

function filterServices() {
  if (!serviceInput || !serviceItems.length) return;
  const query = serviceInput.value.trim().toLocaleLowerCase();
  let visibleCount = 0;

  for (const item of serviceItems) {
    const searchable = `${item.dataset.service} ${item.textContent}`.toLocaleLowerCase();
    item.hidden = Boolean(query) && !searchable.includes(query);
    if (!item.hidden) visibleCount++;
  }

  for (const group of serviceGroups) {
    group.hidden = !group.querySelector('[data-service]:not([hidden])');
  }
  if (serviceEmpty) serviceEmpty.hidden = visibleCount > 0;
}

serviceInput?.addEventListener('input', filterServices);
serviceForm?.addEventListener('submit', event => {
  event.preventDefault();
  filterServices();
});
