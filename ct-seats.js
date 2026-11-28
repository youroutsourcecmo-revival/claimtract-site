/* Founder seats: live count on the landing page, and the switch to the $299 link after seat 40. No secrets, no personal data. */
(function () {
  var STD = 'https://buy.stripe.com/3cIbIUeMufVKguN3HZ5EY01';
  var st = null;
  function full() {
    window.CT_FULL = true;
    var d = document.documentElement;
    if (!d.classList.contains('ct-full')) {
      d.classList.add('ct-full');
      var cs = document.createElement('style');
      cs.textContent = '.ct-full .pc.ft,.ct-full .rgn{display:none!important}';
      document.head.appendChild(cs);
    }
    var R = [
      [/When you're ready for more, 40 Florida adjusters can join the Founders Lab: everything we build, \$99 a month for life\./, "When you're ready for more, try ClaimTract Pro 14 days for $1, then $299 a month."],
      [/Included while Florida Founder spots last/, 'Included with ClaimTract Pro'],
      [/included in your founder seat/, 'included with ClaimTract Pro'],
      [/Once the 40 Founders Lab seats are taken, these are the prices for everyone else\./, 'ClaimTract Pro pricing.']
    ];
    var set = function (id, v) { var e = document.getElementById(id); if (e && e.textContent !== v) e.textContent = v; };
    if (document.getElementById('co-cost') && /99/.test(document.getElementById('co-cost').textContent)) { set('co-cost', '$1 for 14 days'); set('co-cost-n', 'Then ClaimTract Pro is $299 a month.'); }
    if (document.getElementById('cb-cost') && /99/.test(document.getElementById('cb-cost').textContent) && !/299/.test(document.getElementById('cb-cost').textContent)) set('cb-cost', '$299/mo');
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) { R.forEach(function (r) { if (r[0].test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(r[0], r[1]); }); }
  }
  function apply() {
    if (!st) return;
    if (!st.open) full();
    var left = Math.max(0, (st.cap || 40) - (st.taken || 0));
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n, hits = [];
    while ((n = walker.nextNode())) { if (/FOUNDING SPOTS · \$99\/MO FOR LIFE/.test(n.nodeValue) || /founding spots left/i.test(n.nodeValue)) hits.push(n); }
    hits.forEach(function (t) {
      var want = st.open ? (left + ' FOUNDING SPOTS LEFT · $99/MO FOR LIFE') : '$1 FOR 14 DAYS · THEN $299/MO';
      var v = t.nodeValue.replace(/\d+ FOUNDING SPOTS( LEFT)? · \$99\/MO FOR LIFE|\$1 FOR 14 DAYS · THEN \$299\/MO/, want);
      if (v !== t.nodeValue) t.nodeValue = v;
    });
  }
  // after seat 40: every Start for $1 goes to the standard link, whatever the page re-renders
  document.addEventListener('click', function (e) {
    if (!st || st.open) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href*="buy.stripe.com"]') : null;
    if (a && a.href.indexOf(STD) !== 0) { var q = ''; try { q = new URL(a.href).search; } catch (x) {} a.href = STD + q; }
  }, true);
  function load() {
    try {
      fetch('/api/founder-seats', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
        if (j && typeof j.open === 'boolean') { st = j; apply(); }
      }).catch(function () {});
    } catch (e) {}
  }
  load(); setInterval(load, 120000);
  try { new MutationObserver(function () { apply(); }).observe(document.documentElement, { childList: true, subtree: true, characterData: true }); } catch (e) {}
})();
