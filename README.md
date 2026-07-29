# PIPER — Landing Page

Marketing landing page for **PIPER**, an open, closed-loop automated liquid handler.
Built with plain HTML, CSS, and vanilla JavaScript (ES modules), animated with
[GSAP](https://gsap.com/) + ScrollTrigger. No framework, no build step.

## Tech stack

- **HTML** — single `index.html`
- **CSS** — split into design tokens, base, and section styles
- **JavaScript** — ES modules, one per animated concern
- **GSAP 3.12.5** — vendored locally in `vendor/` (no CDN, works offline)

## Project structure

```
piper/
├── index.html            # markup + script/style links
├── css/
│   ├── tokens.css         # design tokens (colors, type, spacing) — start here to re-theme
│   ├── base.css           # reset, typography, ambient background
│   └── sections.css       # nav, hero, and every page section
├── js/
│   ├── main.js            # entry point: guards + wires modules together
│   └── modules/
│       ├── plate.js       # builds the 96-well plate SVG
│       ├── hero.js        # hero load timeline
│       ├── dispense.js    # signature droplet-dispense loop
│       ├── loop.js        # closed-loop ring draw-on
│       ├── precision.js   # count-up stats + crosshair walk
│       └── reveals.js     # sticky nav, parallax, scroll reveals
├── vendor/
│   └── gsap/              # GSAP core + ScrollTrigger (pinned, offline)
├── assets/
│   └── favicon.svg
├── package.json
├── .editorconfig
├── .gitignore
└── LICENSE
```

## Getting started

Because the JavaScript uses ES modules, browsers block it over `file://`.
Run a local server from the project root — pick either:

```bash
# Option A — Python (already installed on most machines)
python3 -m http.server 5173

# Option B — Node.js (fetches a tiny server on first run)
npx --yes serve . -l 5173
```

Then open <http://localhost:5173>.

> Tip: in VS Code, the **Live Server** extension does the same with one click.

## Deploy

It's a static site with no build step, so hosting is essentially zero-config.

### Netlify

A `netlify.toml` is included (empty build command, publish root), so both paths work:

- **Drag-and-drop:** go to <https://app.netlify.com/drop> and drop the `piper`
  folder (the one containing `index.html`). Live in seconds.
- **Git-connected:** push this folder as a repo, then in Netlify pick
  "Add new site -> Import from Git". Leave the build command blank and set the
  publish directory to the repo root. `netlify.toml` already sets these.

### Other hosts

GitHub Pages, Vercel, Cloudflare Pages, etc. all serve the folder as-is — no
build command required.

## Customizing

- **Colors / type / spacing:** all design tokens live in `css/tokens.css`.
  Change `--accent` to re-theme the whole page.
- **Specs:** the "dispense range" figure in the Precision section is a
  placeholder — search `EDIT` in `index.html` and drop in PIPER's real numbers.
- **Fonts:** loaded from Google Fonts in `index.html`. For a fully offline build,
  download the font files into `assets/fonts/` and swap the `<link>` for
  `@font-face` rules.

## License

MIT — see [LICENSE](LICENSE). Update the copyright line with your name.
