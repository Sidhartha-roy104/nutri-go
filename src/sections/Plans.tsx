import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import PlanSubscriptionDrawer, { PlanDetails } from '../components/PlanSubscriptionDrawer';

const plans = [
  {
    id: 'weekly',
    name: 'Weekly',
    period: '6 days',
    priceRange: '₹894 – ₹2,988',
    deliveryNote: 'Excluding delivery',
    tagline: 'Great for building a healthy habit',
    perks: ['6 delivery days', '6–12 meals'],
    highlight: false,
    badge: undefined,
  },
  {
    id: 'monthly',
    name: 'Monthly',
    period: '25 days',
    priceRange: '₹3,725 – ₹12,450',
    deliveryNote: 'Excluding delivery',
    tagline: 'Best value for regular customers',
    perks: ['25 delivery days', '25–50 meals'],
    highlight: true,
    badge: 'MOST POPULAR',
  },
];

export default function Plans() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);

  const handleChoosePlan = (plan: any) => {
    setSelectedPlan({
      id: plan.id,
      name: plan.name,
      period: plan.period,
      priceRange: plan.priceRange,
    });
    setIsDrawerOpen(true);
  };

  return (
    <section id="plans" className="bg-brand-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <span className="section-label">PLANS</span>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-green-deep md:text-4xl">
            Start small. Stay longer.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative flex flex-col rounded-3xl p-7 transition-all ${
                p.highlight
                  ? 'bg-brand-green-deep text-white shadow-dark scale-[1.02]'
                  : 'bg-brand-cream-dark text-brand-green-deep shadow-card hover:-translate-y-1'
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-green px-4 py-1 text-xs font-bold text-white shadow-soft">
                  {p.badge}
                </span>
              )}
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className={`text-sm ${p.highlight ? 'text-white/70' : 'text-brand-muted'}`}>
                {p.tagline}
              </p>
              <div className="mt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-green">
                  {p.period}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-extrabold">{p.priceRange}</p>
                <p className={`text-xs ${p.highlight ? 'text-brand-green' : 'text-brand-green'}`}>
                  {p.deliveryNote}
                </p>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                        p.highlight
                          ? 'bg-brand-green text-white'
                          : 'bg-brand-green/15 text-brand-green'
                      }`}
                    >
                      <Check size={12} />
                    </span>
                    <span className={p.highlight ? 'text-white/90' : 'text-brand-green-deep'}>
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleChoosePlan(p)}
                className={`mt-7 w-full rounded-full px-5 py-3 text-sm font-bold transition-all ${
                  p.highlight
                    ? 'bg-brand-green text-white hover:bg-brand-green-dark'
                    : 'bg-brand-green-deep text-white hover:bg-brand-forest'
                }`}
              >
                Choose this plan →
              </button>
              <div
                className={`mt-3 flex items-center justify-center gap-1 text-xs ${
                  p.highlight ? 'text-white/50' : 'text-brand-muted'
                }`}
              >
                <Star size={12} className="fill-amber-400 text-amber-400" />
                30-day money-back guarantee
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-brand-muted">
          *Prices shown exclude delivery charges. Final price depends on the bowl
          you choose and whether you select Lunch, Dinner, or Both.
        </p>
      </div>

      <PlanSubscriptionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        plan={selectedPlan}
      />
    </section>
  );
}
