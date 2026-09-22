import Script from "next/script";
import TrackClicks from "@/components/analytics/TrackClicks";

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const plausibleSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";
const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

/**
 * Cookieless analytics, loaded only when a deploy configures one (see
 * `.env.example`). No cookies and no personal data, so no consent banner —
 * and nothing at all is fetched while the variables are empty. Click and
 * form events go through `track()` in `src/lib/analytics.ts`.
 */
export default function Analytics() {
  return (
    <>
      {plausibleDomain && (
        <>
          {/* Queue calls made before the script arrives; Plausible drains it on load. */}
          <Script id="plausible-queue" strategy="afterInteractive">
            {"window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}"}
          </Script>
          <Script src={plausibleSrc} data-domain={plausibleDomain} strategy="afterInteractive" />
        </>
      )}
      {umamiSrc && umamiId && <Script src={umamiSrc} data-website-id={umamiId} strategy="afterInteractive" />}
      <TrackClicks />
    </>
  );
}
