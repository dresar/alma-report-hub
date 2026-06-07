import { createServerFn } from "@tanstack/react-start";

export interface PrintSettings {
  rapor_date: string;
  rapor_headmaster: string;
  rapor_signature: string;
  rapor_show_sig: string;
}
import { getDb, verifyToken } from "./_db";

async function ensurePrintSettingsTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS print_settings (
      id TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
}

// ── Get print settings ─────────────────────────────────────────────────
export const getPrintSettingsFn = createServerFn()
  .handler(async () => {
    await ensurePrintSettingsTable();
    const sql = getDb();
    const rows = await sql`SELECT id, value FROM print_settings`;
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[String(row.id)] = String(row.value);
    }
    return {
      rapor_date: settings.rapor_date || new Date().toISOString().split("T")[0],
      rapor_headmaster: settings.rapor_headmaster || "",
      rapor_signature: settings.rapor_signature || "",
      rapor_show_sig: settings.rapor_show_sig || "true",
    };
  });

// ── Save print settings ────────────────────────────────────────────────
export const savePrintSettingsFn = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string; settings: Record<string, string> }) => data)
  .handler(async ({ data }) => {
    await ensurePrintSettingsTable();
    const sql = getDb();
    verifyToken(data.token);
    for (const [id, value] of Object.entries(data.settings)) {
      await sql`
        INSERT INTO print_settings (id, value, updated_at)
        VALUES (${id}, ${value}, now())
        ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
      `;
    }
    return { success: true };
  });
