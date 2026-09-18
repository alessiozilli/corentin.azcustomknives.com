/* Le fil - Corentin's seat, kept as correspondence. Minimal network-first worker.
 *
 * This origin is his alone (corentin.azcustomknives.com), so the worker owns every
 * same-origin path. Anything on another origin, Supabase above all, falls straight
 * through and is never cached: his letters and the answers are always fetched.
 *
 * Network ALWAYS first. The cache exists so the page frame still opens on a plane,
 * on a train or on one bar of signal somewhere in France, and the words he typed
 * stay in the box until it can reach the shop again.
 *
 * v1 (2026-09-18). The CACHE string is also what the page reports as its version;
 * move both together whenever index.html changes shape.
 */
var CACHE = 'fil-shell-v1';
var SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon-192.png'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).catch(function () {}));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var url;
  try { url = new URL(e.request.url); } catch (err) { return; }

  if (url.origin !== self.location.origin) return;              // supabase: never ours
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); }).catch(function () {});
      }
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (hit) {
        return hit || caches.match('/index.html');
      });
    })
  );
});
