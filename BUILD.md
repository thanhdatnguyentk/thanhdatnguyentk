# Build & deploy guide

This document covers everything you need to install, develop, build, and deploy
the portfolio site.

> **TL;DR** — Clone, `npm install`, `npm run dev` → done. To deploy, push to `main`
> and GitHub Actions does the rest.

---

## 📋 Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Node.js | ≥ 20 | `node --version` |
| npm | ≥ 10 | `npm --version` |
| Python 3 | ≥ 3.10 | `python3 --version` _(only required for regenerating design system)_ |

---

## 🚀 Quick start

```bash
git clone https://github.com/thanhdatnguyentk/thanhdatnguyentk.git
cd thanhdatnguyentk
npm install
npm run dev
```

Open http://localhost:4321/thanhdatnguyentk/ in your browser.

> The `/thanhdatnguyentk` path prefix comes from `base` in `astro.config.mjs`.
> Astro injects it so that links work correctly when deployed under a
> GitHub Pages project sub-path.

---

## 🧞 Available scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start dev server with HMR on `http://localhost:4321` |
| `npm run build` | Build static site → `dist/` |
| `npm run preview` | Serve `dist/` locally to test production build |
| `npm run astro -- ...` | Run Astro CLI (e.g. `astro check`) |

---

## 📁 Project structure

```
portfolio/
├── astro.config.mjs          # site URL + base path + Vite config
├── tsconfig.json
├── package.json
├── public/                   # static files copied as-is to /
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/           # Astro components (one per section)
│   │   ├── Nav.astro
│   │   ├── PortfolioLink.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Projects.astro
│   │   ├── GithubStats.astro # Fetches GitHub API at build time
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── data/projects.ts      # Typed project + skill + stat data
│   ├── layouts/Base.astro    # Global head, fonts, MD imports
│   ├── pages/index.astro     # Composes all sections
│   ├── styles/global.css     # Design tokens, reset, ambient effects
│   └── content/              # Misc content (not Astro-rendered)
│       └── PROFILE_README_BACKUP.md
├── design-system/            # ui-ux-pro-max persisted design tokens
│   ├── MASTER.md
│   └── pages/home.md
├── .github/workflows/
│   └── deploy.yml            # GitHub Pages deploy workflow
├── README.md                 # Project overview (shown on GitHub)
└── BUILD.md                  # This file
```

---

## 🎨 Design system

Tokens are persisted under `design-system/` and consumed by `src/styles/global.css`.

To regenerate (requires `ui-ux-pro-max` CLI installed globally):

```bash
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "developer portfolio tech ML AI engineer" \
  --design-system --persist \
  -p "thanhdatnguyentk-portfolio"
```

To regenerate just the home page override:

```bash
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "developer portfolio tech ML AI engineer hero about skills projects contact" \
  --design-system --persist \
  -p "thanhdatnguyentk-portfolio" --page "home"
```

### Design dial tuning

Append any of these flags to fine-tune output:

| Dial | Effect | Example |
|------|--------|---------|
| `--variance 1–10` | Layout variance (1 = minimal, 10 = bold/bento) | `--variance 7` |
| `--motion 1–10` | Motion intensity (1 = subtle, 10 = complex choreography) | `--motion 6` |
| `--density 1–10` | Spacing density (1 = spacious, 10 = dense dashboard) | `--density 8` |

---

## 🧱 Tech stack details

### Astro 4
Static site generator with zero-JS-by-default. Only interactive components ship JS.

### `@material/web` (Material Web Components)
Material Design 3 web components. Imported as individual modules in
`src/layouts/Base.astro` for tree-shaking:

```astro
<script>
  import '@material/web/button/filled-button.js';
  import '@material/web/button/filled-tonal-button.js';
  // ...
</script>
```

Components used: `md-filled-button`, `md-filled-tonal-button`,
`md-outlined-button`, `md-icon-button`, `md-assist-chip`,
`md-elevated-card`, `md-outlined-card`.

> **Note:** Material Web is registered as global custom elements. You can use
> them anywhere in `.astro` files without importing — the registration happens
> once in `Base.astro`.

### Theme tokens
`src/styles/global.css` defines CSS custom properties following the Material 3
naming convention (`--md-sys-color-*`, `--md-sys-color-on-*`). Material Web
reads these automatically to apply MD3 styling.

---

## 🌐 Deployment

### Automatic (GitHub Actions)

The workflow at `.github/workflows/deploy.yml` triggers on every push to `main`:

1. Check out repo
2. Setup Node.js 20 with npm cache
3. `npm ci` (clean install)
4. `npm run build`
5. Upload `dist/` as Pages artifact
6. Deploy to GitHub Pages

### One-time repo setup

1. Go to **Settings → Pages**
2. Under **Build and deployment**, set **Source = GitHub Actions**
3. Push to `main` → workflow runs → site goes live at:
   `https://thanhdatnguyentk.github.io/thanhdatnguyentk/`

### Manual deploy

```bash
npm run build
# then upload dist/ to any static host
```

---

## ✏️ Editing content

### Update projects / skills / stats
Edit `src/data/projects.ts`. Fully typed — IDE autocomplete works.

### Update profile info
- About text: `src/components/About.astro`
- Hero copy: `src/components/Hero.astro`
- Contact details: `src/components/Contact.astro`

### Replace profile README at repo root
If you want the GitHub profile card back (instead of linking to the portfolio),
see `src/content/PROFILE_README_BACKUP.md`. Restoring it disables the deployed
Astro site — choose one or the other.

---

## 🐛 Troubleshooting

### "Material Web component not upgrading"
Check that the component is registered in `Base.astro`:
```astro
<script>
  import '@material/web/path/to/component.js';
</script>
```
Also verify the FOUC prevention rule in `global.css` matches your component tag.

### Build fails on `{{ ... }}` syntax in JSX-like code blocks
Astro interprets `{{` as template expressions. Move the code into the frontmatter:
```astro
---
const code = `<span>...</span>`;
---
<pre><code set:html={code} /></pre>
```

### GitHub Pages shows 404
- Verify `base` in `astro.config.mjs` matches your repo name (`/thanhdatnguyentk`)
- Confirm Pages source = "GitHub Actions"
- Check workflow run succeeded in the Actions tab

### GitHub stats cards show "fetch failed"
The stats fetch in `GithubStats.astro` falls back gracefully. If GitHub API
rate-limits you (60 req/hr unauthenticated), wait an hour or add a token.

---

## 📜 License

MIT. See header in each source file.