import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/shell";
import { Link } from "@tanstack/react-router";
import { ACS, ALLIANCE_OF, filterByPC, type Party, type Alliance } from "@/data/constituencies";
import { DEMOGRAPHICS, type IncomeTier, type DensityTier, type GeoZone } from "@/data/demographics";
import { ALLIANCE_COLOR, PARTY_COLOR, fmtPct } from "@/lib/election-colors";
import { useFilters } from "@/hooks/use-filters";
import { useState } from "react";
import { motion } from "motion/react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  ScatterChart, Scatter, ReferenceLine, ZAxis, LabelList,
} from "recharts";
import { ArrowRight, Sparkles, Users, MapPin, TrendingDown, Vote, Building2, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/insights")({ component: Page });

const tipStyle = {
  background: "oklch(0.205 0.014 250)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 6,
  fontSize: 12,
};

const SECTIONS = [
  { id: "shift",      label: "Preference Shift",  icon: ArrowRight },
  { id: "parties",    label: "Party Dynamics",    icon: Vote },
  { id: "turnout",    label: "Turnout Patterns",  icon: TrendingDown },
  { id: "split",      label: "Split-Ticket",      icon: Sparkles },
  { id: "urban",      label: "Urban Patterns",    icon: Building2 },
  { id: "demo",       label: "Demographic Lens",  icon: Users },
  { id: "geo",        label: "Geographic Lens",   icon: MapPin },
];

function Page() {
  const { pc } = useFilters();
  const acs = filterByPC(pc);

  return (
    <Shell>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
        {/* In-page TOC */}
        <aside className="hidden lg:block sticky top-20 self-start">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">On this page</div>
          <nav className="flex flex-col gap-0.5">
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground py-1.5 px-2 rounded hover:bg-accent/40">
                <s.icon className="h-3.5 w-3.5" />
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-8 min-w-0">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight">Outcome Insights</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Seven interactive lenses on Mumbai's 2024 split-ticket vote — preferences, parties, turnout, geography, and demographics.
            </p>
          </header>

          <PreferenceShift acs={acs} />
          <PartyDynamics acs={acs} />
          <TurnoutPatterns acs={acs} />
          <SplitTicketSection acs={acs} />
          <UrbanPatterns acs={acs} />
          <DemographicLens acs={acs} />
          <GeographicLens acs={acs} />
        </div>
      </div>
    </Shell>
  );
}

/* ---------- shared ---------- */

function SectionHeader({ id, eyebrow, title, blurb, Icon }:
  { id: string; eyebrow: string; title: string; blurb: string; Icon: any }) {
  return (
    <header id={id} className="scroll-mt-24">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-primary">
        <Icon className="h-3.5 w-3.5" /> {eyebrow}
      </div>
      <h2 className="text-lg font-semibold tracking-tight mt-1">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1 max-w-3xl">{blurb}</p>
    </header>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-border bg-card/40 p-4 ${className}`}>{children}</div>
  );
}

/* ---------- 1. Preference Shift ---------- */
function PreferenceShift({ acs }: { acs: typeof ACS }) {
  const totals = acs.reduce((acc, a) => {
    acc.lsM += a.lok_sabha_2024.winning_alliance === "Mahayuti" ? 1 : 0;
    acc.lsV += a.lok_sabha_2024.winning_alliance === "MVA" ? 1 : 0;
    acc.vsM += a.vidhan_sabha_2024.winning_alliance === "Mahayuti" ? 1 : 0;
    acc.vsV += a.vidhan_sabha_2024.winning_alliance === "MVA" ? 1 : 0;
    return acc;
  }, { lsM: 0, lsV: 0, vsM: 0, vsV: 0 });

  const shiftToMahayuti = totals.vsM - totals.lsM;
  const swingAvg = acs.reduce((s, a) => s + a.metrics.vote_share_swing_pct, 0) / acs.length;

  const data = [
    { cycle: "Lok Sabha", Mahayuti: totals.lsM, MVA: totals.lsV },
    { cycle: "Vidhan Sabha", Mahayuti: totals.vsM, MVA: totals.vsV },
  ];

  return (
    <section className="space-y-3">
      <SectionHeader id="shift" eyebrow="01 — Preference shift" Icon={ArrowRight}
        title="How voter preferences shifted between Parliament and Assembly"
        blurb="A summer LS vote leaning toward MVA flipped decisively to Mahayuti within six months — and the swing was sharpest at the assembly tier." />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4">
        <Card>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="cycle" tick={{ fontSize: 11, fill: "oklch(0.68 0.018 250)" }} />
                <YAxis tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} />
                <Tooltip contentStyle={tipStyle} />
                <Bar dataKey="Mahayuti" stackId="a" fill="var(--mahayuti)" radius={[0, 0, 0, 0]}>
                  <LabelList dataKey="Mahayuti" position="center" fill="black" fontSize={11} fontWeight={600} />
                </Bar>
                <Bar dataKey="MVA" stackId="a" fill="var(--mva)" radius={[3, 3, 0, 0]}>
                  <LabelList dataKey="MVA" position="center" fill="black" fontSize={11} fontWeight={600} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="flex flex-col justify-between">
          <Stat label="AC-level swing toward Mahayuti" value={`${shiftToMahayuti > 0 ? "+" : ""}${shiftToMahayuti} seats`} accent />
          <Stat label="Average vote-share swing (LS→VS)" value={fmtPct(swingAvg, true)} />
          <Stat label="ACs that flipped alliance" value={`${acs.filter(a => a.metrics.alliance_split_ticket).length} of ${acs.length}`} />
          <p className="text-[11px] text-muted-foreground leading-relaxed mt-2">
            Mumbai's voter sent two different messages: a parliamentary verdict shaped by national mood,
            and a state verdict shaped by local incumbency, candidate strength and welfare cycles.
          </p>
        </Card>
      </div>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border-t border-border pt-2 first:border-t-0 first:pt-0">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-xl font-semibold num mt-0.5 ${accent ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}

/* ---------- 2. Party Dynamics ---------- */
function PartyDynamics({ acs }: { acs: typeof ACS }) {
  const parties: Party[] = ["BJP", "SHS", "NCP", "INC", "SS(UBT)", "NCP(SP)"];
  const data = parties.map(p => {
    const ls = acs.filter(a => a.lok_sabha_2024.winning_party === p).length;
    const vs = acs.filter(a => a.vidhan_sabha_2024.winning_party === p).length;
    return { party: p, LS: ls, VS: vs, delta: vs - ls, alliance: ALLIANCE_OF[p] };
  });

  return (
    <section className="space-y-3">
      <SectionHeader id="parties" eyebrow="02 — Party dynamics" Icon={Vote}
        title="Which parties gained or lost influence — local vs national"
        blurb="Within each alliance, the local brand often beat the national one. BJP held its core, Eknath Shinde's Shiv Sena expanded, while Uddhav's SS(UBT) and Congress contracted at the assembly tier." />
      <Card>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="party" tick={{ fontSize: 11, fill: "oklch(0.68 0.018 250)" }} />
              <YAxis tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} />
              <Tooltip contentStyle={tipStyle}
                formatter={(v: any, _n: string, item: any) => [`${v} ACs`, item?.dataKey]} />
              <Bar dataKey="LS" radius={[3, 3, 0, 0]}>
                {data.map(d => <Cell key={`ls-${d.party}`} fill={PARTY_COLOR[d.party]} fillOpacity={0.45} />)}
                <LabelList dataKey="LS" position="top" fill="oklch(0.68 0.018 250)" fontSize={10} />
              </Bar>
              <Bar dataKey="VS" radius={[3, 3, 0, 0]}>
                {data.map(d => <Cell key={`vs-${d.party}`} fill={PARTY_COLOR[d.party]} />)}
                <LabelList dataKey="VS" position="top" fill="oklch(0.92 0 0)" fontSize={10} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center gap-4 text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm" style={{ background: "oklch(0.74 0.18 50)", opacity: 0.45 }} /> Lok Sabha</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm" style={{ background: "oklch(0.74 0.18 50)" }} /> Vidhan Sabha</span>
        </div>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
          {data.map(d => (
            <div key={d.party} className="rounded-md border border-border px-3 py-2 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-sm" style={{ background: PARTY_COLOR[d.party] }} />
                {d.party}
              </span>
              <span className={`num ${d.delta > 0 ? "text-[color:var(--mahayuti)]" : d.delta < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                {d.delta > 0 ? "+" : ""}{d.delta}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

/* ---------- 3. Turnout patterns ---------- */
function TurnoutPatterns({ acs }: { acs: typeof ACS }) {
  const ls = avg(acs.map(a => a.lok_sabha_2024.turnout_pct));
  const vs = avg(acs.map(a => a.vidhan_sabha_2024.turnout_pct));
  const drop = vs - ls;

  // turnout by income tier
  const byIncome: Record<IncomeTier, { ls: number[]; vs: number[] }> = {
    Affluent: { ls: [], vs: [] }, Middle: { ls: [], vs: [] }, Mixed: { ls: [], vs: [] }, "Low-income": { ls: [], vs: [] },
  };
  acs.forEach(a => {
    const t = DEMOGRAPHICS[a.ac_number].income;
    byIncome[t].ls.push(a.lok_sabha_2024.turnout_pct);
    byIncome[t].vs.push(a.vidhan_sabha_2024.turnout_pct);
  });
  const incomeData = (Object.keys(byIncome) as IncomeTier[]).map(t => ({
    tier: t,
    LS: +avg(byIncome[t].ls).toFixed(1),
    VS: +avg(byIncome[t].vs).toFixed(1),
  }));

  return (
    <section className="space-y-3">
      <SectionHeader id="turnout" eyebrow="03 — Turnout patterns" Icon={TrendingDown}
        title="Variations in turnout between the two cycles"
        blurb="Assembly turnout came in slightly below LS in most segments — voter fatigue was real but uneven. Affluent and middle-income clusters showed sharper declines than dense, lower-income wards." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Stat label="Lok Sabha avg turnout" value={`${ls.toFixed(1)}%`} />
          <Stat label="Vidhan Sabha avg turnout" value={`${vs.toFixed(1)}%`} />
          <Stat label="Delta" value={fmtPct(drop, true)} accent />
        </Card>
        <Card className="md:col-span-2">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Turnout by income tier</div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={incomeData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="tier" tick={{ fontSize: 11, fill: "oklch(0.68 0.018 250)" }} />
                <YAxis domain={[45, 55]} tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} unit="%" />
                <Tooltip contentStyle={tipStyle} />
                <Bar dataKey="LS" fill="var(--accent-cyan)" fillOpacity={0.5} radius={[3, 3, 0, 0]} />
                <Bar dataKey="VS" fill="var(--mahayuti)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
}

/* ---------- 4. Split-Ticket ---------- */
function SplitTicketSection({ acs }: { acs: typeof ACS }) {
  const split = acs.filter(a => a.metrics.alliance_split_ticket);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section className="space-y-3">
      <SectionHeader id="split" eyebrow="04 — Split-ticket" Icon={Sparkles}
        title="Constituencies that chose different alliances for Parliament and Assembly"
        blurb={`${split.length} of ${acs.length} ACs are split-ticket — voters consciously picked one alliance for Delhi and the other for Mumbai's state legislature. Hover any pair to inspect.`} />
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {split.map(a => (
            <motion.div key={a.ac_number}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              onMouseEnter={() => setHover(a.ac_number)} onMouseLeave={() => setHover(null)}
              className="rounded-md border border-border bg-background/60 px-3 py-2.5 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{a.ac_name} <span className="text-[10px] text-muted-foreground num ml-1">#{a.ac_number}</span></div>
                <div className="text-[10px] text-muted-foreground truncate">{a.parent_pc}</div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px]">
                <AllianceChip alliance={a.lok_sabha_2024.winning_alliance} label="LS" />
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                <AllianceChip alliance={a.vidhan_sabha_2024.winning_alliance} label="VS" />
              </div>
              <div className="num text-xs text-primary w-14 text-right">
                {fmtPct(a.metrics.vote_share_swing_pct, true)}
              </div>
            </motion.div>
          ))}
          {split.length === 0 && <div className="text-xs text-muted-foreground">No split-ticket ACs in this filter.</div>}
        </div>
        {hover !== null && (
          <div className="mt-3 text-[11px] text-muted-foreground">
            Hovered: <span className="text-foreground">{acs.find(a => a.ac_number === hover)?.ac_name}</span> ·
            Local candidate strength and welfare promises were the most-cited drivers of switching between July and November 2024.
          </div>
        )}
      </Card>
    </section>
  );
}

function AllianceChip({ alliance, label }: { alliance: Alliance; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium"
      style={{ background: `color-mix(in oklab, ${ALLIANCE_COLOR[alliance]} 30%, transparent)`,
               color: ALLIANCE_COLOR[alliance] }}>
      {label} · {alliance}
    </span>
  );
}

/* ---------- 5. Urban patterns ---------- */
function UrbanPatterns({ acs }: { acs: typeof ACS }) {
  const tiers: DensityTier[] = ["Sparse", "Mixed", "Dense", "Ultra-dense"];
  const data = tiers.map(t => {
    const subset = acs.filter(a => DEMOGRAPHICS[a.ac_number].density === t);
    const vsMah = subset.filter(a => a.vidhan_sabha_2024.winning_alliance === "Mahayuti").length;
    const vsMva = subset.filter(a => a.vidhan_sabha_2024.winning_alliance === "MVA").length;
    return { tier: t, Mahayuti: vsMah, MVA: vsMva, total: subset.length };
  });

  return (
    <section className="space-y-3">
      <SectionHeader id="urban" eyebrow="05 — Urban patterns" Icon={Building2}
        title="Urban political behavior — density tells a story"
        blurb="Sparse, planned, affluent neighborhoods consolidate behind Mahayuti. Ultra-dense, mixed wards remain the most competitive — and the ones MVA still wins are clustered here." />
      <Card>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart layout="vertical" data={data} margin={{ top: 8, right: 16, bottom: 8, left: 60 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} allowDecimals={false} />
              <YAxis type="category" dataKey="tier" tick={{ fontSize: 11, fill: "oklch(0.68 0.018 250)" }} width={90} />
              <Tooltip contentStyle={tipStyle} />
              <Bar dataKey="Mahayuti" stackId="a" fill="var(--mahayuti)" />
              <Bar dataKey="MVA" stackId="a" fill="var(--mva)" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </section>
  );
}

/* ---------- 6. Demographic Lens ---------- */
function DemographicLens({ acs }: { acs: typeof ACS }) {
  // Correlation: Muslim share (X) vs VS Mahayuti vote share (Y)
  const data = acs.map(a => ({
    name: a.ac_name,
    x: DEMOGRAPHICS[a.ac_number].muslim_share_pct,
    y: a.vidhan_sabha_2024.winning_alliance === "Mahayuti"
        ? a.vidhan_sabha_2024.vote_share_pct
        : 100 - a.vidhan_sabha_2024.vote_share_pct,
    alliance: a.vidhan_sabha_2024.winning_alliance,
  }));

  return (
    <section className="space-y-3">
      <SectionHeader id="demo" eyebrow="06 — Demographic lens" Icon={Users}
        title="Where demographics correlate with outcomes"
        blurb="Estimated Muslim community share plotted against Mahayuti's VS vote share. A clear negative slope — higher minority share generally aligns with stronger MVA performance — but with notable exceptions." />
      <Card>
        <div className="h-80">
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 8, right: 16, bottom: 30, left: 8 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
              <XAxis type="number" dataKey="x" name="Community share" unit="%" domain={[0, 45]}
                tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }}>
              </XAxis>
              <YAxis type="number" dataKey="y" name="Mahayuti share" unit="%" domain={[25, 75]}
                tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} />
              <ZAxis range={[80, 80]} />
              <Tooltip contentStyle={tipStyle}
                formatter={(v: any, n: string) => [typeof v === "number" ? v.toFixed(1) + "%" : v, n]}
                labelFormatter={(_, p) => (p && p[0]?.payload?.name) || ""} />
              <Scatter data={data}>
                {data.map((d, i) => (
                  <Cell key={i} fill={d.alliance === "Mahayuti" ? "var(--mahayuti)" : "var(--mva)"} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">
          Note: community-share figures are illustrative mock values, not official census data. Use directionally.
        </p>
      </Card>
    </section>
  );
}

/* ---------- 7. Geographic Lens ---------- */
function GeographicLens({ acs }: { acs: typeof ACS }) {
  const zones: GeoZone[] = ["Island City", "Western Suburbs", "Eastern Suburbs"];
  const data = zones.map(z => {
    const subset = acs.filter(a => DEMOGRAPHICS[a.ac_number].geo === z);
    const mva = subset.filter(a => a.vidhan_sabha_2024.winning_alliance === "MVA").length;
    const mah = subset.filter(a => a.vidhan_sabha_2024.winning_alliance === "Mahayuti").length;
    const avgSwing = avg(subset.map(a => a.metrics.vote_share_swing_pct));
    return { zone: z, MVA: mva, Mahayuti: mah, swing: +avgSwing.toFixed(1), total: subset.length };
  });

  return (
    <section className="space-y-3">
      <SectionHeader id="geo" eyebrow="07 — Geographic lens" Icon={MapPin}
        title="Mumbai by zone — Island, West, East"
        blurb="The geographic split is stark: the Eastern Suburbs swung hardest to Mahayuti, the Island City retains MVA pockets, and the Western Suburbs are now Mahayuti's strongest belt." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map(d => (
          <Card key={d.zone}>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.zone}</div>
            <div className="mt-1 text-xs text-muted-foreground num">{d.total} ACs</div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full flex">
                <div style={{ width: `${(d.Mahayuti / d.total) * 100}%`, background: "var(--mahayuti)" }} />
                <div style={{ width: `${(d.MVA / d.total) * 100}%`, background: "var(--mva)" }} />
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs num">
              <span style={{ color: "var(--mahayuti)" }}>{d.Mahayuti} Mahayuti</span>
              <span style={{ color: "var(--mva)" }}>{d.MVA} MVA</span>
            </div>
            <div className="mt-3 border-t border-border pt-2">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Avg vote-share swing</div>
              <div className="text-xl font-semibold num text-primary">{fmtPct(d.swing, true)}</div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-2 text-[11px] text-muted-foreground">
        Want a tile-level view? <Link to="/mapping" className="text-foreground underline">Open the comparative map →</Link>
      </div>
    </section>
  );
}

function avg(arr: number[]) { return arr.reduce((s, x) => s + x, 0) / (arr.length || 1); }
