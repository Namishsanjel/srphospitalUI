const searchForm = document.querySelector('#specialty-search');
const searchInput = document.querySelector('#specialty-query');
const searchItems = [...document.querySelectorAll('#specialty-list li')];
const searchEmpty = document.querySelector('#search-empty');

function filterSpecialties() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  let matches = 0;
  for (const item of searchItems) {
    const searchable = (item.dataset.specialty + ' ' + item.textContent).toLocaleLowerCase();
    const visible = !query || searchable.includes(query);
    item.hidden = !visible;
    if (visible) matches++;
  }
  searchEmpty.hidden = matches !== 0;
}

searchForm?.addEventListener('submit', event => {
  event.preventDefault();
  filterSpecialties();
});
searchInput?.addEventListener('input', filterSpecialties);
