import Build from "@/components/Build";
import Contact from "@/components/Contact";
import Engage from "@/components/Engage";
import Faq from "@/components/Faq";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Method from "@/components/Method";
import Results from "@/components/Results";
import ScrollRail from "@/components/ScrollRail";
import Services from "@/components/Services";
import Splash from "@/components/Splash";
import StackController from "@/components/StackController";
import Work from "@/components/Work";

export default function Page() {
  return (
    <>
      <Splash />
      <ScrollRail />
      <StackController />
      <div id="top" className="relative bg-surface">
        <Header />
        <main>
          <Hero />
          <Services />
          <Build />
          <Work />
          <Method />
          <Engage />
          <Results />
          <Faq />
          <Contact />
        </main>
      </div>
    </>
  );
}
