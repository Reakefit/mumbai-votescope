import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/shell";
import { useState } from "react";
import { MumbaiMap } from "@/components/map/mumbai-map";
import { ACDetailSheet } from "@/components/map/ac-detail-sheet";
import { ACS, aggregateSeats, type AC } from "@/data/constituencies";
import { ALLIANCE_COLOR, fmtPct, fmtInt } from "@/lib/election-colors";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Activity, TrendingUp, Vote } from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis,
  ScatterChart, Scatter, ZAxis, ReferenceLine,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MumbAI-Vote · How Mumbai voted in 2024 — LS vs VS" },
      { name: "description", content: "Mumbai's 2024 split-ticket story: same voters, two elections, different choices. Real Wikipedia-sourced results for all 36 ACs and 6 PCs." },
    ],
  }),
  component: Page,
});

function Page() {
  const acs = ACS;
  const [cycle, setCycle] = useState<"ls" | "vs">("vs");
  const [selected, setSelected] = useState<AC | null>(null);

  const ls = aggregateSeats("ls");
  const vs = aggregateSeats("vs");
  const split = acs.filter(a => a.metrics.alliance_split_ticket);
  const avgLS = acs.reduce((s, a) => s + a.lok_sabha_2024.turnout_pct, 0) / acs.length;
  const avgVS = acs.reduce((s, a) => s + a.vidhan_sabha_2024.turnout_pct, 0) / acs.length;
  const current = cycle === "ls" ? ls : vs;

  return (
    <Shell>
      <div className="max-w-[1400px] mx-auto">
        {/* Hero — sticky map on desktop */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 lg:items-start">
          <div className="lg:sticky lg:top-4 rounded-xl border border-border bg-card/40 p-4 lg:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <h1 className="text-xl lg:text-2xl font-semibold tracking-tight">
                  Same voters. Two elections. <span className="text-primary">Different choice.</span>
                </h1>
                <p className="text-xs lg:text-sm text-muted-foreground mt-0.5">
                  Mumbai · 36 ACs · 6 PCs · 2024 — toggle the election, click any constituency
                </p>
              </div>
              <CycleToggle cycle={cycle} setCycle={setCycle} />
            </div>
            <div className="relative h-[460px] lg:h-[600px] w-full rounded-lg bg-background/60 overflow-hidden">
              <MumbaiMap cycle={cycle} onSelect={setSelected} />
              <div className="absolute bottom-3 left-3 rounded-md border border-border bg-background/85 backdrop-blur px-2.5 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground pointer-events-none">
                {cycle === "ls" ? "Lok Sabha · Apr–Jun 2024" : "Vidhan Sabha · Nov 2024"} · winning alliance
              </div>
              <Legend />
            </div>
          </div>

          {/* Key identifiers column */}
          <div className="space-y-3">
            <BigScore cycle={cycle} mahayuti={current.mahayuti} mva={current.mva} total={acs.length} />
            <Identifier icon={Sparkles} value={`${split.length}`} unit={`/ ${acs.length} ACs`}
              label="Split-ticket constituencies"
              hint="Won by different alliances in LS vs VS"
              accent />
            <Identifier icon={TrendingUp} value={`${vs.mahayuti - ls.mahayuti > 0 ? "+" : ""}${vs.mahayuti - ls.mahayuti}`} unit="seats"
              label="LS → VS shift to Mahayuti"
              hint={`Mahayuti went ${ls.mahayuti} → ${vs.mahayuti} of ${acs.length}`} />
            <Identifier icon={Activity} value={`${(avgVS - avgLS).toFixed(1)}%`} unit="pts"
              label="Turnout gap (VS − LS)"
              hint={`LS ${avgLS.toFixed(1)}% → VS ${avgVS.toFixed(1)}% average`} />
          </div>
        </section>

        {/* Scrollable story */}
        <div className="mt-10 lg:mt-14 space-y-10 lg:space-y-14">
          <Story
            kicker="Chapter 1"
            title="The headline flip"
            subtitle="Mumbai's voters split the ticket — backing the INDIA bloc in May, then handing the city to Mahayuti in November."
            narrative="Narrative coming soon — once we finalize the AC-level Wikipedia merge, this section will walk through the macro flip seat-by-seat."
            link={{ to: "/mapping", label: "Open side-by-side map" }}
          >
            <FlipStrip ls={ls} vs={vs} total={acs.length} />
          </Story>

          <Story
            kicker="Chapter 2"
            title="Where voters changed their mind"
            subtitle={`${split.length} of ${acs.length} assembly seats backed one alliance for Parliament and the other for the Assembly.`}
            narrative="Narrative TBD — short profiles of each split-ticket AC will go here."
            link={{ to: "/insights", label: "See every split-ticket AC" }}
          >
            <SplitGrid split={split} onSelect={setSelected} />
          </Story>

          <Story
            kicker="Chapter 3"
            title="Margin storm — the biggest swings"
            subtitle="Vote-share movements between LS and VS, ranked. Big bars mean the local race looked very different from the national one."
            narrative="Narrative TBD — we'll annotate the top movers with what likely drove them."
            link={{ to: "/swing", label: "Open the Swing Engine" }}
          >
            <SwingBars acs={acs} onSelect={setSelected} />
          </Story>

          <Story
            kicker="Chapter 4"
            title="Turnout asymmetry"
            subtitle={`Mumbai voters showed up differently in May vs November — LS ${avgLS.toFixed(1)}% vs VS ${avgVS.toFixed(1)}%.`}
            narrative="Narrative TBD — district-level turnout overlay and demographic correlation."
            link={{ to: "/turnout", label: "Open Turnout Dynamics" }}
          >
            <TurnoutScatter acs={acs} />
          </Story>
        </div>
      </div>

      <ACDetailSheet ac={selected} onClose={() => setSelected(null)} />
    </Shell>
  );
}

/* ---------- header components ---------- */
function CycleToggle({ cycle, setCycle }: { cycle: "ls" | "vs"; setCycle: (c: "ls" | "vs") => void }) {
  return (
    <div className="relative inline-flex items-center rounded-full border border-border bg-background p-1 text-xs">
      <button onClick={() => setCycle("ls")}
        className={`relative z-10 px-3 py-1.5 font-medium transition-colors ${cycle === "ls" ? "text-primary-foreground" : "text-muted-foreground"}`}>
        Lok Sabha
      </button>
      <button onClick={() => setCycle("vs")}
        className={`relative z-10 px-3 py-1.5 font-medium transition-colors ${cycle === "vs" ? "text-primary-foreground" : "text-muted-foreground"}`}>
        Vidhan Sabha
      </button>
      <motion.div layout transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="absolute inset-y-1 rounded-full bg-primary"
        style={{ width: "calc(50% - 4px)", left: cycle === "ls" ? 4 : "calc(50% + 0px)" }} />
    </div>
  );
}

function Legend() {
  return (
    <div className="absolute top-3 right-3 rounded-md border border-border bg-background/85 backdrop-blur px-2.5 py-1.5 text-[10px] flex gap-3">
      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm" style={{ background: "var(--mahayuti)" }} />Mahayuti</span>
      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm" style={{ background: "var(--mva)" }} />MVA</span>
    </div>
  );
}

function BigScore({ cycle, mahayuti, mva, total }: { cycle: "ls" | "vs"; mahayuti: number; mva: number; total: number }) {
  const winner = mahayuti >= mva ? "Mahayuti" : "MVA";
  const winnerCount = Math.max(mahayuti, mva);
  return (
    <div className="rounded-xl border border-border bg-card/40 p-4">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        <Vote className="h-3 w-3" /> {cycle === "ls" ? "Lok Sabha · AC segments won" : "Vidhan Sabha · seats won"}
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <motion.div key={`${cycle}-${winner}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold num" style={{ color: ALLIANCE_COLOR[winner] }}>{winnerCount}</motion.div>
        <div className="text-sm text-muted-foreground num">/ {total}</div>
        <div className="ml-auto text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ background: `color-mix(in oklab, ${ALLIANCE_COLOR[winner]} 25%, transparent)`, color: ALLIANCE_COLOR[winner] }}>
          {winner} ▲
        </div>
      </div>
      <div className="mt-3 h-2 w-full rounded-full overflow-hidden bg-muted flex">
        <motion.div layout animate={{ width: `${(mahayuti / total) * 100}%` }}
          style={{ background: "var(--mahayuti)" }} transition={{ type: "spring", stiffness: 200, damping: 30 }} />
        <motion.div layout animate={{ width: `${(mva / total) * 100}%` }}
          style={{ background: "var(--mva)" }} transition={{ type: "spring", stiffness: 200, damping: 30 }} />
      </div>
      <div className="mt-2 flex justify-between text-[11px] num">
        <span style={{ color: "var(--mahayuti)" }}>{mahayuti} Mahayuti</span>
        <span style={{ color: "var(--mva)" }}>{mva} MVA</span>
      </div>
    </div>
  );
}

function Identifier({ icon: Icon, value, unit, label, hint, accent }:
  { icon: any; value: string; unit: string; label: string; hint: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card/40 p-4">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <div className={`text-3xl font-semibold num ${accent ? "text-primary" : ""}`}>{value}</div>
        <div className="text-xs text-muted-foreground">{unit}</div>
      </div>
      <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>
    </div>
  );
}

/* ---------- story scaffold ---------- */
function Story({ kicker, title, subtitle, narrative, link, children }:
  { kicker: string; title: string; subtitle: string; narrative: string;
    link: { to: string; label: string }; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5 lg:gap-8">
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-2">{kicker}</div>
        <h2 className="text-lg lg:text-xl font-semibold tracking-tight leading-snug">{title}</h2>
        <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
        <p className="text-xs text-muted-foreground/70 italic mt-3 border-l-2 border-border pl-3">{narrative}</p>
        <Link to={link.to} className="inline-flex items-center gap-1 mt-4 text-xs text-primary hover:underline">
          {link.label} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="rounded-xl border border-border bg-card/40 p-4">{children}</div>
    </section>
  );
}

/* ---------- chapter visuals ---------- */
function FlipStrip({ ls, vs, total }: { ls: { mahayuti: number; mva: number }; vs: { mahayuti: number; mva: number }; total: number }) {
  return (
    <div className="space-y-3">
      <ScoreBar label="Lok Sabha 2024" mahayuti={ls.mahayuti} mva={ls.mva} total={total} />
      <ScoreBar label="Vidhan Sabha 2024" mahayuti={vs.mahayuti} mva={vs.mva} total={total} />
      <div className="text-[11px] text-muted-foreground pt-1">
        Same electorate, six months apart. Mahayuti gained <span className="text-primary num font-semibold">{vs.mahayuti - ls.mahayuti}</span> AC seats between the two cycles.
      </div>
    </div>
  );
}
function ScoreBar({ label, mahayuti, mva, total }: { label: string; mahayuti: number; mva: number; total: number }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-1.5">
        <span className="text-muted-foreground uppercase tracking-wider">{label}</span>
        <span className="num"><span style={{ color: "var(--mahayuti)" }}>{mahayuti}</span> · <span style={{ color: "var(--mva)" }}>{mva}</span></span>
      </div>
      <div className="h-3 w-full rounded-full overflow-hidden bg-muted flex">
        <div style={{ width: `${(mahayuti / total) * 100}%`, background: "var(--mahayuti)" }} />
        <div style={{ width: `${(mva / total) * 100}%`, background: "var(--mva)" }} />
      </div>
    </div>
  );
}

function SplitGrid({ split, onSelect }: { split: AC[]; onSelect: (ac: AC) => void }) {
  if (!split.length) return <div className="text-xs text-muted-foreground">No split-ticket ACs in this region.</div>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {split.map(a => (
        <button key={a.ac_number} onClick={() => onSelect(a)}
          className="text-left rounded-md border border-border bg-background/60 px-3 py-2.5 hover:border-primary/60 hover:bg-background transition-colors">
          <div className="text-xs font-medium truncate">{a.ac_name}</div>
          <div className="text-[10px] text-muted-foreground mb-1.5 truncate">{a.parent_pc}</div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="px-1.5 py-0.5 rounded-sm font-medium" style={{ background: `color-mix(in oklab, ${ALLIANCE_COLOR[a.lok_sabha_2024.winning_alliance]} 30%, transparent)`, color: ALLIANCE_COLOR[a.lok_sabha_2024.winning_alliance] }}>{a.lok_sabha_2024.winning_party}</span>
            <ArrowRight className="h-2.5 w-2.5 text-muted-foreground" />
            <span className="px-1.5 py-0.5 rounded-sm font-medium" style={{ background: `color-mix(in oklab, ${ALLIANCE_COLOR[a.vidhan_sabha_2024.winning_alliance]} 30%, transparent)`, color: ALLIANCE_COLOR[a.vidhan_sabha_2024.winning_alliance] }}>{a.vidhan_sabha_2024.winning_party}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

function SwingBars({ acs, onSelect }: { acs: AC[]; onSelect: (ac: AC) => void }) {
  const sorted = [...acs].sort((a, b) => Math.abs(b.metrics.vote_share_swing_pct) - Math.abs(a.metrics.vote_share_swing_pct)).slice(0, 12);
  const data = sorted.map(a => ({ name: a.ac_name, swing: a.metrics.vote_share_swing_pct, ac: a }));
  return (
    <div className="h-[320px]">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 80 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10, fill: "oklch(0.7 0 0)" }} axisLine={false} tickLine={false} />
          <ReferenceLine x={0} stroke="oklch(1 0 0 / 0.2)" />
          <Bar dataKey="swing" radius={[0, 3, 3, 0]} onClick={(d: any) => d.ac && onSelect(d.ac)} cursor="pointer">
            {data.map((d, i) => <Cell key={i} fill={d.swing >= 0 ? "var(--mahayuti)" : "var(--mva)"} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="text-[10px] text-muted-foreground text-center mt-1">Vote-share swing LS → VS (percentage points) · click a bar to inspect</div>
    </div>
  );
}

function TurnoutScatter({ acs }: { acs: AC[] }) {
  const data = acs.map(a => ({ x: a.lok_sabha_2024.turnout_pct, y: a.vidhan_sabha_2024.turnout_pct, c: a.vidhan_sabha_2024.winning_alliance, name: a.ac_name }));
  return (
    <div className="h-[280px]">
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 8, right: 16, bottom: 24, left: 32 }}>
          <XAxis type="number" dataKey="x" name="LS turnout" domain={[48, 60]} tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }} label={{ value: "Lok Sabha turnout %", position: "insideBottom", offset: -8, fontSize: 10, fill: "oklch(0.6 0 0)" }} />
          <YAxis type="number" dataKey="y" name="VS turnout" domain={[50, 60]} tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }} label={{ value: "Vidhan Sabha turnout %", angle: -90, position: "insideLeft", fontSize: 10, fill: "oklch(0.6 0 0)" }} />
          <ZAxis range={[60, 60]} />
          <ReferenceLine segment={[{ x: 48, y: 48 }, { x: 60, y: 60 }]} stroke="oklch(1 0 0 / 0.18)" strokeDasharray="3 3" />
          <Scatter data={data}>
            {data.map((d, i) => <Cell key={i} fill={d.c === "Mahayuti" ? "var(--mahayuti)" : "var(--mva)"} fillOpacity={0.8} />)}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <div className="text-[10px] text-muted-foreground text-center">Each dot = one AC. Diagonal = equal turnout in both elections.</div>
    </div>
  );
}

// keep fmtInt imported to silence unused warning if needed
void fmtInt; void fmtPct;
