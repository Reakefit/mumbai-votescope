import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/shell";
import { ChoroplethMap } from "@/components/map/choropleth-map";
import { ACDetailSheet } from "@/components/map/ac-detail-sheet";
import { useState } from "react";
import { useFilters } from "@/hooks/use-filters";
import type { AC } from "@/data/constituencies";

export const Route = createFileRoute("/mapping")({ component: Page });

function Page() {
  const { pc } = useFilters();
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<AC | null>(null);

  return (
    <Shell>
      <div className="max-w-[1400px] mx-auto space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Compare May and November on the map</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Left: who won Parliament in May. Right: who won the State Assembly in November. Hover one area to highlight it on both maps.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ChoroplethMap cycle="ls" title="May 2024 · Lok Sabha" hoveredAC={hovered}
            setHoveredAC={setHovered} onSelect={setSelected} highlightPC={pc} />
          <ChoroplethMap cycle="vs" title="Nov 2024 · Vidhan Sabha" hoveredAC={hovered}
            setHoveredAC={setHovered} onSelect={setSelected} highlightPC={pc} />
        </div>

        <div className="rounded-md border border-border bg-card/30 p-3 text-[11px] text-muted-foreground">
          <p>
            May map: colour follows the MP winner for that parliamentary seat (6 seats city-wide).
            November map: colour follows the MLA winner for each assembly area (36 areas).
            Hover one tile to see it on both maps.
          </p>
        </div>
      </div>

      <ACDetailSheet ac={selected} onClose={() => setSelected(null)} />
    </Shell>
  );
}
