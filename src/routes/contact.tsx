import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import payAsset from "../assets/uho-payment-card.jpeg.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Chambers in Jhansi | UHO Law Club – Adv. Avinash Pathak" },
      { name: "description", content: "Contact UHO Law Club (uholawclub) in Jhansi, Uttar Pradesh. Near Bundelkhand University. Phone: +91 9532660984, Email: advocateavinashpathak@gmail.com." },
      { property: "og:title", content: "Contact Chambers in Jhansi | UHO Law Club – Adv. Avinash Pathak" },
      { property: "og:description", content: "Visit UHO Law Club chambers in Jhansi, Uttar Pradesh or write in to consult Adv. Avinash Pathak." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://uholawclub.com/contact" },
    ],
    links: [
      { rel: "canonical", href: "https://uholawclub.com/contact" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">Contact</p>
        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] text-paper">
          The chambers are open.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75">
          Visit us in Jhansi, write to the office, or reach out on social. First responses within one working day.
        </p>
      </section>

      {/* MAP */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="overflow-hidden border border-border">
          <div className="border-b border-border bg-midnight px-6 py-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Find Us · Jhansi, Uttar Pradesh</span>
            <a
              href="https://www.google.com/maps/search/Bundelkhand+University,+Jhansi,+Uttar+Pradesh"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50 hover:text-gold"
            >
              Open in Google Maps →
            </a>
          </div>
          <iframe
            title="UHO Law Club location — near Bundelkhand University, Jhansi"
            src="https://maps.google.com/maps?q=Bundelkhand+University+Jhansi+Uttar+Pradesh+India&z=15&output=embed"
            width="100%"
            height="380"
            className="block w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-px bg-border md:grid-cols-12">
          <div className="bg-navy p-8 md:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Office</div>
            <div className="mt-4 font-serif text-2xl text-paper leading-tight">
              UHO Law Club<br />
               · Jhansi
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Near Bundelkhand University, close to Sanjeevani ICU and Maa Kamakhya Seva, Jhansi, Uttar Pradesh.
            </p>
            <div className="mt-10 space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Hours</div>
                <div className="mt-2 font-serif text-lg text-paper">Monday – Saturday · 10:00 – 16:00</div>
                <div className="mt-1 text-xs text-muted-foreground">Bail matters 15:00 – 16:00 · Saturdays reserved for community</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Direct line</div>
                <a href="tel:+919305770340" className="mt-2 block font-serif text-lg text-paper hover:text-gold">+91 9532660984</a>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Email</div>
                <a href="mailto:advocateavinashpathak@gmail.com" className="mt-2 block text-paper hover:text-gold break-words">advocateavinashpathak@gmail.com</a>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">On the record</div>
                <div className="mt-2 flex flex-wrap gap-4 text-sm">
                  <a href="https://twitter.com/theUHOHouse" target="_blank" rel="noreferrer" className="text-paper hover:text-gold">X · @theUHOHouse</a>
                  <a href="https://instagram.com/theuhohouse" target="_blank" rel="noreferrer" className="text-paper hover:text-gold">Instagram · @theuhohouse</a>
                  <a href="https://advocateavinashpathak.blogspot.com" target="_blank" rel="noreferrer" className="text-paper hover:text-gold">Blog</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-midnight p-8 md:col-span-7">
            {sent ? (
              <div className="flex h-full flex-col justify-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Received</div>
                <h2 className="mt-3 font-serif text-3xl text-paper">Thank you.</h2>
                <p className="mt-3 max-w-md text-sm text-muted-foreground">The chambers have your message. Expect a reply within one working day.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="grid gap-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Write in</div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input name="name" label="Name" required />
                  <Input name="email" label="Email" type="email" required />
                </div>
                <Input name="subject" label="Subject" />
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Message</label>
                  <textarea rows={6} required className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none" />
                </div>
                <button type="submit" className="inline-flex w-fit items-center bg-paper px-6 py-3 text-sm text-navy hover:bg-gold">Send message →</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* PAYMENT */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="border border-border">
          <div className="border-b border-border bg-midnight px-6 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Fees &amp; Payment · Save paper, pay online</span>
          </div>
          <div className="grid gap-px bg-border md:grid-cols-12">
            <div className="bg-paper p-6 md:col-span-7">
              <img src={payAsset.url} alt="UHO Law Club payment details — UPI uholawclub@sbi, SBI account 444 3494 5545, IFSC SBIN0000102" width={1280} height={1024} loading="lazy" className="w-full" />
            </div>
            <div className="bg-navy p-8 md:col-span-5 flex flex-col justify-center space-y-4 text-sm">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">UPI</div>
                <div className="mt-1 font-serif text-lg text-paper">uholawclub@sbi</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Bank</div>
                <div className="mt-1 text-paper">State Bank of India · A/C 444 3494 5545 · IFSC SBIN0000102</div>
              </div>
              <p className="text-xs text-muted-foreground">Please share the transaction reference with the office after payment.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Input({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</label>
      <input name={name} type={type} required={required} className="mt-2 w-full border border-border bg-navy px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none" />
    </div>
  );
}
