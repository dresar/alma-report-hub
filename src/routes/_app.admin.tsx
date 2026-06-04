import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_app/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { isAdmin } = useAuth();
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center py-32 text-muted-foreground">
        Akses ditolak. Halaman ini hanya untuk admin.
      </div>
    );
  }
  return <Outlet />;
}
