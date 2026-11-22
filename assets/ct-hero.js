/* ClaimTract hero video: every visit picks one "on the roof" clip and one "with the homeowner" clip
   from /assets/bg/lib/index.json and plays them back to back with a soft crossfade, looping until the tab closes.
   Leave the tab and come back: a new pair. Data saver or reduced motion: still image only.
   Add clips by dropping roof-N.mp4/.jpg or home-N.mp4/.jpg in /assets/bg/lib/ and listing them in index.json. Owner: Claude. */
(function(){
var LIB='/assets/bg/lib/',man=null,last=[];
function lite(){var c=navigator.connection;return (c&&(c.saveData||/2g/.test(c.effectiveType||'')))||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}
function pick(a,avoid){if(!a||!a.length)return null;var b=a.filter(function(x){return x!==avoid});b=b.length?b:a;return b[Math.floor(Math.random()*b.length)]}
function css(){if(document.getElementById('cthv-css'))return;var s=document.createElement('style');s.id='cthv-css';
 s.textContent='.hero2 .cthv{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:0;transition:opacity .9s ease}.hero2 .cthv.on{opacity:1}';document.head.appendChild(s)}
function mk(h,ref){var v=document.createElement('video');v.className='cthv';v.muted=true;v.defaultMuted=true;v.playsInline=true;v.setAttribute('playsinline','');v.setAttribute('muted','');v.preload='auto';h.insertBefore(v,ref);return v}
function run(h){var old=h.querySelector('video.hv');if(!old||h._cthv)return;
 var roof=pick(man.roof,last[0]),home=pick(man.home,last[1]);if(!roof||!home)return;last=[roof,home];
 css();var A=mk(h,old),B=mk(h,old),seq=[[A,roof],[B,home]],cur=0,alive=true;h._cthv={stop:function(){alive=false;A.pause();B.pause();A.remove();B.remove();old.style.visibility='';h._cthv=null}};
 A.poster=LIB+roof+'.jpg';A.src=LIB+roof+'.mp4';B.src=LIB+home+'.mp4';
 function show(i){var v=seq[i][0],o=seq[1-i][0];try{v.currentTime=0}catch(e){}var p=v.play();if(p&&p.catch)p.catch(function(){});v.classList.add('on');o.classList.remove('on');old.style.visibility='hidden'}
 function tick(e){var v=e.target;if(!alive||v!==seq[cur][0]||!v.duration)return;if(v.duration-v.currentTime<0.95){cur=1-cur;show(cur)}}
 A.addEventListener('timeupdate',tick);B.addEventListener('timeupdate',tick);
 A.addEventListener('ended',function(){if(alive&&cur===0){cur=1;show(1)}});B.addEventListener('ended',function(){if(alive&&cur===1){cur=0;show(0)}});
 A.addEventListener('canplay',function f(){A.removeEventListener('canplay',f);show(0)});}
function all(){[].forEach.call(document.querySelectorAll('.hero2.hasv'),run)}
function fresh(){[].forEach.call(document.querySelectorAll('.hero2.hasv'),function(h){if(h._cthv)h._cthv.stop()});all()}
function init(){if(lite())return;fetch(LIB+'index.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(m){man=m;all();
 var away=false;document.addEventListener('visibilitychange',function(){if(document.hidden){away=true}else if(away){away=false;fresh()}})}).catch(function(){})}
window.CTHero={init:init,fresh:fresh};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
