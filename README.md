# Juku's World in WebGL

A playful WebGL sports game built with `three` and `vite`.

The project runs as a browser game with touch controls, mobile-friendly UI, and Progressive Web App support. It is set up to be deployed at `https://juku.mella.ee/`.

## Features

- WebGL scene powered by `three`
- Mobile touch controls and locked viewport zoom
- Installable PWA with manifest, icons, and service worker caching
- Social sharing metadata for Open Graph and Twitter

## Tech Stack

- `Vite`
- `Three.js`
- Plain HTML, CSS, and JavaScript

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure

```text
.
|-- index.html
|-- public/
|   |-- manifest.webmanifest
|   |-- sw.js
|   `-- icons/
|-- src/
|   |-- main.js
|   `-- style.css
`-- package.json
```

## PWA Notes

- The app includes a web app manifest at `public/manifest.webmanifest`.
- The service worker at `public/sw.js` is generated from `public/sw.template.js`.
- `npm run build` runs `npm run pwa:sync` first, which writes `public/sw.js` and `public/version.json` from the current `package.json` version.
- The cache name is versioned, so bumping the app version is the intended way to roll PWA caches forward on deploy.
- PWA install and offline support should be tested on a real HTTPS deployment.

## Social Metadata

The page metadata in `index.html` includes:

- standard `description`
- Open Graph tags for Facebook and other link preview consumers
- Twitter card tags

Current production URLs are configured for:

- `https://juku.mella.ee/`
- `https://juku.mella.ee/icons/icon-512.png`

## Development Notes

- Main game logic lives in `src/main.js`.
- Styling and touch UI behavior live in `src/style.css`.
- App icons are generated assets stored in `public/icons/`.

## License

No license file is currently included in this repository.

