// Tells Bing (and every other IndexNow engine) which URLs changed. Run after a
// content deploy:
//
//   node scripts/seo/indexnow.mjs https://prismal.ae
//
// The key is the 32-hex .txt file in /public; IndexNow fetches it at
// keyLocation to prove the submission comes from the site itself.
import { readdirSync } from "node:fs";

const base = (process.argv[2] ?? "https://prismal.ae").replace(/\/$/, "");
const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("no IndexNow key file in public/");
  process.exit(1);
}
const key = keyFile.slice(0, -4);

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(base).host, key, keyLocation: `${base}/${keyFile}`, urlList }),
});
console.log(`IndexNow ${res.status} ${res.statusText} — ${urlList.length} URLs submitted`);
if (!res.ok) process.exit(1);
