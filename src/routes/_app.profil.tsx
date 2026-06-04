import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useAuth, authStore } from "@/hooks/use-auth";
import { changePasswordFn, updateProfileFn } from "@/lib/api/auth.functions";

export const Route = createFileRoute("/_app/profil")({
  head: () => ({ meta: [{ title: "Profil & Pengaturan — SIRA" }] }),
  component: ProfilPage,
});

function ProfilPage() {
  const { token, user } = useAuth();
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", email: user?.email || "" });

  const mut = useMutation({
    mutationFn: () =>
      changePasswordFn({
        data: { token: token!, oldPassword: form.oldPassword, newPassword: form.newPassword },
      }),
    onSuccess: () => {
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password berhasil diubah");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal mengubah password"),
  });

  const profileMut = useMutation({
    mutationFn: () =>
      updateProfileFn({
        data: { token: token!, name: profileForm.name, email: profileForm.email },
      }),
    onSuccess: (data) => {
      authStore.login(data.token, data.user);
      toast.success("Profil berhasil diperbarui");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal memperbarui profil"),
  });

  const isFormValid =
    form.oldPassword &&
    form.newPassword.length >= 6 &&
    form.newPassword === form.confirmPassword;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Profil Pengguna</h2>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Akun</CardTitle>
          <CardDescription>Detail profil yang sedang digunakan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input 
              id="name"
              value={profileForm.name} 
              onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))} 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              value={profileForm.email} 
              onChange={(e) => setProfileForm(p => ({ ...p, email: e.target.value }))} 
            />
          </div>
          <div className="grid gap-2">
            <Label>Peran / Role</Label>
            <Input value={String(user?.role || "").replace("_", " ").toUpperCase()} disabled className="bg-muted/50" />
          </div>
          <Button
            onClick={() => profileMut.mutate()}
            disabled={!profileForm.name || !profileForm.email || profileMut.isPending}
            className="w-full mt-2"
          >
            {profileMut.isPending ? "Menyimpan..." : "Simpan Profil"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ganti Password</CardTitle>
          <CardDescription>Ubah password akun Anda secara berkala</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="old-password">Password Lama</Label>
            <Input
              id="old-password"
              type="password"
              value={form.oldPassword}
              onChange={(e) => setForm((p) => ({ ...p, oldPassword: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">Password Baru</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Minimal 6 karakter"
              value={form.newPassword}
              onChange={(e) => setForm((p) => ({ ...p, newPassword: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
            <Input
              id="confirm-password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
            />
            {form.newPassword && form.confirmPassword && form.newPassword !== form.confirmPassword && (
              <p className="text-xs text-red-500 font-medium">Password baru tidak cocok</p>
            )}
          </div>
          <Button
            onClick={() => mut.mutate()}
            disabled={!isFormValid || mut.isPending}
            className="w-full bg-emerald-600 hover:bg-emerald-500 mt-2"
          >
            Simpan Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
