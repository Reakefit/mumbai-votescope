import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/shell";
import { aggregateSeats, filterByPC, ACS } from "@/data/constituencies";
import { ALLIANCE_COLOR, fmtInt, fmtPct } from "@/lib/election-colors";
import { useFilters } from "@/hooks/use-filters";
import { motion } from "motion/react";
import { AlertTriangle, ArrowRight, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from "recharts";

export const Route = createFileRoute("/")({ component: Page });

function Page() {
  const { pc } = useFilters();
  const acs = filterByPC(pc);
  const ls = aggregateSeats("ls", acs);
  const vs = aggregateSeats("vs", acs);

  // Voter flow buckets between alliances
  const flow = computeFlow(acs);

  const anomalies = [...acs]
    .filter(a => a.metrics.alliance_split_ticket)
    .sort((a, b) => Math.abs(b.metrics.vote_share_swing_pct) - Math.abs(a.metrics.vote_share_swing_pct))
    .slice(0, 5);

  return (
    <Shell>
      <div className="max-w-[1400px] mx-auto space-y-5">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">The Split-Ticket Narrative</h1>
          <p className="text-sm text-muted-foreground mt-1">
            How Mumbai voted Mahayuti for the Vidhan Sabha after voting MVA for the Lok Sabha
            {pc !== "all" && <> — filtered to <span className="text-foreground">{acs[0]?.parent_pc}</span></>}.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Scorecard title="Lok Sabha 2024" subtitle="AC-segments won" mva={ls.mva} mahayuti={ls.mahayuti} total={acs.length} />
          <Scorecard title="Vidhan Sabha 2024" subtitle="Seats won" mva={vs.mva} mahayuti={vs.mahayuti} total={acs.length} winnerHighlight />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-lg border border-border bg-card/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold tracking-tight">Voter Migration · LS → VS</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Where Mumbai's alliance preference shifted between the two 2024 cycles</p>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <FlowVisual flow={flow} />
          </div>

          <div className="rounded-lg border border-border bg-card/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold tracking-tight">Anomaly Alerts</h3>
              <AlertTriangle className="h-4 w-4 text-primary" />
            </div>
            <ul className="space-y-2">
              {anomalies.map((a, i) => (
                <motion.li key={a.ac_number}
                  initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-md border border-border bg-background/60 px-3 py-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{a.ac_name}</span>
                    <span className="text-[10px] text-muted-foreground">#{a.ac_number}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 text-[10px]">
                    <Pill alliance={a.lok_sabha_2024.winning_alliance}>{a.lok_sabha_2024.winning_party}</Pill>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <Pill alliance={a.vidhan_sabha_2024.winning_alliance}>{a.vidhan_sabha_2024.winning_party}</Pill>
                    <span className="ml-auto num text-primary">{fmtPct(a.metrics.vote_share_swing_pct, true)}</span>
                  </div>
                </motion.li>
              ))}
              {anomalies.length === 0 && <div className="text-xs text-muted-foreground">No split-ticket ACs in this filter.</div>}
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card/40 p-4">
          <h3 className="text-sm font-semibold tracking-tight mb-3">Vote-share swing per AC · LS → VS</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={acs.map(a => ({ name: a.ac_name, swing: a.metrics.vote_share_swing_pct, ac: a }))}
                margin={{ top: 6, right: 12, bottom: 50, left: 0 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0}
                  tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} height={60} />
                <YAxis tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} unit="%" />
                <Tooltip contentStyle={tipStyle} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
                <Bar dataKey="swing" radius={[3, 3, 0, 0]}>
                  {acs.map((a) => (
                    <Cell key={a.ac_number}
                      fill={a.vidhan_sabha_2024.winning_alliance === "Mahayuti" ? "var(--mahayuti)" : "var(--mva)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Shell>
  );
}

const tipStyle = {
  background: "oklch(0.205 0.014 250)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 6,
  fontSize: 12,
};

function Scorecard({ title, subtitle, mva, mahayuti, total, winnerHighlight }:
  { title: string; subtitle: string; mva: number; mahayuti: number; total: number; winnerHighlight?: boolean }) {
  const mvaPct = (mva / total) * 100;
  const mahPct = (mahayuti / total) * 100;
  return (
    <div className="rounded-lg border border-border bg-card/40 p-5">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{title}</div>
          <div className="text-sm text-muted-foreground">{subtitle}</div>
        </div>
        <div className="text-xs text-muted-foreground num">{total} ACs</div>
      </div>
      <div className="mt-4 flex items-end gap-6">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Mahayuti</div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-4xl font-semibold num" style={{ color: "var(--mahayuti)" }}>
            {mahayuti}
          </motion.div>
        </div>
        <div className="text-2xl text-muted-foreground">vs</div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">MVA</div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-4xl font-semibold num" style={{ color: "var(--mva)" }}>
            {mva}
          </motion.div>
        </div>
        {winnerHighlight && (
          <div className="ml-auto text-[10px] uppercase tracking-wider text-primary">
            ▲ Mahayuti sweep
          </div>
        )}
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full flex">
          <div style={{ width: `${mahPct}%`, background: "var(--mahayuti)" }} />
          <div style={{ width: `${mvaPct}%`, background: "var(--mva)" }} />
        </div>
      </div>
    </div>
  );
}

function Pill({ alliance, children }: { alliance: "MVA" | "Mahayuti"; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium"
      style={{ background: `color-mix(in oklab, ${ALLIANCE_COLOR[alliance]} 25%, transparent)`,
               color: ALLIANCE_COLOR[alliance] }}>
      {children}
    </span>
  );
}

function computeFlow(acs: typeof ACS) {
  let mvaToMva = 0, mvaToMah = 0, mahToMva = 0, mahToMah = 0;
  for (const a of acs) {
    const l = a.lok_sabha_2024.winning_alliance, v = a.vidhan_sabha_2024.winning_alliance;
    if (l === "MVA" && v === "MVA") mvaToMva++;
    else if (l === "MVA" && v === "Mahayuti") mvaToMah++;
    else if (l === "Mahayuti" && v === "MVA") mahToMva++;
    else mahToMah++;
  }
  return { mvaToMva, mvaToMah, mahToMva, mahToMah };
}

function FlowVisual({ flow }: { flow: ReturnType<typeof computeFlow> }) {
  const total = flow.mvaToMva + flow.mvaToMah + flow.mahToMva + flow.mahToMah;
  const lsMva = flow.mvaToMva + flow.mvaToMah;
  const lsMah = flow.mahToMva + flow.mahToMah;
  const vsMva = flow.mvaToMva + flow.mahToMva;
  const vsMah = flow.mvaToMah + flow.mahToMah;

  const rows: { from: "MVA" | "Mahayuti"; to: "MVA" | "Mahayuti"; n: number; label: string }[] = [
    { from: "MVA", to: "Mahayuti", n: flow.mvaToMah, label: "MVA → Mahayuti (split-ticket)" },
    { from: "Mahayuti", to: "Mahayuti", n: flow.mahToMah, label: "Mahayuti held" },
    { from: "MVA", to: "MVA", n: flow.mvaToMva, label: "MVA held" },
    { from: "Mahayuti", to: "MVA", n: flow.mahToMva, label: "Mahayuti → MVA" },
  ];
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      <Column label="Lok Sabha" mva={lsMva} mah={lsMah} total={total} align="right" />
      <div className="flex flex-col gap-2 min-w-[180px]">
        {rows.filter(r => r.n > 0).map((r, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-sm" style={{ background: ALLIANCE_COLOR[r.from] }} />
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
            <span className="h-2 w-2 rounded-sm" style={{ background: ALLIANCE_COLOR[r.to] }} />
            <span className="text-muted-foreground flex-1 truncate" title={r.label}>{r.label}</span>
            <span className="num font-medium">{r.n}</span>
          </motion.div>
        ))}
      </div>
      <Column label="Vidhan Sabha" mva={vsMva} mah={vsMah} total={total} align="left" />
    </div>
  );
}
function Column({ label, mva, mah, total, align }:
  { label: string; mva: number; mah: number; total: number; align: "left" | "right" }) {
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{label}</div>
      <div className="flex flex-col gap-2">
        <Row alliance="Mahayuti" n={mah} total={total} align={align} />
        <Row alliance="MVA" n={mva} total={total} align={align} />
      </div>
    </div>
  );
}
function Row({ alliance, n, total, align }:
  { alliance: "MVA" | "Mahayuti"; n: number; total: number; align: "left" | "right" }) {
  const pct = (n / total) * 100;
  return (
    <div className={`flex items-center gap-2 ${align === "right" ? "flex-row-reverse" : ""}`}>
      <span className="text-xs num min-w-[28px] text-right">{n}</span>
      <div className="flex-1 h-5 rounded bg-muted/40 overflow-hidden flex">
        <div className={align === "right" ? "ml-auto" : ""}
          style={{ width: `${pct}%`, height: "100%", background: ALLIANCE_COLOR[alliance] }} />
      </div>
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{alliance}</span>
    </div>
  );
}
