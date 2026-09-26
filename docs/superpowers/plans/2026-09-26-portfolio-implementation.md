# Portfolio Full-Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fast, creative, bilingual full-stack developer portfolio that deploys to GitHub Pages.

**Architecture:** Astro renders all pages statically from typed localized content collections. Reusable Astro components provide an accessible visual shell and project case studies, with client JavaScript reserved for progressive mobile navigation.

**Tech Stack:** Astro, TypeScript, local CSS, Astro Content Collections, Vitest, Playwright, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-26-portfolio-design.md`

## Global Constraints

- Build a static site only: no API, CMS, authentication, database, tracking, or cookie banner.
- Publish complete French and English routes under `/fr/` and `/en/`.
- Do not invent real professional details; clearly label placeholder content.
- Keep the site useful with JavaScript disabled.
- Respect keyboard access, visible focus, semantic HTML, sufficient contrast, and `prefers-reduced-motion`.
- Deploy to GitHub Pages from pushes to `main`.
- Support the GitHub project URL base `/portfolio/`.

---

## Implementation Tasks

### Task 1: Scaffold Astro and Test Tooling

**Files:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`, `tests/`.

- [ ] Initialize Astro static output with strict TypeScript.
- [ ] Add development, build, check, unit-test, and browser-test commands.
- [ ] Verify `npm run check`, `npm test`, and `npm run build`.

### Task 2: Define Localized Content

**Files:** `src/content.config.ts`, `src/content/`, `src/lib/i18n.ts`, `src/lib/site.ts`.

- [ ] Define typed project, experience, and page collections.
- [ ] Add French and English localized content with matching project slugs.
- [ ] Add unit tests for locale paths and content schemas.

### Task 3: Build the Accessible Shell

**Files:** `src/layouts/`, `src/components/`, `src/styles/`, `src/scripts/mobile-navigation.ts`.

- [ ] Build semantic layout, skip link, localized navigation, and mobile menu.
- [ ] Add focus and reduced-motion styles.
- [ ] Verify keyboard and responsive behavior.

### Task 4: Implement Localized Pages and Projects

**Files:** `src/pages/`, `src/components/ProjectCard.astro`, `src/components/Timeline.astro`, `src/lib/projects.ts`.

- [ ] Add home, profile, journey, CV, contact, project-list, and detail routes.
- [ ] Render content collections and handle missing public project links.
- [ ] Verify static route generation.

### Task 5: Configure GitHub Pages

**Files:** `astro.config.mjs`, `.github/workflows/deploy.yml`, `README.md`.

- [ ] Configure base path and site URL overrides.
- [ ] Build and deploy with the official Astro GitHub Pages workflow.
- [ ] Document local development and Pages activation.
