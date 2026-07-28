# lucUI CSS Framework — Complete Knowledge Base for lucAI

## Overview

lucUI is a premium glass morphism CSS framework developed by luca.ecosystem in collaboration between luca.designss and luca.softss. It provides a complete design system with transparency components, brand colors, and premium UI elements.

**Key Characteristics:**
- Modular architecture with separate folders for core, components, and utilities
- Plain CSS with CSS variables (no Sass, no build process required)
- Glass morphism design style with backdrop-filter and transparency effects
- Brand-aligned colors and fonts from luca.ecosystem
- Single-file bundles generated from source modules via `npm run build`
- JavaScript interactivity layer (lucUI.js) for modals, toasts, themes, and more
- 4 built-in themes: dark (default), light, midnight, sunrise
- MIT License for open-source use
- Available via npm, CDN, and GitHub

---

## Brand Identity

### Brand Colors

| Color Name | Hex Code | Usage | Ecosystem Association |
|------------|----------|-------|----------------------|
| Luca Navy | `#1d2d44` | Backgrounds, primary base | luca.ecosystem |
| Studio Gold | `#ae9d5d` | Secondary accents, primary buttons | luca.ecosystem |
| Designer's Azure | `#00bbff` | luca.designss accent | luca.designss |
| Luca Tangerine | `#ff8c00` | luca.softss accent | luca.softss |
| Bold Viridian | `#00ff00` | lucAI & luca.toolss accent | lucAI, luca.toolss |

### Brand Fonts

- **Playfair Display** (Black, 900 weight) — Display headings
- **Raleway** (Medium, 500 weight) — Body text
- **Montserrat** (Light Italic, 300 italic) — Italic accents

### Naming Conventions

- Framework name: `lucUI` (uppercase UI)
- Folder names: `lucCORE`, `lucCOMPONENTS`, `lucUTILITIES` (uppercase prefixes)
- CSS class prefix: `luc-` (lowercase with hyphen)
- File names: `luc-[component].css` (lowercase with hyphen)
- JavaScript library: `lucUI` (global namespace)

---

## Framework Structure

```
lucUI CSS Framework/
├── lucCORE/                       # Core foundation files
│   ├── luc-variables.css          # Design tokens (colors, fonts, spacing, shadows)
│   ├── luc-reset.css             # CSS reset
│   ├── luc-typography.css        # Typography system
│   ├── luc-base.css              # Base styles (container, grid, flex)
│   └── luc-themes.css            # Theme system (light, dark, midnight, sunrise)
├── lucCOMPONENTS/                 # 40+ UI components
│   ├── luc-buttons.css           # Button components
│   ├── luc-cards.css             # Card components
│   ├── luc-navbar.css            # Navbar component
│   ├── luc-forms.css             # Form components
│   ├── luc-modals.css            # Modal components
│   ├── luc-alerts.css            # Alert components
│   ├── luc-badges.css            # Badge components
│   ├── luc-tooltips.css          # CSS-only tooltips
│   ├── luc-dropdowns.css         # Glass floating menus
│   ├── luc-tabs.css              # Tabbed interfaces
│   ├── luc-toasts.css            # Toast/snackbar notifications
│   ├── luc-breadcrumbs.css       # Breadcrumb navigation
│   ├── luc-progress.css          # Progress bars
│   ├── luc-skeleton.css          # Skeleton loaders
│   ├── luc-accordion.css         # CSS-only accordion
│   ├── luc-carousel.css          # Image/content carousel
│   ├── luc-pagination.css        # Page navigation
│   ├── luc-datatables.css        # Sortable data tables
│   ├── luc-avatar.css            # Profile images
│   ├── luc-chips.css             # Tag/chip filters
│   ├── luc-divider.css           # Visual dividers
│   ├── luc-loader.css            # Loading indicators
│   ├── luc-gallery.css           # Image grid gallery
│   ├── luc-testimonials.css      # Quote/testimonial cards
│   ├── luc-pricing.css           # Pricing tables
│   ├── luc-features.css          # Feature grids
│   ├── luc-hero.css              # Hero sections
│   ├── luc-signature.css         # Prism surface system
│   ├── luc-footer.css            # Site footer
│   ├── luc-sidebar.css           # Collapsible sidebar
│   ├── luc-search.css            # Search input
│   ├── luc-datepicker.css        # Calendar date picker
│   ├── luc-fileupload.css        # File upload zone
│   ├── luc-rangeslider.css       # Range slider
│   ├── luc-toggle.css            # Toggle switch
│   ├── luc-stepper.css           # Step indicator
│   ├── luc-timeline.css          # Event timeline
│   ├── luc-notifications.css     # Notification panel
│   ├── luc-usercard.css          # Profile card
│   └── luc-cookieconsent.css     # GDPR cookie banner
├── lucUTILITIES/                  # Utility classes
│   ├── luc-glass.css             # Glass morphism utilities
│   ├── luc-animations.css        # Animation utilities
│   ├── luc-spacing.css           # Spacing utilities
│   ├── luc-layout.css            # Layout utilities
│   └── luc-utilities.css         # General utilities (dividers, truncation, etc.)
├── lucUI.source.css              # Source manifest (entry point for build)
├── lucUI.css                     # Bundled CSS (generated by build)
├── lucUI.min.css                 # Minified bundle (generated by build)
├── lucUI.js                      # JavaScript interactivity layer
├── scripts/build.js              # Build script
├── package.json                  # npm package configuration
├── README.md                     # User documentation
├── CONTRIBUTING.md               # Contribution guidelines
├── CHANGELOG.md                  # Version history
├── SETUP.md                      # Setup guide
├── COMPONENTS.md                 # Component reference
├── MIGRATION.md                  # Migration guide
├── tutorial.html                 # Interactive showcase
├── starters/
│   └── studio-workspace.html     # Starter template
├── LICENSE                       # MIT License
└── lucUI logo.svg                # Brand logo
```

---

## CSS Variables (Design Tokens)

### Brand Colors (Primitives)

```css
:root {
    --luca-navy: #1d2d44;
    --studio-gold: #ae9d5d;
    --designer-azure: #00bbff;
    --luca-tangerine: #ff8c00;
    --bold-viridian: #00ff00;

    /* RGB channels for rgba() use */
    --luca-navy-rgb: 29, 45, 68;
    --studio-gold-rgb: 174, 157, 93;
    --designer-azure-rgb: 0, 187, 255;
    --luca-tangerine-rgb: 255, 140, 0;
    --bold-viridian-rgb: 0, 255, 0;
}
```

### Semantic Tokens (v2.0 — Theme-Aware)

```css
:root {
    --luc-canvas: #08111f;
    --luc-canvas-deep: #040a12;
    --luc-surface: rgba(10, 18, 32, 0.80);
    --luc-surface-strong: rgba(8, 12, 20, 0.96);
    --luc-ink: #f8fafc;
    --luc-ink-muted: rgba(248, 250, 252, 0.76);
    --luc-accent: var(--studio-gold);
    --luc-accent-rgb: var(--studio-gold-rgb);
    --luc-focus-ring: rgba(var(--designer-azure-rgb), 0.60);
}
```

### Text Colors

```css
:root {
    --text-light: #e0e6ed;
    --text-muted: rgba(224, 230, 237, 0.65);
}
```

### Glass / Surface

```css
:root {
    --glass-bg: rgba(36, 59, 85, 0.45);
    --glass-hover: rgba(36, 59, 85, 0.55);
    --glass-nav: rgba(8, 14, 24, 0.92);
    --glass-modal: rgba(8, 18, 32, 0.85);
    --glass-edge: rgba(255, 255, 255, 0.08);
    --glass-shine: rgba(255, 255, 255, 0.08);
    --card-bg: rgba(10, 18, 32, 0.80);
    --border-color: rgba(255, 255, 255, 0.06);
}
```

### Typography Variables

```css
:root {
    --font-display: 'Playfair Display', serif;
    --font-body: 'Raleway', sans-serif;
    --font-italic: 'Montserrat', sans-serif;

    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;
    --text-4xl: 2.25rem;
    --text-5xl: 3rem;
}
```

### Spacing Variables

```css
:root {
    --space-1: 0.25rem;  --space-2: 0.5rem;
    --space-3: 0.75rem;  --space-4: 1rem;
    --space-5: 1.25rem;  --space-6: 1.5rem;
    --space-8: 2rem;     --space-10: 2.5rem;
    --space-12: 3rem;    --space-16: 4rem;
    --section-padding: 4rem;
}
```

### Layout Variables

```css
:root {
    --container-max: 1200px;
    --container-narrow: 800px;
    --container-wide: 1600px;
    --gap-base: var(--space-6);
}
```

### Border Radius Variables

```css
:root {
    --radius-sm: 8px;   --radius-md: 16px;
    --radius-lg: 24px;  --radius-xl: 32px;
    --radius-full: 9999px;
}
```

### Shadow Variables

```css
:root {
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.20);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.30);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.40);
    --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.50);
}
```

### Glass Effect Variables

```css
:root {
    --glass-shine: rgba(255, 255, 255, 0.08);
    --glass-blur: 24px;
    --glass-saturate: 180%;
}
```

### Animation Variables

```css
:root {
    --transition-base: 0.4s;
    --transition-slow: 0.6s;
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-snappy: cubic-bezier(0.25, 1, 0.5, 1);
    --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Z-Index Variables

```css
:root {
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
}
```

---

## Theme System (luc-themes.css)

lucUI v2.0 ships with 4 built-in themes:

| Theme | `data-theme` | Scheme | Accent | Best For |
|-------|-------------|--------|--------|----------|
| Dark (default) | *(none)* | dark | Studio Gold | Default dark mode |
| Light | `light` | light | Designer's Azure | Content-heavy sites |
| Midnight | `midnight` | dark | Bold Viridian | Immersive dark UIs |
| Sunrise | `sunrise` | light | Luca Tangerine | Warm-toned sites |

Apply themes via `data-theme` attribute:
```html
<html data-theme="light">
```

**Light mode** also responds automatically to `prefers-color-scheme: light` when no `data-theme` is set.

Each theme remaps semantic tokens (`--luc-canvas`, `--luc-surface`, `--luc-ink`, etc.) and overrides component appearances (navbar, buttons, inputs, modals, dropdowns, toasts, cards, tooltips).

---

## Core Files

### luc-variables.css

Defines all CSS variables for colors, fonts, spacing, shadows, glass effects, animations, layout, and z-index. Foundation of the entire framework. v2.0 added semantic tokens and RGB channel variables.

### luc-reset.css

Modern CSS reset including box-sizing, margin/padding reset, font smoothing, image/form element styling, focus-visible outline removal, and mobile tap highlight removal.

### luc-typography.css

Typography system with Google Fonts imports, base body styles, headings (h1-h6), paragraph styles, italic accents, and text utilities (sizes, colors, alignment, transform, font weight).

### luc-base.css

Base styles including body background gradient, container/section spacing, responsive grid system, flexbox utilities, and responsive breakpoints.

### luc-themes.css

Theme system with light, dark, midnight, and sunrise variants. Each theme provides semantic token overrides and component-specific style adjustments. See Theme System section above.

---

## Components (40+)

### Buttons (luc-buttons.css)

**Base:** `.luc-btn`

**Variants:** `.luc-btn-transparency`, `.luc-btn-primary`, `.luc-btn-azure`, `.luc-btn-tangerine`, `.luc-btn-viridian`

**Sizes:** `.luc-btn-sm`, `.luc-btn-lg`

**States:** hover (transform, shadow, brightness), active (scale, filter), focus-visible (outline), disabled (opacity, cursor)

### Cards (luc-cards.css)

**Base:** `.luc-card`

**Variants:** `.luc-card-transparency` (enhanced glass with glow), `.luc-card-sm`, `.luc-card-lg`

**Structure:** `luc-card-header` > `luc-card-title` / `luc-card-subtitle`, `luc-card-body`, `luc-card-footer`

**Glow Spot:** `.luc-glow-spot` with `.center` placement

### Navbar (luc-navbar.css)

**Base:** `.luc-navbar`

**Structure:** `.luc-navbar-container` > `.luc-navbar-brand` + `.luc-navbar-links` > `.luc-navbar-link`

**Features:** fixed position, backdrop blur, glass styling, 56px height (48px scrolled), pill-shaped links, hover gold accent, mobile toggle with hamburger animation (900px breakpoint), scroll state (`.scrolled`), `.active` / `[aria-current="page"]` state

### Forms (luc-forms.css)

**Components:** `.luc-form-group`, `.luc-label`, `.luc-input`, `.luc-textarea`, `.luc-select`, `.luc-checkbox`, `.luc-radio`

**States:** focus (border, shadow), disabled, `.error`, `.success`

### Modals (luc-modals.css)

**Structure:** `.luc-modal-backdrop.active` > `.luc-modal` > `.luc-modal-header` (title + close), `.luc-modal-body`, `.luc-modal-footer`

**Features:** backdrop blur, glass styling, specular edge, close button rotation, sizes (`.luc-modal-sm`, `.luc-modal-lg`, `.luc-modal-xl`), animations (`.fade`, `.slide`)

### Alerts (luc-alerts.css)

**Variants:** `.luc-alert-info`, `.luc-alert-success`, `.luc-alert-warning`, `.luc-alert-error`, `.luc-alert-gold`

**Structure:** `.luc-alert-icon` + `.luc-alert-content` (`.luc-alert-title` + `.luc-alert-message`)

**Features:** dismissible (`.luc-alert-dismissible`), sizes (`.luc-alert-sm`, `.luc-alert-lg`)

### Badges (luc-badges.css)

**Color variants:** `.luc-badge-gold`, `.luc-badge-azure`, `.luc-badge-tangerine`, `.luc-badge-viridian`, `.luc-badge-navy`

**Style variants:** `.luc-badge-outline`, `.luc-badge-solid`, `.luc-badge-dot`, `.luc-badge-pill`, `.luc-badge-square`

### Tooltips (luc-tooltips.css)

CSS-only tooltips with data-luc-tooltip attribute. Positions: top, bottom, left, right. Color variants: gold, azure. Smooth fade+translate animation.

### Dropdowns (luc-dropdowns.css)

Glass floating menus with `.luc-dropdown-toggle` + `.luc-dropdown-menu`. Features: dividers, headers, danger items, `.luc-dropdown-menu-right` alignment.

### Tabs (luc-tabs.css)

3 style variants: default border, pill, underline. Accessible `aria-selected` support. Fade-in panel animation.

### Toasts (luc-toasts.css)

Temporary notifications with 6 position options, progress bar, all brand color variants, slide-in/out animations.

### Breadcrumbs (luc-breadcrumbs.css)

Variants: default, glass, chevron, dot. Responsive collapse on small screens.

### Progress Bars (luc-progress.css)

Animated shimmer fill, all brand colors, variants: striped, animated striped, indeterminate, labeled.

### Skeleton Loaders (luc-skeleton.css)

Shimmer and pulse variants. Pre-built shapes: text, heading, avatar, image, button, badge, card, paragraph, row.

### Accordion (luc-accordion.css)

CSS-only using `<details>`/`<summary>`. Flush variant. Animated open/close chevron.

### Additional v2.0 Components

| Component | File | Description |
|-----------|------|-------------|
| Carousel | luc-carousel.css | Slide-based image/content carousel |
| Pagination | luc-pagination.css | Page navigation with glass styling |
| Data Tables | luc-datatables.css | Sortable, responsive table component |
| Avatar | luc-avatar.css | Profile images with size and status variants |
| Chips | luc-chips.css | Compact tag/filter chips |
| Divider | luc-divider.css | Horizontal/vertical dividers with label support |
| Loader | luc-loader.css | Spinner and loading state indicators |
| Gallery | luc-gallery.css | Image grid with hover overlays |
| Testimonials | luc-testimonials.css | Quote cards with avatar and rating |
| Pricing | luc-pricing.css | Pricing table cards with featured tier |
| Features | luc-features.css | Feature grid with icons |
| Hero | luc-hero.css | Full-width hero sections |
| Signature | luc-signature.css | Prism surface system (reactive pointer lighting) |
| Footer | luc-footer.css | Multi-column site footer |
| Sidebar | luc-sidebar.css | Collapsible navigation sidebar |
| Search | luc-search.css | Search input with results dropdown |
| Datepicker | luc-datepicker.css | Calendar date picker |
| File Upload | luc-fileupload.css | Drag-and-drop file upload zone |
| Range Slider | luc-rangeslider.css | Styled range input |
| Toggle | luc-toggle.css | Switch/toggle control |
| Stepper | luc-stepper.css | Multi-step progress indicator |
| Timeline | luc-timeline.css | Vertical event timeline |
| Notifications | luc-notifications.css | Notification bell and panel |
| User Card | luc-usercard.css | Profile summary card |
| Cookie Consent | luc-cookieconsent.css | GDPR cookie banner |

---

## JavaScript Layer (lucUI.js)

Global `lucUI` object provides:

- **Theme switching** — `lucUI.initTheme()` reads `data-theme` or `prefers-color-scheme`
- **Modal manager** — focus trap, Escape/backdrop dismissal, body-scroll lock, ARIA trigger state, race-safe closing
- **Toast system** — `lucUI.showToast()` with queue, progress bar, position options
- **Scroll reveal** — IntersectionObserver-based reveal animations
- **Accordion** — CSS-only via `<details>/<summary>`, optional JS enhancement
- **Tabs** — keyboard navigation, ARIA tabpanel relationships, orientation support
- **Dropdowns** — click-away close, keyboard navigation, state management
- **Command palette** — keyboard navigation, focus trap, filtering, clipboard fallback
- **Copy to clipboard** — `lucUI.copyToClipboard()` with fallback
- **Cookie consent** — banner management with localStorage persistence

**Initialization:**
```html
<script src="lucUI.js"></script>
<script>document.addEventListener('DOMContentLoaded', () => lucUI.init());</script>
```

---

## Installation Methods

### CDN Installation (Recommended for quick start)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucui-css-framework@2.0.1/lucUI.min.css">
<script src="https://cdn.jsdelivr.net/npm/lucui-css-framework@2.0.1/lucUI.js"></script>
```

### npm Installation

```bash
npm install lucui-css-framework
```

```html
<link rel="stylesheet" href="node_modules/lucui-css-framework/lucUI.css">
<script src="node_modules/lucui-css-framework/lucUI.js"></script>
```

### GitHub Installation

```bash
git clone https://github.com/lucaf1-15/lucUI.git
```

### Build from Source

```bash
git clone https://github.com/lucaf1-15/lucUI.git
cd lucUI
npm install
npm run build
```

---

## Modular Imports

Import only the modules you need from individual source files:

```html
<link rel="stylesheet" href="lucCORE/luc-variables.css">
<link rel="stylesheet" href="lucCORE/luc-reset.css">
<link rel="stylesheet" href="lucCORE/luc-typography.css">
<link rel="stylesheet" href="lucCOMPONENTS/luc-buttons.css">
<link rel="stylesheet" href="lucCOMPONENTS/luc-cards.css">
<link rel="stylesheet" href="lucUTILITIES/luc-glass.css">
<link rel="stylesheet" href="lucUTILITIES/luc-animations.css">
```

For production, run `npm run build` to generate single-file bundles.

---

## Customization

### CSS Variables Override

```css
:root {
    --luca-navy: #1d2d44;
    --studio-gold: #ae9d5d;
    --designer-azure: #00bbff;

    /* Spacing */
    --space-4: 1rem;
    --space-8: 2rem;

    /* Border Radius */
    --radius-md: 16px;
    --radius-lg: 24px;

    /* Shadows */
    --shadow-md: 0 4px 16px rgba(0,0,0,0.30);
}
```

### Custom Themes

Create a custom theme via `data-theme`:
```css
[data-theme="forest"] {
    --luc-canvas: #0a1a0a;
    --luc-ink: #e8f5e9;
    --luc-accent: #66bb6a;
}
```

---

## Browser Support

- Chrome (latest), Safari (latest), Firefox (latest), Edge (latest)
- **Requirements:** CSS custom properties, backdrop-filter support, CSS grid

---

## Mobile Responsiveness

lucUI is fully responsive across all screen sizes:

| Breakpoint | Range | Behavior |
|------------|-------|----------|
| Desktop | 1024px+ | Full layout |
| Tablet | 768-1023px | Grid collapses to 2 columns |
| Mobile | 480-767px | Grid to single column, adjusted padding/typography |
| Small Mobile | <480px | Compact spacing |

**Responsive Features:**
- Container: 90% → 95% → 100% on smaller screens
- Section padding: 4rem → 3rem → 2rem
- Buttons: full width on mobile, 16px font size (prevents iOS zoom)
- Modals: full width, stacked footer buttons
- Navbar: hamburger menu at 900px breakpoint
- Touch-friendly: minimum 44px tap targets
- `prefers-reduced-motion` respected

---

## Utilities

### Glass Morphism (luc-glass.css)

**Glass variants:** `.luc-glass`, `.luc-glass-light`, `.luc-glass-dark`, `.luc-glass-navy`, `.luc-glass-gold`, `.luc-glass-transparency`

**Blur intensity:** `.luc-blur-sm` (8px), `.luc-blur-md` (16px), `.luc-blur-lg` (32px), `.luc-blur-xl` (48px)

**Border radius:** `.luc-glass-rounded-sm` (8px), `.luc-glass-rounded-md` (16px), `.luc-glass-rounded-lg` (24px), `.luc-glass-rounded-xl` (32px), `.luc-glass-rounded-full` (9999px)

**Effects:** `.luc-glass-hover`, `.luc-glass-shine`, `.luc-glass-noise`

### Animations (luc-animations.css)

**Reveal:** `.luc-reveal`, `.luc-reveal-up`, `.luc-reveal-down`, `.luc-reveal-left`, `.luc-reveal-right`, `.luc-reveal-scale`

**Fade:** `.luc-fade-in`, `.luc-fade-out`

**Slide:** `.luc-slide-up`, `.luc-slide-down`

**Hover:** `.luc-hover-lift`, `.luc-hover-scale`, `.luc-hover-glow`

**Continuous:** `.luc-pulse`, `.luc-spin`, `.luc-bounce`, `.luc-shake`

**Delays:** `.luc-delay-100` through `.luc-delay-500` (100ms increments)

**Durations:** `.luc-duration-fast` (0.2s), `.luc-duration-base` (0.3s), `.luc-duration-slow` (0.4s), `.luc-duration-slower` (0.6s)

### Spacing (luc-spacing.css)

Margin (`.luc-m-`, `.luc-mt-`, `.luc-mr-`, `.luc-mb-`, `.luc-ml-`, `.luc-mx-auto`), padding (`.luc-p-`, `.luc-pt-`, `.luc-pr-`, `.luc-pb-`, `.luc-pl-`), and gap (`.luc-gap-`) utilities from 0-16.

### Layout (luc-layout.css)

**Display:** `.luc-block`, `.luc-inline-block`, `.luc-inline`, `.luc-flex`, `.luc-inline-flex`, `.luc-grid`, `.luc-hidden`

**Flexbox:** direction (`.luc-flex-row/col/reverse`), wrap, align-items, justify-content, flex grow/shrink

**Grid:** `.luc-grid-cols-1` through `12`, `.luc-grid-cols-auto`, `.luc-col-span-1` through `12`, responsive collapse

**Position:** `.luc-static/relative/absolute/fixed/sticky`, inset, top/right/bottom/left

**Sizing:** `.luc-w-full/auto/screen`, `.luc-h-full/auto/screen`, min/max width/height

**Overflow:** `.luc-overflow-auto/hidden/visible/scroll`, X/Y variants

### General Utilities (luc-utilities.css) — v2.0

**Dividers:** `.luc-divider` (horizontal), `.luc-divider-vertical`, `.luc-divider-gold`, `.luc-divider-label`

**Text:** `.luc-truncate`, `.luc-line-clamp-1` through `4`

**Accessibility:** `.luc-sr-only`, `.luc-sr-only-focusable`

**Aspect Ratio:** `.luc-aspect-square`, `.luc-aspect-video`, `.luc-aspect-photo`, `.luc-aspect-portrait`, `.luc-aspect-wide`, `.luc-aspect-golden`

**Cursor:** `.luc-cursor-pointer/default/not-allowed/grab/grabbing`

**Pointer Events:** `.luc-pointer-events-none/auto`

**User Select:** `.luc-select-none/text/all`

**Object Fit:** `.luc-object-cover/contain/fill`

**Opacity:** `.luc-opacity-0/25/50/75/100`

**Print:** strips glass effects, normalizes colors to black/white, appends URLs to links

---

## Design Philosophy

1. **Modular Architecture** — Import only what you need
2. **Dependency-Free** — No build process required for basic use
3. **Build Pipeline** — `npm run build` generates optimized single-file bundles
4. **Performance First** — Lightweight and fast
5. **Brand Consistency** — Official luca.ecosystem colors and fonts
6. **Glass Morphism** — Premium transparency effects
7. **Accessibility** — Focus states, reduced motion, ARIA, keyboard navigation
8. **Themeable** — 4 built-in themes + custom theme support via data-theme
9. **JavaScript Enhancement** — Progressive enhancement via lucUI.js
10. **Semantic Tokens** — Theme-aware CSS variables for safe customization

---

## JavaScript Reference

### lucUI.init()

Initialize all components. Call on DOMContentLoaded.

### lucUI.initTheme(doc)

Initialize theme from `data-theme` attribute or `prefers-color-scheme`.

### lucUI.openModal(modalEl, triggerEl)

Open a modal with focus trap. Returns a close function.

### lucUI.closeModal()

Close the currently active modal.

### lucUI.showToast(options)

Show a toast notification. Options: `message`, `title`, `variant` (info/success/warning/error/gold), `duration`, `position`.

### lucUI.copyToClipboard(text)

Copy text to clipboard with fallback for older browsers.

### lucUI.isReducedMotion()

Returns true if user prefers reduced motion.

---

## GitHub Repository

- **Repository:** https://github.com/lucaf1-15/lucUI
- **Package Name:** lucui-css-framework
- **Version:** 2.0.1
- **License:** MIT
- **npm:** https://www.npmjs.com/package/lucui-css-framework
- **CDN:** https://cdn.jsdelivr.net/npm/lucui-css-framework@2.0.1/

---

## Version History

### v2.0.1 (July 2026)
- Minor fixes and package maintenance

### v2.0.0 (July 2026)
- **Prism surface system** — reactive pointer lighting, layered glass, editorial stages
- **Theme system** — 4 themes (light, dark, midnight, sunrise) via `data-theme`
- **Semantic design tokens** — canvas, surface, ink, accent, RGB channel variables
- **Single-file bundles** — `npm run build` generates `lucUI.css` and `lucUI.min.css` from 50+ source modules
- **JavaScript layer** — lucUI.js for modals, toasts, themes, command palette, scroll reveals, tabs, dropdowns, accordion, cookie consent
- **28 new components** — tooltips, dropdowns, tabs, toasts, breadcrumbs, progress, skeleton, accordion + 18 extended components (carousel, pagination, datatables, avatar, chips, divider, loader, gallery, testimonials, pricing, features, hero, signature, footer, sidebar, search, datepicker, file upload, range slider, toggle, stepper, timeline, notifications, user card, cookie consent)
- **General utilities** — dividers, truncation, screen-reader-only, aspect ratio, cursor, pointer events, user select, object fit, opacity, print styles
- **Accessibility** — focus trap, keyboard navigation, ARIA states, reduced motion
- **Navbar refinements** — 56px height, active/current page state, mobile hamburger
- **Build system** — scripts/build.js with CSS bundling and minification
- **Interactive showcase** — tutorial.html replacing example.html

### v1.0.0 (May 2026)
- Initial release
- Core design system with brand colors and fonts
- Typography system
- Glass morphism utilities
- Button, card, navbar, form, modal, alert, badge components
- Animation, spacing, and layout utilities
- npm and CDN distribution
- MIT License

---

## Best Practices

1. **Use Semantic HTML** — Always use proper HTML5 elements
2. **Accessibility First** — Include focus states and ARIA labels
3. **Responsive Design** — Test on mobile, tablet, and desktop
4. **Performance** — Use minified version for production
5. **Brand Consistency** — Stick to official brand colors and fonts
6. **Modular Imports** — Only import what you need for smaller bundles
7. **CSS Variables** — Use CSS variables for customization instead of overriding styles
8. **Glass Morphism** — Use glass effects sparingly for best performance
9. **Animation** — Respect reduced motion preferences
10. **Build Pipeline** — Run `npm run build` before publishing to regenerate bundles
11. **Theme System** — Use `data-theme` for theme switching; customize semantic tokens

---

## Troubleshooting

### Glass Effects Not Working
- Ensure browser supports backdrop-filter
- Check that CSS variables are loaded
- Verify z-index stacking context

### Fonts Not Loading
- Ensure Google Fonts are included
- Check font-family names match exactly
- Verify internet connection for CDN fonts

### CDN Not Loading
- Check CDN URL is correct
- Verify version number
- Check network connectivity

### npm Installation Issues
- Ensure npm is installed
- Check package name: lucui-css-framework
- Verify npm registry access

### JavaScript Not Working
- Ensure lucUI.js is loaded before init call
- Call `lucUI.init()` after DOMContentLoaded
- Check browser console for errors

---

## Contributing

Contributions are welcome! See CONTRIBUTING.md for guidelines.

---

## License

MIT License — Free to use for personal and commercial projects.

---

**Built with collaboration between luca.designss and luca.softss**
