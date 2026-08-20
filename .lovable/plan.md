# UHO Law Club — Advocate Avinash Pathak

An editorial, authority-forward website for a Supreme Court & High Court advocate based in Jhansi. Not a template-feeling AI site — restrained, human, with real photography and considered typography.

## Design system

- **Palette (Navy Trust)** — bg `#0f1b3d` deep navy, `#1e3a5f` midnight, `#3b6fa0` steel accent, `#e8edf3` paper. Primary surface is dark navy; secondary sections use paper-cream for contrast bands.
- **Typography** — Libre Baskerville for headlines and pull quotes (loaded via `<link>` in `__root.tsx`), IBM Plex Sans for body/UI, IBM Plex Mono sparingly for case-numbers, docket labels, small captions. Devanagari support via Noto Serif Devanagari for the Hindi lines (कार्यालय अविनाश पाठक etc.).
- **Composition rules** — generous line-height, wide max-widths capped at ~72ch for prose, thin 1px hairlines in `#3b6fa0/30`, sharp corners on primary chrome (`--radius: 4px`), tasteful gold-adjacent highlight `#c9a84c` reserved for seals/decorative rules only (not CTAs).
- **Motion** — reserved: fade+rise on section enter, no bouncy springs, no parallax on portraits.
- **Imagery** — generated portrait/office images treated with a subtle duotone (navy/paper) so they read as one system, not stock.

## Routes

```
src/routes/
  __root.tsx           header + footer chrome, font links, meta
  index.tsx            /            home (hero grid)
  about.tsx            /about       biography, philosophy, timeline
  practice.tsx         /practice    practice areas
  books.tsx            /books       19+ authored works
  initiatives.tsx      /initiatives UHO, Green Bharat, Saturday for Society
  appointment.tsx      /appointment tiers + booking form
  contact.tsx          /contact     office info, map block, hours
```

Each route ships its own `head()` with unique title/description/og text.

## Page-by-page

### / (Home — hero grid)

- Slim top bar: UHO seal + "UHO Law Club · Jhansi" + nav (About, Practice, Books, Initiatives, Appointment, Contact) + "Book consultation" outline button.
- **Hero grid** (asymmetric 12-col):
  - Left 7 cols: eyebrow "Advocate · Supreme Court & High Courts", H1 in Libre Baskerville — "Counsel with conviction. Advocacy with conscience." Sub in IBM Plex — one-line positioning referencing 8+ years practice and Bundelkhand roots. Two CTAs: "Book a consultation" (solid paper on navy) + "Read the practice" (ghost).
  - Right 5 cols: portrait card of Avinash Pathak (duotone), small metadata block underneath — Bar reg, years, courts, languages (Hindi/English).
- **Credentials strip** — hairline-bordered row: 8+ yrs practice · 19+ books · Supreme Court · High Courts · UHO Law Club Founder.
- **Practice areas grid** — 4 cards: Criminal, Corporate, Constitutional/Human Rights, Advisory. Each card: small numeral (01–04), title, one-line, "Explore →".
- **Featured writing** — 2-up: latest book excerpt + a blog/opinion pull quote linking to blog.
- **Initiatives band** (paper background) — Green Bharat + Saturday for Society + UHO, three columns with iconography (tree, calendar, globe hand-drawn in SVG, not Lucide defaults).
- **Contact call-to-action** — office hours, address, phone `+91 9305770340`, email — with a clean form CTA.

### /about

- Long-form biography split into "The advocate" and "The writer". Timeline of milestones (2017–2020 ALS Corporate Law → 2020–2023 founded UHO Law Club → Supreme Court practice). Includes the "Milestone of Avinash Pathak · Born 1997" note. Devanagari pull-quote treated as editorial art.

### /practice

- Detailed practice areas with matter types, courts appeared, engagement model.

### /books

- Grid of authored works (19+ placeholders with generated cover art), each with year + one-line description. "Writer to live for Earth" tagline as chapter opener.

### /initiatives

- Three sections: **United Human Organization**, **Green Bharat Great Bharat** (Plant a tree on your birthday), **Saturday for Society**. Includes the "The Great Aryan Dream · World Peace Treaty" ethos block, tastefully.

### /appointment

- Three tiers as editorial cards, not pricing-table SaaS:
  - Consultation — ₹11,000 / $134
  - UHO Card Holder — ₹1100 / $10 per session
  - As Writer engagement — ₹1,00,000 / $1,220
- Below tiers: booking form (name, email, phone, matter type, preferred date, message) → posts to a simple TanStack server function that emails the office (stub for now; wire real email when Cloud is enabled later).

### /contact

- Office block: UHO Law Club, near Bundelkhand University, Jhansi. Hours 10 AM – 4 PM (Mon–Fri, Bail 3–4). Email, WhatsApp `9305770340`, Website `https://www.uholawclub.in`, X/Twitter `@UHOlawclub`, Instagram `@uholawclub`, LinkedIn `UHO Law Club`, blog. Simple contact form + static map illustration.

## Technical notes

- Fonts loaded via `<link>` in `src/routes/__root.tsx` (Libre Baskerville 400/700, IBM Plex Sans 400/500/600, IBM Plex Mono 400, Noto Serif Devanagari 400/700). `@theme` in `src/styles.css` maps `--font-serif`, `--font-sans`, `--font-mono`, `--font-devanagari`.
- Rewrite `src/styles.css` `:root` tokens to Navy Trust palette in oklch. Set `--radius: 0.25rem`.
- Header/footer live in `__root.tsx` around `<Outlet />`.
- Generate ~8 images with `imagegen`: portrait of Avinash (duotone), office exterior, book cover set (4 covers), tree-planting scene, courtroom detail. Save under `src/assets/`.
- Contact/appointment forms are frontend-only for this build — capture into state and show a thank-you. Wiring to email/DB is a follow-up when the user asks for backend.
- No Supabase/Cloud enabled in this pass (frontend site only).
- SEO: unique `head()` per route; `og:image` only on leaf routes that have a real hero image URL.

## Out of scope (ask before adding)

- Real email delivery / DB persistence for the appointment form
- Multi-language (Hindi) full-site translation — Hindi used as editorial accents only
- Blog CMS — linking out to existing blogspot for now

Deliverable: 7 routes, cohesive editorial navy design system, distinctive typography, hand-picked imagery — ready to iterate on copy with the client.
