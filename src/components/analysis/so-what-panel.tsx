import { ACS } from "@/data/constituencies";
import { battlegroundGroups } from "@/data/battleground";
import { Target } from "lucide-react";

export function SoWhatPanel() {
  const g = battlegroundGroups(ACS);
  const swingZones = g.high_uncertainty.length + g.divergent.length;
  const safeMahayuti = g.mahayuti_stronghold.length;
  const safeMva = g.mva_stronghold.length;
  const candidate = g.candidate_driven.length;

  const items = [
    {
      title: "For BMC 2025/26",
      body: `${swingZones} of 36 assembly wards (the divergent + high-uncertainty buckets) are the real BMC contest. Strongholds — ${safeMahayuti} Mahayuti, ${safeMva} MVA — set the baseline; the swing zones decide who runs the city.`,
    },
    {
      title: "Where alliance label matters most",
      body: `In the ${safeMahayuti + safeMva} aligned strongholds, parliament and assembly winners line up. Voters in these wards behave as alliance loyalists in the data. Candidate substitutions are unlikely to flip the seat.`,
    },
    {
      title: "Where the candidate matters more than the alliance",
      body: `${candidate} seats fit a personal-vote pattern — long incumbents, recognised names, or unusual margins for the alliance's local strength. Ticket changes here would be high-risk for whichever side holds them.`,
    },
    {
      title: "Genuine swing zones to watch",
      body: g.high_uncertainty.length
        ? `${g.high_uncertainty.map((a) => a.ac_name).join(", ")} all came in under a tight November margin without a clear alignment story. Treat as battleground.`
        : "No ACs landed in the tight-margin / no-pattern bucket in this iteration.",
    },
    {
      title: "Transferable support",
      body: `Mahayuti's Lok Sabha vote share in Mumbai held more cleanly into November than MVA's did, per Mid-day's vote-share tracking. That is consistent with Mahayuti having more transferable organisational backing across cycles — though this dataset alone cannot prove it.`,
    },
  ];

  return (
    <section id="so-what" className="scroll-mt-24 border-t border-border pt-8">
      <header>
        <p className="text-[10px] uppercase tracking-wider text-primary flex items-center gap-1.5">
          <Target className="h-3 w-3" /> So what?
        </p>
        <h2 className="text-xl font-semibold tracking-tight mt-1">Implications for the next cycle</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
          The site is descriptive first. This section turns the classification into strategic reads for journalists and campaign planners.
        </p>
      </header>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((it) => (
          <div key={it.title} className="rounded-lg border border-border bg-card/40 p-4">
            <h3 className="text-sm font-semibold">{it.title}</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
