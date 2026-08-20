import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import React, { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import uhoLogoImg from "../assets/WhatsApp Image 2026-07-29 at 19.28.20 (4).jpeg";

import { BottomNav } from "../components/BottomNav";
import { LegalModals, type LegalModalType } from "../components/LegalModals";
import logo1 from "../assets/WhatsApp Image 2026-07-29 at 19.28.20 (4).jpeg";

import { LanguageProvider, LanguageSwitcher, useLanguage } from "../lib/LanguageContext";
import { Twitter, Instagram, Linkedin } from "lucide-react";
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-steel">Section 404</p>
        <h1 className="mt-6 font-serif text-5xl">Not on the docket.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you were looking for isn't filed here.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 border-b border-paper/40 pb-1 text-sm hover:border-paper"
        >
          Return to chambers →
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error("Runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl">An interruption in proceedings.</h1>
        <p className="mt-4 text-sm text-muted-foreground">Please try again in a moment.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-paper px-5 py-2 text-sm text-navy hover:bg-paper/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-paper/30 px-5 py-2 text-sm hover:bg-paper/5"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "UHO Law Club — Chambers of Adv. Avinash Pathak, Jhansi" },
      {
        name: "description",
        content:
          "UHO Law Club & Chambers of Advocate Avinash Pathak. Supreme Court & High Court practice in criminal, corporate and constitutional law. Founder, United Human Organization.",
      },
      { name: "author", content: "UHO Law Club" },
      { property: "og:title", content: "UHO Law Club — Adv. Avinash Pathak" },
      {
        property: "og:description",
        content:
          "Counsel with conviction. Advocacy with conscience. Chambers based in Jhansi, practising before the Supreme Court and High Courts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@theUHOHouse" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: logo1, type: "image/jpeg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Noto+Serif+Devanagari:wght@400;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": "https://uholawclub.com/#legalservice",
  name: "UHO Law Club",
  alternateName: [
    "uholawclub",
    "uholawclub.com",
    "UHO Law Club Asia",
    "Chambers of Advocate Avinash Pathak",
  ],
  url: "https://uholawclub.com",
  telephone: "+919532660984",
  email: "uholawclub@gmail.com",
  priceRange: "₹1100 - ₹11,000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near Bundelkhand University",
    addressLocality: "Jhansi",
    addressRegion: "Uttar Pradesh",
    postalCode: "284128",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.4484,
    longitude: 78.5685,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "16:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Adv. Avinash Pathak",
    jobTitle: "Advocate & Writer",
    worksFor: {
      "@type": "LegalService",
      name: "UHO Law Club",
    },
  },
  areaServed: [
    { "@type": "City", name: "Jhansi" },
    { "@type": "State", name: "Uttar Pradesh" },
    { "@type": "Country", name: "India" },
  ],
  sameAs: ["https://twitter.com/theUHOHouse", "https://instagram.com/theuhohouse"],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://uholawclub.com/#website",
  name: "UHO Law Club",
  alternateName: ["uholawclub", "uholawclub.com"],
  url: "https://uholawclub.com",
};

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV = [
  { to: "/about", key: "nav.about", fallback: "About" },
  { to: "/practice", key: "nav.practice", fallback: "Practice" },
  { to: "/books", key: "nav.insights", fallback: "Insights" },
  { to: "/initiatives", key: "nav.events", fallback: "Events" },
  { to: "/appointment", key: "nav.appointment", fallback: "Appointment" },
  { to: "/contact", key: "nav.contact", fallback: "Contact" },
] as const;

function Seal({ className = "" }: { className?: string }) {
  return (
    <div className="relative flex shrink-0 items-center justify-center rounded-lg bg-[#000000] p-0.5 ring-1 ring-gold/40 shadow-sm overflow-hidden">
      <img
        src={uhoLogoImg}
        alt="UHO Law Club — United Human Organization"
        className={`${className} object-contain`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

function Header() {
  const { t } = useLanguage();

  const practiceTicker = [
    "SUPREME COURT OF INDIA",
    "ALLAHABAD HIGH COURT",
    "CRIMINAL DEFENCE",
    "CORPORATE & COMMERCIAL",
    "CONSTITUTIONAL RIGHTS",
    "UHO LAW CLUB ASIA",
    "GREEN BHARAT GREAT INDIA",
  ];

  return (
    <header className="w-full">
      {/* Top Banner — fixed */}
      <div className="fixed top-0 left-0 right-0 z-40 w-full bg-black text-white border-b border-white/20 px-4 py-2.5 sm:px-8 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Left Brand Identity */}
          <Link to="/" className="group flex items-center gap-3 text-navy min-w-0">
            {/* Logo Seal */}
            <Seal className="h-14 w-14 sm:h-16 sm:w-16" />

            {/* Vertical Line Divider */}
            <div className="h-8 w-px bg-white/30 mx-1 sm:mx-2 shrink-0" />

            {/* Title & Subtitle */}
            <div className="leading-tight min-w-0">
              <h1 className="truncate font-serif text-lg sm:text-2xl font-bold tracking-tight text-white group-hover:opacity-90 transition-opacity">
                {t("header.title")}
              </h1>
              <p className="truncate font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80">
                {t("header.subtitle")}
              </p>
            </div>
          </Link>

          {/* Right Location & Action */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <span className="hidden md:inline-block font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
              {t("header.location")}
            </span>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* <Link
              to="/appointment"
              className="inline-flex items-center gap-1.5 border-2 border-navy bg-transparent px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-navy shadow-sm transition-all duration-200 hover:bg-navy hover:text-[#d4af37] active:scale-95"
            >
              <span>{t("nav.bookNow")}</span>
            </Link> */}

            {/* Mobile menu was removed in favor of BottomNav */}
          </div>
        </div>
      </div>

      {/* Spacer to push content below the fixed gold banner */}
      <div className="h-[76px] sm:h-[84px]" aria-hidden />

      {/* Main Nav Links & Practice Area Ribbon */}
      <div className="w-full bg-black text-white border-b border-gold/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Main Navigation Pages Row */}
          <nav className="hidden lg:flex items-center justify-center gap-8 py-2.5 border-b border-white/10 text-xs font-mono uppercase tracking-[0.18em]">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-white/80 transition-colors hover:text-gold py-1"
                activeProps={{
                  className: "text-gold font-bold underline decoration-gold/60 underline-offset-4",
                }}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Sub-bar Practice Area Ticker
          <div className="overflow-x-auto py-2 scrollbar-none ">
            <div className="flex items-center justify-start lg:justify-center gap-3 sm:gap-4 whitespace-nowrap font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-paper/70 marquee-container">
              {practiceTicker.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span className="hover:text-gold transition-colors cursor-default">{item}</span>
                  {idx < practiceTicker.length - 1 && (
                    <span className="text-gold/60 font-bold select-none">&bull;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div> */}
        </div>
      </div>


    </header>
  );
}

function Footer({ onOpenLegalModal }: { onOpenLegalModal: (type: LegalModalType) => void }) {
  const { t } = useLanguage();
  return (
    <footer className="mt-20 border-t border-gold/20 bg-navy text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3.5">
              <Seal className="h-12 w-12" />
              <div>
                <div className="font-serif text-xl font-bold text-gold tracking-wide">
                  {t("header.title")}
                </div>
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  United Human Organization
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("footer.desc")}
            </p>
            <p className="mt-6 font-devanagari text-lg text-paper/90">
              कार्यालय अविनाश पाठक — लेखक व अधिवक्ता
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
              {t("footer.chambers")}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-paper/80 transition-colors hover:text-gold">
                    {t(n.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
              {t("footer.reach")}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/80">
              <li>Jhansi, Bundelkhand, Uttar Pradesh</li>
              <li>
                <a href="tel:+919305770340" className="transition-colors hover:text-gold">
                  +91 9532660984
                </a>
              </li>
              <li>
                <a
                  href="mailto:uholawclub@gmail.com"
                  className="transition-colors hover:text-gold break-words"
                >
                  uholawclub@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/theUHOHouse"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  @UHOlawclub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal links row */}
        <div className="mt-12 flex flex-wrap items-center justify-center md:justify-start gap-4 border-t border-paper/10 pt-6 text-xs text-paper/75 font-medium">
          <button
            onClick={() => onOpenLegalModal("privacy")}
            className="hover:text-gold underline decoration-gold/40 cursor-pointer"
          >
            {t("footer.privacy")}
          </button>
          <span>•</span>
          <button
            onClick={() => onOpenLegalModal("terms")}
            className="hover:text-gold underline decoration-gold/40 cursor-pointer"
          >
            {t("footer.terms")}
          </button>
          <span>•</span>
          <button
            onClick={() => onOpenLegalModal("disclaimer")}
            className="hover:text-gold underline decoration-gold/40 cursor-pointer"
          >
            {t("footer.disclaimer")}
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-border/40 pt-6 md:flex-row md:items-center md:justify-between text-muted-foreground text-xs font-mono">
          <p className="uppercase tracking-[0.15em]">
            © {new Date().getFullYear()} UHO Law Club · All rights reserved
          </p>
          <p>Advocates &amp; Solicitors · Bar Council of India</p>
        </div>
      </div>
    </footer>
  );
}

const WA_NUMBER = "919532660984"; // WhatsApp number in international format without '+' or dashes
const WA_MESSAGE = encodeURIComponent(
  "Hello, I'd like to book a consultation with Adv. Avinash Pathak — UHO Law Club.",
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

function WhatsAppButton() {
  return (
    <div className="fixed bottom-32 md:bottom-8 right-4 sm:right-6 z-40">
      {/* Pulse ring */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] animate-[wa-pulse_2s_ease-out_infinite]"
        style={{ animationDelay: "0.4s" }}
      />
      <a
        href={WA_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp to book an appointment"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg
          transition-all duration-200
          hover:scale-110 hover:shadow-xl hover:bg-[#20c05a]
          active:scale-95
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-7 w-7"
          aria-hidden
          fill="none"
        >
          <path
            d="M16 2C8.268 2 2 8.268 2 16c0 2.478.674 4.797 1.848 6.79L2 30l7.41-1.824A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Z"
            fill="white"
            fillOpacity=".15"
          />
          <path
            d="M16 4.5C9.596 4.5 4.5 9.596 4.5 16a11.44 11.44 0 0 0 1.69 6.01l.27.43-1.14 4.17 4.27-1.12.42.25A11.44 11.44 0 0 0 16 27.5c6.404 0 11.5-5.096 11.5-11.5S22.404 4.5 16 4.5Z"
            fill="white"
          />
          <path
            d="M21.5 18.86c-.28-.14-1.67-.82-1.93-.91-.26-.1-.45-.14-.63.14-.19.28-.72.91-.89 1.1-.16.18-.33.2-.61.07a7.72 7.72 0 0 1-2.27-1.4 8.5 8.5 0 0 1-1.57-1.95c-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.49-.07-.14-.63-1.52-.87-2.08-.23-.55-.46-.47-.63-.48l-.54-.01c-.18 0-.48.07-.74.35-.26.28-.98.96-.98 2.34s1.01 2.72 1.15 2.9c.14.2 1.98 3.02 4.8 4.24.67.29 1.2.46 1.61.59.67.21 1.29.18 1.77.11.54-.08 1.67-.68 1.9-1.34.24-.66.24-1.23.17-1.34-.07-.12-.26-.19-.54-.33Z"
            fill="#25D366"
          />
        </svg>
      </a>
      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function FloatingSocialBar() {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden flex-col gap-4 md:flex">
      <a
        href="https://twitter.com/theUHOHouse"
        target="_blank"
        rel="noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-navy border border-gold/20 text-paper shadow-lg transition-all hover:scale-110 hover:bg-gold hover:text-navy"
        aria-label="Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href="https://instagram.com/theuhohouse"
        target="_blank"
        rel="noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-navy border border-gold/20 text-paper shadow-lg transition-all hover:scale-110 hover:bg-gold hover:text-navy"
        aria-label="Instagram"
      >
        <Instagram className="h-4 w-4" />
      </a>
      <a
        href="https://linkedin.com/"
        target="_blank"
        rel="noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-navy border border-gold/20 text-paper shadow-lg transition-all hover:scale-110 hover:bg-gold hover:text-navy"
        aria-label="LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="flex min-h-screen flex-col bg-navy text-paper">
          <Header />
          <main className="flex-1 pb-32 md:pb-0">
            <Outlet />
          </main>
          <Footer onOpenLegalModal={setActiveLegalModal} />
          <BottomNav onOpenLegalModal={setActiveLegalModal} />
          <FloatingSocialBar />
          <WhatsAppButton />
          <LegalModals activeModal={activeLegalModal} onClose={() => setActiveLegalModal(null)} />
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
