import { k as createLucideIcon, n as lsAllianceForAC } from "./shell-Bg1mD7Ab.js";
import { K as jsxRuntimeExports } from "./server-BQFeF0xS.js";
import { A as ALLIANCE_COLOR } from "./election-colors-D5q5oaPB.js";
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
function avg(nums) {
  return nums.reduce((s, x) => s + x, 0) / (nums.length || 1);
}
function isSplitTicket(ac) {
  return lsAllianceForAC(ac.pc_slug) !== ac.vidhan_sabha_2024.winning_alliance;
}
function splitTicketACs(acs) {
  return acs.filter(isSplitTicket);
}
const ALLIANCES = [
  {
    short: "Mahayuti",
    full: "Ruling alliance",
    members: "BJP, Shiv Sena (Shinde), NCP (Ajit Pawar). Backed the state government after November 2024."
  },
  {
    short: "MVA",
    full: "Opposition alliance (Maha Vikas Aghadi)",
    members: "Shiv Sena (Uddhav Thackeray), Congress, NCP (Sharad Pawar), and allies. Strong in May's parliamentary election in Mumbai."
  }
];
const BRIEF_INTRO = {
  title: "How Mumbai voted in 2024: Parliament and State Assembly",
  elections: {
    parliament: { name: "Lok Sabha (Parliament)", when: "April to June 2024" },
    assembly: { name: "Vidhan Sabha (State)", when: "November 2024" }
  }
};
const ALLIANCE_LABELS = {
  MVA: "MVA",
  Mahayuti: "Mahayuti"
};
const ELECTION_LABELS = {
  ls: { full: "Lok Sabha · May 2024" },
  vs: { full: "Vidhan Sabha · Nov 2024" }
};
const FINAL_TAKEAWAYS = [
  {
    title: "Parliament and assembly results diverged",
    what: "In May, MVA won 4 of 6 Mumbai MP seats. In November, Mahayuti won 22 of 36 MLA seats. In 18 assembly areas the winning alliance in May (by parliamentary seat) did not match November's assembly winner.",
    why: "The counts show two different outcomes six months apart, not one city-wide swing. Reporting on the Sena and NCP splits, and sympathy for Uddhav Thackeray, fits the strong MVA showing in May. For November, many journalists and campaigners pointed to local MLAs, ward networks, and civic issues as bigger factors than the national line alone. We cannot read individual voters' minds from results alone, but the seat pattern fits a split between a parliamentary choice and a state-level one.",
    sources: [
      { label: "The Hindu · May results", url: "https://www.thehindu.com/elections/lok-sabha/maharashtra-election-results-2024-mva-turnaround-gives-jolt-to-bjp-shinde-led-mahayuti/article68251750.ece" },
      { label: "Indian Express · November results", url: "https://indianexpress.com/article/cities/mumbai/maharashtra-mahayuti-sweeps-mumbai-as-it-bags-22-out-of-36-seats-9686701/" }
    ]
  },
  {
    title: "18 areas changed winning alliance between the two polls",
    what: "18 of 36 areas had one alliance ahead in May's parliamentary mapping and another in November's assembly result. 15 moved from MVA (May) to Mahayuti (November); 3 went the other way.",
    why: "Mid-day and other outlets noted that Mahayuti's Lok Sabha vote share in Mumbai was largely intact after November, while MVA's assembly tally fell sharply. That pattern suggests many voters did not simply drop one party city-wide; they distributed votes differently across the two ballots. Analysts often describe this as tactical or issue-based voting rather than a single ideological flip.",
    sources: [
      { label: "Mid-day · May vs November in Mumbai", url: "https://www.mid-day.com/mumbai/mumbai-news/article/how-mumbai-was-won-mahayuti-lok-sabha-share-remained-intact-mva-votes-plummeted-23435538" }
    ]
  },
  {
    title: "Two Senas and two NCPs on the ballot",
    what: "In November, seat winners included Shinde Sena 6, Uddhav Sena (SS UBT) 10, BJP 15, and Congress in several south Mumbai pockets. In 12 seats both Sena factions contested each other directly.",
    why: "After the 2022 splits, voters faced similar symbols and names. In May, national anger and loyalty to one faction often dominated press coverage. By November, ground reports stressed candidate familiarity and booth organisation. Direct Sena-vs-Sena contests split the old Sena vote in some wards while personal ties still decided close races.",
    sources: [
      { label: "News18 · Mumbai winners by seat", url: "https://www.news18.com/elections/maharashtra-assembly-elections-results-2024-aaditya-thackeray-mangal-lodha-bjp-shinde-sena-sena-ubt-ncp-ajit-pawar-sp-full-list-of-winners-of-mumbais-36-seats-9132259.html" }
    ]
  },
  {
    title: "BJP won far more assembly seats than Lok Sabha seats in Mumbai",
    what: "BJP won 1 MP seat in May but 15 MLA seats in November, including Borivali, Mulund, and Malabar Hill.",
    why: "Suburban belts where the BJP was already competitive in May often added assembly wins in November. Local reporting tied those gains to booth committees, housing society outreach, and MLAs known by name, alongside the national campaign. Many suburban voters appear to treat Parliament and assembly as separate decisions.",
    sources: [
      { label: "Times of India · Mumbai assembly", url: "https://timesofindia.indiatimes.com/city/mumbai/maharashtra-polls-bjp-two-shiv-senas-hold-sway-in-mumbai-amid-a-4-drop-in-electorate-since-2014/articleshow/114419940.cms" }
    ]
  },
  {
    title: "Some well-known incumbents held despite a different May lean in their belt",
    what: "Examples in the data: Worli (Thackeray), Malabar Hill (Lodha), Mumbadevi (Patel), Versova and Dindoshi (UBT), where the November winner did not follow the parliamentary trend for that area.",
    why: "Long-serving faces often keep a personal following built through ward work and municipal complaints. In these pockets, results are consistent with voters backing a known MLA or MP candidate even when the wider parliamentary seat went another way. That matches the 18 split-ticket areas in the dataset, though each ward has its own story.",
    sources: [
      { label: "News18 · seat-wise results", url: "https://www.news18.com/elections/maharashtra-assembly-elections-results-2024-aaditya-thackeray-mangal-lodha-bjp-shinde-sena-sena-ubt-ncp-ajit-pawar-sp-full-list-of-winners-of-mumbais-36-seats-9132259.html" }
    ]
  },
  {
    title: "Turnout was similar in both months",
    what: "City-wide averages in this dataset are about 54% in May and 55% in November. The winning alliance still changed in 18 areas.",
    why: "Turnout did not collapse between elections, so the main movement is in how votes were cast, not large-scale abstention. That supports reading November as a real shift in choice among those who voted, rather than apathy alone.",
    sources: [
      { label: "ECI / IndiaVotes", url: "https://www.indiavotes.com/vidhan-sabha/2024/maharashtra/300/30" }
    ]
  },
  {
    title: "South, west, and east Mumbai moved differently",
    what: "Island city: still competitive for MVA. West: mostly Mahayuti with some UBT pockets. East: many areas that were MVA-leaning in May went Mahayuti in November.",
    why: "South Mumbai has older community and party networks. Western suburbs mix middle-class voters who respond to civic delivery narratives. Eastern suburbs saw several MVA-to-Mahayuti switches in the data, often where ruling-alliance MLAs and booth teams were active. Statewide, some analysts also flagged opposition vote splits when multiple candidates contested the same base; Mumbai's clearer one-on-one contests in many seats may have helped Mahayuti consolidate.",
    sources: [
      { label: "Hindustan Times · split opposition votes", url: "https://www.hindustantimes.com/cities/mumbai-news/small-parties-independents-friendly-fights-cost-mva-34-seats-101732648781644.html" },
      { label: "The Print · local issues in state polls", url: "https://theprint.in/politics/campaign-on-local-concerns-better-coordination-how-mva-prevailed-over-mahayuti-in-maharashtra/2118190/" }
    ]
  }
];
function SplitTicketCard({ ac, onClick }) {
  const lsAlliance = lsAllianceForAC(ac.pc_slug);
  const vsAlliance = ac.vidhan_sabha_2024.winning_alliance;
  const Tag = onClick ? "button" : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Tag,
    {
      type: onClick ? "button" : void 0,
      onClick,
      className: `text-left rounded-md border border-border bg-background/60 px-3 py-3 w-full ${onClick ? "hover:border-primary/50 transition-colors" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: ac.ac_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: ac.parent_pc }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "May", alliance: lsAlliance, suffix: "Lok Sabha (Parliament)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "November", alliance: vsAlliance, suffix: "Vidhan Sabha (State)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground mt-2", children: [
          "Voted ",
          ALLIANCE_LABELS[lsAlliance],
          " in May, ",
          ALLIANCE_LABELS[vsAlliance],
          " in November"
        ] })
      ]
    }
  );
}
function Row({ label, alliance, suffix }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-16 shrink-0 text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "inline-flex rounded px-2 py-0.5 text-[10px] font-medium",
        style: {
          background: `color-mix(in oklab, ${ALLIANCE_COLOR[alliance]} 25%, transparent)`,
          color: ALLIANCE_COLOR[alliance]
        },
        children: [
          alliance,
          " · ",
          suffix
        ]
      }
    )
  ] });
}
export {
  ALLIANCES as A,
  BRIEF_INTRO as B,
  ELECTION_LABELS as E,
  FINAL_TAKEAWAYS as F,
  SplitTicketCard as S,
  ArrowRight as a,
  ExternalLink as b,
  avg as c,
  splitTicketACs as s
};
