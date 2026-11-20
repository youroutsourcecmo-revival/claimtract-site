/* ClaimTract free app: owner tools (homeowner letter, what-to-have-ready checklist, appointment text).
   Works in the builder preview and on live pages through event delegation on [data-tool]. */
(function(){
if(window.__ctOwner)return;window.__ctOwner=1;
function q(s,r){return (r||document).querySelector(s)}
function esc(x){return String(x).replace(/[&<>"']/g,function(c){return '&#'+c.charCodeAt(0)+';'})}
function info(){if(window.__ctDemo)return window.__ctDemo;var o=q('#own')||{},d=o.dataset||{};var nm=d.name||((q('.nv .nm')||{}).textContent||'').trim()||'your public adjuster';
 var tel=(q('.nv .call')||{}).getAttribute?q('.nv .call').getAttribute('href'):'';var ph=(q('.nv .call')||{}).textContent||'';ph=ph.replace(/^Call\s*/,'');
 var url=d.url||location.href.split('?')[0].split('#')[0];return {name:nm,first:nm.split(' ')[0],phone:ph,url:url}}
function copy(btn,txt){var done=function(){var t=btn.textContent;btn.textContent='Copied';setTimeout(function(){btn.textContent=t},1600)};
 try{navigator.clipboard.writeText(txt).then(done,function(){fb()})}catch(e){fb()}
 function fb(){var t=document.createElement('textarea');t.value=txt;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();try{document.execCommand('copy');done()}catch(e){}t.remove()}}
function css(){if(q('#ctoCss'))return;var s=document.createElement('style');s.id='ctoCss';s.textContent=
'.cto{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0);display:flex;align-items:flex-end;justify-content:center;transition:background .25s;font:15px/1.5 Inter,system-ui,sans-serif}'+
'.cto.on{background:rgba(0,0,0,.55)}.cto-in{width:min(560px,100%);max-height:88vh;overflow:auto;background:#fff;color:#111;border-radius:20px 20px 0 0;padding:20px 18px 24px;transform:translateY(100%);transition:transform .3s cubic-bezier(.2,.8,.2,1)}'+
'.cto.on .cto-in{transform:none}@media(min-width:760px){.cto{align-items:center}.cto-in{border-radius:18px}}'+
'.cto h4{margin:0 0 4px;font:800 19px Inter,system-ui,sans-serif}.cto .s{margin:0 0 12px;color:#55585F;font-size:14px}'+
'.cto input{width:100%;padding:11px 12px;border:1px solid #E1E1DC;border-radius:10px;font:600 15px Inter,system-ui,sans-serif;margin:0 0 8px;background:#F4F4F1;color:#111}'+
'.cto .doc{background:#FAFAF8;border:1px solid #E1E1DC;border-radius:12px;padding:14px;font:14px/1.6 Georgia,serif;max-height:300px;overflow:auto}.cto .doc p{margin:0 0 10px}'+
'.cto .row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.cto .row button,.cto .row a{flex:1;min-width:120px;text-align:center;border:0;border-radius:12px;padding:12px;font:800 14px Inter,system-ui,sans-serif;cursor:pointer;text-decoration:none;background:#F5A524;color:#111}'+
'.cto .row .g{background:#111;color:#fff}.cto .x{display:block;width:100%;margin-top:10px;border:0;background:transparent;color:#55585F;font:600 14px Inter,system-ui,sans-serif;cursor:pointer;padding:8px}'+
'.cto .ck{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-top:1px solid #EEE;font-size:14px;cursor:pointer}.cto .ck input{width:20px;height:20px;margin:0;flex:none;accent-color:#F5A524}'+
'.cto .ck input:checked+span{color:#888;text-decoration:line-through}.cto .bar{height:8px;background:#EEE;border-radius:9px;overflow:hidden;margin:6px 0}.cto .bar i{display:block;height:100%;width:0;background:#F5A524;transition:width .4s}'+
'.cto .chips{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 8px}.cto .chips button{border:1px solid #E1E1DC;background:#F4F4F1;border-radius:99px;padding:8px 12px;font:700 13px Inter,system-ui,sans-serif;cursor:pointer;color:#111}.cto .chips button[aria-pressed=true]{background:#F5A524;border-color:#F5A524}'+
'.cto .bub{background:#1f8cff;color:#fff;border-radius:18px 18px 4px 18px;padding:11px 13px;font-size:14.5px;margin:4px 0 0 24px}.cto .n{font:700 13px Inter,system-ui,sans-serif;color:#8F5400}';
document.head.appendChild(s)}
function sheet(html){css();var o=document.createElement('div');o.className='cto';o.innerHTML='<div class="cto-in" role="dialog" aria-modal="true">'+html+'<button class="x" type="button" data-x>Close</button></div>';
 o.addEventListener('click',function(e){if(e.target===o||e.target.hasAttribute('data-x')){o.classList.remove('on');setTimeout(function(){o.remove()},300)}});document.body.appendChild(o);requestAnimationFrame(function(){o.classList.add('on')});return o}
function sms(body){return 'sms:?&body='+encodeURIComponent(body)}
var CK=['Your insurance policy (the full one, not just the cover page)','Your claim number, if you already filed','Photos or video of the damage','Photos of your home from before, if you have any','Letters or emails from your insurance company','Repair estimates or invoices you already have','Receipts for emergency work (tarps, water removal, drying)','Receipts for a hotel or meals if you had to leave','A list of damaged belongings','Your mortgage company’s name'];
var LT=[['confirm','Confirm visit'],['thanks','Thank you'],['missed','Sorry I missed you'],['late','Running late'],['checkin','Checking in'],['referral','Thanks for the referral']];
function sig(I){return '\n\n'+I.name+'\nPublic Adjuster'+(I.phone?'\n'+I.phone:'')}
var LTX={
confirm:function(n,I){return 'Dear '+n+',\n\nThis note confirms our visit. When I get there, we’ll walk the property together, I’ll take photos of the damage, and I’ll answer any questions you have. Plan on about an hour.\n\nYou can check my license before I arrive. The link is on my page: '+I.url+'\n\nIf the time stops working for you, just text me and we’ll pick another one.'+sig(I)},
thanks:function(n,I){return 'Dear '+n+',\n\nThank you for letting me look at your home. I know this is a hard week. Your insurance company has its own adjusters, and they work for the insurance company. I work for you.\n\nHere’s what happens next. I go through your policy, document every bit of the damage, and build a full estimate. Then I present it to your insurance company and push for a fair settlement. You don’t have to argue with anyone. That’s my job.\n\nYou can check my license any time. The link is on my page: '+I.url+'\n\nWhat’s the best time for me to call you this week?'+sig(I)},
missed:function(n,I){return 'Dear '+n+',\n\nI came by today about a matter that may be of financial importance to you as the owner of this home. Sorry I missed you.\n\nYou can see who I am and check my license here: '+I.url+'\n\nWhen is a good time for me to stop back?'+sig(I)},
late:function(n,I){return 'Hi '+n+', it’s '+I.first+'. I’m running about 15 minutes behind and wanted you to know right away. I’m still on my way. Does that still work for you?'},
checkin:function(n,I){return 'Hi '+n+', it’s '+I.first+'. Just checking in to see how you and your home are doing. If anything new has come up, or you got a letter you’re not sure about, send me a photo of it. Is there anything I can help with this week?'},
referral:function(n,I){return 'Dear '+n+',\n\nThank you for sending your neighbor my way. A referral is the biggest compliment I can get, and I’ll take good care of them.\n\nIf anyone else you know ever has damage to their home, my page has everything they need: '+I.url+'\n\nIs there anything I can do for you in return?'+sig(I)}
};
var T={
letter:function(){var I=info(),k='thanks',ed=false,o=sheet('<h4>Homeowner letter</h4><p class="s">Pick the note, type their name. Edit anything before you send it.</p><div class="chips" data-k>'+LT.map(function(x){return '<button type="button" data-k="'+x[0]+'" aria-pressed="'+(x[0]===k)+'">'+x[1]+'</button>'}).join('')+'</div><input data-f="n" placeholder="Homeowner name" value="'+(window.__ctDemo?'Linda':'')+'"><textarea data-d rows="12" style="width:100%;box-sizing:border-box;background:#FAFAF8;border:1px solid #E1E1DC;border-radius:12px;padding:14px;font:14px/1.6 Georgia,serif;color:#111;resize:vertical"></textarea><div class="row"><button type="button" data-c>Copy letter</button><a class="g" data-sms href="#">Text it</a></div>');
 var ta=q('[data-d]',o);function sync(){q('[data-sms]',o).href=sms(ta.value)}
 function r(){var n=q('[data-f=n]',o).value.trim()||'there';ta.value=LTX[k](n,I);ed=false;sync()}
 ta.oninput=function(){ed=true;sync()};q('[data-c]',o).onclick=function(){copy(this,ta.value)};
 q('[data-f=n]',o).oninput=function(){if(!ed)r()};
 o.querySelectorAll('[data-k] button').forEach(function(b){b.onclick=function(){k=b.getAttribute('data-k');o.querySelectorAll('[data-k] button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});r()}});
 r()},
check:function(){var I=info(),o=sheet('<h4>What to have ready</h4><p class="s">Text this before the visit. Tick off what they already have.</p><div class="bar"><i data-b></i></div><div class="n" data-cn></div><div data-l>'+CK.map(function(c){return '<label class="ck"><input type="checkbox"><span>'+esc(c)+'</span></label>'}).join('')+'</div><div class="row"><button type="button" data-c>Copy checklist</button><a class="g" data-sms href="#">Text it</a></div>');
 var t='Before I come out, please have these ready if you can:\n'+CK.map(function(c){return '• '+c}).join('\n')+'\nMissing a few? That’s fine. We’ll work with what you have.\n'+I.first+' · '+I.url;
 function r(){var n=o.querySelectorAll('[data-l] input:checked').length;q('[data-b]',o).style.width=(n/CK.length*100)+'%';q('[data-cn]',o).textContent=n+' of '+CK.length+' ready'}
 o.querySelectorAll('[data-l] input').forEach(function(x){x.onchange=r});r();q('[data-c]',o).onclick=function(){copy(this,t)};q('[data-sms]',o).href=sms(t)},
appt:function(){var I=info(),o=sheet('<h4>Appointment text</h4><p class="s">Pick the day and time. The text writes itself.</p><input data-f="n" placeholder="Their first name" value="'+(window.__ctDemo?'Linda':'')+'"><div class="chips" data-g="d"><button type="button" aria-pressed="true">today</button><button type="button">tomorrow</button><button type="button">Monday</button><button type="button">Saturday</button></div><div class="chips" data-g="t"><button type="button">9 AM</button><button type="button" aria-pressed="true">11 AM</button><button type="button">2 PM</button><button type="button">4 PM</button></div><div class="bub" data-m></div><div class="row"><button type="button" data-c>Copy text</button><a class="g" data-sms href="#">Text it</a></div>');
 function v(g){return q('[data-g='+g+'] [aria-pressed=true]',o).textContent}
 function r(){var n=q('[data-f=n]',o).value.trim(),d=v('d');var t='Hi'+(n?' '+n:'')+', this is '+I.name+', the public adjuster. I’ll see you '+(d==='today'||d==='tomorrow'?d:'on '+d)+' at '+v('t')+'. Here’s a short page about what I do and what to have ready: '+I.url+' Does that time still work for you?';q('[data-m]',o).textContent=t;q('[data-c]',o).onclick=function(){copy(this,t)};q('[data-sms]',o).href=sms(t)}
 o.querySelectorAll('.chips').forEach(function(g){g.querySelectorAll('button').forEach(function(b){b.onclick=function(){g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');r()}})});
 q('[data-f=n]',o).oninput=r;r()}};
window.__ctSheet=sheet;window.__ctCopy=copy;window.__ctEsc=esc;
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-tool]');if(!b)return;e.preventDefault();var f=T[b.getAttribute('data-tool')];if(f){f();try{window.__ctT&&window.__ctT('free_tool',b.getAttribute('data-tool'))}catch(_){}}});
})();
