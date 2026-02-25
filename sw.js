const CACHE_NAME = 'muslimbro1400-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// Install Event: Caches the essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
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
            console.log('Deleting old cache');
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
      // Return the cached file if found, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
});
