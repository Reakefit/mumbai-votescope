import { ACS, filterByPC, type AC } from "@/data/constituencies";
import { pcBySlug, lsAllianceForAC, type PCResult } from "@/data/pc-results";
import { splitTicketACs } from "@/lib/metrics";

export interface PCSummary {
  pc: PCResult;
  acs: AC[];
  vsMahayuti: number;
  vsMva: number;
  splitCount: number;
  splitAcs: AC[];
  mvaToMah: number;
  mahToMva: number;
  avgSwing: number;
  avgTurnoutLs: number;
  avgTurnoutVs: number;
}

export function summarizePC(pcSlug: string): PCSummary {
  const pc = pcBySlug(pcSlug)!;
  const acs = filterByPC(pcSlug);
  const splitAcs = splitTicketACs(acs);
  let mvaToMah = 0;
  let mahToMva = 0;
  for (const a of splitAcs) {
    if (lsAllianceForAC(a.pc_slug) === "MVA") mvaToMah++;
    else mahToMva++;
  }
  return {
    pc,
    acs,
    vsMahayuti: acs.filter((a) => a.vidhan_sabha_2024.winning_alliance === "Mahayuti").length,
    vsMva: acs.filter((a) => a.vidhan_sabha_2024.winning_alliance === "MVA").length,
    splitCount: splitAcs.length,
    splitAcs,
    mvaToMah,
    mahToMva,
    avgSwing: acs.reduce((s, a) => s + a.metrics.vote_share_swing_pct, 0) / acs.length,
    avgTurnoutLs: acs.reduce((s, a) => s + a.lok_sabha_2024.turnout_pct, 0) / acs.length,
    avgTurnoutVs: acs.reduce((s, a) => s + a.vidhan_sabha_2024.turnout_pct, 0) / acs.length,
  };
}

export function allPCSummaries(): PCSummary[] {
  const slugs = [...new Set(ACS.map((a) => a.pc_slug))];
  return slugs.map(summarizePC);
}
