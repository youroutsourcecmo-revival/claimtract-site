/* ClaimTract landing tracking → POST https://claimtract.app/t  (no secrets here) */
(function () {
  var U = 'https://claimtract.app/t', K = 'ct_lead', lead = {};
  try { lead = JSON.parse(localStorage.getItem(K) || '{}') || {}; } catch (e) { lead = {}; }
  try {
    var q = new URLSearchParams(location.search), got = false;
    ['lid', 'fn', 'ln', 'lic', 'city'].forEach(function (k) { var v = q.get(k); if (v) { lead[k] = String(v).slice(0, 80); got = true; } });
    if (got) { try { localStorage.setItem(K, JSON.stringify(lead)); } catch (e) {} }
  } catch (e) {}
  var sent = {};
  function send(ev, step, once) {
    if (!lead.lid) return;
    var key = ev + ':' + (step == null ? '' : step);
    if (once !== false && sent[key]) return; sent[key] = 1;
    var b = { lid: lead.lid, ev: ev, ts: Date.now() };
    ['fn', 'ln', 'lic', 'city'].forEach(function (k) { if (lead[k]) b[k] = lead[k]; });
    if (step != null) b.step = step;
    var s = JSON.stringify(b);
    try { if (navigator.sendBeacon && navigator.sendBeacon(U, new Blob([s], { type: 'text/plain' }))) return; } catch (e) {}
    try { fetch(U, { method: 'POST', body: s, keepalive: true, mode: 'no-cors', headers: { 'Content-Type': 'text/plain' } }); } catch (e) {}
  }
  window.__ctT = function (ev, step) { send(ev, step); };
  send('visit');
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target : null; if (!t) return;
    var a = t.closest('a[href*="buy.stripe.com"]');
    if (a) {
      send('start_click', null, false);
      if (lead.lid) { try { var u = new URL(a.href); u.searchParams.set('client_reference_id', lead.lid); a.href = u.toString(); } catch (er) {} }
      return;
    }
    var b = t.closest('button, a');
    if (b && /^\s*Skip\b/.test(b.textContent || '')) send('video_skip', null, false);
  }, true);
  document.addEventListener('toggle', function (e) {
    var d = e.target; if (d && d.tagName === 'DETAILS' && d.open) { var sm = d.querySelector('summary'); send('faq_open', sm ? (sm.textContent || '').trim().slice(0, 60) : null); }
  }, true);
  try {
    var mo = new MutationObserver(function () { if (document.querySelector('.hubm')) send('demo_open'); });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {}
})();
