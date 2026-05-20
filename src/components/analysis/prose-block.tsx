import { ExternalLink } from "lucide-react";
import type { AnalysisBlock, SourceRef } from "@/data/policy-analysis";

export function ProseBlocks({ blocks }: { blocks: AnalysisBlock[] }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-foreground/90 max-w-3xl">
      {blocks.map((b, i) => {
        if (b.type === "h3") {
          return (
            <h3 key={i} className="text-base font-semibold text-foreground mt-5 first:mt-0">
              {b.text}
            </h3>
          );
        }
        if (b.type === "p") {
          return <p key={i}>{b.text}</p>;
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              {b.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (b.type === "sources") {
          return <SourceList key={i} sources={b.sources} />;
        }
        return null;
      })}
    </div>
  );
}

export function SourceList({ sources }: { sources: SourceRef[] }) {
  if (!sources.length) return null;
  return (
    <p className="text-[11px] text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 items-center pt-1">
      <span className="font-medium text-foreground/80">Sources:</span>
      {sources.map((s) => (
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
  );
}
