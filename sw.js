self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!='GET'||/mangadex|gutendex|gutenberg/.test(u.hostname))return;
  e.respondWith(caches.open('pp1').then(async c=>{
    const m=await c.match(e.request);
    const f=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>m);
    return m||f;
  }));
});
