import { FINAL_TAKEAWAYS } from "@/data/case-study";
import { ExternalLink } from "lucide-react";

export function FinalTakeaways() {
  return (
    <section className="rounded-xl border border-primary/25 bg-card/50 p-5 lg:p-6">
      <header className="mb-6 pb-4 border-b border-border">
        <h2 className="text-xl font-semibold tracking-tight">Key takeaways</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
          What the data shows, what reporting suggests about voter mood (not proven seat by seat), and links to sources.
        </p>
      </header>
      <ol className="space-y-6">
        {FINAL_TAKEAWAYS.map((t, i) => (
          <li key={t.title} className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-3 lg:gap-4">
            <span className="text-lg font-semibold num text-primary/80 lg:w-8">{i + 1}</span>
            <div>
              <h3 className="text-base font-semibold leading-snug">{t.title}</h3>
              <p className="text-sm mt-3 leading-relaxed">
                <span className="font-medium text-foreground">What happened: </span>
                {t.what}
              </p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                <span className="font-medium text-foreground">Why people voted this way: </span>
                {t.why}
              </p>
              {t.sources.length > 0 && (
                <p className="mt-3 text-[11px] text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 items-center">
                  <span className="font-medium text-foreground/80">Sources:</span>
                  {t.sources.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-0.5"
                    >
                      {s.label}
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  ))}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
