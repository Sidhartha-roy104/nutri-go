import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingCartBar() {
  const { totalCount, subtotal, isOpen, openCart } = useCart();

  return (
    <AnimatePresence>
      {totalCount > 0 && !isOpen && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 z-[990] mx-auto max-w-md sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-xs"
        >
          <button
            onClick={openCart}
            aria-label="View Cart"
            className="flex w-full items-center justify-between rounded-2xl bg-brand-green-deep px-5 py-3.5 text-white shadow-[0_10px_30px_rgba(27,94,50,0.35)] ring-2 ring-brand-green/40 backdrop-blur-lg transition-transform active:scale-[0.98] hover:bg-brand-forest"
          >
            <div className="flex items-center gap-3">
              <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-brand-green text-white">
                <ShoppingBag size={18} />
                <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-black text-brand-green-deep shadow">
                  {totalCount}
                </span>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-green-light">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'} added
                </p>
                <p className="text-base font-extrabold text-white">₹{subtotal}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-brand-green px-4 py-2 text-xs font-extrabold text-white shadow transition hover:bg-brand-green-dark">
              View Cart <ArrowRight size={14} />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
