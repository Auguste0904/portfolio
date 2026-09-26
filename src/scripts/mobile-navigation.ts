const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileNavigation = document.querySelector<HTMLElement>('[data-mobile-navigation]');
const label = document.querySelector<HTMLElement>('[data-menu-label]');

if (toggle && mobileNavigation && label) {
  const mobileViewport = window.matchMedia('(max-width: 43rem)');

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Close menu' : 'Open menu';
    mobileNavigation.hidden = !open;

    if (open) {
      mobileNavigation.querySelector<HTMLAnchorElement>('a')?.focus();
    } else {
      toggle.focus();
    }
  };

  if (mobileViewport.matches) {
    document.documentElement.classList.add('mobile-menu-enhanced');
    mobileNavigation.hidden = true;

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  }
}
