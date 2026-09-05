import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMenuPage = location.pathname === '/menu';
  const isContactPage = location.pathname === '/contact';
  const { totalCount, openCart } = useCart();

  // Links for all pages
  const allLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/#plans', label: 'Plans', isScroll: true },
    { to: '/contact', label: 'Contact Us' },
  ];

  const links = allLinks;
  const isActive = (link: typeof links[0]) => {
    if (link.to === '/' && isHomePage) return true;
    if (link.to === '/menu' && isMenuPage) return true;
    if (link.to === '/contact' && isContactPage) return true;
    return false;
  };

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof links[0]) => {
    if (link.isScroll && !isHomePage) {
      e.preventDefault();
      window.location.href = link.to;
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);



  return (
    <header className="fixed inset-x-0 top-0 z-[1000] bg-brand-sage shadow-soft">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/assets/323.png" alt="Nutri Goo" className="h-14 w-14 rounded-full object-cover shadow-soft" />
          <div>
            <p className="text-base font-extrabold text-brand-green-deep leading-tight">NUTRI <span className="text-brand-green">GOO</span></p>
            <p className="text-xs text-brand-muted">100% Organic</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((l) => (
            l.isScroll || l.label === 'Plans' ? (
              <a
                key={l.to}
                href={l.to}
                onClick={(e) => handleScrollLink(e, l)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-brand-green-deep transition-colors hover:bg-brand-sage-dark"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive(l)
                    ? 'bg-brand-sage-dark text-brand-green-deep font-bold'
                    : 'text-brand-green-deep hover:bg-brand-sage-dark'
                }`}
              >
                {l.label}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Cart icon + badge */}
          <button
            id="cart-icon-btn"
            onClick={openCart}
            aria-label="Open cart"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-brand-green/20 bg-brand-cream-dark text-brand-green-deep transition hover:bg-brand-sage"
          >
            <ShoppingBag size={18} />
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-[10px] font-extrabold text-white shadow">
                {totalCount > 99 ? '99+' : totalCount}
              </span>
            )}
          </button>

          <a
            href="/#plans"
            className="hidden rounded-full bg-brand-green px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brand-green-dark hover:shadow-glow active:scale-95 sm:inline-flex"
          >
            Order Now
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-green/20 bg-brand-cream-dark text-brand-green-deep lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-brand-green-deep/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85%] bg-brand-cream p-6 shadow-dark"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-bold text-lg text-brand-green-deep">Menu</span>
                <button
                  className="grid h-10 w-10 place-items-center rounded-full border border-brand-green/20 bg-brand-cream-dark text-brand-green-deep"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {links.map((l) => (
                  l.isScroll || l.label === 'Plans' ? (
                    <a
                      key={l.to}
                      href={l.to}
                      onClick={() => setOpen(false)}
                      className="rounded-2xl px-4 py-3 font-semibold text-brand-green-deep transition-colors hover:bg-brand-sage"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`rounded-2xl px-4 py-3 font-semibold transition-colors ${
                        isActive(l)
                          ? 'bg-brand-sage text-brand-green-deep font-bold'
                          : 'text-brand-green-deep hover:bg-brand-green/10'
                      }`}
                    >
                      {l.label}
                    </Link>
                  )
                ))}
                <a
                  href="/#plans"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-4"
                >
                  Order Now
                </a>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
