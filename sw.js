const CACHE_NAME = 'salati-v2.0.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/favicon.ico',           
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-192-maskable.png', 
  './icons/icon-512-maskable.png'  
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log('Deleting old cache:', key);
          return caches.delete(key);
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});