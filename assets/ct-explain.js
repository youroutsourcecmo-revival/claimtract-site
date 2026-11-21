/* ClaimTract explainers for web pages: HumanBot avatar drawn on a canvas (no HumanBot player, no "Click To Play"),
   a button under her feet that stays after she leaves, and "Back to pricing" on the page the button jumps to.
   CTExplain.play(embedId, {label, go}) ; pages opened with ?from=pricing&to=<key> scroll to <key> and show Back to pricing. */
(function(){
var CLIPS={},v,cv,cx,off,ox,raf=null,crop=null,n=0,box,btn,cur=null;
function resolve(id,cb){if(!id){cb(null);return}if(CLIPS[id]){cb(CLIPS[id]);return}
 fetch('https://humanchat.net/campaign/pub/'+encodeURIComponent(id)).then(function(r){return r.json()}).then(function(c){c=c.campaign||c;var m=c.media||{};if(!m.filename||!m.userId)throw 0;var f=String(m.filename);
  CLIPS[id]={url:'https://humanchat.net/uploads/media/'+m.userId+'/'+f.slice(0,2)+'/'+f.slice(2,4)+'/'+f};cb(CLIPS[id])}).catch(function(){cb(null)})}
function css(){if(document.getElementById('ctx-css'))return;var s=document.createElement('style');s.id='ctx-css';s.textContent=
 '.ctx-box{position:fixed;right:18px;bottom:18px;z-index:2147482000;display:flex;flex-direction:column;align-items:center;pointer-events:none}'+
 '.ctx-box canvas{height:min(360px,52vh);width:auto;opacity:0;transition:opacity .25s;pointer-events:auto;cursor:pointer}.ctx-box.on canvas{opacity:1}'+
 '.ctx-btn{pointer-events:auto;margin-top:-4px;background:#F5A524;color:#111;border:0;border-radius:999px;padding:11px 18px;font:800 14px Inter,system-ui,sans-serif;box-shadow:0 10px 26px rgba(0,0,0,.35);cursor:pointer;display:none;align-items:center;gap:8px}.ctx-btn.on{display:inline-flex}'+
 '.ctx-btn i{font-style:normal;opacity:.6;margin-left:4px;padding-left:8px;border-left:1px solid rgba(0,0,0,.25)}'+
 '.ctx-q{display:inline-grid;place-items:center;width:17px;height:17px;border-radius:50%;border:1px solid #5A4512;color:#F5A524;font:800 10px/1 Inter,sans-serif;margin-left:6px;cursor:pointer;vertical-align:1px;background:#15171B;animation:ctxb 2.6s ease-in-out infinite}'+
 '.ctx-q.w{border-color:#ddd;color:#fff;background:#2a2d33;animation-name:ctxw}'+
 '@keyframes ctxb{0%,100%{box-shadow:0 0 0 0 rgba(245,165,36,0)}50%{box-shadow:0 0 0 4px rgba(245,165,36,.25)}}@keyframes ctxw{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,0)}50%{box-shadow:0 0 0 4px rgba(255,255,255,.25)}}'+
 '@media (prefers-reduced-motion:reduce){.ctx-q{animation:none}}'+
 '.ctx-back{position:fixed;left:50%;transform:translateX(-50%);bottom:18px;z-index:2147482001;background:#111;color:#F5A524;border:1px solid #F5A524;border-radius:999px;padding:11px 18px;font:800 14px Inter,system-ui,sans-serif;box-shadow:0 10px 26px rgba(0,0,0,.35);cursor:pointer;text-decoration:none}';
 document.head.appendChild(s)}
function setup(){if(box)return;css();box=document.createElement('div');box.className='ctx-box';cv=document.createElement('canvas');cx=cv.getContext('2d');btn=document.createElement('button');btn.type='button';btn.className='ctx-btn';
 box.appendChild(cv);box.appendChild(btn);document.body.appendChild(box);off=document.createElement('canvas');ox=off.getContext('2d',{willReadFrequently:true});
 v=document.createElement('video');v.playsInline=true;v.setAttribute('playsinline','');v.crossOrigin='anonymous';v.preload='auto';v.style.display='none';box.appendChild(v);
 v.addEventListener('playing',function(){box.classList.add('on');if(!raf)loop()});v.addEventListener('ended',function(){box.classList.remove('on')});
 cv.addEventListener('click',function(){stop()});
 btn.addEventListener('click',function(e){if(e.target.tagName==='I'){btn.classList.remove('on');stop();return}var g=cur&&cur.go;stop();btn.classList.remove('on');if(g)g()})}
function draw(){var W=v.videoWidth,H=v.videoHeight>>1;if(!W||!H)return;if(off.width!==W||off.height!==H*2){off.width=W;off.height=H*2;crop=null}
 ox.drawImage(v,0,0);var rgb=ox.getImageData(0,0,W,H),a=ox.getImageData(0,H,W,H),p=rgb.data,q=a.data,need=!crop||n%30===0,x0=W,x1=0;
 for(var i=0;i<p.length;i+=4){var al=q[i];p[i+3]=al;if(need&&al>40){var x=(i>>2)%W;if(x<x0)x0=x;if(x>x1)x1=x}}
 if(need&&x1>x0){var a0=Math.max(0,x0-6),a1=Math.min(W-1,x1+6);crop=crop?{x0:Math.min(crop.x0,a0),x1:Math.max(crop.x1,a1)}:{x0:a0,x1:a1}}
 var c=crop||{x0:0,x1:W-1},cw=c.x1-c.x0+1;ox.putImageData(rgb,0,0);if(cv.width!==cw||cv.height!==H){cv.width=cw;cv.height=H}cx.clearRect(0,0,cw,H);cx.drawImage(off,c.x0,0,cw,H,0,0,cw,H);n++}
function loop(){if(v.paused||v.ended){raf=null;return}try{draw()}catch(e){}raf=requestAnimationFrame(loop)}
function stop(){try{v.pause()}catch(e){}box&&box.classList.remove('on')}
function play(id,o){setup();cur=o||{};btn.innerHTML=(cur.label||'View this feature')+'<i aria-label="Close">&times;</i>';btn.classList.add('on');stop();
 resolve(id,function(c){if(!c||cur!==o)return;if(v.src!==c.url){v.src=c.url;crop=null}try{v.currentTime=0}catch(e){}v.muted=false;var pr=v.play();
  if(pr&&pr.catch)pr.catch(function(){v.muted=true;v.play().catch(function(){})})})}
function back(label,href,onClick){css();var b=document.querySelector('.ctx-back');if(b)b.remove();b=document.createElement(href?'a':'button');b.className='ctx-back';b.textContent=label||'Back to pricing';if(href)b.href=href;
 b.addEventListener('click',function(e){if(onClick){e.preventDefault();b.remove();onClick()}});document.body.appendChild(b);return b}
window.CTExplain={play:play,stop:stop,back:back,resolve:resolve};
if(document.head)css();else document.addEventListener('DOMContentLoaded',css);
/* arriving from the pricing rail */
var qs=new URLSearchParams(location.search);if(qs.get('from')==='pricing'){
 var T={top:'body',trust:'.pab',hero:'.hero2,.hv',about:'.abt,.hs',article:'.cta-art',answers:'.ans',tools:'.cth-sec',contact:'footer,.cta'};
 function go(){var sel=T[qs.get('to')]||'body',el=document.querySelector(sel);if(el&&sel!=='body')el.scrollIntoView({behavior:'smooth',block:'start'});
  back('Back to pricing','/free/#'+(qs.get('back')||'pricing'))}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(go,400)});else setTimeout(go,400)}
})();
