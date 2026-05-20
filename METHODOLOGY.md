# Methodology

## Scope

Mumbai metropolitan election districts only:

- 6 Lok Sabha (parliamentary) constituencies
- 36 Vidhan Sabha (assembly) constituencies nested within those PCs

Elections compared:

| Election | When | Level |
|----------|------|--------|
| Lok Sabha 2024 | April–June 2024 | Parliament (6 MPs) |
| Vidhan Sabha 2024 | November 2024 | State Assembly (36 MLAs) |

## Data sources

Primary:

- [ECI Lok Sabha results – Maharashtra](https://results.eci.gov.in/PcResultGenJune2024/partywise-S11.htm)
- [ECI Vidhan Sabha results – Maharashtra](https://results.eci.gov.in/AcResultGenNov2024/partywise-S13.htm)
- [IndiaVotes Lok Sabha – Maharashtra](https://www.indiavotes.com/lok-sabha/2024/maharashtra/18/30)
- [IndiaVotes Vidhan Sabha – Maharashtra](https://www.indiavotes.com/vidhan-sabha/2024/maharashtra/300/30)

Structured fields per result: winning party/alliance, candidate name, vote share %, victory margin (votes), turnout %.

Implementation: `src/data/constituencies.ts`, `src/data/pc-results.ts`.

## Lok Sabha displayed on assembly tiles

Each assembly constituency (AC) stores `lok_sabha_2024` fields copied from its **parent parliamentary seat**. All six ACs in Mumbai South, for example, show Arvind Sawant’s LS result for map colouring.

This is intentional for comparing “May parliamentary mood” vs “November assembly outcome” at ward scale. It is **not** an AC-level parliamentary count.

## Vidhan Sabha (assembly) data

Each of the 36 ACs has its own `vidhan_sabha_2024` result from constituency-level returns.

## Turnout proxy

Where AC-level turnout was not normalised in the build, district averages are used:

- Mumbai City district: 52.65%
- Mumbai Suburban district: 56.39%

Documented in `src/data/sources.ts`. Rankings across ACs within a district should be read cautiously.

## Alliance mapping

| Party code | Alliance (2024 framing) |
|------------|-------------------------|
| BJP, SHS, NCP | Mahayuti |
| INC, SS(UBT), NCP(SP) | MVA |

## Derived metrics

### Split-ticket (`splitTicketACs`)

True when:

`lsAllianceForAC(pc_slug) !== vidhan_sabha_2024.winning_alliance`

Uses PC-level May alliance vs AC-level November winner. City total: **18 / 36** (15 MVA→Mahayuti, 3 Mahayuti→MVA).

### Vote-share swing (`vote_share_swing_pct`)

`vidhan_sabha_2024.vote_share_pct - lok_sabha_2024.vote_share_pct` on the same AC tile.

Measures change in the **winning side’s reported share** between elections, not a standard two-party swing.

### Turnout delta (`turnout_delta_pct`)

November turnout minus May turnout (proxy values).

## Demographics

`src/data/demographics.ts` provides illustrative income tier, density, geographic zone, and estimated Muslim population share for exploratory charts. **Not** official census tract data.

## Narrative analysis

The Analysis page (`/analysis`) combines:

1. Verified counts from the dataset
2. Interpretation from news and campaign reporting (cited inline)

Interpretation is not inferred from ballot-level microdata in this version.

## Validation checks

- 36 AC records with unique `ac_number`
- 6 PC results in `pc-results.ts`
- LS seat rollup: MVA 4, Mahayuti 2
- VS seat rollup: Mahayuti 22, MVA 14 (per dataset party/alliance assignment)

## Version

Dataset and copy aligned to ECI / IndiaVotes public results as of project build. Recount-sensitive seats (e.g. Mumbai North West, 48 votes) use published final figures.
