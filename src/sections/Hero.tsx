import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const stats = [
  { label: '38g PROTEIN', className: 'left-4 top-4 sm:left-5 sm:top-5' },
  { label: '32g CARBS', className: 'left-4 bottom-4 sm:left-5 sm:bottom-5' },
  { label: '370 KCAL', className: 'right-4 bottom-4 sm:right-5 sm:bottom-5' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream pt-20 pb-12 md:pt-28 md:pb-20 max-w-full">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-brand-green/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">
            HIGH-PROTEIN BOWLS · WARANGAL · HANAMKONDA
          </span>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.02] text-brand-green-deep sm:text-5xl lg:text-6xl">
            Healthy Food <br></br>
            Delivered Fresh <br></br>
            <span className="text-brand-green"> Every Day <br></br></span>
          </h1>
          <p className="mt-4 max-w-md text-lg text-brand-muted leading-relaxed">
            Subscribe to daily protein bowls built to your macros. Pick a tier, plan
            your week, and we deliver fresh — lunch, dinner, or both.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href="#plans" className="btn-primary">
              Start your 4-day trial — ₹899 <ArrowRight size={16} />
            </a>
            <a href="#menu" className="text-sm font-bold text-brand-green-deep underline-offset-4 hover:underline">
              See the menu ↓
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-brand-muted">
            <span className="inline-flex items-center gap-1.5">
              <Check size={16} className="text-brand-green" /> No app needed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={16} className="text-brand-green" /> Cancel anytime
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={16} className="text-brand-green" /> Free delivery on trial
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
            <img
              src="/assets/Gym protein bowl ADD.webp"
              alt="High-protein bowl"
              className="h-full w-full object-cover shadow-glow"
            />
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className={`absolute z-20 ${s.className}`}
              >
                <div className="glass rounded-2xl px-4 py-2.5 shadow-card">
                  <p className="text-sm font-extrabold text-brand-green-deep">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
