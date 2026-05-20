import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/shell";
import { useState, useMemo } from "react";
import { MumbaiMap } from "@/components/map/mumbai-map";
import { ACDetailSheet } from "@/components/map/ac-detail-sheet";
import { aggregateSeats, filterByPC, type AC } from "@/data/constituencies";
import { ALLIANCE_COLOR } from "@/lib/election-colors";
import { splitTicketACs } from "@/lib/metrics";
import { lsAllianceForAC } from "@/data/pc-results";
import { FinalTakeaways } from "@/components/common/final-takeaways";
import { AllianceGlossary } from "@/components/common/alliance-glossary";
import { DataAttribution } from "@/components/common/data-attribution";
import { useFilters } from "@/hooks/use-filters";
import { BRIEF_INTRO, ELECTION_LABELS } from "@/data/case-study";
import { HeadlineTakeaway, buildHeadline } from "@/components/common/headline-takeaway";
import { SplitTicketCard } from "@/components/common/split-ticket-card";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Activity, TrendingUp, Vote, ChevronRight } from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis,
  ScatterChart, Scatter, ZAxis, ReferenceLine,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mumbai 2024 · Parliament vs State Assembly" },
      {
        name: "description",
        content: "How Mumbai voted in Lok Sabha and Vidhan Sabha 2024: maps, voter shifts, and takeaways.",
      },
    ],
  }),
  component: Page,
});

const SPLIT_PREVIEW = 9;

function Page() {
  const { pc } = useFilters();
  const acs = filterByPC(pc);
  const [cycle, setCycle] = useState<"ls" | "vs">("vs");
  const [selected, setSelected] = useState<AC | null>(null);

  const ls = aggregateSeats("ls", acs);
  const vs = aggregateSeats("vs", acs);
  const split = splitTicketACs(acs);
  const splitBreakdown = useMemo(() => {
    let mvaToMah = 0;
    let mahToMva = 0;
    for (const a of split) {
      if (lsAllianceForAC(a.pc_slug) === "MVA") mvaToMah++;
      else mahToMva++;
    }
    return { mvaToMah, mahToMva };
  }, [split]);

  const avgLS = acs.reduce((s, a) => s + a.lok_sabha_2024.turnout_pct, 0) / acs.length;
  const avgVS = acs.reduce((s, a) => s + a.vidhan_sabha_2024.turnout_pct, 0) / acs.length;
  const current = cycle === "ls" ? ls : vs;
  const unitLabel = cycle === "ls" ? "PCs" : "ACs";

  const headline = useMemo(
    () => buildHeadline(ls, vs, split.length, acs.length),
    [ls, vs, split.length, acs.length],
  );

  const topSwings = useMemo(
    () =>
      [...acs]
        .sort((a, b) => Math.abs(b.metrics.vote_share_swing_pct) - Math.abs(a.metrics.vote_share_swing_pct))
        .slice(0, 3)
        .map((a) => a.ac_name)
        .join(", "),
    [acs],
  );

  return (
    <Shell>
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Header + alliance glossary top right */}
        <div className="space-y-4 border-b border-border pb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <header className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-wider text-primary">Mumbai · 2024 elections</p>
              <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight mt-1">{BRIEF_INTRO.title}</h1>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-md border border-border bg-card/50 px-2.5 py-1">
                  {BRIEF_INTRO.elections.parliament.name} · {BRIEF_INTRO.elections.parliament.when}
                </span>
                <span className="rounded-md border border-border bg-card/50 px-2.5 py-1">
                  {BRIEF_INTRO.elections.assembly.name} · {BRIEF_INTRO.elections.assembly.when}
                </span>
              </div>
            </header>
            <AllianceGlossary />
          </div>
          <HeadlineTakeaway line1={headline.line1} line2={headline.line2} />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5 lg:items-start">
          <div className="lg:sticky lg:top-4 rounded-xl border border-border bg-card/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h2 className="text-sm font-semibold">City map</h2>
              <CycleToggle cycle={cycle} setCycle={setCycle} />
            </div>
            <div className="relative h-[400px] lg:h-[480px] w-full rounded-lg bg-background/60 overflow-hidden">
              <MumbaiMap cycle={cycle} onSelect={setSelected} highlightPC={pc} />
              <div className="absolute bottom-3 left-3 rounded-md border border-border bg-background/90 px-2 py-1 text-[10px] text-muted-foreground pointer-events-none">
                {cycle === "ls" ? ELECTION_LABELS.ls.full : ELECTION_LABELS.vs.full}
              </div>
              <MapLegend />
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              May: winning alliance for the MP seat covering each tile. November: winning alliance for each assembly segment.
            </p>
          </div>

          <div className="space-y-3">
            <BigScore cycle={cycle} mahayuti={current.mahayuti} mva={current.mva} total={current.total} unitLabel={unitLabel} />
            <StatChip
              label="Split-ticket segments"
              value={`${split.length} / ${acs.length}`}
              detail={`${splitBreakdown.mvaToMah} MVA→Mahayuti · ${splitBreakdown.mahToMva} reverse`}
              highlight
            />
            <StatChip label="May · Lok Sabha" value={`MVA ${ls.mva}/${ls.total} PCs`} detail={`Nov: Mahayuti ${vs.mahayuti}/${vs.total} MLAs`} />
            <StatChip label="Turnout (city avg.)" value={`${avgLS.toFixed(1)}% → ${avgVS.toFixed(1)}%`} detail="May to November" />
          </div>
        </section>

        {/* Section-wise storytelling */}
        <div className="space-y-14 lg:space-y-16 pt-2">
          <StorySection
            chapter="Section 1"
            title="The two verdicts"
            lead={`In May the MVA bloc won ${ls.mva} of ${ls.total} parliamentary seats in Mumbai. In November Mahayuti won ${vs.mahayuti} of ${vs.total} assembly seats.`}
            analysis="The seat counts are fixed in the data above. Press coverage of May stressed national issues (Sena and NCP splits, alliance choice). Coverage of November stressed MLAs, ward teams, and civic problems. Many areas did not repeat the same winning alliance, which fits two different ballots rather than one city-wide party shift."
            readMore={{ to: "/analysis", label: "Read full analysis" }}
          >
            <FlipStrip ls={ls} vs={vs} />
          </StorySection>

          <StorySection
            chapter="Section 2"
            title="Where the electorate changed alliance"
            lead={`${split.length} assembly segments returned a different winning alliance in May (Lok Sabha) than in November (Vidhan Sabha).`}
            analysis={`${splitBreakdown.mvaToMah} areas were opposition-leaning in May's parliamentary mapping and ruling-alliance in November's assembly result. ${splitBreakdown.mahToMva} went the other way, often in the west where Uddhav Sena or Congress still won the assembly seat. Cards show May then November; reasons are local and vary by area.`}
            readMore={{ to: "/analysis", label: "Full analysis" }}
          >
            <SplitSummary mvaToMah={splitBreakdown.mvaToMah} mahToMva={splitBreakdown.mahToMva} />
            <p className="text-[11px] text-muted-foreground">Each card: May (Parliament) first, then November (State).</p>
            <SplitGrid split={split.slice(0, SPLIT_PREVIEW)} onSelect={setSelected} />
            {split.length > SPLIT_PREVIEW && (
              <p className="text-xs text-muted-foreground text-center">
                {SPLIT_PREVIEW} of {split.length} areas shown.{" "}
                <Link to="/analysis" className="text-primary underline">
                  See full list
                </Link>
              </p>
            )}
          </StorySection>

          <StorySection
            chapter="Section 3"
            title="Vote-share movement between elections"
            lead={`The largest swings between May and November include ${topSwings}.`}
            analysis="Bars show how much the winning alliance's vote share moved between elections. Big moves usually line up with a change in which alliance won the area. Orange: toward Mahayuti. Green: toward MVA. Campaign reporting often ties large moves to candidate strength and booth work; this chart only shows the share change in the data."
            readMore={{ to: "/swing", label: "Vote share and margins" }}
          >
            <SwingBars acs={acs} onSelect={setSelected} />
          </StorySection>

          <StorySection
            chapter="Section 4"
            title="Turnout and the result change"
            lead={`Average participation was ${avgLS.toFixed(1)}% in May and ${avgVS.toFixed(1)}% in November.`}
            analysis="Average turnout was close in May and November, so the main change is how votes split, not a big drop in participation. Points far from the diagonal are areas where November's assembly winner did not match May's parliamentary lean for that tile."
            readMore={{ to: "/turnout", label: "Turnout by area" }}
          >
            <TurnoutScatter acs={acs} />
          </StorySection>

          <FinalTakeaways />
          <DataAttribution />
        </div>
      </div>

      <ACDetailSheet ac={selected} onClose={() => setSelected(null)} />
    </Shell>
  );
}

function StorySection({
  chapter,
  title,
  lead,
  analysis,
  readMore,
  children,
}: {
  chapter: string;
  title: string;
  lead: string;
  analysis: string;
  readMore: { to: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-6 lg:gap-10">
      <div className="lg:pr-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-primary">{chapter}</p>
        <h2 className="text-lg lg:text-xl font-semibold tracking-tight mt-2 leading-snug">{title}</h2>
        <p className="text-sm font-medium text-foreground/90 mt-3 leading-relaxed">{lead}</p>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{analysis}</p>
        <Link
          to={readMore.to}
          className="inline-flex items-center gap-1.5 mt-5 text-xs font-medium text-primary hover:underline"
        >
          {readMore.label}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="rounded-xl border border-border bg-card/40 p-4 lg:p-5 space-y-3 min-w-0">{children}</div>
    </section>
  );
}

function CycleToggle({ cycle, setCycle }: { cycle: "ls" | "vs"; setCycle: (c: "ls" | "vs") => void }) {
  return (
    <div className="relative inline-flex items-center rounded-full border border-border bg-background p-1 text-xs">
      <button
        onClick={() => setCycle("ls")}
        className={`relative z-10 px-3 py-1.5 font-medium ${cycle === "ls" ? "text-primary-foreground" : "text-muted-foreground"}`}
      >
        May
      </button>
      <button
        onClick={() => setCycle("vs")}
        className={`relative z-10 px-3 py-1.5 font-medium ${cycle === "vs" ? "text-primary-foreground" : "text-muted-foreground"}`}
      >
        November
      </button>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="absolute inset-y-1 rounded-full bg-primary"
        style={{ width: "calc(50% - 4px)", left: cycle === "ls" ? 4 : "calc(50% + 0px)" }}
      />
    </div>
  );
}

function MapLegend() {
  return (
    <div className="absolute top-3 right-3 rounded-md border border-border bg-background/90 px-2 py-1 text-[10px] flex gap-3">
      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-sm" style={{ background: "var(--mahayuti)" }} />
        Mahayuti
      </span>
      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-sm" style={{ background: "var(--mva)" }} />
        MVA
      </span>
    </div>
  );
}

function BigScore({
  cycle,
  mahayuti,
  mva,
  total,
  unitLabel,
}: {
  cycle: "ls" | "vs";
  mahayuti: number;
  mva: number;
  total: number;
  unitLabel: string;
}) {
  const winner = mahayuti >= mva ? "Mahayuti" : "MVA";
  const winnerCount = Math.max(mahayuti, mva);
  const when = cycle === "ls" ? "May · Lok Sabha" : "Nov · Vidhan Sabha";
  return (
    <div className="rounded-xl border border-border bg-card/40 p-4">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        <Vote className="h-3 w-3" /> {when}
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <motion.div
          key={`${cycle}-${winner}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold num"
          style={{ color: ALLIANCE_COLOR[winner] }}
        >
          {winnerCount}
        </motion.div>
        <span className="text-sm text-muted-foreground num">/ {total} {unitLabel}</span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full overflow-hidden bg-muted flex">
        <div style={{ width: `${(mahayuti / total) * 100}%`, background: "var(--mahayuti)" }} />
        <div style={{ width: `${(mva / total) * 100}%`, background: "var(--mva)" }} />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] num text-muted-foreground">
        <span>{mahayuti} Mahayuti</span>
        <span>{mva} MVA</span>
      </div>
    </div>
  );
}

function StatChip({
  label,
  value,
  detail,
  highlight,
}: {
  label: string;
  value: string;
  detail: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card/40 px-4 py-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-lg font-semibold num mt-0.5 ${highlight ? "text-primary" : ""}`}>{value}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{detail}</div>
    </div>
  );
}

function FlipStrip({
  ls,
  vs,
}: {
  ls: { mahayuti: number; mva: number; total: number };
  vs: { mahayuti: number; mva: number; total: number };
}) {
  return (
    <div className="space-y-4">
      <ScoreBar label="May 2024 · Lok Sabha (Parliament)" mahayuti={ls.mahayuti} mva={ls.mva} total={ls.total} unit="MP seats" />
      <ScoreBar label="Nov 2024 · Vidhan Sabha (State)" mahayuti={vs.mahayuti} mva={vs.mva} total={vs.total} unit="MLA seats" />
    </div>
  );
}

function ScoreBar({
  label,
  mahayuti,
  mva,
  total,
  unit,
}: {
  label: string;
  mahayuti: number;
  mva: number;
  total: number;
  unit: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="num text-muted-foreground">
          {mahayuti} Mahayuti · {mva} MVA / {total} {unit}
        </span>
      </div>
      <div className="h-3 w-full rounded-full overflow-hidden bg-muted flex">
        <div style={{ width: `${(mahayuti / total) * 100}%`, background: "var(--mahayuti)" }} />
        <div style={{ width: `${(mva / total) * 100}%`, background: "var(--mva)" }} />
      </div>
    </div>
  );
}

function SplitSummary({ mvaToMah, mahToMva }: { mvaToMah: number; mahToMva: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
      <div className="rounded-md border border-border bg-background/60 p-3">
        <span className="font-medium">{mvaToMah} segments</span>
        <p className="text-muted-foreground mt-1">
          <span className="text-[color:var(--mva)]">May · MVA (Lok Sabha)</span>
          <ChevronRight className="inline h-3 w-3 mx-0.5 align-middle" />
          <span className="text-[color:var(--mahayuti)]">November · Mahayuti (Vidhan Sabha)</span>
        </p>
      </div>
      <div className="rounded-md border border-border bg-background/60 p-3">
        <span className="font-medium">{mahToMva} segments</span>
        <p className="text-muted-foreground mt-1">
          <span className="text-[color:var(--mahayuti)]">May · Mahayuti (Lok Sabha)</span>
          <ChevronRight className="inline h-3 w-3 mx-0.5 align-middle" />
          <span className="text-[color:var(--mva)]">November · MVA (Vidhan Sabha)</span>
        </p>
      </div>
    </div>
  );
}

function SplitGrid({ split, onSelect }: { split: AC[]; onSelect: (ac: AC) => void }) {
  if (!split.length) return <p className="text-xs text-muted-foreground">No split segments in this filter.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {split.map((a) => (
        <SplitTicketCard key={a.ac_number} ac={a} onClick={() => onSelect(a)} />
      ))}
    </div>
  );
}

function SwingBars({ acs, onSelect }: { acs: AC[]; onSelect: (ac: AC) => void }) {
  const sorted = [...acs]
    .sort((a, b) => Math.abs(b.metrics.vote_share_swing_pct) - Math.abs(a.metrics.vote_share_swing_pct))
    .slice(0, 12);
  const data = sorted.map((a) => ({ name: a.ac_name, swing: a.metrics.vote_share_swing_pct, ac: a }));
  return (
    <div className="h-[300px]">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, bottom: 4, left: 88 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" width={88} tick={{ fontSize: 10, fill: "oklch(0.7 0 0)" }} axisLine={false} tickLine={false} />
          <ReferenceLine x={0} stroke="oklch(1 0 0 / 0.2)" />
          <Bar dataKey="swing" radius={[0, 3, 3, 0]} onClick={(d: { ac?: AC }) => d.ac && onSelect(d.ac)} cursor="pointer">
            {data.map((d, i) => (
              <Cell key={i} fill={d.swing >= 0 ? "var(--mahayuti)" : "var(--mva)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-muted-foreground text-center mt-2">Percentage-point change in winning share, May to November</p>
    </div>
  );
}

function TurnoutScatter({ acs }: { acs: AC[] }) {
  const data = acs.map((a) => ({
    x: a.lok_sabha_2024.turnout_pct,
    y: a.vidhan_sabha_2024.turnout_pct,
    c: a.vidhan_sabha_2024.winning_alliance,
  }));
  return (
    <div className="h-[260px]">
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 8, right: 12, bottom: 28, left: 36 }}>
          <XAxis type="number" dataKey="x" domain={[48, 60]} tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }} label={{ value: "May turnout %", position: "insideBottom", offset: -6, fontSize: 10, fill: "oklch(0.6 0 0)" }} />
          <YAxis type="number" dataKey="y" domain={[50, 60]} tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }} label={{ value: "November turnout %", angle: -90, position: "insideLeft", fontSize: 10, fill: "oklch(0.6 0 0)" }} />
          <ZAxis range={[50, 50]} />
          <ReferenceLine segment={[{ x: 48, y: 48 }, { x: 60, y: 60 }]} stroke="oklch(1 0 0 / 0.15)" strokeDasharray="3 3" />
          <Scatter data={data}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.c === "Mahayuti" ? "var(--mahayuti)" : "var(--mva)"} fillOpacity={0.75} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
