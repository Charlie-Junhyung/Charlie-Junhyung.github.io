var cacheName = 'pwacache';
var filesToCache = [
  './',
  './index.html',
  './css/style.css', // css style있으면 추가! 
  './js/main.js'
];

/* 서비스 워커를 시작하고 앱 컨텐츠를 캐싱한다 - offline 작동 */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* 오프라인시 리소스 fetch해서 앱이 작동하게끔 한다 */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});