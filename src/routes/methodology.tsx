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
            for visual comparison only — it is NOT an AC-level parliamentary count. AC-segment Form 20 leads from CEO
            Maharashtra are not yet integrated into the dataset.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">"PC-to-AC alliance divergence" (not split-ticket)</h2>
          <p className="mt-2 text-muted-foreground">
            An area is flagged as divergent when the parent Lok Sabha winning alliance for its PC differs from the
            November assembly winning alliance for that AC. The count is computed live from the dataset by
            <code className="mx-1 rounded bg-muted px-1 py-0.5 text-[11px]">divergenceCounts()</code> in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[11px]">src/lib/divergence.ts</code>, so every page in
            the app reports the same number. True ballot-level split-ticket voting needs AC-segment counts and is
            not claimed by this app in its current form.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">"Winner-share difference" (renamed from swing)</h2>
          <p className="mt-2 text-muted-foreground">
            The metric is November-winner vote share minus May-winner vote share on the same tile. When the winner
            changes between elections, those two numbers belong to different parties, so this is NOT a classic
            standardised swing. We label it "winner-share difference" or "winner-share shift" everywhere it appears.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Turnout (district proxy)</h2>
          <p className="mt-2 text-muted-foreground">
            Vidhan Sabha turnout values are Mumbai City (52.65%) and Mumbai Suburban (56.39%) district averages applied
            uniformly to every AC in that district. They are not constituency-level participation rates and should not
            be used to infer local mobilisation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Demographics (exploratory only)</h2>
          <p className="mt-2 text-muted-foreground">
            Income tier, density, geo zone, and Muslim population share in charts are illustrative estimates calibrated
            to known Mumbai geography. They are exploratory, not evidentiary, and should never be read as confirming
            community-block voting.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Confidence levels</h2>
          <p className="mt-2 text-muted-foreground">
            Every claim in the app is tagged with one of three levels: <span className="font-medium text-foreground">High</span> (verified
            seat outcomes), <span className="font-medium text-foreground">Medium</span> (alliance-divergence patterns from
            aggregate results), <span className="font-medium text-foreground">Low</span> (voter-motive interpretation drawn
            from reporting). The Analysis page also includes a "Rival explanations" section and a battleground
            classification of the 36 ACs.
          </p>
        </section>

        <p className="text-xs text-muted-foreground pt-4 border-t border-border">
          Full written deliverable: docs/KEY_INSIGHTS.md in the repository.
        </p>
      </article>
    </Shell>
  );
}
