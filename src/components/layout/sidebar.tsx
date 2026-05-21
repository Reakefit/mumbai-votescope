import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Map, TrendingUp, Activity, Vote, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/mapping", label: "Maps", icon: Map },
  { to: "/swing", label: "Vote share", icon: TrendingUp },
  { to: "/turnout", label: "Turnout", icon: Activity },
  { to: "/analysis", label: "Analysis", icon: Lightbulb },
] as const;

export function Sidebar() {
  const { location } = useRouterState();
  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border bg-card/40 px-3 py-5">
      <div className="flex items-center gap-2 px-2 pb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Vote className="h-4 w-4" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">Mumbai 2024</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Parliament vs State</div>
        </div>
      </div>
      <nav className="flex flex-col gap-0.5">
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to} to={to}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-2 pt-4 text-[10px] text-muted-foreground leading-relaxed">
        <div>Official results · ECI / IndiaVotes</div>
        <div className="mt-1">Built by Mouni Malyala</div>
        <div>mouni221100@gmail.com</div>
      </div>
    </aside>
  );
}
