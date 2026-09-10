import Build from "@/components/Build";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Dock from "@/components/Dock";
import Engage from "@/components/Engage";
import Faq from "@/components/Faq";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Interactions from "@/components/Interactions";
import Marquee from "@/components/Marquee";
import Method from "@/components/Method";
import Results from "@/components/Results";
import Reveal from "@/components/Reveal";
import ScrollBar from "@/components/ScrollBar";
import Services from "@/components/Services";
import SmoothScroll from "@/components/SmoothScroll";
import Splash from "@/components/Splash";
import Work from "@/components/Work";

export default function Page() {
  return (
    <>
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <Splash />
      <SmoothScroll />
      <Reveal />
      <Interactions />
      <Cursor />
      <ScrollBar />
      <Header />
      <Dock />
      <main id="top">
        <Hero />
        <Services />
        <Build />
        <Work />
        <Method />
        <Engage />
        <Results />
        <Faq />
        <Marquee />
        <Contact />
      </main>
    </>
  );
}
