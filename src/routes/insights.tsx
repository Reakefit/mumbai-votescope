import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL: Area detail renamed to Analysis */
export const Route = createFileRoute("/insights")({
  beforeLoad: () => {
    throw redirect({ to: "/analysis" });
  },
});
