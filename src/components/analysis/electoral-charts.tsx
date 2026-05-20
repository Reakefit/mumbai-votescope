/** Chart panels used on the Analysis page (evidence layer). */
import { Link } from "@tanstack/react-router";
import { ACS, aggregateSeats, type AC, type Party } from "@/data/constituencies";
import { splitTicketACs } from "@/lib/metrics";
import { lsAllianceForAC } from "@/data/pc-results";
import {
  partyDynamicsBlurb,
  partyDynamicsWhy,
  preferenceWhy,
  splitWhy,
  turnoutWhy,
  urbanWhy,
  geoWhy,
  demoWhy,
} from "@/lib/narratives";
import { DEMOGRAPHICS, type IncomeTier, type DensityTier, type GeoZone } from "@/data/demographics";
import { ALLIANCE_COLOR, PARTY_COLOR, fmtPct } from "@/lib/election-colors";
import { SplitTicketCard } from "@/components/common/split-ticket-card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  ScatterChart, Scatter, ReferenceLine, ZAxis, LabelList,
} from "recharts";
import { ArrowRight, Sparkles, Users, MapPin, TrendingDown, Vote, Building2 } from "lucide-react";

const tipStyle = {
  background: "oklch(0.205 0.014 250)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 6,
  fontSize: 12,
};

function SectionHeader({
  id,
  eyebrow,
  title,
  what,
  why,
  Icon,
}: {
  id: string;
  eyebrow: string;
  title: string;
  what: string;
  why: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <header id={id} className="scroll-mt-24">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-primary">
        <Icon className="h-3.5 w-3.5" /> {eyebrow}
      </div>
      <h2 className="text-lg font-semibold tracking-tight mt-1">{title}</h2>
      <p className="text-sm text-foreground/90 mt-2 max-w-3xl leading-relaxed">{what}</p>
      <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
        <span className="font-medium text-foreground">Context from reporting: </span>
        {why}
      </p>
    </header>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-border bg-card/40 p-4 ${className}`}>{children}</div>;
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border-t border-border pt-2 first:border-t-0 first:pt-0">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-xl font-semibold num mt-0.5 ${accent ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}

function avg(arr: number[]) {
  return arr.reduce((s, x) => s + x, 0) / (arr.length || 1);
}

export function ElectoralChartsPanel({ acs }: { acs: AC[] }) {
  return (
    <div className="space-y-10 border-t border-border pt-10">
      <header id="charts" className="scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight">Charts and quantitative evidence</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
          Interactive views below use the same dataset as the maps. Use them to verify claims in the narrative sections above.
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
  );
}

function PreferenceShift({ acs }: { acs: AC[] }) {
  const ls = aggregateSeats("ls", acs);
  const vs = aggregateSeats("vs", acs);
  const split = splitTicketACs(acs);
  const swingAvg = acs.reduce((s, a) => s + a.metrics.vote_share_swing_pct, 0) / acs.length;
  const data = [
    { cycle: "May · Parliament", Mahayuti: ls.mahayuti, MVA: ls.mva },
    { cycle: "November · State", Mahayuti: vs.mahayuti, MVA: vs.mva },
  ];
  return (
    <section className="space-y-3">
      <SectionHeader
        id="chart-shift"
        eyebrow="Evidence · Overall"
        Icon={ArrowRight}
        title="Seat totals: Parliament vs State"
        what={`May: MVA ${ls.mva}/${ls.total} MPs · November: Mahayuti ${vs.mahayuti}/${vs.total} MLAs · ${split.length} split areas`}
        why={preferenceWhy(acs, ls.mva, ls.total, vs.mahayuti, vs.total, split.length)}
      />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4">
        <Card>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="cycle" tick={{ fontSize: 11, fill: "oklch(0.68 0.018 250)" }} />
                <YAxis tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} />
                <Tooltip contentStyle={tipStyle} />
                <Bar dataKey="Mahayuti" stackId="a" fill="var(--mahayuti)">
                  <LabelList dataKey="Mahayuti" position="center" fill="black" fontSize={11} fontWeight={600} />
                </Bar>
                <Bar dataKey="MVA" stackId="a" fill="var(--mva)" radius={[3, 3, 0, 0]}>
                  <LabelList dataKey="MVA" position="center" fill="black" fontSize={11} fontWeight={600} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="space-y-3">
          <Stat label="Split-ticket areas" value={`${split.length} of ${acs.length}`} accent />
          <Stat label="Avg winner share shift" value={fmtPct(swingAvg, true)} />
        </Card>
      </div>
    </section>
  );
}

function PartyDynamics({ acs }: { acs: AC[] }) {
  const parties: Party[] = ["BJP", "SHS", "NCP", "INC", "SS(UBT)", "NCP(SP)"];
  const data = parties.map((p) => ({
    party: p,
    LS: acs.filter((a) => a.lok_sabha_2024.winning_party === p).length,
    VS: acs.filter((a) => a.vidhan_sabha_2024.winning_party === p).length,
  }));
  return (
    <section className="space-y-3">
      <SectionHeader
        id="chart-parties"
        eyebrow="Evidence · Parties"
        Icon={Vote}
        title="Party-wise areas won (May vs November)"
        what={partyDynamicsBlurb(acs)}
        why={partyDynamicsWhy(acs)}
      />
      <Card>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="party" tick={{ fontSize: 11, fill: "oklch(0.68 0.018 250)" }} />
              <YAxis tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} />
              <Tooltip contentStyle={tipStyle} formatter={(v: number) => [`${v} areas`, "Seats"]} />
              <Bar dataKey="LS" radius={[3, 3, 0, 0]}>
                {data.map((d) => (
                  <Cell key={`ls-${d.party}`} fill={PARTY_COLOR[d.party]} fillOpacity={0.45} />
                ))}
              </Bar>
              <Bar dataKey="VS" radius={[3, 3, 0, 0]}>
                {data.map((d) => (
                  <Cell key={`vs-${d.party}`} fill={PARTY_COLOR[d.party]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </section>
  );
}

function TurnoutPatterns({ acs }: { acs: AC[] }) {
  const ls = avg(acs.map((a) => a.lok_sabha_2024.turnout_pct));
  const vs = avg(acs.map((a) => a.vidhan_sabha_2024.turnout_pct));
  const byIncome: Record<IncomeTier, { ls: number[]; vs: number[] }> = {
    Affluent: { ls: [], vs: [] },
    Middle: { ls: [], vs: [] },
    Mixed: { ls: [], vs: [] },
    "Low-income": { ls: [], vs: [] },
  };
  acs.forEach((a) => {
    const t = DEMOGRAPHICS[a.ac_number].income;
    byIncome[t].ls.push(a.lok_sabha_2024.turnout_pct);
    byIncome[t].vs.push(a.vidhan_sabha_2024.turnout_pct);
  });
  const incomeData = (Object.keys(byIncome) as IncomeTier[]).map((t) => ({
    tier: t,
    LS: +avg(byIncome[t].ls).toFixed(1),
    VS: +avg(byIncome[t].vs).toFixed(1),
  }));
  return (
    <section className="space-y-3">
      <SectionHeader
        id="chart-turnout"
        eyebrow="Evidence · Turnout"
        Icon={TrendingDown}
        title="Turnout May vs November"
        what={`City average ${ls.toFixed(1)}% → ${vs.toFixed(1)}% (proxy turnout per sources note)`}
        why={turnoutWhy(acs)}
      />
      <Card>
        <div className="h-56">
          <ResponsiveContainer>
            <BarChart data={incomeData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="tier" tick={{ fontSize: 11, fill: "oklch(0.68 0.018 250)" }} />
              <YAxis domain={[45, 58]} tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} unit="%" />
              <Tooltip contentStyle={tipStyle} />
              <Bar dataKey="LS" fill="var(--accent-cyan)" fillOpacity={0.5} radius={[3, 3, 0, 0]} />
              <Bar dataKey="VS" fill="var(--mahayuti)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </section>
  );
}

function SplitTicketSection({ acs }: { acs: AC[] }) {
  const split = splitTicketACs(acs);
  let mvaToMah = 0;
  let mahToMva = 0;
  for (const a of split) {
    if (lsAllianceForAC(a.pc_slug) === "MVA") mvaToMah++;
    else mahToMva++;
  }
  return (
    <section className="space-y-3">
      <SectionHeader
        id="chart-split"
        eyebrow="Evidence · Split ticket"
        Icon={Sparkles}
        title="All split-ticket areas"
        what={`${split.length} areas · ${mvaToMah} MVA→Mahayuti · ${mahToMva} reverse`}
        why={splitWhy(mvaToMah, mahToMva)}
      />
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {split.map((a) => (
            <SplitTicketCard key={a.ac_number} ac={a} />
          ))}
        </div>
      </Card>
    </section>
  );
}

function UrbanPatterns({ acs }: { acs: AC[] }) {
  const tiers: DensityTier[] = ["Sparse", "Mixed", "Dense", "Ultra-dense"];
  const data = tiers.map((t) => {
    const subset = acs.filter((a) => DEMOGRAPHICS[a.ac_number].density === t);
    return {
      tier: t,
      Mahayuti: subset.filter((a) => a.vidhan_sabha_2024.winning_alliance === "Mahayuti").length,
      MVA: subset.filter((a) => a.vidhan_sabha_2024.winning_alliance === "MVA").length,
    };
  });
  return (
    <section className="space-y-3">
      <SectionHeader
        id="chart-urban"
        eyebrow="Evidence · Density"
        Icon={Building2}
        title="November results by neighbourhood density (illustrative)"
        what="Density tiers are estimates for urban behaviour patterns, not census wards."
        why={urbanWhy()}
      />
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

function DemographicLens({ acs }: { acs: AC[] }) {
  const data = acs.map((a) => ({
    name: a.ac_name,
    x: DEMOGRAPHICS[a.ac_number].muslim_share_pct,
    y:
      a.vidhan_sabha_2024.winning_alliance === "Mahayuti"
        ? a.vidhan_sabha_2024.vote_share_pct
        : 100 - a.vidhan_sabha_2024.vote_share_pct,
    alliance: a.vidhan_sabha_2024.winning_alliance,
  }));
  return (
    <section className="space-y-3">
      <SectionHeader
        id="chart-demo"
        eyebrow="Evidence · Communities"
        Icon={Users}
        title="Estimated Muslim share vs November strength (illustrative)"
        what="Broad pattern only; see METHODOLOGY.md for demographic limits."
        why={demoWhy()}
      />
      <Card>
        <div className="h-80">
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 8, right: 16, bottom: 30, left: 8 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
              <XAxis type="number" dataKey="x" unit="%" domain={[0, 45]} tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} />
              <YAxis type="number" dataKey="y" unit="%" domain={[25, 75]} tick={{ fontSize: 10, fill: "oklch(0.68 0.018 250)" }} />
              <ZAxis range={[80, 80]} />
              <Tooltip contentStyle={tipStyle} labelFormatter={(_, p) => (p && p[0]?.payload?.name) || ""} />
              <Scatter data={data}>
                {data.map((d, i) => (
                  <Cell key={i} fill={d.alliance === "Mahayuti" ? "var(--mahayuti)" : "var(--mva)"} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </section>
  );
}

function GeographicLens({ acs }: { acs: AC[] }) {
  const zones: GeoZone[] = ["Island City", "Western Suburbs", "Eastern Suburbs"];
  const data = zones.map((z) => {
    const subset = acs.filter((a) => DEMOGRAPHICS[a.ac_number].geo === z);
    return {
      zone: z,
      MVA: subset.filter((a) => a.vidhan_sabha_2024.winning_alliance === "MVA").length,
      Mahayuti: subset.filter((a) => a.vidhan_sabha_2024.winning_alliance === "Mahayuti").length,
      total: subset.length,
      swing: +avg(subset.map((a) => a.metrics.vote_share_swing_pct)).toFixed(1),
    };
  });
  return (
    <section className="space-y-3">
      <SectionHeader
        id="chart-geo"
        eyebrow="Evidence · Zones"
        Icon={MapPin}
        title="Island city, western suburbs, eastern suburbs"
        what="November seat split and average share shift by geographic belt."
        why={geoWhy()}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((d) => (
          <Card key={d.zone}>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.zone}</div>
            <div className="mt-1 text-xs num">{d.total} areas</div>
            <div className="mt-3 h-2 rounded-full overflow-hidden flex">
              <div style={{ width: `${(d.Mahayuti / d.total) * 100}%`, background: "var(--mahayuti)" }} />
              <div style={{ width: `${(d.MVA / d.total) * 100}%`, background: "var(--mva)" }} />
            </div>
            <div className="mt-2 flex justify-between text-xs num">
              <span style={{ color: "var(--mahayuti)" }}>{d.Mahayuti} Mahayuti</span>
              <span style={{ color: "var(--mva)" }}>{d.MVA} MVA</span>
            </div>
            <div className="mt-3 border-t border-border pt-2 num text-primary">{fmtPct(d.swing, true)} avg shift</div>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        <Link to="/mapping" className="text-primary underline">
          Open comparative maps
        </Link>
      </p>
    </section>
  );
}
