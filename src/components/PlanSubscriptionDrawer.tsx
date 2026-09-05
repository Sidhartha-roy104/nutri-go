import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, CheckCircle } from 'lucide-react';

export interface PlanDetails {
  id: string;
  name: string;
  period: string;
  priceRange: string;
}

interface PlanSubscriptionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanDetails | null;
}

interface FormData {
  name: string;
  phone: string;
  address: string;
  mealPreference: 'Lunch only' | 'Dinner only' | 'Both';
  bowlPreference: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
}

const WHATSAPP_NUMBER = '918885850895';

const defaultForm: FormData = {
  name: '',
  phone: '',
  address: '',
  mealPreference: 'Lunch only',
  bowlPreference: '',
  notes: '',
};

export default function PlanSubscriptionDrawer({ isOpen, onClose, plan }: PlanSubscriptionDrawerProps) {
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
    if (!form.address.trim()) errs.address = 'Delivery address is required';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function buildMessage(): string {
    if (!plan) return '';

    const bowlPrefLine = form.bowlPreference ? `\n🥗 Bowl preference: ${form.bowlPreference}` : '';
    const notesLine = form.notes.trim() ? `\nNotes: ${form.notes.trim()}` : '';

    return (
      `Hi Nutri Goo! I'd like to subscribe to the ${plan.name} plan.\n\n` +
      `📦 Plan: ${plan.name} — ${plan.period}\n` +
      `💰 Price range: ${plan.priceRange} (excluding delivery)\n` +
      `🍽️ Meal preference: ${form.mealPreference}` +
      bowlPrefLine + `\n\n` +
      `📋 Delivery Details:\n` +
      `Name: ${form.name.trim()}\n` +
      `Phone: ${form.phone.trim()}\n` +
      `Address: ${form.address.trim()}\n` +
      notesLine + `\n\n` +
      `Please confirm final pricing and next steps!`
    );
  }

  function handleWhatsApp() {
    if (!validate() || !plan) return;
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
                  <h2 className="text-lg font-extrabold text-brand-green-deep">Plan Enquiry</h2>
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
                  {/* Selected Plan Summary */}
                  {plan && (
                    <div className="mb-5 rounded-2xl bg-brand-green-deep/5 px-4 py-3 ring-1 ring-brand-green/10">
                      <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-brand-green">Selected Plan</p>
                      <div className="flex justify-between text-sm font-semibold text-brand-green-deep">
                        <span>{plan.name}</span>
                        <span>{plan.priceRange}</span>
                      </div>
                      <p className="mt-1 text-xs text-brand-muted">{plan.period}</p>
                    </div>
                  )}

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

                    {/* Meal Preference */}
                    <div>
                      <label className="mb-2 block text-xs font-bold text-brand-green-deep">
                        Meal Preference <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        {(['Lunch only', 'Dinner only', 'Both'] as const).map((m) => (
                          <label
                            key={m}
                            className={`flex flex-1 cursor-pointer justify-center rounded-xl border px-3 py-2 transition ${
                              form.mealPreference === m
                                ? 'border-brand-green bg-brand-green/5 text-brand-green-deep'
                                : 'border-brand-green/15 bg-brand-cream-dark text-brand-muted hover:border-brand-green/30'
                            }`}
                          >
                            <input
                              type="radio"
                              name="mealPreference"
                              value={m}
                              checked={form.mealPreference === m}
                              onChange={() => field('mealPreference', m)}
                              className="hidden"
                            />
                            <span className="text-[11px] font-semibold sm:text-xs">{m}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Bowl Preference */}
                    <div>
                      <label className="mb-2 block text-xs font-bold text-brand-green-deep">
                        Bowl Preference <span className="text-xs font-normal text-brand-muted">(optional)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(['Protein Bowls', 'Regular Bowls', 'Salads', 'Mix of all'] as const).map((b) => (
                          <label
                            key={b}
                            className={`flex cursor-pointer items-center rounded-full border px-3 py-1.5 transition ${
                              form.bowlPreference === b
                                ? 'border-brand-green bg-brand-green/5 text-brand-green-deep'
                                : 'border-brand-green/15 bg-brand-cream-dark text-brand-muted hover:border-brand-green/30'
                            }`}
                          >
                            <input
                              type="radio"
                              name="bowlPreference"
                              value={b}
                              checked={form.bowlPreference === b}
                              onChange={() => field('bowlPreference', form.bowlPreference === b ? '' : b)} // Allow toggling off
                              onClick={() => field('bowlPreference', form.bowlPreference === b ? '' : b)}
                              className="hidden"
                            />
                            <span className="text-xs font-semibold">{b}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="mb-1 block text-xs font-bold text-brand-green-deep">
                        Notes <span className="text-xs font-normal text-brand-muted">(optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        value={form.notes}
                        onChange={(e) => field('notes', e.target.value)}
                        placeholder="Any specific instructions..."
                        className="w-full resize-none rounded-xl border border-brand-green/15 bg-brand-cream-dark px-4 py-2.5 text-sm text-brand-green-deep placeholder:text-brand-muted/50 outline-none transition focus:ring-2 focus:ring-brand-green/30"
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="border-t border-brand-green/10 bg-brand-cream-dark px-6 py-5">
                  <button
                    onClick={handleWhatsApp}
                    id="whatsapp-plan-btn"
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
