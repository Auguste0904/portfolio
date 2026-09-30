# Editorial Portfolio Redesign

## Purpose

Give Auguste ALEXANDRE's bilingual Astro portfolio a distinctive editorial identity inspired by the five-part narrative of mrtchoukdev.com, without reproducing its artwork, copy, or claims. The homepage is one scrollable page with introduction, about, technologies, selected projects and contact sections. Preserve existing localized secondary routes.

## Visual system and layout

Use an original ink / warm copper / mineral-paper palette, bold display type, subtle grid and numbered section markers. Both light and dark surfaces must maintain readable contrast. The header keeps the brand at left and navigation, language link, and explicit theme switch at right; mobile retains accessible menu behavior. All routes share the theme.

## Sections

- Introduction: concise verified biography, project CTA, GitHub and LinkedIn, with an abstract terminal-inspired panel using actual confirmed stack labels. Show a download CV link only when a real PDF exists; until then link to the existing CV page with an honest label.
- About: existing verified biography and role, a link to the journey; omit numerical metrics until the owner supplies approved values.
- Technologies: existing registry and local logos grouped into frontend, backend, infrastructure, and AI/tools; horizontally scrollable with labeled previous/next controls and optional slow autoplay.
- Projects: three editorially selected `featured` entries in existing content (Teams meeting minutes, LiveControl, Gargantua / Onega); no unsupported recency claim. Show confirmed primary technology badges and links to studies. Abstract CSS artwork replaces missing screenshots.
- Contact: existing configured email, phone, Rennes location, GitHub and LinkedIn; direct actions, no form.

## Interaction and accessibility

Theme defaults to operating-system preference, honors saved user selection, and updates `color-scheme`; an early head script prevents a wrong-theme flash. Theme control is a button with a descriptive accessible label. Carousel works without JavaScript as overflow scroll; enhancement adds auto-advance and buttons, pauses on hover/focus, stops on user interaction, pauses for hidden documents, and disables auto-advance for reduced motion. Interactive regions retain keyboard focus, no horizontal page overflow at 375px and no essential content hidden behind JS.

## Verification

Update meaningful existing browser tests that assume stale navigation/routes; add behavioral coverage for theme persistence/system preference, carousel commands and reduced motion, localized featured project selection, responsive layout and accessibility. Run Astro check, unit tests, production build and browser tests. Existing uncommitted CSS edits are user work and remain incorporated.
