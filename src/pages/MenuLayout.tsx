import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MenuPage from '../pages/MenuPage';
import CartDrawer from '../components/CartDrawer';

export default function MenuLayout() {
  return (
    <div className="min-h-screen bg-brand-cream max-w-[100vw] overflow-x-hidden">
      <Navbar />
      <CartDrawer />
      <main className="max-w-full overflow-x-hidden">
        <MenuPage />
      </main>
      <Footer />
    </div>
  );
}
