/**
 * Rival explanations for the Mumbai May→November swing.
 * Each explanation is tagged with whether the project's dataset can speak to it.
 */

export type EvidenceTag = "data_supports" | "data_neutral" | "data_cannot_test";

export interface RivalExplanation {
  id: string;
  title: string;
  claim: string;
  evidence: EvidenceTag;
  note: string;
  source?: { label: string; url: string };
}

export const EVIDENCE_LABEL: Record<EvidenceTag, string> = {
  data_supports: "Dataset is consistent with this",
  data_neutral: "Mixed signal in dataset",
  data_cannot_test: "Cannot be tested with this dataset",
};

export const EVIDENCE_TONE: Record<EvidenceTag, string> = {
  data_supports: "text-[color:var(--mva)]",
  data_neutral: "text-amber-400",
  data_cannot_test: "text-muted-foreground",
};

export const RIVAL_EXPLANATIONS: RivalExplanation[] = [
  {
    id: "ladki-bahin",
    title: "Welfare schemes (Ladki Bahin Yojana)",
    claim: "The Mahayuti government's direct-benefit transfer to women between Lok Sabha and Vidhan Sabha shifted women voters statewide.",
    evidence: "data_cannot_test",
    note: "We do not have booth-wise or gender-disaggregated turnout in this app. Statewide reporting attributes a large share of the November swing to this scheme.",
    source: { label: "Indian Express · Ladki Bahin and the verdict", url: "https://indianexpress.com/article/political-pulse/maharashtra-elections-ladki-bahin-mahayuti-win-9686701/" },
  },
  {
    id: "bjp-ground-machine",
    title: "BJP / RSS organisational mobilisation",
    claim: "Booth committees, early candidate announcements, and housing-society outreach gave Mahayuti a turnout-and-conversion edge in November.",
    evidence: "data_neutral",
    note: "Consistent with BJP's much higher AC win count vs LS seat count in Mumbai, but the dataset does not isolate ground-game effects from incumbency or candidate factors.",
    source: { label: "Times of India · 'Bhau' steers Mahayuti", url: "https://timesofindia.indiatimes.com/city/mumbai/maharashtra-elections-bhau-bjp-steers-mahayuti-win-in-mumbai/articleshow/115614820.cms" },
  },
  {
    id: "candidate-quality",
    title: "Local candidate strength and incumbency",
    claim: "Personal MLA brands (Lodha, Kadam, Thackeray, Patel, Kotecha) outperformed their alliance's PC-level lean.",
    evidence: "data_supports",
    note: "Several segments show a VS winner from a different alliance than the parent PC. The dataset can identify these seats but cannot prove the cause is personal vote without survey data.",
  },
  {
    id: "mva-friendly-fights",
    title: "MVA seat-sharing friction",
    claim: "MVA partners contested each other or fielded weak candidates in several Mumbai ACs, splitting opposition vote share.",
    evidence: "data_neutral",
    note: "Cannot be isolated from the aggregate-only winner data in this project. Reporting consistently flags this for the statewide pattern.",
    source: { label: "ABP · friendly fights", url: "https://news.abplive.com/elections/maharashtra-election-results-how-mahayutis-friendly-fights-compared-to-mva-friendly-fire-1733517" },
  },
  {
    id: "third-party-splits",
    title: "MNS, AIMIM, SP and independents",
    claim: "Third-party candidacies in Worli, Mahim, Mankhurd and elsewhere shifted close contests by splitting MVA-side votes.",
    evidence: "data_cannot_test",
    note: "This dataset records winner-only data, not full candidate slates per AC, so the split-vote arithmetic isn't visible here.",
  },
  {
    id: "anti-incumbency-mlas",
    title: "Anti-incumbency against specific MLAs",
    claim: "Some incumbents lost vote share even where their alliance gained — pointing to local discontent, not national mood.",
    evidence: "data_neutral",
    note: "Visible only as winner-share movements without booth detail; consistent with the divergence seen in several ACs but unprovable here.",
  },
  {
    id: "post-ls-correction",
    title: "Post-Lok-Sabha course correction",
    claim: "Voters who 'sent a message' nationally in May returned to government in November, reducing the value of national vote-percentage extrapolation.",
    evidence: "data_supports",
    note: "The asymmetric May-vs-November alliance pattern across Mumbai is consistent with this; the project's whole premise rests on it. Causation still requires voter-level evidence.",
    source: { label: "Mid-day · Mumbai vote shares May vs Nov", url: "https://www.mid-day.com/mumbai/mumbai-news/article/how-mumbai-was-won-mahayuti-lok-sabha-share-remained-intact-mva-votes-plummeted-23435538" },
  },
];
