/* ClaimTract "show, then show" cards: four benefit cards, each opens an animated phone scene in a modal.
   Nov 25, 2026. Sample names only (Cedric, Mary). No brand logos. */
(function(){
var CSS=`
.shw{padding:46px 0 10px}
.shw-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.shw-c{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;background:var(--card,#fff);border:1px solid var(--ln,#E1E1DC);border-radius:18px;padding:20px 18px;transition:transform .2s,box-shadow .2s,border-color .2s}
.shw-c{position:relative;overflow:hidden;animation:shwBob 6s ease-in-out infinite}.shw-c:nth-child(2){animation-delay:1.5s}.shw-c:nth-child(3){animation-delay:3s}.shw-c:nth-child(4){animation-delay:4.5s}
.shw-c:before{content:"";position:absolute;top:0;bottom:0;left:-60%;width:40%;background:linear-gradient(100deg,transparent,rgba(245,165,36,.18),transparent);transform:skewX(-18deg);animation:shwGlint 6s ease-in-out infinite;animation-delay:inherit;pointer-events:none}
@keyframes shwBob{0%,80%,100%{transform:none;box-shadow:none}88%{transform:translateY(-5px);box-shadow:0 14px 30px rgba(245,165,36,.18);border-color:#F0D49A}}
@keyframes shwGlint{0%,78%{left:-60%}92%,100%{left:130%}}
.shw-c:hover,.shw-c:focus-visible{animation:none;transform:translateY(-5px) scale(1.02);box-shadow:0 18px 36px rgba(0,0,0,.12);border-color:#F5A524}
.shw-c:hover .shw-w i,.shw-c:focus-visible .shw-w i{transform:scale(1.25)}
.shw-i{width:44px;height:44px;border-radius:13px;background:#FFF3DC;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
.shw-i svg{width:24px;height:24px}
.shw-c h3{margin:0 0 6px;font:800 18px/1.2 Inter,sans-serif;color:var(--tx,#111)}
.shw-c p{margin:0 0 14px;font-size:14.5px;line-height:1.5;color:var(--mu,#55585F);flex:1}
.shw-w{display:inline-flex;align-items:center;gap:7px;font:800 13px Inter,sans-serif;color:#8F5400}
.shw-w i{position:relative;width:26px;height:26px;border-radius:50%;background:#F5A524;display:inline-flex;align-items:center;justify-content:center;font-style:normal;color:#111;font-size:10px;padding-left:2px;transition:transform .2s}.shw-w i:after{content:"";position:absolute;inset:-4px;border-radius:50%;border:2px solid #F5A524;animation:shwPing 1.8s ease-out infinite}@keyframes shwPing{0%{transform:scale(.8);opacity:.9}100%{transform:scale(1.6);opacity:0}}
.shw-c:hover .shw-i{background:#F5A524}.shw-i{transition:background .2s}
.shw-n{margin:14px 0 0;text-align:center;font-size:13px;color:var(--mu,#55585F)}
@media(max-width:900px){.shw-g{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.shw-g{gap:10px}.shw-c{padding:14px 13px}.shw-c h3{font-size:15.5px}.shw-c p{font-size:13px;margin-bottom:10px}.shw-i{width:36px;height:36px;margin-bottom:10px}.shw-i svg{width:20px;height:20px}}
.shm{position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;background:rgba(8,9,12,.78);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
.shm.on{display:flex}
.shm-b{position:relative;width:min(420px,94vw);max-height:96svh;overflow:auto;background:#0E1014;color:#fff;border-radius:24px;padding:16px 16px 18px;box-shadow:0 30px 80px rgba(0,0,0,.5)}
.shm-t{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 10px}
.shm-t b{font:800 15px Inter,sans-serif}.shm-t small{display:block;font:600 11px Inter,sans-serif;color:#9AA0A8;letter-spacing:.08em;text-transform:uppercase;margin-bottom:2px}
.shm-x{all:unset;cursor:pointer;width:34px;height:34px;border-radius:50%;background:#1d2128;display:flex;align-items:center;justify-content:center;font-size:16px;flex:none}
.shm-s{position:relative;height:min(470px,58svh);border-radius:18px;overflow:hidden;background:#15171C}
.shm-l{margin:12px 2px 10px;font:800 17px/1.35 Inter,sans-serif;min-height:46px}
.shm-a{display:flex;gap:8px;align-items:center}
.shm-a .rp,.shm-a .nv{all:unset;cursor:pointer;height:44px;padding:0 14px;border-radius:12px;background:#1d2128;color:#fff;font:700 13px Inter,sans-serif;display:flex;align-items:center;gap:6px}
.shm-a .cta{flex:1;text-align:center;height:44px;line-height:44px;border-radius:12px;background:#F5A524;color:#111;font:800 14px Inter,sans-serif;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 10px}
.shm-d{display:flex;justify-content:center;gap:6px;margin-top:10px}.shm-d i{width:7px;height:7px;border-radius:50%;background:#3a3f48}.shm-d i.on{background:#F5A524;width:20px;border-radius:4px}
/* phone inside the stage */
.sp2{position:absolute;left:50%;top:50%;width:230px;height:430px;max-height:92%;transform:translate(-50%,-50%);border-radius:30px;background:#0b0c0f;border:3px solid #2c3038;box-shadow:0 20px 50px rgba(0,0,0,.5);overflow:hidden}
.sp2 .scr{position:absolute;inset:8px;border-radius:23px;overflow:hidden;background:#F4F4F1;color:#111}
.fade{opacity:0;transition:opacity .5s}.fade.in{opacity:1}
/* scene 1 */
.s1-k{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#2a2418 0%,#0b0c0f 70%)}
.s1-pg{position:absolute;inset:0;padding:16px 14px;background:#fff;transform:translateY(105%);transition:transform .38s cubic-bezier(.2,.8,.2,1)}
.s1-pg.in{transform:none}.s1-pg.out{transform:translateY(-12%) scale(.94);opacity:.0;transition:transform .38s,opacity .38s}
.s1-pg h4{margin:6px 0 8px;font:800 15px/1.2 Inter,sans-serif}.s1-pg .bar{height:7px;border-radius:4px;background:#E7E7E2;margin:6px 0}.s1-pg .bar.s{width:62%}.s1-pg .hd{height:70px;border-radius:12px;background:linear-gradient(135deg,#2b3340,#121418);margin-bottom:8px}
.s1-pg .who{display:flex;align-items:center;gap:8px}.s1-pg .who i{width:34px;height:34px;border-radius:50%;background:url(/assets/cedric-headshot.jpg) center 20%/cover;border:2px solid #F5A524}
.s1-pg .lic{display:inline-flex;align-items:center;gap:6px;margin-top:10px;padding:7px 10px;border-radius:10px;background:#E8F7EF;color:#0E7A4F;font:800 12px Inter,sans-serif}
.s1-ct{position:absolute;right:10px;top:10px;z-index:5;background:#F5A524;color:#111;border-radius:999px;padding:4px 9px;font:800 11px 'JetBrains Mono',ui-monospace,monospace}
.s1-sp{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:18px;align-items:center;opacity:0;transition:opacity .6s}
.s1-sp.in{opacity:1}
.s1-sp .a{background:#23262d;border-radius:14px;padding:12px;filter:grayscale(1);color:#9AA0A8;font:600 11.5px/1.4 Inter,sans-serif;text-align:center}
.s1-sp .a .bc{height:52px;border-radius:6px;background:#3a3e46;margin-bottom:8px;display:flex;align-items:center;justify-content:center;font:700 10px Inter;color:#c5c8cd}
.s1-sp .b{background:#fff;color:#111;border-radius:14px;padding:12px;box-shadow:0 0 0 2px #F5A524,0 0 40px rgba(245,165,36,.55);text-align:center;font:800 12px/1.35 Inter,sans-serif;animation:glow 1.6s ease-in-out infinite alternate}
.s1-sp .b .mini{height:82px;border-radius:8px;background:linear-gradient(#2b3340 0 40%,#fff 40%);margin-bottom:8px;position:relative}
.s1-sp .b .mini:after{content:"";position:absolute;left:8px;right:8px;top:48px;height:5px;border-radius:3px;background:#E7E7E2;box-shadow:0 10px 0 #E7E7E2,0 20px 0 #F5A524}
@keyframes glow{to{box-shadow:0 0 0 2px #F5A524,0 0 60px rgba(245,165,36,.85)}}
/* scene 2 */
.s2{position:absolute;inset:0;background:#fff;padding:16px 12px}
.s2-q{display:flex;align-items:center;gap:8px;border:1.5px solid #dadce0;border-radius:999px;padding:9px 12px;font:600 12.5px Inter,sans-serif;min-height:18px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.s2-q svg{flex:none;width:14px;height:14px}.s2-q .tx{flex:1;white-space:nowrap;overflow:hidden}.s2-q .cur{width:1.5px;height:15px;background:#111;animation:blink 1s steps(1) infinite}
.s2-q .tx.x{text-decoration:line-through;text-decoration-color:#E5484D;text-decoration-thickness:2px;color:#9AA0A8}
@keyframes blink{50%{opacity:0}}
.s2-e{margin:16px 6px;font:600 12px Inter,sans-serif;color:#9AA0A8;opacity:0;transition:opacity .4s}.s2-e.in{opacity:1}
.s2-r{position:relative;margin-top:12px}
.s2-row{padding:9px 6px;border-bottom:1px solid #f0f0ee;opacity:0;transform:translateY(8px);transition:all .35s}.s2-row.in{opacity:1;transform:none}
.s2-row u{display:block;text-decoration:none;font:700 12.5px/1.3 Inter,sans-serif;color:#1a3fa8}.s2-row s{display:block;text-decoration:none;font:600 10.5px Inter;color:#188038;margin:2px 0}.s2-row i{display:block;height:6px;border-radius:3px;background:#EDEDEA;margin-top:4px}
.s2-me{position:absolute;left:0;right:0;top:240px;padding:10px;border-radius:12px;background:#FFF8E8;border:1.5px solid #F5A524;display:flex;gap:9px;align-items:flex-start;opacity:0;transition:top .9s cubic-bezier(.2,.8,.2,1),opacity .4s,box-shadow .4s}
.s2-me.in{opacity:1}.s2-r.shift .s2-row{transform:translateY(152px)}.s2-me.up{top:-6px;box-shadow:0 10px 28px rgba(245,165,36,.4)}
.s2-me b{display:block;font:800 12.5px/1.3 Inter,sans-serif;color:#1a3fa8}.s2-me small{display:block;font:600 10.5px Inter;color:#188038;margin-top:2px}.s2-me em{display:block;font:500 10.5px/1.35 Inter;color:#55585F;font-style:normal;margin-top:3px}
.s2-me .av{flex:none;width:36px;height:36px;border-radius:50%;background:url(/assets/cedric-headshot.jpg) center 20%/cover;border:2px solid #F5A524}
.tap{position:absolute;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(245,165,36,.45);transform:scale(0);pointer-events:none}.tap.go{animation:tap .7s ease-out forwards}
@keyframes tap{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.6);opacity:0}}
.ring{position:absolute;inset:0;background:#0E1014;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;opacity:0;transition:opacity .4s;font:700 14px Inter,sans-serif}
.ring.in{opacity:1}.ring .av{width:84px;height:84px;border-radius:50%;background:url(/assets/cedric-headshot.jpg) center 20%/cover;border:3px solid #F5A524}
.ring .ph{width:54px;height:54px;border-radius:50%;background:#22C55E;display:flex;align-items:center;justify-content:center;font-size:24px;animation:shake .5s ease-in-out infinite;margin-top:14px}
.ring small{color:#9AA0A8;font-weight:600}
@keyframes shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-14deg)}75%{transform:rotate(14deg)}}
/* scene 3 */
.s3{position:absolute;inset:0;background:#0b0c0f}
.s3-vf{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transition:opacity .4s}
.s3-doc{width:150px;height:200px;background:#fff;border-radius:6px;padding:14px 12px;transform:rotate(-4deg);box-shadow:0 10px 30px rgba(0,0,0,.5)}
.s3-doc b{display:block;font:800 10px Inter;color:#B42318;margin-bottom:8px;letter-spacing:.04em}.s3-doc i{display:block;height:5px;border-radius:3px;background:#E3E3DF;margin:6px 0}.s3-doc i.s{width:60%}
.s3-fr{position:absolute;inset:30px 26px;border:2px solid rgba(255,255,255,.7);border-radius:14px}
.s3-fl{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}.s3-fl.go{animation:flash .45s ease-out}
@keyframes flash{0%{opacity:.9}100%{opacity:0}}
.s3-w{position:absolute;inset:0;background:#F4F4F1;opacity:0;transition:opacity .4s}.s3-w.in{opacity:1}
.s3-pb{position:absolute;left:16px;right:16px;top:22px;font:700 11.5px Inter;color:#55585F}.s3-pb div{height:7px;border-radius:4px;background:#E3E3DF;margin-top:6px;overflow:hidden}.s3-pb div i{display:block;height:100%;width:0;background:#F5A524;transition:width 1.6s ease}
.s3-pl{position:absolute;left:50%;top:44%;width:96px;height:60px;margin:-30px 0 0 -48px;border-radius:12px;background:#15171C;color:#fff;font:800 10.5px/1.25 Inter;padding:9px;transform:scale(0);transition:transform .45s cubic-bezier(.3,1.5,.5,1);z-index:3;text-align:center;display:flex;align-items:center;justify-content:center}
.s3-pl.in{transform:scale(1)}
.s3-ch{position:absolute;width:58px;height:30px;margin:-15px 0 0 -29px;border-radius:8px;background:#fff;border:1px solid #E1E1DC;box-shadow:0 3px 8px rgba(0,0,0,.08);transform:scale(0);transition:transform .35s cubic-bezier(.3,1.5,.5,1);padding:6px}
.s3-ch.in{transform:scale(1)}.s3-ch i{display:block;height:4px;border-radius:2px;background:#E3E3DF;margin:2px 0}.s3-ch i.a{background:#F5A524;width:70%}
.s3-ch .dot{position:absolute;right:-4px;top:-4px;width:10px;height:10px;border-radius:50%;background:#22C55E;transform:scale(0);transition:transform .25s}.s3-ch.live .dot{transform:scale(1)}
.s3-ln{position:absolute;inset:0;width:100%;height:100%;z-index:1}.s3-ln line{stroke:#F0D49A;stroke-width:1.5;stroke-dasharray:4 3;opacity:0;transition:opacity .4s}.s3-ln line.in{opacity:1}
.s3-ap{position:absolute;left:24px;right:24px;bottom:22px;height:40px;border-radius:12px;background:#F5A524;color:#111;font:800 14px/40px Inter;text-align:center;transform:translateY(80px);transition:transform .4s}
.s3-ap.in{transform:none}.s3-ap.ok{background:#22C55E;color:#fff}
.s3-sw{position:absolute;right:10px;top:10px;z-index:6;background:#15171C;color:#F5A524;border-radius:999px;padding:4px 9px;font:800 11px 'JetBrains Mono',ui-monospace,monospace}
/* scene 4 */
.s4{position:absolute;inset:0;background:linear-gradient(#0b1430,#18244d);transition:background 1.2s}
.s4.day{background:linear-gradient(#bfe3ff,#fdf3dc)}
.s4-moon{position:absolute;right:18px;top:16px;width:30px;height:30px;border-radius:50%;box-shadow:-7px 4px 0 0 #f5e6b8;transition:opacity .8s,transform 1.2s}
.s4.day .s4-moon{opacity:0;transform:translateY(40px)}
.s4-sun{position:absolute;left:50%;top:110%;width:56px;height:56px;margin-left:-28px;border-radius:50%;background:#FFC93C;box-shadow:0 0 50px #FFC93C;transition:top 1.4s ease}
.s4.day .s4-sun{top:9%}
.s4-clk{position:absolute;left:0;right:0;top:44px;text-align:center;color:#fff;font:800 34px 'JetBrains Mono',ui-monospace,monospace;transition:color 1s,opacity .6s}
.s4-clk small{display:block;font:600 11px Inter;color:#9fb0d8;letter-spacing:.1em;margin-top:2px}
.s4.day .s4-clk{color:#15171C}.s4.day .s4-clk small{color:#55585F}
.s4-ch{position:absolute;left:10px;right:10px;bottom:12px;top:120px;background:#fff;border-radius:16px;padding:10px;display:flex;flex-direction:column;gap:7px;transition:opacity .6s,transform .6s}
.s4-ch.gone{opacity:0;transform:translateY(30px)}
.s4-ch .hd{font:800 11px Inter;color:#15171C;padding-bottom:6px;border-bottom:1px solid #eee;display:flex;align-items:center;gap:6px}.s4-ch .hd i{width:8px;height:8px;border-radius:50%;background:#22C55E}
.bb{max-width:82%;padding:7px 10px;border-radius:13px;font:600 11.5px/1.35 Inter,sans-serif;opacity:0;transform:translateY(6px);transition:all .35s}.bb.in{opacity:1;transform:none}
.bb.h{align-self:flex-end;background:#2563EB;color:#fff;border-bottom-right-radius:4px}.bb.a{align-self:flex-start;background:#F1F1EE;color:#111;border-bottom-left-radius:4px}
.bb.sv{align-self:center;background:#E8F7EF;color:#0E7A4F;font-weight:800}
.typ{align-self:flex-start;display:none;gap:3px;padding:8px 10px;border-radius:13px;background:#F1F1EE}.typ.in{display:flex}.typ i{width:5px;height:5px;border-radius:50%;background:#9AA0A8;animation:tp 1s infinite}.typ i:nth-child(2){animation-delay:.15s}.typ i:nth-child(3){animation-delay:.3s}
@keyframes tp{50%{transform:translateY(-3px)}}
.s4-ls{position:absolute;left:10px;right:10px;top:122px;display:flex;flex-direction:column;gap:8px}
.nt{background:rgba(255,255,255,.85);backdrop-filter:blur(6px);border-radius:14px;padding:9px 11px;display:flex;gap:9px;align-items:center;opacity:0;transform:translateY(-14px);transition:all .45s;box-shadow:0 6px 16px rgba(0,0,0,.08)}
.nt.in{opacity:1;transform:none}.nt i{flex:none;width:26px;height:26px;border-radius:7px;background:#15171C url(/assets/ct-shield.png) center/70% no-repeat}.nt b{display:block;font:800 11.5px Inter;color:#15171C}.nt span{display:block;font:500 10.5px Inter;color:#55585F}
@media (prefers-reduced-motion:reduce){.shm *{transition:none!important;animation:none!important}}
`;
var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);

var CTA='/free/build/?view=preview';
var ICON={
 web:'<svg viewBox="0 0 24 24" fill="none" stroke="#8F5400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/></svg>',
 find:'<svg viewBox="0 0 24 24" fill="none" stroke="#8F5400" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>',
 app:'<svg viewBox="0 0 24 24" fill="none" stroke="#8F5400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/><path d="M9.5 10.5l2 2 3-3.5"/></svg>',
 night:'<svg viewBox="0 0 24 24" fill="none" stroke="#8F5400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M21 3.5a2.5 2.5 0 1 1-3 3"/></svg>'};
var S=[
 {k:'web',h:'Your 13-page website',p:'Your name, your photo, your license, 13 pages deep. How do you look when a homeowner checks you out tonight?',t:'What she sees at 11 p.m.',l:"She's checking you out right now. What does she find?",run:s1},
 {k:'find',h:'Your claims become answers',p:'Nobody Googles "public adjuster." They Google their denied claim. What if your story is what they find?',t:'Nobody types your title',l:"They don't search for you. They search for what you fix.",run:s2},
 {k:'app',h:'The app that makes it stupidly simple',p:'Snap your claim, approve the story, and it\'s live. Could getting found really take five minutes a claim?',t:'Five minutes a claim',l:'One claim in, ten or more pages out. You just approve.',run:s3},
 {k:'night',h:'It answers while you sleep',p:'Your website talks to homeowners at 3 a.m. and tells you who\'s reading. How many calls slipped away last month?',t:'3:07 a.m.',l:"You slept. Your website didn't. Who's on your list this morning?",run:s4}];

/* replace the old four cards */
var old=document.querySelector('section.pts');if(!old)return;
var sec=document.createElement('section');sec.className='shw';sec.setAttribute('aria-label','What you get');
sec.innerHTML='<div class="shw-g">'+S.map(function(x,i){return '<button type="button" class="shw-c" data-i="'+i+'"><span class="shw-i">'+ICON[x.k]+'</span><h3>'+x.h+'</h3><p>'+x.p+'</p><span class="shw-w"><i>&#9654;</i>Watch it &middot; 9 sec</span></button>'}).join('')+'</div>';
old.parentNode.replaceChild(sec,old);

var m=document.createElement('div');m.className='shm';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
m.innerHTML='<div class="shm-b"><div class="shm-t"><div><small id="shmK"></small><b id="shmT"></b></div><div style="display:flex;gap:6px"><button type="button" class="shm-x shm-m" aria-label="Sound on or off"></button><button type="button" class="shm-x" aria-label="Close">&#10005;</button></div></div><div class="shm-s" id="shmS"></div><p class="shm-l" id="shmL"></p><div class="shm-a"><button type="button" class="rp">&#8635; Replay</button><a class="cta" data-cta href="'+CTA+'">See my free website</a><button type="button" class="nv" aria-label="Next">Next &#8250;</button></div><div class="shm-d" id="shmD"></div></div>';
document.body.appendChild(m);
var stage=m.querySelector('#shmS'),cur=0,timers=[],tsx=null,vo=null,mute=false;try{mute=localStorage.getItem('ct_show_mute')==='1'}catch(_){}
function T(f,ms){timers.push(setTimeout(f,ms))}
function clear(){timers.forEach(clearTimeout);timers=[];stage.innerHTML='';if(vo){try{vo.pause()}catch(_){}vo=null}}
function el(h){var d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild}
function open(i){cur=i;m.classList.add('on');document.documentElement.style.overflow='hidden';play();try{window.__ctT&&window.__ctT('show_'+S[i].k)}catch(_){}}
function close(){clear();m.classList.remove('on');document.documentElement.style.overflow=''}
function play(){clear();var x=S[cur];m.querySelector('#shmK').textContent=(cur+1)+' of 4 · '+x.h;m.querySelector('#shmT').textContent=x.t;var L=m.querySelector('#shmL');L.textContent='';L.classList.remove('in');
 m.querySelector('#shmD').innerHTML=S.map(function(_,k){return '<i class="'+(k===cur?'on':'')+'"></i>'}).join('');
 m.querySelector('.nv').innerHTML=cur<3?'Next &#8250;':'Start over';
 /* Ezekiel's voiceover (rendered on the box). Silent if the file isn't there yet. */
 vo=new Audio('/assets/vo/show-'+(cur+1)+'.mp3');vo.muted=mute;vo.preload='auto';var p=vo.play();if(p&&p.catch)p.catch(function(){});
 var end=x.run(stage);T(function(){L.textContent=x.l},end||8500)}
sec.addEventListener('click',function(e){var c=e.target.closest('.shw-c');if(c)open(+c.dataset.i)});
var mb=m.querySelector('.shm-m');function mlab(){mb.innerHTML=mute?'&#128263;':'&#128266;'}mlab();mb.onclick=function(){mute=!mute;try{localStorage.setItem('ct_show_mute',mute?'1':'0')}catch(_){}if(vo)vo.muted=mute;mlab()};
m.querySelector('.shm-x:not(.shm-m)').onclick=close;m.addEventListener('click',function(e){if(e.target===m)close()});
m.querySelector('.rp').onclick=play;m.querySelector('.nv').onclick=function(){cur=(cur+1)%4;play()};
addEventListener('keydown',function(e){if(!m.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight'){cur=(cur+1)%4;play()}if(e.key==='ArrowLeft'){cur=(cur+3)%4;play()}});
stage.addEventListener('touchstart',function(e){tsx=e.touches[0].clientX},{passive:true});
stage.addEventListener('touchend',function(e){if(tsx==null)return;var dx=e.changedTouches[0].clientX-tsx;tsx=null;if(Math.abs(dx)>50){cur=(cur+(dx<0?1:3))%4;play()}},{passive:true});

function phone(inner){var p=el('<div class="sp2"><div class="scr"></div></div>');p.firstChild.innerHTML=inner;stage.appendChild(p);return p.firstChild}

/* 1: thirteen pages flip past, then the split */
function s1(){var bg=el('<div class="s1-k"></div>');stage.appendChild(bg);var scr=phone('<div class="s1-ct">1 / 13</div>');
 var P=[['home','Water damage to your home? Get someone in your corner.'],['who','Cedric Moore, public adjuster'],['lic','License verified with the state'],['p','Roof and wind claims'],['p','Water damage claims'],['p','Mold claims'],['p','Fire and smoke claims'],['p','Denied claims'],['p','What happens when you call'],['p','Questions homeowners ask'],['p','What it costs'],['p','Book a time with me'],['p','Save my contact']];
 var ct=scr.querySelector('.s1-ct'),prev=null;
 P.forEach(function(q,i){T(function(){var h='';if(q[0]==='home')h='<div class="hd"></div><h4>'+q[1]+'</h4><div class="bar"></div><div class="bar s"></div>';else if(q[0]==='who')h='<div class="who"><i></i><h4 style="margin:0">'+q[1]+'</h4></div><div class="bar" style="margin-top:12px"></div><div class="bar"></div><div class="bar s"></div>';else if(q[0]==='lic')h='<h4>'+q[1]+'</h4><div class="bar"></div><div class="bar s"></div><span class="lic">&#10003; Active license on file</span>';else h='<h4>'+q[1]+'</h4><div class="bar"></div><div class="bar"></div><div class="bar s"></div><div class="bar"></div><div class="bar s"></div>';
  var pg=el('<div class="s1-pg">'+h+'</div>');scr.appendChild(pg);requestAnimationFrame(function(){requestAnimationFrame(function(){pg.classList.add('in')})});if(prev){var o=prev;o.classList.add('out');T(function(){o.remove()},420)}prev=pg;ct.textContent=(i+1)+' / 13'},300+i*420)});
 T(function(){var sp=el('<div class="s1-sp"><div class="a"><div class="bc">BUSINESS CARD</div>A card, and a Facebook page with 3 likes</div><div class="b"><div class="mini"></div>Your 13-page website</div></div>');stage.querySelector('.sp2').style.transition='opacity .5s';stage.querySelector('.sp2').style.opacity='0';stage.appendChild(sp);T(function(){sp.classList.add('in')},60)},300+13*420+700);
 return 300+13*420+1500}

/* 2: the search they actually type */
function s2(){var scr=phone('<div class="s2"><div class="s2-q"><svg viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg><span class="tx"></span><span class="cur"></span></div><p class="s2-e">Nobody types this.</p><div class="s2-r"></div></div>');
 var tx=scr.querySelector('.tx'),e=scr.querySelector('.s2-e'),r=scr.querySelector('.s2-r');
 function type(s,at,cb){for(var i=0;i<=s.length;i++)(function(i){T(function(){tx.textContent=s.slice(0,i)},at+i*55)})(i);T(cb,at+s.length*55+250)}
 var a='public adjuster near me',b='insurance denied my roof claim orlando';
 type(a,300,function(){tx.classList.add('x');e.classList.add('in');
  T(function(){tx.classList.remove('x');tx.textContent='';e.classList.remove('in');
   type(b,0,function(){var rows=[['Roof claim denied? 5 things to check','insurer-guide.example','2'],['Florida roof claim rules explained','state-info.example',''],['Why roof claims get denied','homeblog.example','']];
    rows.forEach(function(x,i){T(function(){var d=el('<div class="s2-row"><u>'+x[0]+'</u><s>'+x[1]+'</s><i></i></div>');r.appendChild(d);requestAnimationFrame(function(){d.classList.add('in')})},i*220)});
    T(function(){var me=el('<div class="s2-me"><span class="av"></span><div><b>Why your roof claim was denied, and what to do next</b><small>claimtract.app/cedric-moore</small><em>Cedric Moore, public adjuster in Orlando</em></div></div>');r.appendChild(me);requestAnimationFrame(function(){me.classList.add('in');T(function(){me.classList.add('up');r.classList.add('shift')},350)})},900);
    T(function(){var t=el('<span class="tap"></span>');t.style.left='60%';t.style.top='120px';scr.appendChild(t);requestAnimationFrame(function(){t.classList.add('go')})},2500);
    T(function(){var g=el('<div class="ring"><span class="av"></span>Calling Cedric Moore<small>from his website</small><span class="ph">&#128222;</span></div>');scr.appendChild(g);requestAnimationFrame(function(){g.classList.add('in')})},3000)})},900)});
 return 300+a.length*55+250+900+b.length*55+250+3400}

/* 3: one claim in, ten pages out */
function s3(){var scr=phone('<div class="s3"><div class="s3-vf"><div class="s3-doc"><b>NOTICE OF CLAIM DECISION</b><i></i><i class="s"></i><i></i><i></i><i class="s"></i><i></i><i></i><i class="s"></i></div><div class="s3-fr"></div></div><div class="s3-fl"></div><div class="s3-w"><div class="s3-pb">Writing your story<div><i></i></div></div><svg class="s3-ln" viewBox="0 0 214 414" preserveAspectRatio="none"></svg></div><div class="s3-sw">0:00</div></div>');
 var sw=scr.querySelector('.s3-sw'),W=scr.querySelector('.s3-w'),ln=scr.querySelector('.s3-ln');var t0=0,dur=7600;
 for(var k=0;k<=40;k++)(function(k){T(function(){var s=Math.round(292*k/40);sw.textContent=Math.floor(s/60)+':'+('0'+s%60).slice(-2)},k*dur/40)})(k);
 T(function(){scr.querySelector('.s3-fl').classList.add('go')},900);
 T(function(){scr.querySelector('.s3-vf').style.opacity='0';W.classList.add('in');T(function(){W.querySelector('.s3-pb i').style.width='100%'},60)},1400);
 var cx=107,cy=182,R=[[40,96],[107,80],[174,96],[38,182],[176,182],[40,268],[107,286],[174,268],[107,346]];
 T(function(){var pl=el('<div class="s3-pl">Pillar story: why the roof claim was denied</div>');W.appendChild(pl);requestAnimationFrame(function(){pl.classList.add('in')})},3200);
 R.forEach(function(p,i){T(function(){var l=document.createElementNS('http://www.w3.org/2000/svg','line');l.setAttribute('x1',cx);l.setAttribute('y1',cy);l.setAttribute('x2',p[0]);l.setAttribute('y2',p[1]);ln.appendChild(l);var c=el('<div class="s3-ch"><span class="dot"></span><i class="a"></i><i></i><i></i></div>');c.style.left=(p[0]/214*100)+'%';c.style.top=(p[1]/414*100)+'%';W.appendChild(c);requestAnimationFrame(function(){c.classList.add('in');l.classList.add('in')})},3700+i*170)});
 T(function(){var ap=el('<div class="s3-ap">Approve</div>');W.appendChild(ap);requestAnimationFrame(function(){ap.classList.add('in')})},5500);
 T(function(){var ap=W.querySelector('.s3-ap'),t=el('<span class="tap"></span>');t.style.left='50%';t.style.top='88%';W.appendChild(t);requestAnimationFrame(function(){t.classList.add('go')});ap.classList.add('ok');ap.textContent='✓ Live';W.querySelector('.s3-pl').style.boxShadow='0 0 0 3px #22C55E';
  W.querySelectorAll('.s3-ch').forEach(function(c,i){T(function(){c.classList.add('live')},i*80)})},6500);
 return 8300}

/* 4: 3:07 a.m., then morning */
function s4(){var scr=phone('<div class="s4"><div class="s4-moon"></div><div class="s4-sun"></div><div class="s4-clk">3:07<small>A.M. · YOU\'RE ASLEEP</small></div><div class="s4-ch"><div class="hd"><i></i>Cedric\'s website · live chat</div></div></div>');
 var s=scr.querySelector('.s4'),ch=scr.querySelector('.s4-ch'),clk=scr.querySelector('.s4-clk');
 function bub(c,t,at){T(function(){var b=el('<div class="bb '+c+'">'+t+'</div>');ch.appendChild(b);requestAnimationFrame(function(){b.classList.add('in')})},at)}
 function typing(at,len){T(function(){var y=el('<div class="typ"><i></i><i></i><i></i></div>');ch.appendChild(y);y.classList.add('in');T(function(){y.remove()},len)},at)}
 bub('h','Hi, my roof claim got denied. Is it too late to do anything?',600);
 typing(1500,1100);bub('a','Sorry you\'re dealing with that. Cedric can look at your letter and tell you where you stand. Want him to reach out this morning?',2650);
 bub('h','Yes please. I\'m Mary.',4100);bub('sv','✓ Mary saved Cedric\'s contact',4900);
 T(function(){ch.classList.add('gone');s.classList.add('day');clk.innerHTML='7:30<small>A.M. · GOOD MORNING</small>'},6000);
 T(function(){var ls=el('<div class="s4-ls"></div>');s.appendChild(ls);[['Mary read your page','3:02 a.m. · roof claim article'],['Mary asked about a denial','3:07 a.m. · live chat'],['Mary saved your contact','3:09 a.m. · call her this morning']].forEach(function(n,i){T(function(){var d=el('<div class="nt"><i></i><div><b>'+n[0]+'</b><span>'+n[1]+'</span></div></div>');ls.appendChild(d);requestAnimationFrame(function(){d.classList.add('in')})},i*450)})},7200);
 return 8900}
})();
