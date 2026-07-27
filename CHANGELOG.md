# Changelog

All notable changes to lucUI CSS Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to Semantic Versioning.

---

## [2.0.0] - 2026-07-29

### Signature release — Prism
- **Prism surface system** (`luc-signature.css`) — reactive pointer lighting, layered glass, editorial stages, responsive bento layouts, metric blocks, code windows, marquees, theme docks, reading progress, and a command palette
- **Launch showcase** (`tutorial.html`) — rebuilt as an immersive lucUI 2.0 product experience with a living hero, theme lab, copyable starter surface, command navigation, manifesto modal, and real component interactions
- **Semantic design tokens** — stable brand primitives plus canvas, surface, ink, accent, focus, RGB-channel, layout, radius, and shadow aliases for safer customization across themes
- **Brand typography roles** — Playfair Display for titles, Raleway Medium for interface/body copy, and Montserrat Light Italic for kickers, captions, and accents

### Distribution and performance
- **True single-file bundles** — `lucUI.css` is now generated from all 50 modules instead of shipping as an import-only manifest
- **Real minification** — `lucUI.min.css` is a standalone minified build rather than a chain of browser requests
- **Source manifest** — `lucUI.source.css` is the authoring entry point; `npm run build` regenerates both distribution files

### Accessibility and interaction
- **Modal manager** — focus entry/trap/return, Escape and backdrop dismissal, body-scroll restoration, ARIA trigger state, and race-safe closing
- **Tabs and dropdowns** — repaired dropdown state mismatch plus keyboard navigation and complete tab/tabpanel relationships
- **Command palette and copy actions** — keyboard navigation, focus trapping, filtering, clipboard fallback, and accessible state updates
- **Contrast and focus** — dark ink on bright brand fills, a universal focus token, keyboard-accessible toggles, and focus rings for core controls
- **Reduced motion** — ambient and component motion now collapses to near-zero when requested

### Added — New Components
- **Tooltips** (`luc-tooltips.css`) — CSS-only tooltips with top/bottom/left/right positioning, gold and azure color variants, and smooth fade+translate animation
- **Dropdowns** (`luc-dropdowns.css`) — glass floating menus with open/close toggle, dividers, headers, danger items, and right-align variant
- **Tabs** (`luc-tabs.css`) — three style variants (default border, pill, underline), accessible `aria-selected` support, fade-in panel animation
- **Toasts/Snackbars** (`luc-toasts.css`) — temporary notifications with 6 position options, progress bar, all brand color variants, and slide-in/out animations
- **Breadcrumbs** (`luc-breadcrumbs.css`) — default, glass, chevron, and dot separator variants; responsive collapse on small screens
- **Progress Bars** (`luc-progress.css`) — animated shimmer fill, all brand color variants, striped, animated striped, indeterminate, and labeled variants
- **Skeleton Loaders** (`luc-skeleton.css`) — shimmer and pulse variants; pre-built shapes: text, heading, avatar, image, button, badge, card, paragraph, row
- **Accordion** (`luc-accordion.css`) — CSS-only using `<details>`/`<summary>`, flush variant, animated open/close chevron

### Added — Theme System
- **Light mode** (`luc-themes.css`) — opt-in via `data-theme="light"` on `<html>` or `<body>`; also responds to `prefers-color-scheme: light` automatically; covers all components including navbar, inputs, modals, dropdowns, and toasts

### Added — Utilities
- **General utilities** (`luc-utilities.css`):
  - Dividers: `.luc-divider`, `.luc-divider-vertical`, `.luc-divider-gold`, `.luc-divider-label`
  - Text truncation: `.luc-truncate`, `.luc-line-clamp-1` through `.luc-line-clamp-4`
  - Accessibility: `.luc-sr-only`, `.luc-sr-only-focusable`
  - Aspect ratios: `.luc-aspect-square`, `.luc-aspect-video`, `.luc-aspect-photo`, `.luc-aspect-portrait`, `.luc-aspect-wide`, `.luc-aspect-golden`
  - Cursor utilities: pointer, default, not-allowed, grab, grabbing
  - Pointer events: `.luc-pointer-events-none`, `.luc-pointer-events-auto`
  - User select: `.luc-select-none`, `.luc-select-text`, `.luc-select-all`
  - Object fit: `.luc-object-cover`, `.luc-object-contain`, `.luc-object-fill`
  - Opacity: `.luc-opacity-0/25/50/75/100`
  - Print styles: strips glass effects, normalises colors, appends URLs to links

### Improved
- **Navbar** — added `.active` / `[aria-current="page"]` state for current page link highlighting
- **Navbar** — height reduced from `90px` to `56px` (scrolled: `48px`) for a leaner, more modern look; brand logo scaled to match
- **npm package** — removed `CONTRIBUTING.md`, `CHANGELOG.md`, `SETUP.md` from published files; added `lucUI logo.svg`
- **Logo** — SVG logo now included in the npm package; PNG removed (SVG is resolution-independent and smaller)

### Added — JavaScript Layer
- **lucUI.js** — interactive layer for theme switching, modals, toasts, scroll reveals, accordions, tabs, dropdowns, and cookie consent

### Added — Extended Components (v2.0)
- **Carousel** (`luc-carousel.css`) — slide-based image/content carousel
- **Pagination** (`luc-pagination.css`) — page navigation with glass styling
- **Data Tables** (`luc-datatables.css`) — sortable, responsive table component
- **Avatar** (`luc-avatar.css`) — profile images with size and status variants
- **Chips** (`luc-chips.css`) — compact tag/filter chips
- **Divider** (`luc-divider.css`) — horizontal/vertical dividers with label support
- **Loader** (`luc-loader.css`) — spinner and loading state indicators
- **Gallery** (`luc-gallery.css`) — image grid with hover overlays
- **Testimonials** (`luc-testimonials.css`) — quote cards with avatar and rating
- **Pricing** (`luc-pricing.css`) — pricing table cards with featured tier
- **Features** (`luc-features.css`) — feature grid with icons
- **Hero** (`luc-hero.css`) — full-width hero sections
- **Footer** (`luc-footer.css`) — multi-column site footer
- **Sidebar** (`luc-sidebar.css`) — collapsible navigation sidebar
- **Search** (`luc-search.css`) — search input with results dropdown
- **Datepicker** (`luc-datepicker.css`) — calendar date picker
- **File Upload** (`luc-fileupload.css`) — drag-and-drop file upload zone
- **Range Slider** (`luc-rangeslider.css`) — styled range input
- **Toggle** (`luc-toggle.css`) — switch/toggle control
- **Stepper** (`luc-stepper.css`) — multi-step progress indicator
- **Timeline** (`luc-timeline.css`) — vertical event timeline
- **Notifications** (`luc-notifications.css`) — notification bell and panel
- **User Card** (`luc-usercard.css`) — profile summary card
- **Cookie Consent** (`luc-cookieconsent.css`) — GDPR cookie banner

### Added — Documentation
- **tutorial.html** — interactive component showcase replacing example.html

---

## [1.0.0] - 2026-05-20

### Added
- Initial release of lucUI CSS Framework
- Core design system with brand colors and fonts
- Typography system (Playfair Display, Raleway, Montserrat)
- Glass morphism utilities with backdrop-filter effects
- Button components (transparency, primary, azure, tangerine, viridian)
- Card components (glass cards, transparency cards with glow effects)
- Navbar component with glass styling
- Form components (inputs, textareas, selects, checkboxes, radios)
- Modal components with backdrop blur
- Alert components (info, success, warning, error, gold variants)
- Badge components with brand color variants
- Animation utilities (reveal, fade, slide, hover effects)
- Spacing utilities (margin, padding, gap)
- Layout utilities (flexbox, grid, position, sizing)
- Responsive design with mobile-first approach
- Accessibility features (focus states, reduced motion support)
- MIT License for open-source use
- npm package distribution
- CDN distribution via jsDelivr
- Comprehensive documentation
- Contribution guidelines

### Design System
- Brand Colors: Luca Navy (#1d2d44), Studio Gold (#ae9d5d), Designer's Azure (#00bbff), Luca Tangerine (#ff8c00), Bold Viridian (#00ff00)
- Brand Fonts: Playfair Display (Black), Raleway (Medium), Montserrat (Light Italic)
- Glass morphism effects with specular highlights
- Spring/snappy animation easing functions
- Multi-level shadow system
- CSS variable-based customization

### Architecture
- Modular structure (lucCORE, lucCOMPONENTS, lucUTILITIES)
- Dependency-free plain CSS
- No build process required
- Ready-to-use via CDN or npm
- Modular imports supported
