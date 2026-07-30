import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Advocate Avinash Pathak" },
      { name: "description", content: "Schedule a consultation at the chambers of Advocate Avinash Pathak. Legal consultation, UHO card holder sessions, and writer engagements." },
      { property: "og:title", content: "Book a Consultation" },
      { property: "og:description", content: "Three ways to work with the chambers." },
    ],
  }),
  component: Appointment,
});

const TIERS = [
  {
    label: "UHO Card Holder",
    inr: "₹844",
    usd: "US$ 10",
    per: "per session",
    body: "Reserved for verified UHO Card Holders — the community rate. Ideal for members of partner societies and Green Bharat volunteers.",
    features: ["30-minute session", "Follow-up email note", "Community priority", "Available Mon – Sat"],
    accent: false,
  },
  {
    label: "Legal Consultation",
    inr: "₹11,000",
    usd: "US$ 134",
    per: "per matter",
    body: "The standard consultation for a new matter. A one-hour working session with Avinash, a written note, and a clear recommendation on next steps.",
    features: ["60-minute session with counsel", "Written opinion / note", "Document review (up to 30 pp.)", "One follow-up call included"],
    accent: true,
  },
  {
    label: "As Writer",
    inr: "₹1,00,000",
    usd: "US$ 1,220",
    per: "per engagement",
    body: "Engage Avinash as a writer — commissioned essays, forewords, or long-form advisory pieces for institutions, publications and campaigns.",
    features: ["Commissioned essay or paper", "Two editorial rounds", "Publication rights negotiated", "3 – 5 week turnaround"],
    accent: false,
  },
];

function Appointment() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">Appointment</p>
        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] text-paper">
          Three ways to walk into these chambers.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75">
          Pick the format that fits your matter. Consultations are available <span className="text-paper">in-person in Jhansi</span> or <span className="text-paper">online via video call</span> — clients are welcome from anywhere in the world.
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

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-px bg-border md:grid-cols-3">
          {TIERS.map(t => (
            <article key={t.label} className={`p-8 md:p-10 ${t.accent ? "bg-paper text-navy" : "bg-navy text-paper"}`}>
              <div className={`font-mono text-[10px] uppercase tracking-[0.28em] ${t.accent ? "text-steel" : "text-gold"}`}>{t.label}</div>
              <div className="mt-6 flex items-baseline gap-3">
                <div className="font-serif text-5xl">{t.inr}</div>
                <div className={`font-mono text-xs ${t.accent ? "text-navy/60" : "text-muted-foreground"}`}>/ {t.usd}</div>
              </div>
              <div className={`mt-1 font-mono text-[10px] uppercase tracking-[0.2em] ${t.accent ? "text-navy/60" : "text-muted-foreground"}`}>{t.per}</div>
              <p className={`mt-6 text-sm leading-relaxed ${t.accent ? "text-navy/80" : "text-paper/80"}`}>{t.body}</p>
              <ul className={`mt-6 space-y-2 text-sm ${t.accent ? "text-navy/85" : "text-paper/85"}`}>
                {t.features.map(f => (
                  <li key={f} className="flex gap-3">
                    <span className={t.accent ? "text-steel" : "text-gold"}>—</span>{f}
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

      {/* FORM */}
      <section id="book" className="border-t border-border bg-midnight">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Book</p>
            <h2 className="mt-3 font-serif text-4xl text-paper">A short note is enough to start.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              You do not need a lawyer to write like a lawyer. Tell us in plain language what has happened, or what you are considering. We reply within one working day.
            </p>
            <div className="mt-10 space-y-4 text-sm">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Direct line</div>
                <a href="tel:+919305770340" className="mt-1 block font-serif text-lg text-paper hover:text-gold">+91 93057 70340</a>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Email</div>
                <a href="mailto:advocateavinashpathak@gmail.com" className="mt-1 block text-paper/85 hover:text-gold break-words">advocateavinashpathak@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            {sent ? (
              <div className="border border-gold/50 bg-navy p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Received</div>
                <h3 className="mt-4 font-serif text-2xl text-paper">Thank you — we have your note.</h3>
                <p className="mt-3 text-sm text-muted-foreground">The chambers will respond within one working day at the email address you shared. For urgent matters (bail, custody), call the direct line above.</p>
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setSent(true); }}
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
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Mode of consultation</label>
                  <select name="mode" className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none">
                    <option>Online — video call (Zoom / Google Meet)</option>
                    <option>In-person — Jhansi chambers</option>
                    <option>Phone call</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Country / Time zone</label>
                  <input name="country" type="text" placeholder="e.g. United Kingdom · GMT+1" className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper placeholder:text-muted-foreground focus:border-gold focus:outline-none" />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Type of engagement</label>
                  <select name="tier" className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none">
                    <option>Legal consultation — ₹11,000</option>
                    <option>UHO Card Holder — ₹844</option>
                    <option>Writer engagement — ₹1,00,000</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">A brief note about your matter</label>
                  <textarea name="note" rows={5} required className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none" />
                </div>
                <button type="submit" className="mt-2 inline-flex items-center justify-center bg-paper px-6 py-3 text-sm text-navy hover:bg-gold">
                  Send request →
                </button>
                <p className="text-[11px] text-muted-foreground">Your note is confidential and not shared with third parties.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</label>
      <input name={name} type={type} required={required} className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper placeholder:text-muted-foreground focus:border-gold focus:outline-none" />
    </div>
  );
}
