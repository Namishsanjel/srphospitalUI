<<<<<<< HEAD
# Sita Ram Prasad Memorial Trust Hospital — website handoff

This is a clean, standalone copy of the static website, prepared for continued editing. It contains the page files, styles, scripts, fonts, icons, and image assets. It does not include repository history, deployment credentials, QA screenshots, or internal hosting configuration.

## Preview

Open this folder in a terminal and run:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`. Start from `index.html`. The site has no package installation or build step.

## Pages

- `index.html` — Home
- `about.html` — About the hospital
- `departments.html` — Departments
- `services.html` — Services
- `contact.html` — Contact
- `blog.html` — Health stories
- `quality-safety.html` — Quality, safety, and accreditation

## Where to edit

- `styles.css` — shared layout, type, colors, and common components
- `navigation.css` — desktop and mobile navigation
- `hospital.css` — hospital identity and shared content refinements
- `home.css`, `about.css`, `departments.css`, `services.css`, `contact.css`, `blog.css`, `quality-safety.css` — page-specific styles
- `navigation.js` — shared navigation behavior
- `app.js`, `departments.js`, `services.js`, `contact.js`, `blog.js`, `quality-safety.js` — page interactions
- `assets/` — logos, photography, illustrations, icons, and local fonts

Keep the HTML, CSS, scripts, and `assets/` folder together at this level; the pages use relative paths.

## Handoff note

The contact form currently opens an email draft. Its recipient is blank until the hospital confirms the official inbox; see `contact.js` before enabling it for real enquiries. Confirm any illustrative details and contact information with the hospital before publishing changes.
=======
# srphospitalUI
>>>>>>> 894f2ae6085c0f0b5654d939fa926e120209a782
