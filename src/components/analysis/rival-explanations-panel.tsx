import { RIVAL_EXPLANATIONS, EVIDENCE_LABEL, EVIDENCE_TONE } from "@/data/rival-explanations";
import { ExternalLink, Scale } from "lucide-react";

export function RivalExplanationsPanel() {
  return (
    <section id="rivals" className="scroll-mt-24 border-t border-border pt-8">
      <header>
        <p className="text-[10px] uppercase tracking-wider text-primary flex items-center gap-1.5">
          <Scale className="h-3 w-3" /> Counter-arguments
        </p>
        <h2 className="text-xl font-semibold tracking-tight mt-1">
          Rival explanations for the May-to-November shift
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
          The headline reading of this project is "Mumbai voters distinguished national and state ballots."
          That is one explanation among several. Each rival hypothesis below is tagged with whether this
          dataset can test it, sit neutrally, or only echo what reporting claims.
        </p>
      </header>

      <ol className="mt-5 space-y-3">
        {RIVAL_EXPLANATIONS.map((r, idx) => (
          <li key={r.id} className="rounded-lg border border-border bg-card/40 p-4">
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-semibold num text-primary/70 shrink-0">{idx + 1}.</span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{r.title}</h3>
                <p className="text-sm mt-1 leading-relaxed">{r.claim}</p>
                <p className={`text-[11px] mt-2 font-medium uppercase tracking-wider ${EVIDENCE_TONE[r.evidence]}`}>
                  {EVIDENCE_LABEL[r.evidence]}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.note}</p>
                {r.source && (
                  <a
                    href={r.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                  >
                    {r.source.label}
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
