import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MenuPage from '../pages/MenuPage';
import CartDrawer from '../components/CartDrawer';

export default function MenuLayout() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <CartDrawer />
      <main>
        <MenuPage />
      </main>
      <Footer />
    </div>
  );
}
