import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Needs from "@/components/Needs";
import ProblemChecklist from "@/components/ProblemChecklist";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Specialist from "@/components/Specialist";
import Results from "@/components/Results";
import Reviews from "@/components/Reviews";
import Studio from "@/components/Studio";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Needs />
        <ProblemChecklist />
        <Services />
        <Process />
        <Specialist />
        <Results />
        <Reviews />
        <Studio />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
