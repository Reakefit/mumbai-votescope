/** Data provenance for election figures shown in the app. */
export const DATA_SOURCES = {
  lokSabha2024: {
    label: "Lok Sabha 2024 · Maharashtra",
    urls: [
      "https://results.eci.gov.in/PcResultGenJune2024/partywise-S11.htm",
      "https://www.indiavotes.com/lok-sabha/2024/maharashtra/18/30",
    ],
    note: "Six Mumbai PCs: winner, vote share, margin, and turnout from ECI Form 20 and IndiaVotes, cross-checked with media tallies.",
  },
  vidhanSabha2024: {
    label: "Vidhan Sabha 2024 · Maharashtra",
    urls: [
      "https://results.eci.gov.in/AcResultGenNov2024/partywise-S13.htm",
      "https://www.indiavotes.com/vidhan-sabha/2024/maharashtra/300/30",
    ],
    note: "All 36 Mumbai ACs: winner, vote share, margin. Turnout uses district averages (Mumbai City 52.65%, Suburban 56.39%) as an AC-level proxy — not a per-AC participation rate.",
  },
  form20PartII: {
    label: "AC-segment LS leads (Form 20 Part II)",
    urls: [
      "https://ceoelection.maharashtra.gov.in/ceo/Form20-Part-II.aspx",
    ],
    note: "Authoritative AC-segment-level Lok Sabha tallies are in CEO Maharashtra's Form 20 Part II PDFs. Not yet integrated into the app — May figures on each AC tile currently repeat the parent PC winner.",
  },
} as const;

export const ELECTION_TIMELINE = {
  lokSabha: { label: "Lok Sabha 2024", period: "April to June 2024", level: "Parliament · 6 PCs" },
  vidhanSabha: { label: "Vidhan Sabha 2024", period: "November 2024", level: "State Assembly · 36 ACs" },
} as const;
