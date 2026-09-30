# Editorial Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual five-section portfolio with a distinctive two-theme visual system and accessible technology carousel.

**Architecture:** Keep the Astro content collections and secondary routes. Create focused Astro sections for the homepage, isolate theme and carousel enhancements in small browser scripts, and use CSS tokens to style all routes consistently.

**Tech Stack:** Astro, TypeScript, CSS, Playwright, Vitest.

**Spec:** `docs/superpowers/specs/2026-09-30-editorial-portfolio-design.md`

## Global Constraints

- Preserve uncommitted changes already in the workspace and existing FR/EN routes.
- Do not invent metrics, project dates, PDF download, screenshots, or personal information.
- Keep static content usable without JS and respect reduced motion and keyboard access.
- Do not commit without an explicit request.

---

### Task 1: Homepage sections and editorial selection

**Files:** Modify `src/pages/[locale]/index.astro`, `src/components/Hero.astro`, `src/components/ProjectCard.astro`, `src/components/MobileNavigation.astro`; create `src/components/AboutSection.astro`, `src/components/SkillsCarousel.astro`, `src/components/FeaturedProjects.astro`, `src/components/ContactSection.astro`; modify `src/lib/projects.ts`; test `tests/e2e/editorial-home.spec.ts`.

**Interfaces:** `src/pages/[locale]/index.astro` selects the three known `featured` project slugs in editorial order from the existing `projects` collection; sections consume localized copy and existing registry data.

- [ ] Write a Playwright test asserting exactly five sections in order and three specified localized project links.
- [ ] Run `npx playwright test tests/e2e/editorial-home.spec.ts` and observe the expected failure.
- [ ] Implement the editorial selection and Astro section markup using existing confirmed content, keeping selection in the homepage because the listing's different sort order remains useful.
- [ ] Re-run the targeted test; verify the ordered sections and links.

### Task 2: Theme and visual identity

**Files:** Modify `src/styles/tokens.css`, `src/styles/global.css`, `src/styles/animations.css`, `src/layouts/BaseLayout.astro`, `src/components/SiteHeader.astro`; create `src/components/ThemeToggle.astro`, `src/scripts/theme.ts`; test `tests/e2e/editorial-home.spec.ts`.

**Interfaces:** `html[data-theme="light" | "dark"]` defines theme tokens; storage key `portfolio-theme` holds explicit selection; button `[data-theme-toggle]` toggles mode.

- [ ] Add tests for system preference, persisted choice after navigation, and accessible theme button.
- [ ] Run targeted tests and observe failures on absent control.
- [ ] Add early theme bootstrap and shared token themes; style hero, sections, cards, navigation, and secondary pages.
- [ ] Re-run tests and check layouts at 375px and 1440px.

### Task 3: Carousel interaction

**Files:** Modify `src/components/SkillsCarousel.astro`, `src/styles/global.css`, `src/styles/animations.css`; create `src/scripts/skills-carousel.ts`; test `tests/e2e/editorial-home.spec.ts`.

**Interfaces:** `[data-carousel-track]` is native horizontally scrollable content; `[data-carousel-prev]` and `[data-carousel-next]` are buttons, progressively enhanced by the script.

- [ ] Add tests for working next/previous buttons and no autoplay with reduced motion.
- [ ] Run targeted tests and observe failures on missing behavior.
- [ ] Implement measured scrolling and slow autoplay with pause on hover/focus/manual interaction/document-hidden.
- [ ] Re-run tests; verify touch overflow and focus handling.

### Task 4: Regression and delivery checks

**Files:** Modify stale expectations in `tests/e2e/navigation.spec.ts` only where new design intentionally changes navigation; add coverage in `tests/e2e/editorial-home.spec.ts`.

- [ ] Run `npm run check`, `npm run test`, `npm run build`, and `npm run test:e2e`.
- [ ] Fix any genuine regression after reproducing it; update only obsolete test assumptions.
- [ ] Run `git diff --check` and inspect changed files for unsupported claims and broken routes.
