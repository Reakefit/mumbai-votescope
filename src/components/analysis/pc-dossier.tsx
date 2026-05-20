import { PC_LIST } from "@/data/constituencies";
import { PC_NARRATIVE } from "@/data/policy-analysis";
import { summarizePC } from "@/lib/pc-stats";
import { ALLIANCE_COLOR } from "@/lib/election-colors";
import { ProseBlocks } from "./prose-block";

const SLUG_TO_NAV: Record<string, string> = {
  "mumbai-south": "pc-south",
  "mumbai-south-central": "pc-south-central",
  "mumbai-north-central": "pc-north-central",
  "mumbai-north-east": "pc-north-east",
  "mumbai-north-west": "pc-north-west",
  "mumbai-north": "pc-north",
};

export function PcDossiers() {
  return (
    <div className="space-y-10">
      {PC_LIST.map((p) => {
        const s = summarizePC(p.slug);
        const ls = s.pc.lok_sabha_2024;
        const blocks = PC_NARRATIVE[p.slug] ?? [];
        return (
          <section key={p.slug} id={SLUG_TO_NAV[p.slug]} className="scroll-mt-24 border-t border-border pt-8 first:border-t-0 first:pt-0">
            <header>
              <p className="text-[10px] uppercase tracking-wider text-primary">Parliamentary constituency</p>
              <h2 className="text-xl font-semibold tracking-tight mt-1">{p.name}</h2>
              <p className="text-xs text-muted-foreground mt-1 num">
                6 assembly segments · May: {ls.winning_party} ({ls.winning_alliance}) · November: Mahayuti {s.vsMahayuti}/6 · MVA {s.vsMva}/6 · Split areas {s.splitCount}
              </p>
            </header>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
              <ProseBlocks blocks={blocks} />
              <div className="rounded-lg border border-border bg-card/40 p-4 space-y-4 text-xs h-fit">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">May · Lok Sabha</div>
                  <div className="mt-1 font-medium">{ls.candidate}</div>
                  <div className="text-muted-foreground">{ls.winning_party} · {ls.winning_alliance}</div>
                  <div className="num mt-1">{ls.vote_share_pct.toFixed(1)}% · margin {ls.margin_votes.toLocaleString("en-IN")}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">November · assembly split</div>
                  <div className="mt-2 h-2 rounded-full overflow-hidden flex">
                    <div style={{ width: `${(s.vsMahayuti / 6) * 100}%`, background: ALLIANCE_COLOR.Mahayuti }} />
                    <div style={{ width: `${(s.vsMva / 6) * 100}%`, background: ALLIANCE_COLOR.MVA }} />
                  </div>
                  <div className="flex justify-between mt-1 num">
                    <span style={{ color: ALLIANCE_COLOR.Mahayuti }}>{s.vsMahayuti} Mahayuti</span>
                    <span style={{ color: ALLIANCE_COLOR.MVA }}>{s.vsMva} MVA</span>
                  </div>
                </div>
                <div className="border-t border-border pt-3 space-y-2">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Assembly segments (November)</div>
                  <ul className="space-y-1.5 max-h-48 overflow-y-auto">
                    {s.acs.map((a) => {
                      const v = a.vidhan_sabha_2024;
                      const split = a.metrics.alliance_split_ticket;
                      return (
                        <li key={a.ac_number} className="flex justify-between gap-2">
                          <span className="truncate">{a.ac_name}</span>
                          <span className="shrink-0 num" style={{ color: ALLIANCE_COLOR[v.winning_alliance] }}>
                            {v.winning_party}
                            {split ? " · split" : ""}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="border-t border-border pt-2 num text-muted-foreground">
                  Avg turnout {s.avgTurnoutLs.toFixed(1)}% → {s.avgTurnoutVs.toFixed(1)}% · avg share shift {s.avgSwing >= 0 ? "+" : ""}
                  {s.avgSwing.toFixed(1)} pts
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
