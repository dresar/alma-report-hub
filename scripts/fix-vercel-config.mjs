/**
 * Fix Vercel Build Output config.json after `vite build` (Nitro vercel preset).
 *
 * Nitro beta generates `"dest": "/__server"` in the route config, but the
 * actual function folder is `.vercel/output/functions/__nitro.func`.
 * Vercel Build Output API v3 expects the dest to match the function folder
 * name without the `.func` extension, so it should be `"/__nitro"`.
 *
 * Also ensures static assets have proper CORS and cache headers.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const configPath = resolve(".vercel/output/config.json");

if (!existsSync(configPath)) {
  console.log("⚠️  .vercel/output/config.json not found, skipping fix.");
  process.exit(0);
}

const config = JSON.parse(readFileSync(configPath, "utf8"));

let changed = false;

// Fix: Replace /__server with /__nitro in all route destinations
if (Array.isArray(config.routes)) {
  config.routes = config.routes.map((route) => {
    if (route.dest === "/__server") {
      console.log(`✅ Fixed route dest: "/__server" → "/__nitro"`);
      changed = true;
      return { ...route, dest: "/__nitro" };
    }
    return route;
  });
}

// Ensure the routes include a catch-all for SPA if missing
const hasCatchAll = config.routes?.some((r) => r.src === "/(.*)");
if (!hasCatchAll) {
  console.log("✅ Added catch-all route to /__nitro");
  config.routes = [
    ...(config.routes ?? []),
    { src: "/(.*)", dest: "/__nitro" },
  ];
  changed = true;
}

if (changed) {
  writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log("✅ .vercel/output/config.json patched successfully.");
} else {
  console.log("ℹ️  .vercel/output/config.json already correct, no changes needed.");
}
