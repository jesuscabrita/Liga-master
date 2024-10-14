// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches.open('liga-master-v1').then(cache => {
//             return cache.addAll([
//                 '/',
//                 '/favicon.ico',
//                 '/logo1.png',
//                 '/site.webmanifest'
//             ]);
//         })
//     );
// });

// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request).then(response => {
//             return response || fetch(event.request);
//         })
//     );
// });