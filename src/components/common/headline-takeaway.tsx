import { ConfidenceTag } from "@/components/common/confidence-tag";

export function HeadlineTakeaway({
  line1,
  line2,
}: {
  line1: string;
  line2: string;
}) {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 lg:px-5 lg:py-4">
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <p className="text-[10px] uppercase tracking-wider text-primary">In short</p>
        <ConfidenceTag level="high" inline />
      </div>
      <p className="text-sm lg:text-base font-medium text-foreground leading-snug">{line1}</p>
      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{line2}</p>
    </div>
  );
}

export function buildHeadline(
  ls: { mva: number; mahayuti: number; total: number },
  vs: { mahayuti: number; mva: number; total: number },
  divergentCount: number,
  totalAreas: number,
) {
  const line1 =
    `May: opposition (MVA) ${ls.mva}/${ls.total} MP seats. November: ruling alliance (Mahayuti) ${vs.mahayuti}/${vs.total} MLA seats. ` +
    `${divergentCount} of ${totalAreas} assembly segments had a different alliance from their parent Lok Sabha seat.`;

  const line2 =
    `Aggregate counts only — we cannot read individual voters' reasons. ` +
    `Press accounts often describe May as more national (Sena/NCP splits, alliance choice) and November as more local (MLA track record, ward teams, civic issues). ` +
    `The pattern here is consistent with that, without proving it ballot by ballot.`;

  return { line1, line2 };
}
