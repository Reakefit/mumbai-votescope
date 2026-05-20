import { DATA_SOURCES } from "@/data/sources";

export function DataAttribution({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-[10px] text-muted-foreground leading-relaxed">
        Election results: ECI and{" "}
        <a href={DATA_SOURCES.lokSabha2024.urls[1]} className="underline hover:text-foreground" target="_blank" rel="noreferrer">
          IndiaVotes
        </a>
        . Community estimates are indicative only.
      </p>
    );
  }
  return (
    <div className="rounded-md border border-border bg-muted/20 p-3 text-[11px] text-muted-foreground space-y-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Sources</div>
      <p>{DATA_SOURCES.lokSabha2024.note}</p>
      <p>{DATA_SOURCES.vidhanSabha2024.note}</p>
      <div className="flex flex-wrap gap-3 pt-1">
        <a href={DATA_SOURCES.lokSabha2024.urls[0]} className="underline hover:text-foreground" target="_blank" rel="noreferrer">
          ECI Lok Sabha
        </a>
        <a href={DATA_SOURCES.vidhanSabha2024.urls[0]} className="underline hover:text-foreground" target="_blank" rel="noreferrer">
          ECI Vidhan Sabha
        </a>
        <a href={DATA_SOURCES.lokSabha2024.urls[1]} className="underline hover:text-foreground" target="_blank" rel="noreferrer">
          IndiaVotes LS
        </a>
        <a href={DATA_SOURCES.vidhanSabha2024.urls[1]} className="underline hover:text-foreground" target="_blank" rel="noreferrer">
          IndiaVotes VS
        </a>
      </div>
    </div>
  );
}
