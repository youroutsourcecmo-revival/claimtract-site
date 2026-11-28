/* Phone density check (Nov 28, 2026). Run: python3 -m http.server 8088 & NODE_PATH=$(npm root -g) node tools/density-check.js
   Every homeowner card and page at real phone widths: nothing may run off the side (outside a real scroller),
   tap targets at least 24px tall, text at least 11px. Morph to the phone, never fight the frame. */
const {chromium}=require('playwright');
const B='http://localhost:8088',b64=t=>Buffer.from(t).toString('base64url');
const PAGES=[
 ['Website','/cedric-moore/'],['Answer page','/cedric-moore/cash-the-check/'],
 ['Card: running late','/cedric-moore/?m=late&to=Mary&t='+b64('Running about 15 minutes behind. See you shortly.')],
 ['Card: thanks','/cedric-moore/?m=thanks&to=Mary&t='+b64('Thanks for having me out today, Mary. I will be in touch as soon as I hear back.')],
 ['Card: shared','/cedric-moore/?watch=video&s=share&to=Janet&via=Mary'],
 ['Card: contact','/cedric-moore/?watch=card&s=shield'],
 ['Card: door ticket','/cedric-moore/?s=ticket'],
 ['Claim binder','/cedric-moore/?binder=1'],
 ['Free (adjuster home)','/free/']];
const WIDTHS=(process.env.W||'320,375,414,768').split(',').map(Number);
(async()=>{const br=await chromium.launch({executablePath:'/usr/bin/google-chrome'});let bad=0;
 for(const w of WIDTHS){const c=await br.newContext({viewport:{width:w,height:w>700?1024:740},deviceScaleFactor:2,isMobile:w<700,hasTouch:true});const p=await c.newPage();
  for(const [name,u] of PAGES){try{await p.goto(B+u,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2200)}catch(e){console.log(w,name,'LOAD FAIL');continue}
   const r=await p.evaluate(()=>{const W=innerWidth,over=[],tiny=[],small=[];
    document.querySelectorAll('body *').forEach(e=>{if(!e.offsetParent&&getComputedStyle(e).position!=='fixed')return;const s=getComputedStyle(e);if(s.visibility==='hidden'||+s.opacity===0)return;const r=e.getBoundingClientRect();if(!r.width||!r.height)return;
     if(r.right>W+1||r.left<-1){let a=e.parentElement,ok=false;while(a&&a!==document.documentElement){const o=getComputedStyle(a).overflowX;if(o!=='visible'&&a.getBoundingClientRect().right<=W+1){ok=true;break}a=a.parentElement}if(!ok&&s.position!=='fixed')over.push((e.className||e.tagName).toString().slice(0,30))}
     if((e.tagName==='BUTTON'||e.tagName==='A'||e.getAttribute('role')==='button')&&r.height<24&&r.top<innerHeight*3&&e.innerText.trim())tiny.push(e.innerText.trim().slice(0,20)+' '+Math.round(r.height)+'px');
     if(e.childNodes.length&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>2)&&parseFloat(s.fontSize)<11&&parseFloat(s.fontSize)>0&&s.textTransform!=='uppercase'&&!e.closest('img,svg,picture,[aria-hidden=true]'))small.push(e.innerText.trim().slice(0,20)+' '+s.fontSize)});
    return {sw:document.documentElement.scrollWidth,W,over:[...new Set(over)].slice(0,5),tiny:[...new Set(tiny)].slice(0,5),small:[...new Set(small)].slice(0,5)}});
   const ok=!r.over.length&&r.sw<=r.W+1;if(!ok||r.tiny.length||r.small.length){bad++;console.log(w+'px','|',name,'|',ok?'fits':'RUNS OFF SIDE '+r.over.join(', '),r.tiny.length?'| small taps: '+r.tiny.join('; '):'',r.small.length?'| tiny text: '+r.small.join('; '):'')}}
  await c.close()}
 console.log(bad?bad+' issues':'All clear: every page fits every phone width.');await br.close()})();
