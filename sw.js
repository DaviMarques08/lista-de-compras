const CACHE_NAME = "mercado-app-v4";
const assets = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./assets/icon-128.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil (
    caches.keys().then((nomesDosCaches) => {
      return Promise.all(
        nomesDosCaches.map((cache) =>{
          if(cache !== CACHE_NAME) {
            console.log("Limpando cache antigo:", cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});