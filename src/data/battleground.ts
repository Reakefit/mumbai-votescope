/**
 * Battleground classification — each Mumbai AC sorted into one of five
 * categories based on November margin + PC-to-AC alliance divergence.
 *
 * Definitions (all computed from the dataset, not asserted):
 *  - Mahayuti stronghold: VS winner Mahayuti, share ≥ 55%, parent PC also Mahayuti.
 *  - MVA stronghold:      VS winner MVA,      share ≥ 55%, parent PC also MVA.
 *  - Divergent (likely split): parent PC alliance ≠ VS alliance (the
 *    "split-ticket-like" cases, downgraded honestly).
 *  - Candidate-driven: VS winner share ≥ 50% but margin tight (< 8% lead) OR
 *    a named long-incumbent seat — points to MLA brand, not alliance pull.
 *  - High-uncertainty: VS margin under ~5% and no other rule fires.
 */
import { ACS, type AC } from "@/data/constituencies";
import { lsAllianceForACBest } from "@/lib/divergence";

export type Battleground =
  | "mahayuti_stronghold"
  | "mva_stronghold"
  | "divergent"
  | "candidate_driven"
  | "high_uncertainty";

export const BATTLEGROUND_LABEL: Record<Battleground, string> = {
  mahayuti_stronghold: "Aligned Mahayuti stronghold",
  mva_stronghold: "Aligned MVA stronghold",
  divergent: "Apparent PC-to-AC divergence",
  candidate_driven: "Candidate-personality seat",
  high_uncertainty: "High-uncertainty / swing",
};

export const BATTLEGROUND_DESC: Record<Battleground, string> = {
  mahayuti_stronghold: "Won decisively in November and parent Lok Sabha seat also went Mahayuti. Structurally safe in current data.",
  mva_stronghold: "Won decisively in November and parent Lok Sabha seat also went MVA. Structurally safe in current data.",
  divergent: "Parent Lok Sabha seat went one way in May, assembly winner went the other way in November. Likely split-ticket — needs AC-segment Form 20 data to prove.",
  candidate_driven: "Margin or share pattern fits a personal-vote story (long-serving MLA, recognised face) rather than an alliance trend.",
  high_uncertainty: "Tight margin in November, no clear alignment or divergence signal. Genuine swing zone going into BMC.",
};

const STRONG_SHARE = 55;
const CANDIDATE_PCT_OF_TOTAL = 8; // pct-point lead over opponent-implied
const TIGHT_MARGIN_PCT = 5;

/** Rough share-lead approximation: |2*winner_share - 100| in winner-vs-rest space. */
function shareLeadPct(ac: AC): number {
  return Math.abs(2 * ac.vidhan_sabha_2024.vote_share_pct - 100);
}

const KNOWN_PERSONAL_VOTE = new Set<number>([
  185, // Malabar Hill — Mangal Lodha
  182, // Worli — Aaditya Thackeray
  186, // Mumbadevi — Amin Patel
  155, // Mulund — Mihir Kotecha
  152, // Borivali — Sanjay Upadhyay
  169, // Ghatkopar West — Ram Kadam
  187, // Colaba — Rahul Narwekar (Speaker)
]);

export function classifyAC(ac: AC): Battleground {
  const { alliance: lsAlliance } = lsAllianceForACBest(ac);
  const vsAlliance = ac.vidhan_sabha_2024.winning_alliance;
  const vsShare = ac.vidhan_sabha_2024.vote_share_pct;
  const lead = shareLeadPct(ac);

  if (lsAlliance !== vsAlliance) return "divergent";

  if (vsShare >= STRONG_SHARE && lsAlliance === vsAlliance) {
    return vsAlliance === "Mahayuti" ? "mahayuti_stronghold" : "mva_stronghold";
  }

  if (KNOWN_PERSONAL_VOTE.has(ac.ac_number) || lead >= CANDIDATE_PCT_OF_TOTAL * 2) {
    return "candidate_driven";
  }

  if (lead <= TIGHT_MARGIN_PCT * 2) return "high_uncertainty";

  // default: lean to alliance label without high confidence
  return vsAlliance === "Mahayuti" ? "mahayuti_stronghold" : "mva_stronghold";
}

export function battlegroundGroups(acs: AC[] = ACS): Record<Battleground, AC[]> {
  const out: Record<Battleground, AC[]> = {
    mahayuti_stronghold: [],
    mva_stronghold: [],
    divergent: [],
    candidate_driven: [],
    high_uncertainty: [],
  };
  for (const ac of acs) out[classifyAC(ac)].push(ac);
  return out;
}
