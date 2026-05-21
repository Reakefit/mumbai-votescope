import type { AC } from "@/data/constituencies";
import { lsAllianceForACBest } from "@/lib/divergence";

export function avg(nums: number[]) {
  return nums.reduce((s, x) => s + x, 0) / (nums.length || 1);
}

/**
 * True when the parent PC's LS alliance (or AC-segment lead if available)
 * differs from this AC's VS winner. This is "alliance divergence" — true
 * split-ticket requires AC-segment Form 20 data, which we tag separately.
 */
export function isSplitTicket(ac: AC): boolean {
  return lsAllianceForACBest(ac).alliance !== ac.vidhan_sabha_2024.winning_alliance;
}

export function splitTicketACs(acs: AC[]): AC[] {
  return acs.filter(isSplitTicket);
}

export function partySeatCounts(acs: AC[], cycle: "ls" | "vs") {
  const key = cycle === "ls" ? "lok_sabha_2024" : "vidhan_sabha_2024";
  const counts = new Map<string, number>();
  for (const ac of acs) {
    const p = ac[key].winning_party;
    counts.set(p, (counts.get(p) ?? 0) + 1);
  }
  return counts;
}
