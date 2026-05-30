import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dev Login — SIRA" },
      { name: "description", content: "Sistem Informasi Rapor Santri (SIRA) — Dev Login bypass." },
    ],
  }),
  component: DevLogin,
});

function DevLogin() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md border shadow-none">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">SIRA — Dev Login</CardTitle>
          <CardDescription>
            Sistem Informasi Rapor Santri
            <br />
            Raudhatusalam Islamic Boarding School
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue="admin@sira.dev" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pwd">Password</Label>
            <Input id="pwd" type="password" defaultValue="••••••••" />
          </div>
          <Button
            className="w-full"
            onClick={() => navigate({ to: "/dashboard" })}
          >
            <Zap className="h-4 w-4 mr-2" />
            Bypass — Masuk ke Dashboard
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Mode pengembangan — autentikasi dilewati.
          </p>
          <div className="text-center">
            <Link to="/dashboard" className="text-xs text-primary hover:underline">
              Langsung ke Dashboard →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
