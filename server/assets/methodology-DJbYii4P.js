import { K as jsxRuntimeExports } from "./server-BQFeF0xS.js";
import { L as Link } from "./router-7feY-ONK.js";
import { S as Shell } from "./shell-Bg1mD7Ab.js";
import { E as ELECTION_TIMELINE, D as DATA_SOURCES } from "./sources-TFVGjDvG.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "max-w-3xl mx-auto py-8 space-y-6 text-sm leading-relaxed", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/analysis", className: "text-xs text-primary hover:underline", children: "← Back to analysis" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight mt-3", children: "Methodology" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "How data in Mumbai VoteScope was assembled, what each metric means, and known limitations." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Scope" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-muted-foreground", children: [
        "Mumbai only: 6 Lok Sabha parliamentary constituencies and 36 Vidhan Sabha assembly constituencies. Elections:",
        ELECTION_TIMELINE.lokSabha.period,
        " (Parliament) and ",
        ELECTION_TIMELINE.vidhanSabha.period,
        " (State)."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Sources" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: DATA_SOURCES.lokSabha2024.note }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: DATA_SOURCES.vidhanSabha2024.note }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 list-disc pl-5 space-y-1 text-primary", children: [...DATA_SOURCES.lokSabha2024.urls, ...DATA_SOURCES.vidhanSabha2024.urls].map((url) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: url, target: "_blank", rel: "noreferrer", className: "hover:underline break-all", children: url }) }, url)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Lok Sabha on assembly map" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "May results on each assembly tile repeat the parent parliamentary seat winner (6 city-wide results). This is for visual comparison only, not AC-level parliamentary counts." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Split-ticket definition" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "An area is split-ticket when the May parliamentary alliance for its PC differs from the November assembly winning alliance for that AC. Count: 18 of 36 in the current dataset (15 MVA→Mahayuti, 3 reverse)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Swing metric" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "vote_share_swing_pct = November winner vote share minus May winner vote share on the same tile. It is not a classic party swing (e.g. BJP share minus Congress share)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Demographics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Income tier, density, geo zone, and Muslim population share in charts are illustrative estimates for pattern exploration, not official census microdata." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Narrative analysis" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Long-form text on the Analysis page cites news outlets and separates verified counts from interpretation. It does not use exit polls or booth-level microdata in this version." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pt-4 border-t border-border", children: "Full written deliverable: docs/KEY_INSIGHTS.md in the repository." })
  ] }) });
}
export {
  Page as component
};
