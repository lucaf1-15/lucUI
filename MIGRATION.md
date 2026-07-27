# Migrating to lucUI 2.0

lucUI 2.0 keeps the luca.ecosystem visual language—Playfair Display titles, Raleway Medium interface copy, Montserrat Light Italic accents, and the navy/gold/azure/tangerine/viridian palette—while adding a complete interaction layer and the opt-in Prism system.

This guide is for projects coming from the lucUI 1.x files (including the 1.0/1.1 line). The original core class names remain familiar, so most existing markup can be upgraded incrementally.

## The short version

1. Replace the 1.x CDN or package reference with the 2.0 distribution.
2. Add lucUI.js if you use modals, dropdowns, tabs, accordions, themes, toasts, reveals, copy buttons, the command palette, or carousels.
3. Edit component modules or lucUI.source.css, then run npm run build; do not hand-edit generated bundles.
4. Keep brand primitives for brand expression and move app-level surfaces/text to semantic --luc-* tokens.
5. Add Prism classes only where you want the signature 2.0 treatment.
6. Test keyboard interaction, reduced motion, and all four themes: dark, light, midnight, and sunrise.

## What changed

| Area | lucUI 1.x | lucUI 2.0 |
| --- | --- | --- |
| CSS entry point | lucUI.css was an import-style entry file | lucUI.css is a generated standalone bundle; lucUI.min.css is a real minified bundle |
| Authoring | Edit the entry file or individual modules | Edit modules or lucUI.source.css, then run npm run build |
| JavaScript | No shipped interaction layer | lucUI.js auto-initializes accessible interactions and exposes window.lucUI |
| Showcase | example.html | tutorial.html, the 2.0 launch showcase |
| Tokens | Brand, glass, spacing, and type variables | Existing primitives plus semantic canvas/surface/ink/accent/focus/RGB aliases |
| Themes | Light/dark overrides, with primitive values changing in themes | dark, light, midnight, and sunrise; semantic tokens carry theme differences |
| Motion | CSS animation utilities | Reduced-motion CSS plus JS fallbacks for reveals and pointer lighting |
| Accessibility | Component-level focus support | Focus-visible treatment, modal focus trap/return, ARIA state wiring, keyboard menus/tabs, and hidden inactive panels |

## 1. Update installation

### CDN

Use the standalone CSS bundle and add the JavaScript layer when behavior is needed:

~~~html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucui-css-framework@2.0.0/lucUI.min.css">
<script src="https://cdn.jsdelivr.net/npm/lucui-css-framework@2.0.0/lucUI.js" defer></script>
~~~

Use lucUI.css instead of the minified file while debugging. The generated bundle includes the local modules in lucUI.source.css and preserves the Google Fonts import from lucCORE/luc-typography.css.

### npm

~~~bash
npm install lucui-css-framework@2.0.0
~~~

~~~html
<link rel="stylesheet" href="node_modules/lucui-css-framework/lucUI.min.css">
<script src="node_modules/lucui-css-framework/lucUI.js" defer></script>
~~~

The package declares Node >=18 for its build script. The runtime CSS/JS remains dependency-free in the browser.

### Before and after

~~~html
<!-- 1.x -->
<link rel="stylesheet" href="/vendor/lucUI.css">
~~~

~~~html
<!-- 2.0 -->
<link rel="stylesheet" href="/vendor/lucUI.min.css">
<script src="/vendor/lucUI.js" defer></script>
~~~

If a page is deliberately CSS-only, the JavaScript tag is optional; visual classes still render. Interactive state will not change without lucUI.js or your own code.

## 2. Adopt the build workflow

The editable source manifest is lucUI.source.css. It imports the current core, component, and utility modules in order. The build script expands local imports and writes:

- lucUI.css — readable standalone distribution bundle
- lucUI.min.css — standalone minified distribution bundle

Run:

~~~bash
npm run build
~~~

The current manifest contains 50 local modules. A normal source change should look like:

~~~text
edit lucCORE/, lucCOMPONENTS/, lucUTILITIES/, or lucUI.source.css
            ↓
npm run build
            ↓
review lucUI.css and lucUI.min.css
~~~

Do not use a generated bundle as the source of truth. A later build overwrites manual edits.

Direct modular imports remain possible for bespoke builds:

~~~css
@import url("lucCORE/luc-variables.css");
@import url("lucCORE/luc-reset.css");
@import url("lucCORE/luc-typography.css");
@import url("lucCOMPONENTS/luc-buttons.css");
@import url("lucUTILITIES/luc-glass.css");
~~~

When importing modules directly, keep core files before components and utilities. Use the manifest/build output for a production single-file distribution.

## 3. Adopt semantic tokens

The original brand variables remain available:

~~~text
--luca-navy
--studio-gold
--designer-azure
--luca-tangerine
--bold-viridian
~~~

2.0 also provides RGB channel aliases for alpha colors:

~~~text
--luca-navy-rgb
--studio-gold-rgb
--designer-azure-rgb
--luca-tangerine-rgb
--bold-viridian-rgb
~~~

Use them like this:

~~~css
.brand-outline {
    border-color: rgba(var(--studio-gold-rgb), 0.42);
}
~~~

For surfaces and text that should follow the active theme, use semantic tokens instead of hard-coded brand primitives:

~~~css
.app-panel {
    background: var(--luc-surface);
    color: var(--luc-ink);
    border-color: var(--glass-edge);
}

.app-panel-muted {
    color: var(--luc-ink-muted);
}
~~~

Important semantic aliases in lucCORE/luc-variables.css and lucCORE/luc-themes.css include:

| Token | Role |
| --- | --- |
| --luc-canvas | Page background |
| --luc-canvas-deep | Deep background layer |
| --luc-surface | Translucent component surface |
| --luc-surface-strong | Opaque/fallback surface |
| --luc-ink | Primary readable ink |
| --luc-ink-muted | Secondary readable ink |
| --luc-accent | Active theme accent |
| --luc-accent-rgb | Active theme accent channels |
| --luc-accent-contrast | Ink intended for accent fills |
| --luc-focus-ring | Shared focus-ring color |
| --luc-selection | Text-selection color |

### Theme-token compatibility note

Early 1.x theme styles changed some primitive values (for example, the dark theme used a brighter gold and azure). In 2.0 the brand primitives are stable in the default system and theme differences are expressed primarily through semantic canvas/surface/ink tokens. If an application depended on a theme changing --studio-gold or --designer-azure, move that rule to a semantic token or add an explicit app-level override.

## 4. Typography roles

The font stack is unchanged:

- Playfair Display Black, via --font-display and weight 900, for headings and display titles
- Raleway Medium, via --font-body and weight 500, for body and interface copy
- Montserrat Light Italic, via --font-italic and weight 300, for accents

2.0 extends the role selectors. .luc-card-title, .luc-modal-title, .luc-hero-title, .luc-feature-title, .luc-pricing-title, and .luc-testimonial-title use the display face. Accent voice is available through .luc-accent-text, .luc-eyebrow, .luc-italic, blockquotes, and captions. .luc-display, .luc-text-balance, .luc-text-pretty, and .luc-measure are new composition helpers.

~~~html
<span class="luc-eyebrow">A small editorial signal</span>
<h1 class="luc-display">Make the interface memorable.</h1>
<p class="luc-measure">Raleway remains the comfortable reading voice beneath the display layer.</p>
~~~

If you self-host fonts, replace the Google Fonts import in your own typography layer while preserving the --font-display, --font-body, and --font-italic contracts.

## 5. Add Prism deliberately

Prism is opt-in. Existing .luc-card, .luc-glass, button, form, and utility markup does not need to become Prism markup.

The smallest Prism surface is:

~~~html
<article class="luc-card luc-prism" data-luc-spotlight>
    <span class="luc-kicker">New perspective</span>
    <h2 class="luc-gradient-text">Build a feeling.</h2>
    <p>Use the signature layer where the product needs a stronger point of view.</p>
</article>
~~~

lucUI.js updates pointer coordinates for .luc-prism surfaces and any element marked data-luc-spotlight. The CSS remains usable without JavaScript; it simply becomes a static prism surface.

### Prism building blocks

| Class | Purpose |
| --- | --- |
| .luc-stage / .luc-stage-content | Editorial hero or launch stage |
| .luc-prism | Reactive glass surface |
| .luc-bento / .luc-bento-item | Responsive 12-column composition |
| .luc-bento-wide, .luc-bento-half, .luc-bento-full, .luc-bento-tall | Bento placement modifiers |
| .luc-kicker | Montserrat editorial label |
| .luc-gradient-text | Prism display treatment |
| .luc-metric, .luc-metric-value, .luc-metric-label | Editorial metric block |
| .luc-code-window, .luc-code-header, .luc-code-body | Branded code panel |
| .luc-marquee, .luc-marquee-track | Infinite brand rail |
| .luc-command-backdrop and related classes | Command palette |
| .luc-theme-dock, .luc-theme-option | Theme switcher surface |
| .luc-scroll-progress | Reading progress indicator |

## 6. Use the 2.0 JavaScript/data APIs

lucUI.js exposes window.lucUI and initializes once per document after DOM ready. The current object reports lucUI.version === "2.0.0".

Useful public methods:

~~~js
lucUI.init();
lucUI.setTheme("sunrise");
lucUI.showModal(document.querySelector("#settings-modal"));
lucUI.hideModal(document.querySelector("#settings-modal"));
lucUI.createToast("Saved", "Your changes are live.", 3600, "success");
~~~

Lower-level initTheme, initModals, initDropdowns, initTabs, initAccordions, initNavbar, initReveal, initPrism, initCopy, initCommands, initCarousels, initCookieConsent, and initScrollProgress methods are also present for integrations that initialize a specific document. Most applications should call lucUI.init() once and use the data attributes below.

The library emits useful DOM events:

~~~js
document.addEventListener("luc:ready", event => {
    console.log(event.detail.version);
});

document.documentElement.addEventListener("luc:themechange", event => {
    console.log(event.detail.theme);
});

modal.addEventListener("luc:modalshow", () => {});
modal.addEventListener("luc:modalhide", () => {});
~~~

### Themes

Supported values are dark, light, midnight, and sunrise:

~~~html
<html data-theme="dark">
~~~

Add a switcher with data-luc-theme-switch:

~~~html
<div class="luc-theme-dock" aria-label="Choose a theme">
    <button type="button" data-luc-theme-switch="dark" aria-pressed="true">Dark</button>
    <button type="button" data-luc-theme-switch="light" aria-pressed="false">Light</button>
    <button type="button" data-luc-theme-switch="midnight" aria-pressed="false">Midnight</button>
    <button type="button" data-luc-theme-switch="sunrise" aria-pressed="false">Sunrise</button>
</div>
~~~

At initialization, a saved localStorage value under luc-theme takes precedence over declared data-theme; if neither exists, the system light/dark preference is used. Invalid values passed to setTheme fall back to dark. setTheme synchronizes aria-pressed, sets document color-scheme, persists the selection by default, and dispatches luc:themechange.

### Modals

The 1.x pattern of manually adding .active still renders, but the 2.0 data API is preferred:

~~~html
<button
    class="luc-btn luc-btn-primary"
    type="button"
    data-luc-toggle="modal"
    data-luc-target="#demo-modal">
    Open modal
</button>

<div class="luc-modal-backdrop" id="demo-modal" aria-hidden="true">
    <article class="luc-modal" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title" tabindex="-1">
        <header class="luc-modal-header">
            <h2 class="luc-modal-title" id="demo-modal-title">Modal title</h2>
            <button class="luc-modal-close" type="button" data-luc-dismiss="modal" aria-label="Close">×</button>
        </header>
        <div class="luc-modal-body">Modal content.</div>
    </article>
</div>
~~~

2.0 adds focus entry, a Tab focus trap, Escape dismissal, backdrop dismissal, body-scroll locking/restoration, ARIA state updates, and focus return to the trigger. Give the backdrop an ID and give the dialog a labelled title whenever possible.

### Dropdowns

~~~html
<div class="luc-dropdown">
    <button class="luc-dropdown-toggle" type="button">Actions</button>
    <div class="luc-dropdown-menu">
        <a class="luc-dropdown-item" href="/edit">Edit</a>
        <button class="luc-dropdown-item" type="button">Duplicate</button>
    </div>
</div>
~~~

The runtime keeps both .open and .active in sync for compatibility with the 1.x CSS, adds menu roles/relationships, closes other menus on open, and supports Enter/Space, Arrow keys, Home/End, and Escape. Preserve focusable a/button items so keyboard navigation can reach them.

### Tabs

~~~html
<div class="luc-tabs">
    <div class="luc-tab-list">
        <button class="luc-tab active" type="button">Overview</button>
        <button class="luc-tab" type="button">Tokens</button>
    </div>
    <section class="luc-tab-panel">Overview content.</section>
    <section class="luc-tab-panel">Token content.</section>
</div>
~~~

The runtime creates missing IDs and assigns tab, tabpanel, aria-selected, aria-controls, aria-labelledby, and aria-hidden. Inactive panels also receive the native hidden property. Arrow Left/Right, Home, and End move between tabs. data-luc-tab="0" (zero-based) can request a specific panel when button order is not the desired index.

### Accordions

Native details/summary is the recommended 2.0 form:

~~~html
<div class="luc-accordion">
    <details class="luc-accordion-item">
        <summary class="luc-accordion-trigger">What is Prism?</summary>
        <div class="luc-accordion-body">A reactive, opt-in surface language.</div>
    </details>
</div>
~~~

details works without JavaScript. For legacy 1.x markup, 2.0 still recognizes .luc-accordion-header or .luc-accordion-trigger with .luc-accordion-body/.luc-accordion-content, toggles .active, synchronizes aria-expanded, and supports the .luc-accordion-collapse one-open-at-a-time modifier. Do not add a second click handler to native summary elements.

### Toasts

Declarative trigger:

~~~html
<button
    type="button"
    data-luc-toast="Your first prism is ready to ship."
    data-luc-toast-title="lucUI says hello"
    data-luc-toast-variant="success"
    data-luc-toast-duration="3600">
    Test the feeling
</button>
~~~

Programmatic form:

~~~js
lucUI.createToast("Saved", "The draft is up to date.", 3600, "success");
~~~

Supported variants are info, success, warning, error, and gold. Durations are clamped to 1–30 seconds. Generated toasts use role=alert for errors and role=status for other variants, and include an accessible dismiss button.

### Copy buttons

~~~html
<pre id="starter-code">&lt;article class="luc-prism"&gt;...&lt;/article&gt;</pre>
<button type="button" data-luc-copy="#starter-code" data-luc-copy-success="Copied">Copy</button>
~~~

The Clipboard API is preferred, with a legacy execCommand("copy") fallback. On success, the button receives data-luc-copied="true" briefly; unavailable clipboard access is reported as data-luc-copied="false".

### Command palette

~~~html
<button type="button" data-luc-toggle="command">Search the system</button>

<div class="luc-command-backdrop" aria-hidden="true">
    <div class="luc-command" role="dialog" aria-modal="true" aria-label="lucUI command palette" tabindex="-1">
        <input class="luc-command-search" type="search" aria-label="Search lucUI showcase">
        <div class="luc-command-list" role="listbox">
            <button class="luc-command-item" type="button" data-luc-command-target="#playground">
                Open the playground
            </button>
        </div>
        <button type="button" data-luc-dismiss="command">Close</button>
    </div>
</div>
~~~

The palette supports Ctrl/⌘+K, filtering, Arrow/Home/End selection, Enter activation, Escape, backdrop dismissal, and focus trapping. Targets are CSS selectors resolved in the current document.

### Reveals, spotlight, progress, carousel, and cookie consent

These 2.0 data hooks are also available:

~~~text
.luc-reveal* + data-luc-delay="120ms"       scroll reveal
[data-luc-spotlight]                        pointer spotlight
[data-luc-scroll-progress]                  reading progress
[data-luc-cookie-key] + [data-luc-cookie="accept"]  cookie consent
~~~

Carousels use .luc-carousel, .luc-carousel-inner, .luc-carousel-item, .luc-carousel-prev, .luc-carousel-next, and .luc-carousel-indicator; the runtime adds slide ARIA state and removes inactive slide controls from the tab order.

## 7. Before/after migration recipes

### A. A plain 1.x card becomes a Prism card

~~~html
<!-- 1.x: keep this exactly as-is if the card should stay quiet -->
<div class="luc-card">
    <h2 class="luc-card-title">Hello lucUI</h2>
    <p>Beautiful glass morphism design.</p>
</div>
~~~

~~~html
<!-- 2.0: opt into the signature layer only where it adds meaning -->
<article class="luc-card luc-prism" data-luc-spotlight>
    <span class="luc-kicker">New perspective</span>
    <h2 class="luc-gradient-text">Hello lucUI</h2>
    <p>Beautiful glass morphism with a reactive authored surface.</p>
</article>
~~~

### B. A manually opened 1.x modal becomes an accessible 2.0 modal

~~~html
<!-- 1.x -->
<button onclick="document.querySelector('#demo').classList.add('active')">Open</button>
<div id="demo" class="luc-modal-backdrop active">...</div>
~~~

~~~html
<!-- 2.0 -->
<button type="button" data-luc-toggle="modal" data-luc-target="#demo">Open</button>
<div id="demo" class="luc-modal-backdrop" aria-hidden="true">
    <article class="luc-modal" role="dialog" aria-modal="true" aria-labelledby="demo-title">
        <h2 id="demo-title" class="luc-modal-title">Dialog title</h2>
        <button type="button" data-luc-dismiss="modal" aria-label="Close">×</button>
    </article>
</div>
~~~

### C. A theme override moves from primitive colors to semantic tokens

~~~css
/* 1.x-style override: couples the app to a theme's primitive implementation */
[data-theme="light"] .app-panel {
    background: rgba(255, 255, 255, 0.7);
    color: #1a2535;
}
~~~

~~~css
/* 2.0-style override: follows every supported theme */
.app-panel {
    background: var(--luc-surface);
    color: var(--luc-ink);
    border-color: var(--glass-edge);
}
~~~

### D. A source edit moves to the manifest/build flow

~~~text
1.x: edit lucUI.css and commit it

2.0: edit lucCOMPONENTS/luc-buttons.css (or lucUI.source.css)
     npm run build
     review lucUI.css and lucUI.min.css
~~~

## 8. Compatibility and behavioral changes

### Preserved

- The luc- class naming convention.
- Original core component families: buttons, cards, navbar, forms, modals, alerts, badges, glass utilities, animation utilities, spacing, and layout.
- Brand color variable names and brand font variable names.
- Existing dropdown .open and legacy accordion markup are recognized.
- Direct module imports remain possible.

### Behavioral changes to verify

- Generated CSS: lucUI.css and lucUI.min.css are build artifacts. A build regenerates them from the 50-module source manifest.
- JavaScript initialization: lucUI.js auto-initializes on DOM ready. lucUI.init() is idempotent for a document; avoid manually binding the same trigger a second time.
- Themes: saved luc-theme storage wins over a declared data-theme; unsupported names fall back to dark.
- Modals: opening a modal locks body scrolling and moves focus into the dialog; closing returns focus to the trigger.
- Dropdowns: opening one menu closes other lucUI dropdowns; outside click and Escape close menus and synchronize aria-expanded.
- Tabs: inactive panels are hidden, not merely visually hidden; map every tab to a matching panel.
- Accordions: native details is CSS-first; do not attach duplicate click behavior to summary.
- Motion: prefers-reduced-motion: reduce disables or collapses most animation, transition, marquee, stage drift, and JS spotlight/reveal motion. Keep custom motion behind the same media query.
- Contrast: bright brand fills are intended to use dark navy ink (var(--luc-accent-contrast) or var(--luca-navy)), not white text.
- Focus: component styles provide visible focus-visible states. If app CSS resets outlines, restore a visible focus indicator.
- Showcase filename: the v1 example.html showcase is replaced by tutorial.html.

## 9. Browser and integration notes

lucUI 2.0 targets current Chrome, Safari, Firefox, and Edge and requires CSS custom properties. backdrop-filter is progressively enhanced; lucUTILITIES/luc-glass.css includes an opaque --luc-surface-strong fallback for browsers without it. Blur, masking, text wrapping, and pointer lighting may look less expressive in older engines while remaining readable.

The JavaScript layer progressively degrades:

- Scroll reveals become immediately visible without IntersectionObserver or when reduced motion is requested.
- Pointer lighting is skipped when reduced motion is requested.
- Copy uses navigator.clipboard first and a legacy execCommand fallback second.
- Storage failures are ignored safely; theme switching still works for the current page.

## 10. Launch checklist

- [ ] Update CDN/npm references to 2.0.0.
- [ ] Add lucUI.js with defer if the page uses interactive behavior.
- [ ] Run npm run build after every source/module change.
- [ ] Do not hand-edit generated lucUI.css or lucUI.min.css.
- [ ] Move app surfaces/text to --luc-surface, --luc-ink, and related semantic tokens.
- [ ] Keep brand primitives for brand accents and fills.
- [ ] Add data-theme/theme-switch buttons only with supported values.
- [ ] Give modal backdrops IDs, dialogs labels, and dismiss controls accessible names.
- [ ] Check dropdown and tab controls with keyboard only.
- [ ] Prefer native details accordions or verify legacy accordion headers do not have duplicate listeners.
- [ ] Test dark, light, midnight, and sunrise themes.
- [ ] Test prefers-reduced-motion: reduce.
- [ ] Test copy fallback in a non-secure or clipboard-blocked context.
- [ ] Test responsive navbar, command palette, modal, toast, and Prism surfaces on a narrow viewport.
- [ ] Verify node --check lucUI.js, npm run build, and git diff --check before release.

## Source map

| Concern | Current source |
| --- | --- |
| Design tokens | lucCORE/luc-variables.css |
| Themes | lucCORE/luc-themes.css |
| Brand typography | lucCORE/luc-typography.css |
| Source manifest | lucUI.source.css |
| Build/minifier | scripts/build.js |
| Runtime interactions | lucUI.js |
| Prism system | lucCOMPONENTS/luc-signature.css |
| Launch showcase | tutorial.html |

