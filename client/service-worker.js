importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);
  workboxRouting();

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

function workboxRouting(){
  const cacheName = "VPIA";
  self.addEventListener("install", (e) => {
    e.waitUntil(
      caches.open(cacheName).then(cache => {
        return cache.addAll([
          "/",
          "/index.html"
        ])
      })
    )
  });

  // Cache HTML files
  workbox.routing.registerRoute(
    /\.html$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "html-cache",
    })
  );

  // Cache CSS files
  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "css-cache",
    })
  );

  // Cache image files
  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "image-cache"
    })
  );

  // Cache JS files
  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.StaleWhileRevalidate({
      cachName: "js-cache"
    })
  );

  // Cache JSX files
  workbox.routing.registerRoute(
    /\.jsx$/,
    new workbox.strategies.StaleWhileRevalidate({
      cachName: "react-cache"
    })
  );
}