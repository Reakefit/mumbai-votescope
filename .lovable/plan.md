
# MumbAI-Vote: Comparative Intelligence Dashboard — Build Plan

A dark-themed, Bloomberg/Axios-inspired election intelligence dashboard comparing 2024 Lok Sabha vs Vidhan Sabha results across Mumbai's 6 Parliamentary and 36 Assembly Constituencies.

## Stack adjustments (vs PRD)

The PRD asks for Next.js App Router. The Lovable web app template uses **Vite + React + Tailwind + shadcn/ui**, which delivers the same UX and ships faster on this platform. I'll keep every other choice from the PRD:

- React 18 + Vite, Tailwind, shadcn/ui, lucide-react, Framer Motion
- **Recharts** for all charts (bars, scatter, sankey-style flow)
- **react-simple-maps + custom inline SVG** for the Mumbai choropleth (no Mapbox token needed; fully offline mock)
- URL search-param state (via `react-router-dom`) to sync region/metric filters across views
- Pure mock dataset — no backend / Lovable Cloud needed

If you specifically want Next.js App Router, say the word and I'll scaffold differently — but it isn't required for any feature in the PRD.

## Information architecture

```text
┌─ TopBar ────────────────────────────────────────────────┐
│  MumbAI-Vote · [Region ▾]  [Metric ▾]   nav tabs →     │
├─ Sidebar (md+) / Tabs (sm) ─────────────────────────────┤
│  1. Macro Storyline                                     │
│  2. Comparative Mapping                                 │
│  3. Swing Engine                                        │
│  4. Turnout Dynamics                                    │
└─────────────────────────────────────────────────────────┘
```

Global filter state lives in URL params (`?pc=mumbai-south&metric=margin`) so deep links work and every view stays synced.

## Views

**1. Macro Storyline**
- Two big scorecards: LS 2024 seats (MVA vs Mahayuti) and VS 2024 seats — animated counters
- Alliance flow visual: layered stacked bars representing voter migration LS → VS (Recharts; a true Sankey is overkill for 2 alliances and reads worse)
- Anomaly Alert feed: top 5 ACs by absolute swing, with delta chips and party logos

**2. Comparative Mapping**
- Two side-by-side SVG choropleths of Mumbai's 36 ACs, color-coded by winning alliance
- Synchronized hover: hovering an AC highlights it on both maps + shows tooltip (candidate, party, votes, margin, swing %)
- Click → slide-out `Sheet` with the full AC report (both cycles, all metrics, mini bars)

**3. Swing Engine**
- Grouped bar chart: 36 ACs on X-axis, Mahayuti vs MVA margin on Y, with cycle toggle
- Party-Wise Dilution scatter: x = LS vote share, y = VS vote share, colored by faction (SS-UBT vs SHS, NCP-SP vs NCP), bubble size = margin

**4. Turnout Dynamics**
- Heatmap matrix: 36 ACs × {LS turnout, VS turnout, delta}, colored cells
- Four-quadrant scatter (turnout vs margin) with labeled quadrants: Fortresses, Apathy, Battlegrounds, Silent Consolidation

## Mock data

Single source of truth: `src/data/constituencies.ts` — 36 AC records matching the PRD JSON schema exactly, with realistic values that:
- Reproduce the known macro pattern (MVA stronger in LS, Mahayuti sweep in VS)
- Include several split-ticket ACs to make the anomaly feed and swing chart meaningful
- Realistic turnout (48–62%) and margins (1k–25k votes)

PC → AC mapping is hardcoded per the PRD matrix. Mumbai geometry uses a simplified hand-authored SVG polygon set for the 36 ACs (good enough for a choropleth; no external geojson dependency).

## File structure

```text
src/
  data/
    constituencies.ts      // 36 AC records + PC mapping + alliance/party metadata
    mumbai-geo.ts          // simplified SVG paths per AC
  context/
    FiltersProvider.tsx    // URL-synced filters
  components/
    layout/{TopBar,Sidebar,Shell}.tsx
    common/{Scorecard,DeltaChip,AllianceBadge}.tsx
    map/{ChoroplethMap,ACDetailSheet}.tsx
    charts/{FlowBars,AnomalyFeed,MarginBars,DilutionScatter,TurnoutHeatmap,QuadrantScatter}.tsx
  pages/
    MacroStoryline.tsx
    ComparativeMapping.tsx
    SwingEngine.tsx
    TurnoutDynamics.tsx
  lib/{metrics.ts,colors.ts}
  index.css                // dark theme tokens (Bloomberg-ish: near-black bg, MVA orange, Mahayuti saffron, neutral grays, electric accent)
```

## Design system

- Dark base (`hsl(220 15% 6%)`), elevated panels, hairline borders
- Alliance colors: Mahayuti = saffron `hsl(28 95% 55%)`, MVA = green `hsl(150 65% 45%)`, with party sub-shades
- Typography: Inter for UI, JetBrains Mono for numbers
- Framer Motion for view transitions and scorecard counters
- All charts inherit theme tokens — no hardcoded hex outside `colors.ts`

## Out of scope (call out)

- Real geojson of Mumbai ACs (using stylized polygons instead — looks clean, no licensing)
- Real election results (mock data only, clearly labeled)
- Auth / persistence / sharing — none needed

Approve and I'll build it end-to-end.
