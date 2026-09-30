document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector<HTMLElement>('[data-carousel-track]');
  const previous = carousel.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const next = carousel.querySelector<HTMLButtonElement>('[data-carousel-next]');
  if (!track || !previous || !next) return;
  previous.hidden = false;
  next.hidden = false;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  let interacted = false;
  const step = () => Math.min(track.clientWidth * 0.8, 340);
  const move = (direction: number) => {
    track.scrollBy({ left: direction * step(), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  };

  previous.addEventListener('click', () => { interacted = true; move(-1); });
  next.addEventListener('click', () => { interacted = true; move(1); });
  track.addEventListener('pointerdown', () => { interacted = true; });
  track.addEventListener('wheel', () => { interacted = true; }, { passive: true });
  track.addEventListener('keydown', () => { interacted = true; });
  carousel.addEventListener('mouseenter', () => { paused = true; });
  carousel.addEventListener('mouseleave', () => { paused = false; });
  carousel.addEventListener('focusin', () => { paused = true; });
  carousel.addEventListener('focusout', (event) => { if (!carousel.contains(event.relatedTarget as Node | null)) paused = false; });

  window.setInterval(() => {
    if (reducedMotion.matches || paused || interacted || document.hidden || track.scrollWidth <= track.clientWidth) return;
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) track.scrollTo({ left: 0, behavior: 'smooth' });
    else move(1);
  }, 4200);
});
