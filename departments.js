const departmentInput = document.querySelector('#department-query');
const departmentItems = [...document.querySelectorAll('.department-item')];
const departmentLetters = [...document.querySelectorAll('.department-alphabet button')];
const departmentEmpty = document.querySelector('#department-empty');

if (departmentInput && departmentItems.length) {
  let activeLetter = 'all';

  const updateDepartments = () => {
    const query = departmentInput.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    for (const item of departmentItems) {
      const name = item.dataset.name.toLocaleLowerCase();
      const terms = item.dataset.terms.toLocaleLowerCase();
      const matchesQuery = !query || `${name} ${terms}`.includes(query);
      const matchesLetter = activeLetter === 'all' || name.startsWith(activeLetter);
      item.hidden = !matchesQuery || !matchesLetter;
      if (!item.hidden) visibleCount++;
    }

    departmentEmpty.hidden = visibleCount > 0;
  };

  departmentInput.addEventListener('input', () => {
    activeLetter = 'all';
    departmentLetters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.letter === 'all')));
    updateDepartments();
  });
  departmentLetters.forEach(button => {
    button.addEventListener('click', () => {
      const letter = button.dataset.letter;
      activeLetter = letter === activeLetter ? 'all' : letter;
      departmentLetters.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.letter === activeLetter)));
      updateDepartments();
    });
  });

  function revealLinkedDepartment(hash = location.hash) {
    const target = document.getElementById(hash.replace(/^#/, ''));
    if (!target) return;
    const isDepartment = target.classList.contains('department-item');
    const isFeatured = target.classList.contains('featured-department');
    if (!isDepartment && !isFeatured) return;
    departmentInput.value = '';
    activeLetter = 'all';
    departmentLetters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.letter === 'all')));
    updateDepartments();
    target.scrollIntoView({ block: isFeatured ? 'start' : 'center' });
  }
  window.addEventListener('hashchange', () => revealLinkedDepartment());
  window.addEventListener('everwell:navigate-section', event => revealLinkedDepartment(event.detail));
  revealLinkedDepartment();
}
