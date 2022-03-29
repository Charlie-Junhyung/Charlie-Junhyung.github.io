const cacheName = 'pwacache';
const filesToCache = [
  './',
  './index.html',
  //'./css/style.css', // css style있으면 추가! 
  './js/main.js',

];

/* 서비스 워커를 시작하고 앱 컨텐츠를 캐싱한다 - offline 작동 */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
  //self.skipWaiting();
});

/* 오프라인시 리소스 fetch해서 앱이 작동하게끔 한다 */
self.addEventListener('fetch', function(e) {
  console.info(e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request)),
  );
});