import type { AC } from "@/data/constituencies";
import { lsAllianceForACBest, divergentACs } from "@/lib/divergence";
import { avg } from "@/lib/metrics";

export function partyDynamicsBlurb(acs: AC[]): string {
  const bjpVs = acs.filter((a) => a.vidhan_sabha_2024.winning_party === "BJP").length;
  const shsVs = acs.filter((a) => a.vidhan_sabha_2024.winning_party === "SHS").length;
  const ubtVs = acs.filter((a) => a.vidhan_sabha_2024.winning_party === "SS(UBT)").length;
  return (
    `In May, Mumbai's parliamentary seats were split mainly between Uddhav Sena and Congress under MVA. ` +
    `In November the BJP won ${bjpVs} assembly seats, Shinde Sena ${shsVs}, and Uddhav Sena (UBT) ${ubtVs}. ` +
    `Party seat counts are from ECI / IndiaVotes results in this dataset.`
  );
}

export function partyDynamicsWhy(acs: AC[]): string {
  const bjpVs = acs.filter((a) => a.vidhan_sabha_2024.winning_party === "BJP").length;
  const ubtVs = acs.filter((a) => a.vidhan_sabha_2024.winning_party === "SS(UBT)").length;
  return (
    `BJP's assembly tally (${bjpVs}) is much larger than its Mumbai Lok Sabha tally, which is consistent with reporting on suburban booth strength. ` +
    `UBT still holds ${ubtVs} seats, often where the Thackeray name and older networks remain visible. ` +
    `Why each seat moved is interpretation drawn from press coverage, not from individual ballots in this app.`
  );
}

export function preferenceWhy(_acs: AC[], lsMva: number, lsTotal: number, vsMah: number, vsTotal: number, divergent: number): string {
  return (
    `Verified counts: ${lsMva}/${lsTotal} Mumbai MPs went MVA in May, ${vsMah}/${vsTotal} MLAs went Mahayuti in November. ` +
    `${divergent} assembly segments had a different alliance from their parent Lok Sabha seat. ` +
    `Why each ward moved is debated in reporting — national mood in May, candidates and organisation in November. This page states the counts first and keeps any interpretation explicitly downstream.`
  );
}

export function splitWhy(mvaToMah: number, mahToMva: number): string {
  return (
    `${mvaToMah} ACs sit inside an MVA-won Lok Sabha seat but elected a Mahayuti MLA in November. ` +
    `${mahToMva} go the other way, mostly in the west. We call this "PC-to-AC alliance divergence" rather than true split-ticket because the May number for an AC is its parent PC winner, not an AC-segment count from Form 20.`
  );
}

export function turnoutWhy(acs: AC[]): string {
  const ls = avg(acs.map((a) => a.lok_sabha_2024.turnout_pct));
  const vs = avg(acs.map((a) => a.vidhan_sabha_2024.turnout_pct));
  return (
    `Average turnout sits around ${ls.toFixed(0)}% in May and ${vs.toFixed(0)}% in November in this dataset, so the alliance change is not mainly explained by people staying home. ` +
    `Note that the November figure is a district-level proxy applied to every AC in that district, not a true per-AC participation rate.`
  );
}

export function urbanWhy(): string {
  return (
    `In this data, quieter planned areas more often went Mahayuti in November, while very dense mixed wards stayed more competitive. ` +
    `That is a pattern visible in the chart, not a rule for every voter, and the density tiers themselves are illustrative estimates.`
  );
}

export function geoWhy(): string {
  return (
    `East Mumbai shows several PC-to-AC alliance divergences in this dataset. The island city still has multiple MVA assembly wins. The west is mostly Mahayuti overall. ` +
    `Ground reports often mention booth work and sitting MLAs in the east and community networks in the south — both consistent with the patterns here, neither proven by them.`
  );
}

export function demoWhy(): string {
  return (
    `Areas with higher estimated Muslim share more often leaned MVA in November in this exploratory chart, with several exceptions. ` +
    `The community share is an estimate calibrated to known geography, not an official census figure, so treat as exploratory rather than evidentiary.`
  );
}

export { divergentACs as splitTicketACs, lsAllianceForACBest as lsAllianceForAC };
