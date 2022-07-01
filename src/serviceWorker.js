
const ITCE = "isTheClassroomEmptyV1"
const assets = [
    "favicon/site.webmanifest",
    "favicon/favicon.ico ",
    "favicon/favicon-32x32.png ",
    "favicon/favicon-16x16.png ",
  "index.html",
  "fullList.html",
  "fullList.js",
  "script.js",
  'serviceWorker.js',
  'data/summer2022.json'
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(ITCE).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })
