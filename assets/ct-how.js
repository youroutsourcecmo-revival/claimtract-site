/* ClaimTract "See how it works": four-beat story carousel in a modal, one step in focus.
   Nov 26, 2026. Steps 1-2 are videos (/assets/how/panic.mp4, /assets/how/google.mp4),
   steps 3-4 reuse the phone scenes from ct-show.js (window.ctHow). Self-contained: delete this file and the
   CT-HOW button in index.html to remove. */
(function(){
var CSS=`
.hw{position:fixed;inset:0;z-index:9999;background:rgba(8,9,12,.86);display:none;align-items:center;justify-content:center;padding:14px;backdrop-filter:blur(4px)}
.hw.on{display:flex}
.hw-b{width:min(820px,100%);max-height:100%;overflow:auto;background:#111318;color:#F4F4F5;border-radius:22px;padding:18px 18px 16px;position:relative;box-shadow:0 30px 80px rgba(0,0,0,.5)}
.hw-k{font:600 11.5px 'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:#F5A524;margin:2px 44px 12px 4px}
.hw-x,.hw-m{all:unset;position:absolute;top:12px;width:34px;height:34px;border-radius:50%;background:#23262D;color:#fff;display:grid;place-items:center;cursor:pointer;font-size:16px}
.hw-x{right:12px}.hw-m{right:52px}
.hw-t{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:14px}
.hw-gh{all:unset;cursor:pointer;justify-self:center;width:120px;height:214px;border-radius:18px;background:#1B1E24;border:1px solid #2A2E36;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;opacity:.4;transform:scale(.9);transition:opacity .2s,transform .2s;text-align:center;padding:10px;box-sizing:border-box}
.hw-gh:hover{opacity:.75;transform:scale(.95)}.hw-gh i{font-style:normal;font-size:30px}.hw-gh b{font:700 12.5px Inter,sans-serif;color:#ddd}
.hw-gh.no{visibility:hidden}
.hw-s{position:relative;width:254px;height:470px;border-radius:24px;overflow:hidden;background:#15171C;display:flex;align-items:center;justify-content:center}
.hw-s>video{width:100%;height:100%;object-fit:cover;display:block}
.hw-fb{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:radial-gradient(circle at 50% 30%,#2A3550,#0E1118 70%);text-align:center;padding:20px}
.hw-fb i{font-style:normal;font-size:54px}.hw-fb b{font:800 22px Inter,sans-serif}.hw-fb span{font:600 14px Inter,sans-serif;color:#B8BDC7}
.hw-dr{position:absolute;top:0;width:6px;height:10px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#7FB2FF;opacity:.8;animation:hwDrip 1.6s linear infinite}
@keyframes hwDrip{0%{transform:translateY(0);opacity:0}10%{opacity:.9}100%{transform:translateY(470px);opacity:.3}}
.hw-ty{font:600 15px Inter,sans-serif;background:#fff;color:#111;border-radius:22px;padding:10px 14px;min-width:190px;min-height:20px;text-align:left}
.hw-c{text-align:center;margin:14px auto 4px;max-width:560px}
.hw-c h3{margin:0 0 6px;font:800 22px Inter,sans-serif}.hw-c p{margin:0 0 8px;color:#B8BDC7;font-size:15.5px;line-height:1.5}.hw-c q{display:block;quotes:none;font-weight:800;color:#F5A524;font-size:16px}
.hw-n{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px}
.hw-n button{all:unset;cursor:pointer;height:38px;padding:0 16px;border-radius:999px;background:#23262D;font:700 14px Inter,sans-serif}
.hw-n .nx{background:#F5A524;color:#111}
.hw-d{display:flex;gap:7px}.hw-d i{width:8px;height:8px;border-radius:50%;background:#3A3F49;cursor:pointer}.hw-d i.on{background:#F5A524;width:22px;border-radius:5px}
.hw-cta{display:none;margin:12px auto 0;width:max-content;max-width:100%;text-decoration:none;background:#F5A524;color:#111;font:800 15px Inter,sans-serif;padding:12px 20px;border-radius:14px}
.hw-cta.on{display:block}
.cs4-hw{all:unset;cursor:pointer;display:table;margin:14px auto 0;font:800 15px Inter,sans-serif;color:var(--act,#8F5400);border-bottom:2px solid currentColor;padding-bottom:2px}
@media(max-width:640px){.hw-gh{display:none}.hw-t{grid-template-columns:1fr}.hw-s{justify-self:center;width:min(254px,72vw);height:min(470px,62svh)}.hw-b{padding:16px 12px 14px}.hw-c h3{font-size:19px}}
`;
var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);

var S=[
 {i:'&#128167;',h:'She panics',p:'Water through the ceiling at 11 at night. She grabs her phone.',q:'Who does she call first?',v:'/assets/how/panic.mp4',fb:'panic'},
 {i:'&#128269;',h:'She Googles her pain',p:'Not "public adjuster." She types what\'s happening to her house.',q:'Whose name comes up?',v:'/assets/how/google.mp4',fb:'type'},
 {i:'&#128100;',h:'She finds you',p:'Your page answers her exact question, with your face, your video and your License Verified badge.',q:'Who would she trust, you or a stranger with no page?',ph:'find'},
 {i:'&#128222;',h:'Your phone rings',p:'She taps call. Or she leaves her question while you\'re up on a roof, and ClaimTract follows up for you.',q:'How many calls like that are you missing right now?',ph:'call'}];

var m=document.createElement('div');m.className='hw';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-label','See how it works');
m.innerHTML='<div class="hw-b"><p class="hw-k"></p><button class="hw-m" type="button" aria-label="Sound">&#128263;</button><button class="hw-x" type="button" aria-label="Close">&#10005;</button>'+
 '<div class="hw-t"><button class="hw-gh p" type="button"></button><div class="hw-s"></div><button class="hw-gh n" type="button"></button></div>'+
 '<div class="hw-c"><h3></h3><p></p><q></q></div><a class="hw-cta" data-cta href="/free/build/?view=preview">See the page she\'d find &rarr;</a>'+
 '<div class="hw-n"><button class="bk" type="button">&#8249; Back</button><div class="hw-d"></div><button class="nx" type="button">Next &#8250;</button></div></div>';
document.body.appendChild(m);
var stg=m.querySelector('.hw-s'),cur=0,tm=[],mute=true,vid=null;
function T(f,ms){tm.push(setTimeout(f,ms))}
function stop(){tm.forEach(clearTimeout);tm=[];if(window.ctHow)window.ctHow.stop();if(vid){try{vid.pause()}catch(_){}vid=null}stg.innerHTML=''}
function next(){if(cur<S.length-1){cur++;show()}}
function fallback(x){var f=document.createElement('div');f.className='hw-fb';
 if(x.fb==='panic'){f.innerHTML='<i>&#128167;</i><b>11:04 p.m.</b><span>The ceiling is dripping.</span>';for(var k=0;k<7;k++){var d=document.createElement('span');d.className='hw-dr';d.style.left=(12+k*12)+'%';d.style.animationDelay=(k*.23)+'s';f.appendChild(d)}T(next,6500)}
 else{f.innerHTML='<i>&#128241;</i><div class="hw-ty"></div><span>She types what\'s happening.</span>';var ty=f.querySelector('.hw-ty'),s='insurance denied my roof claim';for(var j=0;j<=s.length;j++)(function(j){T(function(){ty.textContent=s.slice(0,j)},300+j*70)})(j);T(next,300+s.length*70+1800)}
 stg.appendChild(f)}
function show(){stop();var x=S[cur];
 m.querySelector('.hw-k').textContent='Step '+(cur+1)+' of 4 · How a homeowner finds you';
 var c=m.querySelector('.hw-c');c.querySelector('h3').textContent=x.h;c.querySelector('p').textContent=x.p;c.querySelector('q').textContent=x.q;
 m.querySelector('.hw-d').innerHTML=S.map(function(_,k){return '<i data-k="'+k+'" class="'+(k===cur?'on':'')+'"></i>'}).join('');
 var gp=m.querySelector('.hw-gh.p'),gn=m.querySelector('.hw-gh.n');
 [[gp,cur-1],[gn,cur+1]].forEach(function(g){var y=S[g[1]];g[0].classList.toggle('no',!y);g[0].innerHTML=y?'<i>'+y.i+'</i><b>'+y.h+'</b>':''});
 m.querySelector('.bk').style.visibility=cur?'visible':'hidden';
 var nx=m.querySelector('.nx');nx.innerHTML=cur<S.length-1?'Next &#8250;':'Watch again';
 m.querySelector('.hw-cta').classList.toggle('on',cur===S.length-1);
 if(x.v){vid=document.createElement('video');vid.muted=mute;vid.playsInline=true;vid.setAttribute('playsinline','');vid.autoplay=true;vid.preload='auto';
  var failed=false;function fail(){if(failed)return;failed=true;if(vid){vid.remove();vid=null}fallback(x)}
  vid.addEventListener('error',fail);vid.addEventListener('ended',function(){T(next,700)});vid.src=x.v;stg.appendChild(vid);
  var pr=vid.play();if(pr&&pr.catch)pr.catch(function(e){if(e&&e.name==='NotSupportedError')fail()});
  T(function(){if(vid&&vid.readyState===0)fail()},2500)}
 else if(window.ctHow){var ms=window.ctHow.run(stg,x.ph);if(x.ph==='find')T(next,ms+400)}
 else{fallback({fb:'type'})}
 try{window.__ctT&&window.__ctT('how_step'+(cur+1))}catch(_){}}
function open(){cur=0;m.classList.add('on');document.documentElement.style.overflow='hidden';show();try{window.__ctT&&window.__ctT('how_open')}catch(_){}}
function close(){stop();m.classList.remove('on');document.documentElement.style.overflow=''}
m.querySelector('.hw-x').onclick=close;m.addEventListener('click',function(e){if(e.target===m)close()});
m.querySelector('.nx').onclick=function(){if(cur<S.length-1)cur++;else cur=0;show()};
m.querySelector('.bk').onclick=function(){if(cur){cur--;show()}};
m.querySelector('.hw-gh.p').onclick=function(){if(cur){cur--;show()}};
m.querySelector('.hw-gh.n').onclick=function(){next()};
m.querySelector('.hw-d').addEventListener('click',function(e){var k=e.target.dataset&&e.target.dataset.k;if(k!=null){cur=+k;show()}});
var mb=m.querySelector('.hw-m');mb.onclick=function(){mute=!mute;mb.innerHTML=mute?'&#128263;':'&#128266;';if(vid)vid.muted=mute};
addEventListener('keydown',function(e){if(!m.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft'&&cur){cur--;show()}});
var tx=null;stg.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
stg.addEventListener('touchend',function(e){if(tx==null)return;var dx=e.changedTouches[0].clientX-tx;tx=null;if(dx<-50)next();else if(dx>50&&cur){cur--;show()}},{passive:true});
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-how]');if(b){e.preventDefault();open()}});
window.ctHowOpen=open;
})();
