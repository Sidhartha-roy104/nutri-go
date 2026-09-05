import { Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-green-darker text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/assets/323.webp" alt="Nutri Goo" className="h-16 w-16 rounded-full object-cover" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-1">Nutri Goo</p>
                <p className="text-xs text-white/70">100% Organic</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Fresh Protein bowls delivered daily across <br></br>Hanamkonda, Waranagal, Kazipet.<br></br>
              Subscribe, plan your week, eat clean.
            </p>
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-green">
                Get launch updates
              </p>
              <div className="flex max-w-sm gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-full border border-brand-cream-dark/15 bg-brand-cream-dark/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-brand-green"
                />
                <button className="rounded-full bg-brand-green px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-green-dark">
                  Notify
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-green">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href="#menu" className="transition hover:text-white">Menu</a></li>
              <li><a href="#plans" className="transition hover:text-white">Plans</a></li>
              <li><a href="#trial" className="transition hover:text-white">Start trial</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-green">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href="#" className="transition hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="transition hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="transition hover:text-white">Refund Policy</a></li>
              <li><a href="#" className="transition hover:text-white">Delivery Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-green">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href="#founder" className="transition hover:text-white">About</a></li>
              <li><a href="/contact" className="transition hover:text-white">Contact Us</a></li>
              <li>
                <a
                  href="https://www.instagram.com/nutri__goo/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition hover:text-white"
                >
                  <Instagram size={14} /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cream-dark/10 px-3 py-1.5 text-xs font-semibold text-white/80">
              <ArrowRight size={12} className="text-brand-green" /> 200+ meals served
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cream-dark/10 px-3 py-1.5 text-xs font-semibold text-white/80">
              <ArrowRight size={12} className="text-brand-green" /> 4.9 rating
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cream-dark/10 px-3 py-1.5 text-xs font-semibold text-white/80">
              <ArrowRight size={12} className="text-brand-green" /> 2+ yrs in kitchens
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 text-sm text-white/60 md:flex-row md:items-center">
          <p>© 2026 Nutri Goo · Gundlasingaram, Ganesh nagar, Hanamkonda, Telangana 506001</p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:hello@nutrigoo.in" className="inline-flex items-center gap-1.5 transition hover:text-white">
              <Mail size={14} /> hello@nutrigoo.in
            </a>
            <a href="tel:+919876543210" className="inline-flex items-center gap-1.5 transition hover:text-white">
              <Phone size={14} /> +91 88858 50895
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> Hanamkonda, Telangana, India 506001
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
