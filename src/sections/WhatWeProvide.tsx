import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const checklist = [
  'Gym & high-protein bowls',
  'Weight loss friendly options',
  'Fresh salads & juices',
];

export default function WhatWeProvide() {
  return (
    <section className="bg-brand-cream py-16 md:py-24" id="what-we-provide">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center"
        >
          <div className="overflow-hidden rounded-3xl shadow-card max-w-[150px] sm:max-w-[250px] w-full">
            <img
              src="/assets/menu_pmplet.png"
              alt="Nutri Goo - What We Provide"
              className="h-auto w-full object-contain"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">WHAT WE PROVIDE</span>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-green-deep md:text-4xl">
            Healthy food, built around your goals.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-muted">
            Whether you're training for strength, working on weight loss, or just
            eating clean — Nutri Goo has a bowl, salad, or juice built for it.
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

          <div className="mt-8">
            <Link
              to="/menu"
              className="btn-outline group inline-flex items-center gap-2"
            >
              <span>Browse our menu</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-3xl bg-brand-green-deep px-6 py-5 text-center text-sm font-semibold text-white md:text-base">
          <span className="text-brand-green">❤</span>
          <span>Trusted by healthy meal subscribers across Hanamkonda.</span>
          <span className="hidden text-white/40 md:inline">·</span>
          <span className="text-white/80">Real ingredients. Real nutrition. Real results.</span>
        </div>
      </div>
    </section>
  );
}
