## Goal

Address the analyst review point-by-point. The dataset's core weakness is that May (Lok Sabha) results on each Assembly tile currently repeat the parent PC winner. The fix has two tracks: (1) get real AC-segment-level Lok Sabha data if available; (2) where it's not, honestly downgrade the language and visuals so the site never claims more than the data supports.

## Step 1 — Try to get real AC-segment Lok Sabha data

Search ECI Form 20 and reliable secondary sources (IndiaVotes, TCPD, news outlets) for AC-segment-level Lok Sabha 2024 leads in Mumbai's 36 ACs. Two possible outcomes:

- **Found, complete (or mostly):** add an `ls_segment` block per AC with alliance + winner share. Real split-ticket becomes provable.
- **Not found / partial:** keep the PC fallback, but every AC-level May claim downgrades to "parent PC won by …", and the divergence metric is renamed.

Either way, every AC gets a `ls_source` tag: `"ac_segment"` (Form 20) or `"pc_parent"` (fallback). The UI shows this tag inline next to May figures.

## Step 2 — Fix the foundation in data + labels

- **Rename "split-ticket" → "PC-to-AC alliance divergence"** everywhere it refers to PC-parent fallback rows. Real split-ticket label is reserved for rows backed by AC-segment Form 20 data.
- **Rename "vote-share swing" → "winner-share difference"**, with a tooltip explaining it compares two different winners, not a true swing.
- **Recount divergence numbers from a single source of truth.** Replace every hard-coded "18 / 14 / 4 / 15 / 3" string with values computed live from the dataset. Fixes the 14/4 vs 15/3 inconsistency permanently.
- **Turnout label:** AC-level VS turnout is a district proxy. Add a visible "district proxy" pill on every chart and table cell that uses it, not just methodology.

## Step 3 — Add confidence + limitations UI

- New `ConfidenceTag` component with three levels: **High** (seat outcome), **Medium** (alliance divergence), **Low** (voter motivation). Tag every claim block.
- New `LimitationsBox` pinned at the top of the home page and analysis page — short, plain-language list of the 3 main caveats (PC-parent fallback, district turnout proxy, demographic estimates).
- Remove the word "clean" from "clean natural experiment." Reframe as "useful comparison, not a controlled experiment."

## Step 4 — Rival explanations + battleground classification

- New section **"Rival explanations"** on the analysis page: welfare schemes (Ladki Bahin), BJP/RSS ground machine, candidate quality, MVA seat-sharing friction, MNS/AIMIM/independent splits, anti-incumbency. Each tagged with which the data supports vs which remains untested.
- New section **"Battleground classification"**: each of the 36 ACs sorted into Mahayuti stronghold / MVA stronghold / divergent / candidate-personality / high-uncertainty. Computed from margin + divergence + (when available) segment data.

## Step 5 — Causal language pass

Soft-rewrite copy across `narratives.ts`, `policy-analysis.ts`, `case-study.ts`, dossiers: replace "shows / proves / strong evidence of" with "consistent with / suggests / may indicate" wherever the underlying data is aggregate-only. Community claims get explicit source + uncertainty notes; demographic charts move to an "Exploratory, not evidentiary" appendix.

## Step 6 — Implications ("so what")

Short closing block per page: what this means for BMC, which ACs are real swing zones, which are candidate-dependent, which are structurally safe. Driven from the battleground classification so it stays consistent.

## Technical details

- **New files:**
  - `src/data/ls-segments.ts` — AC-segment LS results when sourced; `ls_source` tagging helper.
  - `src/data/battleground.ts` — classifier + categories.
  - `src/components/common/confidence-tag.tsx`, `limitations-box.tsx`, `proxy-pill.tsx`.
  - `src/lib/divergence.ts` — single source of truth for divergence counts (replaces hard-coded numbers).
- **Edited files:** `constituencies.ts`, `pc-results.ts`, `metrics.ts`, `narratives.ts`, `policy-analysis.ts`, `case-study.ts`, `sources.ts`, `methodology.tsx`, `analysis.tsx`, `index.tsx`, `split-ticket-card.tsx`, dossier + electoral-charts components, map detail sheet.
- **Data sourcing:** Firecrawl + targeted web searches for ECI Form 20 / IndiaVotes AC-segment tables. If full coverage isn't achievable in this pass, ship the rename + downgrade + confidence work and leave `ls-segments.ts` partially populated with a clear gap list.

## Out of scope (per user)

The further analyst-side changes the user wants to propose next — handled in the following turn.
