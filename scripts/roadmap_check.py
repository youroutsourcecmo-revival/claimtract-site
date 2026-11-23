"""Roadmap self-update. Runs on every push.
A feature is marked Built when any site file contains data-built="<roadmap id>",
and In progress when one contains data-wip="<roadmap id>". Nobody edits statuses by hand."""
import json, os, re, datetime
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RM = os.path.join(ROOT, 'assets', 'roadmap.json')
built, wip = set(), set()
for d, _, fs in os.walk(ROOT):
    if '/.git' in d or '/node_modules' in d:
        continue
    for f in fs:
        if not f.endswith(('.html', '.js')):
            continue
        try:
            t = open(os.path.join(d, f), encoding='utf-8', errors='ignore').read()
        except Exception:
            continue
        built |= set(re.findall(r'data-built="([a-z0-9-]+)"', t))
        wip |= set(re.findall(r'data-wip="([a-z0-9-]+)"', t))
j = json.load(open(RM, encoding='utf-8'))
today = datetime.date.today().isoformat()
changed = False
for it in j['items']:
    new = 'deployed' if it['id'] in built else 'in_progress' if it['id'] in wip else 'coming'
    if it.get('status') != new:
        it['status'] = new
        if new == 'deployed':
            it['deployed_on'] = today
        changed = True
if changed:
    j['updated'] = today
    json.dump(j, open(RM, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
print('changed' if changed else 'no change', sorted(built), sorted(wip))
