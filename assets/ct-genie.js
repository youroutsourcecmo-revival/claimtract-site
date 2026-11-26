/* CT-GENIE: after the logo splash, Sophia's welcome + tools video plays on every visit, then pours (Mac Genie) into the
   Sophia tab. Tapping Sophia pours her back out of the tab before the walk opens. */
(function(){
var SRC='/assets/sophia-tools.mp4?v=2',Q=new URLSearchParams(location.search),
 ID=Q.get('id')||Q.get('uid')||Q.get('c')||'anon',K='ct_sx_tools_'+ID,app=document.getElementById('app');
if(!app)return;
var st=document.createElement('style');st.textContent='#sgx{position:absolute;inset:0;z-index:94;pointer-events:none}#sgx canvas{position:absolute;inset:0;width:100%;height:100%}#sgx .gb{position:absolute;right:10px;top:34px;display:flex;gap:6px;pointer-events:auto}#sgx .gb button{border:0;border-radius:99px;background:rgba(11,31,58,.82);color:#fff;font:700 10px Inter;padding:6px 11px;cursor:pointer}[data-tab=sophia].gpul svg,[data-tab=sophia].gpul i:first-child{animation:gpul .45s 2}@keyframes gpul{50%{transform:scale(1.55)}}';document.head.appendChild(st);
function seen(){return false} /* plays every visit (Ezekiel 11/26) */
function mark(){try{localStorage.setItem(K,'1')}catch(e){}}
function tabEl(){var a=document.querySelectorAll('[data-tab="sophia"]'),b=null;for(var i=0;i<a.length;i++){var r=a[i].getBoundingClientRect();if(r.width>0&&r.height>0)b=a[i]}return b}
function navH(){var t=tabEl(),n=t&&t.closest('.nav'),A=app.getBoundingClientRect();return n?Math.max(40,A.bottom-n.getBoundingClientRect().top):58}
var ease=function(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2},cl=function(t){return Math.max(0,Math.min(1,t))};
function mk(){var d=document.createElement('div');d.id='sgx';d.innerHTML='<canvas></canvas>';app.appendChild(d);var c=d.firstChild,A=app.getBoundingClientRect(),k=Math.min(2,window.devicePixelRatio||1);c.width=Math.round(A.width*k);c.height=Math.round(A.height*k);return{d:d,c:c,x:c.getContext('2d'),k:k,A:A}}
function cover(src){var sw=src.videoWidth||src.naturalWidth,sh=src.videoHeight||src.naturalHeight;return{sw:sw,sh:sh}}
function full(o,src,Hv){var W=o.c.width,s=cover(src),r=W/Hv,cw=Math.min(s.sw,s.sh*r),ch=cw/r,sx=(s.sw-cw)/2,sy=Math.max(0,(s.sh-ch)*.35);return{sx:sx,sy:sy,cw:cw,ch:ch}}
function genie(o,src,p){var x=o.x,W=o.c.width,H=o.c.height,Hv=H-navH()*o.k,t=tabEl(),T={x:W*.9,y:H-20*o.k,w:20*o.k};
 if(t){var r=t.getBoundingClientRect(),i=t.querySelector('svg')||t;var ri=i.getBoundingClientRect();T={x:(ri.left+ri.width/2-o.A.left)*o.k,y:(ri.top+ri.height/2-o.A.top)*o.k,w:Math.max(14,ri.width)*o.k}}
 var g=full(o,src,Hv),S=110;x.clearRect(0,0,W,H);
 var q=function(f){return cl(p*1.7-(1-f)*.7)},Y=function(f){var e=ease(q(f));return f*Hv+(T.y-f*Hv)*e};
 for(var i=0;i<S;i++){var f=i/S,y1=Y(f),y2=Y((i+1)/S);if(y2-y1<.2)continue;var e=ease(cl(q(f)*1.25)),w=W+(T.w-W)*e,cx=W/2+(T.x-W/2)*e;
  x.drawImage(src,g.sx,g.sy+f*g.ch,g.cw,g.ch/S+1,cx-w/2,y1,w,y2-y1+1)}}
function pour(o,src,rev,ms,done){var t0=null;function f(ts){if(!t0)t0=ts;var p=cl((ts-t0)/ms);genie(o,src,rev?1-p:p);if(p<1)requestAnimationFrame(f);else done()}requestAnimationFrame(f)}
function pulse(){var t=tabEl();if(!t)return;t.classList.remove('gpul');void t.offsetWidth;t.classList.add('gpul');setTimeout(function(){t.classList.remove('gpul')},1000)}
var busy=false;
function intro(){if(busy||seen()||document.getElementById('sgx'))return;var tb=tabEl();if(tb&&!tb.classList.contains('nup'))return;busy=true;
 var o=mk(),v=document.createElement('video');v.src=SRC;v.playsInline=true;v.setAttribute('playsinline','');v.preload='auto';
 var bar=document.createElement('div');bar.className='gb';bar.innerHTML='<button data-g="snd" style="display:none">Tap for sound</button><button data-g="skip">Skip</button>';o.d.appendChild(bar);
 var raf=null,gone=false;function draw(){if(gone)return;var H=o.c.height,Hv=H-navH()*o.k,g=full(o,v,Hv);o.x.clearRect(0,0,o.c.width,H);if(v.videoWidth)o.x.drawImage(v,g.sx,g.sy,g.cw,g.ch,0,0,o.c.width,Hv);raf=requestAnimationFrame(draw)}
 function out(){if(gone)return;gone=true;cancelAnimationFrame(raf);mark();bar.remove();try{v.pause()}catch(e){}pour(o,v,false,1000,function(){o.d.remove();busy=false;pulse()})}
 bar.addEventListener('click',function(e){var b=e.target.closest('[data-g]');if(!b)return;e.stopPropagation();if(b.dataset.g==='snd'){v.muted=false;b.style.display='none'}else{lg('video_skip');out()}});
 function lg(n){try{window.ctLog&&window.ctLog(n,{what:'sophia-tools intro',val:Math.round(v.currentTime)})}catch(e){}}v.addEventListener('playing',function(){lg('video_play')},{once:true});v.addEventListener('ended',function(){lg('video_end')});v.addEventListener('ended',out);v.addEventListener('playing',function(){if(!raf)draw()});
 v.muted=false;var pr=v.play();if(pr&&pr.catch)pr.catch(function(){v.muted=true;bar.querySelector('[data-g=snd]').style.display='';v.play().catch(out)})}
/* reverse: pour Sophia out of the tab, then open the walk */
var still=null;function prep(){if(still)return;still=new Image();still.src='/assets/sophia-back.jpg'}
var pass=false;
function hook(){document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-tab="sophia"]');
 if(!t||pass||busy||!t.classList.contains('nup')||document.getElementById('wlk')||!still||!still.complete||!still.naturalWidth)return;
 e.preventDefault();e.stopImmediatePropagation();busy=true;var o=mk();
 pour(o,still,true,650,function(){busy=false;pass=true;try{t.click()}finally{pass=false}var w=document.getElementById('wlk'),dn=false,rm=function(){if(dn)return;dn=true;setTimeout(function(){o.d.remove()},250)};if(w)w.addEventListener('load',function(){setTimeout(rm,500)});setTimeout(rm,2500)})},true)}
function tapWait(){var c=document.createElement('div');c.id='tapgo';c.style.cssText='position:absolute;inset:0;z-index:510;cursor:pointer;background:transparent';c.setAttribute('data-track','Tap to start (phone)');app.appendChild(c);
 function go(){if(!c.parentNode)return;c.remove();try{parent.postMessage({ct:'started'},'*')}catch(e){}window.__ctTapped=1;var sp=document.getElementById('spl');if(sp&&!sp.classList.contains('off')&&typeof window.ctSplashTap==='function'){window.ctSplashTap(intro)}else if(sp&&!sp.classList.contains('off')&&typeof window.ctSplashEnd==='function'){window.ctSplashEnd();setTimeout(intro,500)}else intro()}
 c.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();go()});
 addEventListener('message',function(e){if(e.data&&e.data.ct==='start')go()})}
function start(){prep();hook();
 if(Q.has('tap')){tapWait();return} /* home-page phone: nothing plays until tapped (Ezekiel 11/26) */
 var spl=document.getElementById('spl');
 if(spl&&!spl.classList.contains('off')){var mo=new MutationObserver(function(){if(spl.classList.contains('off')){mo.disconnect();setTimeout(intro,450)}});mo.observe(spl,{attributes:true,attributeFilter:['class']})}
 else setTimeout(intro,600)}
window.ctGenieBack=function(done){prep();if(busy||!still||!still.complete||!still.naturalWidth||document.getElementById('sgx')){done();return}busy=true;var o=mk();genie(o,still,0);done();pour(o,still,false,800,function(){o.d.remove();busy=false;pulse()})};
window.ctGenieReplay=function(){try{localStorage.removeItem(K)}catch(e){}intro()};
start();
})();
