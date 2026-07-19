# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/donation website for the CASRHA Foundation (Children & Adolescents Sexual and Reproductive Health Awareness), a registered Nigerian non-profit. Static, hand-authored, **zero-dependency** site — no framework, no build step, no package manager, no tests.

## Running

There is nothing to build, compile, lint, or test. Open `index.html` directly, or serve the folder for correct relative paths and `fetch`-free behavior:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

Deploy by copying the directory to any static host as-is.

## Architecture

Three source files plus an `assets/` image tree. Every page is fully self-contained HTML that shares one stylesheet and one script.

- **`css/styles.css`** — the single source of truth for all styling. Organized as one numbered design system (sections 0–17). Section 0 defines **design tokens** as CSS custom properties on `:root` (brand colors from the logo using a 60-30-10 split, gradients, `--font-head`/`--font-body`, radii, shadows, `--section-y`, `--ease`). **All new styling must reuse these tokens** rather than hardcoding values. Components are BEM-flavored (`.card`, `.program`, `.spotlight`, `.bio`, `.stat`, etc.).
- **`js/main.js`** — one IIFE (`"use strict"`) wiring all interactivity via `$`/`$$` helpers. Every feature is **guarded by an existence check** (`if (el) …`) so the same script runs harmlessly on any page regardless of which components are present. Behaviors are opt-in through markup hooks, not per-page code:
  - `.reveal` (+ optional `data-delay="1..3"`) → IntersectionObserver fade-in
  - `[data-count]` → animated counter; `.fund__fill[data-pct]` → progress bar
  - `.gallery__item` (+ `data-full`) → lightbox; `.calc__chip[data-amount]` → impact calculator; `.copy-btn[data-copy]` → clipboard
  - `.nav__toggle`/`.nav__menu`/`.nav__backdrop` → mobile nav; `#year` → footer year
  - All animations respect `prefers-reduced-motion`.
- **`*.html`** — `index.html` (homepage) and `about.html`. Both **duplicate** the shared chrome inline: announcement bar, sticky `.header` nav, footer, and the `.lightbox` element. There is no templating/partials system, so **any change to header, nav, or footer must be applied to every HTML page by hand.**

## Conventions

- **Images**: always `<picture>` with a `.webp` `<source>` + `.jpg`/`.png` `<img>` fallback. Interior/below-fold images use `loading="lazy"`; the hero uses `fetchpriority="high"` and a `<link rel="preload">`. Assets live in `assets/{logo,outreach,team}/`.
- **Cross-page links**: homepage in-page anchors are bare (`#programs`); from other pages target `index.html#programs`. Facilitators live on `about.html#team`.
- **Accessibility is a hard requirement** (site targets WCAG AA): keep the skip link, `aria-*` on the nav toggle/menu, `:focus-visible` outlines, alt text, and reduced-motion handling intact when editing.
- To add a new page, copy the full chrome (announce + header + footer + lightbox) from an existing page, link `css/styles.css` and `js/main.js`, and drive features through the markup hooks above.
