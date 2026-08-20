import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books & Legal Writings | Adv. Avinash Pathak – UHO Law Club" },
      {
        name: "description",
        content:
          "Explore 19 books authored by Advocate Avinash Pathak of UHO Law Club (uholawclub) covering ecology, jurisprudence, civic philosophy, and law.",
      },
      {
        property: "og:title",
        content: "Books & Legal Writings | Adv. Avinash Pathak – UHO Law Club",
      },
      {
        property: "og:description",
        content:
          "Bibliography of Avinash Pathak — 19 books across legal jurisprudence and civic philosophy.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://uholawclub.com/books" },
    ],
    links: [{ rel: "canonical", href: "https://uholawclub.com/books" }],
  }),
  component: Books,
});

const BOOKS = [
  {
    title: "The Great Aryan Dream",
    year: "2012",
    tag: "Manifesto",
    desc: "The founding text — a young writer's argument for a civilization that measures itself by its trees, not its towers.",
  },
  {
    title: "World Peace Treaty",
    year: "2013",
    tag: "Political thought",
    desc: "A treaty imagined at nineteen, still under revision — a working document on inter-civilizational trust.",
  },
  {
    title: "Green Bharat, Great Bharat",
    year: "2015",
    tag: "Ecology",
    desc: "The book that started the birthday-tree movement — one sapling for each year lived.",
  },
  {
    title: "Saturday for Society",
    year: "2017",
    tag: "Civics",
    desc: "A weekly discipline of citizenship — arguments for why Saturdays should belong to the neighbourhood.",
  },
  {
    title: "The Human of Earth",
    year: "2018",
    tag: "Philosophy",
    desc: "The founding thesis of the United Human Organization — a species that is native to a planet.",
  },
  {
    title: "Law for the Small Voice",
    year: "2019",
    tag: "Jurisprudence",
    desc: "How Indian constitutional law reads when you begin with the person, not the state.",
  },
  {
    title: "The Bundelkhand Notebooks",
    year: "2020",
    tag: "Essays",
    desc: "A regional history in fragments — the courts, the water table, the poets.",
  },
  {
    title: "Corporate Conscience",
    year: "2020",
    tag: "Commercial law",
    desc: "A field-guide for founders on the ethical edges of company-building in India.",
  },
  {
    title: "Notes on Article 226",
    year: "2021",
    tag: "Practice",
    desc: "Working annotations on writ jurisdiction, drawn from live High Court practice.",
  },
  {
    title: "Pathak Temple",
    year: "2021",
    tag: "Memoir",
    desc: "The martial-arts monastery that gave the surname its second meaning.",
  },
  {
    title: "Rights of the River",
    year: "2022",
    tag: "Environmental law",
    desc: "On the legal personhood of rivers — case studies and drafting notes.",
  },
  {
    title: "The Sanjeevani Letters",
    year: "2022",
    tag: "Correspondence",
    desc: "Letters to a young doctor, on why medicine and law share a first duty.",
  },
  {
    title: "Advocacy with Conscience",
    year: "2023",
    tag: "Vocation",
    desc: "The chambers' own working manual — kept on the desk, not on the shelf.",
  },
  {
    title: "The Constitution as a Neighbour",
    year: "2023",
    tag: "Civics",
    desc: "The book Avinash reads with clients before their first hearing.",
  },
  {
    title: "Small Court, Great Republic",
    year: "2024",
    tag: "History",
    desc: "The district-court system as India's largest working democracy.",
  },
  {
    title: "Founder / Litigant",
    year: "2024",
    tag: "Commercial",
    desc: "A dual biography of a founder who becomes a litigant — and back again.",
  },
  {
    title: "Writer to Live for Earth",
    year: "2025",
    tag: "Essays",
    desc: "The tagline in long form — twenty-two essays on writing as citizenship.",
  },
  {
    title: "Saturday, Continued",
    year: "2025",
    tag: "Civics",
    desc: "Ten years of the Saturday for Society movement, reviewed.",
  },
  {
    title: "The Aryan Dream, Revised",
    year: "2026",
    tag: "Manifesto",
    desc: "The 2012 text, re-argued at thirty — the second edition of a lifelong argument.",
  },
];

const PALETTES = [
  ["#0f1b3d", "#c9a84c"],
  ["#1e3a5f", "#e8edf3"],
  ["#3b6fa0", "#0f1b3d"],
  ["#c9a84c", "#0f1b3d"],
];

function Cover({ title, i }: { title: string; i: number }) {
  const [bg, ink] = PALETTES[i % PALETTES.length];
  return (
    <div className="relative aspect-[3/4] overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-3 border" style={{ borderColor: `${ink}55` }} />
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div
          className="font-mono text-[9px] uppercase tracking-[0.3em]"
          style={{ color: `${ink}cc` }}
        >
          UHO · Vol {String(i + 1).padStart(2, "0")}
        </div>
        <div>
          <div className="font-serif text-lg leading-[1.15]" style={{ color: ink }}>
            {title}
          </div>
          <div className="mt-3 h-px w-8" style={{ background: `${ink}88` }} />
          <div className="mt-2 font-mono text-[10px]" style={{ color: `${ink}aa` }}>
            Avinash Pathak
          </div>
        </div>
      </div>
    </div>
  );
}

function Books() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">Writings</p>
        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] text-paper">
          <em className="text-gold/90">Writer</em> to live for Earth.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75">
          Nineteen books over thirteen years — ecology, jurisprudence, memoir, and manifesto. A
          running library kept beside the working chambers.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {BOOKS.map((b, i) => (
            <article key={b.title} className="group">
              <Cover title={b.title} i={i} />
              <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                <span>{b.year}</span>
                <span className="h-px flex-1 bg-border" />
                <span className="text-muted-foreground">{b.tag}</span>
              </div>
              <h3 className="mt-3 font-serif text-lg text-paper">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
