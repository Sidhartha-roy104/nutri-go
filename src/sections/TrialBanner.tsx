import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PlanSubscriptionDrawer, { PlanDetails } from '../components/PlanSubscriptionDrawer';

export default function TrialBanner() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const trialPlan: PlanDetails = {
    id: 'trial',
    name: 'Trial',
    period: '4 bowls',
    priceRange: '₹399',
  };

  return (
    <section id="trial" className="bg-brand-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 rounded-4xl bg-brand-cream-dark p-8 shadow-card md:grid-cols-2 md:p-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-extrabold text-brand-green-deep md:text-3xl">
              Nutrition bowls packed with fruits, seeds & dates.
            </h2>
            <p className="mt-3 text-brand-muted">
              A wholesome mix of fresh fruit, soaked seeds, and dates in
              every bowl — real nutrition, no shortcuts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-brand-green-deep p-7 text-white"
          >
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-green">
              
            </p>
            <p className="mt-3 text-3xl font-extrabold">4 bowls · ₹399</p>
            <p className="mt-1 text-sm text-white/70">
              Free delivery
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-green-dark active:scale-95 sm:w-auto"
            >
              Order now <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>
      
      <PlanSubscriptionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        plan={trialPlan}
      />
    </section>
  );
}
