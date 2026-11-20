/* ClaimTract: "can we notify you?" check.
   Shows two live steps: (1) app saved to the home screen, (2) notifications on.
   Mount with <div data-ct-ready></div>. Re-checks every 2s and when the app comes back to the foreground.
   Status is exposed as window.ctReadyStatus = {installed, notify} for the server to record (see Atlas note 1200). */
(function(){
if(window.__ctReady)return;window.__ctReady=1;
function installed(){try{return (window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true}catch(e){return false}}
function notifyOn(){return 'Notification' in window&&Notification.permission==='granted'}
function ios(){return /iphone|ipad|ipod/i.test(navigator.userAgent)}
function css(){if(document.getElementById('ctrCss'))return;var s=document.createElement('style');s.id='ctrCss';s.textContent=
'.ctr{border:1px solid #E1E1DC;border-radius:16px;background:#fff;padding:16px;margin:16px 0;font-family:Inter,system-ui,sans-serif;color:#111}'+
'.ctr.warn{border-color:#F5A524;background:#FFF8EA}'+
'.ctr h4{margin:0 0 4px;font-size:16px}.ctr .why{margin:0 0 12px;font-size:13.5px;color:#55585F;line-height:1.5}'+
'.ctr .st{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-top:1px solid #EEE}'+
'.ctr .ck{flex:none;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font:800 14px Inter,sans-serif;background:#F5A524;color:#111}'+
'.ctr .ok .ck{background:#1E9E5A;color:#fff}'+
'.ctr .st b{display:block;font-size:14.5px}.ctr .st span{display:block;font-size:13px;color:#55585F;line-height:1.45;margin-top:2px}'+
'.ctr .st button{margin-top:8px;border:0;border-radius:10px;background:#111;color:#fff;font:700 13px Inter,sans-serif;padding:9px 14px;cursor:pointer}';
document.head.appendChild(s)}
function draw(el){var a=installed(),n=notifyOn(),both=a&&n;window.ctReadyStatus={installed:a,notify:n};
 el.className='ctr'+(both?'':' warn');
 var s1=a?'Saved. You opened this from your home screen.':(ios()?'Tap Share at the bottom of Safari, then Add to Home Screen. Open it from there.':'Tap the menu (three dots), then Install app or Add to Home screen. Open it from there.');
 var s2;if(n)s2='On. You will get a notice the moment your page is live.';
 else if(!('Notification' in window))s2=ios()&&!a?'Do step 1 first. On iPhone, notifications only work from the app on your home screen.':'This browser cannot show notifications. Open your page from your home screen app.';
 else if(Notification.permission==='denied')s2='Notifications are blocked. Turn them on in your phone settings for this app.';
 else s2='Tap the button and choose Allow.';
 el.innerHTML='<h4>'+(both?'You are all set.':'Two steps so we can notify you')+'</h4>'+
  '<p class="why">'+(both?'We will notify you here the moment your page is live.':'Until both are done, we cannot tell you when your page goes live.')+'</p>'+
  '<div class="st'+(a?' ok':'')+'"><i class="ck">'+(a?'&#10003;':'1')+'</i><div><b>Save the app to your home screen</b><span>'+s1+'</span></div></div>'+
  '<div class="st'+(n?' ok':'')+'"><i class="ck">'+(n?'&#10003;':'2')+'</i><div><b>Turn on notifications</b><span>'+s2+'</span>'+
  (!n&&'Notification' in window&&Notification.permission==='default'?'<button type="button" data-ctr-on>Turn on notifications</button>':'')+'</div></div>'}
function all(){document.querySelectorAll('[data-ct-ready]').forEach(draw)}
document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-ctr-on]')){try{var p=Notification.requestPermission(all);if(p&&p.then)p.then(all)}catch(x){all()}}});
document.addEventListener('visibilitychange',function(){if(!document.hidden)all()});
function start(){css();all();setInterval(all,2000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.ctReady=all;
})();
