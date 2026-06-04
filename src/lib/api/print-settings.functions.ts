import { fetchBackend } from "./fetch-helper";

export interface PrintSettings {
  rapor_date: string;
  rapor_headmaster: string;
  rapor_signature: string;
  rapor_show_sig: string;
}

// Get print settings from DB
export const getPrintSettingsFn = async () => {
  return fetchBackend<PrintSettings>("/api/print-settings", { method: "GET" });
};

// Save print settings to DB
export const savePrintSettingsFn = async ({ data }: { data: { token: string; settings: Partial<PrintSettings> } }) => {
  return fetchBackend<{ success: boolean }>("/api/print-settings/save", { body: data });
};
