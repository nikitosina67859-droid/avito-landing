import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import WhatYouGet from "@/components/WhatYouGet";
import BeforeAfter from "@/components/BeforeAfter";
import Cases from "@/components/Cases";
import ProcessSteps from "@/components/ProcessSteps";
import About from "@/components/About";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/MobileStickyCta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-base-black">
        <Hero />
        <PainPoints />
        <WhatYouGet />
        <BeforeAfter />
        <Cases />
        <ProcessSteps />
        <About />
        <LeadForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
