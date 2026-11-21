/* ClaimTract page service worker: network first; keeps a copy of pages and files the visitor has opened so the page still opens with no signal. */
var C='ct-pages-v1';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);if(u.origin!==location.origin||u.pathname.indexOf('/api/')===0)return;
 e.respondWith(fetch(r).then(function(res){if(res&&res.ok&&res.type==='basic'){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}return res}).catch(function(){return caches.match(r).then(function(m){return m||caches.match(u.pathname.replace(/[^/]*$/,''))})}))});
