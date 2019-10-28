/*
@Mordax
This is the Service worker file using Google's workbox. This defines how the 
application's files should be cached and dealt with. 
Stale while Revalidate allows the user to access the old cached version - 
if there's a change, it will asynchronously update the cache with the 
latest version.
*/

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  console.log("Workbox loaded.");
  workbox.precaching.precacheAndRoute([]);
  workboxRouting();
} else {
  console.log("Workbox failed to load.");
}

function workboxRouting() {
  const CACHE = "VPIA";
  const ERROR_CACHE = "error-cache";

  self.addEventListener("install", e => {
    e.waitUntil(
      caches.open(CACHE).then(cache => {
        return cache.addAll(["/"]);
      })
    );
  });

  addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response; // if valid response is found in cache return it
        } else {
          return fetch(event.request) //fetch from internet
            .then(res => {
              return caches.open(CACHE).then(cache => {
                cache.put(event.request.url, res.clone()); //save the response for future
                return res; // return the fetched data
              });
            })
            .catch(() => {
              // fallback mechanism
              return caches.open(ERROR_CACHE).then(cache => {
                return cache.match("/404.html");
              });
            });
        }
      })
    );
  });

  // Cache HTML files
  workbox.routing.registerRoute(
    /\.html$/,
    new workbox.strategies.StaleWhileRevalidate({
      CACHE: "html-cache"
    })
  );

  // Cache CSS files
  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      CACHE: "css-cache"
    })
  );

  // Cache image files
  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.StaleWhileRevalidate({
      CACHE: "image-cache"
    })
  );

  // Cache JS files
  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.StaleWhileRevalidate({
      CACHE: "js-cache"
    })
  );
}
