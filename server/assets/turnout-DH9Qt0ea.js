import { K as jsxRuntimeExports } from "./server-BQFeF0xS.js";
import { s as useFilters, l as filterByPC, S as Shell } from "./shell-Bg1mD7Ab.js";
import { a as fmtPct } from "./election-colors-D5q5oaPB.js";
import { c as ResponsiveContainer, d as ScatterChart, X as XAxis, Y as YAxis, Z as ZAxis, R as ReferenceLine, T as Tooltip, S as Scatter, a as Cell } from "./ScatterChart-CCRX3K0V.js";
import { C as CartesianGrid } from "./CartesianGrid-CCKEavOC.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-7feY-ONK.js";
const tipStyle = {
  background: "oklch(0.205 0.014 250)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 6,
  fontSize: 12
};
function Page() {
  const {
    pc
  } = useFilters();
  const acs = filterByPC(pc);
  const medianTurnout = median(acs.map((a) => (a.lok_sabha_2024.turnout_pct + a.vidhan_sabha_2024.turnout_pct) / 2));
  const medianMargin = median(acs.map((a) => a.vidhan_sabha_2024.margin_votes));
  const quadrantData = acs.map((a) => ({
    name: a.ac_name,
    turnout: (a.lok_sabha_2024.turnout_pct + a.vidhan_sabha_2024.turnout_pct) / 2,
    margin: a.vidhan_sabha_2024.margin_votes,
    alliance: a.vidhan_sabha_2024.winning_alliance
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Turnout in May vs November" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Did fewer people vote in the state election? Which areas had high turnout but still changed winner?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card/40 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-tight mb-3", children: "Turnout heatmap · LS vs VS vs delta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs num", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-normal px-2 py-1.5", children: "AC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-normal px-2 py-1.5", children: "PC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5", children: "LS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5", children: "VS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5", children: "Δ" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: acs.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 font-medium", children: a.ac_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-muted-foreground", children: a.parent_pc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-2 py-1.5 text-center", style: {
            background: heatCell(a.lok_sabha_2024.turnout_pct)
          }, children: [
            a.lok_sabha_2024.turnout_pct.toFixed(1),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-2 py-1.5 text-center", style: {
            background: heatCell(a.vidhan_sabha_2024.turnout_pct)
          }, children: [
            a.vidhan_sabha_2024.turnout_pct.toFixed(1),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-center", style: {
            background: deltaCell(a.metrics.turnout_delta_pct)
          }, children: fmtPct(a.metrics.turnout_delta_pct, true) })
        ] }, a.ac_number)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card/40 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-tight", children: "Turnout vs winning margin (November)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: [
          "VS margin · Median turnout ",
          medianTurnout.toFixed(1),
          "% · Median margin ",
          Math.round(medianMargin).toLocaleString("en-IN")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-[10px] uppercase tracking-wider text-muted-foreground mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "High turnout · Low margin → ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Battlegrounds" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          "High turnout · High margin → ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Ideological fortresses" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Low turnout · Low margin → ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Voter apathy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          "Low turnout · High margin → ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Silent consolidation" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-96", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ScatterChart, { margin: {
        top: 8,
        right: 16,
        bottom: 30,
        left: 8
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "oklch(1 0 0 / 0.05)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", dataKey: "turnout", name: "Turnout", unit: "%", domain: [46, 56], tick: {
          fontSize: 10,
          fill: "oklch(0.68 0.018 250)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { type: "number", dataKey: "margin", name: "Margin", tickFormatter: (v) => `${(v / 1e3).toFixed(0)}k`, tick: {
          fontSize: 10,
          fill: "oklch(0.68 0.018 250)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ZAxis, { range: [80, 80] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ReferenceLine, { x: medianTurnout, stroke: "oklch(1 0 0 / 0.25)", strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ReferenceLine, { y: medianMargin, stroke: "oklch(1 0 0 / 0.25)", strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tipStyle, cursor: {
          stroke: "oklch(1 0 0 / 0.2)"
        }, formatter: (value, name) => {
          if (name === "Margin") return [Number(value).toLocaleString("en-IN") + " votes", name];
          if (name === "Turnout") return [Number(value).toFixed(1) + "%", name];
          return [value, name];
        }, labelFormatter: (_, payload) => payload && payload[0]?.payload?.name || "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Scatter, { data: quadrantData, children: quadrantData.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: d.alliance === "Mahayuti" ? "var(--mahayuti)" : "var(--mva)" }, i)) })
      ] }) }) })
    ] })
  ] }) });
}
function median(arr) {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
function heatCell(pct) {
  const t = Math.max(0, Math.min(1, (pct - 48) / 7));
  return `color-mix(in oklab, var(--mahayuti) ${Math.round(t * 50)}%, oklch(0.24 0.013 250))`;
}
function deltaCell(d) {
  if (d > 0) return `color-mix(in oklab, var(--mva) ${Math.min(60, Math.abs(d) * 25)}%, transparent)`;
  return `color-mix(in oklab, var(--destructive) ${Math.min(60, Math.abs(d) * 25)}%, transparent)`;
}
export {
  Page as component
};
