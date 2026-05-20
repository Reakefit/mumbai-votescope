import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import type { AC } from "@/data/constituencies";
import { ALLIANCE_COLOR, fmtInt, fmtPct } from "@/lib/election-colors";

export function ACDetailSheet({ ac, onClose }: { ac: AC | null; onClose: () => void }) {
  return (
    <Sheet open={!!ac} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        {ac && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-baseline gap-2">
                {ac.ac_name}
                <span className="text-xs text-muted-foreground num">#{ac.ac_number}</span>
              </SheetTitle>
              <SheetDescription>{ac.parent_pc} · Localized asset report</SheetDescription>
            </SheetHeader>

            <div className="px-4 mt-4 grid grid-cols-2 gap-3">
              <CycleCard label="Lok Sabha 2024" data={ac.lok_sabha_2024} />
              <CycleCard label="Vidhan Sabha 2024" data={ac.vidhan_sabha_2024} />
            </div>

            <div className="px-4 mt-5 space-y-2">
              <MetricRow label="Vote-share swing (LS→VS)" value={fmtPct(ac.metrics.vote_share_swing_pct, true)} />
              <MetricRow label="Turnout delta" value={fmtPct(ac.metrics.turnout_delta_pct, true)} />
              <MetricRow
                label="Alliance split-ticket"
                value={ac.metrics.alliance_split_ticket ? "Yes — voters switched alliance" : "No — consistent"}
                accent={ac.metrics.alliance_split_ticket}
              />
            </div>

            <div className="px-4 mt-6 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
              Mock illustrative data. Calibrated to reflect the macro 2024 pattern across Mumbai.
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CycleCard({ label, data }: { label: string; data: AC["lok_sabha_2024"] }) {
  return (
    <div className="rounded-md border border-border p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="h-2 w-2 rounded-sm" style={{ background: ALLIANCE_COLOR[data.winning_alliance] }} />
        <span className="text-sm font-semibold">{data.winning_party}</span>
      </div>
      <div className="text-xs">{data.candidate}</div>
      <div className="mt-2 grid grid-cols-3 gap-1 text-[10px] text-muted-foreground">
        <Mini label="Share" value={`${data.vote_share_pct.toFixed(1)}%`} />
        <Mini label="Margin" value={fmtInt(data.margin_votes)} />
        <Mini label="Turnout" value={`${data.turnout_pct.toFixed(1)}%`} />
      </div>
    </div>
  );
}
function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="uppercase tracking-wider">{label}</div>
      <div className="text-foreground num text-xs">{value}</div>
    </div>
  );
}
function MetricRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center rounded-md border border-border px-3 py-2 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className={`num ${accent ? "text-primary font-semibold" : ""}`}>{value}</span>
    </div>
  );
}
