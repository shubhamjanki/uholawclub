import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { useForm } from "@tanstack/react-form";
import { appointmentSchema, type AppointmentFormValues } from "../lib/schema";
import { submitAppointment } from "../lib/appointmentFn";

/** Map the select option text → numeric amount */
const TIER_AMOUNTS: Record<string, number> = {
  "Legal consultation — ₹11,000": 11000,
  "UHO Card Holder — ₹1100": 1100,
};

const UPI_ID = "uholawclub@sbi";
const UPI_NAME = "UHO Law Club";

/** Build a RFC-compliant UPI deep-link */
function buildUpiUrl(amount: number, note: string) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_NAME,
    am: amount.toFixed(2),
    cu: "INR",
    tn: note,
  });
  return `upi://pay?${params.toString()}`;
}

/* ────────────── Payment Modal ────────────── */
function PaymentModal({
  tier,
  amount,
  name,
  email,
  onClose,
  onDone,
}: {
  tier: string;
  amount: number;
  name: string;
  email: string;
  onClose: () => void;
  onDone: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const note = `${tier} - ${name}`;
  const upiUrl = buildUpiUrl(amount, note);

  useEffect(() => {
    if (canvasRef.current && amount > 0) {
      QRCode.toCanvas(canvasRef.current, upiUrl, {
        width: 240,
        margin: 2,
        color: { dark: "#0a0f1e", light: "#f5f0e8" },
      });
    }
  }, [upiUrl, amount]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md border border-gold/60 bg-midnight shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-navy/80 px-6 py-4 backdrop-blur-md">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
            Next step: Payment
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-paper p-2 -mr-2">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded text-sm text-green-200">
            ✓ Confirmation email sent successfully to <strong>{email}</strong>
          </div>
          <div className="mb-6 text-center">
            <h3 className="font-serif text-2xl text-paper">
              Hi {name.split(" ")[0]},
            </h3>
            <p className="mt-2 text-sm text-paper/70">Please complete the payment to finalize your booking.</p>
          </div>

          {/* Amount badge */}
          <div className="w-full border border-border bg-navy/60 px-5 py-4 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {tier}
            </p>
            {amount > 0 ? (
              <p className="mt-2 font-serif text-4xl text-gold">
                ₹{amount.toLocaleString("en-IN")}
              </p>
            ) : (
              <p className="mt-2 font-serif text-lg text-paper/70">Amount to be confirmed</p>
            )}
            <p className="mt-1 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              UPI · {UPI_ID}
            </p>
          </div>

          {/* QR Code */}
          {amount > 0 ? (
            <div className="border border-border bg-paper p-3">
              <canvas ref={canvasRef} />
              <p className="mt-2 text-center font-mono text-[9px] text-navy/60 uppercase tracking-[0.2em]">
                Scan with any UPI app
              </p>
            </div>
          ) : (
            <div className="border border-border bg-navy/40 px-6 py-8 text-center text-sm text-paper/60">
              Payment amount will be shared after we review your requirement.
            </div>
          )}

          {/* UPI deep-link button */}
          {amount > 0 && (
            <a
              href={upiUrl}
              className="w-full inline-flex items-center justify-center gap-3 bg-[#00897b] px-6 py-3 text-sm font-medium text-white hover:bg-[#00695c] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.25 17.5l-4-4 1.41-1.41 2.59 2.58 5.59-5.58L17.75 10.5l-7 7z" />
              </svg>
              Open UPI App to Pay
            </a>
          )}

          {amount > 0 && (
            <p className="text-center font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
              GPay · PhonePe · Paytm · BHIM · Any UPI App
            </p>
          )}

          {/* Confirm */}
          <div className="w-full border-t border-border pt-5 flex flex-col gap-3">
            <button
              onClick={onDone}
              className="w-full bg-paper px-6 py-3 text-sm text-navy hover:bg-gold transition-colors"
            >
              I've paid — confirm my appointment →
            </button>
            <p className="text-center text-[11px] text-muted-foreground leading-relaxed">
              After payment, share the UTR / transaction ID on WhatsApp or email.
              <br />
              <span className="text-paper/60">uholawclub@gmail.com · +91 95326 60984</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SharedBookingForm() {
  const [paymentInfo, setPaymentInfo] = useState<{
    show: boolean;
    tier: string;
    amount: number;
    name: string;
    email: string;
  }>({ show: false, tier: "", amount: 0, name: "", email: "" });
  const [confirmed, setConfirmed] = useState(false);

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm({
    defaultValues: {
      name: "", email: "", phone: "", date: "", time: "", mode: "Online — video call (Zoom / Google Meet)", tier: "Legal consultation — ₹11,000", note: "", honeypot: ""
    } as AppointmentFormValues,
    validators: {
      onChange: appointmentSchema,
    },
    onSubmit: async ({ value }) => {
      setFormStatus('loading');
      setErrorMessage('');
      try {
        await submitAppointment({ data: value });
        setFormStatus('idle');
        const amount = TIER_AMOUNTS[value.tier] ?? 0;
        setPaymentInfo({ show: true, tier: value.tier, amount, name: value.name, email: value.email });
      } catch (err: any) {
        setFormStatus('error');
        setErrorMessage(err.message || 'An unexpected error occurred.');
      }
    },
  });

  const handleDone = () => {
    setPaymentInfo((p) => ({ ...p, show: false }));
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="border border-gold/50 bg-navy p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
          Confirmed
        </div>
        <h3 className="mt-4 font-serif text-2xl text-paper">
          Thank you — appointment request received.
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Please share your UPI transaction ID / UTR via WhatsApp or email to complete the
          booking. The chambers will confirm within one working day.
        </p>
        <div className="mt-6 flex gap-4 flex-wrap">
          <a
            href="https://wa.me/919532660984"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-green-500/60 bg-green-900/20 px-4 py-2 text-xs text-green-400 hover:bg-green-900/40 transition-colors"
          >
            WhatsApp UTR →
          </a>
          <a
            href="mailto:uholawclub@gmail.com"
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs text-paper hover:border-gold hover:text-gold transition-colors"
          >
            Email UTR →
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {paymentInfo.show && (
        <PaymentModal
          tier={paymentInfo.tier}
          amount={paymentInfo.amount}
          name={paymentInfo.name}
          email={paymentInfo.email}
          onClose={() => setPaymentInfo((p) => ({ ...p, show: false }))}
          onDone={handleDone}
        />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="grid gap-5 border border-border bg-navy/60 p-8"
      >
        {formStatus === 'error' && (
          <div className="p-3 bg-red-900/30 border border-red-500/50 text-red-200 text-sm rounded">
            {errorMessage}
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          <form.Field name="name">
            {(field) => (
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Your name</label>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
                {field.state.meta.errors ? <em className="text-red-400 text-xs mt-1 block">{field.state.meta.errors.join(', ')}</em> : null}
              </div>
            )}
          </form.Field>
          <form.Field name="email">
            {(field) => (
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
                {field.state.meta.errors ? <em className="text-red-400 text-xs mt-1 block">{field.state.meta.errors.join(', ')}</em> : null}
              </div>
            )}
          </form.Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <form.Field name="phone">
            {(field) => (
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Phone / WhatsApp</label>
                <input
                  type="tel"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
              </div>
            )}
          </form.Field>
          <div>{/* spacer */}</div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <form.Field name="date">
            {(field) => (
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Preferred date</label>
                <input
                  type="date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
              </div>
            )}
          </form.Field>
          <form.Field name="time">
            {(field) => (
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Preferred time</label>
                <input
                  type="time"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
              </div>
            )}
          </form.Field>
        </div>
        <div>
          <form.Field name="mode">
            {(field) => (
              <>
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Mode of consultation</label>
                <select
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none"
                >
                  <option>Online — video call (Zoom / Google Meet)</option>
                  <option>In-person — Jhansi chambers</option>
                  <option>Phone call</option>
                </select>
              </>
            )}
          </form.Field>
        </div>
        <div>
          <form.Field name="tier">
            {(field) => (
              <>
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Type of engagement</label>
                <select
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none"
                >
                  <option>Legal consultation — ₹11,000</option>
                  <option>UHO Card Holder — ₹1100</option>
                </select>
              </>
            )}
          </form.Field>
        </div>
        <div>
          <form.Field name="note">
            {(field) => (
              <>
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">A brief note about your matter</label>
                <textarea
                  rows={5}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none"
                />
                {field.state.meta.errors ? <em className="text-red-400 text-xs mt-1 block">{field.state.meta.errors.join(', ')}</em> : null}
              </>
            )}
          </form.Field>
        </div>
        <form.Field name="honeypot">
          {(field) => (
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />
          )}
        </form.Field>
        <button
          type="submit"
          disabled={formStatus === 'loading'}
          className="mt-2 inline-flex items-center justify-center gap-2 bg-paper px-6 py-3 text-sm text-navy hover:bg-gold transition-colors disabled:opacity-70"
        >
          {formStatus === 'loading' ? 'Processing...' : 'Send Appointment & Pay via UPI →'}
        </button>
        <p className="text-[11px] text-muted-foreground">
          Your note is confidential and not shared with third parties. Payment processed
          directly via UPI to {UPI_ID}.
        </p>
      </form>
    </>
  );
}
