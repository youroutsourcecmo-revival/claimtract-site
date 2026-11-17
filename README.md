# claimtract-site

Static ClaimTract landing page. Serve this folder as the web root of claimtract.app; no build step.

## THE RULE: this repo is the master

The live page is `index.html` on branch `landing`. It is the ONLY master copy.

- Any chat that changes the landing page: pull `landing`, edit `index.html` directly, push `landing`. The site goes live about 5 minutes after the push.
- Do NOT republish from the design canvas. The canvas is retired as the source (set 2026-11-17). Republishing from it would overwrite live work.
- Always pull before editing. Never push over a newer commit. If two chats are working, the second one waits.
- Keep: the three section videos (assets/vid-hero.mp4, vid-pa.mp4, vid-ca.mp4), the Lexi chat widget, ct-seats.js and ct-track.js.
- Hidden on purpose, kept in code: Authority Engine, Answer Library (section 6), Founder's Plan (first 40).
- One background black everywhere: #0A0B0D. Curiosity Drawers sit at the bottom of a section, never the top.
- Commit message says what changed in plain words.
