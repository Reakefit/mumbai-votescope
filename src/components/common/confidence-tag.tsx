import { ShieldCheck, ShieldAlert, Shield } from "lucide-react";

export type ConfidenceLevel = "high" | "medium" | "low";

const CFG: Record<ConfidenceLevel, { label: string; cls: string; Icon: typeof Shield; what: string }> = {
  high: {
    label: "High confidence",
    cls: "border-emerald-500/35 bg-emerald-500/10 text-emerald-300",
    Icon: ShieldCheck,
    what: "Verified seat outcome from ECI / IndiaVotes counts.",
  },
  medium: {
    label: "Medium confidence",
    cls: "border-amber-500/35 bg-amber-500/10 text-amber-300",
    Icon: ShieldAlert,
    what: "Alliance-level pattern derived from aggregate winners. Plausible, but not booth-proven.",
  },
  low: {
    label: "Low confidence",
    cls: "border-rose-500/35 bg-rose-500/10 text-rose-300",
    Icon: Shield,
    what: "Interpretation of voter motive. Reporting-supported, not measurable from results alone.",
  },
};

export function ConfidenceTag({ level, inline }: { level: ConfidenceLevel; inline?: boolean }) {
  const c = CFG[level];
  const I = c.Icon;
  return (
    <span
      title={c.what}
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${c.cls} ${inline ? "" : "mt-1"}`}
    >
      <I className="h-3 w-3" />
      {c.label}
    </span>
  );
}
