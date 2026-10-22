import SiteFrame from "@/components/SiteFrame";
import Hero from "@/components/Hero";
import SilkCurtain from "@/components/SilkCurtain";
import Aesthetics from "@/components/Aesthetics";
import Collections from "@/components/Collections";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function Separator() {
  return (
    <div className="section-separator">
      <span />
    </div>
  );
}

// Everything below is a Server Component except the pieces that need the
// browser (SiteFrame, SilkCurtain, Carousel, ContactForm, AutoVideo).
export default function Home() {
  return (
    <SiteFrame>
      <Hero />
      <Separator />
      <SilkCurtain />
      <Separator />
      <Aesthetics />
      <Separator />
      <Collections />
      <About />
      <Separator />
      <Contact />
      <Footer />
    </SiteFrame>
  );
}
