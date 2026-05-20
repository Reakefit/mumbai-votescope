import { T as reactExports, K as jsxRuntimeExports } from "./server-BQFeF0xS.js";
import { A as ACS, s as useFilters, S as Shell } from "./shell-Bg1mD7Ab.js";
import { A as ALLIANCE_COLOR } from "./election-colors-D5q5oaPB.js";
import { A as ACDetailSheet } from "./ac-detail-sheet-BPxmjRxl.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-7feY-ONK.js";
import "./index-C7JbIugg.js";
import "./data-attribution-BRDNnm3f.js";
import "./sources-TFVGjDvG.js";
const CELL = 56;
const GAP = 4;
const COLS = 6;
const ROWS = 6;
function ChoroplethMap({ cycle, title, hoveredAC, setHoveredAC, onSelect, highlightPC }) {
  const w = COLS * CELL + (COLS + 1) * GAP;
  const h = ROWS * CELL + (ROWS + 1) * GAP + 28;
  const [tooltip, setTooltip] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card/40 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-tight", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: cycle === "ls" ? "May 2024" : "Nov 2024" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: `0 0 ${w} ${h}`, className: "w-full h-auto", children: [
        Array.from({ length: ROWS }).map((_, r) => {
          const acRow = ACS.filter((a) => a.row === ROWS - 1 - r);
          const pcName = acRow[0]?.parent_pc ?? "";
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: 2,
              y: GAP + r * (CELL + GAP) + CELL / 2 + 4,
              className: "fill-muted-foreground",
              fontSize: 8,
              opacity: 0.6,
              children: pcName
            },
            r
          );
        }),
        ACS.map((ac) => {
          const key = cycle === "ls" ? ac.lok_sabha_2024 : ac.vidhan_sabha_2024;
          const x = GAP + ac.col * (CELL + GAP);
          const y = GAP + (ROWS - 1 - ac.row) * (CELL + GAP);
          const isHover = hoveredAC === ac.ac_number;
          const dimByPC = highlightPC && highlightPC !== "all" && ac.pc_slug !== highlightPC;
          const fill = ALLIANCE_COLOR[key.winning_alliance];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "g",
            {
              onMouseEnter: (e) => {
                setHoveredAC(ac.ac_number);
                const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, ac });
              },
              onMouseMove: (e) => {
                const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, ac });
              },
              onMouseLeave: () => {
                setHoveredAC(null);
                setTooltip(null);
              },
              onClick: () => onSelect?.(ac),
              style: { cursor: "pointer" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "rect",
                  {
                    x,
                    y,
                    width: CELL,
                    height: CELL,
                    rx: 6,
                    fill,
                    opacity: dimByPC ? 0.18 : isHover ? 1 : 0.85,
                    stroke: isHover ? "white" : "transparent",
                    strokeWidth: isHover ? 2 : 0
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: x + 6, y: y + 14, fontSize: 8, className: "fill-black/70", fontWeight: 600, children: ac.ac_number }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: x + CELL / 2,
                    y: y + CELL / 2 + 3,
                    fontSize: 9,
                    textAnchor: "middle",
                    className: "fill-black",
                    fontWeight: 600,
                    children: ac.ac_name.length > 10 ? ac.ac_name.slice(0, 9) + "…" : ac.ac_name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: x + CELL / 2,
                    y: y + CELL - 6,
                    fontSize: 8,
                    textAnchor: "middle",
                    className: "fill-black/75 num",
                    children: key.winning_party
                  }
                )
              ]
            },
            ac.ac_number
          );
        })
      ] }),
      tooltip && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "pointer-events-none absolute z-10 rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-lg min-w-[200px]",
          style: { left: Math.min(tooltip.x + 12, 400), top: tooltip.y + 12 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold", children: [
              tooltip.ac.ac_name,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground num", children: [
                "#",
                tooltip.ac.ac_number
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mb-1.5", children: tooltip.ac.parent_pc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tip, { ac: tooltip.ac, cycle })
          ]
        }
      )
    ] })
  ] });
}
function Tip({ ac, cycle }) {
  const k = cycle === "ls" ? ac.lok_sabha_2024 : ac.vidhan_sabha_2024;
  const swing = ac.metrics.vote_share_swing_pct;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Winner", value: `${k.candidate} (${k.winning_party})` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Vote share", value: `${k.vote_share_pct.toFixed(1)}%` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Margin", value: k.margin_votes.toLocaleString("en-IN") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Turnout", value: `${k.turnout_pct.toFixed(1)}%` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "LS→VS swing", value: `${swing > 0 ? "+" : ""}${swing.toFixed(1)}%`, accent: true }),
    ac.metrics.alliance_split_ticket && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] text-primary uppercase tracking-wider", children: "Changed May vs Nov" })
  ] });
}
function Row({ label, value, accent }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `num ${accent ? "text-primary" : ""}`, children: value })
  ] });
}
function Page() {
  const {
    pc
  } = useFilters();
  const [hovered, setHovered] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Shell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Compare May and November on the map" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Left: who won Parliament in May. Right: who won the State Assembly in November. Hover one area to highlight it on both maps." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChoroplethMap, { cycle: "ls", title: "May 2024 · Lok Sabha", hoveredAC: hovered, setHoveredAC: setHovered, onSelect: setSelected, highlightPC: pc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChoroplethMap, { cycle: "vs", title: "Nov 2024 · Vidhan Sabha", hoveredAC: hovered, setHoveredAC: setHovered, onSelect: setSelected, highlightPC: pc })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-border bg-card/30 p-3 text-[11px] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "May map: colour follows the MP winner for that parliamentary seat (6 seats city-wide). November map: colour follows the MLA winner for each assembly area (36 areas). Hover one tile to see it on both maps." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ACDetailSheet, { ac: selected, onClose: () => setSelected(null) })
  ] });
}
export {
  Page as component
};
