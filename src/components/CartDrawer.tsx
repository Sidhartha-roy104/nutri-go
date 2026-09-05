import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, MessageCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

type View = 'cart' | 'checkout' | 'confirm';

interface FormData {
  name: string;
  phone: string;
  address: string;
  landmark: string;
  slot: 'Lunch (12–2 PM)' | 'Dinner (6–8 PM)' | 'Both';
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
  landmark: '',
  slot: 'Lunch (12–2 PM)',
  notes: '',
};

export default function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, subtotal, isOpen, closeCart } = useCart();
  const [view, setView] = useState<View>('cart');
  const [form, setForm] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset to cart view when drawer closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setView('cart');
        setErrors({});
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Lock body scroll when open
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
    const orderLines = items
      .map((i) => `- ${i.name} x${i.quantity} — ₹${i.price * i.quantity}`)
      .join('\n');

    const landmarkLine = form.landmark.trim() ? `\nLandmark: ${form.landmark.trim()}` : '';
    const notesLine = form.notes.trim() ? `\nNotes: ${form.notes.trim()}` : '';

    return (
      `Hi Nutri Goo! I'd like to place an order:\n\n` +
      `🛒 Order:\n${orderLines}\n\n` +
      `Subtotal: ₹${subtotal}\n\n` +
      `📋 Delivery Details:\n` +
      `Name: ${form.name.trim()}\n` +
      `Phone: ${form.phone.trim()}\n` +
      `Address: ${form.address.trim()}` +
      landmarkLine +
      `\nTime slot: ${form.slot}` +
      notesLine
    );
  }

  function handleWhatsApp() {
    if (!validate()) return;
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
    setView('confirm');
    setTimeout(() => {
      clearCart();
      closeCart();
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
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[1100] bg-brand-green-deep/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            className="fixed right-0 top-0 z-[1200] flex h-full w-full max-w-[420px] flex-col bg-brand-cream shadow-dark"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            {/* ── Cart View ─────────────────────────────────── */}
            {view === 'cart' && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-brand-green/10 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={20} className="text-brand-green" />
                    <h2 className="text-lg font-extrabold text-brand-green-deep">Your Cart</h2>
                    {items.length > 0 && (
                      <span className="ml-1 rounded-full bg-brand-green px-2 py-0.5 text-xs font-bold text-white">
                        {items.reduce((s, i) => s + i.quantity, 0)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={closeCart}
                    className="grid h-9 w-9 place-items-center rounded-full border border-brand-green/20 bg-brand-cream-dark text-brand-green-deep transition hover:bg-brand-sage"
                    aria-label="Close cart"
                  >
                    <X size={17} />
                  </button>
                </div>

                {/* Items list */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                      <ShoppingBag size={48} className="text-brand-green/20" />
                      <p className="text-base font-semibold text-brand-muted">Your cart is empty</p>
                      <p className="text-sm text-brand-muted/70">Add bowls or fresh juices from the menu to get started.</p>
                      <button
                        onClick={closeCart}
                        className="mt-2 rounded-full bg-brand-green px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-green-dark"
                      >
                        Browse Menu
                      </button>
                    </div>
                  ) : (
                    <ul className="flex flex-col gap-3">
                      <AnimatePresence initial={false}>
                        {items.map((item) => (
                          <motion.li
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                            className="flex items-center gap-3 rounded-2xl bg-brand-cream-dark p-4 shadow-card ring-1 ring-brand-green/8"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="truncate text-sm font-bold text-brand-green-deep">{item.name}</p>
                              <p className="text-xs text-brand-muted">₹{item.price} each</p>
                            </div>

                            {/* Stepper */}
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateQty(item.id, -1)}
                                className="grid h-7 w-7 place-items-center rounded-full border border-brand-green/20 text-brand-green-deep transition hover:bg-brand-sage"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-5 text-center text-sm font-bold text-brand-green-deep">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, 1)}
                                className="grid h-7 w-7 place-items-center rounded-full border border-brand-green/20 text-brand-green-deep transition hover:bg-brand-sage"
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            <p className="w-14 text-right text-sm font-extrabold text-brand-green">
                              ₹{item.price * item.quantity}
                            </p>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-brand-muted transition hover:bg-red-50 hover:text-red-500"
                              aria-label={`Remove ${item.name}`}
                            >
                              <X size={14} />
                            </button>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="border-t border-brand-green/10 bg-brand-cream-dark px-6 py-5">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-brand-muted">Subtotal</span>
                      <span className="text-xl font-extrabold text-brand-green-deep">₹{subtotal}</span>
                    </div>
                    <button
                      onClick={() => setView('checkout')}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-green py-3.5 text-sm font-bold text-white shadow-glow transition hover:bg-brand-green-dark active:scale-[0.97]"
                    >
                      Proceed to Checkout →
                    </button>
                    <p className="mt-3 text-center text-xs text-brand-muted">
                      Free delivery · 100% fresh · No preservatives
                    </p>
                  </div>
                )}
              </>
            )}

            {/* ── Checkout Form View ────────────────────────── */}
            {view === 'checkout' && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-brand-green/10 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setView('cart')}
                      className="mr-1 grid h-8 w-8 place-items-center rounded-full border border-brand-green/20 bg-brand-cream-dark text-brand-green-deep transition hover:bg-brand-sage"
                      aria-label="Back to cart"
                    >
                      <ArrowLeft size={15} />
                    </button>
                    <h2 className="text-lg font-extrabold text-brand-green-deep">Delivery Details</h2>
                  </div>
                  <button
                    onClick={closeCart}
                    className="grid h-9 w-9 place-items-center rounded-full border border-brand-green/20 bg-brand-cream-dark text-brand-green-deep transition hover:bg-brand-sage"
                    aria-label="Close"
                  >
                    <X size={17} />
                  </button>
                </div>

                {/* Form */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  {/* Order summary mini */}
                  <div className="mb-5 rounded-2xl bg-brand-green-deep/5 px-4 py-3 ring-1 ring-brand-green/10">
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-brand-green">Order Summary</p>
                    {items.map((i) => (
                      <div key={i.id} className="flex justify-between text-xs text-brand-green-deep">
                        <span>{i.name} ×{i.quantity}</span>
                        <span className="font-semibold">₹{i.price * i.quantity}</span>
                      </div>
                    ))}
                    <div className="mt-2 flex justify-between border-t border-brand-green/10 pt-2 text-sm font-extrabold text-brand-green-deep">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                  </div>

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
                        placeholder="Full Name "
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
                        rows={3}
                        value={form.address}
                        onChange={(e) => field('address', e.target.value)}
                        placeholder="Flat/House no., Street, Area, City"
                        className={`w-full resize-none rounded-xl border bg-brand-cream-dark px-4 py-2.5 text-sm text-brand-green-deep placeholder:text-brand-muted/50 outline-none transition focus:ring-2 focus:ring-brand-green/30 ${errors.address ? 'border-red-400' : 'border-brand-green/15'}`}
                      />
                      {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                    </div>

                    {/* Landmark */}
                    <div>
                      <label className="mb-1 block text-xs font-bold text-brand-green-deep">
                        Landmark <span className="text-xs font-normal text-brand-muted">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={form.landmark}
                        onChange={(e) => field('landmark', e.target.value)}
                        placeholder="Near Apollo Hospital, opp. HDFC ATM…"
                        className="w-full rounded-xl border border-brand-green/15 bg-brand-cream-dark px-4 py-2.5 text-sm text-brand-green-deep placeholder:text-brand-muted/50 outline-none transition focus:ring-2 focus:ring-brand-green/30"
                      />
                    </div>

                    {/* Time Slot */}
                    <div>
                      <label className="mb-2 block text-xs font-bold text-brand-green-deep">
                        Preferred Delivery Slot <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-col gap-2">
                        {(['Lunch (12–2 PM)', 'Dinner (6–8 PM)', 'Both'] as const).map((s) => (
                          <label
                            key={s}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${form.slot === s
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
                              className="accent-brand-green"
                            />
                            <span className="text-sm font-semibold">{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="mb-1 block text-xs font-bold text-brand-green-deep">
                        Notes / Instructions <span className="text-xs font-normal text-brand-muted">(optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        value={form.notes}
                        onChange={(e) => field('notes', e.target.value)}
                        placeholder="Less spice, extra protein…"
                        className="w-full resize-none rounded-xl border border-brand-green/15 bg-brand-cream-dark px-4 py-2.5 text-sm text-brand-green-deep placeholder:text-brand-muted/50 outline-none transition focus:ring-2 focus:ring-brand-green/30"
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="border-t border-brand-green/10 bg-brand-cream-dark px-6 py-5">
                  <button
                    onClick={handleWhatsApp}
                    id="whatsapp-order-btn"
                    className="flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-sm font-bold text-white shadow-glow transition active:scale-[0.97]"
                    style={{ backgroundColor: '#25D366' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1ebe5c')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
                  >
                    <MessageCircle size={18} />
                    Place Order via WhatsApp
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
                  <h3 className="text-2xl font-extrabold text-brand-green-deep">Order Sent!</h3>
                  <p className="mt-2 text-sm text-brand-muted">
                    Redirecting to WhatsApp to confirm your order…
                  </p>
                  <p className="mt-1 text-xs text-brand-muted/60">
                    Your cart will be cleared shortly.
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
