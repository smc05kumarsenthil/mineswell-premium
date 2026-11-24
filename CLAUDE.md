# CLAUDE.md

Marketing site for Mineswell Services, a mining equipment maintenance and field-support company. It's a small React 18 + Vite 5 single-page app. See README.md for user-facing docs.

## Commands
- `npm run dev`: dev server on http://localhost:5173 (launch config in `.claude/launch.json` uses `--port 5173 --strictPort`)
- `npm run build`: builds into `dist/`
- No tests, linter or TypeScript. `typescript` is in deps but unused; everything is `.jsx`.

## Layout (the whole app is 3 source files)
- `src/App.jsx`: **all** content, routing and components (`App`, `Footer`). Data lives at the top as constants: `services`, `serviceDetails` (keyed by slug), `capabilities`, `sections`, `whatsapp`, `email`.
- `src/styles.css`: all styling and theme variables (`[data-theme]` on `<html>`).
- `src/main.jsx`: entry point only.
- `index.html`: meta tags, plus an inline script that sets the theme before first paint.
- `public/`: `hero-drill.jpg`, `logo.svg`, `web.png`. Referenced by absolute paths (`/logo.svg`).

## How it works
- The home page is one scrolling page with sections `home | about | services | projects | contact`. Navigation uses `go(id)` → `scrollIntoView`.
- Sub-pages use hash routes. `routeFromHash()` + a `hashchange` listener drive the `route` state: `null` is home, `'about'` and `'clients'` are the `#/<name>` pages (listed in the `pages` array), and `'service:<slug>'` is `#/services/<slug>`. `servicePage` is derived from `route`. Sub-pages hide the section nav, and nav entries listed in `pages` route to the page instead of scrolling (handled in `go`).
  - The home page has **no** about section. "About" is its own page with company values (`values`) and the Managing Director profile.
  - The profile data is in `md`, `mdHighlights` and `mdCareer`. The facts the user supplied: Sumeet Kumar, close to 20 years in surface drilling equipment maintenance and service; started in technical support; held management roles at Sandvik and Revathi Equipment India Limited (the user confirmed this exact name); led service teams; worked with sales teams on business development. Don't add facts beyond these without asking. `md.photo` is optional (`public/team/`); without it, the profile shows initials.
  - Service slugs: `adhoc`, `maintenance`, `drilling`. To add a service, add the entry to both `services` and `serviceDetails` with the same slug.
  - The clients page renders from the `clients` array. It currently holds **placeholder data**, because the user doesn't have real names yet. `logo` is optional (files go in `public/clients/`); without one, the card shows the client's initials.
- Home service cards (`.serviceGrid` / `.card` in CSS) show only the number, icon and title. Hover or focus reveals the text: a blue fill sweeps up and the content expands using a `grid-template-rows` 0fr→1fr transition. Touch devices (`hover: none`) show the content always. Each `services` entry has an `Icon` (lucide component).
- Scroll reveal: one IntersectionObserver in `App` (it re-runs on `servicePage` change) adds `.in` to any `[data-reveal]` element. The values are:
  - `up`: the element fades and rises.
  - `stagger`: the children animate in turn; `--i` comes from nth-child.
  - `group`: no generic style; it's used by `.serviceGrid`, whose cards have their own `.serviceGrid.in .card` rules.
- Motion rules live in the "Motion" block of `styles.css` (keyframes, hero load-in, hover nudges). Keep it subtle. Shared easing is `--ease` on `:root`. A `prefers-reduced-motion` block disables all motion and forces reveal elements visible, so update it when adding new hidden-until-revealed styles.
- The theme is stored in `localStorage.theme`; `useEffect` syncs `data-theme` and the `theme-color` meta tag. All storage access is wrapped in try/catch, so keep it that way.

## Conventions
- Keep everything in `App.jsx` unless it grows substantially. Don't add a router or CSS framework.
- Accessibility is deliberate: aria-labels, `.sr` text, a skip link and `aria-hidden` icons. Preserve these.
- The code uses 4-space indentation and dense one-line JSX for the home sections.

## Gotchas
- `dist/` is **committed** (not gitignored). Rebuilding replaces the hashed assets in `dist/assets/`.
- Confirmed contact details (from the user):
  - Phone/WhatsApp: `+91 91992 62531`. The constants `phone` (display) and `tel` (link) are used by the contact section and the footer; `whatsapp` and `talkToUs` hold the wa.me links.
  - Address: 1st Floor, Plot No. 379/3698, Partatoli, Jalda, Rourkela, Odisha 769043 (footer). The hero location is "Rourkela, India".
