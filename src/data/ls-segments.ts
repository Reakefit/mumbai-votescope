/**
 * AC-segment-level Lok Sabha 2024 leads.
 *
 * Status: NOT YET POPULATED. The authoritative source is ECI Form 20 Part II
 * (https://ceoelection.maharashtra.gov.in/ceo/Form20-Part-II.aspx), which is
 * scan-only PDFs. Until those are parsed, every AC falls back to the parent
 * PC winner — and the UI labels that fallback explicitly.
 *
 * When a row is added here, it should reflect the AC-segment lead inside the
 * Lok Sabha vote (which alliance polled most votes inside that AC during the
 * May 2024 Lok Sabha election), not the PC-wide winner.
 */
import type { Alliance } from "./constituencies";

export type LsSource = "ac_segment" | "pc_parent";

export interface LsSegmentLead {
  ac_number: number;
  alliance: Alliance;
  winner_share_pct?: number;
  margin_votes?: number;
}

/** Add Form-20-sourced AC-segment leads here as they get verified. */
export const LS_SEGMENT_LEADS: Record<number, LsSegmentLead> = {};

export function lsSegmentFor(acNumber: number): LsSegmentLead | undefined {
  return LS_SEGMENT_LEADS[acNumber];
}

export function lsSourceFor(acNumber: number): LsSource {
  return LS_SEGMENT_LEADS[acNumber] ? "ac_segment" : "pc_parent";
}

export const HAS_ANY_SEGMENT_DATA = Object.keys(LS_SEGMENT_LEADS).length > 0;
