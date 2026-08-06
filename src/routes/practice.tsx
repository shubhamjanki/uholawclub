import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice Areas & Legal Counsel in Jhansi | UHO Law Club – Adv. Avinash Pathak" },
      { name: "description", content: "Comprehensive practice areas in Jhansi: criminal defence, bail matters, corporate & commercial advisory, constitutional writs before Allahabad High Court & Supreme Court." },
      { property: "og:title", content: "Practice Areas & Legal Counsel in Jhansi | UHO Law Club – Adv. Avinash Pathak" },
      { property: "og:description", content: "Criminal defence, corporate contracts, constitutional rights, and legal retainer services in Jhansi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://uholawclub.com/practice" },
    ],
    links: [
      { rel: "canonical", href: "https://uholawclub.com/practice" },
    ],
  }),
  component: Practice,
});

const AREAS = [
  {
    n: "01", title: "Criminal Defence",
    body: "Representation from investigation through appellate stages. Bail applications, sessions trials, and appeals before the High Court and Supreme Court. Particular experience in matters concerning economic offences, IPC/BNS cases, and matters where personal liberty is under threat.",
    matters: ["Bail — anticipatory & regular", "Sessions trial", "Criminal revisions & appeals", "Quashing under 482 CrPC / 528 BNSS", "Economic offences (PMLA / IPC)"],
    courts: ["District Court Jhansi", "Allahabad High Court", "Supreme Court of India"],
  },
  {
    n: "02", title: "Corporate & Commercial",
    body: "Advisory-first commercial practice built during years of consulting for over a hundred brands during college and after. The chambers handle everything from founder documentation to inter-party dispute resolution — with a preference for clean drafting over litigation where possible.",
    matters: ["Founder & shareholder agreements", "Commercial contracts", "Arbitration & mediation", "Company law compliance", "Cheque bounce / NI Act"],
    courts: ["Commercial Courts", "NCLT (Allahabad Bench)", "Arbitral tribunals"],
  },
  {
    n: "03", title: "Constitutional & Human Rights",
    body: "Writ petitions, public interest litigation, and human-rights matters filed as part of the UHO Law Club's civic mandate. The practice regularly represents individuals and non-profits pro bono where fundamental rights are at stake.",
    matters: ["Article 226 writs", "Public Interest Litigation", "Fundamental rights matters", "SC/ST & minority rights", "Environmental litigation"],
    courts: ["Allahabad High Court", "Supreme Court of India"],
  },
  {
    n: "04", title: "Advisory & Retainer",
    body: "Standing-counsel arrangements for institutions, trusts, non-profits and family businesses. Monthly retainer covers document review, negotiation support, and priority access to the chambers. Available in English and Hindi.",
    matters: ["Monthly retainer", "Trust & society governance", "Employment & HR policy", "Compliance advisory", "Second opinions"],
    courts: ["All courts & tribunals as required"],
  },
];

function Practice() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">Practice</p>
        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] text-paper">
          Four rooms in one chambers.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75">
          The practice is deliberately broad. A single lawyer, held to a single standard of preparation, across matters where that standard matters most.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="space-y-px bg-border">
          {AREAS.map(a => (
            <article key={a.n} className="grid gap-8 bg-navy p-8 md:grid-cols-12 md:p-12">
              <div className="md:col-span-3">
                <div className="font-mono text-xs text-gold">{a.n}</div>
                <h2 className="mt-4 font-serif text-3xl text-paper">{a.title}</h2>
              </div>
              <div className="md:col-span-6">
                <p className="text-base leading-[1.8] text-paper/85">{a.body}</p>
                <div className="mt-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Typical matters</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-paper/80">
                    {a.matters.map(m => <li key={m} className="flex gap-3"><span className="text-gold">·</span>{m}</li>)}
                  </ul>
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Courts</div>
                <ul className="mt-3 space-y-1.5 text-sm text-paper/80">
                  {a.courts.map(c => <li key={c}>{c}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
          <p className="max-w-xl text-sm text-muted-foreground">
            Not sure which category your matter falls under? Book a fifteen-minute preliminary call — the chambers will tell you honestly whether we're the right room.
          </p>
          <Link to="/appointment" className="inline-flex items-center gap-2 bg-paper px-5 py-2.5 text-sm text-navy hover:bg-gold">Book consultation →</Link>
        </div>
      </section>
    </>
  );
}
