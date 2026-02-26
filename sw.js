const CACHE_NAME = 'salati-v1.4.0'; // رقم الإصدار هنا
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.png'
];

// تثبيت الـ Service Worker وحفظ الملفات
self.addEventListener('install', (event) => {
  console.log(`[Service Worker] Installing Version: ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل النسخة الجديدة وحذف القديمة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// جلب الملفات من الكاش في حال انقطاع الإنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});