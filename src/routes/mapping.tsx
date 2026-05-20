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
          <h1 className="text-2xl font-semibold tracking-tight">Comparative Electoral Mapping</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Synchronized cartograms — hover any AC to compare both cycles; click for the full breakdown.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ChoroplethMap cycle="ls" title="Lok Sabha 2024" hoveredAC={hovered}
            setHoveredAC={setHovered} onSelect={setSelected} highlightPC={pc} />
          <ChoroplethMap cycle="vs" title="Vidhan Sabha 2024" hoveredAC={hovered}
            setHoveredAC={setHovered} onSelect={setSelected} highlightPC={pc} />
        </div>

        <div className="rounded-md border border-border bg-card/30 p-3 text-[11px] text-muted-foreground">
          Cartogram layout — each tile is one AC. Rows correspond to Parliamentary Constituencies (south at bottom).
          Color = winning alliance. Use the Region filter to dim non-selected PCs.
        </div>
      </div>

      <ACDetailSheet ac={selected} onClose={() => setSelected(null)} />
    </Shell>
  );
}
