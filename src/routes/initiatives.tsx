import { createFileRoute } from "@tanstack/react-router";
import tree from "../assets/tree.jpg";
import founderAsset from "../assets/portrait-uho-tee.jpeg.asset.json";

export const Route = createFileRoute("/initiatives")({
  head: () => ({
    meta: [
      { title: "Civic Initiatives | UHO Law Club & United Human Organization" },
      { name: "description", content: "Civic and environmental initiatives of Advocate Avinash Pathak and UHO Law Club (uholawclub) — Green Bharat Great Bharat, Mission 8 Billion, and Saturday for Society." },
      { property: "og:title", content: "Civic Initiatives | UHO Law Club & United Human Organization" },
      { property: "og:description", content: "Green Bharat Great Bharat, Saturday for Society, and UHO initiatives beyond the courtroom." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://uholawclub.com/initiatives" },
    ],
    links: [
      { rel: "canonical", href: "https://uholawclub.com/initiatives" },
    ],
  }),
  component: Initiatives,
});

const INITIATIVES = [
  {
    n: "I",
    title: "United Human Organization",
    tagline: "We the Human of Earth",
    body: "The parent organization. A civic body that treats the human being as a species native to a shared planet — and organizes local chapters, legal aid, and public campaigns from that first premise.",
  },
  {
    n: "II",
    title: "Green Bharat, Great Bharat",
    tagline: "Plant a tree on your birthday",
    body: "The simplest movement in the family — every citizen, every birthday, one sapling. In its first years the campaign has already reached hundreds of schools across Bundelkhand.",
  },
  {
    n: "III",
    title: "Saturday for Society",
    tagline: "The weekly discipline of citizenship",
    body: "Every Saturday belongs to the neighbourhood. Legal aid camps, tree-planting drives, book readings — the chambers close and the community opens.",
  },
  {
    n: "IV",
    title: "Pathak Temple Martial Arts Monastery",
    tagline: "Discipline of body, discipline of mind",
    body: "A traditional martial-arts monastery founded alongside the law club — training for youth in the region, free of cost, in the older Indian schools of unarmed practice.",
  },
];

function Initiatives() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">Initiatives</p>
        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] text-paper">
          A chambers that closes on Saturdays — <em className="text-gold/90">because that's when the real work happens.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75">
          Four civic bodies, one shared premise: law is a form of care.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-px bg-border md:grid-cols-2">
          {INITIATIVES.map(i => (
            <article key={i.n} className="bg-navy p-10">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-4xl text-gold">{i.n}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{i.tagline}</span>
              </div>
              <h2 className="mt-4 font-serif text-2xl text-paper">{i.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-paper/80">{i.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* The Great Aryan Dream ethos band */}
      <section className="paper-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={tree} alt="Plant a tree" width={1200} height={900} loading="lazy" className="w-full" />
            <figure className="mt-px bg-navy p-6">
              <img src={founderAsset.url} alt="Avinash Pathak in a United Human Organization shirt" width={1080} height={1080} loading="lazy" className="w-full bg-paper" />
              <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Avinash Pathak · Founder, United Human Organization</figcaption>
            </figure>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-steel">Manifesto · Since 2012</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-navy">The Great Aryan Dream.</h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy/85">
              The founding text of UHO. Written when Avinash was fifteen. Its central argument — that a civilization ought to be measured by its trees, its water, and the smallest voice it protects — remains the chambers' unofficial constitution.
            </p>
            <p className="mt-6 font-devanagari text-2xl leading-tight text-navy">
              विश्व शान्ति संधि — शनिवार समाज के लिए
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
