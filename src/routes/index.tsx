import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import tree from "../assets/tree.jpg";
import advocateImg2 from "../assets/WhatsApp Image 2026-07-29 at 19.28.22.jpeg";
import { useLanguage } from "../lib/LanguageContext";
import mapImage from "../assets/map.jpeg";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UHO Law Club | Adv. Avinash Pathak – Jhansi Law Firm" },
      {
        name: "description",
        content:
          "Chambers of Advocate Avinash Pathak in Jhansi. Expert legal representation in criminal defence, corporate advisory, and constitutional law before High Courts & Supreme Court.",
      },
      { property: "og:title", content: "UHO Law Club | Adv. Avinash Pathak – Jhansi Law Firm" },
      {
        property: "og:description",
        content:
          "Counsel with conviction. Advocacy with conscience. Chambers based in Jhansi, practising before the Supreme Court and High Courts.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://uholawclub.com/" },
    ],
    links: [{ rel: "canonical", href: "https://uholawclub.com/" }],
  }),
  component: Index,
});

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── UPI helpers (shared with BookingForm & ContactForm) ─────────── */
const UPI_ID = "uho@sbi";
const UPI_NAME = "UHO Law Club";

const TIER_AMOUNTS: Record<string, number> = {
  "Legal consultation — ₹11,000": 11000,
  "UHO Card Holder — ₹1100": 1100,
  // "Writer engagement — ₹1,00,000": 100000,
  // "Not sure yet": 0,
};

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

function UpiPaymentModal({
  tier,
  amount,
  name,
  onClose,
  onDone,
}: {
  tier: string;
  amount: number;
  name: string;
  onClose: () => void;
  onDone: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const upiUrl = buildUpiUrl(amount, `${tier} - ${name}`);

  useEffect(() => {
    if (canvasRef.current && amount > 0) {
      QRCode.toCanvas(canvasRef.current, upiUrl, {
        width: 220,
        margin: 2,
        color: { dark: "#0a0f1e", light: "#f5f0e8" },
      });
    }
  }, [upiUrl, amount]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4">
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
        <div className="px-8 py-7 flex flex-col items-center gap-5">
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
          {/* QR */}
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
          {/* Deep-link */}
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
              After payment, share the UTR on WhatsApp or email.
              <br />
              <span className="text-paper/60">uholawclub@gmail.com · +91 95326 60984</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();
  return (
    <div className="grid gap-px bg-border md:grid-cols-12">
      <div className="bg-navy p-8 md:col-span-4 flex flex-col justify-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
          {t("contact.writeIn")}
        </p>
        <h3 className="mt-3 font-serif text-2xl text-paper">{t("contact.sendMessage")}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {t("contact.writeInDesc")}
        </p>
        <p className="mt-6 text-xs text-muted-foreground">{t("contact.writeInConf")}</p>
      </div>
      <div className="bg-midnight p-8 md:col-span-8">
        {sent ? (
          <div className="flex h-full flex-col justify-center py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
              {t("form.received")}
            </div>
            <h4 className="mt-3 font-serif text-2xl text-paper">{t("form.thankYou")}</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("form.thankYouDesc")}{" "}
              <a href="tel:+919532660984" className="text-paper hover:text-gold">
                +91 9532660984
              </a>{" "}
              {t("form.thankYouSuffix")}
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="flex flex-col gap-4 sm:gap-6"
          >
            <FormField label={t("form.name")} name="name" required />
            <FormField label={t("form.email")} name="email" type="email" required />
            <FormField label={t("form.phone")} name="phone" type="tel" />
            <FormField label={t("contact.subject")} name="subject" />
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/90">
                {t("contact.yourMessage")}
              </label>
              <textarea
                name="message"
                rows={2}
                required
                className="w-full resize-y rounded-md border border-border bg-white px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-black/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black/20"
                placeholder={t("contact.messagePlaceholder")}
              />
            </div>
            
            <button
              type="submit"
              className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-md bg-black px-6 py-3 sm:py-4 text-sm font-semibold text-white transition-all hover:bg-black/80 active:scale-[0.98]"
            >
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/90">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-white px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-black/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black/20"
      />
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-l border-border pl-4">
      <div className="font-serif text-3xl text-paper">{n}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function BookingForm() {
  const [paymentInfo, setPaymentInfo] = useState<{
    show: boolean;
    tier: string;
    amount: number;
    name: string;
  }>({ show: false, tier: "", amount: 0, name: "" });
  const [confirmed, setConfirmed] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const tier = (fd.get("tier") as string) || "Legal consultation — ₹11,000";
    const name = (fd.get("name") as string) || "Client";
    const amount = TIER_AMOUNTS[tier] ?? 0;
    setPaymentInfo({ show: true, tier, amount, name });
  };

  if (confirmed) {
    return (
      <div className="border border-gold/50 bg-navy p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Confirmed</div>
        <h3 className="mt-4 font-serif text-2xl text-paper">
          Thank you — appointment request received.
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Please share your UPI transaction ID / UTR via WhatsApp or email. The chambers will
          confirm within one working day.
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
        <UpiPaymentModal
          tier={paymentInfo.tier}
          amount={paymentInfo.amount}
          name={paymentInfo.name}
          onClose={() => setPaymentInfo((p) => ({ ...p, show: false }))}
          onDone={() => {
            setPaymentInfo((p) => ({ ...p, show: false }));
            setConfirmed(true);
          }}
        />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
        <FormField label={t("form.name")} name="name" required />
        <FormField label={t("form.email")} name="email" type="email" required />
        <FormField label={t("form.phone")} name="phone" type="tel" />
        <FormField label={t("form.date")} name="date" type="date" />

        {/* Mode */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/90">
            {t("form.mode")}
          </label>
          <select
            name="mode"
            className="w-full appearance-none rounded-md border border-border bg-white px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm text-foreground transition-all focus:border-black/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black/20"
          >
            <option>{t("form.modeOnline")}</option>
            <option>{t("form.modeInPerson")}</option>
            <option>{t("form.modePhone")}</option>
          </select>
        </div>

        {/* Service */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/90">
            {t("form.tier")}
          </label>
          <select
            name="tier"
            className="w-full appearance-none rounded-md border border-border bg-white px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm text-foreground transition-all focus:border-black/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black/20"
          >
            <option>{t("form.tierLegal")}</option>
            <option>{t("form.tierUHO")}</option>
          </select>
        </div>

        {/* Note */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/90">
            {t("form.note")}
          </label>
          <textarea
            name="note"
            rows={2}
            required
            placeholder={t("form.notePlaceholder")}
            className="w-full resize-y rounded-md border border-border bg-white px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-black/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black/20"
          />
        </div>

        {/* Button */}
        <div className="mt-1 flex flex-col gap-3">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-black px-6 py-3 sm:py-4 text-sm font-semibold text-white transition-all hover:bg-black/80 active:scale-[0.98]"
          >
            Send Appointment &amp; Pay via UPI →
          </button>
          
          <p className="text-center text-[11px] text-muted-foreground">
            {t("form.confidential")}
          </p>
        </div>
      </form>
    </>
  );
}

function Index() {
  const { t } = useLanguage();

  const AREAS = [
    { n: "01", title: t("practice.01.title"), desc: t("practice.01.desc") },
    { n: "02", title: t("practice.02.title"), desc: t("practice.02.desc") },
    { n: "03", title: t("practice.03.title"), desc: t("practice.03.desc") },
    { n: "04", title: t("practice.04.title"), desc: t("practice.04.desc") },
  ];

  return (
    <>
      {/* BOOK APPOINTMENT FORM — top of page */}
      <section className="border-b border-border bg-midnight">
        <div className="mx-auto grid max-w-7xl gap-px bg-border px-0 md:grid-cols-12">
          {/* Left — booking form */}
          <div className="bg-white/60 p-5 md:p-8 md:col-span-8">
            <BookingForm />
          </div>

          {/* Right — appointment info */}
          <div className="bg-navy p-8 md:col-span-4 flex flex-col justify-between">
            <div className="mx-auto max-w-7xl px-6 pt-14 pb-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
                {t("booking.tag")}
              </p>
              <h1 className="mt-4 max-w-3xl font-serif text-[clamp(1rem,2vw,2.5rem)] leading-[1.08] tracking-tight text-paper">
                {t("booking.title")}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/70">
                {t("booking.subtitle")}
              </p>
            </div>

            <div className="mt-8 space-y-5 text-sm">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {t("booking.sidebar.directLine")}
                </div>
                <a
                  href="tel:+919532660984"
                  className="mt-1 block font-serif text-lg text-paper hover:text-gold"
                >
                  +91 9532660984
                </a>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {t("booking.sidebar.email")}
                </div>
                <a
                  href="mailto:uholawclub@gmail.com"
                  className="mt-1 block text-paper/85 hover:text-gold break-words"
                >
                  uholawclub@gmail.com
                </a>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {t("booking.sidebar.whatsapp")}
                </div>
                <a
                  href="https://wa.me/919532660984"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-paper/85 hover:text-gold"
                >
                  {t("booking.sidebar.whatsappCta")}
                </a>
              </div>

              {/* <div className="mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <Stat n="8+" label={t("stat.yrs")} />
                <Stat n="19+" label={t("stat.books")} />
                <Stat n="46" label={t("stat.districts")} />
                <Stat n="2020" label={t("stat.founded")} />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      <div className="border-y border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-3 px-6 py-5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>UHO Law Club Asia </span>
          <span className="text-steel">·</span>
          <span>UHO Law Club Europe </span>
          <span className="text-steel">·</span>
          <span>UHO law club Africa</span>
        </div>
      </div>

      {/* PRACTICE AREAS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-8 border-b border-border pb-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
              {t("practice.tag")}
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">
              {t("practice.title")}
            </h2>
          </div>
          <Link
            to="/practice"
            className="hidden md:inline-flex items-center gap-2 text-sm text-paper/70 hover:text-paper"
          >
            {t("practice.viewAll")}
          </Link>
        </div>
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a) => (
            <Link
              key={a.n}
              to="/practice"
              className="group flex flex-col justify-between bg-navy p-8 transition-colors hover:bg-midnight"
            >
              <div>
                <div className="font-mono text-xs text-gold">{a.n}</div>
                <h3 className="mt-6 font-serif text-2xl text-paper">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              </div>
              <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 transition-colors group-hover:text-gold">
                {t("practice.explore")}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SOCIAL MEDIA */}
      <section className="border-y border-border bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <FadeIn>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-steel">Connect</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-navy">Follow the work.</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-midnight/70">
              Join the conversation across platforms — daily notes from court, essays on justice,
              and the movements growing out of Bundelkhand.
            </p>
          </FadeIn>

          <div className="mt-12 flex gap-px bg-border overflow-x-auto pb-4 scroll-smooth scrollbar-none">
            {[
              {
                name: "Website",
                handle: "www.uholawclub.in",
                url: "https://www.uholawclub.in",
                desc: "Visit the official website for firm information, services, and contact details.",
              },
              {
                name: "Twitter",
                handle: "@UHOlawclub",
                url: "https://www.twitter.com/UHOlawclub",
                desc: "Daily commentary on law, constitutional rights, and public notices from the chambers.",
              },
              {
                name: "Instagram",
                handle: "@uholawclub",
                url: "https://www.instagram.com/uholawclub",
                desc: "Behind the scenes in chambers, civic action events, and photos from tree plantation drives.",
              },
              {
                name: "LinkedIn",
                handle: "UHO Law Club",
                url: "https://www.linkedin.com/company/UHOLawclub",
                desc: "Professional updates, company profile, and practice announcements.",
              },
            ].map((s, i) => (
              <FadeIn
                key={s.name}
                delay={i * 80}
                className="group bg-paper transition-colors hover:bg-navy/[0.04] min-w-[280px] max-w-[320px] flex-shrink-0 snap-start"
              >
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${s.name} profile`}
                  className="block h-full p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-navy/20 text-navy transition-colors group-hover:border-gold group-hover:text-gold">
                    {s.name === "Twitter" && (
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    )}
                    {s.name === "Instagram" && (
                      <svg
                        className="h-5 w-5 fill-none stroke-current"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    )}
                    {s.name === "Website" && (
                      <svg
                        className="h-5 w-5 fill-none stroke-current"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15 15 0 0 1 0 20" />
                        <path d="M12 2a15 15 0 0 0 0 20" />
                      </svg>
                    )}
                    {s.name === "LinkedIn" && (
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M6.94 8.5A1.56 1.56 0 1 0 6.94 5.38a1.56 1.56 0 0 0 0 3.12zM5.5 9.75h2.88V18H5.5zM10.45 9.75h2.76v1.12h.04c.38-.72 1.31-1.48 2.7-1.48 2.88 0 3.41 1.89 3.41 4.35V18h-2.88v-7.57c0-1.8-.03-4.12-2.5-4.12-2.51 0-2.89 1.96-2.89 3.98V18H10.45z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-navy">{s.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
                    {s.handle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-midnight/70">{s.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-navy/50 transition-colors group-hover:text-gold">
                    Visit profile →
                  </span>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* UHO HISTORY — animated chapters */}
      <section className="border-y border-border bg-midnight overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">
          {/* Header */}
          <FadeIn className="mb-14 border-b border-border pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
              {t("history.tag")}
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-paper">
              {t("history.title")}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/65">
              {t("history.desc")}
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 border-b border-paper/40 pb-1 text-sm text-paper/70 hover:text-paper hover:border-paper"
            >
              {t("history.readFull")}
            </Link>
          </FadeIn>

          {/* Chapters */}
          <div className="space-y-px">
            {[
              {
                n: "01",
                title: t("history.ch01.title"),
                period: "2020",
                left: t("history.ch01.left"),
                right: t("history.ch01.right"),
                quote: t("history.ch01.quote"),
              },
              {
                n: "02",
                title: t("history.ch02.title"),
                period: "2017 – 2020",
                left: t("history.ch02.left"),
                right: t("history.ch02.right"),
                quote: null,
              },
              {
                n: "03",
                title: t("history.ch03.title"),
                period: "2020 – 2023",
                left: t("history.ch03.left"),
                right: t("history.ch03.right"),
                quote: null,
              },
              {
                n: "04",
                title: t("history.ch04.title"),
                period: "2020 – Present",
                left: t("history.ch04.left"),
                right: t("history.ch04.right"),
                quote: null,
              },
            ].map((ch, i) => (
              <FadeIn key={ch.n} delay={i * 80} className="grid gap-px bg-border md:grid-cols-12">
                <div className="bg-midnight p-8 md:p-10 md:col-span-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
                    Chapter {ch.n}
                  </div>
                  <div className="mt-4 font-serif text-2xl text-paper leading-snug">{ch.title}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {ch.period}
                  </div>
                  <div className="mt-8 h-px w-12 bg-gold/40" />
                </div>
                <div className="bg-navy/40 p-8 md:p-10 md:col-span-9 space-y-4 text-base leading-[1.85] text-paper/80">
                  <p>{ch.left}</p>
                  <p>{ch.right}</p>
                  {ch.quote && (
                    <blockquote className="border-l-2 border-gold pl-5 mt-2 font-serif text-xl text-paper italic">
                      {ch.quote}
                    </blockquote>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Motto banner */}
          <FadeIn
            delay={320}
            className="mt-px bg-navy border border-border/60 px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-gold shrink-0" />
              <p className="font-serif text-xl text-paper italic">{t("history.motto")}</p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground shrink-0">
              {t("history.est")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PHILOSOPHY / PULL QUOTE */}
      <section className="paper-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src={advocateImg2}
              alt="Advocate Avinash Pathak outside the court"
              width={1280}
              height={1920}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-steel">
              {t("philosophy.tag")}
            </p>
            <blockquote className="mt-6 font-serif text-3xl leading-[1.25] md:text-4xl text-navy">
              {t("philosophy.quote")}
            </blockquote>
            <div className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-midnight">
              {t("philosophy.author")}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 bg-navy px-6 py-3 text-sm text-paper hover:bg-midnight"
              >
                {t("philosophy.bio")}
              </Link>
              <Link
                to="/books"
                className="inline-flex items-center gap-2 border-b border-navy/40 pb-1 text-sm text-navy hover:border-navy"
              >
                {t("philosophy.writings")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INITIATIVES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
              {t("initiatives.tag")}
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">
              {t("initiatives.title")}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              {t("initiatives.desc")}
            </p>
            <Link
              to="/initiatives"
              className="mt-8 inline-flex items-center gap-2 border-b border-paper/40 pb-1 text-sm hover:border-paper"
            >
              {t("initiatives.read")}
            </Link>
          </div>
          <div className="relative">
            <img
              src={tree}
              alt="Plant a tree on your birthday"
              width={1200}
              height={900}
              loading="lazy"
              className="w-full grayscale-[.2]"
            />
            <div className="absolute bottom-4 left-4 bg-navy/90 px-4 py-3 border border-border">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                {t("initiatives.movement")}
              </div>
              <div className="mt-1 font-serif text-lg text-paper">{t("initiatives.plantTree")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT + MAP + FORM */}
      <section className="border-t border-border bg-midnight">
        <div className="mx-auto max-w-7xl px-6 py-20">
          {/* Section header */}
          <div className="mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
              {t("contact.tag")}
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">
              {t("contact.title")}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("contact.desc")}
            </p>
          </div>

          {/* Map + details row */}
          <div className="grid gap-px bg-border md:grid-cols-12 mb-px">
            {/* Map */}
            <div className="md:col-span-7 overflow-hidden">
              <div className="border-b border-border bg-navy px-5 py-2.5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                  {t("contact.findUs")}
                </span>
              </div>
              <img src={mapImage} alt="UHO Law Club Location" />
            </div>

            {/* Contact details */}
            <div className="bg-navy p-8 md:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {t("contact.address")}
                  </div>
                  <div className="mt-2 font-serif text-lg text-paper leading-snug">
                    UHO Law Club · <br />
                    Near Bundelkhand University, Jhansi
                    <br />
                    Uttar Pradesh, India
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {t("contact.hours")}
                  </div>
                  <div className="mt-2 font-serif text-lg text-paper">
                    {t("contact.hoursValue")}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{t("contact.bail")}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {t("contact.directLine")}
                  </div>
                  <a
                    href="tel:+919532660984"
                    className="mt-2 block font-serif text-lg text-paper hover:text-gold"
                  >
                    +91 9532660984
                  </a>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {t("contact.emailLabel")}
                  </div>
                  <a
                    href="mailto:uholawclub@gmail.com"
                    className="mt-2 block text-sm text-paper/80 hover:text-gold break-all"
                  >
                    uholawclub@gmail.com
                  </a>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-2 bg-paper px-5 py-2.5 text-sm text-navy hover:bg-gold"
                >
                  {t("contact.bookConsultation")}
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-paper/30 px-5 py-2.5 text-sm text-paper hover:bg-paper/5"
                >
                  {t("contact.fullContactPage")}
                </Link>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
