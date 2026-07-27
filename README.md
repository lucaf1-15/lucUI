# lucUI CSS Framework

**The prism interface system by luca.ecosystem / luca.designss**

lucUI 2.0 is a modular, dependency-free CSS framework for interfaces that feel authored. It combines luca.ecosystem's liquid-glass surfaces with editorial typography, semantic design tokens, accessible interactions, and reactive prism lighting.

Version 2.0 introduces the signature Prism system: `.luc-stage`, `.luc-prism`, `.luc-bento`, branded code windows, metrics, marquees, a command palette, and a launch showcase built entirely with lucUI.

Start with the [component reference](COMPONENTS.md), follow the [1.x → 2.0 migration guide](MIGRATION.md), or open the realistic [studio workspace starter](starters/studio-workspace.html).

---

## Quick Start

### Installation

#### Option 1: CDN (Recommended for quick start)

Include lucUI via CDN in your HTML:

```html
<!-- Full version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucui-css-framework@2.0.0/lucUI.css">

<!-- Minified version (smaller file size) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucui-css-framework@2.0.0/lucUI.min.css">
```

For the interactive layer, add the JavaScript file as well:

```html
<script src="https://cdn.jsdelivr.net/npm/lucui-css-framework@2.0.0/lucUI.js"></script>
```

#### Option 2: npm

Install via npm:

```bash
npm install lucui-css-framework
```

Then include in your project:

```html
<link rel="stylesheet" href="node_modules/lucui-css-framework/lucUI.css">
```

Or import in your CSS:

```css
@import 'lucui-css-framework/lucUI.css';
```

#### Option 3: Download

Download the latest release from GitHub and include the file:

```html
<link rel="stylesheet" href="path/to/lucUI.css">
```

### Basic Usage

```html
<div class="luc-card luc-glass">
    <h2 class="luc-card-title">Hello lucUI</h2>
    <p class="luc-card-body">Beautiful glass morphism design.</p>
    <button class="luc-btn luc-btn-primary">Get Started</button>
</div>
```

### Prism Surface (2.0)

```html
<article class="luc-card luc-prism" data-luc-spotlight>
    <span class="luc-kicker">New perspective</span>
    <h2 class="luc-gradient-text">Build a feeling.</h2>
    <p>Compose from the lucUI visual language.</p>
</article>
```

Add `lucUI.js` for pointer-reactive light, accessible modals/tabs/dropdowns, themes, copy buttons, toasts, scroll reveals, and the command palette.

### Interactive Features

```html
<button class="luc-btn luc-btn-primary" data-luc-toggle="modal" data-luc-target="#demo-modal">
  Open modal
</button>

<div class="luc-reveal luc-mt-6">
  <div class="luc-card luc-glass">Reveal on scroll</div>
</div>
```

### Development

```bash
npm run build
```

Edit the modular files or `lucUI.source.css`; the build creates a standalone `lucUI.css` and a true minified `lucUI.min.css`.

### Production-shaped starter

The package includes `starters/studio-workspace.html`, a complete client-workspace composition using the navbar, sidebar, metrics, Prism surfaces, project cards, tabs, timeline, data table, notifications, modal form, toast, command palette, and responsive mobile navigation. It is a starting product surface, not just a component gallery.

For the full API, see [COMPONENTS.md](COMPONENTS.md). For upgrading an existing lucUI project, see [MIGRATION.md](MIGRATION.md).

---

## Brand Colors

lucUI uses the official luca.ecosystem brand color palette:

| Color | Hex | Usage |
|-------|-----|-------|
| Luca Navy | `#1d2d44` | Backgrounds |
| Studio Gold | `#ae9d5d` | Secondary accents |
| Designer's Azure | `#00bbff` | luca.designss accent |
| Luca Tangerine | `#ff8c00` | luca.softss accent |
| Bold Viridian | `#00ff00` | lucAI & luca.toolss accent |

### Using Brand Colors

```html
<h1 class="luc-text-gold">Gold Heading</h1>
<p class="luc-text-azure">Azure Text</p>
<div class="luc-badge luc-badge-viridian">Viridian Badge</div>
```

---

## Typography

### Brand Fonts

- **Playfair Display** (Black) — titles and headers
- **Raleway** (Medium) — body and interface text
- **Montserrat** (Light Italic) — accent text, kickers, captions, and asides

### Typography Classes

```html
<h1 class="luc-text-5xl">Display Heading</h1>
<h2 class="luc-text-2xl">Section Heading</h2>
<p class="luc-text-base">Body text</p>
<p class="luc-text-sm luc-text-muted">Small muted text</p>
<p class="luc-italic">Italic text using Montserrat</p>
```

---

## Components

### Buttons

```html
<!-- Transparency Button -->
<button class="luc-btn luc-btn-transparency">Transparency</button>

<!-- Primary Button (Gold) -->
<button class="luc-btn luc-btn-primary">Primary</button>

<!-- Azure Button (luca.designss) -->
<button class="luc-btn luc-btn-azure">Azure</button>

<!-- Tangerine Button (luca.softss) -->
<button class="luc-btn luc-btn-tangerine">Tangerine</button>

<!-- Viridian Button (lucAI & luca.toolss) -->
<button class="luc-btn luc-btn-viridian">Viridian</button>
```

### Cards

```html
<!-- Basic Glass Card -->
<div class="luc-card">
    <div class="luc-card-header">
        <h3 class="luc-card-title">Card Title</h3>
    </div>
    <div class="luc-card-body">
        <p>Card content goes here.</p>
    </div>
</div>

<!-- Transparency Card (Enhanced) -->
<div class="luc-card-transparency">
    <div class="luc-glow-spot center"></div>
    <h3>Enhanced Transparency</h3>
    <p>Premium glass morphism with glow effects.</p>
</div>
```

### Navbar

```html
<nav class="luc-navbar">
    <div class="luc-navbar-container">
        <a href="#" class="luc-navbar-brand">
            <img src="logo.svg" alt="Brand">
        </a>
        <div class="luc-navbar-links">
            <a href="#" class="luc-navbar-link">Home</a>
            <a href="#" class="luc-navbar-link">About</a>
            <a href="#" class="luc-navbar-link">Contact</a>
        </div>
    </div>
</nav>
```

### Forms

```html
<div class="luc-form-group">
    <label class="luc-label">Email Address</label>
    <input type="email" class="luc-input" placeholder="you@example.com">
</div>

<div class="luc-form-group">
    <label class="luc-label">Message</label>
    <textarea class="luc-textarea" placeholder="Your message..."></textarea>
</div>

<div class="luc-checkbox-group">
    <input type="checkbox" class="luc-checkbox" id="agree">
    <label for="agree">I agree to the terms</label>
</div>
```

### Modals

```html
<!-- Modal Backdrop -->
<div class="luc-modal-backdrop active">
    <div class="luc-modal">
        <div class="luc-modal-header">
            <h3 class="luc-modal-title">Modal Title</h3>
            <button class="luc-modal-close">×</button>
        </div>
        <div class="luc-modal-body">
            <p>Modal content goes here.</p>
        </div>
        <div class="luc-modal-footer">
            <button class="luc-btn luc-btn-transparency">Cancel</button>
            <button class="luc-btn luc-btn-primary">Confirm</button>
        </div>
    </div>
</div>
```

### Alerts

```html
<!-- Info Alert (Azure) -->
<div class="luc-alert luc-alert-info">
    <div class="luc-alert-icon">ℹ</div>
    <div class="luc-alert-content">
        <div class="luc-alert-title">Information</div>
        <p class="luc-alert-message">This is an info message.</p>
    </div>
</div>

<!-- Success Alert (Viridian) -->
<div class="luc-alert luc-alert-success">
    <div class="luc-alert-icon">✓</div>
    <div class="luc-alert-content">
        <div class="luc-alert-title">Success</div>
        <p class="luc-alert-message">Operation completed successfully.</p>
    </div>
</div>

<!-- Warning Alert (Tangerine) -->
<div class="luc-alert luc-alert-warning">
    <div class="luc-alert-icon">⚠</div>
    <div class="luc-alert-content">
        <div class="luc-alert-title">Warning</div>
        <p class="luc-alert-message">Please review this warning.</p>
    </div>
</div>

<!-- Error Alert -->
<div class="luc-alert luc-alert-error">
    <div class="luc-alert-icon">✕</div>
    <div class="luc-alert-content">
        <div class="luc-alert-title">Error</div>
        <p class="luc-alert-message">Something went wrong.</p>
    </div>
</div>
```

### Badges

```html
<span class="luc-badge luc-badge-gold">Gold Badge</span>
<span class="luc-badge luc-badge-azure">Azure Badge</span>
<span class="luc-badge luc-badge-tangerine">Tangerine Badge</span>
<span class="luc-badge luc-badge-viridian">Viridian Badge</span>
```

---

## Utilities

### Glass Morphism

```html
<!-- Basic Glass -->
<div class="luc-glass">Glass container</div>

<!-- Transparency Glass -->
<div class="luc-glass-transparency">Enhanced transparency</div>

<!-- Glass with Blur Intensity -->
<div class="luc-glass luc-blur-lg">High blur glass</div>

<!-- Glass with Hover Effect -->
<div class="luc-glass luc-glass-hover">Hover me</div>
```

### Animations

```html
<!-- Reveal Animation -->
<div class="luc-reveal">Reveals on scroll</div>

<!-- Fade Animation -->
<div class="luc-fade-in">Fades in</div>

<!-- Hover Animations -->
<div class="luc-hover-lift">Lifts on hover</div>
<div class="luc-hover-scale">Scales on hover</div>
<div class="luc-hover-glow">Glows on hover</div>

<!-- Pulse Animation -->
<div class="luc-pulse">Pulsing element</div>
```

### Spacing

```html
<!-- Margin -->
<div class="luc-m-4">Margin all sides</div>
<div class="luc-mt-4">Margin top</div>
<div class="luc-mb-4">Margin bottom</div>

<!-- Padding -->
<div class="luc-p-4">Padding all sides</div>
<div class="luc-pt-4">Padding top</div>
<div class="luc-pb-4">Padding bottom</div>

<!-- Gap (Flex/Grid) -->
<div class="luc-flex luc-gap-4">Flex with gap</div>
<div class="luc-grid luc-gap-4">Grid with gap</div>
```

### Layout

```html
<!-- Flexbox -->
<div class="luc-flex luc-items-center luc-justify-between">
    <div>Left</div>
    <div>Right</div>
</div>

<!-- Grid -->
<div class="luc-grid luc-grid-cols-3">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
</div>

<!-- Auto-fit Grid -->
<div class="luc-grid luc-grid-cols-auto">
    <div>Auto 1</div>
    <div>Auto 2</div>
    <div>Auto 3</div>
</div>
```

---

## Customization

### CSS Variables

lucUI uses CSS variables for easy customization. Override them in your stylesheet:

```css
:root {
    /* Brand Colors */
    --luca-navy: #1d2d44;
    --studio-gold: #ae9d5d;
    --designer-azure: #00bbff;
    --luca-tangerine: #ff8c00;
    --bold-viridian: #00ff00;
    
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

### Modular Imports

Import only what you need:

```html
<!-- Core Only -->
<link rel="stylesheet" href="lucCORE/luc-variables.css">
<link rel="stylesheet" href="lucCORE/luc-reset.css">
<link rel="stylesheet" href="lucCORE/luc-typography.css">

<!-- Components -->
<link rel="stylesheet" href="lucCOMPONENTS/luc-buttons.css">
<link rel="stylesheet" href="lucCOMPONENTS/luc-cards.css">

<!-- Utilities -->
<link rel="stylesheet" href="lucUTILITIES/luc-glass.css">
<link rel="stylesheet" href="lucUTILITIES/luc-animations.css">
```

---

## Browser Support

lucUI supports modern browsers:
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)

Requires CSS custom properties (CSS variables) and backdrop-filter support.

---

## Framework Structure

```
lucUI CSS Framework/
├── lucCORE/              # Core foundation
│   ├── luc-variables.css    # Design tokens
│   ├── luc-reset.css        # CSS reset
│   ├── luc-typography.css   # Typography system
│   └── luc-base.css         # Base styles
├── lucCOMPONENTS/       # UI components
│   ├── luc-buttons.css      # Button components
│   ├── luc-cards.css        # Card components
│   ├── luc-navbar.css       # Navbar component
│   ├── luc-forms.css        # Form components
│   ├── luc-modals.css       # Modal components
│   ├── luc-alerts.css       # Alert components
│   └── luc-badges.css       # Badge components
├── lucUTILITIES/        # Utility classes
│   ├── luc-glass.css        # Glass morphism
│   ├── luc-animations.css   # Animations
│   ├── luc-spacing.css      # Spacing utilities
│   └── luc-layout.css       # Layout utilities
├── lucUI.css            # Main entry point
└── README.md            # This file
```

---

## Design Philosophy

lucUI follows the luca.ecosystem design principles:

- **Modular Architecture** - Import only what you need
- **Dependency-Free** - No build process required
- **Performance First** - Lightweight and fast
- **Brand Consistency** - Official luca.ecosystem colors and fonts
- **Glass Morphism** - Premium transparency effects
- **Accessibility** - Focus states and reduced motion support

---

## License

MIT License - Free to use for personal and commercial projects.

---

## Distribution

lucUI is available through multiple distribution channels:

### npm
```bash
npm install lucui-css-framework
```

### CDN (jsDelivr)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucui-css-framework@2.0.0/lucUI.min.css">
<script src="https://cdn.jsdelivr.net/npm/lucui-css-framework@2.0.0/lucUI.js"></script>
```

### GitHub
Download releases from: https://github.com/lucaf1-15/lucUI/releases

---

**Built with collaboration between luca.designss and luca.softss**
