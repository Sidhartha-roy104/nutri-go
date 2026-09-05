import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import MenuLayout from './pages/MenuLayout';
import ContactPage from './pages/ContactPage';
import FloatingCartBar from './components/FloatingCartBar';

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuLayout />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <FloatingCartBar />
    </CartProvider>
  );
}
