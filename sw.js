const CACHE_NAME = 'muslimbro1400-v2'; // Increment version
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './quran.html',
  './hadith.html',
  './islamic-books.html',
  './quran-recitations.html',
  './islamic-calendar.html',
  './about.html',
  './manifest.json',
  './logo.png',
  './banner.png',
  './moon.png',
  './sun.png',
  './menu.png'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Activate immediately
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Take control immediately
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Optional: Return a fallback offline page
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
