import { motion } from 'framer-motion';
import { CalendarDays, UtensilsCrossed, Truck } from 'lucide-react';

const steps = [
  {
    n: 1,
    title: 'Pick your plan',
    desc: 'Choose a bowl tier and a subscription — Trial, Weekly, or Monthly. Pay once, upfront.',
    icon: CalendarDays,
  },
  {
    n: 2,
    title: 'Plan your week',
    desc: 'Every Sunday, pick bowls for the week — lunch, dinner, or both. Monday to Saturday, your call.',
    icon: UtensilsCrossed,
  },
  {
    n: 3,
    title: 'We deliver, daily',
    desc: 'Lunch lands 12–2 PM, dinner 6–8 PM. Fresh, macro-tracked, zero effort from your side.',
    icon: Truck,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-brand-cream py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <span className="section-label">HOW IT WORKS</span>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-green-deep md:text-4xl">
            Three steps to clean eating.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-3xl border border-[#D8CFA8] bg-[#F7F2E3] p-8 shadow-card transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-green text-lg font-extrabold text-white shadow-soft">
                  {s.n}
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-lime/20 text-[#1B5E32]">
                  <s.icon size={20} />
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-green-deep">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
