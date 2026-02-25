const CACHE_NAME = 'muslimbro1400-v1';
const ASSETS_TO_CACHE = [
  '/Muslimbro1400.com/',
  '/Muslimbro1400.com/index.html',
  '/Muslimbro1400.com/manifest.json',
  '/Muslimbro1400.com/logo.png' // Change to /src/logo.png if it's in the src folder
];

// Install Event: Caches the essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event: Cleans up old versions of the cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event: Serves files from cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});