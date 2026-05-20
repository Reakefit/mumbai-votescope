import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark min-h-screen flex bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 px-4 lg:px-6 py-5">{children}</main>
      </div>
    </div>
  );
}
