/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is the service worker file - this is where we cache the VPIA.
*/
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  // Serve these pages even offline (return 200 ok)
  workbox.precaching.precacheAndRoute([
    { url: "/" },
    { url: "/#/landing" },
    { url: "/#/about" },
    { url: "/#/results" }
  ]);

  // Cache google fonts
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: "google-fonts-stylesheets"
    })
  );

  // Cache images
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
    new workbox.strategies.NetworkFirst({
      cacheName: "images",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  );

  //Cache css and js
  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.NetworkFirst({
      cacheName: "static-resources"
    })
  );

  //Cache woff and ttc
  workbox.routing.registerRoute(
    /\.(?:woff|ttc|otf)$/,
    new workbox.strategies.CacheFirst({
      cacheName: "font-resources"
    })
  );
} else {
  console.log("Workbox failed to load.");
}
