import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/shell";
import { filterByPC } from "@/data/constituencies";
import { useFilters } from "@/hooks/use-filters";
import { fmtPct } from "@/lib/election-colors";
import {
  ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
  ReferenceLine, ZAxis, Cell,
} from "recharts";

export const Route = createFileRoute("/turnout")({ component: Page });

const tipStyle = {
  background: "oklch(0.205 0.014 250)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 6,
  fontSize: 12,
};

function Page() {
  const { pc } = useFilters();
  const acs = filterByPC(pc);

  const medianTurnout = median(acs.map(a => (a.lok_sabha_2024.turnout_pct + a.vidhan_sabha_2024.turnout_pct) / 2));
  const medianMargin = median(acs.map(a => a.vidhan_sabha_2024.margin_votes));

  const quadrantData = acs.map(a => ({
    name: a.ac_name,
    turnout: (a.lok_sabha_2024.turnout_pct + a.vidhan_sabha_2024.turnout_pct) / 2,
    margin: a.vidhan_sabha_2024.margin_votes,
    alliance: a.vidhan_sabha_2024.winning_alliance,
  }));

  return (
    <Shell>
      <div className="max-w-[1400px] mx-auto space-y-5">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Turnout in May vs November</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Did fewer people vote in the state election? Which areas had high turnout but still changed winner?
          </p>
        </header>

        <div className="rounded-lg border border-border bg-card/40 p-4">
          <h3 className="text-sm font-semibold tracking-tight mb-3">Turnout heatmap · LS vs VS vs delta</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs num">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left font-normal px-2 py-1.5">AC</th>
                  <th className="text-left font-normal px-2 py-1.5">PC</th>
                  <th className="px-2 py-1.5">LS</th>
                  <th className="px-2 py-1.5">VS</th>
                  <th className="px-2 py-1.5">Δ</th>
                </tr>
              </thead>
              <tbody>
                {acs.map(a => (
                  <tr key={a.ac_number} className="border-t border-border">
                    <td className="px-2 py-1.5 font-medium">{a.ac_name}</td>
                    <td className="px-2 py-1.5 text-muted-foreground">{a.parent_pc}</td>
                    <td className="px-2 py-1.5 text-center" style={{ background: heatCell(a.lok_sabha_2024.turnout_pct) }}>
                      {a.lok_sabha_2024.turnout_pct.toFixed(1)}%
                    </td>
                    <td className="px-2 py-1.5 text-center" style={{ background: heatCell(a.vidhan_sabha_2024.turnout_pct) }}>
                      {a.vidhan_sabha_2024.turnout_pct.toFixed(1)}%
                    </td>
                    <td className="px-2 py-1.5 text-center"
                        style={{ background: deltaCell(a.metrics.turnout_delta_pct) }}>
                      {fmtPct(a.metrics.turnout_delta_pct, true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card/40 p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold tracking-tight">Turnout vs winning margin (November)</h3>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              VS margin · Median turnout {medianTurnout.toFixed(1)}% · Median margin {Math.round(medianMargin).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
            <div>High turnout · Low margin → <span className="text-foreground">Battlegrounds</span></div>
            <div className="text-right">High turnout · High margin → <span className="text-foreground">Ideological fortresses</span></div>
            <div>Low turnout · Low margin → <span className="text-foreground">Voter apathy</span></div>
            <div className="text-right">Low turnout · High margin → <span className="text-foreground">Silent consolidation</span></div>
          </div>
          <div className="h-96">
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 8, right: 16, bottom: 30, left: 8 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
                <XAxis type="number" dataKey="turnout" name="Turnout" unit="%" domain={[46, 56]}
                  tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} />
                <YAxis type="number" dataKey="margin" name="Margin"
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} />
                <ZAxis range={[80, 80]} />
                <ReferenceLine x={medianTurnout} stroke="oklch(1 0 0 / 0.25)" strokeDasharray="3 3" />
                <ReferenceLine y={medianMargin} stroke="oklch(1 0 0 / 0.25)" strokeDasharray="3 3" />
                <Tooltip contentStyle={tipStyle}
                  cursor={{ stroke: "oklch(1 0 0 / 0.2)" }}
                  formatter={(value: any, name: string) => {
                    if (name === "Margin") return [Number(value).toLocaleString("en-IN") + " votes", name];
                    if (name === "Turnout") return [Number(value).toFixed(1) + "%", name];
                    return [value, name];
                  }}
                  labelFormatter={(_, payload) => (payload && payload[0]?.payload?.name) || ""}
                />
                <Scatter data={quadrantData}>
                  {quadrantData.map((d, i) => (
                    <Cell key={i} fill={d.alliance === "Mahayuti" ? "var(--mahayuti)" : "var(--mva)"} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function median(arr: number[]) {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

// Heat cell color: low turnout = cool dark, high = warm bright
function heatCell(pct: number) {
  // Domain ~ 48..55
  const t = Math.max(0, Math.min(1, (pct - 48) / 7));
  // mix between cool slate and warm primary
  return `color-mix(in oklab, var(--mahayuti) ${Math.round(t * 50)}%, oklch(0.24 0.013 250))`;
}

function deltaCell(d: number) {
  if (d > 0) return `color-mix(in oklab, var(--mva) ${Math.min(60, Math.abs(d) * 25)}%, transparent)`;
  return `color-mix(in oklab, var(--destructive) ${Math.min(60, Math.abs(d) * 25)}%, transparent)`;
}
