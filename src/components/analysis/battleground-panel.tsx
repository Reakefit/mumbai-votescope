import { ACS } from "@/data/constituencies";
import {
  battlegroundGroups,
  BATTLEGROUND_LABEL,
  BATTLEGROUND_DESC,
  type Battleground,
} from "@/data/battleground";
import { ALLIANCE_COLOR } from "@/lib/election-colors";
import { ConfidenceTag } from "@/components/common/confidence-tag";

const ORDER: Battleground[] = [
  "mahayuti_stronghold",
  "mva_stronghold",
  "divergent",
  "candidate_driven",
  "high_uncertainty",
];

const BAR_COLOR: Record<Battleground, string> = {
  mahayuti_stronghold: "var(--mahayuti)",
  mva_stronghold: "var(--mva)",
  divergent: "var(--primary)",
  candidate_driven: "#a78bfa",
  high_uncertainty: "#fbbf24",
};

export function BattlegroundPanel() {
  const groups = battlegroundGroups(ACS);
  return (
    <section id="battleground" className="scroll-mt-24 border-t border-border pt-8">
      <header>
        <p className="text-[10px] uppercase tracking-wider text-primary">Classification</p>
        <h2 className="text-xl font-semibold tracking-tight mt-1">Battleground map: where each AC actually sits</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
          Each of Mumbai's 36 assembly seats sorted into five categories from November margin and PC-to-AC alliance pattern.
          Useful for planning BMC polls and reading where alliance loyalty ends and personal vote begins.
          <ConfidenceTag level="medium" inline /> on the divergence calls until Form 20 segment data is integrated.
        </p>
      </header>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
        {ORDER.map((cat) => {
          const acs = groups[cat];
          return (
            <div key={cat} className="rounded-lg border border-border bg-card/40 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: BAR_COLOR[cat] }} />
                    <h3 className="text-sm font-semibold">{BATTLEGROUND_LABEL[cat]}</h3>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{BATTLEGROUND_DESC[cat]}</p>
                </div>
                <span className="text-xl font-semibold num shrink-0">{acs.length}</span>
              </div>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {acs.map((a) => (
                  <li
                    key={a.ac_number}
                    className="rounded-full border border-border px-2 py-0.5 text-[10px]"
                    style={{ color: ALLIANCE_COLOR[a.vidhan_sabha_2024.winning_alliance] }}
                  >
                    {a.ac_name}
                  </li>
                ))}
                {!acs.length && <li className="text-[11px] text-muted-foreground">No segments.</li>}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
