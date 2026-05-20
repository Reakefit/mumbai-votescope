const DATA_SOURCES = {
  lokSabha2024: {
    urls: [
      "https://results.eci.gov.in/PcResultGenJune2024/partywise-S11.htm",
      "https://www.indiavotes.com/lok-sabha/2024/maharashtra/18/30"
    ],
    note: "Six Mumbai PCs: winner, vote share, margin, and turnout from ECI Form 20 and IndiaVotes, cross-checked with media tallies."
  },
  vidhanSabha2024: {
    urls: [
      "https://results.eci.gov.in/AcResultGenNov2024/partywise-S13.htm",
      "https://www.indiavotes.com/vidhan-sabha/2024/maharashtra/300/30"
    ],
    note: "All 36 Mumbai ACs: winner, vote share, margin. Turnout uses district averages (Mumbai City 52.65%, Suburban 56.39%) as AC proxy."
  }
};
const ELECTION_TIMELINE = {
  lokSabha: { period: "April to June 2024" },
  vidhanSabha: { period: "November 2024" }
};
export {
  DATA_SOURCES as D,
  ELECTION_TIMELINE as E
};
