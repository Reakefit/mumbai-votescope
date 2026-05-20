const ALLIANCE_COLOR = {
  Mahayuti: "var(--mahayuti)",
  MVA: "var(--mva)"
};
const PARTY_COLOR = {
  BJP: "oklch(0.74 0.18 50)",
  SHS: "oklch(0.78 0.16 70)",
  NCP: "oklch(0.82 0.14 85)",
  INC: "oklch(0.66 0.17 145)",
  "SS(UBT)": "oklch(0.70 0.16 165)",
  "NCP(SP)": "oklch(0.74 0.13 185)"
};
function fmtPct(n, sign = false) {
  const s = sign && n > 0 ? "+" : "";
  return `${s}${n.toFixed(1)}%`;
}
function fmtInt(n) {
  return new Intl.NumberFormat("en-IN").format(n);
}
export {
  ALLIANCE_COLOR as A,
  PARTY_COLOR as P,
  fmtPct as a,
  fmtInt as f
};
