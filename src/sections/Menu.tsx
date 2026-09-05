import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { bowls, tierLabels, tierDescriptions, type BowlTier } from '../data/bowls';
import VegIcon from '../components/VegIcon';
import WaveDivider from '../components/WaveDivider';

const tiers: BowlTier[] = ['protein', 'regular', 'juices', 'salads'];

export default function Menu() {
  const [active, setActive] = useState<BowlTier>('protein');
  const [added, setAdded] = useState<Set<string>>(new Set());

  const list = bowls.filter((b) => b.tier === active);

  const handleAdd = (id: string) => {
    setAdded((prev) => new Set(prev).add(id));
    window.setTimeout(() => {
      setAdded((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 1500);
  };

  return (
    <>
      <WaveDivider color="#1B5E32" />
      <section id="menu" className="bg-brand-green-deep py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
              THE MENU
            </span>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
              14 fresh picks. You never repeat one in a plan.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              Every bowl is listed with its real protein and calories, so you know
              exactly what you're eating before you pay. Cooked in olive oil, 100%
              preservative-free.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {tiers.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${active === t
                  ? 'bg-brand-green text-white shadow-glow'
                  : 'bg-[#234A32] text-brand-lime hover:bg-[#2A5C3E] hover:text-white'
                  }`}
              >
                {tierLabels[t]}
              </button>
            ))}
          </div>

          <p className="mb-6 text-center text-sm font-medium text-brand-green">
            {tierLabels[active]} — {tierDescriptions[active]}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [&>*:last-child:nth-child(3n+1)]:lg:col-start-2 [&>*:last-child:nth-child(4n+1)]:xl:col-start-2"
            >
              {list.map((b, i) => (
                <motion.article
                  key={b.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col rounded-3xl bg-[#F7F2E3] p-5 ring-1 ring-brand-cream-dark/10 backdrop-blur-sm transition hover:brightness-95 w-full"
                >
                  {/* Image */}
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
                    <button
                      onClick={() => handleAdd(b.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-xs font-bold transition-all ${added.has(b.id)
                        ? 'border-brand-green bg-brand-green text-white'
                        : 'border-brand-green/70 text-brand-green hover:bg-brand-green hover:text-white'
                        }`}
                    >
                      {added.has(b.id) ? (
                        <>Added</>
                      ) : (
                        <>
                          <Plus size={14} /> Add to cart
                        </>
                      )}
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-brand-green-forest px-6 py-10 text-center md:px-12">
            <h3 className="text-2xl font-extrabold text-white md:text-3xl">
              Ready to start?
            </h3>
            <p className="max-w-md text-sm text-white/70 md:text-base">
              Pick a tier and subscribe. Bowls change weekly so you never get bored.
            </p>
            <a
              href="#plans"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold text-white shadow-glow transition hover:bg-brand-green-dark active:scale-95"
            >
              Start your trial <ArrowRight size={16} />
            </a>
          </div> */}
        </div>
      </section>
      <WaveDivider color="#1B5E32" flip />
    </>
  );
}
