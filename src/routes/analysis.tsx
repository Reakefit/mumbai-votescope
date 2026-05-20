import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/shell";
import { ACS, filterByPC } from "@/data/constituencies";
import {
  ANALYSIS_NAV,
  EXECUTIVE_SUMMARY,
  FRAMEWORK,
  PARTY_CAMPAIGNS,
  SPLIT_TICKET_DEEP,
  STRATEGIC_VS_LOCAL,
  DATA_LIMITS,
  OUTLOOK,
} from "@/data/policy-analysis";
import { ProseBlocks } from "@/components/analysis/prose-block";
import { PcDossiers } from "@/components/analysis/pc-dossier";
import { ElectoralChartsPanel } from "@/components/analysis/electoral-charts";
import { DataAttribution } from "@/components/common/data-attribution";
import { useFilters } from "@/hooks/use-filters";
import { FileText, BookOpen } from "lucide-react";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "Mumbai 2024 · Policy analysis" },
      {
        name: "description",
        content: "In-depth analysis of Mumbai Lok Sabha vs Vidhan Sabha 2024 voting behaviour.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const { pc } = useFilters();
  const acs = filterByPC(pc);

  return (
    <Shell>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Analysis</div>
          <nav className="flex flex-col gap-0.5 pr-2">
            {ANALYSIS_NAV.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs text-muted-foreground hover:text-foreground py-1.5 px-2 rounded hover:bg-accent/40 leading-snug"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <Link
              to="/"
              className="text-[11px] text-primary hover:underline flex items-center gap-1"
            >
              <FileText className="h-3 w-3" /> Overview dashboard
            </Link>
            <Link
              to="/methodology"
              className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <BookOpen className="h-3 w-3" /> Methodology
            </Link>
          </div>
        </aside>

        <div className="space-y-10 min-w-0 pb-12">
          <header>
            <p className="text-[10px] uppercase tracking-wider text-primary">Mumbai · 2024 elections</p>
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight mt-1">Analysis</h1>
            <p className="text-sm text-muted-foreground mt-3 max-w-3xl leading-relaxed">
              Policy-style briefing on how Mumbai voted in Parliament (May) versus State Assembly (November). Numbers
              come from the project dataset (ECI / IndiaVotes). Interpretation draws on news and campaign reporting,
              clearly separated from verified counts.
            </p>
            {pc && pc !== "all" && (
              <p className="text-xs text-primary mt-2">
                Filter active: showing charts for selected parliamentary seat only. Narrative covers all Mumbai unless
                noted.
              </p>
            )}
          </header>

          <section id="executive" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight">Executive summary</h2>
            <div className="mt-4">
              <ProseBlocks blocks={EXECUTIVE_SUMMARY} />
            </div>
          </section>

          <section id="framework" className="scroll-mt-24 border-t border-border pt-8">
            <h2 className="text-xl font-semibold tracking-tight">Two elections, two questions</h2>
            <div className="mt-4">
              <ProseBlocks blocks={FRAMEWORK} />
            </div>
          </section>

          <PcDossiers />

          <section id="parties" className="scroll-mt-24 border-t border-border pt-8">
            <h2 className="text-xl font-semibold tracking-tight">Party campaigns and ground games</h2>
            <div className="mt-4">
              <ProseBlocks blocks={PARTY_CAMPAIGNS} />
            </div>
          </section>

          <section id="split-ticket" className="scroll-mt-24 border-t border-border pt-8">
            <h2 className="text-xl font-semibold tracking-tight">Split-ticket voting in depth</h2>
            <div className="mt-4">
              <ProseBlocks blocks={SPLIT_TICKET_DEEP} />
            </div>
          </section>

          <section id="strategic" className="scroll-mt-24 border-t border-border pt-8">
            <h2 className="text-xl font-semibold tracking-tight">Strategic vs ideological reads</h2>
            <div className="mt-4">
              <ProseBlocks blocks={STRATEGIC_VS_LOCAL} />
            </div>
          </section>

          <ElectoralChartsPanel acs={acs} />
          <DataAttribution />
        </div>
      </div>
    </Shell>
  );
}
