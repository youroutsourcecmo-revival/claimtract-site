"""Builds the legal pages from legal/*.md. Edit the .md, run this, push."""
import re, html, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = [('terms','Terms of Use'),('privacy','Privacy Policy'),('data-processing','Data Processing Addendum'),('content-distribution','Content Distribution Authorization'),('keep-alive','Keep-Alive Service')]
CSS='body{margin:0;background:#0A0B0D;color:#F4F4F5;font:16px/1.65 Inter,sans-serif}.w{max-width:760px;margin:0 auto;padding:40px 22px 90px}h1{font-size:34px;margin:0 0 6px;letter-spacing:-.01em;line-height:1.15}h2{font-size:20px;margin:34px 0 8px;color:#F5A524}h3{font-size:16px;margin:22px 0 6px;color:#F4F4F5}p,li{color:#B8BCC4;margin:0 0 10px}ul,ol{padding-left:22px;margin:0 0 12px}a{color:#F5A524}strong{color:#F4F4F5}.nav{display:flex;flex-wrap:wrap;gap:14px;font-size:14px;margin:0 0 26px}.nav a{text-decoration:none}'
def inline(t):
    t=html.escape(t,quote=False)
    t=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',t)
    t=re.sub(r'(Ezekiel@blogscoreboard\.com)',r'<a href="mailto:\1">\1</a>',t)
    t=re.sub(r'(https://claimtract\.app)\b',r'<a href="\1">\1</a>',t)
    return t
def title(s):
    s=s.title().replace('Claimtract','ClaimTract')
    for w in [' Of ',' And ',' The ']: s=s.replace(w,w.lower())
    return s
def conv(md,slug,name):
    out=[];lst=None;para=[]
    def flush():
        nonlocal para
        if para: out.append('<p>'+'<br>'.join(para)+'</p>'); para=[]
    def endl():
        nonlocal lst
        if lst: out.append('</%s>'%lst); lst=None
    for l in md.split('\n'):
        l=l.rstrip(); m=re.match(r'^(#{1,3}) (.*)',l)
        if m:
            flush(); endl(); n=len(m.group(1)); tx=m.group(2)
            out.append('<h%d>%s</h%d>'%(n,inline(title(tx) if n==1 else tx),n)); continue
        a=re.match(r'^- (.*)',l); b=re.match(r'^\d+\. (.*)',l)
        if a or b:
            flush(); t='ul' if a else 'ol'
            if lst!=t: endl(); out.append('<%s>'%t); lst=t
            out.append('<li>'+inline((a or b).group(1))+'</li>'); continue
        if not l.strip(): flush(); endl(); continue
        endl(); para.append(inline(l.strip()))
    flush(); endl()
    nav='<div class="nav">'+''.join('<a href="/%s/"%s>%s</a>'%(s,' style="color:#fff"' if s==slug else '',n) for s,n in DOCS)+'</div>'
    return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">\n<title>%s | ClaimTract</title><meta name="robots" content="noindex,nofollow">\n<link rel="icon" href="/favicon.ico" sizes="any">\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">\n<style>%s</style></head>\n<body><div class="w">\n%s\n%s\n</div></body></html>\n'%(name,CSS,nav,'\n'.join(out))
for slug,name in DOCS:
    md=open(os.path.join(ROOT,'legal',slug+'.md')).read()
    os.makedirs(os.path.join(ROOT,slug),exist_ok=True)
    open(os.path.join(ROOT,slug,'index.html'),'w').write(conv(md,slug,name))
    print(slug,'ok')
