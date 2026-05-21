import { AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

const LIMITATIONS = [
  {
    title: "May results on AC tiles repeat the parent Lok Sabha winner",
    body: "We don't yet have AC-segment-level Form 20 leads for Mumbai. When a tile is coloured 'MVA in May', it means the parliamentary seat that covers that ward went to MVA — not that the ward itself was counted separately. Statements about 'voted MVA in May' should be read as 'lives inside an MVA-won Lok Sabha seat'.",
  },
  {
    title: "Assembly turnout is a district proxy, not an AC count",
    body: "Vidhan Sabha turnout values are Mumbai City (52.65%) and Mumbai Suburban (56.39%) district averages applied to every AC in that district. They are not constituency-level participation rates.",
  },
  {
    title: "Demographic charts are illustrative, not census microdata",
    body: "Income tier, density, geographic zone, and community share are hand-tuned estimates calibrated to known Mumbai geography. They sit in an 'exploratory' lens, not the evidentiary one.",
  },
  {
    title: "'Winner-share difference' is not a classic swing",
    body: "What we plot as a 'shift' is November-winner share minus May-winner share on the same tile. When the winner changes between elections, the two numbers belong to different parties. It's a useful comparison, not a true swing.",
  },
];

export function LimitationsBox({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-xl border border-amber-500/35 bg-amber-500/5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-amber-200">
          <AlertTriangle className="h-4 w-4" />
          Read this before the charts — what this dataset can and cannot tell you
        </span>
        <ChevronDown
          className={`h-4 w-4 text-amber-200 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 text-xs leading-relaxed">
          <ul className="space-y-3">
            {LIMITATIONS.map((l) => (
              <li key={l.title}>
                <div className="font-medium text-foreground">{l.title}</div>
                <div className="text-muted-foreground mt-1">{l.body}</div>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-muted-foreground pt-1 border-t border-amber-500/25">
            Full definitions in{" "}
            <Link to="/methodology" className="text-amber-300 hover:underline">
              Methodology
            </Link>
            .
          </p>
        </div>
      )}
    </section>
  );
}
