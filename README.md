# Juku's World in WebGL

![Juku](public/images/Juku.png)

A playful WebGL sports game built with `three` and `vite`.

The project runs as a browser game with touch controls, mobile-friendly UI, and Progressive Web App support. It is set up to be deployed at `https://juku.mella.ee/`.

## Features

- WebGL scene powered by `three`
- Football match logic, running track elements, and character animation
- Mobile touch controls and locked viewport zoom
- Installable PWA with manifest, icons, versioned service worker cache, and offline precache
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
|   |-- app-icons/
|   |-- images/
|   |-- manifest.webmanifest
|   |-- sw.js
|   `-- version.json
|-- scripts/
|   |-- finalize-pwa-build.mjs
|   |-- package-deploy.mjs
|   |-- pwa-utils.mjs
|   |-- sw.template.js
|   `-- sync-pwa-version.mjs
|-- src/
|   |-- main.js
|   |-- app-bootstrap.js
|   |-- app-runtime.js
|   |-- football-*.js
|   |-- juku-*.js
|   |-- track-system.js
|   |-- camera-system.js
|   |-- ui*.js
|   `-- style.css
`-- package.json
```

## Architecture Notes

- `src/main.js` is now a lightweight entry that lazy-loads the heavy app bootstrap.
- `src/app-bootstrap.js` builds the scene, UI, renderer, and runtime wiring.
- Football logic is split across focused modules such as player runtime, match runtime, ball runtime, presentation, and AI helpers.
- Shared geometry and materials are cached in dedicated helper modules to reduce repeated `three` allocations.

## Architecture Overview

```text
src/main.js
  -> lazy imports src/app-bootstrap.js
     -> createUi() + setupUiInputSystem()
     -> createAppRuntime()
     -> createFootballBehaviorState()
     -> createFootballBridge()
        -> football-runtime.js
           -> football-ball-runtime.js
           -> football-match-runtime.js
           -> football-player-runtime.js
              -> football-player-state-runtime.js
              -> football-player-targeting-runtime.js
              -> football-player-movement-runtime.js
              -> football-touch-runtime.js
                 -> football-touch-decision-runtime.js
                 -> football-touch-execution-runtime.js
```

### Module Map

- `src/main.js`: tiny browser entry that starts the lazy bootstrap.
- `src/app-bootstrap.js`: builds the renderer, scene, UI, world, and animation loop.
- `src/app-runtime.js`: wires camera and Juku runtime updates into the main loop.
- `src/football-bridge.js`: connects football runtime, scoreboard, replay, and overlay presentation.
- `src/football-ball-runtime.js`: ball movement, collisions, goals, and possession transition setup.
- `src/football-match-runtime.js`: top-level football gameplay orchestration.
- `src/football-match-state-runtime.js`: match state timers, stall logic, out-of-bounds, and emergency clear flows.
- `src/football-officials-track-runtime.js`: referee behavior, hurdles, and track runner updates.
- `src/football-player-runtime.js`: per-player football update coordinator.
- `src/football-player-state-runtime.js`: derived per-player state and frame prep.
- `src/football-player-targeting-runtime.js`: kickoff, restart, open-play, and shape targets.
- `src/football-player-movement-runtime.js`: movement, spacing, facing, and animation steering.
- `src/football-touch-runtime.js`: touch orchestration for ball actions.
- `src/football-touch-decision-runtime.js`: pass/cross/shot/clear decision logic.
- `src/football-touch-execution-runtime.js`: pass/cross/shot/clear/dribble execution.
- `src/juku-runtime.js`: Juku movement, pose, and face/equipment runtime.
- `src/camera-system.js`: camera modes, PiP view, and football broadcast camera behavior.
- `src/shared-geometry.js` and `src/shared-materials.js`: reusable `three` resources for lower allocation pressure.

## PWA Notes

- The web app manifest lives at `public/manifest.webmanifest`.
- The service worker is generated from `scripts/sw.template.js`.
- `npm run build` performs the PWA flow in two stages:
  - `scripts/sync-pwa-version.mjs` writes `public/sw.js` and `public/version.json` from the current `package.json` version.
  - `scripts/finalize-pwa-build.mjs` rewrites `dist/sw.js` so `PRECACHE_URLS` includes the real built files, including hashed `assets/*.js` and `assets/*.css`.
- The cache name is versioned, so bumping the app version is the intended way to roll PWA caches forward on deploy.
- The generated production service worker intentionally excludes `sw.js` itself from the precache list.
- PWA install and offline support should be tested on a real HTTPS deployment.

## Versioning

The app version is stored in [package.json](package.json) under `"version"`.

You can bump it manually or via npm, for example:

```bash
npm version patch
```

That version is then used for:

- `public/version.json`
- the service worker cache name
- the release folder name created by `npm run deploy:package`

## Social Metadata

The page metadata in `index.html` includes:

- standard `description`
- Open Graph tags for Facebook and other link preview consumers
- Twitter card tags

Current production URLs are configured for:

- `https://juku.mella.ee/`
- `https://juku.mella.ee/images/Juku.png`

## Development Notes

- The initial browser entry is `src/main.js`, but the main app startup happens in `src/app-bootstrap.js`.
- Styling lives in `src/style.css`.
- App icons are stored in `public/app-icons/`.
- Open Graph preview art lives in `public/images/Juku.png`.

## Deploy Checklist

1. Bump the app version when cached PWA assets changed.

```bash
npm version patch
```

2. Build the app.

```bash
npm run build
```

3. Prepare a deployable release folder if needed.

```bash
npm run deploy:package
```

4. Publish the full contents of `dist/` or `release/juku-web-v<version>/`, including:

- `index.html`
- `manifest.webmanifest`
- `sw.js`
- `version.json`
- `app-icons/`
- `images/`
- `assets/`

5. Verify these production URLs return `200 OK`:

- `https://juku.mella.ee/manifest.webmanifest`
- `https://juku.mella.ee/sw.js`
- `https://juku.mella.ee/version.json`
- `https://juku.mella.ee/app-icons/icon-192.png`
- `https://juku.mella.ee/app-icons/icon-512.png`

6. If testing an updated PWA, unregister the old service worker in DevTools and hard refresh.

## License

No license file is currently included in this repository.
