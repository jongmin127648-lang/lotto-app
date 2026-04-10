// sw.js
self.addEventListener("install", e => {
  self.skipWaiting();

  e.waitUntil(
    caches.open("lotto").then(cache => {
      return cache.addAll(["./", "./index.html"]);
    })
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});