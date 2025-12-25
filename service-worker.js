const VERSION = "v1.0.0"; 

const STATIC_CACHE = `calvin-static-${VERSION}`;
const IMAGE_CACHE  = `calvin-images-${VERSION}`;

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./style.css",
  "./App/tailwind.css",
  "./App/state.js",
  "./App/utils.js",
  "./App/ui.js",
  "./App/lightbox.js",
  "./App/main.js",
  "./raw/logo-192.png",
  "./raw/logo-512.png",
  "./raw/logo-mono.png",
  "./raw/whatsapp.png",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => !key.includes(VERSION))
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;

  // 🔹 HTML: Network-first (always latest UI)
  if (req.destination === "document") {
    event.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
    return;
  }

  // 🔹 Images: Cache-first (performance + offline)
  if (req.destination === "image") {
    event.respondWith(
      caches.match(req).then(cached => {
        return (
          cached ||
          fetch(req).then(res => {
            const clone = res.clone();
            caches.open(IMAGE_CACHE).then(cache => {
              cache.put(req, clone);
            });
            return res;
          })
        );
      })
    );
    return;
  }

  // 🔹 CSS / JS / other assets: Cache-first
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});