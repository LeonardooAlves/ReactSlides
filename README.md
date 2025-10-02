# Render React/TSX UI to PDF via GitHub Actions (No local Node/npm)

This repo scaffold lets you **export PDFs of your rendered React/TypeScript (.tsx) pages** entirely in **GitHub Actions**. 
Nothing to install on your university laptop.

## How it works
1. GitHub Actions installs Node in the cloud and **builds your app**.
2. The workflow **starts your app** on `http://localhost:3000` in CI.
3. A Python Playwright script **visits your routes** and **prints PDFs**.
4. PDFs are uploaded as **workflow artifacts** you can download.

## Quick start
1. Copy these files into the **root of your React project** (Next.js, Vite, CRA).
2. Create and edit `routes.json` to list the pages to export.
3. Commit + push to GitHub.
4. Go to **Actions** → **Export Rendered PDFs** run → **Artifacts** → download `rendered-pdfs`.

### Editing `routes.json`
```json
{
  "baseUrl": "http://localhost:3000",
  "outDir": "pdf-exports",
  "viewport": { "width": 1280, "height": 800, "deviceScaleFactor": 2 },
  "waitUntil": "networkidle",
  "waitFor": 500,
  "routes": [
    { "path": "/", "file": "home.pdf", "waitForSelector": "#content-ready" },
    { "path": "/about", "file": "about.pdf" }
  ]
}
```
- `waitForSelector` (optional): wait for some DOM sentinel when the page is fully ready.
- `waitFor` (ms): extra delay after load for animations/fetches.
- `print.css`: optional overrides for @media print (hide nav, add page breaks).

### Authentication (optional)
If your pages require auth, you can set these Action **secrets**:
- `AUTH_COOKIE_NAME`, `AUTH_COOKIE_VALUE` **or** `AUTH_BEARER_TOKEN`

Go to **Repo Settings → Secrets and variables → Actions → New repository secret**.

## Notes
- Workflow auto-detects **Next.js / Vite / CRA** and starts whichever it finds.
- If your app uses a **custom port**, update the workflow (`APP_PORT`) and `routes.json` `baseUrl`.
- For **static exports** (Next.js `next export` or Vite static), you can serve the `out`/`dist` folder with `npx serve -s`.

(c) Prepared by ChatGPT
