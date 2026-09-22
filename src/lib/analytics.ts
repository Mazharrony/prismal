/**
 * One `track()` for whichever cookieless analytics a deploy enables through
 * `.env` (Plausible or Umami — see `components/analytics/Analytics.tsx`).
 * Both queue events fired before their script arrives, so calling this early
 * is safe, and with neither configured it is a no-op.
 */
export type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
    umami?: { track: (event: string, props?: EventProps) => void };
  }
}

export function track(event: string, props?: EventProps) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
  window.umami?.track(event, props);
}
