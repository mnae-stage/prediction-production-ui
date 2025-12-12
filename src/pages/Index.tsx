import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { NewsSection } from '@/components/NewsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div id="accueil"><HeroSection /></div>
        <div id="services"><ServicesSection /></div>
        <div id="actualites"><NewsSection /></div>
        <div id="contact"><ContactSection /></div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
