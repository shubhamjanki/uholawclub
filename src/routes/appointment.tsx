import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Book Consultation | UHO Law Club (uholawclub) – Adv. Avinash Pathak" },
      {
        name: "description",
        content:
          "Book a legal consultation with Advocate Avinash Pathak at UHO Law Club in Jhansi or online worldwide. Legal advice, UHO card member sessions, and retainer arrangements.",
      },
      { property: "og:title", content: "Book Consultation | UHO Law Club – Adv. Avinash Pathak" },
      {
        property: "og:description",
        content:
          "Book an in-person or online legal consultation with Advocate Avinash Pathak at UHO Law Club.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://uholawclub.com/appointment" },
    ],
    links: [{ rel: "canonical", href: "https://uholawclub.com/appointment" }],
  }),
  component: Appointment,
});

/* ────────────── Tier data ────────────── */
const TIERS = [
  {
    label: "UHO Card Holder",
    inr: "₹1100",
    usd: "US$ 10",
    per: "per session",
    amount: 1100,
    body: "Reserved for verified UHO Card Holders — the community rate. Ideal for members of partner societies and Green Bharat volunteers.",
    features: [
      "30-minute session",
      "Follow-up email note",
      "Community priority",
      "Available Mon – Sat",
    ],
    accent: false,
  },
  {
    label: "Legal Consultation",
    inr: "₹11,000",
    usd: "US$ 134",
    per: "per matter",
    amount: 11000,
    body: "The standard consultation for a new matter. A one-hour working session with Avinash, a written note, and a clear recommendation on next steps.",
    features: [
      "60-minute session with counsel",
      "Written opinion / note",
      "Document review (up to 30 pp.)",
      "One follow-up call included",
    ],
    accent: true,
  },
  // {
  //   label: "As Writer",
  //   inr: "₹1,00,000",
  //   usd: "US$ 1,220",
  //   per: "per engagement",
  //   amount: 100000,
  //   body: "Engage Avinash as a writer — commissioned essays, forewords, or long-form advisory pieces for institutions, publications and campaigns.",
  //   features: ["Commissioned essay or paper", "Two editorial rounds", "Publication rights negotiated", "3 – 5 week turnaround"],
  //   accent: false,
  // },
];

/** Map the select option text → numeric amount */
const TIER_AMOUNTS: Record<string, number> = {
  "Legal consultation — ₹11,000": 11000,
  "UHO Card Holder — ₹1100": 1100,
  // "Writer engagement — ₹1,00,000": 100000,
  // "Not sure yet": 0,
};

const UPI_ID = "uho@sbi";
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
interface PaymentModalProps {
  tier: string;
  amount: number;
  name: string;
  onClose: () => void;
  onDone: () => void;
}

function PaymentModal({ tier, amount, name, onClose, onDone }: PaymentModalProps) {
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
        <div className="border-b border-border px-8 py-5 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Payment</p>
            <h2 className="mt-1 font-serif text-xl text-paper">Scan to Pay via UPI</h2>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-muted-foreground hover:text-paper transition-colors text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-7 flex flex-col items-center gap-6">
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

/* ────────────── Main Component ────────────── */
function Appointment() {
  const [paymentInfo, setPaymentInfo] = useState<{
    show: boolean;
    tier: string;
    amount: number;
    name: string;
  }>({ show: false, tier: "", amount: 0, name: "" });
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const tier = (fd.get("tier") as string) || "Legal consultation — ₹11,000";
    const name = (fd.get("name") as string) || "Client";
    const amount = TIER_AMOUNTS[tier] ?? 0;
    setPaymentInfo({ show: true, tier, amount, name });
  };

  const handleDone = () => {
    setPaymentInfo((p) => ({ ...p, show: false }));
    setConfirmed(true);
  };

  return (
    <>
      {/* UPI Payment Modal */}
      {paymentInfo.show && (
        <PaymentModal
          tier={paymentInfo.tier}
          amount={paymentInfo.amount}
          name={paymentInfo.name}
          onClose={() => setPaymentInfo((p) => ({ ...p, show: false }))}
          onDone={handleDone}
        />
      )}

      <section className="mx-auto max-w-7xl px-6 pt-14 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">Appointment</p>
        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] text-paper">
          Three ways to walk into these chambers.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75">
          Pick the format that fits your matter. Consultations are available{" "}
          <span className="text-paper">in-person in Jhansi</span> or{" "}
          <span className="text-paper">online via video call</span> — clients are welcome from
          anywhere in the world.
        </p>
        {/* Global reach strip */}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 border border-border/60 bg-midnight px-6 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="text-gold">Worldwide</span>
          <span>India · In-person or online</span>
          <span className="text-steel">·</span>
          <span>United Kingdom</span>
          <span className="text-steel">·</span>
          <span>United States</span>
          <span className="text-steel">·</span>
          <span>Middle East</span>
          <span className="text-steel">·</span>
          <span>Southeast Asia</span>
          <span className="text-steel">·</span>
          <span>All time zones</span>
        </div>
      </section>

      {/* FORM */}
      <section id="book" className="border-t border-border bg-midnight">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mt-10 space-y-4 text-sm">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Direct line
                </div>
                <a
                  href="tel:+919532660984"
                  className="mt-1 block font-serif text-lg text-paper hover:text-gold"
                >
                  +91 95326 60984
                </a>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Jhansi Branch
                </div>
                <a
                  href="tel:+919305770340"
                  className="mt-1 block font-serif text-lg text-paper hover:text-gold"
                >
                  +91 93057 70340
                </a>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Email
                </div>
                <a
                  href="mailto:uholawclub@gmail.com"
                  className="mt-1 block text-paper/85 hover:text-gold break-words"
                >
                  uholawclub@gmail.com
                </a>
              </div>
              {/* UPI info panel */}
              <div className="mt-8 border border-gold/40 bg-navy/60 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                  UPI Payment
                </div>
                <p className="mt-2 font-serif text-lg text-paper">{UPI_ID}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  State Bank of India · {UPI_NAME}
                </p>
                <p className="mt-3 text-xs text-paper/60 leading-relaxed">
                  A QR code &amp; UPI deep-link will appear after you send the appointment request.
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            {confirmed ? (
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
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid gap-5 border border-border bg-navy/60 p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Phone / WhatsApp" name="phone" type="tel" />
                  <Field label="Preferred date" name="date" type="date" />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Mode of consultation
                  </label>
                  <select
                    name="mode"
                    className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none"
                  >
                    <option>Online — video call (Zoom / Google Meet)</option>
                    <option>In-person — Jhansi chambers</option>
                    <option>Phone call</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Type of engagement
                  </label>
                  <select
                    name="tier"
                    className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none"
                  >
                    <option>Legal consultation — ₹11,000</option>
                    <option>UHO Card Holder — ₹1100</option>
                    {/* <option>Writer engagement — ₹1,00,000</option>
                    <option>Not sure yet</option> */}
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    A brief note about your matter
                  </label>
                  <textarea
                    name="note"
                    rows={5}
                    required
                    className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-paper px-6 py-3 text-sm text-navy hover:bg-gold transition-colors"
                >
                  Send Appointment &amp; Pay via UPI →
                </button>
                <p className="text-[11px] text-muted-foreground">
                  Your note is confidential and not shared with third parties. Payment processed
                  directly via UPI to {UPI_ID}.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
              Our services
            </p>
            <h2 className="mt-3 font-serif text-3xl text-paper sm:text-4xl">
              Choose the format that fits your matter.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-paper/70">
            Whether you need a focused legal consultation, a community-rate session, or a
            commissioned writing engagement, we can help you begin with a clear next step.
          </p>
        </div>
        <div className="grid gap-px bg-border md:grid-cols-3">
          {TIERS.map((t) => (
            <article
              key={t.label}
              className={`p-8 md:p-10 ${t.accent ? "bg-paper text-navy" : "bg-navy text-paper"}`}
            >
              <div
                className={`font-mono text-[10px] uppercase tracking-[0.28em] ${t.accent ? "text-steel" : "text-gold"}`}
              >
                {t.label}
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <div className="font-serif text-5xl">{t.inr}</div>
                <div
                  className={`font-mono text-xs ${t.accent ? "text-navy/60" : "text-muted-foreground"}`}
                >
                  / {t.usd}
                </div>
              </div>
              <div
                className={`mt-1 font-mono text-[10px] uppercase tracking-[0.2em] ${t.accent ? "text-navy/60" : "text-muted-foreground"}`}
              >
                {t.per}
              </div>
              <p
                className={`mt-6 text-sm leading-relaxed ${t.accent ? "text-navy/80" : "text-paper/80"}`}
              >
                {t.body}
              </p>
              <ul
                className={`mt-6 space-y-2 text-sm ${t.accent ? "text-navy/85" : "text-paper/85"}`}
              >
                {t.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className={t.accent ? "text-steel" : "text-gold"}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className={`mt-10 inline-flex w-full items-center justify-center px-5 py-3 text-sm ${t.accent ? "bg-navy text-paper hover:bg-midnight" : "border border-paper/40 hover:bg-paper hover:text-navy"}`}
              >
                Request this appointment →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl border border-border bg-navy/60 p-8 md:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                Social links
              </p>
              <h2 className="mt-3 font-serif text-3xl text-paper">
                Stay connected with the chambers.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-paper/70">
              Follow updates, public writing, and UHO announcements through the channels below.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="https://www.uholawclub.in"
              target="_blank"
              rel="noreferrer"
              className="rounded border border-border bg-midnight/70 p-4 text-sm text-paper transition-colors hover:border-gold hover:text-gold"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
                Website
              </div>
              <div className="mt-2">uholawclub.in</div>
            </a>
            <a
              href="https://www.twitter.com/UHOlawclub"
              target="_blank"
              rel="noreferrer"
              className="rounded border border-border bg-midnight/70 p-4 text-sm text-paper transition-colors hover:border-gold hover:text-gold"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
                X / Twitter
              </div>
              <div className="mt-2">@UHOlawclub</div>
            </a>
            <a
              href="https://www.instagram.com/uholawclub"
              target="_blank"
              rel="noreferrer"
              className="rounded border border-border bg-midnight/70 p-4 text-sm text-paper transition-colors hover:border-gold hover:text-gold"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
                Instagram
              </div>
              <div className="mt-2">@uholawclub</div>
            </a>
            <a
              href="https://www.linkedin.com/company/UHOLawclub"
              target="_blank"
              rel="noreferrer"
              className="rounded border border-border bg-midnight/70 p-4 text-sm text-paper transition-colors hover:border-gold hover:text-gold"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
                LinkedIn
              </div>
              <div className="mt-2">UHO Law Club</div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper placeholder:text-muted-foreground focus:border-gold focus:outline-none"
      />
    </div>
  );
}
