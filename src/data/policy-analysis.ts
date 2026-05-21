/** Long-form policy analysis · Mumbai 2024 (sourced narrative + dataset stats) */

export interface SourceRef {
  label: string;
  url: string;
}

export type AnalysisBlock =
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "sources"; sources: SourceRef[] };

export interface AnalysisNavItem {
  id: string;
  label: string;
}

export const ANALYSIS_NAV: AnalysisNavItem[] = [
  { id: "executive", label: "Executive summary" },
  { id: "framework", label: "Two elections, two questions" },
  { id: "pc-south", label: "Mumbai South" },
  { id: "pc-south-central", label: "Mumbai South Central" },
  { id: "pc-north-central", label: "Mumbai North Central" },
  { id: "pc-north-east", label: "Mumbai North East" },
  { id: "pc-north-west", label: "Mumbai North West" },
  { id: "pc-north", label: "Mumbai North" },
  { id: "parties", label: "Party campaigns" },
  { id: "split-ticket", label: "Split-ticket voting" },
  { id: "strategic", label: "Strategic vs local" },
  { id: "charts", label: "Charts & evidence" },
];

export const EXECUTIVE_SUMMARY: AnalysisBlock[] = [
  {
    type: "p",
    text: "Mumbai held Lok Sabha elections in May 2024 and Vidhan Sabha elections in November 2024. In this dataset, the opposition Maha Vikas Aghadi (MVA) won 4 of 6 parliamentary seats in May; the ruling Mahayuti alliance won 22 of 36 assembly seats in November. Eighteen assembly areas show a different winning alliance between the two contests when May is read through the parent parliamentary seat and November through the assembly winner.",
  },
  {
    type: "p",
    text: "The pattern is not a single city-wide swing from one party to another. Parliamentary results tracked national anger over the 2022 Shiv Sena and NCP splits, sympathy for Uddhav Thackeray, and consolidation of Muslim and Dalit votes behind MVA in several seats (The Hindu, Indian Express, Mid-day). Assembly results six months later rewarded booth organisation, early candidate announcements, and sitting MLAs in many suburbs (Indian Express, Times of India). Mid-day reported that Mahayuti's Lok Sabha vote share in Mumbai largely held while MVA's assembly tally collapsed, which is consistent with split-ticket behaviour rather than mass defection.",
  },
  {
    type: "p",
    text: "This briefing separates verified counts (ECI / IndiaVotes, in the app dataset) from interpretation drawn from news and campaign reporting. It is built for researchers, journalists, and campaign planners who need both numbers and context.",
  },
  {
    type: "sources",
    sources: [
      { label: "The Hindu · LS results", url: "https://www.thehindu.com/elections/lok-sabha/maharashtra-election-results-2024-mva-turnaround-gives-jolt-to-bjp-shinde-led-mahayuti/article68251750.ece" },
      { label: "Indian Express · Mumbai assembly", url: "https://indianexpress.com/article/cities/mumbai/maharashtra-mahayuti-sweeps-mumbai-as-it-bags-22-out-of-36-seats-9686701/" },
      { label: "Mid-day · May vs Nov", url: "https://www.mid-day.com/mumbai/mumbai-news/article/how-mumbai-was-won-mahayuti-lok-sabha-share-remained-intact-mva-votes-plummeted-23435538" },
    ],
  },
];

export const FRAMEWORK: AnalysisBlock[] = [
  {
    type: "p",
    text: "National elections ask voters to judge the Union government, alliance stability, and high-profile splits. State elections ask who will run Maharashtra and who will handle ward-level issues: water, roads, slum rehabilitation, local permits, and housing society disputes. Mumbai's 2024 pair is a useful natural comparison — the same electorate voted twice within six months — but not a controlled experiment. Candidate line-ups, alliance salience, turnout drivers, campaign issues, welfare schemes, and the office being filled all changed between May and November.",
  },
  {
    type: "h3",
    text: "How to read the maps in this app",
  },
  {
    type: "ul",
    items: [
      "May (Lok Sabha): colour on each assembly tile follows the MP winner for the parliamentary seat covering it (6 results city-wide). It does NOT mean that assembly segment was counted separately; AC-segment Form 20 leads are not yet integrated.",
      "November (Vidhan Sabha): colour follows the MLA winner for each of the 36 assembly constituencies.",
      "PC-to-AC alliance divergence: an AC where the parent Lok Sabha winner and the November assembly winner are different alliances. We use this term instead of 'split-ticket' because the May value here is the PC winner, not an AC-segment count.",
      "Winner-share difference: November-winner share minus May-winner share on the same tile (dataset metric). It is NOT a classic swing — the two numbers can belong to different parties.",
    ],
  },
  {
    type: "h3",
    text: "Alliances (November 2024 framing)",
  },
  {
    type: "ul",
    items: [
      "Mahayuti: BJP + Shiv Sena (Eknath Shinde) + NCP (Ajit Pawar), in power at the state level after the election.",
      "MVA: Shiv Sena (Uddhav Thackeray / UBT) + Congress + NCP (Sharad Pawar faction) + allies.",
    ],
  },
];

/** Narrative keyed by pc_slug; seat counts injected in UI from summarizePC(). */
export const PC_NARRATIVE: Record<string, AnalysisBlock[]> = {
  "mumbai-south": [
    {
      type: "p",
      text: "Mumbai South covers the island city: Colaba, Mumbadevi, Malabar Hill, Byculla, Shivadi, Worli. In May, MVA's Arvind Sawant (Shiv Sena UBT) won the parliamentary seat with about 51% vote share and a margin near 52,000 votes (dataset / ECI). The belt is socially mixed: business elites in Malabar Hill, working-class and Dalit pockets, and strong community networks in Byculla and Mumbadevi.",
    },
    {
      type: "h3",
      text: "November assembly pattern",
    },
    {
      type: "p",
      text: "In November this PC often splits: Congress holds Mumbadevi (Amin Patel), UBT holds Byculla, Shivadi, and Worli (including Aaditya Thackeray in Worli), while BJP wins Colaba (Rahul Narwekar) and Malabar Hill (Mangal Lodha at 73%+ vote share in the dataset). So voters backed MVA for Parliament but distributed assembly seats across parties. That fits local incumbents and ward networks mattering more than a single alliance label in November.",
    },
    {
      type: "h3",
      text: "Campaign and reporting notes",
    },
    {
      type: "ul",
      items: [
        "Sawant's third consecutive Lok Sabha win was read as UBT holding its island-city base amid the Sena split (NDTV, The Hindu BusinessLine).",
        "Malabar Hill: Lodha's long tenure and Gujarati business community ties; BJP treats it as a fortress seat.",
        "Colaba: Narwekar as Speaker and local face; BJP pick-up in November despite MVA parliamentary win.",
        "Worli: high-profile UBT contest; MNS and others contested, splitting anti-ruling votes in some reports (Economic Times on MNS fielding in Mumbai).",
        "Mumbadevi: Congress local machinery and minority voter consolidation in assembly contests.",
      ],
    },
    {
      type: "sources",
      sources: [
        { label: "NDTV · LS winners", url: "https://www.ndtvprofit.com/india/2024-mumbai-lok-sabha-election-results-full-list-of-winners-10780661" },
        { label: "News18 · AC winners", url: "https://www.news18.com/elections/maharashtra-assembly-elections-results-2024-aaditya-thackeray-mangal-lodha-bjp-shinde-sena-sena-ubt-ncp-ajit-pawar-sp-full-list-of-winners-of-mumbais-36-seats-9132259.html" },
      ],
    },
  ],
  "mumbai-south-central": [
    {
      type: "p",
      text: "Mumbai South Central spans Mahim, Wadala, Sion Koliwada, Dharavi, Chembur, and Anushakti Nagar. In May, UBT's Anil Desai won the Lok Sabha seat for MVA with roughly 50% vote share and a margin over 53,000 (dataset). The area is among Mumbai's densest: Dharavi redevelopment politics, railway colony voters, and a large Dalit and minority population.",
    },
    {
      type: "h3",
      text: "Why November diverged from May",
    },
    {
      type: "p",
      text: "Several assembly segments flipped to Mahayuti in November while Mahim, Dharavi, and parts of the belt stayed with MVA. BJP won Wadala and Sion Koliwada; Shinde Sena took Chembur; Ajit Pawar's NCP won Anushakti Nagar in the data. Indian Express and others noted MVA's first-time hold on the parliamentary seat in 2024, but assembly voting rewarded candidates with strong local BMC and slum-redevelopment visibility.",
    },
    {
      type: "ul",
      items: [
        "Dharavi: Jyoti Gaikwad (Congress) held for MVA; rehabilitation politics and community leadership.",
        "Chembur / Wadala: Mahayuti gains linked in reporting to suburban Gujarati and Marathi middle-class voters and booth consolidation.",
        "Friendly fights: statewide, MVA lost many seats where alliance partners clashed; fewer such losses for Mahayuti in Mumbai (ABP Live on friendly fights).",
      ],
    },
    {
      type: "sources",
      sources: [
        { label: "Indian Express · political pulse", url: "https://indianexpress.com/article/political-pulse/mva-mahayuti-maharashtra-assembly-elections-2024-9645419/" },
        { label: "ABP · friendly fights", url: "https://news.abplive.com/elections/maharashtra-election-results-how-mahayutis-friendly-fights-compared-to-mva-friendly-fire-1733517" },
      ],
    },
  ],
  "mumbai-north-central": [
    {
      type: "p",
      text: "Mumbai North Central includes Vandre East/West, Kalina, Kurla, Chandivali, and Vile Parle. In May, Congress's Varsha Gaikwad won the parliamentary seat for MVA (about 49% vote share, margin near 16,500 in the dataset). The belt mixes airport-adjacent working-class housing, university-town voters, and affluent Vile Parle.",
    },
    {
      type: "h3",
      text: "Assembly sweep by Mahayuti except UBT pockets",
    },
    {
      type: "p",
      text: "November saw BJP and Shinde Sena take most segments: Ashish Shelar (Vandre West), Parag Alavani (Vile Parle at 61%+ share), Mangesh Kudalkar (Kurla), Dilip Lande (Chandivali). UBT kept Vandre East (Varun Sardesai) and Kalina (Sanjay Potnis). Parliamentary sympathy for Gaikwad did not carry all assembly seats, which supports a local-candidate reading for November.",
    },
    {
      type: "ul",
      items: [
        "Shelar and Alavani: established BJP faces with strong booth committees in western suburbs.",
        "Kurla / Chandivali: competitive margins; Mahayuti organisation and early ticket clarity cited in local reporting.",
        "Gaikwad family presence: Congress wins in May narrative; assembly split shows limits of family label alone.",
      ],
    },
    {
      type: "sources",
      sources: [
        { label: "News18 · seat list", url: "https://www.news18.com/elections/maharashtra-assembly-elections-results-2024-aaditya-thackeray-mangal-lodha-bjp-shinde-sena-sena-ubt-ncp-ajit-pawar-sp-full-list-of-winners-of-mumbais-36-seats-9132259.html" },
      ],
    },
  ],
  "mumbai-north-east": [
    {
      type: "p",
      text: "Mumbai North East covers Mankhurd Shivaji Nagar, Ghatkopar East/West, Bhandup West, Vikhroli, and Mulund. In May, UBT's Sanjay Dina Patil won the Lok Sabha seat for MVA (about 49% share, margin near 30,000). The belt is heavily suburban Marathi and Gujarati, with large housing societies and industrial pockets.",
    },
    {
      type: "h3",
      text: "East suburban flip to Mahayuti",
    },
    {
      type: "p",
      text: "November produced BJP wins in Ghatkopar East/West (Parag Shah, Ram Kadam), Mulund (Mihir Kotecha with 71%+ vote share in dataset), and Shinde Sena in Bhandup. UBT held Vikhroli (Sunil Raut); Samajwadi Party's Abu Azmi won Mankhurd in the data. This PC is one of the clearest examples of parliamentary MVA plus assembly Mahayuti dominance.",
    },
    {
      type: "ul",
      items: [
        "Mulund and Ghatkopar: BJP 'bhau' network and housing-society outreach highlighted in Times of India post-election analysis.",
        "Ram Kadam: high-visibility MLA brand even when Lok Sabha went MVA.",
        "Mankhurd: community voting patterns; SP win shows MVA umbrella can fragment at assembly level.",
      ],
    },
    {
      type: "sources",
      sources: [
        { label: "Times of India · BJP in Mumbai", url: "https://timesofindia.indiatimes.com/city/mumbai/maharashtra-elections-bhau-bjp-steers-mahayuti-win-in-mumbai/articleshow/115614820.cms" },
      ],
    },
  ],
  "mumbai-north-west": [
    {
      type: "p",
      text: "Mumbai North West includes Andheri East/West, Versova, Goregaon, Dindoshi, and Jogeshwari East. In May, Shinde Sena's Ravindra Waikar won the Lok Sabha seat for Mahayuti by only 48 votes after recount, the narrowest margin in India in 2024 (Indian Express, Scroll). UBT's Amol Kirtikar lost after leading at one stage of counting; allegations about counting process were reported but the result stood.",
    },
    {
      type: "h3",
      text: "Parliamentary photo-finish, assembly fragmentation",
    },
    {
      type: "p",
      text: "November mostly held Mahayuti in Andheri and Goregaon, but UBT won Versova, Dindoshi, and Jogeshwari East in the dataset. So voters could back Shinde Sena for Parliament in a recount thriller yet return UBT MLAs in adjacent assembly segments. That is strong evidence of candidate-level voting in the west.",
    },
    {
      type: "ul",
      items: [
        "Waikar: defection from UBT to Shinde faction; personal organisation in Andheri (Indian Express profile).",
        "Versova / Dindoshi: UBT local faces (Haroon Rashid Khan, Sunil Prabhu) outperformed parliamentary trend.",
        "Entertainment and service-sector voters: high turnout sensitivity; civic issues (traffic, metro, housing) dominate assembly messaging.",
      ],
    },
    {
      type: "sources",
      sources: [
        { label: "Indian Express · 48-vote win", url: "https://indianexpress.com/article/cities/mumbai/photo-finish-in-mumbai-north-west-waikar-defeats-kirtikar-by-48-votes-9372509/" },
        { label: "Scroll · recount", url: "https://scroll.in/latest/1068838/shiv-senas-ravindra-waikar-wins-mumbai-north-west-seat-by-48-votes-in-closest-lok-sabha-contest" },
      ],
    },
  ],
  "mumbai-north": [
    {
      type: "p",
      text: "Mumbai North is the northern suburban belt: Malad West, Charkop, Kandivali East, Magathane, Dahisar, and Borivali. In May, BJP's Piyush Goyal won with about 66% vote share and a margin over 3.5 lakh votes (dataset), though media noted the margin was smaller than his 2014/2019 landslides (Mid-day, NDTV).",
    },
    {
      type: "h3",
      text: "Mahayuti dominance in November with one Congress hold",
    },
    {
      type: "p",
      text: "November returned BJP in five segments (including Borivali where Sanjay Upadhyay's margin exceeded 1 lakh votes in reporting) and Shinde Sena in Magathane. Congress's Aslam Shaikh won Malad West in the dataset, the main MVA bright spot in this PC. Parliamentary and assembly alignment is strongest here: BJP booth density and Gujarati-middle-class support reinforce each other.",
    },
    {
      type: "ul",
      items: [
        "Borivali / Kandivali / Dahisar: textbook BJP organisational seats; civic issues framed through housing societies and local MLA accessibility.",
        "Malad West: Congress local base; shows even a BJP-dominated PC can host an opposition assembly island.",
        "Goyal's national profile helps Lok Sabha; assembly wins still depend on MLA names on the ballot.",
      ],
    },
    {
      type: "sources",
      sources: [
        { label: "Indian Express · Mahayuti 22/36", url: "https://indianexpress.com/article/cities/mumbai/maharashtra-mahayuti-sweeps-mumbai-as-it-bags-22-out-of-36-seats-9686701/" },
        { label: "Mid-day · LS results", url: "https://www.mid-day.com/mumbai/mumbai-news/article/mumbai-lok-sabha-election-results-2024-4-out-of-6-for-mva-in-city-23352769" },
      ],
    },
  ],
};

export const PARTY_CAMPAIGNS: AnalysisBlock[] = [
  {
    type: "h3",
    text: "BJP: suburban machine plus national brand",
  },
  {
    type: "p",
    text: "The BJP won 15 of 17 assembly seats it contested in Mumbai per Indian Express tallying, against one Lok Sabha seat (Piyush Goyal) in the six PCs. Times of India described 'Bhau' networks steering Mahayuti's Mumbai win: early candidate lists, housing-society contact drives, and sitting MLAs with high name recognition in Borivali, Mulund, and Malabar Hill-type seats.",
  },
  {
    type: "h3",
    text: "Shiv Sena (Shinde): split survival and Waikar effect",
  },
  {
    type: "p",
    text: "Shinde's faction won six assembly seats in Mumbai and held the knife-edge North West parliamentary seat through Waikar. The faction's pitch combined continuity with the Sena symbol for loyalists and alliance with BJP organisation. Direct Sena-vs-Sena contests in a dozen Mumbai seats split the Marathi vote but allowed personal loyalties to decide close races.",
  },
  {
    type: "h3",
    text: "Shiv Sena (UBT): parliamentary strength, assembly defence",
  },
  {
    type: "p",
    text: "UBT won four of six Mumbai Lok Sabha seats but only ten of 22 assembly contests it fought in the city (News18). UBT held island-city and some western segments (Worli, Versova, Dindoshi) where the Thackeray name and old booth captains still deliver. Losses in the east and parts of the north central belt reflect weaker assembly organisation relative to BJP's November ground game.",
  },
  {
    type: "h3",
    text: "Congress and NCP factions",
  },
  {
    type: "p",
    text: "Congress won three Mumbai assembly seats (down from four in 2019 per Indian Express) but contributed key Lok Sabha wins (Varsha Gaikwad in North Central). Sharad Pawar's NCP (NCP-SP) won Mankhurd in the data; Ajit Pawar's NCP won Anushakti Nagar. Ajit Pawar's faction took the one NCP Mahayuti seat in Mumbai; Sharad Pawar's NCP was wiped out in the city assembly count in reporting. Confusing symbols hurt MVA more than Mahayuti in several statewide analyses.",
  },
  {
    type: "h3",
    text: "Third parties and vote splits",
  },
  {
    type: "p",
    text: "MNS contested most Mumbai assembly seats and clashed with Sena factions in Worli, Mahim, and elsewhere (Economic Times). Hindustan Times reported small parties and independents costing MVA seats statewide. Tactical rebels and friendly fights on the opposition side likely amplified Mahayuti's gains (Hindustan Times, ABP Live).",
  },
  {
    type: "sources",
    sources: [
      { label: "News18 · Mumbai analysis", url: "https://www.news18.com/elections/mumbai-gives-mahayuti-22-of-36-assembly-seats-mvas-sena-ubt-retains-10-analysis-9132132.html" },
      { label: "Hindustan Times · vote splits", url: "https://www.hindustantimes.com/cities/mumbai-news/small-parties-independents-friendly-fights-cost-mva-34-seats-101732648781644.html" },
    ],
  },
];

export const SPLIT_TICKET_DEEP: AnalysisBlock[] = [
  {
    type: "p",
    text: "True split-ticket voting means the same local electorate chose one alliance for Parliament and another for the State Assembly. To prove that we would need AC-segment Lok Sabha leads from ECI Form 20 Part II. Until those are integrated, what this app actually shows is PC-to-AC alliance divergence: the Lok Sabha seat covering an AC was won by one alliance, and that AC's assembly seat was won by the other. The divergence count is rendered live from the dataset in every chart on the site, so it cannot drift between sections.",
  },
  {
    type: "h3",
    text: "What results prove vs what reporting suggests",
  },
  {
    type: "ul",
    items: [
      "High confidence: assembly seat outcomes (ECI counts) and the city-wide totals 4/6 MPs MVA vs 22/36 MLAs Mahayuti.",
      "Medium confidence: PC-to-AC alliance divergence patterns. Plausibly indicate split-ticket behaviour but not proven without segment-level Lok Sabha data.",
      "Low confidence: voter motive. Media reporting offers narratives (national vs local framing, candidate brand, ground machinery); the dataset cannot test those directly.",
    ],
  },
  {
    type: "h3",
    text: "Mechanisms discussed in press",
  },
  {
    type: "ul",
    items: [
      "Sitting MLA advantage and early nominations (Mahayuti).",
      "Opposition friendly fights and rebel candidates (MVA).",
      "MNS, AIMIM and independents cutting opposition unity in Mumbai.",
      "Welfare schemes (Ladki Bahin Yojana) credited statewide between May and November.",
      "Personal brands: Lodha, Kadam, Thackeray family, Goyal, Patel and others.",
    ],
  },
  {
    type: "sources",
    sources: [
      { label: "Mid-day · intact LS share", url: "https://www.mid-day.com/mumbai/mumbai-news/article/how-mumbai-was-won-mahayuti-lok-sabha-share-remained-intact-mva-votes-plummeted-23435538" },
      { label: "Hindustan Times · rebels", url: "https://www.hindustantimes.com/cities/mumbai-news/tactical-rebels-likely-to-split-opposition-votes-101730835002757.html" },
    ],
  },
];

export const STRATEGIC_VS_LOCAL: AnalysisBlock[] = [
  {
    type: "p",
    text: "Strategic voting usually means picking a party to influence a higher-level outcome (e.g. blocking a national government). Ideological voting means stable party identity across elections. Mumbai 2024 looks like a mix: May patterns track statewide MVA recovery in Lok Sabha (The Hindu); November patterns track local incumbency and alliance discipline (Indian Express, Times of India).",
  },
  {
    type: "h3",
    text: "Where local candidate influence shows in the data",
  },
  {
    type: "ul",
    items: [
      "Same PC, different assembly parties: Mumbai South (MVA MP, mixed MLAs).",
      "Mahayuti parliamentary win, UBT assembly wins: North West (Waikar LS, UBT in Versova/Dindoshi/Jogeshwari East).",
      "MVA parliamentary win, Mahayuti assembly sweep: North East and parts of North Central.",
      "Aligned results: Mumbai North (Goyal LS, mostly BJP MLAs).",
    ],
  },
  {
    type: "p",
    text: "We label these as local-candidate influence where the same electorate produces different party winners at adjacent levels. That is interpretation supported by results plus reporting, not a direct survey of voter motives.",
  },
];

export const DATA_LIMITS: AnalysisBlock[] = [
  {
    type: "ul",
    items: [
      "AC-segment Lok Sabha leads (Form 20 Part II) are not yet integrated. May colours on each AC tile repeat the parent PC winner.",
      "Assembly turnout uses Mumbai City / Suburban district averages applied to every AC in that district. Not a per-AC participation rate.",
      "Winner-share difference is dataset-internal: November-winner share minus May-winner share, which compares different parties when the winner changed.",
      "Demographic tiers (income, density, geo zone, community share) are illustrative estimates — exploratory, not evidentiary.",
      "No booth-level, exit-poll, or candidate-expense data in this version.",
    ],
  },
  {
    type: "p",
    text: "See METHODOLOGY.md in the repository for full definitions and validation steps.",
  },
];

export const OUTLOOK: AnalysisBlock[] = [
  {
    type: "p",
    text: "Optional behavioural read (speculative): if Mahayuti keeps suburban booth machinery while MVA repairs alliance discipline before the next cycle, Mumbai may continue to show high split-ticket rates. If UBT consolidates Marathi identity votes in the island city and Congress holds minority-heavy assembly pockets, MVA could defend 12–14 assembly seats even under a strong BJP Lok Sabha showing. Civic delivery on Dharavi redevelopment, metro connectivity, and flooding will likely stay the dominant assembly narratives regardless of national mood.",
  },
  {
    type: "p",
    text: "These scenarios are analyst inference, not modelled forecasts. They are included because the assignment invites behavioural observations from trends.",
  },
];
