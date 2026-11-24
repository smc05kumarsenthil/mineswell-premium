# Mineswell Premium

Marketing website for **Mineswell Services**, a mining equipment maintenance and field-support provider. It's a single-page React app built with Vite. It has light and dark themes and a detail page for each service.

## Tech stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/) with `@vitejs/plugin-react`
- [lucide-react](https://lucide.dev/) for icons
- Plain CSS (`src/styles.css`), with no CSS framework

## Getting started

Requirements: Node.js 18 or later, and npm.

```bash
npm install
npm run dev        # start dev server at http://localhost:5173
```

| Script            | Purpose                                         |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot reload       |
| `npm run build`   | Build the production bundle into `dist/`        |
| `npm run preview` | Serve the built `dist/` folder locally to check it |

A `dev` launch configuration (port 5173, strict port) is also defined in `.claude/launch.json`.

## Project structure

```
├── index.html          # HTML shell, meta tags, pre-paint theme script
├── public/             # Static assets served from the site root
│   ├── hero-drill.jpg  # Hero and service-card image
│   ├── logo.svg        # Logo and favicon
│   └── web.png         # Decorative fixed bottom-left image
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # All page content, routing and components
│   └── styles.css      # Global styles and theme variables
├── dist/               # Production build output (committed)
└── vite.config.js
```

## How it works

### Page sections
The home page is one scrolling page with these sections: `home`, `about`, `services`, `projects` and `contact`. The nav buttons scroll smoothly to each section by its `id`.

### Service detail pages
Each service has its own view, reached through a hash route: `#/services/<slug>`. The available slugs are:

- `#/services/adhoc`
- `#/services/maintenance`
- `#/services/drilling`

The clients page is at `#/clients`.

Hash routing means the browser Back button and shared links work without server-side routing configuration. Any static host can serve the site.

### Theming
- The theme is dark or light. It's stored in `localStorage.theme` and set on `<html data-theme="…">`.
- An inline script in `index.html` applies the saved or system-preferred theme before first paint. This avoids a flash of the wrong theme.
- The `theme-color` meta tag is updated whenever the user switches theme.

## Editing content

All content is in [src/App.jsx](src/App.jsx):

| What                            | Where in `App.jsx`              |
| ------------------------------- | ------------------------------- |
| Service cards on the home page  | `services` array                |
| Service detail page text        | `serviceDetails` object (keyed by slug) |
| "Field capability" checklist    | `capabilities` array            |
| Clients page (`#/clients`)      | `clients` array (name, sector, location, optional `logo` in `public/clients/`) |
| Nav sections                    | `sections` array                |
| WhatsApp "Request support" link | `whatsapp` constant             |
| WhatsApp "Talk to us" link      | `talkToUs` constant             |
| Contact email                   | `email` constant                |
| Phone number and address        | `Footer` component              |

**To add a service:** add an entry to `services` with a new `slug`. Then add a matching key to `serviceDetails`. The route `#/services/<slug>` works without further changes.

Replace images in `public/` to change them. Files in `public/` are referenced by absolute paths such as `/hero-drill.jpg`.

## Building and deploying

```bash
npm run build
```

The output in `dist/` is fully static. You can deploy it to any static host, for example Azure Static Web Apps, Netlify, GitHub Pages or an S3 bucket. The site uses hash routing, so you don't need SPA fallback or rewrite rules.

> **Note:** `dist/` is currently committed to the repository. After a rebuild, old hashed assets in `dist/assets/` are replaced. Commit the new build, or add `dist` to `.gitignore` if your deployments build from source.
