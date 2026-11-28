/* Alex, the adjuster's chief of staff (text guide in the back office).
   Opens from any [data-alex] element. First open: she introduces herself.
   Answers: server first (/api/app/alex, Gemini on the box) when signed in, else the local map below.
   Unknown questions go to /api/app/alex/unknown so Ezekiel gets a Captain alert, and Alex follows up later. */
(function(){
var K_INTRO='ct_alex_intro',K_LOG='ct_alex_log',busy=false,box=null;
function C(){return window.__ct||{}}
function st(){try{return C().state()}catch(e){return {}}}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function first(){var M=st().ME,n=M&&(M.first_name||(M.name||'').split(' ')[0]);return n||(st().ME?'':'Cedric')}
function cn(){var n=first();return n?', '+n:''}
function pro(){var p=st().plan;return p&&p!=='free'&&p!=='trial'}

/* Where things are, what they are, why they matter, and how she'd use them. go = screen to open. */
var MAP=[
 {k:'pro upgrade plan plans price cost pay paid crown 99 299 trial',go:'plans',a:'The crowns mark ClaimTract Pro. Pro is the free version strapped to a rocket: your AI assistant picks up while you are on a roof, homeowners can type what happened, door tickets track by batch, and your cards say what you want them to say.',h:'If you are getting calls you can\'t pick up, that is usually the moment Pro pays for itself.'},
 {k:'door ticket tickets hanger hangers print qr batch batches neighborhood street dawn',go:'doors',a:'Door ticketing lives on your Home screen. You print tickets with your QR code, the homeowner scans one, watches a short video and reaches out.',h:'Ticket one street at dawn, then watch the scans by neighborhood. On Pro, give each street or each teammate its own batch so you know who earned the lead.'},
 {k:'card cards viral engine share shared chain forwarded who watched running late thanks message text homeowner',go:'cards',a:'Your viral engine shows every card you sent and everyone it reached: who watched, who shared you, who tapped Call.',h:'Send the thank-you card right after every inspection. Homeowners forward it to neighbors, and each forward is a warm lead you did not have to knock for.'},
 {k:'referral referrals earn money 25 commission made with claimtract',go:'earn',a:'Your referrals screen shows adjusters who signed up through you. You earn $25 a month for each paying one.',h:''},
 {k:'website page site mypage my page link url',go:'mypage',a:'Your website is the page homeowners land on from your cards, tickets and QR code. It has your video, your answers and your Call and Text buttons.',h:'Share it in every text. A homeowner who reads you for a minute already trusts you before you pick up.'},
 {k:'edit change photo headshot name bio license number update profile',go:'edit',a:'You change your name, photo and details under Edit, from your Page tab.',h:'Use a clear, friendly headshot. It sits on every card a homeowner sees.'},
 {k:'video videos youtube record intro welcome unlock sharing',go:'mypage',a:'Your own video is what unlocks sharing. Read the script, record it in your own words, upload it to YouTube as unlisted, and paste the link. Homeowners see your face before they meet you.',h:'Keep it under a minute and look at the lens. Sincere beats polished.'},
 {k:'live chat chat nathan bubble website chat',go:'livechat',a:'Live chat is the bubble on your website. Homeowners can ask questions there any time.',h:''},
 {k:'claim upload claims article articles write posts facebook instagram google',go:'crm',a:'Upload a claim and Sophia turns it into an article on your website, plus Facebook, Instagram and Google posts, with private details taken out.',h:'Start with your best claim story. Every one becomes a page a homeowner nearby can find on Google.'},
 {k:'pipeline crm leads lead contacts homeowners list follow up',go:'crm',a:'Your pipeline holds every homeowner who reached out, with where they came from.',h:'Work it top to bottom every morning before you get on a roof.'},
 {k:'insights stats numbers views analytics working week',go:'insights',a:'Insights shows how many homeowners opened your website, tapped Call and booked.',h:'Watch which share brings the most calls, and do more of that.'},
 {k:'qr code scan sign yard truck',go:'qr',a:'Your QR code puts your website on door tickets, yard signs and your truck. Every scan tells you where and when.',h:''},
 {k:'handout print leave behind kitchen table',go:'handout',a:'The handout is one printed page with your QR code to leave on the kitchen table after a visit.',h:''},
 {k:'prep appointment booking book calendar schedule inspection',go:'prep',a:'When a homeowner books, they get a prep page so they show up with the right papers: policy, claim number and photos.',h:''},
 {k:'binder claim binder homeowner log calls checklist',go:null,a:'The claim binder is on your website. Homeowners log calls, list damage and follow the checklist, and save it to their phone from your thank-you card.',h:'On Pro, the binder updates them for you, so you are not stuck on a 25-minute call with a lonely homeowner.'},
 {k:'license verified badge verification',go:'license',a:'The License verified badge on your cards links to your state record, so homeowners can check you in one tap.',h:''},
 {k:'esther explainer explainers turn off on avatars',go:null,a:'Esther is the explainer. She tells you what each screen is the first time you open it. The tab on the right edge turns explainers off and on.',h:''},
 {k:'who are you alex chief staff assistant',go:null,a:'I\'m Alex, your chief of staff. I know where everything in your back office is, what it does and how I\'d use it. Ask me anything.',h:''}
];
function local(q){var w=String(q).toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(function(x){return x.length>2&&!/^(the|and|you|your|can|how|what|where|who|does|did|for|with|this|that|are|get|got|have|has|my|me|about|do|is|it|its|i)$/.test(x)}),best=null,bs=0;
 MAP.forEach(function(m){var ks=m.k.split(' '),s=0;w.forEach(function(x){ks.forEach(function(k){if(k===x)s+=2;else if(k.length>3&&(k.indexOf(x)===0||x.indexOf(k)===0))s+=1})});if(s>bs){bs=s;best=m}});
 var H=C().help||{};if(bs<2){Object.keys(H).forEach(function(id){var t=(H[id][0]+' '+H[id][1]).toLowerCase(),s=0;w.forEach(function(x){if(t.indexOf(x)>=0)s++});if(s>bs+1){bs=s;best={a:H[id][1].replace(/&#\d+;/g,''),go:null,h:''}}})}
 return bs>=2?best:null}


/* Everything in ClaimTract, said as a benefit. Shown on first open and via "Everything"; typing filters it live. */
var CAT=[
 ['Get found','mypage','Your website','Where every card, ticket and QR code sends homeowners','website page site link'],
 ['Get found','articles','Your answer pages','Your answers show up when neighbors search Google','articles answers google seo posts'],
 ['Get found','crm','Turn a claim into content','Sophia writes the article and the Facebook, Instagram and Google posts','upload claim sophia write facebook instagram'],
 ['Get found','snap','Snap and post','Take a photo and post it to Facebook or Instagram your way','snap photo post facebook instagram'],
 ['Get found','qr','Your QR code','Put your website on signs, trucks and tickets','qr code sign truck'],
 ['Get the call','doors','Door tickets','The door knocks for you at dawn','door ticket hanger batch print'],
 ['Get the call','share','Text a homeowner','Know the second she opens your message','text message share send card running late thanks'],
 ['Get the call','livechat','Live chat','Homeowners ask questions on your website any time','chat live nathan'],
 ['Get the call','handout','Printed handout','One page with your QR to leave on the kitchen table','print handout'],
 ['Win the visit','prep','Prep page','Homeowners show up with the right papers','prep booking appointment papers'],
 ['Win the visit','license','License verified badge','Homeowners check your license in one tap','license verified badge'],
 ['Win the visit','meet','Video meetings','Meet before the visit, by video','video meet call google meet'],
 ['Grow','cards','Your viral engine','See who watched, who shared you and who called','viral engine shared watched cards'],
 ['Grow','crm','The Claim Engine','Your claims and every homeowner who reached out','pipeline crm leads claims engine'],
 ['Grow','insights','Insights','Which shares bring you calls','insights stats views'],
 ['Grow','earn','Referrals','$25 a month for every adjuster you bring','referral earn 25'],
 ['Grow','edit','Your profile','Your photo, name and details on every card','edit photo name profile headshot'],
 ['Grow','plans','\u{1F451} ClaimTract Pro','Your assistant picks up while you’re on a roof','pro upgrade plans crown trial']
];
function catRows(L){var g='';return L.map(function(c){var h=(c[0]!==g?'<div class="ctal-ch">'+esc(c[0])+'</div>':'');g=c[0];return h+'<button type="button" class="ctal-r" data-algo="'+c[1]+'"><b>'+esc(c[2])+'</b><small>'+esc(c[3])+'</small></button>'}).join('')}
function catFind(q){q=q.toLowerCase().trim();if(!q)return [];var w=q.split(/\s+/);return CAT.filter(function(c){var t=(c[2]+' '+c[3]+' '+c[4]).toLowerCase();return w.every(function(x){return t.indexOf(x)>=0})}).sort(function(a,b){var A=a[2].toLowerCase().indexOf(w[0])>=0?0:1,B=b[2].toLowerCase().indexOf(w[0])>=0?0:1;return A-B}).slice(0,5)}
function catShow(){var m=box&&box.querySelector('.ctal-m');if(!m)return;var d=document.createElement('div');d.className='ctal-b ctal-cat';d.innerHTML='<div class="ctal-ct">Everything in ClaimTract. Tap to jump there.</div>'+catRows(CAT);m.appendChild(d);m.scrollTop=m.scrollHeight}
function css(){if(document.getElementById('ctal-css'))return;var s=document.createElement('style');s.id='ctal-css';s.textContent=
'.ctal{position:fixed;inset:0;z-index:2147483500;background:rgba(0,0,0,.35);display:flex;align-items:flex-end;justify-content:center}'+
'.ctal-s{width:100%;max-width:520px;height:min(86vh,680px);background:#EFEAE2;border-radius:16px 16px 0 0;display:flex;flex-direction:column;overflow:hidden;font-family:Inter,system-ui,sans-serif;color:#111}.ctal-s *{color:inherit}.ctal-go{color:#111!important}.ctal-f button{color:#fff!important}.ctal-h small{color:#777!important}'+
'.ctal-h{display:flex;align-items:center;gap:10px;padding:10px 12px;background:#fff;border-bottom:1px solid #e5e5e5}'+
'.ctal-h img{width:34px;height:34px;border-radius:50%;object-fit:cover;object-position:50% 40%}.ctal-h b{display:block;font-size:14px}.ctal-h small{display:block;font-size:11px;color:#777}'+
'.ctal-x{margin-left:auto;width:30px;height:30px;border:0;border-radius:50%;background:#f0f0f0;font-size:16px;cursor:pointer}'+
'.ctal-m{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px}'+
'.ctal-b{max-width:84%;padding:7px 10px;border-radius:10px;font-size:13.5px;line-height:1.4;background:#fff;align-self:flex-start;box-shadow:0 1px 1px rgba(0,0,0,.06)}'+
'.ctal-b.me{background:#D9FDD3;align-self:flex-end}.ctal-b.tip{background:#FFF6D6}'+
'.ctal-go{display:inline-block;margin-top:6px;height:28px;padding:0 12px;border:0;border-radius:14px;background:#F5A524;color:#111;font:700 12.5px Inter,system-ui;cursor:pointer}'+
'.ctal-f{display:flex;gap:6px;padding:8px;background:#F0F0F0;padding-bottom:calc(8px + env(safe-area-inset-bottom))}'+
'.ctal-f input{flex:1;min-width:0;height:38px;border:0;border-radius:19px;padding:0 14px;font:500 14px Inter,system-ui;background:#fff}'+
'.ctal-f button{width:38px;height:38px;border:0;border-radius:50%;background:#111;color:#fff;font-size:16px;cursor:pointer}'+
'.ctal-q[hidden]{display:none!important}.ctal-q{display:flex;flex-wrap:wrap;gap:6px;padding:0 10px 8px}.ctal-q button{height:28px;padding:0 10px;border:1px solid #d5d5d5;border-radius:14px;background:#fff;font:600 12px Inter,system-ui;cursor:pointer}';
s.textContent+='.ctal-cat{max-width:94%;padding:4px 0!important;overflow:hidden}.ctal-ct{padding:6px 10px 4px;font-size:12.5px;color:#555!important}.ctal-ch{padding:8px 10px 2px;font:700 10.5px Inter,system-ui;letter-spacing:.06em;text-transform:uppercase;color:#b08417!important}.ctal-r{display:block;width:100%;text-align:left;border:0;border-top:1px solid #f0f0f0;background:none;padding:7px 10px;cursor:pointer;font-family:inherit;border-radius:0}.ctal-r b{display:block;font-size:13.5px}.ctal-r small{display:block;font-size:12px;color:#666!important;line-height:1.3;font-weight:500}.ctal-sg{background:#fff;border-top:1px solid #e5e5e5;max-height:40vh;overflow-y:auto}.ctal-sg[hidden]{display:none!important}';
document.head.appendChild(s)}

function bub(t,cls,go){var m=box&&box.querySelector('.ctal-m');if(!m)return;var d=document.createElement('div');d.className='ctal-b'+(cls?' '+cls:'');d.innerHTML=esc(t)+(go?'<br><button class="ctal-go" data-algo="'+esc(go)+'">Take me there &rsaquo;</button>':'');m.appendChild(d);m.scrollTop=m.scrollHeight;return d}
function save(){try{var L=[].map.call(box.querySelectorAll('.ctal-b:not(.ctal-cat)'),function(b){return [b.className,b.textContent.replace('Take me there ›','').trim()]}).slice(-30);localStorage.setItem(K_LOG,JSON.stringify(L))}catch(e){}}
function ev(n,f){try{var s=st();if(s.R&&s.ME)C().api('POST','/api/app/events',Object.assign({name:n},f||{}))}catch(e){}}

function small(q){var t=q.toLowerCase().replace(/[^a-z ]/g,'').trim();if(/^(hi|hello|hey|yo|good (morning|afternoon|evening)|hi alex|hey alex|hello alex)$/.test(t))return 'Hi'+cn()+'. What can I help you find? Door tickets, your cards, your website, Pro: ask me anything.';if(/^(thanks|thank you|thx|ok|okay|cool|great|got it)( alex)?$/.test(t))return 'Anytime'+cn()+'. I\'m right here when you need me.';return null}
function answer(q,from){if(busy)return;busy=true;var qq=box&&box.querySelector('.ctal-q');if(qq)qq.hidden=true;bub(q,'me');var typing=bub('Alex is typing…','');var s=st(),done=function(r){busy=false;if(typing)typing.remove();
  if(r&&r.answer){bub(r.answer,'',r.go||null);if(r.how)bub(r.how,'tip');ev('alex_answer',{q:q.slice(0,200),src:r.src||'map'})}
  else{bub('Good question'+cn()+'. I don\'t have that one yet, so I\'ve passed it to the team. I\'ll come back to you right here with the answer.','');
   try{if(s.R&&s.ME)C().api('POST','/api/app/alex/unknown',{q:q.slice(0,500),screen:from||''})}catch(e){}ev('alex_unknown',{q:q.slice(0,200),screen:from||''})}
  save()};
 if(/^(show me )?(everything|all|menu|list)$/i.test(q.trim())){busy=false;if(typing)typing.remove();catShow();save();return}
 var sm=small(q);if(sm){setTimeout(function(){busy=false;if(typing)typing.remove();bub(sm,'');save()},350);return}
 var loc=function(){var m=local(q);done(m?{answer:m.a,go:m.go,how:m.h,src:'map'}:null)};
 if(s.R&&s.ME&&C().api){var t=setTimeout(function(){t=0;loc()},9000);
  C().api('POST','/api/app/alex',{q:q.slice(0,500),screen:from||'',plan:s.plan}).then(function(j){if(!t)return;clearTimeout(t);if(j&&j.ok&&j.answer)done({answer:j.answer,go:j.go,how:j.how,src:'ai'});else if(j&&j.ok&&j.unknown)done(null);else loc()}).catch(function(){if(t){clearTimeout(t);loc()}})}
 else setTimeout(loc,450)}

function open(from){css();if(box)return;box=document.createElement('div');box.className='ctal';
 box.innerHTML='<div class="ctal-s" role="dialog" aria-label="Ask Alex"><div class="ctal-h"><img src="/assets/toon/alex-head.jpg" alt=""><div><b>Alex</b><small>Your chief of staff</small></div><button class="ctal-x" aria-label="Close">&times;</button></div><div class="ctal-m"></div><div class="ctal-q"></div><div class="ctal-sg" hidden></div><form class="ctal-f"><input placeholder="Ask Alex anything" maxlength="300" enterkeyhint="send"><button aria-label="Send">&#10148;</button></form></div>';
 document.body.appendChild(box);
 var L=null;try{L=JSON.parse(localStorage.getItem(K_LOG)||'null')}catch(e){}
 if(L&&L.length)L.forEach(function(x){var d=bub(x[1],'');d.className=x[0]});
 var seen=false;try{seen=localStorage.getItem(K_INTRO)==='1'}catch(e){}
 if(!seen){bub('Hi'+(first()?' '+first():'')+', I\'m Alex, your chief of staff. Inside your back office, I\'m the chief of staff you didn\'t know you needed.','');bub('I know where everything is, what it does and how I\'d use it if I were you. Ask me anything. If I don\'t know, I\'ll find out and come back to you.','');bub('Here\'s everything in your back office. If you forget where something is, just start typing it.','');catShow();box.__cat=1;try{localStorage.setItem(K_INTRO,'1')}catch(e){}ev('alex_intro',{})}
 else if(!L||!L.length)bub('What can I help you find'+cn()+'?','');
 var Q=['Show me everything','How do door tickets work?','What do I get with Pro?','How do I unlock sharing?','Who watched my cards?'];
 if(box.__cat)box.querySelector('.ctal-q').hidden=true;box.querySelector('.ctal-q').innerHTML=Q.map(function(x){return '<button type="button">'+esc(x)+'</button>'}).join('');
 box.addEventListener('click',function(e){if(e.target===box||e.target.closest('.ctal-x')){close();return}
  var g=e.target.closest('[data-algo]');if(g){var k=g.dataset.algo;close();try{C().go(k)}catch(x){}ev('alex_go',{to:k});return}
  var q=e.target.closest('.ctal-q button');if(q){if(/everything/i.test(q.textContent)){catShow();return}answer(q.textContent,from)}});
 box.querySelector('.ctal-f input').addEventListener('input',function(){var sg=box.querySelector('.ctal-sg'),L=catFind(this.value);if(!L.length){sg.hidden=true;sg.innerHTML='';return}sg.innerHTML=catRows(L);sg.hidden=false});
 box.querySelector('form').addEventListener('submit',function(e){e.preventDefault();var i=box.querySelector('input'),v=i.value.trim();if(!v)return;i.value='';var sg=box.querySelector('.ctal-sg');sg.hidden=true;answer(v,from)});
 try{var S2=st();if(S2.R&&S2.ME)C().api('GET','/api/app/alex/inbox').then(function(j){if(j&&j.ok&&j.items&&box)j.items.forEach(function(it){bub('Following up on your question about '+(it.topic||'that')+': '+it.answer,'',it.go||null)});if(j&&j.items&&j.items.length)save()}).catch(function(){})}catch(e){}
 document.documentElement.style.overflow='hidden';ev('alex_open',{from:from||''})}
function close(){if(box){save();box.remove();box=null}document.documentElement.style.overflow=''}
window.ctAlex=open;
document.addEventListener('click',function(e){var t=e.target.closest('[data-alex]');if(!t)return;e.preventDefault();e.stopPropagation();open(t.dataset.alex)},true);
})();
