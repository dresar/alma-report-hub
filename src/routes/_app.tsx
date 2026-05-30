import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/santri": "Manajemen Santri",
    "/nilai": "Input Nilai",
    "/rapor": "Preview Rapor",
  };
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset>
          <header className="h-14 flex items-center gap-3 border-b bg-card px-4 sticky top-0 z-10">
            <SidebarTrigger />
            <div className="h-5 w-px bg-border" />
            <h1 className="text-sm font-semibold">{titles[path] ?? "SIRA"}</h1>
            <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Keluar</Link>
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
