const CACHE_NAME = "juku-pwa-v__APP_VERSION__";
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/version.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png"
];

function toCacheUrl(value) {
  try {
    const url = new URL(value, self.location.origin);
    if (url.origin !== self.location.origin) {
      return null;
    }
    if (url.pathname.endsWith("/sw.js")) {
      return null;
    }
    return `${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

async function collectAppShellAssets() {
  const assets = new Set(APP_SHELL);
  const response = await fetch("/", { cache: "no-store" });
  const html = await response.text();
  const assetPattern = /<(?:link|script|img|source)[^>]+(?:href|src)=["']([^"']+)["']/gi;

  for (const match of html.matchAll(assetPattern)) {
    const asset = toCacheUrl(match[1]);
    if (asset) {
      assets.add(asset);
    }
  }

  return [...assets];
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const shellAssets = await collectAppShellAssets();
      await cache.addAll(shellAssets);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("/index.html", copy));
          return response;
        })
        .catch(() => caches.match("/index.html"))
    );
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
