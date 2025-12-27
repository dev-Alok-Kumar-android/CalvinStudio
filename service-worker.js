const VERSION = "v1.0.3";

const STATIC_CACHE = `calvin-static-${VERSION}`;
const IMAGE_CACHE = `calvin-images-${VERSION}`;

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
  "./raw/logo-mono.svg",
  "./raw/whatsapp.png",
];

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

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

  if (req.destination === "document") {
    event.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

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

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});