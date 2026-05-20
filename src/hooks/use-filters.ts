import { useSearch, useNavigate } from "@tanstack/react-router";

export type MetricKey = "vote_share" | "margin" | "turnout";

export function useFilters() {
  const search = useSearch({ strict: false }) as { pc?: string; metric?: MetricKey };
  const navigate = useNavigate();
  const pc = (search.pc as string) || "all";
  const metric: MetricKey = (search.metric as MetricKey) || "margin";

  return {
    pc, metric,
    setPC: (v: string) => navigate({ to: ".", search: (s: any) => ({ ...s, pc: v }), replace: true }),
    setMetric: (v: MetricKey) => navigate({ to: ".", search: (s: any) => ({ ...s, metric: v }), replace: true }),
  };
}
