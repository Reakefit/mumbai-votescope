# Mumbai VoteScope

Interactive political intelligence dashboard comparing **Mumbai's 2024 Lok Sabha (May)** and **Vidhan Sabha (November)** elections.

- **6** parliamentary constituencies (Lok Sabha)
- **36** assembly constituencies (Vidhan Sabha)
- Split-ticket analysis, vote-share swings, turnout, and policy-style narrative

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Overview: map, story sections, key takeaways |
| `/mapping` | Side-by-side May / November maps |
| `/swing` | Margins, share shift, May vs Nov scatter |
| `/turnout` | Turnout heatmap and quadrants |
| `/analysis` | In-depth policy analysis + evidence charts |
| `/methodology` | Data definitions and limits |
| `/insights` | Redirects to `/analysis` |

## Deliverables (assignment)

| Deliverable | Location |
|-------------|----------|
| Interactive dashboard | This app (`npm run dev` / deploy) |
| Structured dataset | `src/data/constituencies.ts`, `pc-results.ts` |
| Methodology | `METHODOLOGY.md`, `/methodology` |
| Key insights (2–4 pages) | `docs/KEY_INSIGHTS.md` |
| Deploy guide | `DEPLOY.md` (free Cloudflare hosting) |

## Data

Official results cross-checked with ECI and IndiaVotes. See `src/data/sources.ts` and `METHODOLOGY.md` for proxies (assembly turnout, LS colouring on AC tiles).

## Deploy

```bash
npm run build
npm run deploy
```

See [DEPLOY.md](DEPLOY.md) for Cloudflare Workers / GitHub setup.

## Stack

Vite 7, TanStack Start, React 19, Tailwind, Recharts, Cloudflare Workers.
