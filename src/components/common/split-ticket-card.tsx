import type { AC, Alliance } from "@/data/constituencies";
import { ALLIANCE_COLOR } from "@/lib/election-colors";
import { lsAllianceForACBest } from "@/lib/divergence";
import { ALLIANCE_LABELS } from "@/data/case-study";
import { PcParentPill } from "@/components/common/proxy-pill";

export function SplitTicketCard({ ac, onClick }: { ac: AC; onClick?: () => void }) {
  const { alliance: lsAlliance, source } = lsAllianceForACBest(ac);
  const vsAlliance = ac.vidhan_sabha_2024.winning_alliance;
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`text-left rounded-md border border-border bg-background/60 px-3 py-3 w-full ${onClick ? "hover:border-primary/50 transition-colors" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">{ac.ac_name}</div>
          <div className="text-[10px] text-muted-foreground truncate">{ac.parent_pc}</div>
        </div>
        {source === "pc_parent" && <PcParentPill />}
      </div>
      <div className="mt-2 space-y-1.5">
        <Row label="May (Parl.)" alliance={lsAlliance} suffix={source === "pc_parent" ? "parent PC winner" : "AC-segment lead"} />
        <Row label="Nov (State)" alliance={vsAlliance} suffix="AC winner" />
      </div>
      <div className="text-[10px] text-muted-foreground mt-2 leading-snug">
        {source === "pc_parent"
          ? `Lives inside a Lok Sabha seat won by ${ALLIANCE_LABELS[lsAlliance]}; elected a ${ALLIANCE_LABELS[vsAlliance]} MLA. Not yet proven as ballot-level split-ticket.`
          : `${ALLIANCE_LABELS[lsAlliance]} led the AC segment in May; ${ALLIANCE_LABELS[vsAlliance]} won the AC in November. True split-ticket signal.`}
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
