import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { bowls } from '../data/bowls';
import VegIcon from '../components/VegIcon';
import WaveDivider from '../components/WaveDivider';
import { Link } from 'react-router-dom';

export default function MenuPreview() {
  const [added, setAdded] = useState<Set<string>>(new Set());

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
            {featured.map((b, i) => (
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
                        <Plus size={14} /> Add
                      </>
                    )}
                  </button>
                </div>
              </motion.article>
            ))}
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
