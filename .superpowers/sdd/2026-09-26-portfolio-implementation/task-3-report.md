# Task 3 Report: Accessible Editorial Shell

## Delivered

- Added a shared `BaseLayout` with localized document language, title, description, canonical link, skip link, semantic header/main/footer regions, and typed `BaseLayoutProps`.
- Added focused shell components: skip link, site header/footer, language switcher, and primary/mobile navigation.
- Consumed `Locale`, `getLocalizedPath`, `getAlternateLocale`, and `navigationLabels` from `src/lib/i18n.ts`.
- Replaced the temporary root route with an English demonstration page and added equivalent `/fr/` and `/en/` demonstration routes. All content is explicitly placeholder/demo copy; no personal information was introduced.
- Added local design tokens and a mobile-first editorial presentation with expressive display typography, asymmetric desktop composition, readable colors, visible focus, and reduced-motion support.
- Added a progressively enhanced mobile menu. Without JavaScript the navigation remains available. On mobile with JavaScript, the menu opens from a button, moves focus to its first link, and closes with Escape while restoring focus to the trigger.
- Added Playwright coverage for skip-link focus transfer, keyboard-visible navigation, equivalent-language link, and mobile menu behavior.

## TDD Evidence

1. Added `tests/e2e/navigation.spec.ts` before implementing the shell.
2. Ran `npm run test:e2e -- navigation.spec.ts` and observed all four tests fail because the previous temporary page had none of the required navigation elements.
3. Implemented the shell and route demonstrations.
4. Re-ran the targeted browser tests until all four passed.

## Verification

Executed successfully on 2026-09-26:

```text
npm run check
Result (23 files): 0 errors, 0 warnings, 0 hints

npm run test
Test Files  3 passed (3)
Tests  11 passed (11)

npm run test:e2e -- navigation.spec.ts
4 passed

npm run test:e2e
5 passed

npm run build
3 page(s) built
```

## Notes

- Astro client-side script handling and typed layout component props were verified against the Astro documentation through Context7.
- The eventual Task 4 localized pages can directly replace the current demonstration routes while retaining the shared layout contract.

## Follow-up Fix: Localized Shell and Responsive Navigation

### Findings Addressed

- French shell controls are now localized: `Ouvrir le menu`, `Fermer le menu`, and the `Navigation principale` landmark label.
- The French footer now renders `Statique et accessible` rather than the English accessibility message.
- The mobile-navigation script now listens for media-query changes. Entering a desktop viewport clears its `hidden` state, so primary navigation cannot remain unavailable after a mobile-to-desktop resize.
- Removed the provisional canonical link. Production canonical URLs are intentionally deferred to Task 6, which will configure Astro `site` and `base` once the GitHub identity is known.

### Regression Tests and Evidence

Added two browser regressions in `tests/e2e/navigation.spec.ts` before the implementation change:

1. `/fr/` verifies the localized open/close button labels, French navigation landmark label, and French footer text.
2. A page loaded at mobile width then resized to desktop verifies that primary navigation becomes visible.

The first targeted run failed as expected: the French menu label remained English and the navigation stayed hidden after resize. After the fix, the following commands completed successfully on 2026-09-26:

```text
npm run check
Result (23 files): 0 errors, 0 warnings, 0 hints

npm run test
Test Files  3 passed (3)
Tests  11 passed (11)

npm run test:e2e
7 passed

npm run build
3 page(s) built
```
