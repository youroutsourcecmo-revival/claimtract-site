/* One sound at a time, across the page and any same-site frames (phone demo, chat box).
   Muted background loops are left alone. */
(function(){if(window.__ctOne)return;window.__ctOne=1;var seen={};
function hush(except){document.querySelectorAll('video,audio').forEach(function(m){if(m!==except&&!m.paused&&!m.muted){try{m.pause()}catch(e){}}})}
function frames(){return [].slice.call(document.querySelectorAll('iframe')).map(function(f){try{return f.contentWindow}catch(e){return null}}).filter(Boolean)}
function send(id,skip){var msg={ct:'one-play',id:id};if(parent&&parent!==window&&parent!==skip){try{parent.postMessage(msg,'*')}catch(e){}}frames().forEach(function(w){if(w!==skip){try{w.postMessage(msg,'*')}catch(e){}}})}
document.addEventListener('play',function(e){var t=e.target;if(!t||t.muted)return;hush(t);var id=Date.now()+'-'+Math.random();seen[id]=1;send(id,null)},true);
document.addEventListener('volumechange',function(e){var t=e.target;if(t&&!t.muted&&!t.paused){hush(t);var id=Date.now()+'-'+Math.random();seen[id]=1;send(id,null)}},true);
addEventListener('message',function(e){var d=e.data;if(!d||d.ct!=='one-play'||seen[d.id])return;seen[d.id]=1;hush(null);try{window.dispatchEvent(new CustomEvent('ct-hush'))}catch(_){}send(d.id,e.source)});
})();
