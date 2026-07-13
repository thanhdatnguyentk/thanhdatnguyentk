# Nguyễn Thành Đạt — Portfolio

Personal portfolio website. Built with [Astro](https://astro.build/) +
[Material Web Components](https://material-web.dev/), themed using the
[ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
design system.

**Live:** https://thanhdatnguyentk.github.io/thanhdatnguyentk/

## Stack

- **Astro 4** — Static site generator
- **@material/web 2.x** — Material Design 3 web components (no JS framework)
- **ui-ux-pro-max** — Design system (color, typography, spacing tokens)
- **No build-time JS framework** — content-first, ship only what interacts

## Project structure

```
portfolio/
├── astro.config.mjs          # site + base path
├── design-system/            # Persisted design tokens (MASTER + pages/)
├── public/                   # static assets (favicon, robots)
├── src/
│   ├── components/           # Nav, Hero, About, Skills, Projects, Contact, Footer
│   ├── data/projects.ts      # typed project data
│   ├── layouts/Base.astro    # global head, fonts, MD component imports
│   ├── pages/index.astro     # composes all sections
│   └── styles/global.css     # design tokens, reset, utilities
└── .github/workflows/deploy.yml
```

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/thanhdatnguyentk
npm run build    # → dist/
npm run preview  # serve dist/
```

## Deploy to GitHub Pages

This repo is intended to live at `github.com/thanhdatnguyentk/thanhdatnguyentk`
(the user's profile README repo). Workflow `.github/workflows/deploy.yml` runs
on every push to `main`.

### One-time setup

1. Push to a fresh/clean repo (or back up the existing profile README first):
   ```bash
   git init
   git remote add origin git@github.com:thanhdatnguyentk/thanhdatnguyentk.git
   ```

2. In GitHub repo settings → **Pages** → Source = **GitHub Actions**.

3. Push to `main`:
   ```bash
   git add -A
   git commit -m "Initial portfolio site"
   git push -u origin main
   ```

The workflow will build with Astro (`base: '/thanhdatnguyentk'`) and deploy
to https://thanhdatnguyentk.github.io/thanhdatnguyentk/.

### Keeping the GitHub profile README

If you want to keep the classic GitHub profile README at `github.com/thanhdatnguyentk/thanhdatnguyentk`,
move it into `src/content/profile.md` (or any folder Astro doesn't render)
and reference it from a hidden path — Astro builds only `src/pages/`.

## Design system

Color palette, typography, spacing scale, motion tokens, and anti-patterns
are persisted under `design-system/`:
- `MASTER.md` — global source of truth
- `pages/home.md` — page-specific overrides

To regenerate:
```bash
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "developer portfolio tech ML AI engineer" \
  --design-system --persist \
  -p "thanhdatnguyentk-portfolio"
```

## Credits

- Design intelligence: [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- Components: [Material Web Components](https://material-web.dev/)
- Framework: [Astro](https://astro.build/)

© Nguyễn Thành Đạt. MIT.