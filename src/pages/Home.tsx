import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import HowItWorks from '../sections/HowItWorks';
import Kitchen from '../sections/Kitchen';
import MenuPreview from '../sections/MenuPreview';
import Plans from '../sections/Plans';
import Founder from '../sections/Founder';
import TrialBanner from '../sections/TrialBanner';
import Contact from '../sections/Contact';
import CartDrawer from '../components/CartDrawer';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-cream max-w-[100vw] overflow-x-hidden">
      <Navbar />
      <CartDrawer />
      <main className="max-w-full overflow-x-hidden">
        <Hero />
        <HowItWorks />
        <Kitchen />
        <MenuPreview />
        <Plans />
        <Founder />
        <TrialBanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
