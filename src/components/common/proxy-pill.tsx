import { Info } from "lucide-react";

/**
 * Inline pill used wherever a metric is a proxy or fallback rather than a
 * direct measurement. Hovering shows the explanation.
 */
export function ProxyPill({
  label = "District proxy",
  tooltip = "Value shown is the district-average turnout used as an AC-level proxy — not a constituency count.",
  className = "",
}: {
  label?: string;
  tooltip?: string;
  className?: string;
}) {
  return (
    <span
      title={tooltip}
      className={`inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-amber-200 ${className}`}
    >
      <Info className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}

export function PcParentPill({ className = "" }: { className?: string }) {
  return (
    <ProxyPill
      label="PC-parent fallback"
      tooltip="May value here repeats the parent Lok Sabha seat winner, not an AC-segment count. Form 20 not yet integrated."
      className={className}
    />
  );
}
