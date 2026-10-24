import type { Metadata } from "next";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import AdsContact from "@/components/ads/AdsContact";
import AdsFaq from "@/components/ads/AdsFaq";
import AdsHero from "@/components/ads/AdsHero";
import AdsIncluded from "@/components/ads/AdsIncluded";
import AdsPackages from "@/components/ads/AdsPackages";
import AdsSteps from "@/components/ads/AdsSteps";
import JsonLd from "@/components/seo/JsonLd";
import { ADS_FAQS, ADS_META } from "@/content/ad-creatives";
import { breadcrumbs, faqPage } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: ADS_META.title,
  description: ADS_META.description,
  path: ADS_META.path,
});

/** The Ad Creative Engine: the one offer that lives on its own page. */
export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          faqPage(ADS_FAQS),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Ad creatives", path: ADS_META.path },
          ]),
        ]}
      />
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll />
      <Reveal />
      <Header base="/" />
      <main id="top">
        <AdsHero />
        <AdsSteps />
        <AdsPackages />
        <AdsIncluded />
        <AdsFaq />
        <AdsContact />
      </main>
    </>
  );
}
