import { getDb } from "./src/api/_db.ts";

async function run() {
  const sql = getDb();
  const rows = await sql`SELECT * FROM print_settings`;
  console.log(rows);
}

run().catch(console.error).finally(() => process.exit(0));
