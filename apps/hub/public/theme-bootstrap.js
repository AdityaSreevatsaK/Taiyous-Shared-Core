// Runs before the React bundle. Kept external to respect script-src 'self'.
(() => {
  const choices = ['midnight', 'charcoal', 'plum', 'sepia', 'paper', 'ocean'];
  let selected = 'midnight';
  try {
    const candidate = window.localStorage.getItem('taiyou-hub-theme');
    if (choices.includes(candidate)) selected = candidate;
  } catch {
    // Browsers may block storage. The default theme still renders.
  }
  document.documentElement.dataset.theme = selected;
  // Create the icon only AFTER reading the stored theme to avoid a wrong-colour flash.
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/x-icon';
  favicon.href = `/branding/favicons/favicon-${['midnight', 'charcoal', 'plum'].includes(selected) ? 'dark' : 'light'}.ico`;
  document.head.appendChild(favicon);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', ({
    midnight: '#0d1927', charcoal: '#17191e', plum: '#22182e',
    sepia: '#f3e8d5', paper: '#f8f7f3', ocean: '#e6f3f8',
  })[selected]);
})();
