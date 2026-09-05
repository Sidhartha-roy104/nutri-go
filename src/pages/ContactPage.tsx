import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import Contact from '../sections/Contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-cream max-w-[100vw] overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      <CartDrawer />
      <main className="pt-20 flex-1 max-w-full overflow-x-hidden">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
