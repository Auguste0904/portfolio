# Dark Premium Portfolio Redesign - Design Specification

## Goal

Replace the current light premium homepage with a dark, structured portfolio for Auguste ALEXANDRE, Full-stack Developer. The homepage must give recruiters a clear, polished view of his profile, technical domains, practical AI experience, selected professional projects, career path, and contact channels.

The visual reference is the narrative rhythm and categorized technology presentation of marvik.fr. The implementation must not reproduce that site's layout, copy, assets, or decorative style.

## Scope

The French homepage is the primary experience. Its English equivalent must retain the same structure and content meaning. The header navigation links to these localized homepage anchors:

- Presentation
- AI
- Projects
- Journey
- Contact

The existing project-list, project-detail, CV, journey, about, and contact routes remain available. From any secondary route, navigation links return to the matching anchor on the localized homepage.

## Identity And Visual Direction

The site uses a dark premium structured system:

- Deep blue-black page background with slightly raised dark surfaces.
- Off-white text and muted blue-gray supporting copy.
- One restrained warm accent for calls to action, focus, active states, and small visual markers.
- Large but restrained display typography for the hero; body and navigation typography prioritize readability.
- Generous spacing, simple borders, subtle surface depth, and no dense background pattern.
- No neon colors, terminal motifs, stock imagery, remote fonts, excessive motion, or imitations of marvik.fr assets.
- Project cards remain balanced in a two-column desktop grid and one-column mobile stack.

The page must remain readable at 375px and 1440px, have no horizontal overflow, and preserve existing keyboard focus and reduced-motion behavior.

## Homepage Structure

### Hero

The hero displays `Auguste ALEXANDRE`, `Developpeur full-stack` in French and `Full-stack Developer` in English, a concise CV-grounded introduction, and calls to action for projects and contact.

### Presentation

The Presentation section uses three domain panels with targeted local SVG logos and visible labels:

- Front-end: Angular, React, TypeScript, HTML, CSS.
- Back-end: C#, ASP.NET Core, Python, SQL, C, C++.
- DevOps: Docker, Azure, Terraform, Kubernetes.

No proficiency meters, percentages, or unverified claims are displayed.

### AI

The AI section presents development-assisted practice with OpenCode, `oh-my-openagent`, agents, skills, MCP, Superpowers, Context7, and Playwright. It identifies Claude Sonnet, GPT-5.6 Terra, Qwen 3.6, and Qwen 3.8, with proprietary and open-source model awareness. It also references, without confidential implementation claims, the Orange Business Microsoft Teams meeting-minutes application using Orange Live Intelligence.

### Projects

Projects are CV-confirmed, concise, non-confidential studies:

- Teams meeting-minutes application using Orange Live Intelligence.
- LiveControl, access control for the COJO 2024.
- Gargantua / Onega, management applications for Convivio.
- MyThesis, IESEG final-year oral-process tracking.
- An e-commerce platform at Cybille.
- Kubernetes, Bash, and Terraform operational work at OPENCELL.

Each card displays only confirmed technologies, targeted technology logos, and an explicit detail route. Missing public links are represented honestly. Individual project stacks must never be inferred beyond what the CV confirms.

### Journey And Contact

The compact timeline reflects EPITECH, OPENCELL front-end and operations roles, Cybille, Orange Business, and Ninja Squad Angular training.

The contact configuration includes CV-confirmed email, phone, Rennes location, LinkedIn, and GitHub. No other personal data is shown by default.

## Technology Logos

Use targeted local SVG brand marks only. A typed technology registry maps an identifier to a localized label and local asset path. Unknown technologies render text only. Visible text labels remain the accessible source of truth.

## Accessibility And Verification

Primary content and navigation work without JavaScript. The mobile menu restores focus after anchor selection. The design respects `prefers-reduced-motion`. Verify static TypeScript checks, unit tests, production build, GitHub Pages base paths, dark responsive rendering, visible focus, and technology asset paths.
