import { createFileRoute, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/santri": "Manajemen Santri",
  "/nilai": "Input Nilai",
  "/rapor": "Preview Rapor",
  "/profil": "Profil & Pengaturan",
  "/admin": "Panel Admin",
  "/admin/tahun-ajaran": "Tahun Ajaran",
  "/admin/kelas": "Manajemen Kelas",
  "/admin/mapel": "Mata Pelajaran",
  "/admin/pengguna": "Pengguna",
};

function AppLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: "/" });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  function handleLogout() {
    logout();
    toast.success("Berhasil keluar");
    navigate({ to: "/" });
  }

  const title = Object.entries(titles).find(([k]) => path.startsWith(k))?.[1] ?? "SIRA";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset>
          <header className="h-14 flex items-center gap-3 border-b bg-card px-4 sticky top-0 z-10">
            <SidebarTrigger />
            <div className="h-5 w-px bg-border" />
            <h1 className="text-sm font-semibold">{title}</h1>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{user?.name}</span>
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium capitalize">{user?.role?.replace("_", " ")}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs">
                <LogOut className="h-3.5 w-3.5 mr-1.5" />
                Keluar
              </Button>
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
