/* Esther explainers for pages outside the Back office (landing page tool cards).
   Same method as the app: read the HumanBot campaign record, play the packed mp4 (avatar on top, matte below)
   on our own canvas. Plays once per key (localStorage), inside the tap that opened the demo. Tap her to stop. */
(function(){
var CTA={},OFF_ID=/*OFF_CLIP*/'ZHAfSSz6m64e',CLIPS={},IDS={},box,cv,cx,v,off,ox,raf=null,crop=null,n=0,want=false;
function resolve(id,cb){if(CLIPS[id]){cb&&cb(CLIPS[id]);return}
 fetch('https://humanchat.net/campaign/pub/'+encodeURIComponent(id)).then(function(r){return r.json()}).then(function(c){c=c.campaign||c;var m=c.media||{};if(!m.filename||!m.userId)throw 0;var f=String(m.filename);
  CLIPS[id]={url:'https://humanchat.net/uploads/media/'+m.userId+'/'+f.slice(0,2)+'/'+f.slice(2,4)+'/'+f,dur:(m.data&&m.data.duration)||20};cb&&cb(CLIPS[id])}).catch(function(){cb&&cb(null)})}
function el(){if(box)return;var st=document.createElement('style');st.textContent='#ctes{position:fixed;left:12px;bottom:58px;z-index:100000;height:min(46vh,380px);pointer-events:none;opacity:0;transform:translateY(20px);transition:opacity .3s,transform .3s}#ctes.on{opacity:1;transform:none;pointer-events:auto;cursor:pointer}#ctes canvas{height:100%;width:auto;display:block;filter:drop-shadow(0 10px 24px rgba(0,0,0,.35))}';document.head.appendChild(st);
 box=document.createElement('div');box.id='ctes';box.setAttribute('aria-label','Explainer. Tap to stop.');cv=document.createElement('canvas');box.appendChild(cv);document.body.appendChild(box);cx=cv.getContext('2d');
 off=document.createElement('canvas');ox=off.getContext('2d',{willReadFrequently:true});v=document.createElement('video');v.playsInline=true;v.setAttribute('playsinline','');v.crossOrigin='anonymous';v.preload='auto';
 v.addEventListener('playing',function(){box.classList.add('on');if(!raf)loop()});v.addEventListener('ended',stop);box.addEventListener('click',stop)}
function draw(){var W=v.videoWidth,H=v.videoHeight>>1;if(!W||!H)return;if(off.width!==W||off.height!==H*2){off.width=W;off.height=H*2;crop=null}
 ox.drawImage(v,0,0);var rgb=ox.getImageData(0,0,W,H),a=ox.getImageData(0,H,W,H),p=rgb.data,q=a.data,need=!crop||n%30===0,x0=W,x1=0;
 for(var i=0;i<p.length;i+=4){var al=q[i];p[i+3]=al;if(need&&al>40){var x=(i>>2)%W;if(x<x0)x0=x;if(x>x1)x1=x}}
 if(need&&x1>x0){var a0=Math.max(0,x0-6),a1=Math.min(W-1,x1+6);crop=crop?{x0:Math.min(crop.x0,a0),x1:Math.max(crop.x1,a1)}:{x0:a0,x1:a1}}
 var c=crop||{x0:0,x1:W-1},cw=c.x1-c.x0+1;ox.putImageData(rgb,0,0);if(cv.width!==cw||cv.height!==H){cv.width=cw;cv.height=H}cx.clearRect(0,0,cw,H);cx.drawImage(off,c.x0,0,cw,H,0,0,cw,H);n++}
function loop(){if(v.paused||v.ended){raf=null;return}try{draw()}catch(e){}raf=requestAnimationFrame(loop)}

/* the button under her feet: shows while she talks, stays (glowing) after she leaves */
function cta(k){var old=document.getElementById('ctesb');if(old)old.remove();var c=CTA[k];if(!c)return;
 if(!document.getElementById('ctesbS')){var st=document.createElement('style');st.id='ctesbS';st.textContent='#ctesb{position:fixed;left:14px;bottom:14px;z-index:100002;display:flex;align-items:center;gap:6px;font:800 14px Inter,system-ui,sans-serif}#ctesb a{display:inline-flex;align-items:center;gap:8px;background:#F5A524;color:#111;text-decoration:none;padding:12px 16px;border-radius:999px;box-shadow:0 0 0 0 rgba(245,165,36,.7);animation:ctesg 1.8s ease-out infinite}#ctesb button{width:30px;height:30px;border-radius:50%;border:0;background:#14161A;color:#fff;font-size:16px;cursor:pointer}@keyframes ctesg{0%{box-shadow:0 0 0 0 rgba(245,165,36,.75)}70%{box-shadow:0 0 0 16px rgba(245,165,36,0)}100%{box-shadow:0 0 0 0 rgba(245,165,36,0)}}@media(prefers-reduced-motion:reduce){#ctesb a{animation:none}}';document.head.appendChild(st)}
 var w=document.createElement('div');w.id='ctesb';var a=document.createElement('a');a.textContent=c[0]+' →';var h=c[1];
 if(/^#app:/.test(h)){a.href='#demo';a.onclick=function(e){e.preventDefault();var f=document.querySelector('#demo iframe');if(f)f.src='/free/app/?demo=1&go='+h.slice(5);var d=document.getElementById('demo');if(d)d.scrollIntoView({behavior:'smooth',block:'center'});w.remove()}}
 else{a.href=h+(h.indexOf('?')<0?'?':'&')+'back=1'}
 var x=document.createElement('button');x.type='button';x.setAttribute('aria-label','Close');x.textContent='×';x.onclick=function(){w.remove()};w.appendChild(a);w.appendChild(x);document.body.appendChild(w)}
function stop(){want=false;try{v.pause()}catch(e){}if(box)box.classList.remove('on')}
function playClip(c){el();if(v.src!==c.url){v.src=c.url;crop=null}try{v.currentTime=0}catch(e){}v.muted=false;var pr=v.play();
 if(pr&&pr.catch)pr.catch(function(){document.addEventListener('click',function once(){document.removeEventListener('click',once,false);if(want&&v.paused){v.play().catch(function(){})}},false)})}
function seen(k){try{return localStorage.getItem('ct_es_'+k)==='1'}catch(e){return false}}
function mark(k){try{localStorage.setItem('ct_es_'+k,'1')}catch(e){}}
window.CTEsther={
 init:function(map){IDS={};CTA={};for(var k in (map||{})){var m=map[k];if(m&&typeof m==='object'){IDS[k]=m.id;if(m.cta)CTA[k]=m.cta}else IDS[k]=m}for(var j in IDS)if(IDS[j])resolve(IDS[j])},
 play:function(k,force){try{if(localStorage.getItem('ct_exp_off')==='1'||localStorage.getItem('ct_xp')==='0')return}catch(e){}var id=IDS[k];if(!id)return;mark(k);want=true;cta(k);var c=CLIPS[id];if(c)playClip(c);else resolve(id,function(r){if(r&&want)playClip(r)})},
 stop:stop,
 /* turning explainers off: she says how to bring her back, once per tap */
 bye:function(){var id=OFF_ID;if(!id)return;want=true;var c=CLIPS[id];if(c)playClip(c);else resolve(id,function(r){if(r&&want)playClip(r)})}
};
})();

/* Explainers on/off: a tab stuck to the right edge, always in view */
(function(){function off(){try{return localStorage.getItem('ct_exp_off')==='1'||localStorage.getItem('ct_xp')==='0'}catch(e){return false}}
function mk(){if(document.getElementById('ctxt'))return;var st=document.createElement('style');st.textContent='#ctxt{position:fixed;right:0;top:20%;z-index:100001;writing-mode:vertical-rl;transform:rotate(180deg);display:flex;align-items:center;gap:8px;padding:14px 9px;border:0;border-radius:0 12px 12px 0;background:#14161A;color:#fff;font:700 13px Inter,system-ui,sans-serif;letter-spacing:.02em;cursor:pointer;box-shadow:-4px 6px 18px rgba(0,0,0,.25)}#ctxt i{font-style:normal;display:inline-block;width:18px;height:32px;border-radius:99px;background:#555;position:relative;transition:background .2s}#ctxt i::after{content:"";position:absolute;left:2px;top:2px;width:14px;height:14px;border-radius:50%;background:#fff;transition:transform .2s}#ctxt[aria-pressed=true] i{background:#F5A524}#ctxt[aria-pressed=true] i::after{transform:translateY(14px)}#ctxt:focus-visible{outline:3px solid #F5A524}@media(max-width:600px){#ctxt{padding:10px 7px;font-size:12px}}';document.head.appendChild(st);
 var b=document.createElement('button');b.id='ctxt';b.type='button';function set(){var on=!off();b.setAttribute('aria-pressed',String(on));b.innerHTML='<i></i><span>Explainer avatars '+(on?'on':'off')+'</span>';b.title=on?'Tap to turn the video explainers off':'Tap to turn the video explainers on'}set();
 b.onclick=function(){var on=!off();try{localStorage.setItem('ct_exp_off',on?'1':'0');localStorage.setItem('ct_xp',on?'0':'1')}catch(e){}if(on&&window.CTEsther){CTEsther.stop();CTEsther.bye()}set()};document.body.appendChild(b);
 addEventListener('storage',function(e){if(e.key==='ct_exp_off'||e.key==='ct_xp'){set();if(off()&&window.CTEsther)CTEsther.stop()}})}
if(document.body)mk();else document.addEventListener('DOMContentLoaded',mk)})();

(function(){if(!window.__ctOne){var sc=document.createElement('script');sc.src='/assets/ct-one.js?v=2';document.head.appendChild(sc)}addEventListener('ct-hush',function(){if(window.CTEsther)CTEsther.stop()})})();
