import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

const items = [
  { icon: Mail, label: 'Email', value: 'hello@nutrigoo.in', href: 'mailto:hello@nutrigoo.in' },
  { icon: Phone, label: 'Phone / WhatsApp', value: '+91 88858 50895', href: 'tel:+918885850895' },
  { icon: MapPin, label: 'Address', value: 'Gundlasingaram, Ganesh nagar, Hanamkonda, Telangana 506001', href: undefined },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-brand-cream py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <span className="section-label">CONTACT US</span>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-green-deep md:text-4xl">
            Questions? We're here to help.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-brand-muted">
            Reach out for order help, bulk/corporate orders, or partnership inquiries.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column: Contact Cards */}
          <div className="flex flex-col gap-4">
            {items.map((it) => (
              <div
                key={it.label}
                className="flex flex-col items-center gap-2.5 rounded-3xl bg-brand-cream-dark p-6 sm:p-7 text-center shadow-card transition-transform hover:-translate-y-0.5"
              >
                <span className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-2xl bg-brand-green/10 text-brand-green">
                  <it.icon size={22} />
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-green">
                  {it.label}
                </p>
                {it.href ? (
                  <a
                    href={it.href}
                    className="text-sm font-bold text-brand-green-deep hover:text-brand-green transition-colors"
                  >
                    {it.value}
                  </a>
                ) : (
                  <p className="text-sm font-bold text-brand-green-deep">{it.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Right Column: Instagram Preview Area */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="mb-3.5 text-center max-w-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green">
                FOLLOW US
              </span>
              <h3 className="mt-0.5 text-xl font-extrabold text-brand-green-deep sm:text-2xl leading-tight">
                Daily updates, offers & more on Instagram
              </h3>
              {/* <p className="mt-1.5 text-xs text-brand-muted leading-relaxed">
                Follow <a href="https://www.instagram.com/nutri__goo/" target="_blank" rel="noreferrer" className="font-semibold text-brand-green hover:underline">@nutri__goo</a> for fresh menu drops, offers, and behind-the-scenes content.
              </p> */}
            </div>

            <div className="w-full flex justify-center">
              <img
                src="/assets/323.png"
                alt="Nutri Goo Instagram Preview"
                className="w-full max-w-[250px] sm:max-w-[250px] rounded-[16px] shadow-card object-contain border border-brand-green/10 transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            <a
              href="https://www.instagram.com/nutri__goo/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-soft transition hover:bg-brand-green-dark hover:shadow-glow active:scale-95"
            >
              <Instagram size={16} />
              Follow us on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
