# lucUI CSS Framework - Complete Knowledge Base for lucAI

## Overview

lucUI is a premium glass morphism CSS framework developed by luca.ecosystem in collaboration between luca.designss and luca.softss. It provides a complete design system with transparency components, brand colors, and premium UI elements.

**Key Characteristics:**
- Modular architecture with separate folders for core, components, and utilities
- Plain CSS with CSS variables (no Sass, no build process required)
- Glass morphism design style with backdrop-filter and transparency effects
- Brand-aligned colors and fonts from luca.ecosystem
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

- **Playfair Display** (Black, 900 weight) - Display headings
- **Raleway** (Medium, 500 weight) - Body text
- **Montserrat** (Light Italic, 300 italic) - Italic accents

### Naming Conventions

- Framework name: `lucUI` (uppercase UI)
- Folder names: `lucCORE`, `lucCOMPONENTS`, `lucUTILITIES` (uppercase prefixes)
- CSS class prefix: `luc-` (lowercase with hyphen)
- File names: `luc-[component].css` (lowercase with hyphen)

---

## Framework Structure

```
lucUI CSS Framework/
├── lucCORE/                    # Core foundation files
│   ├── luc-variables.css       # Design tokens (colors, fonts, spacing, shadows)
│   ├── luc-reset.css          # CSS reset
│   ├── luc-typography.css     # Typography system
│   └── luc-base.css           # Base styles (container, grid, flex)
├── lucCOMPONENTS/             # UI components
│   ├── luc-buttons.css        # Button components
│   ├── luc-cards.css          # Card components
│   ├── luc-navbar.css         # Navbar component
│   ├── luc-forms.css          # Form components
│   ├── luc-modals.css         # Modal components
│   ├── luc-alerts.css         # Alert components
│   └── luc-badges.css         # Badge components
├── lucUTILITIES/              # Utility classes
│   ├── luc-glass.css          # Glass morphism utilities
│   ├── luc-animations.css     # Animation utilities
│   ├── luc-spacing.css       # Spacing utilities
│   └── luc-layout.css         # Layout utilities
├── lucUI.css                  # Main entry point (imports all modules)
├── lucUI.min.css              # Minified version for CDN
├── package.json               # npm package configuration
├── README.md                  # User documentation
├── CONTRIBUTING.md            # Contribution guidelines
├── CHANGELOG.md               # Version history
├── SETUP.md                   # Setup guide for distribution
├── LICENSE                    # MIT License
└── example.html               # Live demo file
```

---

## CSS Variables (Design Tokens)

### Color Variables

```css
:root {
    /* Brand Colors */
    --luca-navy: #1d2d44;
    --studio-gold: #ae9d5d;
    --designer-azure: #00bbff;
    --luca-tangerine: #ff8c00;
    --bold-viridian: #00ff00;
    
    /* Text Colors */
    --text-light: #e0e6ed;
    --text-muted: rgba(224, 230, 237, 0.65);
    
    /* Background Colors */
    --glass-bg: rgba(36, 59, 85, 0.45);
    --glass-hover: rgba(36, 59, 85, 0.55);
    --glass-modal: rgba(8, 18, 32, 0.85);
    
    /* Border Colors */
    --glass-edge: rgba(255, 255, 255, 0.08);
    --border-color: rgba(255, 255, 255, 0.06);
}
```

### Typography Variables

```css
:root {
    /* Font Families */
    --font-display: 'Playfair Display', serif;
    --font-body: 'Raleway', sans-serif;
    --font-italic: 'Montserrat', sans-serif;
    
    /* Font Sizes */
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
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;
}
```

### Border Radius Variables

```css
:root {
    --radius-sm: 8px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-xl: 32px;
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

## Core Files

### luc-variables.css

Defines all CSS variables for colors, fonts, spacing, shadows, glass effects, animations, and z-index. This is the foundation of the entire framework.

### luc-reset.css

Modern CSS reset including:
- Box-sizing reset
- Margin/padding reset
- Font smoothing
- Image and form element styling
- Focus-visible outline removal
- Mobile tap highlight removal

### luc-typography.css

Typography system including:
- Brand font imports (Google Fonts)
- Base typography styles for body
- Heading styles (h1-h6)
- Paragraph styles
- Italic text styles
- Text utilities (sizes, colors, alignment, transform)
- Font weight utilities

### luc-base.css

Base styles including:
- Body background gradient
- Container and section spacing
- Grid system (responsive)
- Flexbox utilities
- Responsive breakpoints

---

## Components

### Buttons (luc-buttons.css)

**Base Button Class:** `.luc-btn`

**Button Variants:**
- `.luc-btn-transparency` - Transparent glass button
- `.luc-btn-primary` - Studio Gold primary button
- `.luc-btn-azure` - Designer's Azure button (luca.designss)
- `.luc-btn-tangerine` - Luca Tangerine button (luca.softss)
- `.luc-btn-viridian` - Bold Viridian button (lucAI & luca.toolss)

**Button Sizes:**
- Default size
- `.luc-btn-sm` - Small
- `.luc-btn-lg` - Large

**Button States:**
- Hover effects (transform, shadow, brightness)
- Active effects (scale, filter)
- Focus-visible states (outline)
- Disabled state (opacity, cursor)

**Example Usage:**
```html
<button class="luc-btn luc-btn-primary">Primary Button</button>
<button class="luc-btn luc-btn-transparency">Transparency Button</button>
<button class="luc-btn luc-btn-azure">Azure Button</button>
```

### Cards (luc-cards.css)

**Base Card Class:** `.luc-card`

**Card Variants:**
- `.luc-card` - Basic glass card
- `.luc-card-transparency` - Enhanced transparency card with glow effects
- `.luc-card-sm` - Small card
- `.luc-card-lg` - Large card

**Card Structure (Recommended):**
```html
<div class="luc-card">
    <div class="luc-card-header">
        <h3 class="luc-card-title">Card Title</h3>
        <p class="luc-card-subtitle">Card Subtitle</p>
    </div>
    <div class="luc-card-body">
        <p>Card content goes here.</p>
    </div>
    <div class="luc-card-footer">
        <button class="luc-btn luc-btn-primary">Action</button>
    </div>
</div>
```

**Note:** Always use `luc-card-header` wrapper around `luc-card-title` for proper semantic structure and spacing.

**Glow Spot Effect:**
```html
<div class="luc-card-transparency">
    <div class="luc-glow-spot center"></div>
    <h3>Enhanced Transparency</h3>
    <p>Premium glass morphism with glow effects.</p>
</div>
```

### Navbar (luc-navbar.css)

**Base Navbar Class:** `.luc-navbar`

**Navbar Structure:**
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

**Navbar Features:**
- Fixed position with backdrop blur
- Glass morphism styling
- Slim 56px height (shrinks to 48px on scroll)
- Pill-shaped navigation links (built into `.luc-navbar-link` - no additional class needed)
- Hover effects with gold accent
- Mobile responsive with toggle
- Scroll state detection (adds `.scrolled` class)

### Forms (luc-forms.css)

**Form Components:**
- `.luc-form-group` - Form group wrapper
- `.luc-label` - Label styling
- `.luc-input` - Input field
- `.luc-textarea` - Textarea
- `.luc-select` - Select dropdown
- `.luc-checkbox` - Checkbox
- `.luc-radio` - Radio button

**Form Example:**
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

**Form States:**
- Focus states (border color, box-shadow)
- Disabled state (opacity, cursor)
- Error state (`.error` class)
- Success state (`.success` class)

### Modals (luc-modals.css)

**Modal Structure:**
```html
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

**Modal Features:**
- Backdrop blur and dark overlay
- Glass morphism modal styling
- Specular edge effect
- Close button with rotation animation
- Modal sizes: `.luc-modal-sm`, `.luc-modal-lg`, `.luc-modal-xl`
- Animation variants: `.fade`, `.slide`

### Alerts (luc-alerts.css)

**Alert Variants:**
- `.luc-alert-info` - Designer's Azure (info)
- `.luc-alert-success` - Bold Viridian (success)
- `.luc-alert-warning` - Luca Tangerine (warning)
- `.luc-alert-error` - Red (error)
- `.luc-alert-gold` - Studio Gold (accent)

**Alert Structure:**
```html
<div class="luc-alert luc-alert-info">
    <div class="luc-alert-icon">ℹ</div>
    <div class="luc-alert-content">
        <div class="luc-alert-title">Information</div>
        <p class="luc-alert-message">This is an info message.</p>
    </div>
</div>
```

**Alert Features:**
- Icon, title, and message structure
- Glass morphism styling
- Specular edge effect
- Dismissible variant (`.luc-alert-dismissible`)
- Size variants: `.luc-alert-sm`, `.luc-alert-lg`

### Badges (luc-badges.css)

**Badge Variants:**
- `.luc-badge-gold` - Studio Gold
- `.luc-badge-azure` - Designer's Azure
- `.luc-badge-tangerine` - Luca Tangerine
- `.luc-badge-viridian` - Bold Viridian
- `.luc-badge-navy` - Luca Navy

**Badge Styles:**
- `.luc-badge-outline` - Outline style
- `.luc-badge-solid` - Solid background
- `.luc-badge-dot` - With dot indicator
- `.luc-badge-pill` - Pill shape (default)
- `.luc-badge-square` - Square shape

**Badge Example:**
```html
<span class="luc-badge luc-badge-gold">Gold Badge</span>
<span class="luc-badge luc-badge-azure">Azure Badge</span>
<span class="luc-badge luc-badge-viridian">Viridian Badge</span>
```

---

## Utilities

### Glass Morphism (luc-glass.css)

**Glass Utilities:**
- `.luc-glass` - Basic glass effect
- `.luc-glass-light` - Light glass variant
- `.luc-glass-dark` - Dark glass variant
- `.luc-glass-navy` - Navy glass variant
- `.luc-glass-gold` - Gold glass variant
- `.luc-glass-transparency` - Enhanced transparency card
- `.luc-glass-hover` - Hover effect
- `.luc-glass-shine` - Shine animation
- `.luc-glass-noise` - Noise texture

**Blur Intensity:**
- `.luc-blur-sm` - 8px blur
- `.luc-blur-md` - 16px blur
- `.luc-blur-lg` - 32px blur
- `.luc-blur-xl` - 48px blur

**Border Radius:**
- `.luc-glass-rounded-sm` - 8px
- `.luc-glass-rounded-md` - 16px
- `.luc-glass-rounded-lg` - 24px
- `.luc-glass-rounded-xl` - 32px
- `.luc-glass-rounded-full` - 9999px

### Animations (luc-animations.css)

**Reveal Animations:**
- `.luc-reveal` - Basic reveal (scale + translate)
- `.luc-reveal-up` - Reveal from bottom
- `.luc-reveal-down` - Reveal from top
- `.luc-reveal-left` - Reveal from right
- `.luc-reveal-right` - Reveal from left
- `.luc-reveal-scale` - Scale reveal

**Fade Animations:**
- `.luc-fade-in` - Fade in
- `.luc-fade-out` - Fade out

**Slide Animations:**
- `.luc-slide-up` - Slide up
- `.luc-slide-down` - Slide down

**Hover Animations:**
- `.luc-hover-lift` - Lift on hover
- `.luc-hover-scale` - Scale on hover
- `.luc-hover-glow` - Glow on hover

**Continuous Animations:**
- `.luc-pulse` - Pulse effect
- `.luc-spin` - Spin effect
- `.luc-bounce` - Bounce effect
- `.luc-shake` - Shake effect

**Animation Delays:**
- `.luc-delay-100` - 100ms
- `.luc-delay-200` - 200ms
- `.luc-delay-300` - 300ms
- `.luc-delay-400` - 400ms
- `.luc-delay-500` - 500ms

**Animation Durations:**
- `.luc-duration-fast` - 0.2s
- `.luc-duration-base` - 0.3s
- `.luc-duration-slow` - 0.4s
- `.luc-duration-slower` - 0.6s

**Reduced Motion:**
The framework automatically respects `prefers-reduced-motion` media query.

### Spacing (luc-spacing.css)

**Margin Utilities:**
- `.luc-m-0` to `.luc-m-16` - Margin all sides
- `.luc-mt-0` to `.luc-mt-16` - Margin top
- `.luc-mr-0` to `.luc-mr-16` - Margin right
- `.luc-mb-0` to `.luc-mb-16` - Margin bottom
- `.luc-ml-0` to `.luc-ml-16` - Margin left
- `.luc-mx-auto` - Horizontal auto margin

**Padding Utilities:**
- `.luc-p-0` to `.luc-p-16` - Padding all sides
- `.luc-pt-0` to `.luc-pt-16` - Padding top
- `.luc-pr-0` to `.luc-pr-16` - Padding right
- `.luc-pb-0` to `.luc-pb-16` - Padding bottom
- `.luc-pl-0` to `.luc-pl-16` - Padding left

**Gap Utilities:**
- `.luc-gap-0` to `.luc-gap-16` - Gap for flex/grid

### Layout (luc-layout.css)

**Display Utilities:**
- `.luc-block` - Block display
- `.luc-inline-block` - Inline block
- `.luc-inline` - Inline
- `.luc-flex` - Flexbox
- `.luc-inline-flex` - Inline flexbox
- `.luc-grid` - Grid
- `.luc-hidden` - Hidden

**Flexbox Utilities:**
- `.luc-flex-row` / `.luc-flex-row-reverse` - Direction
- `.luc-flex-col` / `.luc-flex-col-reverse` - Direction
- `.luc-flex-wrap` / `.luc-flex-nowrap` - Wrap
- `.luc-items-start` / `.luc-items-end` / `.luc-items-center` / `.luc-items-baseline` / `.luc-items-stretch` - Align items
- `.luc-justify-start` / `.luc-justify-end` / `.luc-justify-center` / `.luc-justify-between` / `.luc-justify-around` / `.luc-justify-evenly` - Justify content
- `.luc-flex-1` / `.luc-flex-auto` / `.luc-flex-initial` / `.luc-flex-none` - Flex
- `.luc-grow-0` / `.luc-grow` - Flex grow
- `.luc-shrink-0` / `.luc-shrink` - Flex shrink

**Grid Utilities:**
- `.luc-grid-cols-1` to `.luc-grid-cols-12` - Grid columns
- `.luc-grid-cols-auto` - Auto-fit grid
- `.luc-grid-rows-1` to `.luc-grid-rows-6` - Grid rows
- `.luc-col-span-1` to `.luc-col-span-12` / `.luc-col-span-full` - Column span
- `.luc-row-span-1` to `.luc-row-span-6` / `.luc-row-span-full` - Row span

**Position Utilities:**
- `.luc-static` / `.luc-relative` / `.luc-absolute` / `.luc-fixed` / `.luc-sticky` - Position
- `.luc-inset-0` / `.luc-inset-auto` - Inset
- `.luc-top-0` / `.luc-top-auto` - Top
- `.luc-right-0` / `.luc-right-auto` - Right
- `.luc-bottom-0` / `.luc-bottom-auto` - Bottom
- `.luc-left-0` / `.luc-left-auto` - Left

**Sizing Utilities:**
- `.luc-w-full` / `.luc-w-auto` / `.luc-w-screen` - Width
- `.luc-h-full` / `.luc-h-auto` / `.luc-h-screen` - Height
- `.luc-min-w-0` / `.luc-min-w-full` - Min width
- `.luc-min-h-0` / `.luc-min-h-full` / `.luc-min-h-screen` - Min height
- `.luc-max-w-none` / `.luc-max-w-xs` / `.luc-max-w-sm` / `.luc-max-w-md` / `.luc-max-w-lg` / `.luc-max-w-xl` / `.luc-max-w-2xl` / `.luc-max-w-full` - Max width
- `.luc-max-h-none` / `.luc-max-h-full` / `.luc-max-h-screen` - Max height

**Overflow Utilities:**
- `.luc-overflow-auto` / `.luc-overflow-hidden` / `.luc-overflow-visible` / `.luc-overflow-scroll` - Overflow
- `.luc-overflow-x-auto` / `.luc-overflow-x-hidden` / `.luc-overflow-x-scroll` - Overflow X
- `.luc-overflow-y-auto` / `.luc-overflow-y-hidden` / `.luc-overflow-y-scroll` - Overflow Y

**Responsive Breakpoints:**
- Grid columns reduce to 2 columns on tablets (max-width: 1024px)
- Grid columns reduce to 1 column on mobile (max-width: 768px)

---

## Installation Methods

### CDN Installation (Recommended for quick start)

```html
<!-- Minified version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucui-css-framework@1.0.0/lucUI.min.css">

<!-- Full version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucui-css-framework@1.0.0/lucUI.css">
```

### npm Installation

```bash
npm install lucui-css-framework
```

```html
<!-- Include in HTML -->
<link rel="stylesheet" href="node_modules/lucui-css-framework/lucUI.css">
```

```css
/* Or import in CSS */
@import 'lucui-css-framework/lucUI.css';
```

### GitHub Installation

```bash
git clone https://github.com/lucaf1-15/lucUI.git
```

```html
<link rel="stylesheet" href="lucUI.css">
```

---

## Modular Imports

You can import only the modules you need:

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

## Customization

### CSS Variables Override

Override CSS variables in your stylesheet:

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

---

## Browser Support

- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)

**Requirements:**
- CSS custom properties (CSS variables)
- backdrop-filter support

---

## Mobile Responsiveness

lucUI CSS Framework is fully responsive and supports all screen sizes:

**Responsive Breakpoints:**
- **Desktop:** 1024px and above
- **Tablet:** 768px - 1023px
- **Mobile:** 480px - 767px
- **Small Mobile:** Below 480px

**Responsive Features:**

### Base Styles
- Container width adjusts from 90% to 95% to 100% on smaller screens
- Section padding reduces from 4rem to 3rem to 2rem
- Grid columns collapse from multi-column to single column
- Gap spacing adjusts for mobile

### Typography
- Headings scale down on smaller screens (h1: 3rem → 2.2rem on mobile)
- Text utilities adjust for readability on mobile
- Font sizes optimized for touch targets

### Components
- **Buttons:** Full width on mobile, reduced padding, touch-friendly sizes
- **Cards:** Reduced padding, responsive typography
- **Forms:** 16px font size to prevent iOS zoom, reduced padding
- **Modals:** Full width on mobile with adjusted padding, stacked footer buttons
- **Alerts:** Reduced padding and icon sizes
- **Badges:** Smaller font sizes and padding
- **Navbar:** Mobile menu toggle with hamburger animation (900px breakpoint)

### Utilities
- Grid system automatically collapses to single column on mobile
- Flexbox utilities work seamlessly on all screen sizes
- Spacing utilities adjust for mobile
- Layout utilities support all breakpoints

**Mobile-First Approach:**
- Touch-friendly button sizes (minimum 44px tap targets)
- Prevents iOS zoom on form inputs (16px font size)
- Optimized spacing for smaller screens
- Responsive typography for better readability

---

## Design Philosophy

lucUI follows luca.ecosystem design principles:

1. **Modular Architecture** - Import only what you need
2. **Dependency-Free** - No build process required
3. **Performance First** - Lightweight and fast
4. **Brand Consistency** - Official luca.ecosystem colors and fonts
5. **Glass Morphism** - Premium transparency effects
6. **Accessibility** - Focus states and reduced motion support

---

## GitHub Repository

- **Repository:** https://github.com/lucaf1-15/lucUI
- **Package Name:** lucui-css-framework
- **Version:** 1.0.0
- **License:** MIT
- **npm:** https://www.npmjs.com/package/lucui-css-framework
- **CDN:** https://cdn.jsdelivr.net/npm/lucui-css-framework@1.0.0/

---

## Common Use Cases

### Basic Landing Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Site</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucui-css-framework@1.0.0/lucUI.min.css">
</head>
<body>
    <nav class="luc-navbar">
        <div class="luc-navbar-container">
            <a href="#" class="luc-navbar-brand">Brand</a>
            <div class="luc-navbar-links">
                <a href="#" class="luc-navbar-link">Home</a>
                <a href="#" class="luc-navbar-link">About</a>
            </div>
        </div>
    </nav>
    
    <div class="luc-container" style="padding: 4rem 0;">
        <h1 class="luc-text-5xl luc-text-gold">Welcome</h1>
        <p class="luc-text-lg luc-text-muted">Beautiful glass morphism design.</p>
        <button class="luc-btn luc-btn-primary">Get Started</button>
    </div>
</body>
</html>
```

### Dashboard Card Layout

```html
<div class="luc-grid luc-grid-cols-3 luc-gap-6">
    <div class="luc-card">
        <h3 class="luc-card-title">Card 1</h3>
        <p class="luc-text-muted">Content here</p>
    </div>
    <div class="luc-card">
        <h3 class="luc-card-title">Card 2</h3>
        <p class="luc-text-muted">Content here</p>
    </div>
    <div class="luc-card">
        <h3 class="luc-card-title">Card 3</h3>
        <p class="luc-text-muted">Content here</p>
    </div>
</div>
```

### Form with Validation

```html
<div class="luc-card">
    <div class="luc-form-group">
        <label class="luc-label">Email</label>
        <input type="email" class="luc-input" placeholder="you@example.com">
    </div>
    <div class="luc-form-group">
        <label class="luc-label">Password</label>
        <input type="password" class="luc-input" placeholder="••••••••">
    </div>
    <button class="luc-btn luc-btn-primary">Submit</button>
</div>
```

---

## Best Practices

1. **Use Semantic HTML** - Always use proper HTML5 elements
2. **Accessibility First** - Include focus states and ARIA labels
3. **Responsive Design** - Test on mobile, tablet, and desktop
4. **Performance** - Use minified version for production
5. **Brand Consistency** - Stick to official brand colors and fonts
6. **Modular Imports** - Only import what you need for smaller bundles
7. **CSS Variables** - Use CSS variables for customization instead of overriding styles
8. **Glass Morphism** - Use glass effects sparingly for best performance
9. **Animation** - Respect reduced motion preferences
10. **Documentation** - Keep code well-commented

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

---

## Version History

### v1.0.0 (May 20, 2026)
- Initial release
- Core design system with brand colors and fonts
- Typography system
- Glass morphism utilities
- Button, card, navbar, form, modal, alert, badge components
- Animation, spacing, and layout utilities
- npm and CDN distribution
- MIT License

---

## Contributing

Contributions are welcome! See CONTRIBUTING.md for guidelines.

---

## License

MIT License - Free to use for personal and commercial projects.

---

**Built with collaboration between luca.designss and luca.softss**
