// Fetches every URL in the sitemap and checks the on-page SEO surface: a
// title, a description, a canonical that matches the page, an OG image, the
// large twitter card, exactly one h1, parseable JSON-LD with the nodes a page
// promises, and no unlabelled images beyond the decorative marks. Run against
// `npm run start`:
//
//   node scripts/seo/check-schema.mjs http://localhost:3000
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const production = "https://prismal.ae";
/** The wordmark's decorative marks legitimately carry alt="". */
const MAX_EMPTY_ALT = 2;

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (!paths.length) {
  console.error("sitemap has no <loc> entries");
  process.exit(1);
}

const attr = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};

let failed = false;
for (const path of paths) {
  const res = await fetch(`${base}${path}`);
  const html = await res.text();
  const problems = [];

  const title = attr(html, /<title>([^<]*)<\/title>/);
  if (!title) problems.push("no <title>");
  if (!/<meta name="description" content="[^"]+"/.test(html)) problems.push("no meta description");
  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  const expected = path === "/" ? production : `${production}${path}`;
  if (canonical !== expected) problems.push(`canonical ${canonical} ≠ ${expected}`);
  if (!/<meta property="og:image" content="[^"]+"/.test(html)) problems.push("no og:image");
  if (!/<meta name="twitter:card" content="summary_large_image"/.test(html)) problems.push("twitter card is not summary_large_image");
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) problems.push("noindex on a sitemap URL");
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${h1s} h1 elements`);
  const emptyAlt = (html.match(/alt=""/g) || []).length;
  if (emptyAlt > MAX_EMPTY_ALT) problems.push(`${emptyAlt} images with alt=""`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!blocks.length) problems.push("no JSON-LD");
  const types = [];
  for (const b of blocks) {
    try {
      const data = JSON.parse(b);
      const nodes = data["@graph"] ?? [data];
      for (const n of nodes) {
        if (!n["@type"]) problems.push("JSON-LD node without @type");
        types.push(n["@type"]);
        if (n["@type"] === "Organization" && !(n.name && n.url)) problems.push("Organization needs name and url");
        if (n["@type"] === "FAQPage" && !(Array.isArray(n.mainEntity) && n.mainEntity.length)) problems.push("FAQPage without questions");
        if (n["@type"] === "BreadcrumbList" && !n.itemListElement?.length) problems.push("BreadcrumbList without items");
      }
    } catch (e) {
      problems.push(`JSON-LD does not parse: ${e.message}`);
    }
  }
  if (!types.includes("Organization")) problems.push("no Organization node (root layout)");

  const line = `${res.status} ${path}  title="${title}"  ld:[${types.join(", ")}]`;
  if (problems.length) {
    failed = true;
    console.log(`FAIL ${line}\n  - ${problems.join("\n  - ")}`);
  } else {
    console.log(`ok   ${line}`);
  }
}
process.exit(failed ? 1 : 0);
