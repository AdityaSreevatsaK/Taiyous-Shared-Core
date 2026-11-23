// Restore the selected theme before React paints; external for strict CSP.
(() => {
  const choices = ['midnight', 'charcoal', 'plum', 'sepia', 'paper', 'ocean'];
  let selected = 'sepia';
  try {
    const candidate = window.localStorage.getItem('taiyou-hub-theme');
    if (choices.includes(candidate)) selected = candidate;
  } catch {
    // Privacy settings can disable storage.
  }
  document.documentElement.dataset.theme = selected;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', ({
    midnight: '#0e1522', charcoal: '#141316', plum: '#1e1225',
    sepia: '#120c0a', paper: '#f5eadc', ocean: '#dcecf0',
  })[selected]);
})();
