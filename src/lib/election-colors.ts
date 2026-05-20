import type { Alliance, Party } from "@/data/constituencies";

export const ALLIANCE_COLOR: Record<Alliance, string> = {
  Mahayuti: "var(--mahayuti)",
  MVA: "var(--mva)",
};

// Party sub-shades, derived around alliance hue
export const PARTY_COLOR: Record<Party, string> = {
  BJP: "oklch(0.74 0.18 50)",
  SHS: "oklch(0.78 0.16 70)",
  NCP: "oklch(0.82 0.14 85)",
  INC: "oklch(0.66 0.17 145)",
  "SS(UBT)": "oklch(0.70 0.16 165)",
  "NCP(SP)": "oklch(0.74 0.13 185)",
};

export function fmtPct(n: number, sign = false) {
  const s = sign && n > 0 ? "+" : "";
  return `${s}${n.toFixed(1)}%`;
}
export function fmtInt(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}
