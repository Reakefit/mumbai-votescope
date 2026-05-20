import { ACS, type AC } from "@/data/constituencies";
import { ALLIANCE_COLOR } from "@/lib/election-colors";
import { useState } from "react";

type Cycle = "ls" | "vs";

interface Props {
  cycle: Cycle;
  title: string;
  hoveredAC: number | null;
  setHoveredAC: (n: number | null) => void;
  onSelect?: (ac: AC) => void;
  highlightPC?: string;
}

const CELL = 56;
const GAP = 4;
const COLS = 6;
const ROWS = 6;

export function ChoroplethMap({ cycle, title, hoveredAC, setHoveredAC, onSelect, highlightPC }: Props) {
  const w = COLS * CELL + (COLS + 1) * GAP;
  const h = ROWS * CELL + (ROWS + 1) * GAP + 28;
  const [tooltip, setTooltip] = useState<{ x: number; y: number; ac: AC } | null>(null);

  return (
    <div className="rounded-lg border border-border bg-card/40 p-4">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {cycle === "ls" ? "May 2024" : "Nov 2024"}
        </span>
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
          {/* PC row labels */}
          {Array.from({ length: ROWS }).map((_, r) => {
            const acRow = ACS.filter(a => a.row === ROWS - 1 - r);
            const pcName = acRow[0]?.parent_pc ?? "";
            return (
              <text key={r} x={2} y={GAP + r * (CELL + GAP) + CELL / 2 + 4}
                className="fill-muted-foreground" fontSize={8} opacity={0.6}>
                {pcName}
              </text>
            );
          })}
          {ACS.map((ac) => {
            const key = cycle === "ls" ? ac.lok_sabha_2024 : ac.vidhan_sabha_2024;
            const x = GAP + ac.col * (CELL + GAP);
            const y = GAP + (ROWS - 1 - ac.row) * (CELL + GAP);
            const isHover = hoveredAC === ac.ac_number;
            const dimByPC = highlightPC && highlightPC !== "all" && ac.pc_slug !== highlightPC;
            const fill = ALLIANCE_COLOR[key.winning_alliance];
            return (
              <g key={ac.ac_number}
                onMouseEnter={(e) => {
                  setHoveredAC(ac.ac_number);
                  const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                  setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, ac });
                }}
                onMouseMove={(e) => {
                  const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                  setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, ac });
                }}
                onMouseLeave={() => { setHoveredAC(null); setTooltip(null); }}
                onClick={() => onSelect?.(ac)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={x} y={y} width={CELL} height={CELL} rx={6}
                  fill={fill}
                  opacity={dimByPC ? 0.18 : isHover ? 1 : 0.85}
                  stroke={isHover ? "white" : "transparent"}
                  strokeWidth={isHover ? 2 : 0}
                />
                <text x={x + 6} y={y + 14} fontSize={8} className="fill-black/70" fontWeight={600}>
                  {ac.ac_number}
                </text>
                <text x={x + CELL / 2} y={y + CELL / 2 + 3} fontSize={9} textAnchor="middle"
                  className="fill-black" fontWeight={600}>
                  {ac.ac_name.length > 10 ? ac.ac_name.slice(0, 9) + "…" : ac.ac_name}
                </text>
                <text x={x + CELL / 2} y={y + CELL - 6} fontSize={8} textAnchor="middle"
                  className="fill-black/75 num">
                  {key.winning_party}
                </text>
              </g>
            );
          })}
        </svg>
        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-lg min-w-[200px]"
            style={{ left: Math.min(tooltip.x + 12, 400), top: tooltip.y + 12 }}
          >
            <div className="font-semibold">{tooltip.ac.ac_name} <span className="text-muted-foreground num">#{tooltip.ac.ac_number}</span></div>
            <div className="text-[10px] text-muted-foreground mb-1.5">{tooltip.ac.parent_pc}</div>
            <Tip ac={tooltip.ac} cycle={cycle} />
          </div>
        )}
      </div>
    </div>
  );
}

function Tip({ ac, cycle }: { ac: AC; cycle: Cycle }) {
  const k = cycle === "ls" ? ac.lok_sabha_2024 : ac.vidhan_sabha_2024;
  const swing = ac.metrics.vote_share_swing_pct;
  return (
    <div className="space-y-0.5">
      <Row label="Winner" value={`${k.candidate} (${k.winning_party})`} />
      <Row label="Vote share" value={`${k.vote_share_pct.toFixed(1)}%`} />
      <Row label="Margin" value={k.margin_votes.toLocaleString("en-IN")} />
      <Row label="Turnout" value={`${k.turnout_pct.toFixed(1)}%`} />
      <Row label="LS→VS swing" value={`${swing > 0 ? "+" : ""}${swing.toFixed(1)}%`} accent />
      {ac.metrics.alliance_split_ticket && (
        <div className="mt-1 text-[10px] text-primary uppercase tracking-wider">Changed May vs Nov</div>
      )}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={`num ${accent ? "text-primary" : ""}`}>{value}</span>
    </div>
  );
}
