// Service worker: guarda a casca do app; dados do Firebase sempre vão para a rede
const C="gwh-v2",A=["/","/index.html","/manifest.webmanifest","/icon-192.png","/icon-512.png","/apple-touch-icon.png","/favicon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(C).then(h=>h.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||caches.match("/index.html"))))});
