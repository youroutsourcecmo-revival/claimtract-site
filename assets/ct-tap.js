/* CT-TAP-LOG: every tap, view, video and explainer choice on the public pages → POST /api/taps (batched).
   Anonymous visitor id only. Owner's own activity is never sent: open any page once with ?ctowner=1
   (off by default: his taps count until he resets); ?ctowner=0 turns it back off. Ezekiel, Nov 26. */
(function(){
if(window.__ctTap)return;window.__ctTap=1;
var L=localStorage,Q=new URLSearchParams(location.search),P=location.pathname;
try{if(Q.get('ctowner')==='1')L.setItem('ct_owner','1');if(Q.get('ctowner')==='0')L.removeItem('ct_owner')}catch(e){}
function owner(){try{return L.getItem('ct_owner')==='1'}catch(e){return false}}
/* the app is also the real Back office: only log it as the public demo */
if(/^\/free\/app/.test(P)&&!Q.has('demo'))return;
function vid(){try{var v=L.getItem('ct_vid');if(!v){v='v'+Math.random().toString(36).slice(2,12);L.setItem('ct_vid',v)}return v}catch(e){return 'anon'}}
var S='s'+Math.random().toString(36).slice(2,10),FR=window.top!==window.self,q=[],t0=Date.now();
function put(ev,f){if(owner())return;var o={ev:ev,page:P,ts:Date.now()};if(FR)o.frame=1;for(var k in f)if(f[k]!=null&&f[k]!=='')o[k]=String(f[k]).slice(0,120);q.push(o);if(q.length>=25)flush()}
function flush(end){if(!q.length)return;var body=JSON.stringify({visitor:vid(),session:S,events:q.splice(0)});
 try{if(end&&navigator.sendBeacon&&navigator.sendBeacon('/api/taps',new Blob([body],{type:'application/json'})))return}catch(e){}
 try{fetch('/api/taps',{method:'POST',headers:{'Content-Type':'application/json'},body:body,keepalive:true}).catch(function(){})}catch(e){}}
window.ctLog=put;setInterval(flush,5000);addEventListener('pagehide',function(){put('leave',{secs:Math.round((Date.now()-t0)/1000)});flush(1)});
document.addEventListener('visibilitychange',function(){if(document.hidden)flush(1)});
/* page view */
put('view',{ref:document.referrer,utm:Q.get('utm_source')||Q.get('src')||'',lid:Q.get('lid')||'',w:innerWidth});
/* every tap */
function label(t){var x=t.getAttribute('data-track')||t.getAttribute('aria-label')||t.getAttribute('title')||t.getAttribute('alt')||(t.innerText||t.value||'').replace(/\s+/g,' ').trim();
 if(!x){var i=t.querySelector&&t.querySelector('img[alt],svg[aria-label]');if(i)x=i.getAttribute('alt')||i.getAttribute('aria-label')}
 return (x||(t.tagName.toLowerCase()+(t.className&&typeof t.className==='string'?'.'+t.className.split(' ')[0]:''))).slice(0,80)}
function sect(t){var s=t.closest('section[id],[data-sec],[id]');return s?(s.getAttribute('data-sec')||s.id):''}
document.addEventListener('click',function(e){var t=e.target&&e.target.closest?e.target.closest('a,button,summary,label,input,select,[role=button],[data-tab],[data-go],[data-act],[onclick],video,iframe,img')||e.target:null;if(!t||!t.tagName)return;
 var a=t.closest('a');var H=document.documentElement;put('tap',{what:label(t),sec:sect(t),href:a?a.getAttribute('href'):'',tag:t.tagName.toLowerCase(),x:Math.round(100*e.clientX/Math.max(1,innerWidth)),y:Math.round(e.clientY+scrollY),ph:H.scrollHeight,w:innerWidth})},true);
document.addEventListener('toggle',function(e){var d=e.target;if(d&&d.tagName==='DETAILS'&&d.open){var s=d.querySelector('summary');put('open',{what:s?s.innerText.trim():'details',sec:sect(d)})}},true);
document.addEventListener('input',function(e){var t=e.target;if(t&&t.type==='range')put('slide',{what:t.id||label(t),val:t.value,sec:sect(t)})},true);
/* videos: play, finish */
['play','ended'].forEach(function(n){document.addEventListener(n,function(e){var v=e.target;if(!v||v.tagName!=='VIDEO')return;var s=(v.currentSrc||v.src||'').split('/').pop().split('?')[0];
 put(n==='play'?'video_play':'video_end',{what:s,muted:v.muted?1:0,sec:sect(v)})},true)});
function vname(v){return (v.currentSrc||v.src||'').split('/').pop().split('?')[0]||'video'}
var VW=new WeakMap();
document.addEventListener('timeupdate',function(e){var v=e.target;if(!v||v.tagName!=='VIDEO'||!v.duration||!isFinite(v.duration))return;var m=VW.get(v);if(!m){m={};VW.set(v,m)}var p=100*v.currentTime/v.duration;[10,25,50,75,90].forEach(function(k){if(p>=k&&!m[k]){m[k]=1;put('video_progress',{what:vname(v),val:k,sec:sect(v)})}})},true);
document.addEventListener('pause',function(e){var v=e.target;if(!v||v.tagName!=='VIDEO'||v.ended)return;put('video_pause',{what:vname(v),val:Math.round(v.currentTime),secs:Math.round(v.duration||0),sec:sect(v)})},true);
document.addEventListener('volumechange',function(e){var v=e.target;if(!v||v.tagName!=='VIDEO')return;put(v.muted?'video_mute':'video_unmute',{what:vname(v),val:Math.round(v.currentTime)})},true);
/* seen: every section and every button/link that came into view (cold = seen but never tapped) */
try{var seen={},io=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;var t=x.target,k=t.id||label(t);io.unobserve(t);if(seen[k])return;seen[k]=1;put('seen',{what:t.matches('section,[id]')&&!t.matches('a,button')?'#'+t.id:label(t),sec:sect(t),tag:t.tagName.toLowerCase()})})},{threshold:.5});
 var scan=function(){document.querySelectorAll('section[id],a,button,summary,[role=button],[data-tab],video').forEach(function(t){if(!t.__ctS&&t.offsetWidth){t.__ctS=1;io.observe(t)}})};scan();setTimeout(scan,2000);setTimeout(scan,6000)}catch(e){}
/* scroll depth */
var dp={};addEventListener('scroll',function(){var h=document.documentElement,p=Math.round(100*(scrollY+innerHeight)/Math.max(1,h.scrollHeight));[25,50,75,100].forEach(function(m){if(p>=m&&!dp[m]){dp[m]=1;put('scroll',{val:m})}})},{passive:true});
/* explainers: which one played, on/off switch */
function wrap(o,n,ev){if(!o||!o[n]||o[n].__w)return;var f=o[n];o[n]=function(a){try{put(ev,{what:typeof a==='string'?a:(a&&a.id)||''})}catch(e){}return f.apply(this,arguments)};o[n].__w=1}
function hook(){wrap(window.CTEsther,'play','explainer');wrap(window.CTExplain,'play','explainer');if(typeof window.hbExplain==='function'&&!window.hbExplain.__w){var h=window.hbExplain;window.hbExplain=function(id){put('explainer',{what:id});return h.apply(this,arguments)};window.hbExplain.__w=1}}
hook();setTimeout(hook,1500);setTimeout(hook,5000);
try{var si=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(this===L&&(k==='ct_exp_off'||k==='ct_xp')){var off=(k==='ct_exp_off'&&v==='1')||(k==='ct_xp'&&v==='0');if(L.getItem(k)!==String(v)&&Date.now()-(window.__ctXT||0)>400){window.__ctXT=Date.now();put(off?'explainers_off':'explainers_on',{what:k})}}return si.apply(this,arguments)}}catch(e){}
})();
