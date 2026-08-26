import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Projects } from "@/components/Projects";
import { SpaceScene } from "@/components/space/SpaceScene";
import { SpaceTraffic } from "@/components/space/SpaceTraffic";

export default function Home() {
  return (
    <>
      <SpaceScene />
      <Navigation />
      <main>
        <Hero />
        <SpaceTraffic />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
