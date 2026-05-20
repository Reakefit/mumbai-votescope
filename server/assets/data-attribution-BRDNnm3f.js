import { K as jsxRuntimeExports } from "./server-BQFeF0xS.js";
import { D as DATA_SOURCES } from "./sources-TFVGjDvG.js";
function DataAttribution({ compact }) {
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground leading-relaxed", children: [
      "Election results: ECI and",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: DATA_SOURCES.lokSabha2024.urls[1], className: "underline hover:text-foreground", target: "_blank", rel: "noreferrer", children: "IndiaVotes" }),
      ". Community estimates are indicative only."
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-muted/20 p-3 text-[11px] text-muted-foreground space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Sources" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: DATA_SOURCES.lokSabha2024.note }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: DATA_SOURCES.vidhanSabha2024.note }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: DATA_SOURCES.lokSabha2024.urls[0], className: "underline hover:text-foreground", target: "_blank", rel: "noreferrer", children: "ECI Lok Sabha" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: DATA_SOURCES.vidhanSabha2024.urls[0], className: "underline hover:text-foreground", target: "_blank", rel: "noreferrer", children: "ECI Vidhan Sabha" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: DATA_SOURCES.lokSabha2024.urls[1], className: "underline hover:text-foreground", target: "_blank", rel: "noreferrer", children: "IndiaVotes LS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: DATA_SOURCES.vidhanSabha2024.urls[1], className: "underline hover:text-foreground", target: "_blank", rel: "noreferrer", children: "IndiaVotes VS" })
    ] })
  ] });
}
export {
  DataAttribution as D
};
