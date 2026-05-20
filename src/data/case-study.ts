/** Presentation copy · Mumbai 2024 */

export interface SourceLink {
  label: string;
  url: string;
}

export interface AllianceInfo {
  short: "Mahayuti" | "MVA";
  full: string;
  members: string;
}

export const ALLIANCES: AllianceInfo[] = [
  {
    short: "Mahayuti",
    full: "Ruling alliance",
    members: "BJP, Shiv Sena (Shinde), NCP (Ajit Pawar). Backed the state government after November 2024.",
  },
  {
    short: "MVA",
    full: "Opposition alliance (Maha Vikas Aghadi)",
    members: "Shiv Sena (Uddhav Thackeray), Congress, NCP (Sharad Pawar), and allies. Strong in May's parliamentary election in Mumbai.",
  },
];

export const BRIEF_INTRO = {
  title: "How Mumbai voted in 2024: Parliament and State Assembly",
  subtitle:
    "Maps and notes below compare May (Lok Sabha) and November (Vidhan Sabha) results area by area.",
  elections: {
    parliament: { name: "Lok Sabha (Parliament)", when: "April to June 2024" },
    assembly: { name: "Vidhan Sabha (State)", when: "November 2024" },
  },
};

export const ALLIANCE_LABELS: Record<string, string> = {
  MVA: "MVA",
  Mahayuti: "Mahayuti",
};

export const ELECTION_LABELS = {
  ls: { short: "May 2024", full: "Lok Sabha · May 2024", role: "Parliament" },
  vs: { short: "Nov 2024", full: "Vidhan Sabha · Nov 2024", role: "State Assembly" },
};

export interface FinalTakeaway {
  title: string;
  what: string;
  why: string;
  sources: SourceLink[];
}

export const FINAL_TAKEAWAYS: FinalTakeaway[] = [
  {
    title: "Parliament and assembly results diverged",
    what: "In May, MVA won 4 of 6 Mumbai MP seats. In November, Mahayuti won 22 of 36 MLA seats. In 18 assembly areas the winning alliance in May (by parliamentary seat) did not match November's assembly winner.",
    why:
      "The counts show two different outcomes six months apart, not one city-wide swing. Reporting on the Sena and NCP splits, and sympathy for Uddhav Thackeray, fits the strong MVA showing in May. For November, many journalists and campaigners pointed to local MLAs, ward networks, and civic issues as bigger factors than the national line alone. We cannot read individual voters' minds from results alone, but the seat pattern fits a split between a parliamentary choice and a state-level one.",
    sources: [
      { label: "The Hindu · May results", url: "https://www.thehindu.com/elections/lok-sabha/maharashtra-election-results-2024-mva-turnaround-gives-jolt-to-bjp-shinde-led-mahayuti/article68251750.ece" },
      { label: "Indian Express · November results", url: "https://indianexpress.com/article/cities/mumbai/maharashtra-mahayuti-sweeps-mumbai-as-it-bags-22-out-of-36-seats-9686701/" },
    ],
  },
  {
    title: "18 areas changed winning alliance between the two polls",
    what: "18 of 36 areas had one alliance ahead in May's parliamentary mapping and another in November's assembly result. 15 moved from MVA (May) to Mahayuti (November); 3 went the other way.",
    why:
      "Mid-day and other outlets noted that Mahayuti's Lok Sabha vote share in Mumbai was largely intact after November, while MVA's assembly tally fell sharply. That pattern suggests many voters did not simply drop one party city-wide; they distributed votes differently across the two ballots. Analysts often describe this as tactical or issue-based voting rather than a single ideological flip.",
    sources: [
      { label: "Mid-day · May vs November in Mumbai", url: "https://www.mid-day.com/mumbai/mumbai-news/article/how-mumbai-was-won-mahayuti-lok-sabha-share-remained-intact-mva-votes-plummeted-23435538" },
    ],
  },
  {
    title: "Two Senas and two NCPs on the ballot",
    what: "In November, seat winners included Shinde Sena 6, Uddhav Sena (SS UBT) 10, BJP 15, and Congress in several south Mumbai pockets. In 12 seats both Sena factions contested each other directly.",
    why:
      "After the 2022 splits, voters faced similar symbols and names. In May, national anger and loyalty to one faction often dominated press coverage. By November, ground reports stressed candidate familiarity and booth organisation. Direct Sena-vs-Sena contests split the old Sena vote in some wards while personal ties still decided close races.",
    sources: [
      { label: "News18 · Mumbai winners by seat", url: "https://www.news18.com/elections/maharashtra-assembly-elections-results-2024-aaditya-thackeray-mangal-lodha-bjp-shinde-sena-sena-ubt-ncp-ajit-pawar-sp-full-list-of-winners-of-mumbais-36-seats-9132259.html" },
    ],
  },
  {
    title: "BJP won far more assembly seats than Lok Sabha seats in Mumbai",
    what: "BJP won 1 MP seat in May but 15 MLA seats in November, including Borivali, Mulund, and Malabar Hill.",
    why:
      "Suburban belts where the BJP was already competitive in May often added assembly wins in November. Local reporting tied those gains to booth committees, housing society outreach, and MLAs known by name, alongside the national campaign. Many suburban voters appear to treat Parliament and assembly as separate decisions.",
    sources: [
      { label: "Times of India · Mumbai assembly", url: "https://timesofindia.indiatimes.com/city/mumbai/maharashtra-polls-bjp-two-shiv-senas-hold-sway-in-mumbai-amid-a-4-drop-in-electorate-since-2014/articleshow/114419940.cms" },
    ],
  },
  {
    title: "Some well-known incumbents held despite a different May lean in their belt",
    what: "Examples in the data: Worli (Thackeray), Malabar Hill (Lodha), Mumbadevi (Patel), Versova and Dindoshi (UBT), where the November winner did not follow the parliamentary trend for that area.",
    why:
      "Long-serving faces often keep a personal following built through ward work and municipal complaints. In these pockets, results are consistent with voters backing a known MLA or MP candidate even when the wider parliamentary seat went another way. That matches the 18 split-ticket areas in the dataset, though each ward has its own story.",
    sources: [
      { label: "News18 · seat-wise results", url: "https://www.news18.com/elections/maharashtra-assembly-elections-results-2024-aaditya-thackeray-mangal-lodha-bjp-shinde-sena-sena-ubt-ncp-ajit-pawar-sp-full-list-of-winners-of-mumbais-36-seats-9132259.html" },
    ],
  },
  {
    title: "Turnout was similar in both months",
    what: "City-wide averages in this dataset are about 54% in May and 55% in November. The winning alliance still changed in 18 areas.",
    why:
      "Turnout did not collapse between elections, so the main movement is in how votes were cast, not large-scale abstention. That supports reading November as a real shift in choice among those who voted, rather than apathy alone.",
    sources: [
      { label: "ECI / IndiaVotes", url: "https://www.indiavotes.com/vidhan-sabha/2024/maharashtra/300/30" },
    ],
  },
  {
    title: "South, west, and east Mumbai moved differently",
    what: "Island city: still competitive for MVA. West: mostly Mahayuti with some UBT pockets. East: many areas that were MVA-leaning in May went Mahayuti in November.",
    why:
      "South Mumbai has older community and party networks. Western suburbs mix middle-class voters who respond to civic delivery narratives. Eastern suburbs saw several MVA-to-Mahayuti switches in the data, often where ruling-alliance MLAs and booth teams were active. Statewide, some analysts also flagged opposition vote splits when multiple candidates contested the same base; Mumbai's clearer one-on-one contests in many seats may have helped Mahayuti consolidate.",
    sources: [
      { label: "Hindustan Times · split opposition votes", url: "https://www.hindustantimes.com/cities/mumbai-news/small-parties-independents-friendly-fights-cost-mva-34-seats-101732648781644.html" },
      { label: "The Print · local issues in state polls", url: "https://theprint.in/politics/campaign-on-local-concerns-better-coordination-how-mva-prevailed-over-mahayuti-in-maharashtra/2118190/" },
    ],
  },
];
