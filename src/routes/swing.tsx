import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/shell";
import { filterByPC } from "@/data/constituencies";
import { ALLIANCE_COLOR } from "@/lib/election-colors";
import { useFilters } from "@/hooks/use-filters";
import { PARTY_COLOR } from "@/lib/election-colors";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, ReferenceLine,
  ScatterChart, Scatter, ZAxis, Cell, Legend,
} from "recharts";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/swing")({ component: Page });

const tipStyle = {
  background: "oklch(0.205 0.014 250)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 6,
  fontSize: 12,
};

function Page() {
  const { pc } = useFilters();
  const acs = filterByPC(pc);
  const [cycle, setCycle] = useState<"ls" | "vs">("vs");

  // Margin (positive = Mahayuti lead, negative = MVA lead), using winning alliance margin
  const marginData = acs.map(a => {
    const k = cycle === "ls" ? a.lok_sabha_2024 : a.vidhan_sabha_2024;
    const signed = (k.winning_alliance === "Mahayuti" ? 1 : -1) * k.margin_votes;
    return { name: a.ac_name, margin: signed, alliance: k.winning_alliance };
  });

  // Dilution scatter: x = LS vote share, y = VS vote share, by winning_party of VS
  const scatter = acs.map(a => ({
    name: a.ac_name,
    ls: a.lok_sabha_2024.vote_share_pct,
    vs: a.vidhan_sabha_2024.vote_share_pct,
    party: a.vidhan_sabha_2024.winning_party,
    margin: a.vidhan_sabha_2024.margin_votes,
  }));

  const parties = Array.from(new Set(scatter.map(s => s.party)));

  const swingData = [...acs]
    .sort((a, b) => Math.abs(b.metrics.vote_share_swing_pct) - Math.abs(a.metrics.vote_share_swing_pct))
    .map((a) => ({
      name: a.ac_name,
      swing: a.metrics.vote_share_swing_pct,
      alliance: a.vidhan_sabha_2024.winning_alliance,
    }));

  return (
    <Shell>
      <div className="max-w-[1400px] mx-auto space-y-5">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Vote share and swings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            See how far each party moved between May (Parliament) and November (State), and how big the winning margin was.
          </p>
        </header>

        <div className="rounded-lg border border-border bg-card/40 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold tracking-tight">Winning margin per area <span className="text-muted-foreground font-normal">(positive = Mahayuti lead)</span></h3>
            <Tabs value={cycle} onValueChange={(v) => setCycle(v as "ls" | "vs")}>
              <TabsList className="h-7">
                <TabsTrigger value="ls" className="text-xs px-2.5">May</TabsTrigger>
                <TabsTrigger value="vs" className="text-xs px-2.5">November</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={marginData} margin={{ top: 6, right: 12, bottom: 56, left: 8 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0}
                  tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} height={68} />
                <YAxis tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={tipStyle}
                  formatter={(v: number) => [`${Math.abs(v).toLocaleString("en-IN")} votes`, "Margin"]} />
                <ReferenceLine y={0} stroke="oklch(1 0 0 / 0.2)" />
                <Bar dataKey="margin" radius={[3, 3, 3, 3]}>
                  {marginData.map((d, i) => (
                    <Cell key={i} fill={d.alliance === "Mahayuti" ? "var(--mahayuti)" : "var(--mva)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card/40 p-4">
          <h3 className="text-sm font-semibold tracking-tight">Winner vote-share shift (May to November)</h3>
          <p className="text-[11px] text-muted-foreground mb-3">
            Change in the November winner&apos;s vote share vs the May winner&apos;s share on the same tile (dataset metric). Positive bars: share rose for the party that won in November.
          </p>
          <div className="h-96">
            <ResponsiveContainer>
              <BarChart data={swingData} margin={{ top: 6, right: 12, bottom: 56, left: 8 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0}
                  tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} height={68} />
                <YAxis tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} unit="%" />
                <Tooltip contentStyle={tipStyle}
                  formatter={(v: number) => [`${v.toFixed(1)}%`, "Share shift"]} />
                <ReferenceLine y={0} stroke="oklch(1 0 0 / 0.2)" />
                <Bar dataKey="swing" radius={[3, 3, 3, 3]}>
                  {swingData.map((d, i) => (
                    <Cell key={i} fill={d.swing >= 0 ? ALLIANCE_COLOR.Mahayuti : ALLIANCE_COLOR.MVA} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card/40 p-4">
          <h3 className="text-sm font-semibold tracking-tight mb-1">Vote share: May vs November</h3>
          <p className="text-[11px] text-muted-foreground mb-3">
            Each dot is one area. Above the line means the party gained share from May to November. Dot size shows November margin.
          </p>
          <div className="h-96">
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 8, right: 12, bottom: 36, left: 8 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
                <XAxis type="number" dataKey="ls" name="LS share" unit="%" domain={[40, 75]}
                  tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }}>
                </XAxis>
                <YAxis type="number" dataKey="vs" name="VS share" unit="%" domain={[40, 75]}
                  tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} />
                <ZAxis type="number" dataKey="margin" range={[40, 360]} />
                <ReferenceLine segment={[{ x: 40, y: 40 }, { x: 75, y: 75 }]} stroke="oklch(1 0 0 / 0.18)" strokeDasharray="3 3" />
                <Tooltip
                  cursor={{ stroke: "oklch(1 0 0 / 0.2)" }}
                  contentStyle={tipStyle}
                  formatter={(value: any, name: string) => [typeof value === "number" ? value.toFixed(1) + (name.includes("share") ? "%" : "") : value, name]}
                  labelFormatter={(_, payload) => (payload && payload[0]?.payload?.name) || ""}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {parties.map(p => (
                  <Scatter key={p} name={p} data={scatter.filter(s => s.party === p)} fill={PARTY_COLOR[p]} />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Shell>
  );
}
