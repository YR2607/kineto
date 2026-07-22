import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 bg-mist-paper">
        <Hero />
        <Showcase />
        <Services />
        <About />
      </main>
      <Footer />
    </>
  );
}
