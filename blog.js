const journalSearch = document.querySelector('#journal-search');
const journalToggle = document.querySelector('#journal-search-toggle');
const journalPanel = document.querySelector('#journal-search-panel');
const journalQuery = document.querySelector('#journal-query');
const journalStories = [...document.querySelectorAll('.journal-story')];
const journalEmpty = document.querySelector('#journal-empty');
const journalStatus = document.querySelector('#journal-search-status');

function filterJournal() {
  const query = journalQuery.value.trim().toLocaleLowerCase();
  let count = 0;
  for (const story of journalStories) {
    const matches = !query || story.querySelector('h2').textContent.toLocaleLowerCase().includes(query);
    story.hidden = !matches;
    if (matches) count++;
  }
  journalEmpty.hidden = count !== 0;
  journalStatus.textContent = query ? count + (count === 1 ? ' story found.' : ' stories found.') : '';
}

function closeJournalSearch() {
  journalQuery.value = '';
  filterJournal();
  journalPanel.hidden = true;
  journalSearch.classList.remove('is-open');
  journalToggle.setAttribute('aria-expanded', 'false');
  journalToggle.setAttribute('aria-label', 'Search the journal');
  journalToggle.querySelector('use').setAttribute('href', '#i-search');
}

journalToggle.addEventListener('click', () => {
  if (!journalPanel.hidden) {
    closeJournalSearch();
    return;
  }
  journalPanel.hidden = false;
  journalSearch.classList.add('is-open');
  journalToggle.setAttribute('aria-expanded', 'true');
  journalToggle.setAttribute('aria-label', 'Close journal search');
  journalToggle.querySelector('use').setAttribute('href', '#i-close');
  journalQuery.focus();
});

journalQuery.addEventListener('input', filterJournal);
journalSearch.addEventListener('submit', event => {
  event.preventDefault();
  filterJournal();
});
journalSearch.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeJournalSearch();
    journalToggle.focus();
  }
});

function revealLinkedStory(hash = location.hash) {
  const target = document.getElementById(hash.replace(/^#/, ''));
  if (!target?.classList.contains('journal-story')) return;
  closeJournalSearch();
  target.scrollIntoView({ block: 'center' });
}
window.addEventListener('hashchange', () => revealLinkedStory());
window.addEventListener('everwell:navigate-section', event => revealLinkedStory(event.detail));
revealLinkedStory();
