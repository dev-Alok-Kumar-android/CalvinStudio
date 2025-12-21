const CACHE_NAME = "calvin-studio-v1";

// Caching all core files needed for the app to run offline
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
  "./raw/logo.jpg",
  "./raw/logo-light.svg",
  "./raw/logo-dark.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        // Cache external images dynamically (Cloudinary / Google images)
        if (event.request.destination === "image") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache =>
            cache.put(event.request, clone)
          );
        }
        return response;
      });
    })
  );
});