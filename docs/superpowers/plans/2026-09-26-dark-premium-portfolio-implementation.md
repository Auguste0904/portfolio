# Dark Premium Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the portfolio into a dark premium bilingual showcase of Auguste ALEXANDRE's full-stack, AI, and professional project experience.

**Architecture:** Astro content collections remain the source of truth. A typed technology registry supplies localized labels and local SVG marks to reusable skill and project components. CV-confirmed content replaces demonstration entries, while the homepage renders dark-theme anchor sections and project detail pages consume the same project frontmatter.

**Tech Stack:** Astro, TypeScript, Astro Content Collections, local SVG assets, CSS, Vitest, Playwright, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-26-dark-premium-portfolio-design.md`

## Global Constraints

- Use a deep blue-black background, raised dark surfaces, off-white text, muted blue-gray supporting copy, and one restrained warm accent.
- Do not copy layout, copy, images, or assets from marvik.fr.
- Do not introduce stock imagery, remote fonts, runtime third-party logo fetches, neon colors, terminal motifs, dense patterns, or excessive motion.
- Use only CV-confirmed competencies, experience, professional project descriptions, contact details, and social profiles.
- Do not invent project stacks, outcomes, AI architecture, product URLs, or confidential employer details.
- Every visible technology logo has a visible text label; unregistered identifiers render text only.
- Keep primary content and navigation usable without JavaScript and preserve focus behavior and `prefers-reduced-motion`.
- Build paths, internal links, logos, and public assets must work with `BASE_PATH=/portfolio/`.

---

### Task 1: Create Technology Registry and Assets

- [ ] Add typed technology identifiers, labels, base-path-aware local SVG paths, and text fallback.
- [ ] Add unit tests for base paths and unknown technology fallback.
- [ ] Add local SVG assets for confirmed technologies.

### Task 2: Replace Demonstration Content

- [ ] Add Auguste ALEXANDRE's confirmed profile and contact configuration.
- [ ] Replace demo experiences, page copy, and project entries with CV-confirmed French and English content.
- [ ] Preserve confidentiality and unit-test project schema consistency.

### Task 3: Render Skills, AI, and Projects

- [ ] Render technology groups for front-end, back-end, and DevOps.
- [ ] Add development-assisted AI, model-familiarity, and Orange Live Intelligence sections.
- [ ] Render targeted marks on project cards and detail pages.

### Task 4: Build Dark Premium Homepage

- [ ] Add hero identity and localized anchor navigation.
- [ ] Implement presentation, AI, projects, journey, and contact homepage sections.
- [ ] Apply responsive dark premium tokens and styling.

### Task 5: Verify Delivery

- [ ] Run static checks, unit tests, production build, and GitHub Pages base-path build.
- [ ] Inspect dark responsive rendering, focus states, and local technology asset paths.
