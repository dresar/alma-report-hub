import * as handler from "./.vercel/output/functions/__nitro.func/index.mjs";
console.log("Default keys:", Object.keys(handler.default));
if (typeof handler.default.fetch === "function") {
  const req = new Request("http://localhost/login");
  const res = await handler.default.fetch(req);
  console.log("Status:", res.status);
  console.log(await res.text());
}
