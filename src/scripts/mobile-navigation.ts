const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileNavigation = document.querySelector<HTMLElement>('[data-mobile-navigation]');
const label = document.querySelector<HTMLElement>('[data-menu-label]');

if (toggle && mobileNavigation && label) {
  const mobileViewport = window.matchMedia('(max-width: 43rem)');
  const openLabel = toggle.dataset.openLabel ?? 'Open menu';
  const closeLabel = toggle.dataset.closeLabel ?? 'Close menu';

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? closeLabel : openLabel;
    mobileNavigation.hidden = !open;

    if (open) {
      mobileNavigation.querySelector<HTMLAnchorElement>('a')?.focus();
    } else {
      toggle.focus();
    }
  };

  const syncViewport = (matches: boolean) => {
    document.documentElement.classList.toggle('mobile-menu-enhanced', matches);

    if (matches) {
      mobileNavigation.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      label.textContent = openLabel;
    } else {
      mobileNavigation.hidden = false;
      toggle.setAttribute('aria-expanded', 'false');
      label.textContent = openLabel;
    }
  };

  syncViewport(mobileViewport.matches);
  mobileViewport.addEventListener('change', (event) => syncViewport(event.matches));
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
  });
}
