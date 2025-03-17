// Service Worker para caching y funcionalidad offline
const CACHE_NAME = "ginkgo-devs-cache-v1"

// Lista de recursos para pre-cachear
const urlsToCache = ["/", "/offline.html", "/favicon.ico", "/site.webmanifest", "/logo.png"]

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

// Activación y limpieza de caches antiguos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Estrategia de caching: Network first, fallback to cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, clonarla y guardarla en cache
        if (event.request.method === "GET" && response.status === 200) {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })
        }
        return response
      })
      .catch(() => {
        // Si falla la red, intentar desde cache
        return caches.match(event.request).then((response) => {
          if (response) {
            return response
          }

          // Si el recurso no está en cache y es una página HTML, mostrar offline.html
          if (event.request.headers.get("accept").includes("text/html")) {
            return caches.match("/offline.html")
          }
        })
      }),
  )
})

