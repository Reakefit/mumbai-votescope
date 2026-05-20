# Hosting Mumbai VoteScope (free)

This app uses **TanStack Start** with **Cloudflare Workers** (already configured in `vite.config.ts` and `wrangler.jsonc`). Cloudflare’s free tier is the best fit: no credit card for basic Pages/Workers, fast global CDN, and it matches how the project is built.

## Option A: Deploy from your computer (fastest)

1. Create a free account at [https://dash.cloudflare.com](https://dash.cloudflare.com).
2. Install dependencies and log in:

   ```bash
   npm install
   npx wrangler login
   ```

3. Build and deploy:

   ```bash
   npm run build
   npm run deploy
   ```

4. Wrangler prints a `*.workers.dev` URL. Open it in a browser.

To use your own subdomain later, add a route in the Cloudflare dashboard under **Workers & Pages** → your worker → **Triggers** → **Custom Domains**.

## Option B: GitHub to automatic deploys (recommended for updates)

1. Push this repo to GitHub (public or private).
2. In Cloudflare: **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repo and use:

   | Setting | Value |
   |--------|--------|
   | Build command | `npm run build` |
   | Build output directory | (leave default; Wrangler plugin handles the worker bundle) |
   | Node version | 20 or 22 |

4. For Pages + Workers with this stack, Cloudflare often detects the Vite + Workers setup. If the UI asks for a **Deploy command**, use:

   ```bash
   npx wrangler deploy
   ```

5. Save. Each push to `main` redeploys the site.

If the dashboard only offers “static site” and build fails, use **Workers** → **Create Worker** → **Import from Git** with the same build/deploy commands, or stick with **Option A** and run `npm run deploy` from CI (see below).

## Option C: GitHub Actions (free CI deploy)

Add a repo secret `CLOUDFLARE_API_TOKEN` (create under Cloudflare → **My Profile** → **API Tokens** → template “Edit Cloudflare Workers”) and `CLOUDFLARE_ACCOUNT_ID` (on the dashboard home page).

Example workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npx wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

## Other free hosts (more setup)

| Host | Notes |
|------|--------|
| **Vercel** | Free tier; may need a TanStack Start adapter and different server target, not pre-wired in this repo. |
| **Netlify** | Similar; SSR/edge config extra work. |
| **GitHub Pages** | Static only; this app expects a server/worker, so not ideal without major changes. |

**Recommendation:** stay on **Cloudflare** for this project.

## Local preview before deploy

```bash
npm run dev          # http://localhost:8080
npm run build
npm run preview      # production-like preview if available
```

## Rename the worker (optional)

Edit `name` in `wrangler.jsonc` (e.g. `"mumbai-votescope"`) before deploy so the default URL is easier to share.
