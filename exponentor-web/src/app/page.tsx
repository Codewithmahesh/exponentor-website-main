import About from "@/components/About";
import Contact from "@/components/Contact";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import Products from "@/components/Products";
import Roadmap from "@/components/Roadmap";
import Team from "@/components/Team";
import Ticker from "@/components/Ticker";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Ticker />
        <About />
        <Products />
        <Roadmap />
        <Manifesto />
        <Team />
        <FaqSection />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
