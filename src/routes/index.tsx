import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import portraitAsset from "../assets/portrait-robes.jpeg.asset.json";
import portraitFullAsset from "../assets/portrait-full.jpeg.asset.json";
import tree from "../assets/tree.jpg";
import logoAsset from "../assets/logo-uho.jpeg.asset.json";
import advocateImg from "../assets/WhatsApp Image 2026-07-29 at 19.28.21 (2).jpeg";
import advocateImg2 from "../assets/WhatsApp Image 2026-07-29 at 19.28.22.jpeg"
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Advocate Avinash Pathak — Chambers in Jhansi" },
      { name: "description", content: "Counsel with conviction. Advocacy with conscience. Practice before the Supreme Court of India and High Courts from Jhansi." },
      { property: "og:title", content: "Advocate Avinash Pathak" },
      { property: "og:description", content: "Counsel with conviction. Advocacy with conscience." },
    ],
  }),
  component: Index,
});

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.12, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <div className="grid gap-px bg-border md:grid-cols-12">
      <div className="bg-navy p-8 md:col-span-4 flex flex-col justify-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Write In</p>
        <h3 className="mt-3 font-serif text-2xl text-paper">Send us a message.</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Describe your matter in plain language. No legal jargon needed — we reply within one working day.
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
          Your message is confidential and not shared with third parties.
        </p>
      </div>
      <div className="bg-midnight p-8 md:col-span-8">
        {sent ? (
          <div className="flex h-full flex-col justify-center py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Received</div>
            <h4 className="mt-3 font-serif text-2xl text-paper">Thank you — we have your message.</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              The chambers will respond within one working day. For urgent matters (bail, custody), call <a href="tel:+919305770340" className="text-paper hover:text-gold">+91 93057 70340</a> directly.
            </p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Your name" name="name" required />
              <FormField label="Email" name="email" type="email" required />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Phone / WhatsApp" name="phone" type="tel" />
              <FormField label="Country" name="country" placeholder="e.g. India, UK, UAE" />
            </div>
            <FormField label="Subject" name="subject" />
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Your message</label>
              <textarea
                name="message"
                rows={4}
                required
                className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                placeholder="Tell us about your matter in plain language…"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-fit items-center gap-2 bg-paper px-6 py-3 text-sm text-navy hover:bg-gold transition-colors"
            >
              Send message →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function FormField({
  label, name, type = "text", required = false, placeholder = "",
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper placeholder:text-muted-foreground focus:border-gold focus:outline-none"
      />
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-l border-border pl-4">
      <div className="font-serif text-3xl text-paper">{n}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
    </div>
  );
}

const AREAS = [
  { n: "01", title: "Criminal Defence", desc: "Bail, trial and appellate representation in criminal matters across sessions and superior courts." },
  { n: "02", title: "Corporate & Commercial", desc: "Advisory and contentious work for founders, family businesses and industry across Bundelkhand." },
  { n: "03", title: "Constitutional & Rights", desc: "Writ petitions, PILs and human-rights matters before High Courts and the Supreme Court." },
  { n: "04", title: "Advisory & Retainer", desc: "Standing counsel arrangements for institutions, trusts and non-profit organizations." },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-20 pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-24">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
              Advocate · Supreme Court & High Courts
            </p>
            <h1 className="mt-6 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight text-paper">
              Counsel with conviction.<br />
              <em className="text-gold/90">Advocacy</em> with conscience.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/75">
              Chambers of <span className="text-paper">Adv. Avinash Pathak</span> — eight years at the bar, thirteen years at the writing desk. Based in Jhansi; appearing before the Supreme Court and High Courts. <span className="text-paper">Online consultations available worldwide.</span>
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/appointment"
                className="group inline-flex items-center gap-3 bg-paper px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-gold"
              >
                Book a consultation
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/practice"
                className="inline-flex items-center gap-2 border-b border-paper/40 pb-1 text-sm text-paper/80 transition-colors hover:border-paper hover:text-paper"
              >
                View the practice
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <Stat n="8+" label="Yrs at the bar" />
              <Stat n="19+" label="Books authored" />
              <Stat n="46" label="Districts covered" />
              <Stat n="2020" label="UHO founded" />
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative">
              <div className="absolute -inset-4 border border-border hidden sm:block" aria-hidden />
              <img
                src={advocateImg}
                alt="Advocate Avinash Pathak"
                width={1024}
                height={1280}
                className="relative w-full grayscale-[.15] contrast-[1.05] max-h-[70vh] object-cover object-top lg:max-h-none"
              />
              <div className="absolute -bottom-4 -left-0 sm:-bottom-6 sm:-left-6 bg-navy px-4 py-3 border border-border">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">In Chambers</div>
                <div className="mt-1 font-serif text-base sm:text-lg text-paper">Avinash Pathak</div>
                <div className="font-mono text-[10px] text-gold">Advocate · Writer · Founder, UHO</div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials strip */}
        <div className="border-y border-border">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-3 px-6 py-5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>Supreme Court of India</span>
            <span className="text-steel">·</span>
            <span>Allahabad High Court</span>
            <span className="text-steel">·</span>
            <span>District Court Jhansi</span>
            <span className="text-steel">·</span>
            <span>Bar Council of U.P.</span>
            <span className="text-steel">·</span>
            <span>UHO Law Club Asia</span>
            <span className="text-steel">·</span>
            <span className="text-gold">Online · Worldwide</span>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-8 border-b border-border pb-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Practice</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">Areas of counsel</h2>
          </div>
          <Link to="/practice" className="hidden md:inline-flex items-center gap-2 text-sm text-paper/70 hover:text-paper">
            All practice areas →
          </Link>
        </div>
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map(a => (
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
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* UHO HISTORY — animated chapters */}
      <section className="border-y border-border bg-midnight overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">

          {/* Header */}
          <FadeIn className="mb-14 border-b border-border pb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">History</p>
            <h2 className="mt-3 font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-paper">
              The United Human Organization.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/65">
              From a single legal practice in Jhansi to a global network of advocacy, law and
              environmental action — the story of UHO is the story of one conviction held long
              enough to become a movement.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 border-b border-paper/40 pb-1 text-sm text-paper/70 hover:text-paper hover:border-paper"
            >
              Read the full history →
            </Link>
          </FadeIn>

          {/* Chapters */}
          <div className="space-y-px">
            {[
              {
                n: "01",
                title: "Foundation",
                period: "2020",
                left: "The United Human Organization was founded in 2020 by Advocate Avinash Pathak with a single, uncompromising vision: to unite humanity through the instruments of law, peace, and sustainability.",
                right: "Where most legal organizations are defined by their practice areas, UHO was conceived as something broader — a platform where jurisprudence meets civic responsibility, and where every legal act carries a social consequence. The founding tagline captures it simply:",
                quote: "\u201cWe the Human of Earth.\u201d",
              },
              {
                n: "02",
                title: "Early Years",
                period: "2017 – 2020",
                left: "During his years at ALS, Avinash Pathak was simultaneously advising over 119 brands across sectors — an extraordinary volume of commercial legal work that forged a global legal perspective early.",
                right: "Parallel to the legal work, thirteen years of continuous authorship produced nineteen books spanning ecology, jurisprudence, history and civic philosophy — not separate from the law, but the long form of the same argument.",
                quote: null,
              },
              {
                n: "03",
                title: "UHO Law Club",
                period: "2020 – 2023",
                left: "The UHO Law Club was formally established — a legal network designed to make quality counsel accessible beyond traditional fee structures. Chambers opened in Jhansi, expanding to five offices worldwide by 2023.",
                right: "A signature feature from the start: the UHO Card, granting members access to legal consultation at a community rate. Practice grew from District Court Jhansi to the Allahabad High Court and the Supreme Court of India.",
                quote: null,
              },
              {
                n: "04",
                title: "Global Advocacy",
                period: "2020 – Present",
                left: "UHO Mission 8 Billion asks every person to plant a tree on their birthday. The Great Aryan Dream and World Peace Treaty 2023 propose a framework for international civic reconciliation.",
                right: "Green Bharat Great Bharat combines tree planting, river clean-up advocacy, and civic education — rooted in Bundelkhand but reaching across India's districts and beyond.",
                quote: null,
              },
            ].map((ch, i) => (
              <FadeIn key={ch.n} delay={i * 80} className="grid gap-px bg-border md:grid-cols-12">
                <div className="bg-midnight p-8 md:p-10 md:col-span-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Chapter {ch.n}</div>
                  <div className="mt-4 font-serif text-2xl text-paper leading-snug">{ch.title}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{ch.period}</div>
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
          <FadeIn delay={320} className="mt-px bg-navy border border-border/60 px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-gold shrink-0" />
              <p className="font-serif text-xl text-paper italic">"We the Human of Earth."</p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground shrink-0">
              UHO · Est. 2020 · Jhansi, India
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PHILOSOPHY / PULL QUOTE */}
      <section className="paper-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={advocateImg2} alt="Advocate Avinash Pathak outside the court" width={1280} height={1920} loading="lazy" className="w-full object-cover" />
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-steel">The Chambers</p>
            <blockquote className="mt-6 font-serif text-3xl leading-[1.25] md:text-4xl text-navy">
              "Law is not a profession I chose to earn from. It is an instrument — used well, it protects the smallest voice; used badly, it silences the loudest. My chambers exist for the former."
            </blockquote>
            <div className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-midnight">— Avinash Pathak</div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/about" className="inline-flex items-center gap-3 bg-navy px-6 py-3 text-sm text-paper hover:bg-midnight">
                Read the biography →
              </Link>
              <Link to="/books" className="inline-flex items-center gap-2 border-b border-navy/40 pb-1 text-sm text-navy hover:border-navy">
                Explore the writings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INITIATIVES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Beyond the courtroom</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">
              A practice that plants trees, publishes books, and organises Saturdays.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              The United Human Organization is the civic arm of these chambers — running <em>Green Bharat Great Bharat</em>, the <em>Saturday for Society</em> movement, and the <em>Pathak Temple Martial Arts Monastery</em>. Advocacy, in its widest sense.
            </p>
            <Link to="/initiatives" className="mt-8 inline-flex items-center gap-2 border-b border-paper/40 pb-1 text-sm hover:border-paper">
              Read the initiatives →
            </Link>
          </div>
          <div className="relative">
            <img src={tree} alt="Plant a tree on your birthday" width={1200} height={900} loading="lazy" className="w-full grayscale-[.2]" />
            <div className="absolute bottom-4 left-4 bg-navy/90 px-4 py-3 border border-border">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Movement</div>
              <div className="mt-1 font-serif text-lg text-paper">Plant a tree on your birthday</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT + MAP + FORM */}
      <section className="border-t border-border bg-midnight">
        <div className="mx-auto max-w-7xl px-6 py-20">

          {/* Section header */}
          <div className="mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">Get in Touch</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">Visit, write, or call.</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              UHO Law Club, near Bundelkhand University, Jhansi. In-person and online consultations available — clients welcome from anywhere in the world.
            </p>
          </div>

          {/* Map + details row */}
          <div className="grid gap-px bg-border md:grid-cols-12 mb-px">
            {/* Map */}
            <div className="md:col-span-7 overflow-hidden">
              <div className="border-b border-border bg-navy px-5 py-2.5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Find Us · Jhansi, UP</span>
                <a
                  href="https://www.google.com/maps/search/Bundelkhand+University,+Jhansi"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50 hover:text-gold"
                >
                  Open in Maps →
                </a>
              </div>
              <iframe
                title="UHO Law Club — near Bundelkhand University, Jhansi"
                src="https://maps.google.com/maps?q=Bundelkhand+University+Jhansi+Uttar+Pradesh+India&z=15&output=embed"
                width="100%"
                height="340"
                className="block w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Contact details */}
            <div className="bg-navy p-8 md:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Address</div>
                  <div className="mt-2 font-serif text-lg text-paper leading-snug">
                    UHO Law Club · The UHO House<br />
                    Near Bundelkhand University, Jhansi<br />
                    Uttar Pradesh, India
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Hours</div>
                  <div className="mt-2 font-serif text-lg text-paper">Mon – Sat · 10:00 – 16:00</div>
                  <div className="mt-1 text-xs text-muted-foreground">Bail matters 15:00 – 16:00</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Direct line</div>
                  <a href="tel:+919305770340" className="mt-2 block font-serif text-lg text-paper hover:text-gold">+91 93057 70340</a>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Email</div>
                  <a href="mailto:advocateavinashpathak@gmail.com" className="mt-2 block text-sm text-paper/80 hover:text-gold break-all">advocateavinashpathak@gmail.com</a>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/appointment" className="inline-flex items-center gap-2 bg-paper px-5 py-2.5 text-sm text-navy hover:bg-gold">
                  Book consultation →
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 border border-paper/30 px-5 py-2.5 text-sm text-paper hover:bg-paper/5">
                  Full contact page
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
