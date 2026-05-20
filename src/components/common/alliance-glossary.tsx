import { ALLIANCE_COLOR } from "@/lib/election-colors";
import { ALLIANCES } from "@/data/case-study";

export function AllianceGlossary() {
  return (
    <div className="rounded-lg border border-border bg-card/60 p-3 lg:p-4 w-full lg:max-w-[320px]">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Alliances on this map</div>
      <div className="space-y-3">
        {ALLIANCES.map((a) => (
          <div key={a.short} className="flex gap-2.5">
            <span
              className="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ background: ALLIANCE_COLOR[a.short] }}
            />
            <div>
              <div className="text-xs font-semibold" style={{ color: ALLIANCE_COLOR[a.short] }}>
                {a.short}
              </div>
              <div className="text-[10px] text-muted-foreground">{a.full}</div>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{a.members}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
