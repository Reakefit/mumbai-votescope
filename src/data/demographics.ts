// Mock demographic profile per AC. Illustrative tiers calibrated to known
// Mumbai geography (e.g. Malabar Hill = affluent; Dharavi = dense low-income).
import type { AC } from "./constituencies";

export type DensityTier = "Ultra-dense" | "Dense" | "Mixed" | "Sparse";
export type IncomeTier = "Affluent" | "Middle" | "Mixed" | "Low-income";
export type GeoZone = "Island City" | "Western Suburbs" | "Eastern Suburbs";

export interface Demographics {
  density: DensityTier;
  income: IncomeTier;
  geo: GeoZone;
  muslim_share_pct: number; // approximate community share, illustrative
}

export const DEMOGRAPHICS: Record<number, Demographics> = {
  // Mumbai South, Island City
  187: { density: "Mixed",       income: "Affluent",   geo: "Island City", muslim_share_pct: 12 },
  186: { density: "Ultra-dense", income: "Mixed",      geo: "Island City", muslim_share_pct: 38 },
  185: { density: "Sparse",      income: "Affluent",   geo: "Island City", muslim_share_pct:  6 },
  184: { density: "Ultra-dense", income: "Mixed",      geo: "Island City", muslim_share_pct: 41 },
  183: { density: "Dense",       income: "Low-income", geo: "Island City", muslim_share_pct: 28 },
  182: { density: "Dense",       income: "Mixed",      geo: "Island City", muslim_share_pct: 18 },
  // Mumbai South Central
  181: { density: "Dense",       income: "Middle",     geo: "Island City", muslim_share_pct: 22 },
  180: { density: "Dense",       income: "Middle",     geo: "Island City", muslim_share_pct: 14 },
  179: { density: "Dense",       income: "Mixed",      geo: "Island City", muslim_share_pct: 18 },
  178: { density: "Ultra-dense", income: "Low-income", geo: "Island City", muslim_share_pct: 32 },
  173: { density: "Dense",       income: "Mixed",      geo: "Eastern Suburbs", muslim_share_pct: 16 },
  172: { density: "Dense",       income: "Mixed",      geo: "Eastern Suburbs", muslim_share_pct: 36 },
  // Mumbai North Central
  177: { density: "Mixed",       income: "Affluent",   geo: "Western Suburbs", muslim_share_pct: 14 },
  176: { density: "Dense",       income: "Middle",     geo: "Western Suburbs", muslim_share_pct: 22 },
  175: { density: "Dense",       income: "Mixed",      geo: "Western Suburbs", muslim_share_pct: 28 },
  174: { density: "Ultra-dense", income: "Low-income", geo: "Eastern Suburbs", muslim_share_pct: 34 },
  168: { density: "Dense",       income: "Middle",     geo: "Eastern Suburbs", muslim_share_pct: 24 },
  167: { density: "Mixed",       income: "Affluent",   geo: "Western Suburbs", muslim_share_pct:  9 },
  // Mumbai North East
  171: { density: "Ultra-dense", income: "Low-income", geo: "Eastern Suburbs", muslim_share_pct: 42 },
  170: { density: "Dense",       income: "Middle",     geo: "Eastern Suburbs", muslim_share_pct: 12 },
  169: { density: "Dense",       income: "Middle",     geo: "Eastern Suburbs", muslim_share_pct: 10 },
  157: { density: "Dense",       income: "Middle",     geo: "Eastern Suburbs", muslim_share_pct: 14 },
  156: { density: "Dense",       income: "Mixed",      geo: "Eastern Suburbs", muslim_share_pct: 12 },
  155: { density: "Mixed",       income: "Affluent",   geo: "Eastern Suburbs", muslim_share_pct:  8 },
  // Mumbai North West
  166: { density: "Dense",       income: "Middle",     geo: "Western Suburbs", muslim_share_pct: 18 },
  165: { density: "Mixed",       income: "Affluent",   geo: "Western Suburbs", muslim_share_pct: 14 },
  164: { density: "Mixed",       income: "Affluent",   geo: "Western Suburbs", muslim_share_pct: 16 },
  163: { density: "Dense",       income: "Middle",     geo: "Western Suburbs", muslim_share_pct: 18 },
  159: { density: "Dense",       income: "Middle",     geo: "Western Suburbs", muslim_share_pct: 12 },
  158: { density: "Dense",       income: "Mixed",      geo: "Western Suburbs", muslim_share_pct: 26 },
  // Mumbai North
  162: { density: "Dense",       income: "Middle",     geo: "Western Suburbs", muslim_share_pct: 24 },
  161: { density: "Mixed",       income: "Middle",     geo: "Western Suburbs", muslim_share_pct: 10 },
  160: { density: "Mixed",       income: "Middle",     geo: "Western Suburbs", muslim_share_pct:  9 },
  154: { density: "Dense",       income: "Middle",     geo: "Eastern Suburbs", muslim_share_pct: 12 },
  153: { density: "Mixed",       income: "Middle",     geo: "Western Suburbs", muslim_share_pct: 11 },
  152: { density: "Mixed",       income: "Affluent",   geo: "Western Suburbs", muslim_share_pct:  8 },
};

export function withDemographics(ac: AC) {
  return { ...ac, demo: DEMOGRAPHICS[ac.ac_number] };
}
