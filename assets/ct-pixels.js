/* CT-PIXELS: Google tag (GA4 + Google Ads), Meta Pixel, Microsoft Clarity. Free. Ezekiel, Nov 26.
   Fill an ID below to switch that pixel on; blank = off. Never runs inside the Back office or on ?ctowner=1 browsers. */
(function(){
var ID={
ga4:'G-6L59QG1S8T',      /* Google Analytics 4, e.g. G-XXXXXXXXXX */
 gads:'',       /* Google Ads, e.g. AW-XXXXXXXXXX (for PPC conversions later) */
 meta:'',       /* Meta (Facebook) Pixel, numbers only */
 clarity:''     /* Microsoft Clarity project id */
};
var P=location.pathname,Q=new URLSearchParams(location.search);
if(/^\/free\/app/.test(P))return;
try{if(localStorage.getItem('ct_owner')==='1')return}catch(e){}
function js(src){var s=document.createElement('script');s.async=true;s.src=src;document.head.appendChild(s);return s}
if(ID.ga4||ID.gads){window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());
 js('https://www.googletagmanager.com/gtag/js?id='+(ID.ga4||ID.gads));if(ID.ga4)gtag('config',ID.ga4);if(ID.gads)gtag('config',ID.gads)}
if(ID.meta){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
 fbq('init',ID.meta);fbq('track','PageView')}
if(ID.clarity){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script',ID.clarity)}
/* conversions the ad platforms can learn from */
document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a,button');if(!a)return;var h=a.getAttribute('href')||'',x=(a.innerText||'').trim();
 if(/buy\.stripe\.com/.test(h)){if(window.gtag)gtag('event','begin_checkout');if(window.fbq)fbq('track','InitiateCheckout')}
 else if(/\/free\/build/.test(h)||a.hasAttribute('data-cta')){if(window.gtag)gtag('event','generate_lead',{label:x.slice(0,40)});if(window.fbq)fbq('track','Lead')}},true);
})();
