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
window.ctLog=put;setInterval(flush,5000);addEventListener('pagehide',function(){try{dwellOut()}catch(e){}put('leave',{secs:Math.round((Date.now()-t0)/1000),sec:window.__ctCur||'',what:lastTap||'',val:Math.max.apply(null,[0].concat(Object.keys(dp).map(Number)))});flush(1)});
document.addEventListener('visibilitychange',function(){if(document.hidden)flush(1)});
/* page view */
var UA=navigator.userAgent,os=/iPad|Macintosh.*Mobile/.test(UA)||(/Macintosh/.test(UA)&&navigator.maxTouchPoints>1)?'iPadOS':/iPhone/.test(UA)?'iOS':/Android/.test(UA)?'Android':/Windows/.test(UA)?'Windows':/Mac/.test(UA)?'macOS':/Linux/.test(UA)?'Linux':'other',
 br=/Edg\//.test(UA)?'Edge':/CriOS|Chrome\//.test(UA)?'Chrome':/FxiOS|Firefox/.test(UA)?'Firefox':/Safari/.test(UA)?'Safari':'other';
var src={};['utm_source','utm_medium','utm_campaign','utm_content','utm_term','src','v','lid','ref'].forEach(function(k){var x=Q.get(k);if(x)src[k]=x});
var first={};try{first=JSON.parse(L.getItem('ct_first')||'null');if(!first){first={src:src,ref:document.referrer,ts:Date.now(),page:P};L.setItem('ct_first',JSON.stringify(first))}}catch(e){first={}}
var visits=1;try{if(!FR&&!sessionStorage.getItem('ct_sv')){visits=(+L.getItem('ct_visits')||0)+1;L.setItem('ct_visits',visits);sessionStorage.setItem('ct_sv','1')}else visits=+L.getItem('ct_visits')||1}catch(e){}
var nav=(performance.getEntriesByType&&performance.getEntriesByType('navigation')[0])||{};
put('view',{ref:document.referrer,utm:src.utm_source||src.src||'',camp:src.utm_campaign||'',med:src.utm_medium||'',cont:src.utm_content||src.v||'',lid:src.lid||'',w:innerWidth,h:innerHeight,os:os,br:br,touch:navigator.maxTouchPoints>0?1:0,visits:visits,ret:visits>1?1:0,hour:new Date().getHours(),tz:(Intl.DateTimeFormat().resolvedOptions().timeZone||''),lang:navigator.language,net:(navigator.connection&&navigator.connection.effectiveType)||'',bot:navigator.webdriver?1:0,first:JSON.stringify(first.src||{}),firstref:first.ref||''});
addEventListener('load',function(){setTimeout(function(){var n=(performance.getEntriesByType&&performance.getEntriesByType('navigation')[0])||{};put('speed',{val:Math.round(n.loadEventEnd||0),ttfb:Math.round(n.responseStart||0),dom:Math.round(n.domContentLoadedEventEnd||0)})},0)});
/* human check: first real pointer or scroll (bots rarely do either) */
var human=0;['pointerdown','scroll','keydown','touchstart'].forEach(function(n){addEventListener(n,function(){if(!human){human=1;put('human',{what:n})}},{once:true,passive:true,capture:true})});
/* errors */
addEventListener('error',function(e){var t=e.target;if(t&&t!==window&&(t.tagName==='VIDEO'||t.tagName==='IMG'||t.tagName==='SOURCE'||t.tagName==='SCRIPT')){put('broken',{what:(t.currentSrc||t.src||'').split('?')[0],tag:t.tagName.toLowerCase()})}else if(e.message){put('js_error',{what:e.message,href:(e.filename||'').split('/').pop()+':'+e.lineno})}},true);
addEventListener('unhandledrejection',function(e){put('js_error',{what:'promise: '+String(e.reason&&e.reason.message||e.reason)})});
/* every tap */
function label(t){var x=t.getAttribute('data-track')||t.getAttribute('aria-label')||t.getAttribute('title')||t.getAttribute('alt')||(t.innerText||t.value||'').replace(/\s+/g,' ').trim();
 if(!x){var i=t.querySelector&&t.querySelector('img[alt],svg[aria-label]');if(i)x=i.getAttribute('alt')||i.getAttribute('aria-label')}
 return (x||(t.tagName.toLowerCase()+(t.className&&typeof t.className==='string'?'.'+t.className.split(' ')[0]:''))).slice(0,80)}
function sect(t){var s=t.closest('section[id],[data-sec],[id]');return s?(s.getAttribute('data-sec')||s.id):''}
var RT=[],lastTap='';
document.addEventListener('click',function(e){var now=Date.now();RT=RT.filter(function(r){return now-r.t<1000&&Math.abs(r.x-e.clientX)<30&&Math.abs(r.y-e.clientY)<30});RT.push({t:now,x:e.clientX,y:e.clientY});
 var tg=e.target;if(RT.length===3)put('rage_tap',{what:tg&&tg.closest?label(tg):'',sec:tg&&tg.closest?sect(tg):'',x:Math.round(100*e.clientX/innerWidth),y:Math.round(e.clientY+scrollY)});
 if(tg&&tg.closest&&!tg.closest('a,button,summary,label,input,select,textarea,[role=button],[data-tab],[data-go],[data-act],[onclick],video,iframe,[tabindex],canvas')&&getComputedStyle(tg).cursor!=='pointer')put('dead_tap',{what:label(tg),sec:sect(tg),x:Math.round(100*e.clientX/innerWidth),y:Math.round(e.clientY+scrollY)});
 var a=tg&&tg.closest&&tg.closest('a[href^="tel:"],a[href^="sms:"],a[href^="mailto:"]');if(a)put(a.href.split(':')[0]+'_tap',{what:label(a),sec:sect(a)})},true);
document.addEventListener('click',function(e){var t=e.target&&e.target.closest?e.target.closest('a,button,summary,label,input,select,[role=button],[data-tab],[data-go],[data-act],[onclick],video,iframe,img')||e.target:null;if(!t||!t.tagName)return;
 var a=t.closest('a');var H=document.documentElement;lastTap=label(t);put('tap',{what:label(t),sec:sect(t),href:a?a.getAttribute('href'):'',tag:t.tagName.toLowerCase(),x:Math.round(100*e.clientX/Math.max(1,innerWidth)),y:Math.round(e.clientY+scrollY),ph:H.scrollHeight,w:innerWidth})},true);
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
/* dwell: seconds each section stays on screen, and re-reads (scrolled back to it) */
var DW={},DS={},DC={};function dwellOut(){var n=Date.now();for(var k in DS){DW[k]=(DW[k]||0)+(n-DS[k]);DS[k]=n}for(var j in DW){if(DW[j]>=1000)put('dwell',{what:j,val:Math.round(DW[j]/1000),secs:DC[j]||1})}DW={}}
try{var dio=new IntersectionObserver(function(es){var n=Date.now();es.forEach(function(x){var k=x.target.id;if(x.isIntersecting){if(!DS[k]){DS[k]=n;DC[k]=(DC[k]||0)+1;window.__ctCur=k}}else if(DS[k]){DW[k]=(DW[k]||0)+(n-DS[k]);delete DS[k]}})},{threshold:.35});
 var dscan=function(){document.querySelectorAll('section[id]').forEach(function(t){if(!t.__ctD){t.__ctD=1;dio.observe(t)}})};dscan();setTimeout(dscan,3000);
 document.addEventListener('visibilitychange',function(){if(document.hidden)dwellOut()})}catch(e){}
/* forms: which field they start, finish, or stop at (never what they type) */
document.addEventListener('focusin',function(e){var t=e.target;if(t&&/INPUT|TEXTAREA|SELECT/.test(t.tagName)&&t.type!=='range')put('field_in',{what:t.name||t.id||t.placeholder||t.type,sec:sect(t)})},true);
document.addEventListener('focusout',function(e){var t=e.target;if(t&&/INPUT|TEXTAREA|SELECT/.test(t.tagName)&&t.type!=='range')put('field_out',{what:t.name||t.id||t.placeholder||t.type,val:t.value?'filled':'empty',sec:sect(t)})},true);
document.addEventListener('submit',function(e){var f=e.target;put('form_submit',{what:f.id||f.getAttribute('name')||f.action||'form',sec:sect(f)})},true);
/* share, copy, add to home screen */
try{if(navigator.share&&!navigator.share.__w){var sh=navigator.share.bind(navigator);navigator.share=function(d){put('share',{what:(d&&(d.title||d.url))||''});return sh(d)};navigator.share.__w=1}}catch(e){}
document.addEventListener('copy',function(){put('copy',{what:String(getSelection()).slice(0,80)})});
addEventListener('beforeinstallprompt',function(){put('install_offer',{})});addEventListener('appinstalled',function(){put('installed',{})});
/* scroll depth */
var dp={};addEventListener('scroll',function(){var h=document.documentElement,p=Math.round(100*(scrollY+innerHeight)/Math.max(1,h.scrollHeight));[25,50,75,100].forEach(function(m){if(p>=m&&!dp[m]){dp[m]=1;put('scroll',{val:m})}})},{passive:true});
/* explainers: which one played, on/off switch */
function wrap(o,n,ev){if(!o||!o[n]||o[n].__w)return;var f=o[n];o[n]=function(a){try{put(ev,{what:typeof a==='string'?a:(a&&a.id)||''})}catch(e){}return f.apply(this,arguments)};o[n].__w=1}
function hook(){wrap(window.CTEsther,'play','explainer');wrap(window.CTExplain,'play','explainer');if(typeof window.hbExplain==='function'&&!window.hbExplain.__w){var h=window.hbExplain;window.hbExplain=function(id){put('explainer',{what:id});return h.apply(this,arguments)};window.hbExplain.__w=1}}
hook();setTimeout(hook,1500);setTimeout(hook,5000);
try{var si=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(this===L&&(k==='ct_exp_off'||k==='ct_xp')){var off=(k==='ct_exp_off'&&v==='1')||(k==='ct_xp'&&v==='0');if(L.getItem(k)!==String(v)&&Date.now()-(window.__ctXT||0)>400){window.__ctXT=Date.now();put(off?'explainers_off':'explainers_on',{what:k})}}return si.apply(this,arguments)}}catch(e){}
})();
