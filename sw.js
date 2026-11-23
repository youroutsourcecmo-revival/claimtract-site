/* ClaimTract page service worker v2 (Nov 23; matches Atlas's live fix): network first; keeps a copy of pages the visitor opened so the page still opens with no signal. Cleans old caches; never touches /api/, /_ct/ or /webhooks/; skips range requests; offline fallback ignores the query string. */
var C='ct-pages-v2';
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k.indexOf('ct-pages-')===0&&k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET'||r.headers.has('range'))return;var u=new URL(r.url);if(u.origin!==location.origin||/^\/(api|_ct|webhooks)\//.test(u.pathname))return;
 e.respondWith(fetch(r).then(function(res){if(res&&res.ok&&res.type==='basic'){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}return res}).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match(u.pathname.replace(/[^/]*$/,''),{ignoreSearch:true})})}))});
