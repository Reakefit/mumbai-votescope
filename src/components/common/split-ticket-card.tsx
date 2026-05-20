import type { AC, Alliance } from "@/data/constituencies";
import { ALLIANCE_COLOR } from "@/lib/election-colors";
import { lsAllianceForAC } from "@/data/pc-results";
import { ALLIANCE_LABELS } from "@/data/case-study";

export function SplitTicketCard({ ac, onClick }: { ac: AC; onClick?: () => void }) {
  const lsAlliance = lsAllianceForAC(ac.pc_slug);
  const vsAlliance = ac.vidhan_sabha_2024.winning_alliance;
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`text-left rounded-md border border-border bg-background/60 px-3 py-3 w-full ${onClick ? "hover:border-primary/50 transition-colors" : ""}`}
    >
      <div className="text-sm font-medium">{ac.ac_name}</div>
      <div className="text-[10px] text-muted-foreground">{ac.parent_pc}</div>
      <div className="mt-2 space-y-1.5">
        <Row label="May" alliance={lsAlliance} suffix="Lok Sabha (Parliament)" />
        <Row label="November" alliance={vsAlliance} suffix="Vidhan Sabha (State)" />
      </div>
      <div className="text-[10px] text-muted-foreground mt-2">
        Voted {ALLIANCE_LABELS[lsAlliance]} in May, {ALLIANCE_LABELS[vsAlliance]} in November
      </div>
    </Tag>
  );
}

function Row({ label, alliance, suffix }: { label: string; alliance: Alliance; suffix: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="w-16 shrink-0 text-muted-foreground">{label}</span>
      <span
        className="inline-flex rounded px-2 py-0.5 text-[10px] font-medium"
        style={{
          background: `color-mix(in oklab, ${ALLIANCE_COLOR[alliance]} 25%, transparent)`,
          color: ALLIANCE_COLOR[alliance],
        }}
      >
        {alliance} · {suffix}
      </span>
    </div>
  );
}
