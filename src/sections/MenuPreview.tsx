import { motion } from 'framer-motion';
import { Plus, ArrowRight, Minus } from 'lucide-react';
import { bowls } from '../data/bowls';
import VegIcon from '../components/VegIcon';
import WaveDivider from '../components/WaveDivider';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function MenuPreview() {
  const { addItem, items, updateQty, removeItem } = useCart();

  // Featured items: 2 Protein, 1 Regular, 1 Juice, 2 Salads
  const featuredIds = [
    'nutrition-bowl',
    'paneer-tikka-quinoa',
    'tandoori-chicken',
    'detox-drink',
    'green-veggie-salad',
    'spicy-egg-salad',
  ];
  const featured = bowls.filter((b) => featuredIds.includes(b.id));

  return (
    <>
      <WaveDivider color="#1B5E32" className="-mb-px" />
      <section id="menu" className="bg-brand-green-deep py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              22 fresh picks. You never repeat one in a plan.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              Every bowl is listed with its real protein and calories, so you know
              exactly what you're eating before you pay. Cooked in olive oil, 100%
              preservative-free.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 justify-items-center"
          >
            {featured.map((b, i) => {
              const cartItem = items.find((item) => item.id === b.id);
              return (
                <motion.article
                  key={b.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col rounded-3xl bg-[#F7F2E3] p-5 ring-1 ring-brand-cream-dark/10 backdrop-blur-sm transition hover:brightness-95 w-full"
                >
                  <div className="squircle-wrap mx-auto mb-4">
                    <img
                      src={b.image}
                      alt={b.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <VegIcon veg={b.veg} size={14} />
                    <h3 className="text-sm font-bold leading-tight text-brand-green-deep line-clamp-2">
                      {b.name}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-xs font-semibold text-brand-green">
                    {b.tier === 'juices'
                      ? b.ingredients
                      : `${b.protein}g protein · ${b.kcal} kcal · ${b.fiber}g fiber`}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-lg font-extrabold text-brand-green-deep">₹{b.price}</span>
                    {cartItem ? (
                      <div className="flex items-center gap-2 rounded-full border border-brand-green bg-brand-green/10 px-2.5 py-1">
                        <button
                          onClick={() => {
                            if (cartItem.quantity === 1) removeItem(b.id);
                            else updateQty(b.id, -1);
                          }}
                          className="grid h-6 w-6 place-items-center rounded-full bg-brand-cream text-brand-green-deep transition hover:bg-brand-green hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-4 text-center text-xs font-bold text-brand-green-deep">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(b.id, 1)}
                          className="grid h-6 w-6 place-items-center rounded-full bg-brand-cream text-brand-green-deep transition hover:bg-brand-green hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addItem({ id: b.id, name: b.name, price: b.price })}
                        className="inline-flex items-center gap-1.5 rounded-full border-2 border-brand-green/70 px-4 py-2 text-xs font-bold text-brand-green transition-all hover:bg-brand-green hover:text-white active:scale-95"
                      >
                        <Plus size={14} /> Add
                      </button>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold text-white shadow-glow transition hover:bg-brand-green-dark active:scale-95"
            >
              View Full Menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <WaveDivider color="#1B5E32" flip />
    </>
  );
}
