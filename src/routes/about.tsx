import { createFileRoute, Link } from "@tanstack/react-router";
import portraitAsset from "../assets/portrait-buttoning.jpeg.asset.json";
import library from "../assets/library.jpg";
import advocateImg3 from "../assets/WhatsApp Image 2026-07-29 at 19.28.20 (3).jpeg"

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Advocate Avinash Pathak" },
      { name: "description", content: "The biography, philosophy and milestones of Adv. Avinash Pathak — advocate, writer and founder of the United Human Organization." },
      { property: "og:title", content: "About Advocate Avinash Pathak" },
      { property: "og:description", content: "Advocate, writer, and founder of the UHO Law Club." },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { year: "1997", title: "Born in Bundelkhand", body: "Roots in Lalitpur, Uttar Pradesh — a childhood shaped by the region's history and its unresolved questions." },
  { year: "2017 – 2020", title: "Corporate Law at ALS", body: "Formal legal training. Concurrent work with 119+ brands during college — a foundation in commercial practice." },
  { year: "2020 – 2023", title: "Founded UHO Law Club", body: "Established chambers in Jhansi. First matters before the District Court and Allahabad High Court." },
  { year: "2023 – Now", title: "Supreme Court practice", body: "Regular appearances before the Supreme Court of India. Standing counsel for United Human Organization." },
];

function About() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">Biography</p>
        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] text-paper">
          A lawyer who writes. A writer who litigates.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75">
          Avinash Pathak's practice sits at an uncommon intersection — the disciplined patience of writing books, and the immediate consequence of standing before a judge.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src={advocateImg3} alt="Avinash Pathak" width={686} height={1024} loading="lazy" className="w-full" />
          <div className="mt-6 border-l border-gold pl-4">
            <p className="font-devanagari text-2xl leading-tight text-paper">
              कार्यालय अविनाश पाठक — लेखक व अधिवक्ता
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Office of Avinash Pathak — Writer & Advocate
            </p>
          </div>
        </div>
        <div className="md:col-span-7 space-y-8 text-base leading-[1.8] text-paper/85">
          <p>
            The chambers were formally established in 2020, but the work began much earlier. Through law school at ALS, Avinash was already consulting for over a hundred brands — an unusual apprenticeship that grounded him in the practical business of commercial law before he had a bar card.
          </p>
          <p>
            In parallel, another discipline: writing. Thirteen years of it. Nineteen published books on ecology, jurisprudence, history and civic thought. The tagline he keeps on his desk — <em>Writer to live for Earth</em> — is not a slogan; it is a working thesis.
          </p>
          <p>
            Today the practice covers criminal defence, corporate advisory, constitutional matters and human-rights litigation. He appears regularly before the Allahabad High Court and the Supreme Court of India, while continuing to run the office in Jhansi personally — no gatekeepers, no long chains between counsel and client.
          </p>
          <p>
            The founding conviction has not changed: <span className="text-paper">a lawyer's first client is the constitution</span>. Everything downstream — commercial retainers, criminal defence, PILs — flows from that.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-y border-border bg-midnight">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Milestones</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">The record so far.</h2>
          <div className="mt-14 grid gap-px bg-border md:grid-cols-4">
            {TIMELINE.map(t => (
              <div key={t.year} className="bg-midnight p-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{t.year}</div>
                <div className="mt-4 font-serif text-xl text-paper">{t.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UHO HISTORY */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="border-b border-border pb-8 mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">History</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl text-paper">The United Human Organization.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">
            From a single legal practice in Jhansi to a global network of advocacy, law and environmental action —
            the story of UHO is the story of one conviction held long enough to become a movement.
          </p>
        </div>

        {/* Chapter 01 — Foundation */}
        <div className="grid gap-px bg-border md:grid-cols-12 mb-px">
          <div className="bg-navy p-8 md:p-10 md:col-span-3 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Chapter 01</div>
              <div className="mt-4 font-serif text-2xl text-paper leading-snug">Foundation</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">2020</div>
            </div>
            <div className="mt-10 h-px bg-border" />
          </div>
          <div className="bg-midnight p-8 md:p-10 md:col-span-9 space-y-4 text-base leading-[1.85] text-paper/80">
            <p>
              The United Human Organization was founded in <span className="text-paper font-medium">2020</span> by
              Advocate Avinash Pathak with a single, uncompromising vision: to unite humanity through
              the instruments of <span className="text-paper">law, peace, and sustainability</span>.
            </p>
            <p>
              Where most legal organizations are defined by their practice areas, UHO was conceived as
              something broader — a platform where jurisprudence meets civic responsibility, and where
              every legal act carries a social consequence. The founding tagline captures it simply:
            </p>
            <blockquote className="border-l-2 border-gold pl-5 font-serif text-xl text-paper italic leading-relaxed">
              "We the Human of Earth."
            </blockquote>
            <p>
              This was not a motto chosen for aesthetics. It is a legal and philosophical position —
              that the ultimate client of any honest advocate is humanity itself.
            </p>
          </div>
        </div>

        {/* Chapter 02 — Early Years */}
        <div className="grid gap-px bg-border md:grid-cols-12 mb-px">
          <div className="bg-navy p-8 md:p-10 md:col-span-3 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Chapter 02</div>
              <div className="mt-4 font-serif text-2xl text-paper leading-snug">Early Years</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">2017 – 2020</div>
            </div>
            <div className="mt-10 h-px bg-border" />
          </div>
          <div className="bg-midnight p-8 md:p-10 md:col-span-9 space-y-4 text-base leading-[1.85] text-paper/80">
            <p>
              Long before the organization took formal shape, its DNA was being written in a law school in
              Allahabad. During his years at <span className="text-paper font-medium">ALS (2017–2020)</span>,
              Avinash Pathak was simultaneously advising over
              <span className="text-paper font-medium"> 119 brands</span> across sectors — an extraordinary
              volume of commercial legal work for a student, and an education that no curriculum provides.
            </p>
            <p>
              That exposure — to founders, to disputes, to the gap between what the law says and what
              clients actually need — forged a <span className="text-paper">global legal perspective</span> early.
              He saw that law was not a national instrument but a universal one; that the same structural
              problems around rights, contracts, and accountability appeared in every market, every culture.
            </p>
            <p>
              Parallel to the legal work, he was writing. Thirteen years of continuous authorship produced
              nineteen books spanning ecology, jurisprudence, history, and civic philosophy. The writing
              was not separate from the law — it was the long form of the same argument.
            </p>
          </div>
        </div>

        {/* Chapter 03 — UHO Law Club */}
        <div className="grid gap-px bg-border md:grid-cols-12 mb-px">
          <div className="bg-navy p-8 md:p-10 md:col-span-3 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Chapter 03</div>
              <div className="mt-4 font-serif text-2xl text-paper leading-snug">UHO Law Club</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">2020 – 2023</div>
            </div>
            <div className="mt-10 h-px bg-border" />
          </div>
          <div className="bg-midnight p-8 md:p-10 md:col-span-9 space-y-4 text-base leading-[1.85] text-paper/80">
            <p>
              In 2020, the <span className="text-paper font-medium">UHO Law Club</span> was formally established —
              a legal network designed to make quality counsel accessible beyond the traditional fee structures
              of elite practice. The founding chambers opened in Jhansi, near Bundelkhand University.
            </p>
            <p>
              Growth was deliberate and principled. By 2023, UHO Law Club had expanded to
              <span className="text-paper font-medium"> five offices worldwide</span>, with an affiliate
              network spanning South Asia and Southeast Asia under the banner of
              <span className="text-paper"> UHO Law Club Asia</span>.
            </p>
            <p>
              A signature feature from the start was the <span className="text-paper font-medium">UHO Card</span> —
              a membership that grants holders access to legal consultation at a community rate
              (₹844 / US$ 10 per session). It was a structural commitment to the idea that legal advice
              should not be a luxury. The practice appeared before the
              <span className="text-paper"> District Court Jhansi</span>,
              <span className="text-paper"> Allahabad High Court</span>, and by 2023 had established a
              regular presence before the <span className="text-paper">Supreme Court of India</span>.
            </p>
          </div>
        </div>

        {/* Chapter 04 — Global Initiatives */}
        <div className="grid gap-px bg-border md:grid-cols-12 mb-px">
          <div className="bg-navy p-8 md:p-10 md:col-span-3 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Chapter 04</div>
              <div className="mt-4 font-serif text-2xl text-paper leading-snug">Global Initiatives</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">2020 – Present</div>
            </div>
            <div className="mt-10 h-px bg-border" />
          </div>
          <div className="bg-midnight p-8 md:p-10 md:col-span-9 space-y-6 text-base leading-[1.85] text-paper/80">
            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">UHO Mission 8 Billion — Plant a Tree on Your Birthday</div>
              <p>
                One tree for every human on Earth. UHO Mission 8 Billion asks every person to plant a
                single tree on their birthday — a campaign of disarming simplicity that has mobilised
                volunteers across India and internationally. The arithmetic is not symbolic: eight billion
                trees planted in a generation is a measurable ecological intervention.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">The Great Aryan Dream — World Peace Treaty 2023</div>
              <p>
                Perhaps UHO's most ambitious initiative, <em className="text-paper">The Great Aryan Dream</em> is
                both a book and a framework for international civic reconciliation. The accompanying
                <span className="text-paper"> World Peace Treaty 2023</span> proposes a model for inter-community
                dialogue and legal recognition of shared human heritage — a document in the tradition of
                peace charters, written for the present moment.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Green Bharat Great Bharat</div>
              <p>
                A domestic environmental movement founded on the principle that ecological restoration and
                national greatness are the same project. <em className="text-paper">Green Bharat Great Bharat</em>
                combines tree planting, river clean-up advocacy, and civic education — rooted in Bundelkhand
                but reaching across India's districts.
              </p>
            </div>
          </div>
        </div>

        {/* Chapter 05 — Present Day */}
        <div className="grid gap-px bg-border md:grid-cols-12">
          <div className="bg-navy p-8 md:p-10 md:col-span-3 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Chapter 05</div>
              <div className="mt-4 font-serif text-2xl text-paper leading-snug">Present Day</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Now</div>
            </div>
            <div className="mt-10 h-px bg-border" />
          </div>
          <div className="bg-midnight p-8 md:p-10 md:col-span-9 space-y-4 text-base leading-[1.85] text-paper/80">
            <p>
              Today, the United Human Organization stands as a
              <span className="text-paper font-medium"> global law and advocacy organization</span> — one of
              the few in India to have fused high-court legal practice with active social and environmental
              campaigns under a single institutional identity.
            </p>
            <p>
              The legal work is serious and ongoing: criminal defence, corporate counsel, constitutional
              litigation, and human-rights matters before India's highest courts. The civic work runs in
              parallel — tree planting, peace frameworks, community Saturdays, martial arts education at
              the Pathak Temple Martial Arts Monastery.
            </p>
            <p>
              None of it is accidental. It is the product of a philosophy that refuses to separate the
              courtroom from the community, or the law from the land. Avinash Pathak continues to lead
              both arms personally — as advocate, as writer, as founder.
            </p>
            <div className="mt-6 border border-gold/40 bg-navy/60 px-6 py-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-3">Founding Motto</p>
              <p className="font-serif text-2xl text-paper leading-snug">
                "We the Human of Earth."
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                United Human Organization · Est. 2020 · Jhansi, India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WRITING */}
      <section className="paper-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-6">
            <img src={library} alt="The library" width={1600} height={1000} loading="lazy" className="w-full" />
          </div>
          <div className="md:col-span-6 flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-steel">The Writer</p>
            <h2 className="mt-3 font-serif text-4xl text-navy">Nineteen books, and still counting.</h2>
            <p className="mt-6 text-base leading-relaxed text-navy/80">
              Avinash's writing runs parallel to his practice — essays, monographs, and public philosophy on ecology, rights, and the future of the Indian civic imagination. The most read among them are the works around <em>The Great Aryan Dream</em> and <em>World Peace Treaty</em>.
            </p>
            <Link to="/books" className="mt-8 inline-flex items-center gap-2 border-b border-navy/40 pb-1 text-sm text-navy hover:border-navy w-fit">
              Browse the writings →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
