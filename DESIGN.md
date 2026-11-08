# Design System — Sita Ram Prasad Memorial Trust Hospital

This document describes the design system **as it currently exists in the code**. It is documentation only, not a redesign. Every value below is copied from the actual source files. Where a page differs from Home, both values are listed and Home's value is marked.

Source of truth for the base system: `index.html` (Home) and the stylesheets it loads — `styles.css`, `navigation.css`, `hospital.css`, `home.css`. Page-specific patterns come from the other pages and their CSS, used only where Home does not cover them.

If something could not be determined from the code it is marked **[unclear]**.

---

## 1. Overview

### What the site is
A static marketing website for Sita Ram Prasad Memorial Trust Hospital. No framework, no build step, no package manager. Pages are standalone HTML that share stylesheets and scripts via relative paths. (Source: `README.md`.)

### Page list
| Page | File | `<body>` class |
|---|---|---|
| Home | `index.html` | `home-page` |
| About | `about.html` | `about-page` |
| Departments | `departments.html` | `departments-page` |
| Services | `services.html` | `services-page` |
| Contact | `contact.html` | `contact-page` |
| Blog / Journal | `blog.html` | `blog-page` |
| Quality & Safety | `quality-safety.html` | `quality-page` |
| Find your care team | `our-people.html` | `our-people-page` |
| Book an appointment | `appointments.html` | `appointments-page` |
| Plan your visit | `plan-your-visit.html` | `plan-your-visit-page` |
| Patient support | `patient-support.html` | `patient-support-page` |
| Billing & insurance | `billing.html` | `billing-page` |
| Patient resources | `patient-resources.html` | `patient-resources-page` |
| Careers | `careers.html` | `careers-page` |
| Emergency | `emergency.html` | `emergency-page` |
| Privacy | `privacy.html` | `privacy-page` |
| Terms | `terms.html` | `terms-page` |
| Accessibility | `accessibility.html` | `accessibility-page` |
| Not found (404) | `404.html` | `not-found-page` |
| Department template | `department-template.html` | `department-template-page` |
| Article template | `article-template.html` | `blog-page article-template-page` |

New-page notes (all reuse existing classes; no page-specific CSS files were needed):
- `our-people.html` — doctor grid; hero reuses the About hero pattern; cards reuse the Home journal-card overlay; the speciality filter reuses the Departments `.department-search` input styling (custom button + listbox). Loads `our-people.css` and `our-people.js`.
- `appointments.html` — request form reuses `contact.html` `.contact-form` classes (loads `contact.css`); reuses the appointments short hero + bordered notice (`.appointments-hero`, `.appointments-emergency`). Loads `appointments.css` and `appointments.js`. Form does not send data (mailto draft with empty inbox).
- `plan-your-visit.html` — short hero + FAQ accordion (`.appointments-hero`, `.contact-questions`, `.contact-faq-list`). Loads `contact.css` + `appointments.css`.
- `patient-support.html` — short hero + `.contact-links` rows + FAQ accordion. Loads `contact.css` + `appointments.css`.
- `billing.html` — short hero + FAQ accordion + `.contact-links` rows (no payment form). Loads `contact.css` + `appointments.css`.
- `emergency.html` — short hero + bordered notice (`.appointments-emergency`) + FAQ accordion. Loads `contact.css` + `appointments.css`.
- `patient-resources.html`, `careers.html` — short hero + `.contact-links` rows (placeholders → `#`); careers also uses the bordered notice line for "no openings". Load `contact.css` + `appointments.css`.
- `privacy.html`, `terms.html`, `accessibility.html` — short hero + FAQ accordion containing heading/paragraph placeholders only (no legal text). Load `contact.css` + `appointments.css`.
- `404.html` — short hero + `.contact-links` (Home, Departments). Loads `contact.css` + `appointments.css`.
- `department-template.html` — featured department block (`.featured-*`) + Home team-card grid. Loads `contact.css` + `appointments.css` + `departments.css`.
- `article-template.html` — Journal title/meta + `.featured-image` hero + `.featured-copy` body. Loads `blog.css` + `appointments.css`.

### What each file does (from `README.md`)
- `styles.css` — shared layout, type, colors, common components.
- `navigation.css` — desktop and mobile navigation.
- `hospital.css` — hospital identity and shared content refinements (loaded last, overrides the above).
- `home.css`, `about.css`, `departments.css`, `services.css`, `contact.css`, `blog.css`, `quality-safety.css` — page-specific styles.
- `navigation.js` — shared navigation behavior.
- `app.js`, `departments.js`, `services.js`, `contact.js`, `blog.js`, `quality-safety.js` — page interactions.
- `assets/` — logos, photography, illustrations, icons, local fonts.

### How files are loaded
Stylesheet order is the same on every page, with the page-specific sheet inserted **second** (after `styles.css`), before `navigation.css` and `hospital.css`:

```html
<link rel="stylesheet" href="styles.css?v=screen-rhythm-3">
<link rel="stylesheet" href="<page>.css?v=...">   <!-- page-specific; absent on Home? see below -->
<link rel="stylesheet" href="navigation.css?v=srp-1">
<link rel="stylesheet" href="hospital.css?v=srp-1">
```

- **Home (`index.html`)** loads, in order: `styles.css`, `navigation.css`, `hospital.css`, `home.css` (Home puts its page sheet *last*, unlike other pages which put it second). Cache-busting query strings differ per file/page (e.g. `styles.css?v=screen-rhythm-3`, `departments.css?v=5`, `home.css?v=content-rhythm-1`).
- **Inconsistency:** On Home the order is `styles → navigation → hospital → home.css`; on the other pages it is `styles → <page>.css → navigation → hospital`. So page-specific CSS loads *after* `hospital.css` on Home but *before* it on other pages. (Home value: `home.css` last.)

Scripts (all `defer`), per page:
| Page | Scripts (in order) |
|---|---|
| Home | `navigation.js`, `app.js` |
| About | `navigation.js`, `app.js` |
| Departments | `navigation.js`, `app.js`, `departments.js` |
| Services | `navigation.js`, `app.js`, `services.js` |
| Contact | `contact.js`, `navigation.js`, `app.js` |
| Blog | `blog.js`, `navigation.js`, `app.js` |
| Quality & Safety | `quality-safety.js`, `navigation.js`, `app.js` |

Every page also includes an inline SVG icon library near the top of `<body>`:
```html
<svg class="icon-library" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <symbol id="i-right" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
</svg>
```
Icons are referenced with `<svg class="icon" aria-hidden="true"><use href="#i-right"/></svg>`.

---

## 2. Design tokens

All base tokens are defined in `:root` in `styles.css` (lines 15–33).

### Colors
| Token | Value | Notes |
|---|---|---|
| `--ink` | `#18364f` | Body text color |
| `--ink-deep` | `#102f48` | Headings, buttons, dark surfaces |
| `--muted` | `#7c8994` | Muted text |
| `--blue` | `#537fca` | Hover accent |
| `--line` | `#d8dde2` | Divider / border lines |
| `--utility` | `#f1f2f3` | Top utility bar background |
| `--stone` | `#f1f0eb` | "Get in touch" section background |
| `--paper` | `#fff` | Page background |

Additional hardcoded colors used in the code (not tokens):
- Bright accent blue `#0878ff` (nav hover/active underline, `hospital.css` tagline, `departments.css` `--dept-blue`, `services` blue).
- Button hover: background/border `#284b69` (`styles.css` `.button:hover`).
- Hero summary paragraph: `#496176`. Body headings: `--ink-deep`.
- Eyebrow default color: `#4e718c` (`styles.css` `.eyebrow`).
- Nav link color `#203e56`; nav hover `#0878ff`.
- Footer muted `#667887` / `#687a88` / `#7e8a94` / `#73818c` (various).
- Page-specific accent variables:
  - `.departments-page` → `--dept-blue: #0878ff` (`departments.css`)
  - `.services-page` → `--service-blue: #0878ff`, `--service-ink: #102f59` (`services.css`)
  - `.quality-page` → `--quality-blue: #086fee`, `--quality-muted: #5b7286` (`quality-safety.css`)
  - `.contact-page` → `--contact-muted: #5d7281`, `--contact-surface: #f4f3ef` (`contact.css`)
- Home-specific token: `--home-section-space: clamp(56px, 6.25vw, 96px)` (mobile `48px`) in `home.css`.

### Fonts
- `--heading` = `"Inter Display", Inter, Arial, sans-serif`
- `--body` = `"Inter Display", Inter, Arial, sans-serif`

`@font-face` declarations in `styles.css`:
| Family | File | Weight | Format |
|---|---|---|---|
| Inter Display | `assets/inter-display-400.woff2` | 400 | woff2 |
| Inter Display | `assets/inter-display-500.woff2` | 500–700 | woff2 |

Other fonts shipped in `assets/` but declared in CSS only where noted:
- `"Noto Sans Devanagari"` → `assets/noto-sans-devanagari-400.ttf` (weight 400), `@font-face` in `hospital.css`; used by `.hospital-tagline`.
- `assets/albert-sans-400/500/600/700.ttf`, `assets/geist-mono-400.ttf` exist in `assets/` but **no `@font-face` referencing them was found** in the stylesheets. **[unclear]** whether they are used; treat as unused unless proven otherwise.
- Global text rendering: `font-synthesis: none; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased;` (`:root`).

Body: `font-family: var(--body)`, `font-size: 16px`, `font-weight: 400`, `line-height: 1.5` (`styles.css` `body`).

### Font sizes and line heights (by role)
Values are `clamp(min, fluid, max)` unless a fixed value is shown. Defined in `styles.css` unless noted.

| Role | Selector | Font size | Line height | Weight | Notes |
|---|---|---|---|---|---|
| Page H1 (hero) | `.hero h1` | `clamp(39px, 5.7vw, 82px)` | `.99` | 400 | `--heading`, `letter-spacing -.052em` |
| Section H2 | `.services-heading h2`, `.team-heading h2`, `.journal-heading h2` | `clamp(28px, 4.1vw, 59px)` (services/team), `clamp(28px, 3.8vw, 55px)` (journal) | `1.08` / `1.05` | 400 | |
| Space-copy H2 | `.space-copy h2` | `clamp(23px, 3.75vw, 48px)` | `1.02` | 400 | |
| "Get in touch" H2 | `.contact-copy h2` | `clamp(29px, 4.5vw, 65px)` | `1.03` | 400 | mobile `clamp(31px, 7.5vw, 42px)` |
| Cards H3 | `.team-card h3` | `clamp(11px, 1.45vw, 17px)` | `1.25` | 500 | |
| Journal card H3 | `.journal-card h3` | `clamp(18px, 1.95vw, 28px)` | `1.12` | 500 | featured `clamp(25px, 3vw, 42px)` |
| Body paragraph | `body` | `16px` | `1.5` | 400 | |
| Hero summary P | `.hero-summary p` | `clamp(12px, 1.2vw, 17px)` | `1.45` | 400 | |
| Contact-copy P | `.contact-copy > p:not(.eyebrow)` | `clamp(11px, 1.25vw, 18px)` | `1.5` | 400 | |
| Eyebrow | `.eyebrow` | `clamp(8px, .86vw, 12px)` | `1.25` | 500 | `letter-spacing .16em`, uppercase content |
| Utility bar links | `.utility-inner a` | `clamp(8px, .82vw, 11px)` | `1` | 400 | |
| Text link | `.text-link` | `clamp(11px, 1.05vw, 15px)` | — | 400 | |
| Button | `.button` | `clamp(10px, .95vw, 14px)` | `1.1` | 400 | |

Eyebrow color differs by page: base `#4e718c`; About `var(--blue)`; Departments `#0878ff`; Services `#0878ff`; Quality `#0869de`; Contact `#4b6b80`. (Home uses the base value.)

Headings base rule (`styles.css`): `.hero h1, h2 { margin: 0; font-family: var(--heading); font-weight: 400; letter-spacing: -.052em; }`.

### Spacing scale
There is **no single global spacing scale** beyond fluid `clamp()` values used per-component. Section vertical rhythm is expressed with `padding-block: clamp(...)` per section. Home groups its own rhythm under one token: `--home-section-space: clamp(56px, 6.25vw, 96px)` (mobile `48px` in `home.css`). Other pages use per-section `clamp()` padding (see §3). Gaps between grid items are typically `clamp(...)` (e.g. `.hero-intro` gap `clamp(28px, 5vw, 72px)`).

### Container / gutters
- `--container: min(1440px, calc(100% - clamp(44px, 12.6vw, 184px)))` (`styles.css`). Mobile (`max-width:700px`): `--container: calc(100% - 36px)`.
- `.container { width: var(--container); margin-inline: auto; }`.
- `--contact-container: min(1440px, calc(100% - clamp(44px, 12.6vw, 184px)))` — used only by `.contact-section .contact-inner.container` (mobile `calc(100% - 36px)`).
- Page overrides:
  - `.departments-page .container { width: var(--dept-container) }` where `--dept-container: min(1360px, calc(100% - clamp(48px, 8vw, 130px)))`; mobile `calc(100% - 40px)` (`departments.css`).
  - `.services-page { --container: min(1360px, calc(100% - clamp(48px, 8vw, 130px))) }`; mobile `calc(100% - 40px)` (`services.css`).
  - `.about-page { --about-gutter: max(22px, min(92px, 6.3vw), calc((100vw - 1440px) / 2)) }` (`about.css`).

### Borders, radius, shadow
- Default divider: `1px solid var(--line)` (`#d8dde2`).
- Button radius: `3px` (`.button`). `.menu-toggle` radius `2px` (mobile) / `0` (nav breakpoint). Form inputs radius `1px`, submit button `2px` (`contact.css`). `.department-hero-photo` radius `3px`.
- Shadows: `.contact-search` box-shadow `0 1px 3px #1d3e5910` (`departments.css`); nav mobile shadow `0 12px 18px rgb(18 41 60 / 8%)` (`styles.css`).
- Focus ring (global): `:focus-visible { outline: 2px solid #5f87a8; outline-offset: 3px; }` (`styles.css`). Nav-specific focus: `2px solid #0878ff; offset 5px` (`navigation.css`).

### Breakpoints
Media queries actually used across the CSS:
| Breakpoint | Where |
|---|---|
| `min-width: 701px` | `styles.css` (home full-screen rhythm), `about.css`, `services.css`, `home.css` |
| `max-width: 700px` | `styles.css`, `about.css`, `services.css`, `departments.css`, `quality-safety.css`, `home.css` |
| `max-width: 600px` | `navigation.css`, `contact.css`, `blog.css` |
| `max-width: 850px` | `contact.css` |
| `max-width: 900px` | `services.css` |
| `max-width: 1000px` | `contact.css`, `blog.css`, `quality-safety.css` |
| `max-width: 1180px` | `navigation.css` (mobile nav), `hospital.css` |
| `min-width: 1181px and max-width: 1160px` | `navigation.css` — **impossible range** (min > max), never matches; likely leftover. See §9. |
| `max-width: 370px` | `hospital.css` |
| `prefers-reduced-motion: reduce` | `styles.css`, `navigation.css`, `about.css`, `contact.css`, `blog.css`, `quality-safety.css` |

Note: The dominant mobile breakpoint is **700px**; navigation collapses to mobile at **1180px**.

---

## 3. Layout

### Container and grid patterns
- Content is centered with `.container` (`width: var(--container); margin-inline:auto`).
- Common two-column hero intro: `.hero-intro` grid `1.14fr .86fr`, gap `clamp(28px, 5vw, 72px)`, `align-items:center`.
- Services content: `.services-content` grid `1.47fr 1fr`, gap `clamp(27px, 4.8vw, 69px)`.
- Team grid: `.team-grid` grid `2.23fr 1fr 1fr`, gap `clamp(11px, 1.7vw, 24px)`; first card `.team-card-lead`.
- Journal mosaic (Home): `.journal-mosaic` grid `minmax(0,1.28fr) minmax(270px,.82fr)` with two fixed rows (`clamp(...)`); featured card spans two rows.
- "Get in touch": `.contact-inner` grid `1.15fr .75fr`, gap `clamp(36px, 8vw, 115px)`.

### Section padding (vertical)
- `.services-section` `padding-block: clamp(28px, 3.6vw, 52px) clamp(32px, 4.1vw, 60px)`.
- `.team-section` `padding-block: clamp(28px, 3.45vw, 50px) clamp(27px, 3vw, 44px)`.
- `.journal-section` `padding-block: clamp(30px, 4.2vw, 61px) clamp(33px, 4.5vw, 65px)`; `border-top: 1px solid #e8e9e6`.
- `.contact-inner` `padding-block: clamp(56px, 6.25vw, 96px)`; mobile `48px 96px`.
- On Home (≥701px) several sections switch to `min-height: 100svh` with centered flex content and larger `clamp(...,vh,...)` padding (`styles.css` §637–683). `home.css` overrides these to `display:block; min-height:0` and re-applies `--home-section-space` padding.

### Divider lines
- Section dividers: `1px solid var(--line)` (e.g. `.journal-section` uses `#e8e9e6`; departments sections use `var(--line)`).
- List rows use `border-top`/`border-bottom` of `1px solid var(--line)` or `#d0d0cb` (contact links).
- Vertical divider between photo and text in featured department blocks: `.featured-copy { border-left: 1px solid var(--line) }`, reversed to `border-right` on `.reverse`.

### Mobile behavior
- Grids collapse to 1 column at `700px` (or their page breakpoint). Side dividers are removed (`border:0`) on stacked layouts. Home hero stacks (`grid-template-columns: 1fr`, `.hero-photo` aspect `1.45`). Nav switches to hamburger at `≤1180px`.

---

## 4. Shared components

### Top bar (utility bar)
`styles.css` (`.utility-bar`, `.utility-inner`); Home markup in `index.html` lines 32–41.
```html
<div class="utility-bar">
  <div class="utility-inner container">
    <a class="utility-home" href="#home"><svg class="utility-pin" ...></svg> Sita Ram Prasad Memorial Trust Hospital</a>
    <a href="contact.html#patient-support">Patient support</a>
    <i aria-hidden="true"></i>
    <a href="contact.html#billing-support">Pay a bill</a>
    <i aria-hidden="true"></i>
    <a href="contact.html">Contact us</a>
  </div>
</div>
```
- Height `clamp(18px, 2.7vw, 30px)`, background `var(--utility)`.
- Links right-aligned (`justify-content:flex-end`), gap `clamp(14px, 2.2vw, 28px)`; `.utility-home` pushed left via `margin-right:auto`.
- Departments overrides utility styling (`departments.css` lines 7–10).

### Header + navigation
`navigation.css` (+ `hospital.css` refinements); Home markup `index.html` lines 43–70.
Structure: `.site-header.everwell-navigation` > `.header-inner.container` containing `.brand`, `.desktop-nav` (links + `.mega-trigger` buttons), `.header-cta.button`, `.menu-toggle`; then `.mobile-nav#mobile-nav` (hidden), `.navigation-menus` (filled by JS), a `<noscript>` fallback, followed by `.mega-backdrop`.
- Brand: logo image + `.brand-name` (two `span`s: hospital name, second line "Memorial Trust Hospital").
- Desktop nav links/buttons font `clamp(12px, 1.05vw, 15px)`; `.mega-trigger` has `.nav-chevron`. Active/hover underline `#0878ff`.
- Desktop shown only ≥1181px; below that `.desktop-nav` and `.header-cta` hidden, `.menu-toggle` shown.
- Mega panels are **generated in JS** into `.navigation-menus` (see §6); `.mega-trigger[data-menu="services|departments|wellness|about"]` toggles them.
- Mobile: `.mobile-nav` becomes a stacked menu with items and the same mega-trigger buttons; `.mobile-appointment` is a dark CTA (`background:#102f48`).

### Buttons
`styles.css` `.button`:
```html
<a class="button" href="...">Label <svg class="icon"><use href="#i-right"/></svg></a>
```
- `inline-flex`, gap `15px`, `min-height: clamp(32px, 4.25vw, 48px)`, border `1px solid var(--ink-deep)`, radius `3px`, padding inline `clamp(13px, 1.8vw, 24px)`, background `var(--ink-deep)`, color `#fff`, font size `clamp(10px, .95vw, 14px)`.
- Hover: background/border `#284b69`.
- Variants by context: `.header-cta`, `.team-button`, `.contact-button` (adds `margin-top`), form submit button (`.form-submit-row .button`, `min-height:54px`, radius `2px`, font `15px`).

### Text links with arrows (secondary)
`styles.css` `.text-link`:
```html
<a class="text-link" href="...">Label <svg class="icon"><use href="#i-right"/></svg></a>
```
- `inline-flex`, gap `6px`, color `var(--ink-deep)`, underlined, `text-underline-offset: 4px`, font `clamp(11px, 1.05vw, 15px)`, icon `14px`.
- Hover color `var(--blue)`.
- Variants: `.all-specialties`, `.service-group-link`, `.quality-page .text-link` (border-bottom style), `.mega-feature-link` (nav).

### Eyebrow labels
`styles.css` `.eyebrow`:
```html
<p class="eyebrow">CARE AT S.R.P.</p>
```
- `margin: 0 0 clamp(7px, .9vw, 12px)`, color `#4e718c`, `font-family: var(--body)`, `font-size: clamp(8px, .86vw, 12px)`, `font-weight: 500`, `letter-spacing: .16em`, `line-height: 1.25`. Uppercase text written literally in markup.

### Section headings
- Section heading blocks often pair `.eyebrow` + `h2` inside a flex row with a right-side element (`.services-heading`, `.team-heading` show `justify-content:space-between`).
- `h2` base: `--heading`, weight 400, `letter-spacing: -.052em`, `margin: 0`.

### Cards and list rows with arrow links
- **Team card** (`index.html`; `styles.css`): `.team-card` with `<img>`, `<h3>`, `<p>`.
- **Journal card** (Home): `.journal-card` (+ modifier `-featured`/`-diagnostics`/`-wellness`), `.journal-card-image`, `.journal-card-content`, `.journal-tag`, `.journal-card-copy`, `.journal-read-time`; dark overlay via `::after` gradient; text white.
- **Specialty list** (Home): `.specialty-list` > `li` > `a` with `.specialty-number` + label + arrow icon; grid `36px 1fr 15px`; dividers between rows.
- **Department list item** (Departments): `.department-item` > `a` grid `clamp(58px,7vw,78px) 1fr 20px`, icon + `.department-item-copy` + arrow; hover slides arrow.
- **Service detail / specialty rows** (Services): `.service-specialty-list`, `.service-plain-list`, `.service-detail-list`, `.patient-support-links` — arrow links with bottom borders.

### "Get in touch" section with stethoscope
`styles.css` + `home.css` refinements; Home markup `index.html` lines 213–270. Used at the end of every page.
```html
<div class="contact-footer-flow">
  <section class="contact-section" id="contact" aria-labelledby="contact-title">
    <div class="contact-inner container">
      <div class="contact-copy">
        <p class="eyebrow">GET IN TOUCH</p>
        <h2 id="contact-title">Let's find your next step.</h2>
        <p>Tell us what you need, ...</p>
        <a class="button contact-button" href="contact.html#contact-form">Request an appointment <svg class="icon">...</svg></a>
      </div>
      <nav class="contact-links" aria-label="Contact and visit information">
        <a href="...">Appointments <svg class="icon">...</svg></a>
        <a href="...">Patient support <svg class="icon">...</svg></a>
        <a href="...">Planning your visit <svg class="icon">...</svg></a>
      </nav>
    </div>
  </section>
  <footer class="site-footer"> ... </footer>
  <img class="stethoscope-transition" src="assets/stethoscope-cutout.png" alt="" aria-hidden="true">
</div>
```
- `.contact-footer-flow` is a 1-column grid; `.contact-section` and `.site-footer` share `grid-area: 1/1` and `2/1` respectively, and the stethoscope is placed in the section's cell.
- `.contact-section` background `var(--stone)`, `--contact-height:auto; min-height:0`.
- `.stethoscope-transition`: `position:relative; grid-area:1/1; align-self:end; justify-self:end; transform:translateY(12%); width:min(54vw,760px)`; mobile `width:min(75vw,400px)`. It overlaps down into the footer.
- (Note: the `id`/`aria-labelledby` and cross-links vary slightly per page — e.g. some pages use `id="appointments"`/`next-step-title`.)

### Footer
`styles.css` (`.site-footer`, `.footer-inner`); Home markup `index.html` lines 230–267.
```html
<footer class="site-footer">
  <div class="footer-inner container">
    <div class="footer-brand">
      <a class="brand" href="index.html#home">...logo + brand-name...</a>
      <p class="hospital-tagline" lang="hi">सेवा ही सबसे बड़ा संकल्प</p>
      <small>© 2026 Sita Ram Prasad Memorial Trust Hospital. All rights reserved.</small>
    </div>
    <nav class="footer-column" aria-label="Care links"><h2>Care</h2> <a>...</a>...</nav>
    <nav class="footer-column" aria-label="Visit links"><h2>Your visit</h2> ...</nav>
    <nav class="footer-column" aria-label="Hospital links"><h2>Our hospital</h2> ...</nav>
    <div class="footer-legal"><a>Privacy</a> <a>Terms</a> <a>Accessibility</a> <a>Contact</a></div>
  </div>
</footer>
```
- `.footer-inner` grid `2.3fr 1.15fr 1.15fr 1.15fr`, gap `clamp(12px, 2.2vw, 32px)`, `padding-top: clamp(23px, 3.4vw, 48px)`.
- `.footer-column h2` small label style (`clamp(9px, .95vw, 12px)`, weight 500).
- `.footer-legal` spans `grid-column: 2 / -1`, right-aligned.
- The tagline uses the Noto Sans Devanagari font (`.hospital-tagline` in `hospital.css`).
- Mobile: 2-column grid; brand and legal span full width.

### Hero patterns
- **Home hero** (`styles.css` `.hero`, `.hero-intro`, `.hero-summary`, `.hero-photo`, `.patient-paths`): 2-column intro, full-width photo (aspect `804/322`), then `.patient-paths` dark 4-up link bar (`background:var(--ink-deep)`).
- **About hero** (`about.css` `.about-hero`): full-bleed image with white gradient overlay, copy padded left `60%`.
- **Services hero** (`services.css` `.services-hero`): 3-row grid (intro, photo, `.service-paths`), photo aspect `2.45`.
- **Quality hero** (`quality-safety.css` `.quality-hero`): 2-column, plus `.quality-breadcrumb` and `.quality-section-nav`.
- **Contact hero** (`contact.css` `.contact-hero`): large display H1 + summary.
- **Departments hero** (`departments.css` `.department-hero`): copy + photo grid with inline `.department-search`.

---

## 5. Page-specific patterns

| Pattern | Classes | File(s) |
|---|---|---|
| Department featured blocks (photo + text, alternating) | `.featured-department`, `.featured-overview`, `.featured-overview.reverse`, `.featured-image`, `.featured-copy`; title is `.featured-copy h2` | `departments.html`, `departments.css`, refinements in `hospital.css` |
| "All departments" list + alphabet filter | `.department-index`, `.department-grid` (also `id="department-list"`), `.department-item`, `.department-item-copy`, `.department-alphabet` | `departments.html`, `departments.css`, `departments.js` |
| Department search input | `.department-search` | `departments.css` |
| Visiting specialist service block | `.visiting-service` | `departments.html`, `hospital.css` |
| Services directory + search | `.service-directory`, `.service-search`, `.service-groups`, `.service-group`, `.service-specialty-list`, `.service-plain-list`, `.service-group-link` | `services.html`, `services.css`, `services.js` |
| Service detail section | `.service-detail-section`, `.service-detail-inner`, `.service-detail-image`, `.service-detail-copy`, `.service-detail-list` | `services.css` |
| Patient support links | `.patient-support`, `.patient-support-links` | `services.css` |
| Journal masonry grid (Blog) | `.journal-page-section`, `.journal-masonry`, `.journal-story`, `.story-photo`, `.story-details` | `blog.html`, `blog.css`, `blog.js` |
| Journal search toggle | `.journal-search`, `.journal-search-panel`, `.journal-search-toggle` | `blog.css`, `blog.js` |
| Contact form | `.contact-form`, `.contact-form-section`, `.contact-form-inner`, `.form-field-row`, `.form-submit-row`, `.form-status` | `contact.html`, `contact.css`, `contact.js` |
| Contact detail cards | `.contact-detail-grid`, `.contact-detail-card`, `.detail-icon`, `.detail-kicker`, `.detail-value` | `contact.css` |
| Contact FAQ accordion | `.contact-faq-list` (`<details>`/`<summary>`), `.faq-number`, `.faq-toggle` | `contact.css` |
| Quality tabs (safety explorer) | `.safety-explorer`, `.safety-tabs`, `.safety-tab`, `.safety-panel`, `.safety-tab-number`, `.safety-art` | `quality-safety.html`, `quality-safety.css`, `quality-safety.js` |
| Accreditation feature | `.quality-accreditation`, `.accreditation-inner`, `.accreditation-feature`, `.accreditation-hospital` | `quality-safety.css` |
| Quality FAQ accordion | `.quality-faq`, `.quality-faq-toggle` | `quality-safety.css` |
| About approach values / care map / people / FAQ | `.about-approach`, `.approach-values`, `.approach-art`, `.care-map`, `.about-people`, `.about-faq`, `.faq-item` | `about.html`, `about.css` |
| Breadcrumb (Quality) | `.quality-breadcrumb` | `quality-safety.css` |

---

## 6. Behavior

### `navigation.js`
An IIFE that runs when `.everwell-navigation` exists. It:
- Builds the mega-menu panels from a JS `menus` object (services, departments, wellness, about) and injects them into `.navigation-menus`.
- Handles desktop mega-trigger open/close, keyboard (ArrowDown opens, Escape closes), focus management, and `aria-expanded` state.
- Handles the mobile menu toggle (`.menu-toggle`, `#mobile-nav`), moving panels into `.mobile-mega-slot[data-mobile-slot]` slots.
- Toggles `html.navigation-open` and `.mega-backdrop`.
- On same-page anchor link clicks it dispatches `CustomEvent('everwell:navigate-section', { detail: hash })` (used by page scripts for same-page section navigation).
- Re-closes menus on resize/page-show and restores panels on breakpoint change.

### `app.js`
Shared specialty search on Home: filters `#specialty-list li` by `#specialty-query`, toggles `#search-empty`, and an "All specialties" reset link. No-ops on pages without `#specialty-search`.

### Page scripts
- `departments.js` — search + A–Z filter of `.department-item` (via `data-name`/`data-terms`), `#department-empty`; `revealLinkedDepartment()` reacts to hash/`everwell:navigate-section` to scroll to a `.department-item` or `.featured-department` target.
- `services.js` — filters `[data-service]` items by `#service-query`, hides empty `.service-group`s, shows `#service-search-empty`.
- `contact.js` — intercepts `#contact-message-form` submit, validates, builds a `mailto:` draft; `inbox` is empty (""), so no recipient is set. Updates `#form-status`.
- `blog.js` — journal search toggle (`#journal-search-toggle`/`#journal-query`), filters `.journal-story`, updates `#journal-search-status`; `revealLinkedStory()` scrolls to a `#journal-story` on hash.
- `quality-safety.js` — ARIA tab behavior for `.safety-tab` → `.safety-panel`, with keyboard arrow/Home/End navigation.

### Which pages load which scripts
See the table in §1. `navigation.js` and `app.js` are on every page; each interactive page additionally loads its own script (order noted).

### Scroll behavior
Global `html { scroll-behavior: smooth; scroll-padding-top: 36px; }` (`styles.css`); mobile `scroll-padding-top: 20px`; reduced-motion sets `scroll-behavior: auto`. Several targets add `scroll-margin-top` (e.g. `.featured-department` 90px in `departments.css`, `.contact-faq-list details` 28px, `.quality-accreditation` 24px, service detail rows 22px). Native anchors handle smooth scrolling; no JS is needed for it.

---

## 7. Assets

### Folder structure (`assets/`)
- Root: photography and logos — `approved-hero.png`, `approved-specialty.png`, `approved-team-general.png`, `approved-team-cardiology.png`, `approved-team-family.png`, `consultation-hero.jpg`, `patient-consultation.jpg`, `space-atrium-clean.webp`, `about-services-path.webp`, `srp-care-path.svg`, `srp-hospital-logo.jpeg`, `stethoscope-cutout.png`, `contact-telephone-navy.png`, `doctor-james.jpg`, `doctor-maya.jpg`, `doctor-sarah.jpg`, `everwell-mark.svg`, `mark.svg`.
- Fonts: `inter-display-400.woff2`, `inter-display-500.woff2`, `noto-sans-devanagari-400.ttf`, `albert-sans-400/500/600/700.ttf`, `geist-mono-400.ttf` (+ `OFL-*.txt` licenses, `noto-sans-devanagari-LICENSE.txt`).
- `assets/navigation/` — SVG icons used by mega menus, department list, etc. (e.g. `surgery.svg`, `womens-health.svg`, `anesthesiology.svg`, `orthopedics.svg`, `paediatrics.svg`, `urology.svg`, `neurology.svg`, `heart.svg`, `diagnostics.svg`, `ecg.svg`, `ultrasound.svg`, `x-ray.svg`, `accreditation.svg`, `shield.svg`, `conversation.svg`, `calendar.svg`, `book.svg`, `movement.svg`, `nutrition.svg`, `rest.svg`, `team.svg`, `hospital.svg`, `primary-care.svg`).
- `assets/department-icons/` — `diagnostics.svg`, `heart-vascular.svg`, `neurology.svg`, `orthopedics.svg`, `primary-care.svg`, `womens-health.svg`.
- `assets/service-icons/` — `diagnostics.svg`, `heart-vascular.svg`, `orthopedics.svg`, `primary-care.svg`, `womens-health.svg` (+ `LICENSE.txt`, `SOURCE.txt`).
- `assets/approach-icons/` — `clear-guidance.webp`, `connected-team.webp`, `people-first.webp`.
- `assets/journal/` — `calm.png`, `nutrition.png`, `reading.png`, `rest.png`, `walking.png`.
- `assets/quality/` — `communication.svg`, `hygiene.svg`, `identification.svg`, `medicines.svg`, `movement.svg`, `procedures.svg`, `nabh-logo.png`.

### Naming patterns
- Photography: lowercase, hyphenated, often prefixed `approved-` (approved assets) or descriptive (`consultation-hero`, `patient-consultation`, `space-atrium-clean`).
- Icons: lowercase hyphenated `.svg`; named by topic.
- Logos: `srp-hospital-logo.jpeg`, `srp-care-path.svg`, `everwell-mark.svg`, `mark.svg`.

### Image styles / treatments
- Almost all imagery uses wrapper `figure` with fixed `aspect-ratio` and `overflow:hidden`, image `width:100%; height:100%; object-fit:cover`.
- Common aspect ratios in use: hero `.hero-photo` `804 / 322` (mobile `1.45`); `.specialty-photo` `399 / 247` (2-col desktop `5/3`, mobile `1.55`); `.space-feature` `810 / 274`; services hero `2.45`; service detail `1.62`; departments hero `1.46` (mobile `1.55`); featured department image `1.78` (mobile `1.5`); journal cards fixed row heights.
- `object-position` is commonly tuned per image (e.g. `center 47%`, `center 48%`, `42% center`).
- Journal/story photos are absolutely positioned with gradient overlays and hover scale.

### Icons and illustrations
- UI icons are inline SVG `<symbol>`s (icon library, §1) referenced via `<use>`.
- Section illustrations are SVGs in the asset folders above (e.g. `srp-care-path.svg` care map, `assets/quality/*.svg` tab art, `assets/approach-icons/*.webp`).

---

## 8. Rules for new pages (checklist)

Derived only from existing pages:

1. **Copy Home's `<head>` structure**: `<!doctype html>`, `<html lang="en">`, meta charset/viewport/theme-color, title, description, OG tags, favicon (`assets/srp-hospital-logo.jpeg`), font preload (`assets/inter-display-400.woff2`), image preload.
2. **Load stylesheets in this order** (insert your page sheet second):
   ```html
   <link rel="stylesheet" href="styles.css?v=screen-rhythm-3">
   <link rel="stylesheet" href="<your-page>.css?v=1">
   <link rel="stylesheet" href="navigation.css?v=srp-1">
   <link rel="stylesheet" href="hospital.css?v=srp-1">
   ```
3. **Set a page class on `<body>`** matching the naming convention (`<name>-page`).
4. **Include the skip link and icon library** (verbatim from Home).
5. **Include the utility bar, header/navigation, and mega-backdrop** markup exactly as Home (§4). The nav requires `.everwell-navigation` and `.navigation-menus` for `navigation.js`.
6. **Open `<main id="main">`** and build content using the tokens/components in §2 and §4. Use `.container` for width, `.eyebrow` + `h2` for section headings, `.button` for primary actions, `.text-link` for arrow links.
7. **End with the Get in touch section + footer** using the `.contact-footer-flow` markup in §4 (section, `.site-footer`, `.stethoscope-transition` image, all inside the flow).
8. **Load scripts** (`defer`): `navigation.js` and `app.js` on every page; add your page script if needed (before or after `navigation.js` per the existing convention — page scripts load first on Contact/Blog/Quality, last on Departments/Services). Include the page script only if you add interactivity.
9. **Respect breakpoints**: mobile at `≤700px` (nav collapses at `≤1180px`); stack grids, drop side dividers.
10. **Accessibility conventions observed**: `aria-hidden="true"` on decorative SVGs, `aria-label` on icon-only buttons, `aria-labelledby` linking sections to headings, `visually-hidden` labels on search inputs, `:focus-visible` outlines.

### Minimal skeleton (structure copied from `index.html`; no new content or classes)
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#ffffff">
  <title>Page title — Sita Ram Prasad Memorial Trust Hospital</title>
  <meta name="description" content="">
  <link rel="icon" href="assets/srp-hospital-logo.jpeg" type="image/jpeg">
  <link rel="preload" href="assets/inter-display-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="styles.css?v=screen-rhythm-3">
  <link rel="stylesheet" href="navigation.css?v=srp-1">
  <link rel="stylesheet" href="hospital.css?v=srp-1">
</head>
<body class="home-page">
  <a class="skip-link" href="#main">Skip to content</a>

  <svg class="icon-library" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <symbol id="i-right" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
  </svg>

  <div class="utility-bar">
    <div class="utility-inner container">
      <a class="utility-home" href="#home"><svg class="utility-pin" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14s5-4.2 5-8a5 5 0 1 0-10 0c0 3.8 5 8 5 8Z"/><circle cx="8" cy="6" r="1.7"/></svg> Sita Ram Prasad Memorial Trust Hospital</a>
      <a href="contact.html#patient-support">Patient support</a>
      <i aria-hidden="true"></i>
      <a href="contact.html#billing-support">Pay a bill</a>
      <i aria-hidden="true"></i>
      <a href="contact.html">Contact us</a>
    </div>
  </div>

  <header class="site-header everwell-navigation">
    <div class="header-inner container">
      <a class="brand" href="index.html#home" aria-label="Sita Ram Prasad Memorial Trust Hospital home"><img src="assets/srp-hospital-logo.jpeg" alt="" width="60" height="60"><span class="brand-name"><span>Sita Ram Prasad</span><span>Memorial Trust Hospital</span></span></a>
      <nav class="desktop-nav" aria-label="Main navigation">
        <a href="index.html#team">Find care</a>
        <button class="mega-trigger" id="nav-services-trigger" type="button" data-menu="services" aria-expanded="false" aria-controls="mega-services">Services<svg class="nav-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button>
        <button class="mega-trigger" id="nav-departments-trigger" type="button" data-menu="departments" aria-expanded="false" aria-controls="mega-departments">Departments<svg class="nav-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button>
        <button class="mega-trigger" id="nav-wellness-trigger" type="button" data-menu="wellness" aria-expanded="false" aria-controls="mega-wellness">Health &amp; wellness<svg class="nav-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button>
        <button class="mega-trigger" id="nav-about-trigger" type="button" data-menu="about" aria-expanded="false" aria-controls="mega-about">About<svg class="nav-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button>
      </nav>
      <a class="button header-cta" href="contact.html#contact-form">Book an appointment <svg class="icon" aria-hidden="true"><use href="#i-right"/></svg></a>
      <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav"><svg class="icon" aria-hidden="true"><use href="#i-menu"/></svg></button>
    </div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>
      <a href="index.html#team">Find care <svg class="icon" aria-hidden="true"><use href="#i-right"/></svg></a>
      <button class="mega-trigger" id="mobile-services-trigger" type="button" data-menu="services" aria-expanded="false" aria-controls="mega-services">Services<svg class="nav-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button>
      <div class="mobile-mega-slot" data-mobile-slot="services"></div>
      <button class="mega-trigger" id="mobile-departments-trigger" type="button" data-menu="departments" aria-expanded="false" aria-controls="mega-departments">Departments<svg class="nav-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button>
      <div class="mobile-mega-slot" data-mobile-slot="departments"></div>
      <button class="mega-trigger" id="mobile-wellness-trigger" type="button" data-menu="wellness" aria-expanded="false" aria-controls="mega-wellness">Health &amp; wellness<svg class="nav-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button>
      <div class="mobile-mega-slot" data-mobile-slot="wellness"></div>
      <button class="mega-trigger" id="mobile-about-trigger" type="button" data-menu="about" aria-expanded="false" aria-controls="mega-about">About<svg class="nav-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button>
      <div class="mobile-mega-slot" data-mobile-slot="about"></div>
      <a class="mobile-appointment" href="contact.html#contact-form">Book an appointment <svg class="icon" aria-hidden="true"><use href="#i-right"/></svg></a>
    </nav>
    <div class="navigation-menus"></div>
    <noscript><nav class="navigation-fallback" aria-label="Page navigation"><a href="services.html">Services</a><a href="departments.html">Departments</a><a href="blog.html">Health &amp; wellness</a><a href="about.html">About</a></nav></noscript>
  </header>
  <div class="mega-backdrop" aria-hidden="true" hidden></div>

  <main id="main">
    <!-- page content -->
  </main>

  <div class="contact-footer-flow">
    <section class="contact-section" id="contact" aria-labelledby="contact-title">
      <div class="contact-inner container">
        <div class="contact-copy">
          <p class="eyebrow">GET IN TOUCH</p>
          <h2 id="contact-title">Let’s find your next step.</h2>
          <p>Tell us what you need, and we’ll help you find the right care and a time that works for you.</p>
          <a class="button contact-button" href="contact.html#contact-form">Request an appointment <svg class="icon" aria-hidden="true"><use href="#i-right"/></svg></a>
        </div>
        <nav class="contact-links" aria-label="Contact and visit information">
          <a href="contact.html#contact-form">Appointments <svg class="icon" aria-hidden="true"><use href="#i-right"/></svg></a>
          <a href="index.html#team">Patient support <svg class="icon" aria-hidden="true"><use href="#i-right"/></svg></a>
          <a href="contact.html#contact-details">Planning your visit <svg class="icon" aria-hidden="true"><use href="#i-right"/></svg></a>
        </nav>
      </div>
    </section>
    <footer class="site-footer">
      <div class="footer-inner container">
        <div class="footer-brand">
          <a class="brand" href="index.html#home" aria-label="Sita Ram Prasad Memorial Trust Hospital home"><img src="assets/srp-hospital-logo.jpeg" alt="" width="60" height="60"><span class="brand-name"><span>Sita Ram Prasad</span><span>Memorial Trust Hospital</span></span></a>
          <p class="hospital-tagline" lang="hi">सेवा ही सबसे बड़ा संकल्प</p>
          <small>© 2026 Sita Ram Prasad Memorial Trust Hospital. All rights reserved.</small>
        </div>
        <nav class="footer-column" aria-label="Care links"><h2>Care</h2><a href="index.html#team">Find care</a><a href="departments.html">Departments</a><a href="services.html">Services &amp; treatments</a><a href="services.html#patient-support">Patient resources</a></nav>
        <nav class="footer-column" aria-label="Visit links"><h2>Your visit</h2><a href="contact.html#contact-details">Plan your visit</a><a href="contact.html#billing-support">Billing &amp; insurance</a><a href="contact.html#patient-support">Patient support</a><a href="contact.html#contact-details">For visitors</a></nav>
        <nav class="footer-column" aria-label="Hospital links"><h2>Our hospital</h2><a href="about.html">About our hospital</a><a href="departments.html">Departments</a><a href="index.html#team">Our people</a><a href="blog.html">News &amp; stories</a><a href="quality-safety.html">Quality &amp; safety</a><a href="contact.html#contact-form">Careers</a></nav>
        <div class="footer-legal"><a href="contact.html#contact-form">Privacy</a><a href="contact.html#contact-form">Terms</a><a href="contact.html#contact-form">Accessibility</a><a href="contact.html">Contact</a></div>
      </div>
    </footer>
    <img class="stethoscope-transition" src="assets/stethoscope-cutout.png" alt="" aria-hidden="true">
  </div>

  <script src="navigation.js?v=srp-1" defer></script>
  <script src="app.js?v=srp-1" defer></script>
</body>
</html>
```
(This skeleton is the Home structure with content removed. A new page would change `<body class>`, the `<title>`/meta, and add its own page stylesheet in the second link slot and its page script if needed. It intentionally uses Home's `home-page` class as a placeholder — a new page would use its own class.)

---

## 9. Known inconsistencies (reported only, not fixed)

1. **Stylesheet load order differs on Home** vs other pages (Home: `styles → navigation → hospital → home.css`; others: `styles → <page>.css → navigation → hospital`). Home's page sheet loads *after* `hospital.css`; others load before. (Home's value is the difference.)
2. **Impossible media query** in `navigation.css`: `@media (min-width: 1181px) and (max-width: 1160px)` can never match (min > max). Likely leftover/dead CSS.
3. **Orphaned `.department-footer*` rules** in `departments.css` (lines 74–80 and mobile 114–115) — the Departments page now uses `.site-footer` in markup, so these `.department-footer` styles appear unused.
4. **Duplicate/unused font files**: `assets/albert-sans-*.ttf` and `assets/geist-mono-400.ttf` exist but no `@font-face` references them in any stylesheet. **[unclear]** if intended for future use.
5. **Multiple navigation-related class systems coexist**: `styles.css` defines a basic `.mobile-nav` (used at its own breakpoint) while `navigation.css` defines `.everwell-navigation .mobile-nav`. Both exist; the `.everwell-navigation`-scoped rules win on pages that use that header. Some base `.mobile-nav` rules may be overridden or partially redundant.
6. **Eyebrow styling varies by page** (color/weight/size/letter-spacing differ in `about.css`, `departments.css`, `services.css`, `quality-safety.css`, `contact.css`). Home uses the base `.eyebrow` values. A new page will inherit base unless it adds its own overrides.
7. **"Get in touch" markup ids differ across pages**: Home/About/Departments use `id="contact"` + `aria-labelledby="contact-title"`; Contact/Blog/Quality use `id="appointments"` + `next-step-title`; Services uses `id="appointments"` + `contact-title`. Cosmetic inconsistency in ids/labels.
8. **`--contact-container` duplicates `--container`** with an identical value in `:root` (`styles.css`); both are maintained separately and only `--contact-container` is used by `.contact-section .contact-inner.container`.
9. **Contact form recipient is empty**: `contact.js` sets `const inbox = ''` — the form opens a `mailto:` draft with no recipient (per `README.md`, awaiting the hospital's confirmed inbox).
10. **Cache-busting query strings differ and are inconsistent** across files/pages (e.g. `departments.css?v=5`, `blog.js?v=masonry-reveal-1`, `services.js` with no query string). Purely a labeling inconsistency.
