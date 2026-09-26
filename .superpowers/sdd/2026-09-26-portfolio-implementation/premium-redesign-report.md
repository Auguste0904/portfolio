# Premium Portfolio Redesign Report

## Scope Delivered

- Reworked the French and English homepages into a single-page CV experience with Profile, Projects, Journey, Skills, CV, and Contact sections.
- Replaced primary route navigation with localized in-page anchors while preserving the language switcher and keeping existing route and case-study links available from content.
- Added hero calls to action for projects and contact.
- Displayed four localized case studies and retained their detail links.
- Added a compact journey timeline, technology groups derived from localized project content, a PDF/CV callout, and direct contact links.
- Reworked the visual system to warm white, blue-black, warm gray, and restrained terracotta accents with readable serif display typography.
- Kept semantic landmarks, skip-link behavior, focus styles, and no-JavaScript content accessibility. The enhancement script closes the mobile menu after an anchor is selected.

## Tests And Verification

- TDD: added the navigation anchor assertion before implementation and observed the expected failure because Profile did not yet exist. Added the mobile anchor-close regression test before implementing the enhancement.
- `npm run check`: passed with 0 errors, 0 warnings, 0 hints.
- `npm run build`: passed using `BASE_PATH=/portfolio/`; 21 static pages generated.
- `npm run test`: passed, 17 tests across 4 files.
- `npm run test:e2e -- tests/e2e/navigation.spec.ts tests/e2e/projects.spec.ts`: passed, 11 tests.
- Playwright preview inspection: `/portfolio/fr/` checked at 375x800 and 1440x1000; `/portfolio/fr/projects/atlas/` also checked.
- No horizontal overflow: viewport and document widths matched at both viewport sizes.
- Keyboard focus: the Profile anchor received a visible solid 3.2px terracotta outline.
- Mobile navigation: opened with its button and exposes all six localized anchors; existing E2E coverage confirms it closes after selecting an in-page target.

## Notes

- Existing portfolio content is explicitly demonstration content, so no personal details were added. Skills only list technologies available in the localized project entries.
- The existing `docs/` directory was already untracked and was intentionally left unchanged.

## Follow-Up Polish

- Navigation anchors now always target the localized homepage and retain the configured Astro base path, including from case-study routes.
- The mobile navigation closes after an anchor selection and moves focus to the target section. For cross-route anchors, the target identifier is retained for focus restoration after the destination page loads. Without JavaScript, the ordinary anchor navigation remains available.
- Removed the nonexistent PDF download calls to action. The homepage now promotes the CV detail page and both locales state that a PDF will be available later.
- Four homepage project cards use a balanced two-column desktop grid. Case-study headings use the same calmer display scale as the rest of the site, without forced uppercase styling.
- Corrected French labels touched by this change, including `Étude de cas`, `Problème`, `rôle`, and accented homepage copy.

## Follow-Up Verification

- `npm run check`: passed with 0 errors, 0 warnings, and 0 hints.
- `npm test`: passed, 17 tests across 4 files.
- `npm run build`: passed; 21 static pages generated.
- `npm run test:e2e:base-path`: passed, including assertions for base-prefixed localized section links and removal of the PDF URL.
- Browser inspection at 375px: no horizontal overflow; no PDF links rendered; selecting a mobile section link closes the menu and focuses the target section.
- Browser inspection at 1440px: no horizontal overflow; the four project cards render as two equal columns; case-study headings render without uppercase transformation.
- The regular Playwright navigation suite could not be launched through its configured web server because an existing Astro preview process already owned port 4321. Equivalent checks were performed against an isolated preview on port 4322, including a cross-route French mobile anchor navigation and focus restoration.
