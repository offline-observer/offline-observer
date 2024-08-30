const CACHE_NAME = 'your-site-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/styles/main.css',
  '/scripts/main.js'
  // 여기에 사전 캐시할 다른 링크를 추가하세요.
];

// 설치 이벤트 - 캐시 저장
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 요청 이벤트 - 캐시에서 반환
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// 활성화 이벤트 - 오래된 캐시 제거
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
