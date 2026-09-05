import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight, Minus } from 'lucide-react';
import { bowls, tierLabels, tierDescriptions, type BowlTier } from '../data/bowls';
import VegIcon from '../components/VegIcon';
import WaveDivider from '../components/WaveDivider';
import { useCart } from '../context/CartContext';
import CustomizationDrawer from '../components/CustomizationDrawer';

const tiers: BowlTier[] = ['protein', 'regular', 'juices', 'salads'];

export default function MenuPage() {
  const [active, setActive] = useState<BowlTier>('protein');
  const [isCustomizationOpen, setCustomizationOpen] = useState(false);
  const { addItem, items, updateQty, removeItem } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const list = bowls.filter((b) => b.tier === active);

  return (
    <>
      <section id="menu" className="bg-brand-green-deep pt-24 pb-12 text-white md:pt-28 md:pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              22 fresh picks, zero repeats in a plan.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              Every bowl and cold-pressed juice is listed with its real nutrition, so you know
              exactly what you're eating before you pay. Cooked fresh daily, 100%
              preservative-free.
            </p>
          </div>
        </div>
      </section>

      {/* Wave transition from dark green hero into cream section */}
      <div
        className="pointer-events-none w-full max-w-full overflow-hidden leading-none -mt-px -mb-px"
        style={{ background: '#F7F2E3' }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block h-[48px] w-full max-w-full md:h-[70px]"
          style={{ fill: '#1B5E32' }}
        >
          <path d="M0,0 L1440,0 L1440,20 C1080,80 360,80 0,20 Z" />
        </svg>
      </div>

      <section className="bg-[#F7F2E3] py-12 md:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <div id="menu-tabs" className="mb-8 flex flex-wrap justify-center gap-2 max-w-full">
            {tiers.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                  active === t
                    ? 'bg-brand-green text-white shadow-glow'
                    : 'bg-[#234A32] text-brand-lime hover:bg-[#2A5C3E] hover:text-white'
                }`}
              >
                {tierLabels[t]}
              </button>
            ))}
          </div>

          <p className="mb-8 text-center text-sm font-medium text-brand-lime">
            {tierLabels[active]} — {tierDescriptions[active]}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={
                active === 'juices'
                  ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
                  : 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
              }
            >
              {list.map((b, i) => {
                const cartItem = items.find((item) => item.id === b.id);
                return (
                <motion.article
                  key={b.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col rounded-3xl bg-[#F7F2E3] p-5 shadow-card ring-1 ring-[#D8CFA8] transition hover:shadow-glow"
                >
                  {active === 'juices' ? (
                      <div className="relative mb-4 overflow-hidden rounded-2xl bg-[#EDE3C7]/40 ring-1 ring-brand-green/15">
                        <img
                          src={b.image}
                          alt={b.name}
                          loading="lazy"
                          className="h-64 sm:h-72 w-full object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
                        />
                        {b.volume && (
                          <span className="absolute top-2.5 right-2.5 rounded-full bg-brand-green-deep/90 px-2.5 py-0.5 text-[11px] font-bold text-brand-lime shadow-sm backdrop-blur-sm">
                            {b.volume}
                          </span>
                        )}
                      </div>
                  ) : (
                    <div className="squircle-wrap mx-auto mb-4">
                      <img
                        src={b.image}
                        alt={b.name}
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <VegIcon veg={b.veg} size={14} />
                    <h3 className="text-sm font-bold leading-tight text-brand-green-deep">
                      {b.name}
                    </h3>
                  </div>

                  {active === 'juices' ? (
                    <p className="mt-1.5 text-xs font-semibold text-brand-muted">
                      {b.ingredients}
                    </p>
                  ) : (
                    <p className="mt-1.5 text-xs font-semibold text-brand-muted">
                      {b.protein}g protein · {b.kcal} kcal · {b.fiber}g fiber
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-lg font-extrabold text-brand-green">₹{b.price}</span>
                    {cartItem ? (
                      <div className="flex items-center gap-3 rounded-full border border-brand-green bg-brand-green/5 px-3 py-1.5">
                        <button
                          onClick={() => {
                            if (cartItem.quantity === 1) removeItem(b.id);
                            else updateQty(b.id, -1);
                          }}
                          className="grid h-6 w-6 place-items-center rounded-full bg-brand-cream-dark text-brand-green-deep transition hover:bg-brand-green hover:text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center text-sm font-bold text-brand-green-deep">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(b.id, 1)}
                          className="grid h-6 w-6 place-items-center rounded-full bg-brand-cream-dark text-brand-green-deep transition hover:bg-brand-green hover:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addItem({ id: b.id, name: b.name, price: b.price })}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-green px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-green-dark"
                      >
                        <Plus size={14} /> Add to cart
                      </button>
                    )}
                  </div>
                </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* ── Updated CTA banner ── */}
          <div className="mt-7 flex flex-col items-center gap-5 rounded-3xl bg-brand-green-forest px-6 py-10 text-center md:px-12">
            <div>
              <h3 className="text-2xl font-extrabold text-white md:text-3xl">
                Build your own bowl.
              </h3>
              <p className="mt-2 max-w-md text-sm text-white/70 md:text-base">
                Explore bowls by what you need — pick a category below.
              </p>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap justify-center gap-2 max-w-full">
              {[
                'Gym Bowls',
                'Weight Loss Bowls',
                'Juices',
                'Salads (Veg & Non-veg)',
                'Nutrition Bowls',
              ].map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    if (label === 'Juices') {
                      setActive('juices');
                      document.getElementById('menu-tabs')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-white transition hover:opacity-80 text-center max-w-full"
                  style={{ backgroundColor: 'rgba(143, 201, 107, 0.22)' }}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCustomizationOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold text-white shadow-glow transition hover:bg-brand-green-dark active:scale-95"
            >
              Start your trial <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>
      <WaveDivider color="#F7F2E3" flip />
      <CustomizationDrawer isOpen={isCustomizationOpen} onClose={() => setCustomizationOpen(false)} />
    </>
  );
}

