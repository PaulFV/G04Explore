/*
 * Service Worker für G04Explore.
 *
 * Strategie: stale-while-revalidate. Die App startet sofort aus dem Cache und
 * holt im Hintergrund die neue Fassung — sonst sehen Bestandsnutzer nach einem
 * Deploy weiter die alte Version.
 */

const CACHE = "g04explore-v27";

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/category-hero-art.png",
  "./icons/category-tile-sprite.png",
  "./icons/favorites-reference.png",
  "./icons/trips-reference.png",
  "./privacy.html",
  "./imprint.html",
  "./legal.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      // Einzelne fehlende Datei darf die Installation nicht scheitern lassen.
      .then((cache) => Promise.allSettled(ASSETS.map((asset) => cache.add(asset))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Nur eigene GET-Anfragen cachen. Fremde Hosts (z. B. Google Fonts) und
  // POST-Requests gehen unverändert ans Netz.
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  // Die zentrale Laufzeitkonfiguration immer frisch laden. So greift ein
  // aktualisiertes GitHub-Secret sofort und der Key landet nicht im Offline-Cache.
  if (new URL(request.url).pathname.endsWith("/config.js")) return;

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request);

      const fromNetwork = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => null);

      if (cached) {
        // Sofort ausliefern, Aktualisierung läuft nebenher.
        event.waitUntil(fromNetwork);
        return cached;
      }

      const fresh = await fromNetwork;
      if (fresh) return fresh;

      // Offline und nichts im Cache: bei Seitenaufrufen die App-Shell zeigen.
      if (request.mode === "navigate") {
        const shell = await cache.match("./index.html");
        if (shell) return shell;
      }
      return Response.error();
    }),
  );
});
