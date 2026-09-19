/*
 * Service Worker für G04Explore.
 *
 * Strategie: stale-while-revalidate. Die App startet sofort aus dem Cache und
 * holt im Hintergrund die neue Fassung — sonst sehen Bestandsnutzer nach einem
 * Deploy weiter die alte Version.
 */

const CACHE = "g04explore-v38";

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./privacy.html",
  "./imprint.html",
  "./legal.css",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/category-tile-sprite.webp",
  "./fonts/dm-sans-latin-ext.woff2",
  "./fonts/dm-sans-latin.woff2",
  "./fonts/fonts.css",
  "./fonts/space-grotesk-latin-ext.woff2",
  "./fonts/space-grotesk-latin.woff2",
  "./images/category/cafes.webp",
  "./images/category/events.webp",
  "./images/category/hotels.webp",
  "./images/category/museums.webp",
  "./images/category/private.webp",
  "./images/category/restaurants.webp",
  "./images/category/sights.webp",
  "./images/category/sport.webp",
  "./images/places/barberini.webp",
  "./images/places/kleine-freiheit.webp",
  "./images/places/riverside-hotel.webp",
  "./images/places/teufelsberg.webp",
  "./images/trips/berlin.webp",
  "./images/trips/munich.webp",
  "./images/trips/museum.webp",
  "./images/header/header-logo.png",
  "./images/header/header-calendar.png",
  "./images/header/header-theme.png",
  "./images/nav/nav-explore.png",
  "./images/nav/nav-heart.png",
  "./images/nav/nav-search.png",
  "./images/nav/nav-settings.png",
  "./images/nav/nav-trips.png",
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
      // index.html lädt styles.css?v=… und app.js?v=…, vorgeladen sind die Dateien
      // ohne Query. Der Cachebuster darf den Offline-Treffer nicht verhindern.
      const cached = await cache.match(request, { ignoreSearch: true });

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
