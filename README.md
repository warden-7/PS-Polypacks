# PS Polypack website

Static site: no build step.

Run locally (needed so everything loads correctly):
    python3 -m http.server 8000   # then open http://localhost:8000

Files
- index.html   page shell, metadata, fonts
- styles.css   design tokens (:root) and all styles
- app.js       editable content (SITE, PRODUCTS, CAPS, INDUSTRIES, IMG) at the top, then views and router
- images/brand/          logo-mark.png, logo-lockup.png
- images/products/       put product photos here, then set `image` in PRODUCTS (e.g. "images/products/jar.jpg")
- images/manufacturing/  factory photos (wire into IMG in app.js)

Enquiry form: not connected. Set SITE.formEndpoint in app.js to a submission service URL.
Hosting: any static host (Netlify, Vercel, GitHub Pages, cPanel). Routes use #/ hashes, so no server config is needed.
