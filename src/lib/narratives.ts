import type { AC } from "@/data/constituencies";
import { aggregateSeats } from "@/data/constituencies";
import { lsAllianceForAC } from "@/data/pc-results";
import { avg, splitTicketACs } from "@/lib/metrics";

export function partyDynamicsBlurb(acs: AC[]): string {
  const bjpVs = acs.filter((a) => a.vidhan_sabha_2024.winning_party === "BJP").length;
  const shsVs = acs.filter((a) => a.vidhan_sabha_2024.winning_party === "SHS").length;
  const ubtVs = acs.filter((a) => a.vidhan_sabha_2024.winning_party === "SS(UBT)").length;
  return (
    `In May, Mumbai's parliamentary seats were shared mainly between Uddhav Sena and Congress under MVA. ` +
    `In November the BJP won ${bjpVs} assembly seats, Shinde Sena ${shsVs}, and Uddhav Sena (UBT) ${ubtVs}. ` +
    `Party seat counts are from ECI-style results in this dataset.`
  );
}

export function partyDynamicsWhy(acs: AC[]): string {
  const bjpVs = acs.filter((a) => a.vidhan_sabha_2024.winning_party === "BJP").length;
  const ubtVs = acs.filter((a) => a.vidhan_sabha_2024.winning_party === "SS(UBT)").length;
  return (
    `BJP assembly wins (${bjpVs}) far exceed its Lok Sabha tally in Mumbai, which matches reporting on suburban booth strength. ` +
    `UBT still holds ${ubtVs} seats, often where the Thackeray name and old networks remain strong. ` +
    `Interpretation of why is based on press and campaign coverage, not individual ballot data.`
  );
}

export function preferenceWhy(acs: AC[], lsMva: number, lsTotal: number, vsMah: number, vsTotal: number, split: number): string {
  return (
    `Seat counts: ${lsMva}/${lsTotal} MPs for MVA in May, ${vsMah}/${vsTotal} MLAs for Mahayuti in November, with ${split} areas changing alliance between the two. ` +
    `That gap is what the map shows. Why it happened is debated in reporting: national mood in May, local candidates and organisation in November. This page states the counts first and keeps the rest as likely context.`
  );
}

export function splitWhy(mvaToMah: number, mahToMva: number): string {
  return (
    `${mvaToMah} areas were MVA-leaning in May's parliamentary seat and Mahayuti in November's assembly result. ` +
    `${mahToMva} went the other way, mostly in the west, where Uddhav Sena or Congress MLAs still won despite a Mahayuti lean in May for Parliament. ` +
    `Each card is one area; reasons vary by ward and are inferred from results plus reporting, not from exit polls in this app.`
  );
}

export function turnoutWhy(acs: AC[]): string {
  const ls = avg(acs.map((a) => a.lok_sabha_2024.turnout_pct));
  const vs = avg(acs.map((a) => a.vidhan_sabha_2024.turnout_pct));
  return (
    `Turnout was about ${ls.toFixed(0)}% in May and ${vs.toFixed(0)}% in November in this dataset, so the alliance change is not mainly from people staying home. ` +
    `Some affluent pockets dipped slightly more, but the bigger signal is different choices among those who voted.`
  );
}

export function urbanWhy(): string {
  return (
    `In this data, quieter planned areas more often went Mahayuti in November, while very dense mixed wards stayed more competitive. ` +
    `That is a pattern in the chart, not a rule for every voter.`
  );
}

export function geoWhy(): string {
  return (
    `East Mumbai shows many May-to-November switches in the dataset. The island city still has several MVA wins in November. The west is mostly Mahayuti overall. ` +
    `Ground reports often mention booth work and sitting MLAs in the east; community networks in the south.`
  );
}

export function demoWhy(): string {
  return (
    `Areas with higher estimated Muslim population share often leaned MVA in November in this chart, with exceptions. ` +
    `Community shares here are estimates for pattern only, not official census figures.`
  );
}

export { splitTicketACs, lsAllianceForAC };
