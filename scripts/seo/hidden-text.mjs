// Loads a page the way a renderer that never sends input would — no mouse, no
// scroll — and fails if the scroll reveal has hidden any real amount of text.
// Then proves the reveal still works for a person: one pointer move arms the
// blocks below the fold, and scrolling reveals every one of them.
//
//   node scripts/seo/hidden-text.mjs http://localhost:3000/
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000/";
/** Share of text characters allowed to be hidden by opacity before any input. */
const MAX_HIDDEN = 0.01;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2,
});
await page.goto(url, { waitUntil: "load", timeout: 60_000 });
await page.waitForTimeout(3000);

const measure = () =>
  page.evaluate(() => {
    let byOpacity = 0;
    let byDisplay = 0;
    let visible = 0;
    for (const el of document.body.querySelectorAll("*")) {
      if (el.children.length) continue;
      const text = (el.textContent || "").trim();
      if (!text) continue;
      let opacity = 1;
      let displayed = true;
      for (let e = el; e && e !== document.body; e = e.parentElement) {
        const cs = getComputedStyle(e);
        if (cs.display === "none" || cs.visibility === "hidden") {
          displayed = false;
          break;
        }
        opacity *= parseFloat(cs.opacity);
      }
      if (!displayed) byDisplay += text.length;
      else if (opacity < 0.05) byOpacity += text.length;
      else visible += text.length;
    }
    const count = (s) => document.querySelectorAll(s).length;
    return {
      byOpacity,
      byDisplay,
      visible,
      blocks: count("[data-rv]"),
      armed: count(".rv-armed"),
      entered: count(".rv-enter"),
      pending: count(".rv-armed:not(.is-in)"),
    };
  });

const before = await measure();
const share = before.byOpacity / Math.max(1, before.byOpacity + before.visible);
console.log(
  `before input: ${before.visible} chars visible, ${before.byOpacity} hidden by opacity (${(share * 100).toFixed(2)}%), ` +
    `${before.byDisplay} display:none (menus, other breakpoint), ${before.entered} of ${before.blocks} blocks entered on load`,
);

await page.mouse.move(200, 300);
await page.waitForTimeout(200);
const afterInput = await measure();
console.log(`after a pointer move: ${afterInput.armed} of ${afterInput.blocks} blocks armed`);

await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.6);
  for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
});
await page.waitForTimeout(1500);
const end = await measure();
console.log(`after scrolling to the end: ${end.pending} blocks still hidden, ${end.byOpacity} chars hidden by opacity`);

await browser.close();

const failures = [];
if (share > MAX_HIDDEN) {
  failures.push(`reveal hides ${(share * 100).toFixed(1)}% of text before any input (limit ${MAX_HIDDEN * 100}%)`);
}
if (afterInput.blocks > 0 && afterInput.armed === 0 && afterInput.entered < afterInput.blocks) {
  failures.push("no block was armed by a pointer move — is Reveal mounted on this page?");
}
if (end.pending > 0) failures.push(`${end.pending} armed blocks never revealed`);
if (failures.length) {
  console.error("FAIL\n- " + failures.join("\n- "));
  process.exit(1);
}
console.log("OK");
