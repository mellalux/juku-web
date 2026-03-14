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

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME);

  await Promise.allSettled(
    APP_SHELL.map(async (asset) => {
      const response = await fetch(asset, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${asset}: ${response.status}`);
      }
      await cache.put(asset, response.clone());
    })
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      await cacheAppShell();
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
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put("/", copy.clone());
              cache.put("/index.html", copy);
            });
          }
          return response;
        })
        .catch(async () => {
          return (await caches.match("/")) || caches.match("/index.html");
        })
    );
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(request).then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
