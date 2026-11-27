const C='1pct-v6';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','anims.json','vasco.glb','logo-1pct-192.png','logo-1pct-180.png'])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.url.includes('supabase.co'))return;
  const page=r.mode==='navigate'||r.url.endsWith('index.html');
  if(page){e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put(r,y));return x}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x})))});

self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={titulo:'1% Mode',corpo:e.data?e.data.text():''}}e.waitUntil(self.registration.showNotification(d.titulo||'1% Mode',{body:d.corpo||'',icon:'logo-1pct-192.png',badge:'logo-1pct-192.png',tag:d.tag||'lembrete',data:{url:'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow('./')}))});
