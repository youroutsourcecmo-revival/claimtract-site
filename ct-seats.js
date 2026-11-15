/* Founder seats: live count on the landing page, and the switch to the $299 link after seat 40. No secrets, no personal data. */
(function () {
  var STD = 'https://buy.stripe.com/3cIbIUeMufVKguN3HZ5EY01';
  var st = null;
  function apply() {
    if (!st) return;
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
