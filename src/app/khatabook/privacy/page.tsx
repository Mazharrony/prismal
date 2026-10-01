import type { Metadata } from "next";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { KHATABOOK_PRIVACY as POLICY } from "@/content/khatabook-privacy";
import { pageMetadata } from "@/lib/seo";

/**
 * Kept live because the app's store listing links here, but out of the index:
 * it is a third-party app's policy, not a Prismal page.
 */
export const metadata: Metadata = pageMetadata({
  title: POLICY.metaTitle,
  description: POLICY.metaDescription,
  path: "/khatabook/privacy",
  type: "article",
  noindex: true,
});

export default function Page() {
  return <PrivacyPolicy policy={POLICY} />;
}
