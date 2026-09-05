import { motion } from 'framer-motion';
import { Check, Radio } from 'lucide-react';

const checklist = [
  'Portioned to your exact macros',
  'Cooked fresh every single day',
  'Delivered Mon–Sat, on time',
];

export default function Kitchen() {
  return (
    <section className="bg-brand-cream py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-card">
            <img
              src="https://images.pexels.com/photos/5779775/pexels-photo-5779775.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our kitchen"
              className="h-80 w-full object-cover md:h-96"
            />
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-green px-3 py-1.5 text-xs font-bold text-white shadow-soft">
                <Radio size={12} className="fill-white" /> LIVE KITCHEN
              </span>
            </div>
          </div>
          <p className="mt-3 text-center text-xs font-medium text-brand-muted">
            No stock footage. This is our real kitchen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">OUR KITCHEN</span>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-green-deep md:text-4xl">
            See Where Your Food Is Made.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-muted">
            Every Nutri Goo meal is freshly prepared in our professional partner
            kitchen, carefully packed, and delivered straight to your doorstep.
          </p>
          <ul className="mt-6 space-y-3">
            {checklist.map((c) => (
              <li key={c} className="flex items-center gap-3 text-brand-green-deep">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green/15 text-brand-green">
                  <Check size={14} />
                </span>
                <span className="text-sm font-medium">{c}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-3xl bg-brand-green-deep px-6 py-5 text-center text-sm font-semibold text-white md:text-base">
          <span className="text-brand-green">❤</span>
          <span>Trusted by healthy meal subscribers across Hanamkonda.</span>
          <span className="hidden text-white/40 md:inline">·</span>
          <span className="text-white/80">Real kitchen. Real food. Real results.</span>
        </div>
      </div>
    </section>
  );
}
