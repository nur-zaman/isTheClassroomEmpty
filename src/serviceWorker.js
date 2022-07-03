
const semester = 'summer2022V2'
const ITCE = "isTheClassroomEmptyV1.1"
const assets = [
    "favicon/site.webmanifest",
    "favicon/favicon.ico ",
    "favicon/favicon-32x32.png ",
    "favicon/favicon-16x16.png ",
  "index.html",
  "fullList.html",
  "styles.css",
  "js/fullList.js",
  "js/script.js",
  'js/lodash.js',
  'serviceWorker.js',
  `data/${semester}.json`
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
