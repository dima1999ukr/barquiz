const CACHE_NAME = 'barquiz-v' + new Date().getTime(); // Jedes Mal ein komplett neuer Cache-Name!
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.svg'
];

// Install: Alle Assets in den Cache laden
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS))
  );
  self.skipWaiting(); // Neue Version sofort aktivieren
});

// Aktivieren: Alte Caches löschen
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: Cache-first bei Assets, sonst Netz -> Cache
self.addEventListener('fetch', (e) => {
  // Nur GET-Anfragen cachen
  if (e.request.method !== 'GET') return;

  // Nur eigene App-Seiten cachen (gleicher Origin)
  const url = new URL(e.request.url);

  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached; // Aus Cache servieren

      return fetch(e.request).then((res) => {
        // Nur gültige Antworten cachen
        if (!res || res.status !== 200 || res.type !== 'basic') return res;

        // Response klonen (kann nur einmal gelesen werden)
        const clone = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
        return res;
      }).catch(() => {
        // Netz nicht verfügbar — falls verfügbar, Fallback-Seite zeigen
        // Bei index.html haben wir die schon im Cache
        return caches.match('index.html');
      });
    })
  );
});
