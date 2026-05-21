/**
 * Single source of truth for PC-to-AC alliance divergence counts.
 * Previously these were hard-coded as "18 / 14 / 4 / 15 / 3" in several files,
 * which drifted out of sync. Everything that needs a count should call here.
 */
import { ACS, type AC } from "@/data/constituencies";
import { lsAllianceForAC } from "@/data/pc-results";
import { lsSegmentFor, type LsSource } from "@/data/ls-segments";

export interface DivergenceCounts {
  total: number;
  divergent: number;
  mvaToMahayuti: number;
  mahayutiToMva: number;
  /** How many of the divergence calls are backed by AC-segment LS data
   *  (true split-ticket) vs PC-parent fallback (alliance divergence only). */
  acSegmentBacked: number;
  pcParentBacked: number;
}

export function lsAllianceForACBest(ac: AC): { alliance: ReturnType<typeof lsAllianceForAC>; source: LsSource } {
  const seg = lsSegmentFor(ac.ac_number);
  if (seg) return { alliance: seg.alliance, source: "ac_segment" };
  return { alliance: lsAllianceForAC(ac.pc_slug), source: "pc_parent" };
}

export function divergenceCounts(acs: AC[] = ACS): DivergenceCounts {
  let divergent = 0;
  let mvaToMahayuti = 0;
  let mahayutiToMva = 0;
  let acSegmentBacked = 0;
  let pcParentBacked = 0;
  for (const ac of acs) {
    const { alliance: ls, source } = lsAllianceForACBest(ac);
    const vs = ac.vidhan_sabha_2024.winning_alliance;
    if (ls === vs) continue;
    divergent++;
    if (ls === "MVA") mvaToMahayuti++;
    else mahayutiToMva++;
    if (source === "ac_segment") acSegmentBacked++;
    else pcParentBacked++;
  }
  return { total: acs.length, divergent, mvaToMahayuti, mahayutiToMva, acSegmentBacked, pcParentBacked };
}

export function divergentACs(acs: AC[] = ACS): AC[] {
  return acs.filter((ac) => {
    const { alliance } = lsAllianceForACBest(ac);
    return alliance !== ac.vidhan_sabha_2024.winning_alliance;
  });
}
