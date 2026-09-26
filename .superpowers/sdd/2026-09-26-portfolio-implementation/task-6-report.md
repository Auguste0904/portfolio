# Task 6 Report: Accessibility, SEO, and Deployment

## Delivered

- Added `Seo.astro` and integrated it into the shared layout. Every route now emits its supplied title and description plus an absolute canonical URL.
- Configured Astro as deployment-aware: `BASE_PATH` defaults to `/portfolio/` and `PUBLIC_SITE_URL` defaults to the non-proprietary placeholder `https://portfolio.example.com`.
- Preserved local development and normal E2E behavior with `BASE_PATH=/` in the normal Playwright web server.
- Added `@axe-core/playwright` and browser coverage for localized metadata, keyboard focus, reduced motion, and axe scans of FR/EN home, case study, journey, and contact routes.
- Fixed the timeline heading hierarchy (`h1` to `h2`, rather than `h1` to `h3`) found by the new axe checks.
- Added a dedicated base-path command that builds with `BASE_PATH=/portfolio/` and verifies the generated output uses `/portfolio/` for localized routes, compiled CSS, and the CV PDF link.
- Added the GitHub Pages workflow for `push` on `main` and manual dispatch, using checkout, configure-pages, withastro/action, artifact upload, and deploy-pages with the required permissions.
- Added `public/images/projects/.gitkeep` and expanded the README with content authoring, placeholder replacement, CV PDF placement, environment configuration, local verification, and GitHub Pages setup.

## TDD Evidence

1. Added the accessibility and deployment-path tests before implementing SEO and deployment configuration.
2. The initial accessibility run failed for absent canonical links and for the journey page's skipped heading level; it also confirmed the pre-existing focus and reduced-motion support, whose assertions were adjusted to their computed values.
3. Implemented the minimal `Seo` component, deployment configuration, and timeline heading correction. The accessibility suite then passed all 12 tests.
4. The first base-path test failed because the original production build emitted root-relative URLs. After enabling Astro's `base` setting, the dedicated production build test passed.
5. Normal E2E deliberately skips the base-path artifact test because it builds with local root hosting; `npm run test:e2e:base-path` is the independent, executable deployment-path contract.

## Verification

Executed successfully on 2026-09-26:

```text
npm run check
Result (44 files): 0 errors, 0 warnings, 0 hints

npm run test
Test Files  4 passed (4)
Tests  17 passed (17)

npm run test:e2e
36 passed, 1 skipped (the separately invoked base-path artifact test)

npm run test:e2e:base-path
Astro build with BASE_PATH=/portfolio/: 21 pages built
1 passed

npm run build
21 pages built
```

## Short Contract

- `PUBLIC_SITE_URL` is the public origin for canonical URLs. Its default is a documented placeholder and must be replaced for the real deployment.
- `BASE_PATH` is `/portfolio/` by default; use `/` for root-hosted local development and tests.
- `npm run test:e2e:base-path` is required to validate GitHub Pages-style output.
- The real approved CV PDF belongs at `public/documents/cv.pdf`; it is intentionally not included in this repository.
- All `[DEMO]` content and contact/link placeholders must be replaced only with owner-approved data.

## Review Follow-up

- Replaced the hand-built Pages artifact flow with the current official `withastro/action@v6` workflow. The action now performs the single artifact upload; `actions/configure-pages` and `actions/upload-pages-artifact` were removed.
- Removed the unsupported `build-command` input, retained the supported `path`, `node-version`, and `package-manager` inputs, and updated checkout/deploy actions to the versions used by the current Astro documentation.
- `PUBLIC_SITE_URL` is now documented exclusively as a repository variable and is passed to the build job through `${{ vars.PUBLIC_SITE_URL }}`. The build job does not rely on the `github-pages` deployment environment.
- Marked the content-free root redirect `noindex`, with a regression assertion for that directive. The redirect keeps its existing canonical link and `/fr/` target.

Verification of this follow-up: `npm run check` (0 errors), `npm run test` (17 passed), `npm run test:e2e` (36 passed, 1 intentionally skipped), and `npm run test:e2e:base-path` (1 passed after a `/portfolio/` build).
