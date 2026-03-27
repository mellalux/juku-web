const CACHE_NAME = "juku-pwa-v0.1.1";
const PRECACHE_URLS = [
  "/",
  "/app-icons/apple-touch-icon.png",
  "/app-icons/icon-192.png",
  "/app-icons/icon-512.png",
  "/data/football-team-data.json",
  "/images/Juku.png",
  "/index.html",
  "/manifest.webmanifest",
  "/version.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.allSettled(
          PRECACHE_URLS.map(async (url) => {
            const response = await fetch(url, { cache: "no-store" });
            if (response.ok) {
              await cache.put(url, response.clone());
            }
          })
        )
      )
      .then(() => self.skipWaiting())
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
    event.respondWith(fetch(request).catch(() => caches.match("/") || caches.match("/index.html")));
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
