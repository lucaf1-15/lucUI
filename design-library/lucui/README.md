# lucUI Design System

**The Prism Interface System** — editorial typography, reactive glass, accessible components, and semantic CSS tokens.

## Brand Overview

lucUI is a design system built for the luca.ecosystem by Luca. It fuses editorial typography with glass-morphism aesthetics, creating interfaces that feel deep, textured, and alive. The system ships with four distinct themes (Dark, Light, Sunrise, Midnight) and a comprehensive component library.

### Brand Pillars

- **Editorial Typography** — Playfair Display for commanding headlines, Raleway for readable body text, Montserrat for italic nuance
- **Reactive Glass** — Surfaces that respond to pointer position with subtle lighting shifts, creating depth without clutter
- **Accessible First** — WCAG-compliant contrast ratios, focus rings, reduced-motion support, and screen-reader-friendly semantics
- **Multi-Theme** — Dark (default deep navy), Light (crisp azure-white), Sunrise (warm tangerine-cream), Midnight (pure black with neon viridian)

## Color Architecture

### Primitive Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--brand-500` | `#1d2d44` | Navy — primary brand |
| `--accent-500` | `#00bbff` | Azure — interactive accent |
| `--gold-500` | `#ae9d5d` | Gold — secondary brand |
| `--state-success` | `#00ff00` | Viridian — success |
| `--state-warning` | `#ff8c00` | Tangerine — warning |
| `--state-error` | `#ef4444` | Red — error |

### Semantic Tokens (Dark)

| Token | Value |
|-------|-------|
| `--background` | `#081321` |
| `--foreground` | `#f7f4ec` |
| `--accent` | `#00bbff` |
| `--secondary` | `#ae9d5d` |
| `--card` | `#243b55` |
| `--border` | `rgba(174,157,93,0.2)` |
| `--ring` | `rgba(0,187,255,0.48)` |

## Typography

| Style | Font | Weight | Size |
|-------|------|--------|------|
| Display | Playfair Display | 900 (Black) | 2.25rem+ |
| H1 | Playfair Display | 700 (Bold) | 1.875rem |
| H2 | Raleway | 700 (Bold) | 1.5rem |
| Body | Raleway | 500 (Medium) | 1rem |
| Italic | Montserrat | 300 (Light Italic) | 1rem |
| Caption | Raleway | 500 (Medium) | 0.875rem |

## Components

The library includes 40+ components across categories:

- **Actions**: Buttons (primary, secondary, outline, ghost, azure, gold, transparency), dropdowns
- **Surface**: Cards (default, glass, transparency, prism), modals, toasts, tooltips
- **Forms**: Inputs, textareas, selects, checkboxes, radio groups, file upload, datepicker, rangeslider
- **Navigation**: Navbar (with scroll behavior), sidebar, breadcrumbs, pagination, tabs, stepper
- **Data**: Accordion, alerts, badges, chips, avatar, progress, skeleton, timeline, gallery, carousel, search
- **Feedback**: Notifications, toasts, cookie consent, loader

## Glass System

lucUI's signature glass effect uses layered transparency with reactive lighting:

```css
background: var(--glass-bg);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid var(--glass-edge);
```

The `--luc-pointer-x` and `--luc-pointer-y` variables enable reactive spotlight effects that follow the cursor.

## Getting Started

```
npm install lucui-css-framework
```

```html
<link rel="stylesheet" href="lucUI.css">
<script src="lucUI.js" defer></script>
```

Set a theme via `data-theme` attribute on `<html>`:

```html
<html data-theme="dark">    <!-- default -->
<html data-theme="light">
<html data-theme="sunrise">
<html data-theme="midnight">
```

## File Index

| File | Description |
|------|-------------|
| `colors_and_type.css` | Design tokens as CSS custom properties |
| `css.json` | Machine-readable token export |
| `components.css` | Component styling |
| `components/{slug}.json` | Per-component contracts |
| `preview/component-{slug}.html` | Live component previews |
| `ui_kits/website/index.html` | Full website reference |
| `assets/icons/*.svg` | Brand icon set |
