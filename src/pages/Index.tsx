
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Differentials from '@/components/Differentials';
import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import AIAssistant from '@/components/AIAssistant';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    document.title = "Joanyr Araujo | Advogado Previdenciarista em Palmas - Orientação Especializada";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <CTA />
        <Differentials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
      <AIAssistant />
    </div>
  );
};

export default Index;
