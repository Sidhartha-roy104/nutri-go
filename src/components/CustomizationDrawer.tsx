import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, CheckCircle } from 'lucide-react';

interface CustomizationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  category: string;
  requirements: string;
  address: string;
  slot: string;
  allergies: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  category?: string;
  requirements?: string;
  address?: string;
}

const WHATSAPP_NUMBER = '918885850895';

const defaultForm: FormData = {
  name: '',
  phone: '',
  category: '',
  requirements: '',
  address: '',
  slot: 'Lunch',
  allergies: '',
};

export default function CustomizationDrawer({ isOpen, onClose }: CustomizationDrawerProps) {
  const [view, setView] = useState<'form' | 'confirm'>('form');
  const [form, setForm] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setView('form');
        setErrors({});
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit phone number';
    }
    if (!form.category) errs.category = 'Category is required';
    if (!form.requirements.trim()) errs.requirements = 'Please tell us what you are looking for';
    if (!form.address.trim()) errs.address = 'Delivery address is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function buildMessage(): string {
    const allergiesLine = form.allergies.trim() ? `\n⚠️ Allergies/avoid: ${form.allergies.trim()}` : '';

    return (
      `Hi Nutri Goo! I'd like to customize a bowl.\n\n` +
      `🎯 Category: ${form.category}\n` +
      `📝 What I'm looking for: ${form.requirements.trim()}` +
      allergiesLine + `\n\n` +
      `📋 Delivery Details:\n` +
      `Name: ${form.name.trim()}\n` +
      `Phone: ${form.phone.trim()}\n` +
      `Address: ${form.address.trim()}\n` +
      `Time slot: ${form.slot}`
    );
  }

  function handleWhatsApp() {
    if (!validate()) return;
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
    setView('confirm');
    setTimeout(() => {
      onClose();
      setForm(defaultForm);
    }, 2500);
  }

  function field(key: keyof FormData, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key as keyof FormErrors]) setErrors((p) => ({ ...p, [key]: undefined }));
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[1100] bg-brand-green-deep/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            key="drawer"
            className="fixed right-0 top-0 z-[1200] flex h-full w-full max-w-[420px] flex-col bg-brand-cream shadow-dark"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            {view === 'form' && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-brand-green/10 px-6 py-4">
                  <h2 className="text-lg font-extrabold text-brand-green-deep">Customize your bowl</h2>
                  <button
                    onClick={onClose}
                    className="grid h-9 w-9 place-items-center rounded-full border border-brand-green/20 bg-brand-cream-dark text-brand-green-deep transition hover:bg-brand-sage"
                    aria-label="Close"
                  >
                    <X size={17} />
                  </button>
                </div>

                {/* Form */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <div className="flex flex-col gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="mb-1 block text-xs font-bold text-brand-green-deep">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => field('name', e.target.value)}
                        placeholder="e.g. Arjun Reddy"
                        className={`w-full rounded-xl border bg-brand-cream-dark px-4 py-2.5 text-sm text-brand-green-deep placeholder:text-brand-muted/50 outline-none transition focus:ring-2 focus:ring-brand-green/30 ${errors.name ? 'border-red-400' : 'border-brand-green/15'}`}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-1 block text-xs font-bold text-brand-green-deep">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => field('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="10-digit mobile number"
                        className={`w-full rounded-xl border bg-brand-cream-dark px-4 py-2.5 text-sm text-brand-green-deep placeholder:text-brand-muted/50 outline-none transition focus:ring-2 focus:ring-brand-green/30 ${errors.phone ? 'border-red-400' : 'border-brand-green/15'}`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    {/* Category */}
                    <div>
                      <label className="mb-2 block text-xs font-bold text-brand-green-deep">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(['Gym Bowls', 'Weight Loss Bowls', 'Juices', 'Salads (Veg & Non-veg)', 'Nutrition Bowls', 'Other'] as const).map((c) => (
                          <label
                            key={c}
                            className={`flex cursor-pointer items-center rounded-full border px-3 py-1.5 transition ${form.category === c
                                ? 'border-brand-green bg-brand-green/5 text-brand-green-deep'
                                : 'border-brand-green/15 bg-brand-cream-dark text-brand-muted hover:border-brand-green/30'
                              }`}
                          >
                            <input
                              type="radio"
                              name="category"
                              value={c}
                              checked={form.category === c}
                              onChange={() => field('category', c)}
                              className="hidden"
                            />
                            <span className="text-xs font-semibold">{c}</span>
                          </label>
                        ))}
                      </div>
                      {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
                    </div>

                    {/* What are you looking for */}
                    <div>
                      <label className="mb-1 block text-xs font-bold text-brand-green-deep">
                        What are you looking for? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={form.requirements}
                        onChange={(e) => field('requirements', e.target.value)}
                        placeholder="Tell us your goal, preferences, or ingredients you'd like (e.g. high protein, no dairy, extra veggies, low calorie)"
                        className={`w-full resize-none rounded-xl border bg-brand-cream-dark px-4 py-2.5 text-sm text-brand-green-deep placeholder:text-brand-muted/50 outline-none transition focus:ring-2 focus:ring-brand-green/30 ${errors.requirements ? 'border-red-400' : 'border-brand-green/15'}`}
                      />
                      {errors.requirements && <p className="mt-1 text-xs text-red-500">{errors.requirements}</p>}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="mb-1 block text-xs font-bold text-brand-green-deep">
                        Delivery Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={form.address}
                        onChange={(e) => field('address', e.target.value)}
                        placeholder="Flat/House no., Street, Area, City"
                        className={`w-full resize-none rounded-xl border bg-brand-cream-dark px-4 py-2.5 text-sm text-brand-green-deep placeholder:text-brand-muted/50 outline-none transition focus:ring-2 focus:ring-brand-green/30 ${errors.address ? 'border-red-400' : 'border-brand-green/15'}`}
                      />
                      {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                    </div>

                    {/* Time Slot */}
                    <div>
                      <label className="mb-2 block text-xs font-bold text-brand-green-deep">
                        Preferred Delivery Slot <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        {(['Lunch', 'Dinner', 'Both'] as const).map((s) => (
                          <label
                            key={s}
                            className={`flex flex-1 cursor-pointer justify-center rounded-xl border px-3 py-2 transition ${form.slot === s
                                ? 'border-brand-green bg-brand-green/5 text-brand-green-deep'
                                : 'border-brand-green/15 bg-brand-cream-dark text-brand-muted hover:border-brand-green/30'
                              }`}
                          >
                            <input
                              type="radio"
                              name="slot"
                              value={s}
                              checked={form.slot === s}
                              onChange={() => field('slot', s)}
                              className="hidden"
                            />
                            <span className="text-xs font-semibold">{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Allergies */}
                    <div>
                      <label className="mb-1 block text-xs font-bold text-brand-green-deep">
                        Any allergies or items to avoid <span className="text-xs font-normal text-brand-muted">(optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        value={form.allergies}
                        onChange={(e) => field('allergies', e.target.value)}
                        placeholder="Peanuts, soy, dairy…"
                        className="w-full resize-none rounded-xl border border-brand-green/15 bg-brand-cream-dark px-4 py-2.5 text-sm text-brand-green-deep placeholder:text-brand-muted/50 outline-none transition focus:ring-2 focus:ring-brand-green/30"
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="border-t border-brand-green/10 bg-brand-cream-dark px-6 py-5">
                  <button
                    onClick={handleWhatsApp}
                    id="whatsapp-customization-btn"
                    className="flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-sm font-bold text-white shadow-glow transition active:scale-[0.97]"
                    style={{ backgroundColor: '#25D366' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1ebe5c')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
                  >
                    <MessageCircle size={18} />
                    Send Request via WhatsApp
                  </button>
                  <p className="mt-2.5 text-center text-xs text-brand-muted">
                    A pre-filled message will open in WhatsApp — just hit Send.
                  </p>
                </div>
              </>
            )}

            {/* ── Confirmation View ─────────────────────────── */}
            {view === 'confirm' && (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <CheckCircle size={72} className="text-brand-green" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-extrabold text-brand-green-deep">Request Sent!</h3>
                  <p className="mt-2 text-sm text-brand-muted">
                    Redirecting to WhatsApp to send your request…
                  </p>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
