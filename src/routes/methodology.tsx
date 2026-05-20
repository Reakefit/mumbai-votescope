import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/shell";
import { DATA_SOURCES, ELECTION_TIMELINE } from "@/data/sources";

export const Route = createFileRoute("/methodology")({
  component: Page,
});

function Page() {
  return (
    <Shell>
      <article className="max-w-3xl mx-auto py-8 space-y-6 text-sm leading-relaxed">
        <header>
          <Link to="/analysis" className="text-xs text-primary hover:underline">
            ← Back to analysis
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight mt-3">Methodology</h1>
          <p className="text-muted-foreground mt-2">
            How data in Mumbai VoteScope was assembled, what each metric means, and known limitations.
          </p>
        </header>

        <section>
          <h2 className="text-lg font-semibold">Scope</h2>
          <p className="mt-2 text-muted-foreground">
            Mumbai only: 6 Lok Sabha parliamentary constituencies and 36 Vidhan Sabha assembly constituencies. Elections:
            {ELECTION_TIMELINE.lokSabha.period} (Parliament) and {ELECTION_TIMELINE.vidhanSabha.period} (State).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Sources</h2>
          <p className="mt-2">{DATA_SOURCES.lokSabha2024.note}</p>
          <p className="mt-2">{DATA_SOURCES.vidhanSabha2024.note}</p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-primary">
            {[...DATA_SOURCES.lokSabha2024.urls, ...DATA_SOURCES.vidhanSabha2024.urls].map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer" className="hover:underline break-all">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Lok Sabha on assembly map</h2>
          <p className="mt-2 text-muted-foreground">
            May results on each assembly tile repeat the parent parliamentary seat winner (6 city-wide results). This is
            for visual comparison only, not AC-level parliamentary counts.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Split-ticket definition</h2>
          <p className="mt-2 text-muted-foreground">
            An area is split-ticket when the May parliamentary alliance for its PC differs from the November assembly
            winning alliance for that AC. Count: 18 of 36 in the current dataset (15 MVA→Mahayuti, 3 reverse).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Swing metric</h2>
          <p className="mt-2 text-muted-foreground">
            vote_share_swing_pct = November winner vote share minus May winner vote share on the same tile. It is not a
            classic party swing (e.g. BJP share minus Congress share).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Demographics</h2>
          <p className="mt-2 text-muted-foreground">
            Income tier, density, geo zone, and Muslim population share in charts are illustrative estimates for pattern
            exploration, not official census microdata.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Narrative analysis</h2>
          <p className="mt-2 text-muted-foreground">
            Long-form text on the Analysis page cites news outlets and separates verified counts from interpretation. It
            does not use exit polls or booth-level microdata in this version.
          </p>
        </section>

        <p className="text-xs text-muted-foreground pt-4 border-t border-border">
          Full written deliverable: docs/KEY_INSIGHTS.md in the repository.
        </p>
      </article>
    </Shell>
  );
}
