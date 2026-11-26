/* One sound at a time. Ezekiel's standing rule (Nov 26, 2026): never two sound sources at once,
   anywhere: page video, Esther, avatar videos, voiceovers, read-aloud, YouTube, same-site frames.
   Covers: <video>/<audio> in the page, detached new Audio() players, speechSynthesis (read aloud),
   YouTube iframes (enablejsapi), and same-site iframes (phone demo, chat box, Sophia's show).
   Muted background loops are left alone. Load this first on every page. */
(function(){if(window.__ctOne2)return;window.__ctOne=window.__ctOne2=1;var seen={},all=[];
var P=HTMLMediaElement.prototype,op=P.play;
/* track every media element that ever plays, including detached new Audio() */
P.play=function(){if(all.indexOf(this)<0)all.push(this);if(!this.muted&&this.volume>0)claim(this);return op.apply(this,arguments)};
function sounding(m){return m&&!m.paused&&!m.muted&&m.volume>0}
function hushLocal(except){
 var list=all.slice();document.querySelectorAll('video,audio').forEach(function(m){if(list.indexOf(m)<0)list.push(m)});
 list.forEach(function(m){if(m!==except&&sounding(m)){try{m.pause()}catch(e){}}});
 if(except!=='speech'){try{if(window.speechSynthesis&&(speechSynthesis.speaking||speechSynthesis.pending))speechSynthesis.cancel()}catch(e){}}
 if(except!=='yt')ytPauseAll(null);}
function ext(){try{window.dispatchEvent(new CustomEvent('ct-hush'))}catch(_){}}
function ytFrames(){return [].slice.call(document.querySelectorAll('iframe')).filter(function(f){return /youtube(-nocookie)?\.com\/embed/.test(f.src||'')})}
function ytPauseAll(except){ytFrames().forEach(function(f){if(f.contentWindow&&f.contentWindow!==except){try{f.contentWindow.postMessage(JSON.stringify({event:'command',func:'pauseVideo',args:''}),'*')}catch(e){}}})}
function frames(){return [].slice.call(document.querySelectorAll('iframe')).filter(function(f){return !/youtube/.test(f.src||'')}).map(function(f){try{return f.contentWindow}catch(e){return null}}).filter(Boolean)}
function send(id,skip){var msg={ct:'one-play',id:id};if(parent&&parent!==window&&parent!==skip){try{parent.postMessage(msg,'*')}catch(e){}}frames().forEach(function(w){if(w!==skip){try{w.postMessage(msg,'*')}catch(e){}}})}
function claim(src){hushLocal(src);var id=Date.now()+'-'+Math.random();seen[id]=1;send(id,null)}
window.ctOneClaim=claim;
document.addEventListener('play',function(e){var t=e.target;if(t&&all.indexOf(t)<0)all.push(t);if(sounding(t))claim(t)},true);
document.addEventListener('volumechange',function(e){var t=e.target;if(sounding(t))claim(t)},true);
/* read-aloud: speaking claims the floor */
try{if(window.speechSynthesis){var sp=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=function(u){claim('speech');ext();return sp(u)}}}catch(e){}
/* YouTube: ask every player to report state; playing (1) claims the floor */
function ytListen(){ytFrames().forEach(function(f){if(f.__ctOne)return;f.__ctOne=1;function hi(){try{f.contentWindow.postMessage(JSON.stringify({event:'listening',id:'ctone'}),'*')}catch(e){}}f.addEventListener('load',hi);hi()})}
setInterval(ytListen,1500);
addEventListener('message',function(e){var d=e.data;
 if(typeof d==='string'&&d.charAt(0)==='{'&&/youtube/.test(e.origin||'')){try{var j=JSON.parse(d);var s=j.info&&j.info.playerState;if(j.event==='onStateChange')s=j.info;if(s===1){hushLocal('yt');ext();ytPauseAll(e.source);var id=Date.now()+'-'+Math.random();seen[id]=1;send(id,null)}}catch(_){}return}
 if(!d||d.ct!=='one-play'||seen[d.id])return;seen[d.id]=1;hushLocal(null);ext();send(d.id,e.source)});
})();
