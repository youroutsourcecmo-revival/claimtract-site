# claimtract-site

The ClaimTract sales landing page, ready to serve as-is.

## Deploy (Atlas)
Serve this folder as the web root of https://claimtract.app:
- `index.html` — the landing page (must be the page at `/`)
- `support.js`, `vendor/` — runtime the page needs (keep beside index.html)
- `assets/` — images and videos (keep beside index.html)

It is a static site: no build step. Replace the old landing page completely.

## Personal links (Instantly)
`https://claimtract.app/?fn={{firstName}}&ln={{lastName}}&lic={{license}}&city={{city}}`
Optional: `ph` (phone), `co` (company). Anything missing falls back to "John Q. Adjuster".
