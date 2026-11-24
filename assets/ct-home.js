/* ClaimTract homeowner tools for adjuster pages.
   Claim binder (saved on the homeowner's phone; shared only when they tap Send), 3 a.m. mode,
   read it to me, search this page, print a handout, save to home screen, and homeowner events.
   Include: <script src="/assets/ct-home.js?v=1124h" data-slug="cedric-moore" data-first="Cedric" data-name="Cedric Moore" data-phone="4075550142" data-sample="1" defer></script> */
(function(){
var S=document.currentScript||document.querySelector('script[src*="ct-home.js"]');if(!S)return;
var D=S.dataset,SLUG=D.slug||location.pathname.split('/')[1]||'',FIRST=D.first||'your adjuster',NAME=D.name||FIRST,PH=(D.phone||'').replace(/\D/g,'').slice(-10),SAMPLE=D.sample==='1';
var KEY='ct_binder_'+SLUG;
function $(s,r){return (r||document).querySelector(s)}
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function esc(x){return String(x==null?'':x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function fmtPh(p){return p.length===10?'('+p.slice(0,3)+') '+p.slice(3,6)+'-'+p.slice(6):p}
function vid(){try{var v=localStorage.getItem('ct_vid');if(!v){v='v'+Math.random().toString(36).slice(2,12);localStorage.setItem('ct_vid',v)}return v}catch(e){return 'anon'}}
function ev(name,f){if(SAMPLE||!SLUG)return;var b=Object.assign({name:name,page:SLUG,visitor_id:vid()},f||{});
 try{fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b),keepalive:true}).catch(function(){})}catch(e){}}

var CSS='.cth{font-family:Inter,system-ui,sans-serif}.cth-sec{max-width:1100px;margin:28px auto;padding:0 20px}.cth-sec h2{margin:0 0 4px}.cth-sec>p{color:#666;margin:0 0 14px}'+
'.cth-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}.cth-t{background:#111316;color:#fff;border:1px solid #24272d;border-radius:14px;padding:14px;text-align:left;cursor:pointer;font:inherit}.cth-t b{display:block;font-size:15px;margin:6px 0 3px}.cth-t small{color:#9aa0a8;font-size:12.5px;line-height:1.4;display:block}.cth-t i{font-style:normal;font-size:20px}'+
'.cth-ov{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:2147483000;display:flex;align-items:flex-end;justify-content:center}.cth-sh{background:#fff;color:#111;width:100%;max-width:560px;max-height:88vh;overflow:auto;border-radius:20px 20px 0 0;padding:18px 18px 26px}.cth-sh h3{margin:0 0 4px;font-size:19px}.cth-sh .mu{color:#666;font-size:13px}.cth-sh input,.cth-sh textarea,.cth-sh select{background:#fff!important;color:#111!important;border:1px solid #ccc!important}.cth-x{float:right;border:0;background:#eee;border-radius:99px;width:32px;height:32px;font-size:18px;cursor:pointer}'+
'.cth-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0}.cth-tabs button{flex:1 1 auto;border:1px solid #ddd;background:#fff;border-radius:99px;padding:8px;font:700 13px Inter,sans-serif;cursor:pointer}.cth-tabs button.on{background:#111;color:#F5A524;border-color:#111}'+
'.cth-row{border:1px solid #eee;border-radius:12px;padding:10px;margin:8px 0;font-size:14px}.cth-row small{color:#777}.cth-f input,.cth-f textarea{width:100%;box-sizing:border-box;border:1px solid #ccc;border-radius:10px;padding:10px;font:15px Inter,sans-serif;margin:4px 0}.cth-b{display:block;width:100%;border:0;border-radius:12px;padding:13px;font:800 15px Inter,sans-serif;cursor:pointer;margin-top:8px;background:#F5A524;color:#111}.cth-b.g{background:#111;color:#fff}.cth-b.l{background:#f1f1f1;color:#111}'+
'.cth-ck{display:flex;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid #f0f0f0;font-size:14.5px}.cth-ck input{width:20px;height:20px;accent-color:#111}'+
'.cth-late{background:#0d1b2a;color:#e8eef5;padding:18px 20px}.cth-late .in{max-width:1100px;margin:0 auto}.cth-late b{font-size:18px;display:block;margin-bottom:6px}.cth-late ol{margin:6px 0 10px 20px;padding:0;line-height:1.6}.cth-late a{display:inline-block;background:#F5A524;color:#111;font-weight:800;text-decoration:none;border-radius:99px;padding:9px 16px;margin-right:8px}.cth-late button{background:none;border:1px solid #4a5a6a;color:#cfd8e2;border-radius:99px;padding:8px 14px;cursor:pointer}'+
'mark.cth-hit{background:#F5A524;color:#111;border-radius:3px}.cth-sbar{position:fixed;left:50%;transform:translateX(-50%);bottom:16px;z-index:2147483001;background:#111;color:#fff;border-radius:99px;padding:6px 6px 6px 14px;display:flex;gap:6px;align-items:center;box-shadow:0 10px 30px rgba(0,0,0,.35)}.cth-sbar input{border:0;background:#222;color:#fff;border-radius:99px;padding:8px 12px;font:14px Inter,sans-serif;width:180px}.cth-sbar button{border:0;background:#F5A524;color:#111;border-radius:99px;padding:8px 12px;font:700 13px Inter,sans-serif;cursor:pointer}.cth-sbar span{font-size:12px;color:#aaa;min-width:44px;text-align:center}'+
'#cth-print{display:none}@media print{body>*{display:none!important}#cth-print{display:block!important;font-family:Inter,Arial,sans-serif;color:#000;padding:24px}#cth-print h1{margin:0 0 4px}#cth-print .q{float:right;width:150px;height:150px}#cth-print li{margin:4px 0}}'+'.cth-rail{display:none}@media(min-width:1320px){.cth-rail{display:block!important;opacity:0;pointer-events:none;transform:translateX(-16px);transition:opacity .25s,transform .25s;position:fixed;z-index:25;top:96px;left:max(12px,calc((100vw - 1040px)/2 - 248px));width:224px;max-height:calc(100vh - 110px);overflow:auto;scrollbar-width:none}.cth-hasrail .cth-sec .cth-g{display:none}.cth-hasrail .cth-sec{display:none}}'
+'.cth-rc{zoom:.8;display:flex;justify-content:center}.cth-rc .hsh-card{display:block!important;width:auto;margin:0}'
+'.cth-rsave{display:block;width:100%;margin:10px 0 14px;border:0;border-radius:12px;background:#111;color:#fff;font:800 13px Inter,sans-serif;padding:11px 10px;cursor:pointer;box-shadow:0 6px 16px rgba(0,0,0,.18);transition:transform .15s}.cth-rsave:hover{transform:translateY(-2px)}'
+'.cth-rh{margin:0 2px 8px;font:800 11px "JetBrains Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:#8F5400}'
+'.cth-rb{display:flex;gap:10px;align-items:center;width:100%;text-align:left;margin:0 0 8px;padding:10px;border:1px solid rgba(0,0,0,.08);border-radius:14px;background:#fff;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.06);transition:transform .15s,box-shadow .15s}.cth-rb:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(0,0,0,.12)}'
+'.cth-rb i{flex:0 0 38px;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:19px;color:#fff;box-shadow:inset 0 -2px 0 rgba(0,0,0,.15)}.cth-rb b{display:block;font:800 13.5px Inter,sans-serif;color:#111}.cth-rb small{display:block;font:500 11.5px/1.35 Inter,sans-serif;color:#666;margin-top:2px}'+'body.pvmode::after{content:"SAMPLE";position:fixed;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-24deg);font:900 min(26vw,340px)/1 Inter,sans-serif;letter-spacing:.06em;color:rgba(0,0,0,.035);pointer-events:none;z-index:2147483000;white-space:nowrap}'+'.cth-rail.cth-on{opacity:1;pointer-events:auto;transform:none}'+'.cth-mod{position:fixed;inset:0;z-index:2147483600;background:rgba(8,9,11,.6);display:flex;align-items:center;justify-content:center;padding:3vh 3vw;backdrop-filter:blur(3px)}.cth-mb{position:relative;width:min(980px,100%);height:100%;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.45)}.cth-mb iframe{width:100%;height:100%;border:0;display:block}.cth-mx{position:absolute;top:10px;right:12px;z-index:2;width:40px;height:40px;border-radius:50%;border:0;background:#111;color:#fff;font:400 26px/38px Inter,sans-serif;cursor:pointer;box-shadow:0 6px 16px rgba(0,0,0,.3)}@media(max-width:700px){.cth-mod{padding:0}.cth-mb{border-radius:0}}';

function load(){try{return JSON.parse(localStorage.getItem(KEY))||null}catch(e){return null}}
function save(b){try{localStorage.setItem(KEY,JSON.stringify(b))}catch(e){}}
var CK=['Took photos and video of every damaged room','Kept damaged items (don\'t throw anything out yet)','Found my policy and declarations page','Wrote down my claim number','Saved every letter and email from the insurance company','Kept receipts for emergency repairs, hotel and meals','Got a repair estimate'];
function binder(){var b=load()||{calls:[],items:[],checklist:CK.map(function(l){return {label:l,done:false}}),me:{}};if(!b.me)b.me={};if(!b.questions)b.questions=[];if(!b.docs)b.docs=[];if(!b.key)b.key=Array.from({length:24},function(){return 'abcdefghijkmnpqrstuvwxyz23456789'[Math.floor(Math.random()*32)]}).join('');return b}

function sheet(html){var o=el('div','cth cth-ov'),s=el('div','cth-sh',html);o.appendChild(s);o.addEventListener('click',function(e){if(e.target===o||e.target.closest('.cth-x'))o.remove()});document.body.appendChild(o);return s}

function openBinder(tab){var b=binder();tab=tab||'calls';
 var s=sheet('<button class="cth-x" aria-label="Close">&times;</button><h3>Your claim binder</h3><div class="mu cth-st"></div><div class="cth-tabs"><button data-t="calls">Calls</button><button data-t="items">Damage list</button><button data-t="checklist">Checklist</button><button data-t="docs">Letters</button><button data-t="q">Questions</button></div><div class="cth-body"></div><button class="cth-b g" data-send></button>');
 function stat(){s.querySelector('.cth-st').innerHTML=b.auto?'Sharing with '+esc(FIRST)+' is on. Everything you add goes to him automatically. <a href="#" data-off style="color:#111">Turn off</a>':'Saved only on this phone. Nothing leaves it unless you share it.';s.querySelector('[data-send]').textContent=b.auto?'Send now':'Share my binder with '+esc(FIRST)}
 function draw(){stat();s.querySelectorAll('.cth-tabs button').forEach(function(x){x.classList.toggle('on',x.dataset.t===tab)});var B=s.querySelector('.cth-body'),h='';
  if(tab==='calls'){h=(b.calls.length?b.calls.slice().reverse().map(function(c){return '<div class="cth-row"><b>'+esc(c.who||'Call')+'</b> <small>'+esc(c.at)+'</small><div>'+esc(c.notes)+'</div></div>'}).join(''):'<p class="mu">Write down every call with the insurance company: who you spoke to and what they said.</p>')+
   '<div class="cth-f"><input data-k="who" placeholder="Who did you talk to? (name, company)"><textarea data-k="notes" rows="3" placeholder="What did they say?"></textarea><button class="cth-b" data-add="calls">Add this call</button></div>'}
  else if(tab==='items'){h=(b.items.length?b.items.map(function(c,i){return '<div class="cth-row"><b>'+esc(c.item)+'</b> <small>'+esc(c.room)+'</small><div>'+esc(c.notes)+'</div></div>'}).join(''):'<p class="mu">List everything that was damaged, room by room.</p>')+
   '<div class="cth-f"><input data-k="room" placeholder="Room (kitchen, garage...)"><input data-k="item" placeholder="What was damaged?"><textarea data-k="notes" rows="2" placeholder="Notes (age, brand, what happened)"></textarea><button class="cth-b" data-add="items">Add to the list</button></div>'}
  else if(tab==='docs'){h='<p class="mu">Got a letter from the insurance company, like a reservation of rights letter? Take a picture of it and send it to '+esc(FIRST)+'. Photos of damage and estimates work too.</p>'+b.docs.slice().reverse().map(function(d){return '<div class="cth-row" style="display:flex;gap:10px;align-items:center"><img src="'+d.thumb+'" alt="" style="width:56px;height:56px;object-fit:cover;border-radius:8px"><div><b>'+esc(d.label)+'</b><br><small>'+esc(d.at)+' &middot; '+(d.sent?'Sent to '+esc(FIRST):'<span style="color:#9A6400">Not sent yet</span>')+'</small></div></div>'}).join('')+
   '<div class="cth-f"><select data-k="label" style="width:100%;background:#fff;color:#111;border:1px solid #ccc;border-radius:10px;padding:10px;font:15px Inter,sans-serif;margin:4px 0"><option>Letter from the insurance company</option><option>Reservation of rights letter</option><option>Photo of damage</option><option>Repair estimate</option><option>Receipt</option><option>Other</option></select><label class="cth-b" style="text-align:center">Take a picture or choose a file<input type="file" accept="image/*" capture="environment" data-doc hidden></label></div>'}
  else if(tab==='q'){h='<p class="mu">Ask '+esc(FIRST)+' anything about your claim. He answers right here. Not for emergencies: call or text him for anything urgent.</p>'+b.questions.slice().reverse().map(function(q){return '<div class="cth-row"><small>You asked &middot; '+esc(q.at)+'</small><div><b>'+esc(q.text)+'</b></div>'+(q.answer?'<div style="margin-top:8px;padding-top:8px;border-top:1px solid #eee"><small>'+esc(FIRST)+' answered &middot; '+esc(q.answer_at||'')+'</small><div>'+esc(q.answer)+'</div></div>':'<small style="color:#9A6400">Waiting for '+esc(FIRST)+'</small>')+'</div>'}).join('')+
   '<div class="cth-f"><textarea data-k="text" rows="3" placeholder="Type your question"></textarea><button class="cth-b" data-ask>Send question</button></div>'}
  else{h=b.checklist.map(function(c,i){return '<label class="cth-ck"><input type="checkbox" data-ck="'+i+'"'+(c.done?' checked':'')+'>'+esc(c.label)+'</label>'}).join('')}
  B.innerHTML=h}
 s.addEventListener('click',function(e){var t=e.target;
  if(t.dataset.t){tab=t.dataset.t;draw();return}
  if(t.dataset.add){var f=t.closest('.cth-f'),r={};f.querySelectorAll('[data-k]').forEach(function(x){r[x.dataset.k]=x.value.trim()});if(!r.notes&&!r.item&&!r.who)return;
   if(t.dataset.add==='calls')r.at=new Date().toLocaleString('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});b[t.dataset.add].push(r);save(b);draw();auto(b);return}
  if(t.hasAttribute('data-ask')){var tx=t.closest('.cth-f').querySelector('textarea').value.trim();if(!tx)return;b.questions.push({qid:'q'+Date.now().toString(36),text:tx,at:new Date().toLocaleString('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'})});save(b);draw();
   if(b.auto)push(b,function(m){s.querySelector('.cth-st').textContent=m});else share(b,function(){draw()});return}
  if(t.hasAttribute('data-send')){if(b.auto)push(b,function(m){s.querySelector('.cth-st').textContent=m});else share(b,function(){draw()});return}
  if(t.hasAttribute('data-off')){e.preventDefault();b.auto=false;save(b);draw();return}});
 s.addEventListener('change',function(e){if(e.target.hasAttribute('data-doc')){var fl=e.target.files&&e.target.files[0];if(!fl)return;var lab=s.querySelector('[data-k=label]').value;
   shrink(fl,1600,.82,function(full,thumb){var d={id:'d'+Date.now().toString(36),label:lab,at:new Date().toLocaleString('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}),thumb:thumb,sent:false};b.docs.push(d);save(b);draw();
    var go=function(){upDoc(b,d,full,function(m){s.querySelector('.cth-st').textContent=m;draw()})};if(b.auto)go();else share(b,function(){draw();if(b.auto)go()})});return}
  var i=e.target.dataset.ck;if(i!=null){b.checklist[+i].done=e.target.checked;save(b);auto(b)}});
 draw();answers(b,function(ch){if(ch)draw()})}
function answers(b,cb){if(SAMPLE||!b.auto||!b.questions.length)return;
 fetch('/api/pages/'+encodeURIComponent(SLUG)+'/binder/answers?visitor_id='+encodeURIComponent(vid())+'&key='+encodeURIComponent(b.key)).then(function(r){return r.ok?r.json():null}).then(function(j){if(!j||!j.ok||!j.answers)return;var ch=false;
  j.answers.forEach(function(a){b.questions.forEach(function(q){if(q.qid===a.qid&&q.answer!==a.text){q.answer=a.text;q.answer_at=new Date(a.at).toLocaleString('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});ch=true}})});if(ch){save(b);cb(true)}}).catch(function(){})}

function shrink(file,max,q,cb){var fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){function draw(m,qq){var k=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);return c.toDataURL('image/jpeg',qq)}
 cb(draw(max,q),draw(160,.6))};im.src=fr.result};fr.readAsDataURL(file)}
function upDoc(b,d,dataUrl,cb){if(SAMPLE){cb('This is a sample page, so nothing was sent.');return}
 var bin=atob(dataUrl.split(',')[1]),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
 fetch('/api/pages/'+encodeURIComponent(SLUG)+'/binder/doc?visitor_id='+encodeURIComponent(vid())+'&key='+encodeURIComponent(b.key)+'&label='+encodeURIComponent(d.label)+'&id='+d.id,{method:'POST',headers:{'Content-Type':'image/jpeg'},body:u})
  .then(function(r){return r.json().catch(function(){return {}}).then(function(j){if(r.ok&&j.ok){d.sent=true;save(b);cb('Sent to '+FIRST+'.')}else cb('The picture didn\'t go through ('+(j.error||r.status)+'). Try again in a minute.')})})
  .catch(function(){cb('No connection right now. Try again when you have signal.')})}
function share(b,after){var s=sheet('<button class="cth-x" aria-label="Close">&times;</button><h3>Share your binder with '+esc(FIRST)+'?</h3><p class="mu" style="font-size:14px;line-height:1.5">This sends your call notes, damage list and checklist to '+esc(NAME)+' so he can work your claim. After that, anything you add is shared with him automatically until you turn it off.</p><label class="cth-ck" style="align-items:flex-start;border:0"><input type="checkbox" data-ok style="margin-top:2px"><span style="font-size:13.5px;line-height:1.5">I agree. I understand that after my name, address and anything else that identifies me are removed, '+esc(FIRST)+' may use what happened on my claim in his articles and ads to help other homeowners. <a href="/privacy/" target="_blank" style="color:#111">Privacy policy</a></span></label><div class="cth-f"><input data-m="name" placeholder="Your name" value="'+esc(b.me.name)+'"><input data-m="phone" placeholder="Your phone" inputmode="tel" value="'+esc(b.me.phone)+'"><input data-m="email" placeholder="Your email (optional)" value="'+esc(b.me.email)+'"><input data-m="address" placeholder="Property address (optional)" value="'+esc(b.me.address)+'"></div><button class="cth-b g" data-go>Yes, share it</button><button class="cth-b l cth-x">Not now</button><p class="mu cth-msg" style="margin-top:10px"></p>');
 s.querySelector('[data-go]').onclick=function(){if(!s.querySelector('[data-ok]').checked){s.querySelector('.cth-msg').textContent='Please check the box first.';return}s.querySelectorAll('[data-m]').forEach(function(x){b.me[x.dataset.m]=x.value.trim()});save(b);var msg=s.querySelector('.cth-msg');
  if(SAMPLE){msg.textContent='This is a sample page, so nothing was sent. On a real adjuster\'s page, your binder goes straight to his app.';return}
  b.auto=true;b.consent_at=new Date().toISOString();save(b);msg.textContent='Sending...';
  push(b,function(m,ok){msg.textContent=ok?'Sent. From now on, anything you add goes to '+FIRST+' automatically. You can turn that off in the binder.':m;if(after)after()})}}
var pend=null;function auto(b){if(!b.auto)return;clearTimeout(pend);pend=setTimeout(function(){push(b,function(){})},1500)}
window.addEventListener('online',function(){var b=load();if(b&&b.auto&&b.dirty)push(b,function(){})});
function push(b,cb){if(SAMPLE){cb('This is a sample page, so nothing was sent. On a real adjuster\'s page, your binder goes straight to his app.',false);return}
 b.dirty=true;save(b);
 fetch('/api/pages/'+encodeURIComponent(SLUG)+'/binder',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({visitor_id:vid(),name:b.me.name,phone:b.me.phone,email:b.me.email,address:b.me.address,calls:b.calls,items:b.items,checklist:b.checklist,questions:b.questions.map(function(q){return {qid:q.qid,text:q.text,at:q.at}}),key:b.key,consent:true,consent_at:b.consent_at,auto:true,consent_text:'Send to adjuster; keep sharing new entries automatically until turned off; after removing identifying details, the adjuster may use what happened in his articles and ads.'})})
  .then(function(r){return r.json().catch(function(){return {}}).then(function(j){if(r.ok&&j.ok){b.dirty=false;save(b);cb('Sent to '+FIRST+'.',true)}else cb('It didn\'t go through ('+(j.error||r.status)+'). Your binder is still saved on this phone. You can also call or text '+FIRST+(PH?' at '+fmtPh(PH):'')+'.',false)})})
  .catch(function(){cb('No connection right now. Your binder is saved and will send when you have signal.',false)})}

/* read it to me */
var speaking=false;
function mainText(){var a=$('.cta-art .vb.on')||$('main')||$('.cta-art')||document.body;return a.innerText.replace(/\s+/g,' ').trim()}

/* Listen (top of page): plays the page's recorded Sofia (Zuri) voice track only. No robotic phone-voice fallback:
   if the page has no recording (voice is an upgrade), the button stays hidden. */
var LA=null;
function lsnSrc(b){var src=b.getAttribute('data-src')||'';if(src.indexOf('{v}')>=0){var v=document.querySelector('.cta-art .vt button[aria-pressed=true]');src=src.split('{v}').join(v?v.getAttribute('data-v'):'1')}return src}
function lsnLbl(b,on){var t=b.querySelector('.lsn-t');if(t)t.textContent=on?'Pause':'Listen to this page';b.classList.toggle('on',on)}
function listen(b){var src=lsnSrc(b);if(!src)return;
 if(LA&&LA._src===src){if(LA.paused){LA.play();lsnLbl(b,true)}else{LA.pause();lsnLbl(b,false)}return}
 if(LA)LA.pause();var a=new Audio(src);a._src=src;LA=a;a.onended=function(){lsnLbl(b,false)};a.onerror=function(){lsnLbl(b,false)};
 var pr=a.play();lsnLbl(b,true);if(pr&&pr.catch)pr.catch(function(){lsnLbl(b,false)})}
function lsnCheck(){[].forEach.call(document.querySelectorAll('.lsn'),function(b){b.style.display='none';var src=lsnSrc(b);if(!src)return;
 fetch(src,{method:'HEAD',cache:'no-store'}).then(function(r){if(r.ok&&/audio/.test(r.headers.get('content-type')||''))b.style.display=''}).catch(function(){})})}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.lsn');if(b){e.preventDefault();listen(b);return}
 var vt=e.target.closest&&e.target.closest('.cta-art .vt button');if(vt){if(LA){LA.pause();LA=null}setTimeout(lsnCheck,50)}});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',lsnCheck);else lsnCheck();
function readAloud(btn){var sy=window.speechSynthesis;if(!sy){alertSheet('Read it to me','Your browser can\'t read pages aloud. Try Chrome or Safari.');return}
 if(speaking){sy.cancel();speaking=false;setLbl(btn,'Read it to me','Listen to this page, hands free');return}
 var t=mainText(),parts=t.match(/[^.!?]+[.!?]+/g)||[t],i=0;speaking=true;setLbl(btn,'Stop reading','Tap again to stop');
 (function next(){if(!speaking||i>=parts.length){speaking=false;setLbl(btn,'Read it to me','Listen to this page, hands free');return}var u=new SpeechSynthesisUtterance(parts[i++]);u.lang='en-US';u.rate=1;u.onend=next;u.onerror=next;sy.speak(u)})()}
function setLbl(btn,b,s){if(!btn)return;btn.querySelector('b').textContent=b;btn.querySelector('small').textContent=s}
function alertSheet(h,p){sheet('<button class="cth-x" aria-label="Close">&times;</button><h3>'+esc(h)+'</h3><p class="mu" style="font-size:14px;line-height:1.55">'+p+'</p><button class="cth-b l cth-x">OK</button>')}

/* search this page */
function clearHits(){document.querySelectorAll('mark.cth-hit').forEach(function(m){var t=document.createTextNode(m.textContent);m.parentNode.replaceChild(t,m);t.parentNode.normalize()})}
function openSearch(){if($('.cth-sbar'))return;var bar=el('div','cth cth-sbar','<input type="search" placeholder="Search this website" aria-label="Search this page"><span></span><button data-n>Next</button><button data-c>Done</button>');document.body.appendChild(bar);
 var inp=bar.querySelector('input'),cnt=bar.querySelector('span'),hits=[],k=0;inp.focus();
 function run(){clearHits();hits=[];k=0;var q=inp.value.trim();if(q.length<2){cnt.textContent='';return}var re=new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode;if(!p||p.closest('script,style,.cth-sbar,.cth-ov,#cth-print'))return NodeFilter.FILTER_REJECT;return re.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),ns=[];
  while(w.nextNode())ns.push(w.currentNode);
  ns.forEach(function(n){var f=document.createDocumentFragment(),s=n.nodeValue,last=0;s.replace(re,function(m,o){f.appendChild(document.createTextNode(s.slice(last,o)));var mk=el('mark','cth-hit');mk.textContent=m;f.appendChild(mk);hits.push(mk);last=o+m.length});f.appendChild(document.createTextNode(s.slice(last)));n.parentNode.replaceChild(f,n)});
  show();clearTimeout(window.__cthSq);var qq=q;window.__cthSq=setTimeout(function(){ev('page_search',{q:qq.slice(0,80),hits:hits.length})},1500)}
 function show(){cnt.textContent=hits.length?(k+1)+' of '+hits.length:'none';if(hits[k])hits[k].scrollIntoView({block:'center',behavior:'smooth'})}
 var tm;inp.addEventListener('input',function(){clearTimeout(tm);tm=setTimeout(run,250)});inp.addEventListener('keydown',function(e){if(e.key==='Enter'&&hits.length){k=(k+1)%hits.length;show()}});
 bar.addEventListener('click',function(e){if(e.target.dataset.n!=null&&hits.length){k=(k+1)%hits.length;show()}if(e.target.dataset.c!=null){clearHits();bar.remove()}})}

/* print a handout */
function printHandout(){var p=$('#cth-print');if(!p){p=el('div','','');p.id='cth-print';document.body.appendChild(p)}
 var url=location.origin+'/'+SLUG+'/',q='';try{if(window.qrcode){var qr=qrcode(0,'M');qr.addData(url);qr.make();q=qr.createSvgTag(4,0).replace('<svg','<svg class="q"')}}catch(e){}
 p.innerHTML=q+'<h1>'+esc(NAME)+'</h1><div>Licensed Public Adjuster'+(PH?' &middot; '+fmtPh(PH):'')+'</div><div>'+esc(url)+'</div><h2 style="margin-top:22px">What to do after property damage</h2><ol>'+CK.map(function(c){return '<li>'+esc(c)+'</li>'}).join('')+'</ol><p style="margin-top:18px">Questions about your claim? Call or text '+esc(FIRST)+(PH?' at '+fmtPh(PH):'')+', or scan the code to open this page.</p><p style="font-size:11px;color:#555;margin-top:24px">General information. Every insurance company handles claims its own way.</p>';
 setTimeout(function(){window.print()},50)}

/* save to home screen */
var deferred=null;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e});
function saveHome(){if(deferred){deferred.prompt();deferred=null;return}var ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
 alertSheet('Save this page to your home screen',ios?'Tap the Share button at the bottom of Safari, then <b>Add to Home Screen</b>. '+esc(FIRST)+'\'s page opens like an app, even with weak signal after a storm.':'Open your browser menu (the three dots), then <b>Add to Home screen</b> or <b>Install app</b>. '+esc(FIRST)+'\'s page opens like an app, even with weak signal after a storm.')}
if('serviceWorker' in navigator){try{navigator.serviceWorker.register('/sw.js').catch(function(){})}catch(e){}}

/* 3 a.m. mode: 10 PM to 6 AM on the homeowner's clock */
function lateBanner(){if(SLUG==='preview')return;var h=new Date().getHours();if(h>=6&&h<22)return;try{if(sessionStorage.getItem('cth_late_off'))return}catch(e){}
 var b=el('div','cth cth-late','<div class="in"><b>It\'s late, and you\'re dealing with damage. Here\'s what to do right now.</b><ol><li>If water is coming in, shut off the main water valve. If anything sparks or smells like burning, shut off power at the breaker and get out.</li><li>Take photos and video of everything before you clean up.</li><li>Stop more damage if you safely can: towels, buckets, a tarp. Keep the receipts.</li><li>Don\'t throw away damaged items, and don\'t sign anything tonight.</li></ol>'+(PH?'<a href="sms:+1'+PH+'">Text '+esc(FIRST)+' now</a>':'')+'<button type="button">Show the full page</button><div style="font-size:12px;color:#9fb0c2;margin-top:8px">'+esc(FIRST)+' will see your text first thing in the morning. In an emergency, call 911.</div></div>');
 b.querySelector('button').onclick=function(){b.remove();try{sessionStorage.setItem('cth_late_off','1')}catch(e){}};document.body.insertBefore(b,document.body.firstChild)}

/* Nov 24: the hero says she's in the right place; the problem comes next. Adjuster details and tools move to the end. */
function reorder(){var t=document.getElementById('trust'),f=$('footer');if(t&&f&&(t.compareDocumentPosition(f)&4))f.parentNode.insertBefore(t,f);placeTrust();
 document.addEventListener('change',function(e){if(e.target&&e.target.classList&&e.target.classList.contains('vsel'))setTimeout(placeTrust,0)});
 document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.vt button'))setTimeout(placeTrust,0)})}
/* Nov 24: once she has some substance, the trust card sits in the middle of the article, where the first call bar was */
function placeTrust(){var t=document.getElementById('trust');if(!t)return;
 if(!document.getElementById('trs-in-css')){var c=el('style');c.id='trs-in-css';c.textContent='.sec.trs.trs-in{padding:0!important;margin:30px 0!important;max-width:none!important;background:none!important}.trs-in .pab{max-width:none!important;margin:0!important}';document.head.appendChild(c)}
 [].forEach.call(document.querySelectorAll('.cta-art .vb'),function(vb){var a=vb.querySelector('.abrk');if(a)a.style.display='none'});
 var scope=document.querySelector('.cta-art .vb.on')||document.querySelector('.ans-art'),slot=null;
 if(scope){slot=scope.querySelector('.abrk');if(!slot){var hs=scope.querySelectorAll('h2,h3');slot=hs.length>2?hs[2]:(hs.length>1?hs[1]:null)}}
 if(slot){slot.parentNode.insertBefore(t,slot);t.classList.add('trs-in')}else{t.classList.remove('trs-in');var f=$('footer');if(f)f.parentNode.insertBefore(t,f)}}

/* tools section */
function tools(){if($('.cth-sec'))return;FIRST=D.first||'your adjuster';NAME=D.name||FIRST;PH=(D.phone||'').replace(/\D/g,'').slice(-10);var s=el('section','cth cth-sec','<h2>Tools for your claim</h2><p>Free, from '+esc(FIRST)+'. They work on your phone, even with weak signal.</p><div class="cth-g">'+
 '<button class="cth-t" data-a="binder"><i>&#128210;</i><b>Claim binder</b><small>Call log, damage list and checklist on your phone</small></button>'+
  '<button class="cth-t" data-a="search"><i>&#128269;</i><b>Search this page</b><small>Find your answer fast</small></button>'+
 '<button class="cth-t" data-a="print"><i>&#128424;</i><b>Print a handout</b><small>First steps for the kitchen table</small></button></div>');
 var anchor=$('footer');if(anchor)anchor.parentNode.insertBefore(s,anchor);else document.body.appendChild(s);
 s.addEventListener('click',function(e){var b=e.target.closest('.cth-t');if(!b)return;var a=b.dataset.a;
  if(a==='binder')openBinder();else if(a==='read')readAloud(b);else if(a==='search')openSearch();else if(a==='print')printHandout();else if(a==='home')saveHome()})}

/* "Did this help?" under the article, and what homeowners search for */
function helpful(){var a=$('.cta-art');if(!a||$('.cth-help'))return;var k='ct_help_'+SLUG,done=false;try{done=!!localStorage.getItem(k)}catch(e){}
 var b=el('div','cth cth-help','<div style="max-width:1100px;margin:18px auto 0;padding:14px 18px;border:1px solid rgba(128,128,128,.25);border-radius:14px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;font:600 15px Inter,sans-serif"><span>Did this help?</span><button type="button" data-h="yes" style="border:1px solid #ccc;background:#fff;border-radius:99px;padding:7px 16px;font:700 14px Inter;cursor:pointer">Yes</button><button type="button" data-h="no" style="border:1px solid #ccc;background:#fff;border-radius:99px;padding:7px 16px;font:700 14px Inter;cursor:pointer">Not really</button><span class="cth-hm" style="font-weight:500;color:#666"></span></div>');
 a.appendChild(b);if(done){b.querySelector('.cth-hm').textContent='Thanks for letting '+FIRST+' know.';b.querySelectorAll('button').forEach(function(x){x.remove()})}
 b.addEventListener('click',function(e){var h=e.target.dataset&&e.target.dataset.h;if(!h)return;var v=$('.cta-art .vb.on');ev('page_helpful',{answer:h,article:v?v.getAttribute('data-vb'):'main'});try{localStorage.setItem(k,h)}catch(_){}
  b.querySelector('.cth-hm').textContent=h==='yes'?'Thanks for letting '+FIRST+' know.':'Thanks. Text '+FIRST+' your question and get a straight answer.';b.querySelectorAll('button').forEach(function(x){x.remove()})})}

/* homeowner events */
function events(){var q=new URLSearchParams(location.search),src=q.get('s')||(q.get('qr')?'qr':(document.referrer?'referral':'direct'));
 ev('homeowner_open',{source:src});if(src==='qr')ev('qr_scan',{qr_id:q.get('qr')||q.get('r')||'page'});
 var seen=0,done=false;setInterval(function(){if(done||document.hidden)return;seen+=5;if(seen>=60){done=true;ev('homeowner_read_60s')}},5000);
 document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href$=".vcf"],a[href*="contact.vcf"],#vcfBtn,[data-save-contact]');if(a)ev('contact_saved')},true)}

function newAnswer(){var b=load();if(!b||!b.auto||!b.questions||!b.questions.some(function(q){return !q.answer}))return;b=binder();
 answers(b,function(){var n=el('div','cth cth-sbar','<b style="font-size:13.5px;padding-right:4px">'+esc(FIRST)+' answered your question</b><button data-o>Read it</button><button data-c style="background:#333;color:#fff">Later</button>');document.body.appendChild(n);
  n.addEventListener('click',function(e){if(e.target.dataset.o!=null){n.remove();openBinder('q')}if(e.target.dataset.c!=null)n.remove()})})}

/* sticky left rail on wide screens: who-to-call card + homeowner tools */
function rail(){if($('.cth-rail'))return;var card=$('.hsh-card');if(!card){if((rail.n=(rail.n||0)+1)<20)setTimeout(rail,500);return}
 var r=el('aside','cth cth-rail');var c=el('div','cth-rc');var ph=document.createComment('hsh');card.parentNode.insertBefore(ph,card);var mq=matchMedia('(min-width:1320px)');function place(){if(mq.matches)c.appendChild(card);else ph.parentNode.insertBefore(card,ph.nextSibling)}r.appendChild(c);
 var sv=el('button','cth-rsave','&#128241; Save '+esc(FIRST)+' to my phone');sv.type='button';sv.onclick=function(){var b=$('#vcfBtn');if(b)b.click();ev('rail_save')};r.appendChild(sv);
 var t=el('div','cth-rt','<p class="cth-rh">Free tools from '+esc(FIRST)+'</p>'+
  '<button class="cth-rb" data-a="binder"><i style="background:linear-gradient(135deg,#F5A524,#E07B00)">&#128210;</i><span><b>Claim binder</b><small>Call log, damage list, checklist. Print it.</small></span></button>'+
  '<button class="cth-rb" data-a="print"><i style="background:linear-gradient(135deg,#3B82F6,#1D4ED8)">&#128424;</i><span><b>Kitchen-table handout</b><small>First steps, one page</small></span></button>'+
  '<button class="cth-rb" data-a="verify"><i style="background:linear-gradient(135deg,#8B5CF6,#5B21B6)">&#10003;</i><span><b>Verify my license</b><small>Check it on the state&#39;s site</small></span></button>'+
  '<button class="cth-rb" data-a="search"><i style="background:linear-gradient(135deg,#10B981,#047857)">&#128269;</i><span><b>Find my answer</b><small>Search this page</small></span></button>');
 r.appendChild(t);t.addEventListener('click',function(e){var b=e.target.closest('.cth-rb');if(!b)return;var a=b.dataset.a;ev('rail_'+a);if(a==='binder')openBinder();else if(a==='print')printHandout();else if(a==='search')openSearch();else if(a==='verify'){var v=[].slice.call(document.querySelectorAll('a')).filter(function(x){return /verify/i.test(x.textContent)&&/^http/.test(x.href)})[0];window.open(v?v.href:'https://licenseesearch.fldfs.com/','_blank','noopener')}});
 document.body.appendChild(r);document.body.classList.add('cth-hasrail');place();mq.addEventListener&&mq.addEventListener('change',place);var hero=$('.hero2')||$('.hero');function vis(){var past=!hero||hero.getBoundingClientRect().bottom<80;r.classList.toggle('cth-on',past)}vis();addEventListener('scroll',vis,{passive:true})}


/* keep the homeowner on this page: answer and guide links open in a modal */
function stay(){if(stay.on)return;stay.on=1;document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('.rel a[href],.gds a[href],.rc[href],a.rc,.faq a[href],.ans-more a[href]');if(!a||e.metaKey||e.ctrlKey)return;var u;try{u=new URL(a.href,location.href)}catch(_){return}if(u.origin!==location.origin)return;e.preventDefault();
 var m=el('div','cth cth-mod','<div class="cth-mb"><button class="cth-mx" aria-label="Close">&times;</button><iframe src="'+esc(u.href)+'" title="Answer"></iframe></div>');document.body.appendChild(m);document.documentElement.style.overflow='hidden';ev('answer_modal',{href:u.pathname});
 function cl(){m.remove();document.documentElement.style.overflow=''}m.addEventListener('click',function(x){if(x.target===m||x.target.closest('.cth-mx'))cl()});document.addEventListener('keydown',function k(x){if(x.key==='Escape'){cl();document.removeEventListener('keydown',k)}})},true)}

function init(){var st=el('style');st.textContent=CSS;document.head.appendChild(st);reorder();tools();rail();stay();events();newAnswer();helpful();setTimeout(helpful,1200);if(/[?&]print=1/.test(location.search))setTimeout(printHandout,800);
 window.CTHome={tools:function(){var o=$('.cth-sec');if(o)o.remove();tools()},binder:openBinder,read:readAloud,search:openSearch,print:printHandout,home:saveHome,late:lateBanner}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
