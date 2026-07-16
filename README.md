# Portfolio: Justin Amen N'GBLOGNI

Personal website presenting my background and projects in mechatronics, robotics, and Embodied AI.

**Live:** https://justinamenngblogni.github.io

## Overview

I'm a mechatronics engineering student (ENSIL-ENSCI, currently on exchange at ISAE-Supméca), working at the intersection of perception and control for autonomous systems. This portfolio brings together my most representative projects - from a navigation controller developed at Politecnico di Torino to self-driving vehicles built entirely from scratch.

The site is bilingual (English / French) and runs without a server: the translations are embedded directly in the JavaScript.

## Built with

- HTML5, CSS3, and vanilla JavaScript - no framework, no build step
- Language switching (EN/FR) and animations handled in plain JavaScript
- Standalone project pages, hosted on GitHub Pages
- Only external dependency: Google Fonts (Fraunces, Manrope, JetBrains Mono)

## Structure

```
.
├── index.html                     Main page
├── assets/
│   ├── css/style.css              Styles (palette, typography, layouts)
│   ├── js/main.js                 EN/FR translations, navigation, carousels
│   ├── images/                    Photos, project visuals, logos
│   ├── docs/                      Résumé (EN/FR) and project reports
│   ├── projects/                  Detailed project pages
│   └── experience/                Detailed experience pages
└── README.md
```

## Running locally

The site opens by double-clicking `index.html`. For live reload during development:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing content

All bilingual text lives in the `TRANSLATIONS` object at the top of `assets/js/main.js` (the `en` and `fr` blocks). The color palette is defined under `:root` in `assets/css/style.css`.

## Contact

- **Email:** justin.ngblogni@etu.unilim.fr
- **LinkedIn:** [in/justin-ngblogni](https://linkedin.com/in/justin-ngblogni)

---

© 2026 Justin Amen N'GBLOGNI.
