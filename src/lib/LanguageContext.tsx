import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// ─── Supported languages ───────────────────────────────────────────
export type Lang = "en" | "hi";

export interface LangOption {
  code: Lang;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const LANGUAGES: LangOption[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", flag: "🇮🇳" },
];

// ─── Translation dictionaries ──────────────────────────────────────
// Keys follow a dot-separated namespace: "section.key"
type TranslationDict = Record<string, string>;

const en: TranslationDict = {
  // ── Header / Nav ──
  "nav.bookNow": "BOOK NOW →",
  "nav.about": "About",
  "nav.practice": "Practice",
  "nav.insights": "Insights",
  "nav.events": "Events",
  "nav.appointment": "Appointment",
  "nav.contact": "Contact",
  "header.title": "UHO Law Club",
  "header.subtitle": "All Service law firm Global"  ,
  "header.location": "JHANSI, INDIA — GLOBAL PRACTICE",

  // ── Booking form (index hero) ──
  "booking.tag": "Book a Consultation",
  "booking.title": "Schedule your appointment...",
  "booking.subtitle": "Consultations available in-person in Jhansi or online via video call — clients welcome from anywhere in the world.",
  "booking.inPerson": "in-person in Jhansi",
  "booking.online": "online via video call",
  "booking.sidebar.tag": "The Chambers",
  "booking.sidebar.title": "A short note is enough to start.",
  "booking.sidebar.desc": "Tell us in plain language what has happened, or what you are considering. No legal jargon needed — we reply within one working day.",
  "booking.sidebar.directLine": "Direct line",
  "booking.sidebar.email": "Email",
  "booking.sidebar.whatsapp": "WhatsApp",
  "booking.sidebar.whatsappCta": "Book instantly via WhatsApp →",

  // ── Form fields ──
  "form.name": "Your name",
  "form.email": "Email",
  "form.phone": "Phone / WhatsApp",
  "form.date": "Preferred date",
  "form.mode": "Mode of consultation",
  "form.modeOnline": "Online — video call (Zoom / Google Meet)",
  "form.modeInPerson": "In-person — Jhansi chambers",
  "form.modePhone": "Phone call",
  "form.country": "Country / Time zone",
  "form.countryPlaceholder": "e.g. United Kingdom · GMT+1",
  "form.tier": "Type of engagement",
  "form.tierLegal": "Legal consultation — ₹11,000",
  "form.tierUHO": "UHO Card Holder — ₹844",
  "form.tierWriter": "Writer engagement — ₹1,00,000",
  "form.tierUnsure": "Not sure yet",
  "form.note": "A brief note about your matter",
  "form.notePlaceholder": "Tell us about your matter in plain language…",
  "form.submit": "Book Appointment →",
  "form.confidential": "Your note is confidential and not shared with third parties.",
  "form.received": "Received",
  "form.thankYou": "Thank you — we have your note.",
  "form.thankYouDesc": "The chambers will respond within one working day at the email address you shared. For urgent matters (bail, custody), call",
  "form.thankYouSuffix": "directly.",

  // ── Stats ──
  "stat.yrs": "Yrs at the bar",
  "stat.books": "Books authored",
  "stat.districts": "Districts covered",
  "stat.founded": "UHO founded",

  // ── Credentials strip ──
  "cred.supreme": "Supreme Court of India",
  "cred.highCourt": "Allahabad High Court",
  "cred.district": "District Court Jhansi",
  "cred.barCouncil": "Bar Council of U.P.",
  "cred.uhoClub": "UHO Law Club Asia",
  "cred.online": "Online · Worldwide",

  // ── Practice areas ──
  "practice.tag": "Practice",
  "practice.title": "Our Services",
  "practice.viewAll": "All practice areas →",
  "practice.explore": "Explore →",
  "practice.01.title": "Criminal Defence",
  "practice.01.desc": "Bail, trial and appellate representation in criminal matters across sessions and superior courts.",
  "practice.02.title": "Corporate & Commercial",
  "practice.02.desc": "Advisory and contentious work for founders, family businesses and industry across Bundelkhand.",
  "practice.03.title": "Constitutional & Rights",
  "practice.03.desc": "Writ petitions, PILs and human-rights matters before High Courts and the Supreme Court.",
  "practice.04.title": "Advisory & Retainer",
  "practice.04.desc": "Standing counsel arrangements for institutions, trusts and non-profit organizations.",
  "practice.05.title": "Bail & Personal Liberty",
  "practice.05.desc": "Anticipatory & regular bail petitions, urgent habeas corpus, and protection of constitutional liberty.",
  "practice.06.title": "IP & Author Protection",
  "practice.06.desc": "Copyright advisory, publishing agreements, trademark registration, and author rights protection.",

  // ── UHO History ──
  "history.tag": "History",
  "history.title": "The United Human Organization.",
  "history.desc": "From a single legal practice in Jhansi to a global network of advocacy, law and environmental action — the story of UHO is the story of one conviction held long enough to become a movement.",
  "history.readFull": "Read the full history →",
  "history.ch01.title": "Foundation",
  "history.ch01.left": "The United Human Organization was founded in 2020 by Advocate Avinash Pathak with a single, uncompromising vision: to unite humanity through the instruments of law, peace, and sustainability.",
  "history.ch01.right": "Where most legal organizations are defined by their practice areas, UHO was conceived as something broader — a platform where jurisprudence meets civic responsibility, and where every legal act carries a social consequence. The founding tagline captures it simply:",
  "history.ch01.quote": "\u201cWe the Human of Earth.\u201d",
  "history.ch02.title": "Early Years",
  "history.ch02.left": "During his years at ALS, Avinash Pathak was simultaneously advising over 119 brands across sectors — an extraordinary volume of commercial legal work that forged a global legal perspective early.",
  "history.ch02.right": "Parallel to the legal work, thirteen years of continuous authorship produced nineteen books spanning ecology, jurisprudence, history and civic philosophy — not separate from the law, but the long form of the same argument.",
  "history.ch03.title": "UHO Law Club",
  "history.ch03.left": "The UHO Law Club was formally established — a legal network designed to make quality counsel accessible beyond traditional fee structures. Chambers opened in Jhansi, expanding to five offices worldwide by 2023.",
  "history.ch03.right": "A signature feature from the start: the UHO Card, granting members access to legal consultation at a community rate. Practice grew from District Court Jhansi to the Allahabad High Court and the Supreme Court of India.",
  "history.ch04.title": "Global Advocacy",
  "history.ch04.left": "UHO Mission 8 Billion asks every person to plant a tree on their birthday. The Great Aryan Dream and World Peace Treaty 2023 propose a framework for international civic reconciliation.",
  "history.ch04.right": "Green Bharat Great Bharat combines tree planting, river clean-up advocacy, and civic education — rooted in Bundelkhand but reaching across India's districts and beyond.",
  "history.motto": "\"We the Human of Earth.\"",
  "history.est": "UHO · Est. 2020 · Jhansi, India",

  // ── Philosophy ──
  "philosophy.tag": "The Chambers",
  "philosophy.quote": "\"Law is not a profession I chose to earn from. It is an instrument — used well, it protects the smallest voice; used badly, it silences the loudest. My chambers exist for the former.\"",
  "philosophy.author": "— Avinash Pathak",
  "philosophy.bio": "Read the biography →",
  "philosophy.writings": "Explore the writings",

  // ── Initiatives ──
  "initiatives.tag": "Beyond the courtroom",
  "initiatives.title": "A practice that plants trees, publishes books, and organises Saturdays.",
  "initiatives.desc": "The United Human Organization is the civic arm of these chambers — running Green Bharat Great Bharat, the Saturday for Society movement, and the Pathak Temple Martial Arts Monastery. Advocacy, in its widest sense.",
  "initiatives.read": "Read the initiatives →",
  "initiatives.movement": "Movement",
  "initiatives.plantTree": "Plant a tree on your birthday",

  // ── Contact section ──
  "contact.tag": "Get in Touch",
  "contact.title": "Visit, write, or call.",
  "contact.desc": "UHO Law Club, near Bundelkhand University, Jhansi. In-person and online consultations available — clients welcome from anywhere in the world.",
  "contact.findUs": "Find Us · Jhansi, UP",
  "contact.openMaps": "Open in Maps →",
  "contact.address": "Address",
  "contact.hours": "Hours",
  "contact.hoursValue": "Mon – Sat · 10:00 – 16:00",
  "contact.bail": "Bail matters 15:00 – 16:00",
  "contact.directLine": "Direct line",
  "contact.emailLabel": "Email",
  "contact.bookConsultation": "Book consultation →",
  "contact.fullContactPage": "Full contact page",
  "contact.writeIn": "Write In",
  "contact.sendMessage": "Send us a message.",
  "contact.writeInDesc": "Describe your matter in plain language. No legal jargon needed — we reply within one working day.",
  "contact.writeInConf": "Your message is confidential and not shared with third parties.",
  "contact.sendBtn": "Send message →",
  "contact.subject": "Subject",
  "contact.yourMessage": "Your message",
  "contact.messagePlaceholder": "Tell us about your matter in plain language…",

  // ── Footer ──
  "footer.desc": "Chambers of Advocate Avinash Pathak. Counsel before the Supreme Court of India and High Courts. Founder, United Human Organization & UHO Law Club.",
  "footer.chambers": "Chambers",
  "footer.reach": "Reach & Contact",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",
  "footer.disclaimer": "Disclaimer",
  "footer.rights": "© {year} UHO Law Club · All rights reserved",
  "footer.barCouncil": "Advocates & Solicitors · Bar Council of India",

  // ── Language popup ──
  "langPopup.title": "Choose your language",
  "langPopup.subtitle": "Select a language to browse the site",
  "langPopup.continue": "Continue",

  // ── Language switcher ──
  "langSwitch.label": "Language",
};

const hi: TranslationDict = {
  // ── Header / Nav ──
  "nav.bookNow": "अभी बुक करें →",
  "nav.about": "हमारे बारे में",
  "nav.practice": "सेवाएँ",
  "nav.insights": "लेखन",
  "nav.events": "कार्यक्रम",
  "nav.appointment": "अपॉइंटमेंट",
  "nav.contact": "संपर्क",
  "header.title": "UHO लॉ क्लब",
  "header.subtitle": "यूनाइटेड ह्यूमन ऑर्गनाइज़ेशन • स्था. 2020",
  "header.location": "झाँसी, भारत — वैश्विक अभ्यास",

  // ── Booking form ──
  "booking.tag": "परामर्श बुक करें",
  "booking.title": "अपनी अपॉइंटमेंट शेड्यूल करें...",
  "booking.subtitle": "परामर्श झाँसी में व्यक्तिगत रूप से या वीडियो कॉल द्वारा ऑनलाइन उपलब्ध है — दुनिया भर के क्लाइंट्स का स्वागत है।",
  "booking.inPerson": "झाँसी में व्यक्तिगत",
  "booking.online": "वीडियो कॉल द्वारा ऑनलाइन",
  "booking.sidebar.tag": "कार्यालय",
  "booking.sidebar.title": "एक छोटा सा संदेश काफ़ी है।",
  "booking.sidebar.desc": "सरल भाषा में बताएं कि क्या हुआ है, या आप क्या सोच रहे हैं। कोई कानूनी शब्दावली ज़रूरी नहीं — हम एक कार्य दिवस में जवाब देते हैं।",
  "booking.sidebar.directLine": "डायरेक्ट लाइन",
  "booking.sidebar.email": "ईमेल",
  "booking.sidebar.whatsapp": "व्हाट्सएप",
  "booking.sidebar.whatsappCta": "व्हाट्सएप पर तुरंत बुक करें →",

  // ── Form fields ──
  "form.name": "आपका नाम",
  "form.email": "ईमेल",
  "form.phone": "फ़ोन / व्हाट्सएप",
  "form.date": "पसंदीदा तारीख",
  "form.mode": "परामर्श का तरीका",
  "form.modeOnline": "ऑनलाइन — वीडियो कॉल (ज़ूम / गूगल मीट)",
  "form.modeInPerson": "व्यक्तिगत — झाँसी कार्यालय",
  "form.modePhone": "फ़ोन कॉल",
  "form.country": "देश / समय क्षेत्र",
  "form.countryPlaceholder": "उदा. भारत · IST",
  "form.tier": "सेवा का प्रकार",
  "form.tierLegal": "कानूनी परामर्श — ₹11,000",
  "form.tierUHO": "UHO कार्ड धारक — ₹844",
  "form.tierWriter": "लेखक सहभागिता — ₹1,00,000",
  "form.tierUnsure": "अभी निश्चित नहीं",
  "form.note": "अपने मामले के बारे में संक्षिप्त नोट",
  "form.notePlaceholder": "अपने मामले के बारे में सरल भाषा में बताएं…",
  "form.submit": "अनुरोध भेजें →",
  "form.confidential": "आपका संदेश गोपनीय है और तीसरे पक्ष के साथ साझा नहीं किया जाता।",
  "form.received": "प्राप्त",
  "form.thankYou": "धन्यवाद — हमें आपका संदेश मिल गया।",
  "form.thankYouDesc": "कार्यालय आपके ईमेल पते पर एक कार्य दिवस में जवाब देगा। अत्यावश्यक मामलों (जमानत, हिरासत) के लिए कॉल करें",
  "form.thankYouSuffix": "सीधे।",

  // ── Stats ──
  "stat.yrs": "बार में वर्ष",
  "stat.books": "पुस्तकें लिखीं",
  "stat.districts": "जिलों में सेवा",
  "stat.founded": "UHO स्थापना",

  // ── Credentials strip ──
  "cred.supreme": "भारत का सर्वोच्च न्यायालय",
  "cred.highCourt": "इलाहाबाद उच्च न्यायालय",
  "cred.district": "जिला न्यायालय झाँसी",
  "cred.barCouncil": "बार काउंसिल ऑफ यू.पी.",
  "cred.uhoClub": "UHO लॉ क्लब एशिया",
  "cred.online": "ऑनलाइन · विश्वभर",

  // ── Practice areas ──
  "practice.tag": "सेवाएँ",
  "practice.title": "हमारी सेवाएँ",
  "practice.viewAll": "सभी सेवाएँ देखें →",
  "practice.explore": "जानें →",
  "practice.01.title": "आपराधिक बचाव",
  "practice.01.desc": "ज़मानत, मुकदमा और अपीलीय प्रतिनिधित्व — सत्र एवं उच्च न्यायालयों में।",
  "practice.02.title": "कॉर्पोरेट एवं वाणिज्यिक",
  "practice.02.desc": "संस्थापकों, पारिवारिक व्यवसायों और उद्योग के लिए सलाहकार एवं विवादित कार्य।",
  "practice.03.title": "संवैधानिक एवं अधिकार",
  "practice.03.desc": "रिट याचिकाएँ, जनहित याचिकाएँ और मानवाधिकार मामले — उच्च न्यायालय और सर्वोच्च न्यायालय में।",
  "practice.04.title": "सलाहकार एवं रिटेनर",
  "practice.04.desc": "संस्थानों, ट्रस्टों और गैर-लाभकारी संगठनों के लिए स्थायी परामर्शदाता व्यवस्था।",
  "practice.05.title": "ज़मानत एवं व्यक्तिगत स्वतंत्रता",
  "practice.05.desc": "अग्रिम व नियमित ज़मानत याचिकाएँ, त्वरित बंदी प्रत्यक्षीकरण, और संवैधानिक स्वतंत्रता की रक्षा।",
  "practice.06.title": "कॉपीराइट एवं लेखक सुरक्षा",
  "practice.06.desc": "कॉपीराइट सलाह, प्रकाशन समझौते, ट्रेडमार्क पंजीकरण, और लेखक अधिकारों की सुरक्षा।",

  // ── UHO History ──
  "history.tag": "इतिहास",
  "history.title": "यूनाइटेड ह्यूमन ऑर्गनाइज़ेशन।",
  "history.desc": "झाँसी में एक कानूनी अभ्यास से वकालत, कानून और पर्यावरणीय कार्रवाई के वैश्विक नेटवर्क तक — UHO की कहानी एक विश्वास की कहानी है जो आंदोलन बन गई।",
  "history.readFull": "पूरा इतिहास पढ़ें →",
  "history.ch01.title": "स्थापना",
  "history.ch01.left": "यूनाइटेड ह्यूमन ऑर्गनाइज़ेशन की स्थापना 2020 में अधिवक्ता अविनाश पाठक ने एक अटल दृष्टि के साथ की: कानून, शांति और स्थिरता के माध्यम से मानवता को एकजुट करना।",
  "history.ch01.right": "जहाँ अधिकांश कानूनी संगठन अपने अभ्यास क्षेत्रों से परिभाषित होते हैं, UHO की कल्पना कुछ व्यापक के रूप में की गई — एक मंच जहाँ न्यायशास्त्र नागरिक ज़िम्मेदारी से मिलता है।",
  "history.ch01.quote": "\u201cहम पृथ्वी के मनुष्य।\u201d",
  "history.ch02.title": "प्रारंभिक वर्ष",
  "history.ch02.left": "ALS में अपने वर्षों के दौरान, अविनाश पाठक एक साथ 119 से अधिक ब्रांडों को सलाह दे रहे थे — वाणिज्यिक कानूनी कार्य की एक असाधारण मात्रा।",
  "history.ch02.right": "कानूनी कार्य के समानांतर, तेरह वर्षों के निरंतर लेखन ने पारिस्थितिकी, न्यायशास्त्र, इतिहास और नागरिक दर्शन में उन्नीस पुस्तकें प्रकाशित कीं।",
  "history.ch03.title": "UHO लॉ क्लब",
  "history.ch03.left": "UHO लॉ क्लब औपचारिक रूप से स्थापित किया गया — गुणवत्तापूर्ण परामर्श को पारंपरिक शुल्क संरचनाओं से परे सुलभ बनाने के लिए।",
  "history.ch03.right": "शुरू से एक विशिष्ट विशेषता: UHO कार्ड, सदस्यों को सामुदायिक दर पर कानूनी परामर्श तक पहुँच प्रदान करता है।",
  "history.ch04.title": "वैश्विक वकालत",
  "history.ch04.left": "UHO मिशन 8 बिलियन हर व्यक्ति से अपने जन्मदिन पर एक पेड़ लगाने का अनुरोध करता है। ग्रेट आर्यन ड्रीम और विश्व शांति संधि 2023 अंतरराष्ट्रीय नागरिक सुलह के लिए एक ढाँचा प्रस्तुत करते हैं।",
  "history.ch04.right": "ग्रीन भारत ग्रेट भारत वृक्षारोपण, नदी सफ़ाई वकालत और नागरिक शिक्षा को जोड़ता है — बुंदेलखंड में जड़ें, लेकिन भारत के ज़िलों में फैला हुआ।",
  "history.motto": "\"हम पृथ्वी के मनुष्य।\"",
  "history.est": "UHO · स्था. 2020 · झाँसी, भारत",

  // ── Philosophy ──
  "philosophy.tag": "कार्यालय",
  "philosophy.quote": "\"कानून कोई पेशा नहीं है जिसे मैंने कमाने के लिए चुना। यह एक उपकरण है — अच्छे से उपयोग करें तो सबसे छोटी आवाज़ की रक्षा करता है; बुरे से उपयोग करें तो सबसे बड़ी आवाज़ को चुप करता है। मेरा कार्यालय पहले के लिए मौजूद है।\"",
  "philosophy.author": "— अविनाश पाठक",
  "philosophy.bio": "जीवनी पढ़ें →",
  "philosophy.writings": "लेखन जानें",

  // ── Initiatives ──
  "initiatives.tag": "अदालत से परे",
  "initiatives.title": "एक अभ्यास जो पेड़ लगाता है, किताबें प्रकाशित करता है, और शनिवार आयोजित करता है।",
  "initiatives.desc": "यूनाइटेड ह्यूमन ऑर्गनाइज़ेशन इन कार्यालयों की नागरिक भुजा है — ग्रीन भारत ग्रेट भारत, सैटरडे फ़ॉर सोसाइटी आंदोलन और पाठक मंदिर मार्शल आर्ट्स मठ का संचालन।",
  "initiatives.read": "पहल पढ़ें →",
  "initiatives.movement": "आंदोलन",
  "initiatives.plantTree": "अपने जन्मदिन पर एक पेड़ लगाएं",

  // ── Contact section ──
  "contact.tag": "संपर्क करें",
  "contact.title": "आएं, लिखें, या कॉल करें।",
  "contact.desc": "UHO लॉ क्लब, बुंदेलखंड विश्वविद्यालय के पास, झाँसी। व्यक्तिगत और ऑनलाइन परामर्श उपलब्ध — दुनिया भर से क्लाइंट्स का स्वागत है।",
  "contact.findUs": "हमें खोजें · झाँसी, UP",
  "contact.openMaps": "मैप में खोलें →",
  "contact.address": "पता",
  "contact.hours": "समय",
  "contact.hoursValue": "सोम – शनि · 10:00 – 16:00",
  "contact.bail": "ज़मानत मामले 15:00 – 16:00",
  "contact.directLine": "डायरेक्ट लाइन",
  "contact.emailLabel": "ईमेल",
  "contact.bookConsultation": "परामर्श बुक करें →",
  "contact.fullContactPage": "संपूर्ण संपर्क पृष्ठ",
  "contact.writeIn": "हमें लिखें",
  "contact.sendMessage": "हमें संदेश भेजें।",
  "contact.writeInDesc": "अपने मामले को सरल भाषा में बताएं। कोई कानूनी शब्दावली ज़रूरी नहीं — हम एक कार्य दिवस में जवाब देते हैं।",
  "contact.writeInConf": "आपका संदेश गोपनीय है और तीसरे पक्ष के साथ साझा नहीं किया जाता।",
  "contact.sendBtn": "संदेश भेजें →",
  "contact.subject": "विषय",
  "contact.yourMessage": "आपका संदेश",
  "contact.messagePlaceholder": "अपने मामले के बारे में सरल भाषा में बताएं…",

  // ── Footer ──
  "footer.desc": "अधिवक्ता अविनाश पाठक का कार्यालय। भारत के सर्वोच्च न्यायालय और उच्च न्यायालयों में परामर्श। संस्थापक, यूनाइटेड ह्यूमन ऑर्गनाइज़ेशन और UHO लॉ क्लब।",
  "footer.chambers": "कार्यालय",
  "footer.reach": "संपर्क एवं पहुँच",
  "footer.privacy": "गोपनीयता नीति",
  "footer.terms": "सेवा की शर्तें",
  "footer.disclaimer": "अस्वीकरण",
  "footer.rights": "© {year} UHO लॉ क्लब · सर्वाधिकार सुरक्षित",
  "footer.barCouncil": "अधिवक्ता एवं सॉलिसिटर · बार काउंसिल ऑफ इंडिया",

  // ── Language popup ──
  "langPopup.title": "अपनी भाषा चुनें",
  "langPopup.subtitle": "साइट ब्राउज़ करने के लिए भाषा चुनें",
  "langPopup.continue": "जारी रखें",

  // ── Language switcher ──
  "langSwitch.label": "भाषा",
};

const dictionaries: Record<Lang, TranslationDict> = { en, hi };

// ─── Context ───────────────────────────────────────────────────────
interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => { },
  t: (key) => key,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

// ─── Provider ──────────────────────────────────────────────────────
const STORAGE_KEY = "uho-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [showPopup, setShowPopup] = useState(false);
  const [popupSelection, setPopupSelection] = useState<Lang>("en");

  // On mount: read stored preference or show popup
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && dictionaries[stored]) {
      setLangState(stored);
    } else {
      // First visit — show language selection popup after a brief delay
      const timer = setTimeout(() => setShowPopup(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const t = (key: string): string => {
    return dictionaries[lang]?.[key] ?? dictionaries.en[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
      {/* Language Selection Popup */}
      {showPopup && (
        <LanguagePopup
          selected={popupSelection}
          onSelect={setPopupSelection}
          onConfirm={() => {
            setLang(popupSelection);
            setShowPopup(false);
          }}
          onClose={() => {
            setLang("en");
            setShowPopup(false);
          }}
          t={t}
        />
      )}
    </LanguageContext.Provider>
  );
}

// ─── Language Popup Component ──────────────────────────────────────
function LanguagePopup({
  selected,
  onSelect,
  onConfirm,
  onClose,
  t,
}: {
  selected: Lang;
  onSelect: (l: Lang) => void;
  onConfirm: () => void;
  onClose: () => void;
  t: (key: string) => string;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
        style={{ animation: "langFadeIn 0.3s ease" }}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ animation: "langSlideUp 0.4s ease" }}
      >
        <div
          className="relative w-full max-w-md overflow-hidden border border-gold/30 bg-gradient-to-b from-[#0f1b3d] to-[#081023] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gold accent bar */}
          <div className="h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center text-paper/50 hover:text-paper transition-colors"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="px-8 pt-8 pb-6">
            {/* Globe icon */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-navy/80">
              <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a15 15 0 014 9 15 15 0 01-4 9 15 15 0 01-4-9 15 15 0 014-9z" />
              </svg>
            </div>

            <h2 className="text-center font-serif text-2xl text-paper">
              {t("langPopup.title")}
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {t("langPopup.subtitle")}
            </p>

            {/* Language options */}
            <div className="mt-6 space-y-3">
              {LANGUAGES.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => onSelect(opt.code)}
                  className={`flex w-full items-center gap-4 border px-5 py-4 text-left transition-all duration-200 ${selected === opt.code
                      ? "border-gold bg-gold/10 text-paper shadow-[inset_0_0_20px_rgba(201,168,76,0.08)]"
                      : "border-border/60 bg-navy/40 text-paper/80 hover:border-paper/30 hover:bg-navy/60"
                    }`}
                >
                  <span className="text-2xl">{opt.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{opt.label}</div>
                    <div className="text-xs text-muted-foreground">{opt.nativeLabel}</div>
                  </div>
                  {/* Radio indicator */}
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${selected === opt.code ? "border-gold" : "border-paper/30"
                    }`}>
                    {selected === opt.code && (
                      <div className="h-2.5 w-2.5 rounded-full bg-gold" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Confirm button */}
            <button
              onClick={onConfirm}
              className="mt-6 w-full bg-paper px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-gold"
            >
              {t("langPopup.continue")} →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes langFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes langSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}

// ─── Language Switcher Button (for header) ─────────────────────────
export function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 border border-navy/40 bg-navy/10 px-1.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-navy transition-all hover:bg-navy hover:text-[#d4af37]"
        aria-label={t("langSwitch.label")}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <svg className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} aria-hidden />
          <div
            className="absolute right-0 top-full z-40 mt-2 min-w-[180px] overflow-hidden border border-gold/30 bg-[#0f1b3d] shadow-xl"
            style={{ animation: "langSlideUp 0.2s ease" }}
          >
            <div className="h-0.5 bg-gradient-to-r from-gold/40 via-gold to-gold/40" />
            {LANGUAGES.map((opt) => (
              <button
                key={opt.code}
                onClick={() => { setLang(opt.code); setOpen(false); }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${lang === opt.code
                    ? "bg-gold/15 text-gold"
                    : "text-paper/80 hover:bg-paper/5 hover:text-paper"
                  }`}
              >
                <span className="text-lg">{opt.flag}</span>
                <div>
                  <div className="font-medium">{opt.label}</div>
                  <div className="text-[10px] text-muted-foreground">{opt.nativeLabel}</div>
                </div>
                {lang === opt.code && <span className="ml-auto text-gold text-xs">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}

      <style>{`
        @keyframes langSlideUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
