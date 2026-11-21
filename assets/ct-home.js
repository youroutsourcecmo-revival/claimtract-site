/* ClaimTract homeowner tools for adjuster pages.
   Claim binder (saved on the homeowner's phone; shared only when they tap Send), 3 a.m. mode,
   read it to me, search this page, print a handout, save to home screen, and homeowner events.
   Include: <script src="/assets/ct-home.js" data-slug="cedric-moore" data-first="Cedric" data-name="Cedric Moore" data-phone="4075550142" data-sample="1" defer></script> */
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
'.cth-ov{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:2147483000;display:flex;align-items:flex-end;justify-content:center}.cth-sh{background:#fff;color:#111;width:100%;max-width:560px;max-height:88vh;overflow:auto;border-radius:20px 20px 0 0;padding:18px 18px 26px}.cth-sh h3{margin:0 0 4px;font-size:19px}.cth-sh .mu{color:#666;font-size:13px}.cth-x{float:right;border:0;background:#eee;border-radius:99px;width:32px;height:32px;font-size:18px;cursor:pointer}'+
'.cth-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0}.cth-tabs button{flex:1 1 auto;border:1px solid #ddd;background:#fff;border-radius:99px;padding:8px;font:700 13px Inter,sans-serif;cursor:pointer}.cth-tabs button.on{background:#111;color:#F5A524;border-color:#111}'+
'.cth-row{border:1px solid #eee;border-radius:12px;padding:10px;margin:8px 0;font-size:14px}.cth-row small{color:#777}.cth-f input,.cth-f textarea{width:100%;box-sizing:border-box;border:1px solid #ccc;border-radius:10px;padding:10px;font:15px Inter,sans-serif;margin:4px 0}.cth-b{display:block;width:100%;border:0;border-radius:12px;padding:13px;font:800 15px Inter,sans-serif;cursor:pointer;margin-top:8px;background:#F5A524;color:#111}.cth-b.g{background:#111;color:#fff}.cth-b.l{background:#f1f1f1;color:#111}'+
'.cth-ck{display:flex;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid #f0f0f0;font-size:14.5px}.cth-ck input{width:20px;height:20px;accent-color:#111}'+
'.cth-late{background:#0d1b2a;color:#e8eef5;padding:18px 20px}.cth-late .in{max-width:1100px;margin:0 auto}.cth-late b{font-size:18px;display:block;margin-bottom:6px}.cth-late ol{margin:6px 0 10px 20px;padding:0;line-height:1.6}.cth-late a{display:inline-block;background:#F5A524;color:#111;font-weight:800;text-decoration:none;border-radius:99px;padding:9px 16px;margin-right:8px}.cth-late button{background:none;border:1px solid #4a5a6a;color:#cfd8e2;border-radius:99px;padding:8px 14px;cursor:pointer}'+
'mark.cth-hit{background:#F5A524;color:#111;border-radius:3px}.cth-sbar{position:fixed;left:50%;transform:translateX(-50%);bottom:16px;z-index:2147483001;background:#111;color:#fff;border-radius:99px;padding:6px 6px 6px 14px;display:flex;gap:6px;align-items:center;box-shadow:0 10px 30px rgba(0,0,0,.35)}.cth-sbar input{border:0;background:#222;color:#fff;border-radius:99px;padding:8px 12px;font:14px Inter,sans-serif;width:180px}.cth-sbar button{border:0;background:#F5A524;color:#111;border-radius:99px;padding:8px 12px;font:700 13px Inter,sans-serif;cursor:pointer}.cth-sbar span{font-size:12px;color:#aaa;min-width:44px;text-align:center}'+
'#cth-print{display:none}@media print{body>*{display:none!important}#cth-print{display:block!important;font-family:Inter,Arial,sans-serif;color:#000;padding:24px}#cth-print h1{margin:0 0 4px}#cth-print .q{float:right;width:150px;height:150px}#cth-print li{margin:4px 0}}';

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
function readAloud(btn){var sy=window.speechSynthesis;if(!sy){alertSheet('Read it to me','Your browser can\'t read pages aloud. Try Chrome or Safari.');return}
 if(speaking){sy.cancel();speaking=false;setLbl(btn,'Read it to me','Listen to this page, hands free');return}
 var t=mainText(),parts=t.match(/[^.!?]+[.!?]+/g)||[t],i=0;speaking=true;setLbl(btn,'Stop reading','Tap again to stop');
 (function next(){if(!speaking||i>=parts.length){speaking=false;setLbl(btn,'Read it to me','Listen to this page, hands free');return}var u=new SpeechSynthesisUtterance(parts[i++]);u.lang='en-US';u.rate=1;u.onend=next;u.onerror=next;sy.speak(u)})()}
function setLbl(btn,b,s){if(!btn)return;btn.querySelector('b').textContent=b;btn.querySelector('small').textContent=s}
function alertSheet(h,p){sheet('<button class="cth-x" aria-label="Close">&times;</button><h3>'+esc(h)+'</h3><p class="mu" style="font-size:14px;line-height:1.55">'+p+'</p><button class="cth-b l cth-x">OK</button>')}

/* search this page */
function clearHits(){document.querySelectorAll('mark.cth-hit').forEach(function(m){var t=document.createTextNode(m.textContent);m.parentNode.replaceChild(t,m);t.parentNode.normalize()})}
function openSearch(){if($('.cth-sbar'))return;var bar=el('div','cth cth-sbar','<input type="search" placeholder="Search this page" aria-label="Search this page"><span></span><button data-n>Next</button><button data-c>Done</button>');document.body.appendChild(bar);
 var inp=bar.querySelector('input'),cnt=bar.querySelector('span'),hits=[],k=0;inp.focus();
 function run(){clearHits();hits=[];k=0;var q=inp.value.trim();if(q.length<2){cnt.textContent='';return}var re=new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode;if(!p||p.closest('script,style,.cth-sbar,.cth-ov,#cth-print'))return NodeFilter.FILTER_REJECT;return re.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),ns=[];
  while(w.nextNode())ns.push(w.currentNode);
  ns.forEach(function(n){var f=document.createDocumentFragment(),s=n.nodeValue,last=0;s.replace(re,function(m,o){f.appendChild(document.createTextNode(s.slice(last,o)));var mk=el('mark','cth-hit');mk.textContent=m;f.appendChild(mk);hits.push(mk);last=o+m.length});f.appendChild(document.createTextNode(s.slice(last)));n.parentNode.replaceChild(f,n)});
  show()}
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
function lateBanner(){var h=new Date().getHours();if(h>=6&&h<22)return;try{if(sessionStorage.getItem('cth_late_off'))return}catch(e){}
 var b=el('div','cth cth-late','<div class="in"><b>It\'s late, and you\'re dealing with damage. Here\'s what to do right now.</b><ol><li>If water is coming in, shut off the main water valve. If anything sparks or smells like burning, shut off power at the breaker and get out.</li><li>Take photos and video of everything before you clean up.</li><li>Stop more damage if you safely can: towels, buckets, a tarp. Keep the receipts.</li><li>Don\'t throw away damaged items, and don\'t sign anything tonight.</li></ol>'+(PH?'<a href="sms:+1'+PH+'">Text '+esc(FIRST)+' now</a>':'')+'<button type="button">Show the full page</button><div style="font-size:12px;color:#9fb0c2;margin-top:8px">'+esc(FIRST)+' will see your text first thing in the morning. In an emergency, call 911.</div></div>');
 b.querySelector('button').onclick=function(){b.remove();try{sessionStorage.setItem('cth_late_off','1')}catch(e){}};document.body.insertBefore(b,document.body.firstChild)}

/* tools section */
function tools(){if($('.cth-sec'))return;FIRST=D.first||'your adjuster';NAME=D.name||FIRST;PH=(D.phone||'').replace(/\D/g,'').slice(-10);var s=el('section','cth cth-sec','<h2>Tools for your claim</h2><p>Free, from '+esc(FIRST)+'. They work on your phone, even with weak signal.</p><div class="cth-g">'+
 '<button class="cth-t" data-a="binder"><i>&#128210;</i><b>Claim binder</b><small>Call log, damage list and checklist on your phone</small></button>'+
 '<button class="cth-t" data-a="read"><i>&#128266;</i><b>Read it to me</b><small>Listen to this page, hands free</small></button>'+
 '<button class="cth-t" data-a="search"><i>&#128269;</i><b>Search this page</b><small>Find your answer fast</small></button>'+
 '<button class="cth-t" data-a="print"><i>&#128424;</i><b>Print a handout</b><small>First steps for the kitchen table</small></button>'+
 '<button class="cth-t" data-a="home"><i>&#128241;</i><b>Save to home screen</b><small>Opens like an app after a storm</small></button></div>');
 var anchor=$('.sec .pab')?$('.sec .pab').closest('.sec'):($('footer')||null);if(anchor)anchor.parentNode.insertBefore(s,anchor);else document.body.appendChild(s);
 s.addEventListener('click',function(e){var b=e.target.closest('.cth-t');if(!b)return;var a=b.dataset.a;
  if(a==='binder')openBinder();else if(a==='read')readAloud(b);else if(a==='search')openSearch();else if(a==='print')printHandout();else if(a==='home')saveHome()})}

/* homeowner events */
function events(){var q=new URLSearchParams(location.search),src=q.get('s')||(q.get('qr')?'qr':(document.referrer?'referral':'direct'));
 ev('homeowner_open',{source:src});if(src==='qr')ev('qr_scan',{qr_id:q.get('qr')||q.get('r')||'page'});
 var seen=0,done=false;setInterval(function(){if(done||document.hidden)return;seen+=5;if(seen>=60){done=true;ev('homeowner_read_60s')}},5000);
 document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href$=".vcf"],a[href*="contact.vcf"],#vcfBtn,[data-save-contact]');if(a)ev('contact_saved')},true)}

function newAnswer(){var b=load();if(!b||!b.auto||!b.questions||!b.questions.some(function(q){return !q.answer}))return;b=binder();
 answers(b,function(){var n=el('div','cth cth-sbar','<b style="font-size:13.5px;padding-right:4px">'+esc(FIRST)+' answered your question</b><button data-o>Read it</button><button data-c style="background:#333;color:#fff">Later</button>');document.body.appendChild(n);
  n.addEventListener('click',function(e){if(e.target.dataset.o!=null){n.remove();openBinder('q')}if(e.target.dataset.c!=null)n.remove()})})}
function init(){var st=el('style');st.textContent=CSS;document.head.appendChild(st);tools();lateBanner();events();newAnswer();if(/[?&]print=1/.test(location.search))setTimeout(printHandout,800);
 window.CTHome={tools:function(){var o=$('.cth-sec');if(o)o.remove();tools()},binder:openBinder,read:readAloud,search:openSearch,print:printHandout,home:saveHome,late:lateBanner}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
