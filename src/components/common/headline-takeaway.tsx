export function HeadlineTakeaway({
  line1,
  line2,
}: {
  line1: string;
  line2: string;
}) {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 lg:px-5 lg:py-4">
      <p className="text-[10px] uppercase tracking-wider text-primary mb-1.5">In short</p>
      <p className="text-sm lg:text-base font-medium text-foreground leading-snug">{line1}</p>
      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{line2}</p>
    </div>
  );
}

export function buildHeadline(
  ls: { mva: number; mahayuti: number; total: number },
  vs: { mahayuti: number; mva: number; total: number },
  splitCount: number,
  totalAreas: number,
) {
  const line1 =
    `May: opposition (MVA) ${ls.mva}/${ls.total} MP seats. November: ruling alliance (Mahayuti) ${vs.mahayuti}/${vs.total} MLA seats. ` +
    `${splitCount} of ${totalAreas} areas show a different winning alliance between the two elections.`;

  const line2 =
    `Results alone cannot tell us every voter's reason. ` +
    `Press and campaign accounts often describe May as more national (Sena/NCP splits, alliance choice) and November as more local (MLA track record, ward teams, civic issues). ` +
    `The numbers here match that split, without proving it for each voter.`;

  return { line1, line2 };
}
