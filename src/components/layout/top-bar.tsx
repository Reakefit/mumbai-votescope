import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFilters, type MetricKey } from "@/hooks/use-filters";
import { PC_LIST } from "@/data/constituencies";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Map, TrendingUp, Activity, Lightbulb } from "lucide-react";

const TABS = [
  { to: "/", label: "Macro", icon: LayoutDashboard },
  { to: "/mapping", label: "Map", icon: Map },
  { to: "/swing", label: "Swing", icon: TrendingUp },
  { to: "/turnout", label: "Turnout", icon: Activity },
  { to: "/insights", label: "Insights", icon: Lightbulb },
];

export function TopBar() {
  const { pc, metric, setPC, setMetric } = useFilters();
  const { location } = useRouterState();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
        <div className="flex items-center gap-2 lg:hidden">
          <div className="text-sm font-semibold tracking-tight">MumbAI-Vote</div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground hidden sm:inline">Region</span>
          <Select value={pc} onValueChange={setPC}>
            <SelectTrigger className="h-8 w-[200px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Mumbai (6 PCs)</SelectItem>
              {PC_LIST.map((p) => (
                <SelectItem key={p.slug} value={p.slug}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground hidden sm:inline">Metric</span>
          <Select value={metric} onValueChange={(v) => setMetric(v as MetricKey)}>
            <SelectTrigger className="h-8 w-[140px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vote_share">Vote Share</SelectItem>
              <SelectItem value="margin">Margin</SelectItem>
              <SelectItem value="turnout">Turnout</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <nav className="ml-auto flex items-center gap-1 lg:hidden">
          {TABS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to} to={to}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs",
                  active ? "bg-accent text-foreground" : "text-muted-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden lg:flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm" style={{ background: "var(--mahayuti)" }} /> Mahayuti
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm" style={{ background: "var(--mva)" }} /> MVA
          </span>
        </div>
      </div>
    </header>
  );
}
