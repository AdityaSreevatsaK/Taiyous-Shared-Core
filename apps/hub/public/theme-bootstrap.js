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
    midnight: '#121a2a', charcoal: '#1d1a22', plum: '#271a32',
    sepia: '#fbf0e4', paper: '#faf9f4', ocean: '#e8f5f7',
  })[selected]);
})();
