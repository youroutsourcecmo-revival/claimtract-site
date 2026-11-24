/* ClaimTract answer page renderer (the 12 child pages under every adjuster page).
   Owner: Claude (claimtract-site). The server supplies data only.
   Same data shape as CTPage (see specs/page-render.md). Needs ct-page.js loaded first (for CTPage.CT) and ct-footer.js for the footer.
   CTAnswer.doc(D, articleSlug, {base:'/<adjuster-slug>/', index:false, top:'', head:'', body:''}) -> full HTML document.
   CTAnswer.slugs() -> the 12 article slugs. */
(function(root){
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var VIDS=['roof-table','roof-yard'];
var STN={FL:'Florida',GA:'Georgia',TX:'Texas',CA:'California',LA:'Louisiana',SC:'South Carolina',NC:'North Carolina',AL:'Alabama'};
function slugOf(F){return ((F.fn||'')+'-'+(F.ln||'')).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function fmtPh(d){return d.length===10?'('+d.slice(0,3)+') '+d.slice(3,6)+'-'+d.slice(6):d}
function doc(D,slug,O){O=O||{};var CT=root.CTPage&&root.CTPage.CT;if(!CT)throw new Error('load ct-page.js first');
 var F=D.fields||{},S=D.S||{},arts=CT.articles,ix=0,a=null;
 for(var i=0;i<arts.length;i++)if(arts[i].slug===slug){a=arts[i];ix=i}
 if(!a)return null;
 var fn=(F.fn||'').trim(),name=(fn+' '+(F.ln||'')).trim(),d=String(F.ph||'').replace(/\D/g,'').slice(-10),fp=fmtPh(d),tel='tel:+1'+d,sms='sms:+1'+d,
  city=F.ci||'',st=F.st||'FL',lic=F.lic||'',lt=F.lt||'Public adjuster',ps=O.pslug||slugOf(F),base=O.base||('/'+ps+'/'),
  areas=String(F.ar||'').split(',').map(function(x){return x.trim()}).filter(Boolean).slice(0,10),langs=(D.langs||[]).map(function(x){return x&&x.value?x.value:x}).filter(Boolean),
  photo=S.head&&S.head.url?S.head.url:'',vid=S.bgv||VIDS[ix%VIDS.length];
 var TK=function(x){return esc(String(x||'').replace(/,? at \{\{PHONE\}\}/g,'').split('{{PHONE}}').join('').split('{{CITY}}').join(city||'your area').split('{{FIRST}}').join(fn).split('{{LICENSED_SINCE}}').join(F.lsy||'').split('{{STATE}}').join(st))};
 var ini=esc(((fn.charAt(0))+((F.ln||'').charAt(0))).toUpperCase());
 var chips=function(l){return l.map(function(x){return '<span>'+esc(x)+'</span>'}).join('')};
 var url='https://claimtract.app'+base+slug+'/';
 var about=F.ab?esc(F.ab):TK(CT.pillar.why).replace(' in  because',' because');
 var trust='<div class="sec trs ans-trs" id="trust"><div class="pab"><div class="pab-top">'+(photo?'<span class="pab-ph" role="img" aria-label="'+esc(name)+'" style="background-image:url('+esc(photo)+')"></span>':'<span class="pab-ph">'+ini+'</span>')+
  '<div class="pab-id"><span class="pab-nm">'+esc(name)+'</span><small>Licensed Public Adjuster &middot; '+esc(city)+', '+esc(st)+'</small><span class="pab-bd'+(D.verified?' ok':'')+'"><img src="/assets/ct-shield.png" alt="">'+(D.verified?'License verified &#10003;':'Licensed public adjuster')+'</span></div><a class="pab-call" href="'+tel+'" aria-label="Call '+esc(fn)+'">&#128222;</a></div>'+
  (D.verified?'<div class="pab-ok"><img src="/assets/ct-shield.png" alt="">License active &middot; last verified '+esc(D.verifiedOn||'')+'</div>':'')+
  '<div class="pab-ab"><h3>About '+esc(fn)+'</h3><p>'+about+'</p></div>'+
  '<div class="pab-g"><div><i>LICENSE #</i><b>'+(esc(lic)||'&mdash;')+'</b></div>'+(F.lsy?'<div><i>LICENSED SINCE</i><b>'+esc(F.lsy)+'</b></div>':'')+'<div><i>LICENSE TYPE</i><b>'+esc(lt)+'</b></div><div><i>LICENSED IN</i><b>'+esc(STN[st]||st)+'</b></div></div>'+
  '<div class="pab-x">'+((S.spec||[]).length?'<i>SERVICES</i><div>'+chips(S.spec)+'</div>':'')+(areas.length?'<i>SERVES</i><div>'+chips(areas)+'</div>':'')+(langs.length?'<i>SPEAKS</i><div>'+chips(langs)+'</div>':'')+'</div>'+
  '<a class="pab-v" href="'+esc(F.dfs||'https://licenseesearch.fldfs.com/')+'" target="_blank" rel="noopener">Verify this license on the state&#39;s site &rarr;</a></div></div>';
 var hero='<div class="hero2 hasv ans-hero"><video class="hv" autoplay muted loop playsinline preload="auto" poster="/assets/bg/bg-'+vid+'.jpg"><source src="/assets/bg/bg-'+vid+'.mp4" type="video/mp4"></video>'+
  '<p class="ans-crumb"><a href="'+base+'">'+esc(name)+'</a> &rsaquo; <a href="'+base+'#answers">Answers for homeowners</a></p>'+
  '<button type="button" class="lsn" data-src="/voice/'+ps+'/'+slug+'.mp3"><span class="lsn-i"></span><span class="lsn-t">Listen to this page</span></button><p class="ans-lb">ANSWER PAGE &middot; '+(ix+1)+' OF '+arts.length+'</p><h1>'+TK(a.title)+'</h1>'+
  '<p class="lead">Approved by '+esc(name)+', licensed public adjuster serving '+esc(city)+', '+esc(st)+'.</p>'+
  '<div class="cta"><a href="'+tel+'">Call '+esc(fn)+'</a><a href="'+sms+'">Text '+esc(fn)+' a photo</a></div></div>';
 var B=a.body.map(function(p){return '<p>'+TK(p)+'</p>'});
 var pq='<figure class="ans-pq"><blockquote>&ldquo;'+TK(a.quote)+'&rdquo;</blockquote><div class="ans-cta"><a href="'+tel+'">Call '+esc(fn)+'</a><a href="'+sms+'">Text '+esc(fn)+' a photo</a></div></figure>';
 var art='<div class="sec ans-art"><div class="ans-sa"><b>THE SHORT ANSWER</b><p>'+TK(a.short)+'</p></div><div class="ans-body">'+B.slice(0,2).join('')+pq+B.slice(2).join('')+'</div>'+
  '<div class="ans-nx"><h2>What to do next</h2><ol>'+a.next.map(function(x){return '<li>'+TK(x)+'</li>'}).join('')+'</ol></div>'+
  '<div class="ans-cl"><p>'+TK(a.close)+'</p><a href="'+tel+'">&#128222; Call '+esc(fn)+'</a></div><p class="ans-disc">General information, not legal or insurance advice.</p></div>';
 var nav='<button type="button" aria-label="Previous" onclick="this.parentNode.nextSibling.scrollBy({left:-320,behavior:&#39;smooth&#39;})">&larr;</button><button type="button" aria-label="Next" onclick="this.parentNode.nextSibling.scrollBy({left:320,behavior:&#39;smooth&#39;})">&rarr;</button>';
 var others=arts.slice(ix+1).concat(arts.slice(0,ix));
 var rel='<div class="sec rel" id="answers"><p class="tk">More answer pages</p><h2>More answers for homeowners</h2><div class="rnav">'+nav+'</div><div class="rg">'+others.map(function(o){return '<a class="rc" href="'+base+o.slug+'/"><span class="rl">ANSWER PAGE</span><h3>'+TK(o.title)+'</h3><p>Answers: &ldquo;'+TK(o.captures)+'&rdquo;</p><span class="rr">Read it &rarr;</span></a>'}).join('')+'</div></div>';
 var faq='<div class="sec faq" id="questions"><h2>Questions homeowners ask</h2>'+CT.faq.map(function(q){return '<details><summary>'+TK(q[0])+'</summary><div class="ans"><p>'+TK(q[1])+'</p><p>'+TK(q[2])+'</p><p class="sc">'+TK(q[3])+'</p>'+(q[4]&&q[4]!==slug?'<a class="fq-more" href="'+base+q[4]+'/">Read the full answer &rarr;</a> ':'')+'<a href="'+tel+'">&#128222; Call '+esc(fn)+'</a></div></details>'}).join('')+'<p style="margin:18px 4px 0;font-size:13px;color:var(--p-mut)">General information, not legal or insurance advice.</p></div>';
 var su=encodeURIComponent(url),sm=encodeURIComponent(TK(a.title)+' '+url);
 var share='<div class="sec hsh ans-share"><h2>Know someone who needs this?</h2><p class="hsh-l">Damage happens to neighbors, friends and family too. Send them this answer so they know their rights before they call their insurance company.</p><div class="ans-sh"><a href="sms:?&amp;body='+sm+'">Text it</a><a href="mailto:?subject='+encodeURIComponent(TK(a.title))+'&amp;body='+sm+'">Email it</a><a href="https://wa.me/?text='+sm+'" target="_blank" rel="noopener">WhatsApp</a><a href="https://www.facebook.com/sharer/sharer.php?u='+su+'" target="_blank" rel="noopener">Facebook</a><button type="button" onclick="(navigator.share?navigator.share({title:document.title,url:location.href.split(&#39;?&#39;)[0]}):navigator.clipboard.writeText(location.href.split(&#39;?&#39;)[0]).then(function(){this.textContent=&#39;Link copied&#39;}.bind(this))).catch(function(){})">Share or copy link</button></div></div>';
 var foot=root.CTFooter?root.CTFooter.html({name:name,license:lic,state:STN[st]||st,verified:!!D.verified,verifiedOn:D.verifiedOn||'',phone:d,hours:F.hrs||'',areas:areas,langs:langs,slug:ps,photo:photo}):'<footer class="ans-f"><span>'+esc(name)+' &middot; Public adjuster &middot; License '+esc(lic)+'</span> <a href="/terms/">Terms</a> &middot; <a href="/privacy/">Privacy</a></footer>';
 var top='<div class="nv"><div class="nm"><a href="'+base+'" style="color:inherit;text-decoration:none">'+esc(name)+'</a></div><a class="call" href="'+tel+'">&#128222; Call '+esc(fn)+'</a></div>';
 var title=TK(a.title)+' | '+esc(name)+', Public Adjuster',desc=TK(a.short).slice(0,155);
 return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+title+'</title><meta name="description" content="'+desc+'">'+
  '<meta name="robots" content="'+(O.index?'index,follow':'noindex,follow')+'"><link rel="canonical" href="'+url+'"><link rel="icon" href="/favicon.ico">'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/assets/ct-page.css?v=1124b"><link rel="stylesheet" href="/assets/ct-answer.css">'+(O.head||'')+'</head><body>'+(O.top||'')+
  '<div class="pv '+esc(S.tpl||'paper')+' ans">'+top+hero+trust+art+faq+rel+share+foot+'</div>'+
  '<script src="/assets/ct-footer.js" defer></script><script src="/assets/ct-hero.js" defer></script><script src="/assets/ct-home.js?v=1124f" data-slug="'+esc(ps)+'" data-first="'+esc(fn)+'" data-name="'+esc(name)+'" data-phone="'+esc(d)+'" defer></script>'+(O.body||'')+'</body></html>'}
root.CTAnswer={doc:doc,slugs:function(){return root.CTPage.CT.articles.map(function(a){return a.slug})}};
})(typeof window!=='undefined'?window:globalThis);
