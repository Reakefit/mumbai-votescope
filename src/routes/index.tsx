import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/shell";
import { useState } from "react";
import { MumbaiMap } from "@/components/map/mumbai-map";
import { ACDetailSheet } from "@/components/map/ac-detail-sheet";
import { aggregateSeats, filterByPC, type AC } from "@/data/constituencies";
import { ALLIANCE_COLOR, fmtPct } from "@/lib/election-colors";
import { useFilters } from "@/hooks/use-filters";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, TrendingUp, Activity, Lightbulb, Map as MapIcon } from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, ScatterChart, Scatter,
  ReferenceLine, ZAxis, Tooltip as ReTooltip,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MumbAI-Vote · Mumbai 2024 LS vs VS Map" },
      { name: "description", content: "Interactive Mumbai constituency map comparing 2024 Lok Sabha and Vidhan Sabha results — toggle elections, click any AC for the full breakdown." },
    ],
  }),
  component: Page,
});

function Page() {
  const { pc } = useFilters();
  const acs = filterByPC(pc);
  const [cycle, setCycle] = useState<"ls" | "vs">("vs");
  const [selected, setSelected] = useState<AC | null>(null);

  const ls = aggregateSeats("ls", acs);
  const vs = aggregateSeats("vs", acs);
  const splitCount = acs.filter(a => a.metrics.alliance_split_ticket).length;
  const avgTurnout = acs.reduce((s, a) =>
    s + (cycle === "ls" ? a.lok_sabha_2024.turnout_pct : a.vidhan_sabha_2024.turnout_pct), 0) / acs.length;
  const current = cycle === "ls" ? ls : vs;

  return (
    <Shell>
      <div className="max-w-[1500px] mx-auto space-y-5">
        {/* Hero: map + key metrics */}
        <section className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">
          <div className="rounded-xl border border-border bg-card/40 p-4 lg:p-5 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <h1 className="text-xl lg:text-2xl font-semibold tracking-tight">Mumbai · 2024</h1>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  {acs.length} assembly constituencies · click any to deep-dive
                </p>
              </div>
              <CycleToggle cycle={cycle} setCycle={setCycle} />
            </div>

            <div className="relative h-[480px] sm:h-[560px] lg:h-[640px] w-full rounded-lg bg-background/60 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={cycle}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }} className="absolute inset-0">
                  <MumbaiMap cycle={cycle} onSelect={setSelected} highlightPC={pc} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-3 left-3 rounded-md border border-border bg-background/85 backdrop-blur px-2.5 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {cycle === "ls" ? "Lok Sabha · Apr–Jun 2024" : "Vidhan Sabha · Nov 2024"} · winning alliance
              </div>
            </div>
          </div>

          {/* Key metrics column */}
          <div className="space-y-3">
            <BigScore cycle={cycle} mahayuti={current.mahayuti} mva={current.mva} total={acs.length} />
            <FlipDelta ls={ls} vs={vs} />
            <KeyStat icon={Sparkles} label="Split-ticket ACs" value={`${splitCount} of ${acs.length}`}
              hint="Voted differently in LS vs VS" link="/insights#split" />
            <KeyStat icon={Activity} label={cycle === "ls" ? "LS avg turnout" : "VS avg turnout"} value={`${avgTurnout.toFixed(1)}%`}
              hint="Engagement across selected region" link="/turnout" />
          </div>
        </section>

        {/* Top movers strip */}
        <TopMovers acs={acs} onSelect={setSelected} />

        {/* Deep dive cards */}
        <section>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-sm font-semibold tracking-tight">Deep dive</h2>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Click a card to explore</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <DeepDiveCard to="/swing" icon={TrendingUp} title="Swing Engine"
              blurb="Margin collapses and party dilution across all 36 ACs.">
              <SwingPreview acs={acs} />
            </DeepDiveCard>
            <DeepDiveCard to="/turnout" icon={Activity} title="Turnout Dynamics"
              blurb="Voter fatigue heatmap and 4-quadrant battleground classifier.">
              <TurnoutPreview acs={acs} />
            </DeepDiveCard>
            <DeepDiveCard to="/insights" icon={Lightbulb} title="Outcome Insights"
              blurb="Seven lenses on what changed — parties, demographics, geography.">
              <InsightsPreview acs={acs} />
            </DeepDiveCard>
            <DeepDiveCard to="/mapping" icon={MapIcon} title="Side-by-Side Map"
              blurb="Compare both cycles simultaneously with synchronized hover.">
              <MapPreview />
            </DeepDiveCard>
          </div>
        </section>
      </div>

      <ACDetailSheet ac={selected} onClose={() => setSelected(null)} />
    </Shell>
  );
}

/* ---------- toggle ---------- */
function CycleToggle({ cycle, setCycle }: { cycle: "ls" | "vs"; setCycle: (c: "ls" | "vs") => void }) {
  return (
    <div className="relative inline-flex items-center rounded-full border border-border bg-background p-1 text-xs">
      <button
        onClick={() => setCycle("ls")}
        className={`relative z-10 px-3 py-1.5 font-medium transition-colors ${cycle === "ls" ? "text-primary-foreground" : "text-muted-foreground"}`}>
        Lok Sabha
      </button>
      <button
        onClick={() => setCycle("vs")}
        className={`relative z-10 px-3 py-1.5 font-medium transition-colors ${cycle === "vs" ? "text-primary-foreground" : "text-muted-foreground"}`}>
        Vidhan Sabha
      </button>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="absolute inset-y-1 rounded-full bg-primary"
        style={{
          width: "calc(50% - 4px)",
          left: cycle === "ls" ? 4 : "calc(50% + 0px)",
        }}
      />
    </div>
  );
}

/* ---------- big score ---------- */
function BigScore({ cycle, mahayuti, mva, total }:
  { cycle: "ls" | "vs"; mahayuti: number; mva: number; total: number }) {
  const winner = mahayuti > mva ? "Mahayuti" : "MVA";
  const winnerCount = Math.max(mahayuti, mva);
  return (
    <div className="rounded-xl border border-border bg-card/40 p-4">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {cycle === "ls" ? "Lok Sabha 2024 — AC segments won" : "Vidhan Sabha 2024 — seats won"}
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <motion.div key={`${cycle}-${winner}`}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold num" style={{ color: ALLIANCE_COLOR[winner] }}>
          {winnerCount}
        </motion.div>
        <div className="text-sm text-muted-foreground num">/ {total}</div>
        <div className="ml-auto text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ background: `color-mix(in oklab, ${ALLIANCE_COLOR[winner]} 25%, transparent)`,
                   color: ALLIANCE_COLOR[winner] }}>
          {winner} ▲
        </div>
      </div>
      <div className="mt-3 h-2 w-full rounded-full overflow-hidden bg-muted flex">
        <motion.div layout initial={false} animate={{ width: `${(mahayuti / total) * 100}%` }}
          style={{ background: "var(--mahayuti)" }} transition={{ type: "spring", stiffness: 200, damping: 30 }} />
        <motion.div layout initial={false} animate={{ width: `${(mva / total) * 100}%` }}
          style={{ background: "var(--mva)" }} transition={{ type: "spring", stiffness: 200, damping: 30 }} />
      </div>
      <div className="mt-2 flex justify-between text-[11px] num">
        <span style={{ color: "var(--mahayuti)" }}>{mahayuti} Mahayuti</span>
        <span style={{ color: "var(--mva)" }}>{mva} MVA</span>
      </div>
    </div>
  );
}

function FlipDelta({ ls, vs }: { ls: { mahayuti: number; mva: number }; vs: { mahayuti: number; mva: number } }) {
  const delta = vs.mahayuti - ls.mahayuti;
  return (
    <div className="rounded-xl border border-border bg-card/40 p-4">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">LS → VS shift</div>
      <div className="mt-1 flex items-baseline gap-3">
        <div className="text-3xl font-semibold num text-primary">
          {delta > 0 ? "+" : ""}{delta}
        </div>
        <div className="text-xs text-muted-foreground">seats moved to Mahayuti</div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px]">
        <Pill alliance="MVA">LS·{ls.mva} → VS·{vs.mva}</Pill>
        <ArrowRight className="h-3 w-3 text-muted-foreground" />
        <Pill alliance="Mahayuti">LS·{ls.mahayuti} → VS·{vs.mahayuti}</Pill>
      </div>
    </div>
  );
}

function KeyStat({ icon: Icon, label, value, hint, link }:
  { icon: any; label: string; value: string; hint: string; link: string }) {
  return (
    <Link to={link} className="block rounded-xl border border-border bg-card/40 p-4 hover:bg-card/70 hover:border-primary/50 transition-colors group">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-1 flex items-baseline justify-between gap-2">
        <div className="text-2xl font-semibold num">{value}</div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
      </div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{hint}</div>
    </Link>
  );
}

function Pill({ alliance, children }: { alliance: "MVA" | "Mahayuti"; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium num"
      style={{ background: `color-mix(in oklab, ${ALLIANCE_COLOR[alliance]} 25%, transparent)`,
               color: ALLIANCE_COLOR[alliance] }}>
      {children}
    </span>
  );
}

/* ---------- top movers ---------- */
function TopMovers({ acs, onSelect }: { acs: AC[]; onSelect: (ac: AC) => void }) {
  const movers = [...acs]
    .sort((a, b) => Math.abs(b.metrics.vote_share_swing_pct) - Math.abs(a.metrics.vote_share_swing_pct))
    .slice(0, 6);
  return (
    <section className="rounded-xl border border-border bg-card/40 p-4">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-sm font-semibold tracking-tight">Biggest movers — click to inspect</h2>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">By absolute vote-share swing</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
        {movers.map(a => (
          <button key={a.ac_number} onClick={() => onSelect(a)}
            className="text-left rounded-md border border-border bg-background/60 px-3 py-2.5 hover:border-primary/60 hover:bg-background transition-colors">
            <div className="text-xs font-medium truncate">{a.ac_name}</div>
            <div className="text-[10px] text-muted-foreground mb-1.5 truncate">{a.parent_pc}</div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-sm" style={{ background: ALLIANCE_COLOR[a.lok_sabha_2024.winning_alliance] }} />
              <ArrowRight className="h-2.5 w-2.5 text-muted-foreground" />
              <span className="h-1.5 w-1.5 rounded-sm" style={{ background: ALLIANCE_COLOR[a.vidhan_sabha_2024.winning_alliance] }} />
              <span className="ml-auto text-xs num text-primary">{fmtPct(a.metrics.vote_share_swing_pct, true)}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------- deep dive cards ---------- */
function DeepDiveCard({ to, icon: Icon, title, blurb, children }:
  { to: string; icon: any; title: string; blurb: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="block rounded-xl border border-border bg-card/40 p-4 hover:bg-card/70 hover:border-primary/40 transition-colors group">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
        <Icon className="h-3.5 w-3.5" /> {title}
      </div>
      <div className="text-xs text-muted-foreground mb-3">{blurb}</div>
      <div className="h-24 -mx-1">{children}</div>
      <div className="mt-2 flex items-center text-[11px] text-muted-foreground group-hover:text-primary transition-colors">
        Explore <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition" />
      </div>
    </Link>
  );
}

function SwingPreview({ acs }: { acs: AC[] }) {
  const data = acs.map(a => ({ s: a.metrics.vote_share_swing_pct, c: a.vidhan_sabha_2024.winning_alliance }));
  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <XAxis hide /><YAxis hide />
        <Bar dataKey="s" radius={[2, 2, 0, 0]}>
          {data.map((d, i) => <Cell key={i} fill={d.c === "Mahayuti" ? "var(--mahayuti)" : "var(--mva)"} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
function TurnoutPreview({ acs }: { acs: AC[] }) {
  const data = acs.map(a => ({ x: a.lok_sabha_2024.turnout_pct, y: a.vidhan_sabha_2024.turnout_pct,
    c: a.vidhan_sabha_2024.winning_alliance }));
  return (
    <ResponsiveContainer>
      <ScatterChart margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <XAxis hide type="number" dataKey="x" domain={[47, 55]} />
        <YAxis hide type="number" dataKey="y" domain={[47, 55]} />
        <ZAxis range={[20, 20]} />
        <ReferenceLine segment={[{ x: 47, y: 47 }, { x: 55, y: 55 }]} stroke="oklch(1 0 0 / 0.2)" strokeDasharray="2 2" />
        <Scatter data={data}>
          {data.map((d, i) => <Cell key={i} fill={d.c === "Mahayuti" ? "var(--mahayuti)" : "var(--mva)"} />)}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
function InsightsPreview({ acs }: { acs: AC[] }) {
  const split = acs.filter(a => a.metrics.alliance_split_ticket).length;
  const held = acs.length - split;
  const data = [{ name: "x", held, split }];
  return (
    <div className="flex h-full items-center justify-center gap-3">
      <Donut value={split} total={acs.length} color="var(--mahayuti)" />
      <div className="text-[11px] text-muted-foreground leading-tight">
        <div className="text-foreground num text-base">{split}</div>
        of <span className="num">{acs.length}</span> ACs<br />
        flipped alliance
      </div>
    </div>
  );
}
function Donut({ value, total, color }: { value: number; total: number; color: string }) {
  const r = 28, c = 2 * Math.PI * r;
  const pct = value / total;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={r} fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="8" />
      <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${c * pct} ${c}`} strokeLinecap="round" transform="rotate(-90 36 36)" />
      <text x="36" y="40" textAnchor="middle" fontSize="14" fontWeight="600" className="fill-foreground num">
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}
function MapPreview() {
  return (
    <div className="grid grid-cols-2 gap-1 h-full">
      <div className="rounded bg-gradient-to-br" style={{ background: "linear-gradient(135deg, var(--mva) 0%, var(--mva) 60%, var(--mahayuti) 100%)", opacity: 0.85 }} />
      <div className="rounded" style={{ background: "linear-gradient(135deg, var(--mahayuti) 0%, var(--mahayuti) 70%, var(--mva) 100%)", opacity: 0.85 }} />
    </div>
  );
}
