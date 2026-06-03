import NavBar from "@/components/sections/NavBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TrackRecord from "@/components/sections/TrackRecord";
import Products from "@/components/sections/Products";
import Process from "@/components/sections/Process";
import Gallery from "@/components/sections/Gallery";
import WhatsNext from "@/components/sections/WhatsNext";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <About />
      <TrackRecord />
      <Products />
      <Process />
      <Gallery />
      <WhatsNext />
      <Contact />
      <Footer />
    </main>
  );
}
