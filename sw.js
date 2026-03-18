const CACHE_NAME = 'salati-v1.8.9';
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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});