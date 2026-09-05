import { motion } from 'framer-motion';
import { Check, MapPin, Flame, Scale, ShieldCheck } from 'lucide-react';

const badges = [
  { icon: Flame, label: 'Cooked fresh daily' },
  { icon: Scale, label: 'Weighed to the gram' },
  { icon: ShieldCheck, label: 'Zero preservatives' },
];

export default function Founder() {
  return (
    <section id="founder" className="bg-brand-cream py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-card">
            <img
              src="assets\Founder011.webp"
              alt="Founder"
              className="h-96 w-full object-cover object-top scale-110 md:h-[28rem]"
            />
            <div className="absolute left-4 right-4 top-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-green px-3 py-1.5 text-xs font-bold text-white shadow-soft">
                2+ YRS IN KITCHENS
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-brand-green-deep px-5 py-3 text-center">
              <p className="text-sm font-bold text-white">200+ HEALTHY MEALS SERVED</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-brand-muted">
            <MapPin size={14} className="text-brand-green" /> Hanamkonda, Telangana
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">MEET THE FOUNDER</span>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-green-deep md:text-4xl">
            Make healthy living effortless.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-muted">
            <p className="text-lg font-semibold text-brand-green-deep">
              "Hi, I'm Sukumar......"
            </p>
            <p>Most people don't need more motivation to eat healthy. They already want to live a healthier life.</p>
            <p>The real challenge is finding healthy food that's easy, tasty, and fits into a busy day.</p>
            <p>That's why I built Nutri Goo."</p>
            <p>Every meal is freshly prepared, balanced with the right nutrition, and delivered to your doorstep — so you can focus on your life while we take care of your meals.</p>
            <p className="font-semibold text-brand-green-deep">"Make healthy living effortless.</p>
          </div>

          <div className="mt-6 border-l-2 border-brand-green pl-4">
            <p className="font-bold text-brand-green-deep">Sukumar</p>
            <p className="text-sm text-brand-muted">Founder, Nutri Goo · Hanamkonda</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-2 text-xs font-semibold text-brand-green-deep"
              >
                <b.icon size={14} className="text-brand-green" />
                {b.label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#plans" className="btn-primary">
              Start Your 4-Day Trial
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-brand-green-deep underline-offset-4 hover:underline"
            >
              Follow the journey ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
