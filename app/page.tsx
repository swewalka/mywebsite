import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { SpaceScene } from "@/components/space/SpaceScene";

export default function Home() {
  return (
    <>
      <SpaceScene />
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
