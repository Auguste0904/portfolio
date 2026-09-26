const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileNavigation = document.querySelector<HTMLElement>('[data-mobile-navigation]');
const label = document.querySelector<HTMLElement>('[data-menu-label]');

if (toggle && mobileNavigation && label) {
  const mobileViewport = window.matchMedia('(max-width: 43rem)');
  const openLabel = toggle.dataset.openLabel ?? 'Open menu';
  const closeLabel = toggle.dataset.closeLabel ?? 'Close menu';
  const focusTargetKey = 'mobile-navigation-focus-target';

  const focusTarget = (targetId: string) => {
    const target = document.getElementById(targetId);

    if (!target) return false;

    target.setAttribute('tabindex', '-1');
    target.focus();
    return true;
  };

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
  const pendingFocusTarget = window.sessionStorage.getItem(focusTargetKey);
  if (pendingFocusTarget) {
    window.sessionStorage.removeItem(focusTargetKey);
    focusTarget(pendingFocusTarget);
  }
  mobileViewport.addEventListener('change', (event) => syncViewport(event.matches));
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  mobileNavigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement && mobileViewport.matches) {
      const destination = new URL(event.target.href);
      const targetId = destination.hash.slice(1);
      const isCurrentPage = destination.pathname === window.location.pathname;

      if (isCurrentPage && targetId && focusTarget(targetId)) {
        event.preventDefault();
        window.history.pushState(null, '', destination.hash);
      } else {
        if (targetId) window.sessionStorage.setItem(focusTargetKey, targetId);
        else toggle.focus();
      }

      mobileNavigation.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      label.textContent = openLabel;
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
  });
}
