import mapData from "@/data/mumbai-svg.json";
import { ACS, type AC } from "@/data/constituencies";
import { ALLIANCE_COLOR } from "@/lib/election-colors";
import { useState, useMemo } from "react";

type Cycle = "ls" | "vs";

const FEATURES = (mapData as any).features as Array<{
  ac_no: number; ac_name: string; path: string; cx: number; cy: number;
}>;
const MAP_W = (mapData as any).width as number;
const MAP_H = (mapData as any).height as number;

interface Props {
  cycle: Cycle;
  onSelect?: (ac: AC) => void;
  highlightPC?: string;
  showLabels?: boolean;
}

export function MumbaiMap({ cycle, onSelect, highlightPC, showLabels }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; ac: AC } | null>(null);

  const acByNumber = useMemo(() => {
    const m = new Map<number, AC>();
    ACS.forEach((a) => m.set(a.ac_number, a));
    return m;
  }, []);

  return (
    <div className="relative w-full h-full">
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {FEATURES.map((f) => {
          const ac = acByNumber.get(f.ac_no);
          if (!ac) return null;
          const result = cycle === "ls" ? ac.lok_sabha_2024 : ac.vidhan_sabha_2024;
          const fill = ALLIANCE_COLOR[result.winning_alliance];
          const dim = highlightPC && highlightPC !== "all" && ac.pc_slug !== highlightPC;
          const active = hover === f.ac_no;
          return (
            <path
              key={f.ac_no}
              d={f.path}
              fill={fill}
              fillOpacity={dim ? 0.18 : active ? 1 : 0.78}
              stroke={active ? "white" : "oklch(1 0 0 / 0.25)"}
              strokeWidth={active ? 2.5 : 0.6}
              filter={active ? "url(#glow)" : undefined}
              style={{ cursor: "pointer", transition: "fill-opacity 0.15s" }}
              onMouseEnter={(e) => {
                setHover(f.ac_no);
                const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, ac });
              }}
              onMouseMove={(e) => {
                const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                setTooltip((t) => t ? { x: e.clientX - rect.left, y: e.clientY - rect.top, ac } : t);
              }}
              onMouseLeave={() => { setHover(null); setTooltip(null); }}
              onClick={() => onSelect?.(ac)}
            />
          );
        })}

        {showLabels && FEATURES.map((f) => (
          <text key={`l-${f.ac_no}`} x={f.cx} y={f.cy}
            fontSize={18} textAnchor="middle"
            className="fill-black/85 pointer-events-none" fontWeight={600}
            style={{ paintOrder: "stroke", stroke: "oklch(1 0 0 / 0.6)", strokeWidth: 2 }}>
            {f.ac_name.length > 12 ? f.ac_name.slice(0, 11) + "…" : f.ac_name}
          </text>
        ))}
      </svg>

      {tooltip && <MapTooltip x={tooltip.x} y={tooltip.y} ac={tooltip.ac} cycle={cycle} />}
    </div>
  );
}

function MapTooltip({ x, y, ac, cycle }: { x: number; y: number; ac: AC; cycle: Cycle }) {
  const k = cycle === "ls" ? ac.lok_sabha_2024 : ac.vidhan_sabha_2024;
  return (
    <div
      className="pointer-events-none absolute z-20 rounded-md border border-border bg-popover/95 backdrop-blur px-3 py-2 text-xs shadow-xl min-w-[210px]"
      style={{ left: Math.min(x + 14, 400), top: Math.min(y + 14, 400) }}
    >
      <div className="font-semibold">{ac.ac_name} <span className="text-muted-foreground num text-[10px]">#{ac.ac_number}</span></div>
      <div className="text-[10px] text-muted-foreground mb-1.5">{ac.parent_pc}</div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="h-2 w-2 rounded-sm" style={{ background: ALLIANCE_COLOR[k.winning_alliance] }} />
        <span className="font-medium">{k.winning_party}</span>
        <span className="text-muted-foreground text-[11px] truncate">{k.candidate}</span>
      </div>
      <div className="grid grid-cols-3 gap-1 text-[10px]">
        <Mini label="Share" value={`${k.vote_share_pct.toFixed(1)}%`} />
        <Mini label="Margin" value={k.margin_votes.toLocaleString("en-IN")} />
        <Mini label="Turnout" value={`${k.turnout_pct.toFixed(1)}%`} />
      </div>
      {ac.metrics.alliance_split_ticket && (
        <div className="mt-1.5 text-[10px] text-primary uppercase tracking-wider">⚡ Split-ticket AC</div>
      )}
      <div className="mt-1.5 text-[10px] text-muted-foreground">Click for full breakdown →</div>
    </div>
  );
}
function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-foreground num">{value}</div>
    </div>
  );
}
