# ALPINES

A winter travel web application focused on five destinations: Finland, Iceland, Japan, Norway and Switzerland.

The project started as a front-end build using HTML, CSS and vanilla JavaScript, so I could understand the underlying layout, interaction and DOM logic without relying on frameworks. It is planned to grow into a full-stack web application.

> **Status:** work in progress. The desktop Home and About pages are complete and live. Explore, Packages, responsive layouts and backend functionality are planned next.

**Live demo:** https://ayaelhage.github.io/Alpines/

<p align="center">
  <img src="assets/map-ticket.png" alt="Alpines interactive map and boarding pass" width="900">
</p>

## About

ALPINES is designed around winter-specific travel rather than treating winter as an off-season.

Users can explore five destinations through an interactive world map, select countries, and receive destination information through a custom boarding-pass interface.

The project will eventually expand into detailed destination pages, travel packages, user accounts and database-driven content.

## What's on the home page

- Full-screen destination hero slider
- Interactive SVG world map
- Clickable country pins and destination selector
- Dynamic boarding pass that updates with the selected country
- Custom CSS-based ticket design
- Packages carousel with category icons that light up for each package
- Stats strip with count-up numbers
- Vanilla JavaScript interactions without third-party UI libraries

## What's on the About page

- Hero with an interactive "desk": draggable cut-out objects (passport, map, postcard, stamp, bag and more) that react to mouse movement with a parallax effect
- A small boarding pass built entirely in HTML and CSS, with ticket notches, a stub and a barcode
- "How it works" section, creator section, FAQ and a contact section
- "Get in touch" button that opens a WhatsApp chat (click-to-chat link), plus a contact form that builds an email with `mailto:`
- Shared navigation and footer with the Home page, and perforated section edges that alternate between navy and cream

## Built with

- HTML5, CSS3 (Grid, Flexbox, custom properties, `clamp()`, container query units)
- Vanilla JavaScript (DOM, Pointer Events, IntersectionObserver, `requestAnimationFrame`)
- Inline SVG (map and icons)
- Transparent PNG cut-outs for the About page desk
- Google Fonts: Fraunces and Manrope

## What I worked through

**1. Interactive SVG map and synchronized state**
- The map is loaded through an `<object>` element and manipulated with JavaScript.
- I used the SVG country paths to highlight selected destinations and position the map pins.
- Selecting a destination from the map, a pin or the country list updates the same state, which controls the map highlight and the boarding-pass information.

**2. Endless carousel without a library**
- The cards are rendered three times. After each move, the track silently jumps back to the middle set, so it feels infinite.
- The active card is centred using its measured `offsetLeft` and width.

**3. Draggable desk that scales as one piece**
- The About page desk is a container with `container-type: inline-size`, and every object inside is sized in `cqw` units (1% of the desk width), so the whole scene scales together instead of objects drifting apart.
- Dragging uses Pointer Events and updates CSS variables for position, while the mouse parallax uses the separate `translate` property, so the two effects don't fight each other.
- A clamp keeps at least a third of each object inside the desk, so nothing can be dragged out of reach.

**4. Performance and layout debugging**
- The carousel lagged on my laptop. I traced it to CSS masks on moving layers, extra `will-change` layers and large decoded photos, and replaced the masks with gradient overlays.
- I built at 80% browser zoom, and at 100% the map and ticket no longer fit. I fixed it by sizing the map from its SVG `viewBox` proportions and tying heights to the viewport height.

## Debugging notes

Problems I ran into while building and deploying, and how I fixed them.

**About page returned 404 on GitHub Pages**
- Symptom: `about.html` worked locally, but the live site showed a 404 and still served an older version.
- Cause: the "pages build and deployment" run for my commit failed at the deploy step, so the new files never went live. A later run stayed stuck on "Queued". I never found the exact reason, so it was possibly a temporary GitHub issue.
- Fix: checked the Actions tab, then pushed a new commit to start a fresh run, which went green.
- Lesson: if the live site doesn't update, check Actions first. A commit can succeed while the deploy fails.

**`fatal: not a git repository`**
- Cause: the VS Code terminal was in the parent folder, not the folder containing `.git`.
- Fix: `cd` into the project folder and confirm with `git status`.

**Slow image loading (about 10 seconds)**
- Cause: around 14 JPGs were between 1.2 and 5.7 MB each, roughly 48 MB in total.
- Fix: batch-compressed the JPGs (quality about 75, max width 1600 px) into a separate folder, then replaced the originals using the same file names. The PNG cut-outs were already small.
- Lesson: compress images before adding them to `assets`.

**Portrait overflowing its frame**
- Cause: the image was outside its frame wrapper. Moving it inside the frame, which uses `aspect-ratio` and `object-fit: cover`, fixed it.

**Case-sensitive file names**
- GitHub Pages treats `Photo.jpg` and `photo.jpg` as different files, so names in the code must match the files exactly.

## Roadmap

- [x] Desktop home page
- [x] About page (desktop)
- [x] Deploy to GitHub Pages
- [ ] Compress images for faster loading
- [ ] Explore, Packages (with category filtering), Log in / Sign up and Profile pages
- [ ] Mobile and tablet layouts
- [ ] Working newsletter form
- [ ] Accessibility pass (focus states, alt text, contrast)
- [ ] Backend API and database integration
- [ ] User authentication
- [ ] Full-stack deployment

Detailed documentation (site structure, planned features, backend architecture and design decisions) will be added in Notion.

## Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/ayaelhage/Alpines.git
   cd Alpines
   ```

2. Open the project in VS Code and launch `index.html` with the Live Server extension. A local server is recommended because the interactive SVG map is loaded through an `<object>` element.

## Project structure

```
Alpines/
├── index.html
├── about.html
├── style.css
├── about.css
├── script.js
├── assets/
└── README.md
```

## Credits

Photography, icons and external SVG assets will be credited here before final deployment.

## Author

Aya Hage, [@ayaelhage](https://github.com/ayaelhage)