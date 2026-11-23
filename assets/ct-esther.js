/* Esther explainers for pages outside the Back office (landing page tool cards).
   Same method as the app: read the HumanBot campaign record, play the packed mp4 (avatar on top, matte below)
   on our own canvas. Plays once per key (localStorage), inside the tap that opened the demo. Tap her to stop. */
(function(){
var CLIPS={},IDS={},box,cv,cx,v,off,ox,raf=null,crop=null,n=0,want=false;
function resolve(id,cb){if(CLIPS[id]){cb&&cb(CLIPS[id]);return}
 fetch('https://humanchat.net/campaign/pub/'+encodeURIComponent(id)).then(function(r){return r.json()}).then(function(c){c=c.campaign||c;var m=c.media||{};if(!m.filename||!m.userId)throw 0;var f=String(m.filename);
  CLIPS[id]={url:'https://humanchat.net/uploads/media/'+m.userId+'/'+f.slice(0,2)+'/'+f.slice(2,4)+'/'+f,dur:(m.data&&m.data.duration)||20};cb&&cb(CLIPS[id])}).catch(function(){cb&&cb(null)})}
function el(){if(box)return;var st=document.createElement('style');st.textContent='#ctes{position:fixed;left:12px;bottom:0;z-index:100000;height:min(46vh,380px);pointer-events:none;opacity:0;transform:translateY(20px);transition:opacity .3s,transform .3s}#ctes.on{opacity:1;transform:none;pointer-events:auto;cursor:pointer}#ctes canvas{height:100%;width:auto;display:block;filter:drop-shadow(0 10px 24px rgba(0,0,0,.35))}';document.head.appendChild(st);
 box=document.createElement('div');box.id='ctes';box.setAttribute('aria-label','Explainer. Tap to stop.');cv=document.createElement('canvas');box.appendChild(cv);document.body.appendChild(box);cx=cv.getContext('2d');
 off=document.createElement('canvas');ox=off.getContext('2d',{willReadFrequently:true});v=document.createElement('video');v.playsInline=true;v.setAttribute('playsinline','');v.crossOrigin='anonymous';v.preload='auto';
 v.addEventListener('playing',function(){box.classList.add('on');if(!raf)loop()});v.addEventListener('ended',stop);box.addEventListener('click',stop)}
function draw(){var W=v.videoWidth,H=v.videoHeight>>1;if(!W||!H)return;if(off.width!==W||off.height!==H*2){off.width=W;off.height=H*2;crop=null}
 ox.drawImage(v,0,0);var rgb=ox.getImageData(0,0,W,H),a=ox.getImageData(0,H,W,H),p=rgb.data,q=a.data,need=!crop||n%30===0,x0=W,x1=0;
 for(var i=0;i<p.length;i+=4){var al=q[i];p[i+3]=al;if(need&&al>40){var x=(i>>2)%W;if(x<x0)x0=x;if(x>x1)x1=x}}
 if(need&&x1>x0){var a0=Math.max(0,x0-6),a1=Math.min(W-1,x1+6);crop=crop?{x0:Math.min(crop.x0,a0),x1:Math.max(crop.x1,a1)}:{x0:a0,x1:a1}}
 var c=crop||{x0:0,x1:W-1},cw=c.x1-c.x0+1;ox.putImageData(rgb,0,0);if(cv.width!==cw||cv.height!==H){cv.width=cw;cv.height=H}cx.clearRect(0,0,cw,H);cx.drawImage(off,c.x0,0,cw,H,0,0,cw,H);n++}
function loop(){if(v.paused||v.ended){raf=null;return}try{draw()}catch(e){}raf=requestAnimationFrame(loop)}
function stop(){want=false;try{v.pause()}catch(e){}if(box)box.classList.remove('on')}
function playClip(c){el();if(v.src!==c.url){v.src=c.url;crop=null}try{v.currentTime=0}catch(e){}v.muted=false;var pr=v.play();
 if(pr&&pr.catch)pr.catch(function(){document.addEventListener('click',function once(){document.removeEventListener('click',once,false);if(want&&v.paused){v.play().catch(function(){})}},false)})}
function seen(k){try{return localStorage.getItem('ct_es_'+k)==='1'}catch(e){return false}}
function mark(k){try{localStorage.setItem('ct_es_'+k,'1')}catch(e){}}
window.CTEsther={
 init:function(map){IDS=map||{};for(var k in IDS)if(IDS[k])resolve(IDS[k])},
 play:function(k,force){var id=IDS[k];if(!id||(!force&&seen(k)))return;mark(k);want=true;var c=CLIPS[id];if(c)playClip(c);else resolve(id,function(r){if(r&&want)playClip(r)})},
 stop:stop
};
})();
