/* ClaimTract Back office service worker (Nov 23). Network first for the app shell; never caches /api/. Shows push alerts and opens the app on tap. */
var C='ct-bo-v1';
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);if(u.origin!==location.origin||u.pathname.indexOf('/api/')===0||u.pathname.indexOf('/free/app/')!==0)return;
 e.respondWith(fetch(r).then(function(res){if(res&&res.ok&&res.type==='basic'){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}return res}).catch(function(){return caches.match(r).then(function(m){return m||caches.match('/free/app/')})}))});
self.addEventListener('push',function(e){var d={};try{d=e.data?e.data.json():{}}catch(x){d={title:'ClaimTract',body:e.data?e.data.text():''}}
 e.waitUntil(self.registration.showNotification(d.title||'ClaimTract',{body:d.body||'',icon:'/assets/app-192.png',badge:'/assets/app-192.png',tag:d.tag||undefined,data:{url:d.url||'/free/app/'}}))});
self.addEventListener('notificationclick',function(e){e.notification.close();var url=(e.notification.data&&e.notification.data.url)||'/free/app/';
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){for(var i=0;i<cs.length;i++){if(cs[i].url.indexOf('/free/app/')>=0&&'focus' in cs[i]){cs[i].navigate&&cs[i].navigate(url);return cs[i].focus()}}return self.clients.openWindow(url)}))});
