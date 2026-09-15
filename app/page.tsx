import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Needs from "@/components/Needs";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-col flex-1 bg-mist-paper">
        <Hero />
        <TrustStrip />
        <Needs />
        <Services />
        <Process />
        <About />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
