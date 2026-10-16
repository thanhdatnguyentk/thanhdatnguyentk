# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** thanhdatnguyentk-portfolio
**Updated:** 2026-10-16
**Style Reference:** Mild Sugar Design (`https://mildsugardesign.jp/`)
**Owner:** Nguyễn Thành Đạt — AI Engineer in training (UIT - VNU-HCM)

---

## Global Rules

### Color Palette (Warm Cream & Citrus Orange)

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Background (Warm Cream) | `#F7F5F1` | `--color-white` | Primary canvas, drawer surface, editorial background |
| Foreground (Deep Charcoal Brown) | `#3C3728` | `--color-black` | Primary text, headings, icons, focus rings (WCAG AAA on `#F7F5F1`) |
| Brand Accent (Citrus Orange) | `#FEA831` | `--color-orange` | Menu button, expanding menu, pill tags, 120px background marquee, 240px stalker cursor, page transition curtain |
| Surface Card | `#EFECE6` | `--color-surface` | Subtle inset blocks, code blocks, stat containers |
| Border / Hairline | `#DED8CE` | `--color-border` | Subtle dividers in editorial view |

### Typography

- **Display / English Accent (`u-en`):** `Righteous` (Google Fonts, 400)
- **Body / Editorial Text:** `Plus Jakarta Sans` (Google Fonts, 400, 500, 600, 700 — full Vietnamese & English support)
- **Monospace (Code & Metrics):** `JetBrains Mono` (Google Fonts, 400, 600)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Righteous&display=swap');
```

### Core Motion & Interaction Tokens

- **Custom Easing:** `--custom-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Clone Label Hover:** Dual-layer text (`.label-text` + `.label-text--clone`) sliding vertically (`translateY(-100%)` / `translateY(0)`) on hover.
- **Stalker Cursor:** Fixed `240x240px` circle in `var(--color-orange)` following pointer with lerp smoothing on interactive showcase zones.
- **Expanding 3-Dot Menu:** `56x56px` orange circle button morphing into a `240x420px` rounded orange navigation card (`border-radius: 28px`).
- **Curtain Transition:** Full-viewport orange overlay (`scaleY(0)` to `scaleY(1)`) on route transitions.
