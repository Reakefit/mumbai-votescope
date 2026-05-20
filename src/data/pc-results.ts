import type { Alliance, CycleResult, Party } from "./constituencies";

/** Lok Sabha 2024: one result per Mumbai parliamentary constituency (6 PCs). */
export interface PCResult {
  pc_name: string;
  pc_slug: string;
  lok_sabha_2024: CycleResult;
}

export const PC_RESULTS: PCResult[] = [
  {
    pc_name: "Mumbai South",
    pc_slug: "mumbai-south",
    lok_sabha_2024: {
      winning_alliance: "MVA",
      winning_party: "SS(UBT)",
      candidate: "Arvind Sawant",
      vote_share_pct: 51.18,
      margin_votes: 52673,
      turnout_pct: 50.33,
    },
  },
  {
    pc_name: "Mumbai South Central",
    pc_slug: "mumbai-south-central",
    lok_sabha_2024: {
      winning_alliance: "MVA",
      winning_party: "SS(UBT)",
      candidate: "Anil Desai",
      vote_share_pct: 49.73,
      margin_votes: 53384,
      turnout_pct: 53.9,
    },
  },
  {
    pc_name: "Mumbai North Central",
    pc_slug: "mumbai-north-central",
    lok_sabha_2024: {
      winning_alliance: "MVA",
      winning_party: "INC",
      candidate: "Varsha Gaikwad",
      vote_share_pct: 48.93,
      margin_votes: 16514,
      turnout_pct: 52.21,
    },
  },
  {
    pc_name: "Mumbai North East",
    pc_slug: "mumbai-north-east",
    lok_sabha_2024: {
      winning_alliance: "MVA",
      winning_party: "SS(UBT)",
      candidate: "Sanjay Dina Patil",
      vote_share_pct: 48.67,
      margin_votes: 29861,
      turnout_pct: 56.63,
    },
  },
  {
    pc_name: "Mumbai North West",
    pc_slug: "mumbai-north-west",
    lok_sabha_2024: {
      winning_alliance: "Mahayuti",
      winning_party: "SHS",
      candidate: "Ravindra Waikar",
      vote_share_pct: 47.4,
      margin_votes: 48,
      turnout_pct: 55.04,
    },
  },
  {
    pc_name: "Mumbai North",
    pc_slug: "mumbai-north",
    lok_sabha_2024: {
      winning_alliance: "Mahayuti",
      winning_party: "BJP",
      candidate: "Piyush Goyal",
      vote_share_pct: 65.68,
      margin_votes: 357608,
      turnout_pct: 57.2,
    },
  },
];

export function aggregatePCSeats(pcs: PCResult[] = PC_RESULTS) {
  let mva = 0;
  let mahayuti = 0;
  for (const p of pcs) {
    if (p.lok_sabha_2024.winning_alliance === "MVA") mva++;
    else mahayuti++;
  }
  return { mva, mahayuti, total: pcs.length };
}

export function pcBySlug(slug: string): PCResult | undefined {
  return PC_RESULTS.find((p) => p.pc_slug === slug);
}

export function lsAllianceForAC(pcSlug: string): Alliance {
  return pcBySlug(pcSlug)?.lok_sabha_2024.winning_alliance ?? "MVA";
}

export function filterPCs(slug: string | null): PCResult[] {
  if (!slug || slug === "all") return PC_RESULTS;
  const one = pcBySlug(slug);
  return one ? [one] : PC_RESULTS;
}

export type { Party };
