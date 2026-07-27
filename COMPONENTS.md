# lucUI 2.0 Component Reference

This is the practical API reference for the component styles in `lucCOMPONENTS/` and the interactions shipped in `lucUI.js` v2.0.0. It documents the framework as it exists today: class names, required DOM relationships, supported state classes, data attributes, and the behavior the JavaScript layer actually provides.

## Include lucUI

Use the complete bundle for every component, utility, and theme:

```html
<link rel="stylesheet" href="lucUI.css">
<script src="lucUI.js"></script>
```

The script initializes automatically when the DOM is ready and exposes `window.lucUI`. CSS-only projects can omit the script, but the controls marked **JS** below will not receive behavior.

For modular builds, load the core files before individual component files. Keep `lucCORE/luc-variables.css`, `lucCORE/luc-reset.css`, `lucCORE/luc-typography.css`, and `lucCORE/luc-base.css` ahead of component modules so their tokens and foundations are available.

## API conventions

- Every component starts with a `luc-` base class. Add modifier classes to that same element unless a row says otherwise.
- `active`, `open`, `selected`, `completed`, `featured`, `unread`, `collapsed`, `dragover`, `error`, `success`, `loading`, and `removing` are state classes, not data attributes.
- Use native elements (`button`, `a`, `input`, `details`, `summary`, `table`) whenever possible. lucUI styles them without replacing their semantics.
- **CSS** means lucUI supplies presentation only. Your application owns state changes and behavior.
- **JS** means `lucUI.js` discovers the listed hooks and wires the interaction automatically.
- The complete bundle supports `dark`, `light`, `midnight`, and `sunrise` themes through `data-theme` on the document element.

## JavaScript hooks

| Feature | Required hook | Optional attributes / state | What lucUI does |
|---|---|---|---|
| Theme switch | `[data-luc-theme-switch="dark"]` | Values: `dark`, `light`, `midnight`, `sunrise` | Sets `<html data-theme>`, updates `aria-pressed`, saves `luc-theme` in local storage, and emits `luc:themechange`. |
| Modal | `[data-luc-toggle="modal"][data-luc-target="#id"]` | `[data-luc-dismiss="modal"]` | Opens/closes the target, traps focus, supports Escape/backdrop dismissal, locks body scroll, restores focus, and manages dialog ARIA. |
| Accordion | `.luc-accordion-header` or `.luc-accordion-trigger` inside `.luc-accordion-item` | `.luc-accordion-collapse`; body may be `.luc-accordion-body` or `.luc-accordion-content` | Toggles legacy non-`details` items, adds keyboard support/ARIA, and optionally keeps one item open. Native `details` also honors collapse mode. |
| Dropdown | `.luc-dropdown-toggle` inside `.luc-dropdown` with `.luc-dropdown-menu` | `.luc-dropdown-item`; initial `.open` or `.active` | Toggles the menu, closes peers/outside clicks, supports Escape and arrow/Home/End navigation, and adds menu ARIA. |
| Tabs | `.luc-tabs`, `.luc-tab`, `.luc-tab-panel` in matching DOM order | `data-luc-tab="0"` can override a tab's target index | Activates one panel, generates IDs/ARIA, and supports Left/Right/Home/End keys. |
| Navbar | `.luc-navbar-toggle`, `.luc-navbar-mega-trigger`, `.luc-navbar-user-avatar` | Matching `.luc-navbar-links`, `.luc-navbar-mega-content`, `.luc-navbar-user-dropdown` | Handles mobile, mega, and user menus; closes them outside/on Escape; adds `.scrolled` after 20px. |
| Reveal | `.luc-reveal` or `.luc-reveal-{up,down,left,right,scale,rotate,blur}` | `data-luc-delay="120ms"` | Adds `.visible` on intersection; reveals immediately when reduced motion is requested or observers are unavailable. |
| Prism spotlight | `.luc-prism` or `[data-luc-spotlight]` | None | Updates pointer and local spotlight CSS variables unless reduced motion is requested. |
| Copy | `[data-luc-copy="#source"]` | `data-luc-copy-success="Copied"` | Copies the target's `value` or text, temporarily sets `data-luc-copied="true"`, and updates the button label. |
| Toast trigger | `[data-luc-toast="Message"]` | `data-luc-toast-title`, `data-luc-toast-message`, `data-luc-toast-variant`, `data-luc-toast-duration` | Creates and later dismisses a toast. Variants: `info`, `success`, `warning`, `error`, `gold`; duration is clamped to 1–30 seconds. |
| Command palette | `[data-luc-toggle="command"]` plus one `.luc-command-backdrop` | `[data-luc-dismiss="command"]`, `data-luc-command-target="#section"` | Opens with the trigger or Ctrl/Command+K, filters options, supports arrows/Home/End/Enter/Escape, traps focus, and scrolls to selected targets. |
| Carousel | `.luc-carousel` with `.luc-carousel-inner` and `.luc-carousel-item` | `.luc-carousel-prev`, `.luc-carousel-next`, `.luc-carousel-indicator` | Cycles slides, updates focusability/ARIA, and supports controls, indicators, and Left/Right keys. |
| Cookie consent | `.luc-cookie-banner` | `data-luc-cookie-key`; accept control `[data-luc-cookie="accept"]` | Hides a previously accepted banner and stores `accepted` in local storage. |
| Scroll progress | `[data-luc-scroll-progress]` | Add `role="progressbar"` for automatic ARIA values | Updates `--luc-scroll-progress` and, for progressbars, `aria-valuenow`. |

### Public JavaScript methods and events

```js
lucUI.setTheme('sunrise');
lucUI.showModal(document.querySelector('#dialog'));
lucUI.hideModal(document.querySelector('#dialog'));
lucUI.createToast('Saved', 'Your changes are live.', 3600, 'success');
```

`lucUI.init(document)` initializes an uninitialized document once. The library emits:

- `luc:ready` on `document` with `{ version }`.
- `luc:themechange` on `<html>` with `{ theme }`.
- `luc:modalshow` and `luc:modalhide` on the modal target.

## Actions and feedback

| Module | Required markup hooks | Variants and states | Behavior and accessibility |
|---|---|---|---|
| `luc-buttons.css` | `.luc-btn` on a `button` or link; `.luc-btn-text` may wrap its label | Color: `luc-btn-primary`, `-azure`, `-tangerine`, `-viridian`, `-transparency`, `-outline`, `-outline-azure`, `-outline-tangerine`, `-outline-viridian`, `-ghost`; size/layout: `-sm`, `-lg`, `-full`, `-icon`, `-icon-sm`, `-icon-lg`; state: `loading`, native `disabled`; group: `.luc-btn-group` and optional `.vertical` | CSS. Icon-only buttons need an `aria-label`. Use `disabled` and `aria-busy="true"` when loading; lucUI does not start or stop loading state. |
| `luc-alerts.css` | `.luc-alert` with optional `.luc-alert-icon`, `.luc-alert-content`, `.luc-alert-title`, `.luc-alert-message`, `.luc-alert-close` | `luc-alert-info`, `-success`, `-warning`, `-error`, `-gold`; `-sm`, `-lg`, `-dismissible` | CSS. Add `role="status"` for routine updates or `role="alert"` for urgent ones. `.luc-alert-close` is styled only; wire dismissal yourself and label the button. |
| `luc-modals.css` | `.luc-modal-backdrop` containing `.luc-modal`; optional `.luc-modal-header`, `-title`, `-close`, `-body`, `-footer` | Modal `luc-modal-sm`, `-lg`, `-xl`; backdrop `fade` or `slide`; open state `active` | JS. Open with `data-luc-toggle="modal"`/`data-luc-target` and close with `data-luc-dismiss="modal"`. Give the dialog a label through `aria-labelledby` or `aria-label`; JS manages focus, Escape, scroll lock, and dialog state. |
| `luc-badges.css` | `.luc-badge` | `-gold`, `-azure`, `-tangerine`, `-viridian`, `-navy`; `-sm`, `-lg`, `-dot`, `-pill`, `-square`, `-outline`, `-solid` | CSS. Do not rely on color alone for status meaning. |
| `luc-chips.css` | `.luc-chip`; optional `.luc-chip-close` child | `luc-chip-primary` | CSS. Removal is application-owned. Use a real button with a label such as “Remove Design”. |
| `luc-tooltips.css` | `.luc-tooltip[data-tooltip="…"]` wrapping the trigger | Position `luc-tooltip-bottom`, `-left`, `-right` (top is default); color `luc-tooltip-gold`, `-azure` | CSS. Appears on hover or focus-within. Pseudo-element text is not a dependable accessible description, so also provide an accessible name or a real `role="tooltip"` element connected with `aria-describedby`. |
| `luc-loader.css` | `.luc-loader-spinner`, or `.luc-loader-glass` containing three `.luc-loader-bar` elements | Spinner or three-bar loader | CSS. Mark a decorative loader `aria-hidden="true"`; otherwise place it in a named `role="status"` and expose loading text. |
| `luc-progress.css` | `.luc-progress` containing `.luc-progress-bar`; set fill width in CSS/inline style | Color: `-azure`, `-tangerine`, `-viridian`, `-error`; size: `-sm`, `-lg`, `-xl`; `-striped`, `-animated`, `-indeterminate`; label helpers `.luc-progress-group`, `.luc-progress-label`, `-label-text`, `-label-value` | CSS. For determinate progress, add `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` to the track. Omit `aria-valuenow` when indeterminate. |
| `luc-skeleton.css` | `.luc-skeleton` plus a shape class | `-text`, `-text-short`, `-heading`, `-avatar`, `-avatar-sm`, `-avatar-lg`, `-image`, `-image-sm`, `-image-lg`, `-button`, `-button-sm`, `-button-lg`, `-badge`, `-card`, `-paragraph`, `-row`; `luc-skeleton-pulse` | CSS. Put `aria-busy="true"` on the loading region and hide purely visual skeleton blocks from assistive technology. |
| `luc-toasts.css` | Usually generated by JS. Manual markup uses `.luc-toast-container` > `.luc-toast` > `.luc-toast-content`, `.luc-toast-title`, `.luc-toast-message`, `.luc-toast-close`, `.luc-toast-progress`; `.luc-toast-icon` is optional | Toast: `-info`, `-success`, `-warning`, `-error`, `-gold`; container: `-top-right`, `-top-left`, `-top-center`, `-bottom-right`, `-bottom-left`, `-bottom-center`; state `removing` | JS trigger/API supported. Generated containers use `aria-live="polite"`; generated errors use `role="alert"`, others `role="status"`. |
| `luc-notifications.css` | `.luc-notification-center` with `-header`, `-title`, `-list`; each `.luc-notification-item` may contain `-dot`, `-content`, `-text`, `-time` | Center `active`; item `unread` | CSS. Opening, closing, reading, and focus movement are application-owned. Use a named dialog/region and semantic buttons or links for interactive items. |

## Navigation and disclosure

| Module | Required markup hooks | Variants and states | Behavior and accessibility |
|---|---|---|---|
| `luc-navbar.css` | `.luc-navbar` > `.luc-navbar-container`; common children `.luc-navbar-brand`, `.luc-navbar-links`, `.luc-navbar-link`, `.luc-navbar-toggle` | Link `active`/`aria-current="page"`; nav `scrolled`; menu `active`; extras `.luc-navbar-accent`, `-search`, `-search-input`, `-search-icon`, `-user`, `-user-avatar`, `-user-dropdown`, `-user-item`, `-user-divider`, `-mega`, `-mega-trigger`, `-mega-content`, `-mega-grid`, `-mega-column`, `-mega-item`, `-mega-item-icon` | JS. Use a labeled `nav`; make toggles/buttons actual buttons. Keep `.luc-navbar-user-dropdown` in the avatar's parent and `.luc-navbar-mega-content` inside or immediately after its trigger. |
| `luc-breadcrumbs.css` | `.luc-breadcrumb` > `.luc-breadcrumb-list` > `.luc-breadcrumb-item` > `.luc-breadcrumb-link` | `luc-breadcrumb-glass`, `-chevron`, `-dot`; current item `active` or link `aria-current="page"` | CSS. Prefer `<nav aria-label="Breadcrumb"><ol>…</ol></nav>`. |
| `luc-dropdowns.css` | `.luc-dropdown` containing `.luc-dropdown-toggle` and `.luc-dropdown-menu`; items use `.luc-dropdown-item` | Wrapper `open`/`active`; `.luc-dropdown-menu-right`, `.luc-dropdown-item-danger`, `.luc-dropdown-item-icon`, `.luc-dropdown-divider`, `.luc-dropdown-header` | JS. Native button toggles and link/button items give the best semantics. JS adds menu roles and keyboard navigation. |
| `luc-tabs.css` | `.luc-tabs` containing `.luc-tab-list`, matching `.luc-tab` controls, and `.luc-tab-panel` panels in the same order | Active control/panel `active`; list `luc-tab-list-pill` or `luc-tab-list-underline`; optional numeric `data-luc-tab` | JS. IDs, roles, selection, focus order, hidden panels, and keyboard navigation are synchronized automatically. |
| `luc-accordion.css` | Preferred: `.luc-accordion` > `details.luc-accordion-item` > `summary.luc-accordion-trigger` + `.luc-accordion-body`. Legacy div markup may use `.luc-accordion-header`/`.luc-accordion-trigger` and `.luc-accordion-body`/`.luc-accordion-content` | `luc-accordion-flush`; `luc-accordion-collapse`; legacy item `active`; native item `open` | Native `details` works without JS. JS adds single-open behavior in collapse mode and preserves the legacy API with ARIA/keyboard support. |
| `luc-carousel.css` | `.luc-carousel` > `.luc-carousel-inner` > `.luc-carousel-item`; optional `.luc-carousel-caption`, `.luc-carousel-control.luc-carousel-prev`, `.luc-carousel-control.luc-carousel-next`, `.luc-carousel-indicators` and `.luc-carousel-indicator` | Current item/indicator `active` | JS. Give the carousel an `aria-label`; use buttons for controls/indicators. JS hides inactive slides from accessibility and removes their controls from tab order. |
| `luc-pagination.css` | `.luc-pagination` > `.luc-page-item` > `.luc-page-link` | Item `active` or `disabled` | CSS. Put the list in `<nav aria-label="Pagination">`; current links need `aria-current="page"`. For disabled controls use a button with `disabled`, or remove link navigation and add `aria-disabled="true"`. |
| `luc-sidebar.css` | `.luc-sidebar` with `.luc-sidebar-header`, `.luc-sidebar-nav`, and `.luc-sidebar-link` | Sidebar `collapsed`; link `active` | CSS. Your application owns the collapse trigger and state. Use `nav`/list markup, `aria-current`, and synchronize the trigger's `aria-expanded`. |

## Forms and input

| Module | Required markup hooks | Variants and states | Behavior and accessibility |
|---|---|---|---|
| `luc-forms.css` | `.luc-form-group`, `.luc-label`, and native `.luc-input`, `.luc-textarea`, or `.luc-select`; `.luc-checkbox-group`/`.luc-checkbox`; `.luc-radio-group`/`.luc-radio` | Control/helper states `error`, `success`; `.luc-helper-text`; floating group `.luc-form-group-floating` requires the control immediately before `.luc-label`; input groups `.luc-input-group`, `-prepend`, `-append`, optional `-vertical` | CSS/native behavior. Pair every label with `for`/`id`; use `aria-describedby` for helper text and `aria-invalid="true"` for errors. State classes alone do not validate input. |
| `luc-toggle.css` | `<label class="luc-toggle">` containing `.luc-toggle-input` immediately followed by `.luc-toggle-track`, which contains `.luc-toggle-thumb` | Native checked/unchecked state | CSS/native checkbox. Keep an accessible text label visible or in `.luc-sr-only`; do not replace the input with a div. |
| `luc-rangeslider.css` | `.luc-range-container` containing `input[type="range"].luc-range-slider` | Native `min`, `max`, `step`, `value` | CSS/native range behavior. Associate a label and expose the current value when it is not otherwise clear. |
| `luc-fileupload.css` | `.luc-upload-zone` with optional `.luc-upload-icon`, `.luc-upload-text`, `.luc-upload-subtext`; include a native file input | Zone state `dragover` | CSS. Click, drag/drop, previews, and upload are not implemented. A label wrapping the input is the simplest accessible trigger; do not hide the input with `display:none` if it must receive focus. |
| `luc-search.css` | `.luc-search-container` with `.luc-search-input`, optional `.luc-search-icon`, and `.luc-search-results` containing `.luc-search-item` | Results `active` | CSS. Filtering, selection, and autocomplete ARIA are not implemented. For suggestions, your app must manage combobox/listbox roles, active descendant, keyboard navigation, and result visibility. |
| `luc-datepicker.css` | `.luc-datepicker` containing an input and `.luc-datepicker-calendar`; calendar uses `.luc-calendar-header`, `.luc-calendar-grid`, `.luc-calendar-day-name`, `.luc-calendar-day` | Calendar `active`; day `selected` | CSS. Date calculation, opening, selection, localization, focus, and keyboard behavior are not implemented. Prefer native `input[type="date"]` unless you supply a complete accessible date-picker controller. |

## Content and data display

| Module | Required markup hooks | Variants and states | Behavior and accessibility |
|---|---|---|---|
| `luc-cards.css` | `.luc-card`; optional `.luc-card-header`, `-title`, `-subtitle`, `-body`, `-footer`, `-content`, and image helpers | `luc-card-sm`, `-lg`, `-horizontal`, `-media`, `-overlay`, `-clickable`, `luc-card-transparency`; `.luc-card-image`, `-image-top`, `-image-bottom`, `-overlay-content`; `.luc-glow-spot` and optional `.center` | CSS. A clickable card still needs one semantic link/button; do not make a non-focusable div the only control. Images require appropriate alt text. |
| `luc-datatables.css` | `.luc-table-container` around `table.luc-table` | `luc-table-striped` on the table | CSS. No sorting/filtering/pagination logic is included. Use `<caption>`, `th scope`, and accessible sort buttons if your app adds sorting. |
| `luc-avatar.css` | `.luc-avatar`, normally containing an image; optional `.luc-avatar-status` | Size `luc-avatar-sm`, `-md`, `-lg`; status child `online`, `offline`, `away`, `busy` | CSS. Use meaningful image alt text or empty alt for decorative/repeated portraits. Status color needs accompanying text, including visually hidden text when necessary. |
| `luc-gallery.css` | `.luc-gallery` > `.luc-gallery-item` containing an image and optional `.luc-gallery-overlay`/`.luc-gallery-caption` | Hover presentation | CSS. No lightbox behavior ships. Use links/buttons and implement dialog behavior if images open. |
| `luc-testimonials.css` | `.luc-testimonial-card`, `.luc-testimonial-quote`, `.luc-testimonial-author`, optional `-author-img`, `-author-name`, `-author-title` | None | CSS. Prefer `blockquote`, `footer`, and `cite` semantics; give portraits appropriate alt text. |
| `luc-pricing.css` | `.luc-pricing-grid` > `.luc-pricing-card`; content helpers `.luc-pricing-title`, `-price`, `-features`, `-feature` | Card `featured` | CSS. Identify the recommended plan in text, not only through visual emphasis. |
| `luc-features.css` | `.luc-features-grid` > `.luc-feature-card`; optional `.luc-feature-icon`, `-title`, `-description` | None | CSS. Mark decorative icons `aria-hidden="true"`; preserve heading order. |
| `luc-usercard.css` | `.luc-user-card`; optional `.luc-user-card-banner`, `-avatar`, `-name`, `-role`, `-bio`, `-stats`, `-stat-val`, `-stat-lbl` | None | CSS. Use headings/list semantics where appropriate and meaningful avatar alt text. |
| `luc-timeline.css` | `.luc-timeline` > `.luc-timeline-item`; content `.luc-timeline-badge`, `-title`, `-time`, `-body` | None | CSS. An ordered list and native `<time datetime>` preserve chronology for assistive technology. |
| `luc-stepper.css` | `.luc-stepper` > `.luc-step`; each step may contain `.luc-step-circle` and `.luc-step-label` | Step `active` or `completed` | CSS. Your app owns progression. Expose the current step with text/`aria-current="step"`; do not communicate completion only through color. |

## Layout and marketing

| Module | Required markup hooks | Variants and states | Behavior and accessibility |
|---|---|---|---|
| `luc-hero.css` | `.luc-hero` > `.luc-hero-content`; optional `.luc-hero-title`, `-subtitle`, `-actions` | None | CSS. Keep exactly one page-level `h1` and use links/buttons for calls to action. |
| `luc-footer.css` | `.luc-footer`; optional `.luc-footer-grid`, `.luc-footer-col`, `.luc-footer-links`, `.luc-footer-bottom` | None | CSS. Use the native `footer` element and label multiple link groups with headings. |
| `luc-divider.css` | Component form: `.luc-divider` and optional `.luc-divider-text` | The complete bundle also supplies `.luc-divider-gold`, `.luc-divider-vertical`, and `.luc-divider-label` from general utilities | CSS. In the complete bundle the later general-utility `.luc-divider` rule is the canonical line divider. Use `.luc-divider-label` for a labeled divider; `.luc-divider-text` is primarily useful when importing this component module alone. Decorative dividers should be hidden from assistive technology. |
| `luc-cookieconsent.css` | `.luc-cookie-banner` with `.luc-cookie-text`, `.luc-cookie-actions`, and an accept control | `data-luc-cookie-key` and `[data-luc-cookie="accept"]` | JS handles acceptance only. Consent categories, rejection, withdrawal, expiry, and legal copy remain application responsibilities. |

## Signature system (`luc-signature.css`)

The 2.0 signature module groups the Prism-specific composition primitives and several optional interactions.

| Primitive | Required hooks | Modifiers / behavior | Accessibility notes |
|---|---|---|---|
| Editorial stage | `.luc-stage` with optional `.luc-stage-content` | Atmospheric hero/canvas; animated drift respects reduced motion | Use normal section and heading semantics inside it. |
| Kicker / gradient text | `.luc-kicker`, `.luc-gradient-text` | Presentation only | The gradient class keeps actual text in the DOM. Check contrast when overriding its colors. |
| Prism surface | `.luc-prism`; optional `data-luc-spotlight` | JS updates pointer-reactive light variables | The light is decorative. Do not encode state only in the spotlight. |
| Bento grid | `.luc-bento` > `.luc-bento-item` | Item `luc-bento-wide`, `-half`, `-full`, `-tall` | CSS reflows at 900px and 640px. DOM order should match reading order. |
| Metric | `.luc-metric`, `.luc-metric-value`, `.luc-metric-label` | Presentation only | Put the value and label in a meaningful phrase/order. |
| Code window | `.luc-code-window`, `.luc-code-header`, `.luc-code-body`; optional `.luc-code-dots`, `.luc-code-title`, syntax helpers `-keyword`, `-string`, `-comment` | `.luc-copy-button` can use `data-luc-copy="#id"` | Use `pre > code`; label copy buttons and make decorative window dots hidden. |
| Marquee | `.luc-marquee` > `.luc-marquee-track` > repeated `.luc-marquee-item` | Infinite rail; animation stops for reduced motion | Duplicate the sequence for continuity, but mark the duplicate `aria-hidden="true"`. |
| Command palette | `.luc-command-backdrop` > `.luc-command`; input `.luc-command-search`; list `.luc-command-list`; options `.luc-command-item` | JS hooks `data-luc-toggle="command"`, `data-luc-dismiss="command"`, `data-luc-command-target`; optional `.luc-command-empty`, `.luc-kbd` | JS supplies dialog/combobox/listbox roles and full keyboard operation. Give the dialog and search input accessible labels. Only the first palette on the page is initialized. |
| Theme dock | `.luc-theme-dock` > `.luc-theme-option` | Each option needs `data-luc-theme-switch`; set `--luc-theme-swatch` to customize its swatch | Use buttons with theme-specific accessible labels. JS manages `aria-pressed`. |
| Reading progress | `.luc-scroll-progress[data-luc-scroll-progress]` | JS drives `--luc-scroll-progress` | Add `role="progressbar"` and an `aria-label` when the progress is useful information; otherwise keep it decorative. |

## Interactive recipes

### Accessible modal

The trigger's `data-luc-target` must be a valid selector for the backdrop or modal target.

```html
<button class="luc-btn luc-btn-primary"
        type="button"
        data-luc-toggle="modal"
        data-luc-target="#welcome-modal">
  Open welcome
</button>

<div class="luc-modal-backdrop" id="welcome-modal" aria-hidden="true">
  <section class="luc-modal" aria-labelledby="welcome-title">
    <header class="luc-modal-header">
      <h2 class="luc-modal-title" id="welcome-title">Welcome to lucUI</h2>
      <button class="luc-modal-close"
              type="button"
              data-luc-dismiss="modal"
              aria-label="Close welcome dialog">×</button>
    </header>
    <div class="luc-modal-body"><p>Build an interface with a point of view.</p></div>
    <footer class="luc-modal-footer">
      <button class="luc-btn luc-btn-primary" type="button" data-luc-dismiss="modal">Continue</button>
    </footer>
  </section>
</div>
```

### Native accordion

This form works without JavaScript. Adding `.luc-accordion-collapse` makes it single-open when `lucUI.js` is present.

```html
<div class="luc-accordion luc-accordion-collapse">
  <details class="luc-accordion-item">
    <summary class="luc-accordion-trigger">What is Prism?</summary>
    <div class="luc-accordion-body">lucUI's reactive surface language.</div>
  </details>
  <details class="luc-accordion-item">
    <summary class="luc-accordion-trigger">Does it respect reduced motion?</summary>
    <div class="luc-accordion-body">Yes. Motion-heavy effects are reduced automatically.</div>
  </details>
</div>
```

### Dropdown menu

```html
<div class="luc-dropdown">
  <button class="luc-btn luc-btn-transparency luc-dropdown-toggle" type="button">
    Actions
  </button>
  <div class="luc-dropdown-menu">
    <button class="luc-dropdown-item" type="button">Duplicate</button>
    <button class="luc-dropdown-item" type="button">Archive</button>
    <div class="luc-dropdown-divider" role="separator"></div>
    <button class="luc-dropdown-item luc-dropdown-item-danger" type="button">Delete</button>
  </div>
</div>
```

### Tabs

Tab and panel order must match. One `.luc-tab` may start with `active`.

```html
<div class="luc-tabs">
  <div class="luc-tab-list luc-tab-list-pill" aria-label="Project views">
    <button class="luc-tab active" type="button">Overview</button>
    <button class="luc-tab" type="button">Activity</button>
  </div>
  <section class="luc-tab-panel active">Overview content</section>
  <section class="luc-tab-panel">Activity content</section>
</div>
```

### Carousel

```html
<section class="luc-carousel" aria-label="Featured work" tabindex="0">
  <div class="luc-carousel-inner">
    <article class="luc-carousel-item active" id="work-one">First project</article>
    <article class="luc-carousel-item" id="work-two">Second project</article>
  </div>
  <button class="luc-carousel-control luc-carousel-prev" type="button">←</button>
  <button class="luc-carousel-control luc-carousel-next" type="button">→</button>
  <div class="luc-carousel-indicators">
    <button class="luc-carousel-indicator active" type="button"></button>
    <button class="luc-carousel-indicator" type="button"></button>
  </div>
</section>
```

### Theme switcher and Prism surface

```html
<div class="luc-theme-dock" aria-label="Interface theme">
  <button class="luc-theme-option" type="button"
          data-luc-theme-switch="dark"
          aria-label="Use dark theme"></button>
  <button class="luc-theme-option" type="button"
          data-luc-theme-switch="light"
          aria-label="Use light theme"></button>
  <button class="luc-theme-option" type="button"
          data-luc-theme-switch="midnight"
          aria-label="Use midnight theme"></button>
  <button class="luc-theme-option" type="button"
          data-luc-theme-switch="sunrise"
          aria-label="Use sunrise theme"></button>
</div>

<article class="luc-card luc-prism" data-luc-spotlight>
  <span class="luc-kicker">New perspective</span>
  <h2 class="luc-gradient-text">Build a feeling.</h2>
</article>
```

### Copy button

```html
<pre class="luc-code-body" id="install-command"><code>npm install lucui-css-framework</code></pre>
<button class="luc-copy-button"
        type="button"
        data-luc-copy="#install-command"
        data-luc-copy-success="Install command copied"
        aria-label="Copy install command">
  Copy
</button>
```

### Toasts

Declarative trigger:

```html
<button class="luc-btn luc-btn-primary"
        type="button"
        data-luc-toast="Your changes are live."
        data-luc-toast-title="Published"
        data-luc-toast-variant="success"
        data-luc-toast-duration="4200">
  Publish
</button>
```

Programmatic toast:

```js
lucUI.createToast('Published', 'Your changes are live.', 4200, 'success');
```

### Command palette

```html
<button type="button" data-luc-toggle="command">Jump to… <kbd class="luc-kbd">⌘K</kbd></button>

<div class="luc-command-backdrop" aria-hidden="true">
  <section class="luc-command" aria-label="Page navigation">
    <input class="luc-command-search" type="search" aria-label="Filter destinations">
    <div class="luc-command-list">
      <button class="luc-command-item" type="button" data-luc-command-target="#components">Components</button>
      <button class="luc-command-item" type="button" data-luc-command-target="#themes">Themes</button>
    </div>
    <button class="luc-copy-button" type="button" data-luc-dismiss="command">Close</button>
  </section>
</div>
```

### Cookie acceptance

```html
<aside class="luc-cookie-banner" data-luc-cookie-key="site-cookie-v1" aria-label="Cookie notice">
  <p class="luc-cookie-text">We use essential storage to remember your preferences.</p>
  <div class="luc-cookie-actions">
    <button class="luc-btn luc-btn-primary" type="button" data-luc-cookie="accept">Accept</button>
  </div>
</aside>
```

## Accessibility checklist

- Preserve native semantics even when a class can style a generic element.
- Give every icon-only button, dialog, navigation landmark, carousel, and interactive region an accessible name.
- Connect form labels, helper text, errors, and validation state with `for`, `aria-describedby`, and `aria-invalid`.
- Use `aria-current` for current navigation/page/step state and native `disabled` where available.
- Add text equivalents for status dots, colors, loaders, skeletons, and progress.
- Keep DOM order equal to visual reading order in bento grids, galleries, steppers, and responsive layouts.
- Test all controls with Tab, Shift+Tab, Enter, Space, Escape, and arrow keys where applicable.
- Test at 200–400% zoom, with reduced motion, in forced-colors/high-contrast modes, and with a screen reader before production.
- CSS-only shells still need application logic: alert/chip dismissal, uploads, search autocomplete, date picking, notification panels, sidebars, gallery lightboxes, steppers, and data-table operations are not JavaScript features in lucUI 2.0.
