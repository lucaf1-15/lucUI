---
name: lucui-design
description: Use this skill to generate on-brand interfaces and assets for lucUI — the prism interface system. Contains design tokens, component references, glass-morphism patterns, and UI kit templates for prototyping editorial/studio UIs.
user-invocable: true
---

# lucUI Design Skill

Explore the files in this skill first, then use them to produce on-brand UI, prototypes, and implementation details for lucUI.

lucUI is a prism interface system: editorial typography, reactive glass, accessible components, and semantic CSS tokens. It ships with four themes (Dark, Light, Sunrise, Midnight) and a full component library built around glass-morphism and depth.

If creating visual artifacts, build static HTML the user can review. If working on production code, copy the tokens and patterns here so the result keeps lucUI's design language.

## Quick map

- `colors_and_type.css` — drop-in CSS variables for color, type, radius, shadow, spacing, motion, and glass effects
- `css.json` — programmatic token export for tooling and implementation
- `components/index.json` — component index and cross-pattern summary
- `components/button.json` — button component contract
- `components/card.json` — card component contract
- `components/input.json` — input component contract
- `components/navigation.json` — navigation component contract
- `preview/component-button.html` — button preview
- `preview/component-card.html` — card preview
- `preview/component-input.html` — input preview
- `preview/component-navigation.html` — navigation preview
- `ui_kits/website/index.html` — full website-style interactive reference

## Essentials at a glance

- solo-design prefix: `lucui` (semantic aliases such as `lucui-background`, `lucui-foreground`, and `lucui-primary`)
- Primary brand: Navy `#1d2d44` / Azure `#00bbff`
- Font stack: Playfair Display (display), Raleway (body), Montserrat (italic)
- Core concept: glass-morphism on dark canvas with reactive lighting
- Theming: `[data-theme="dark"]` (default), `[data-theme="light"]`, `[data-theme="sunrise"]`, `[data-theme="midnight"]`
