const themeButton = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');

if (themeButton) {
  const sync = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', dark ? themeButton.dataset.lightLabel ?? 'Activate light mode' : themeButton.dataset.darkLabel ?? 'Activate dark mode');
    const icon = themeButton.querySelector<HTMLElement>('[data-theme-icon]');
    if (icon) icon.textContent = dark ? '☀' : '☾';
  };

  sync();
  themeButton.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try { window.localStorage.setItem('portfolio-theme', next); } catch { /* storage is optional */ }
    sync();
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    try { if (window.localStorage.getItem('portfolio-theme')) return; } catch { /* use system theme */ }
    document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
    document.documentElement.style.colorScheme = document.documentElement.dataset.theme;
    sync();
  });
}
