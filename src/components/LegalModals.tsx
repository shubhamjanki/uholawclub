import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ShieldCheck, Scale, FileText } from "lucide-react";

export type LegalModalType = "privacy" | "terms" | "disclaimer" | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export function LegalModals({ activeModal, onClose }: LegalModalsProps) {
  const isOpen = activeModal !== null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-navy text-paper border border-gold/30 shadow-2xl">
        {activeModal === "privacy" && (
          <>
            <DialogHeader className="space-y-2 border-b border-border/40 pb-4">
              <div className="flex items-center gap-2 text-gold">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-mono text-xs uppercase tracking-widest text-gold/80">
                  UHO Law Club · Policy Document
                </span>
              </div>
              <DialogTitle className="font-serif text-2xl text-paper">
                Privacy Policy
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs font-mono">
                Last updated: January 2026 · Chambers of Adv. Avinash Pathak
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4 text-sm leading-relaxed text-paper/85 font-sans">
              <p>
                <strong>UHO Law Club</strong> ("United Human Organization") and the Chambers of
                Advocate Avinash Pathak prioritize the confidentiality and security of client information
                and website visitors in compliance with professional advocate ethics and data protection rules.
              </p>
              <h4 className="font-serif text-base text-gold pt-2">1. Information Collection & Usage</h4>
              <p>
                We collect personal information provided voluntarily through consultation requests, contact
                forms, or direct communications (such as name, phone number, email address, and brief matter descriptions).
                This data is solely used for case evaluation, consultation scheduling, and professional representation.
              </p>
              <h4 className="font-serif text-base text-gold pt-2">2. Client Confidentiality</h4>
              <p>
                All communications exchanged through this platform or directly with our chambers are protected under
                attorney-client privilege principles governed by the Advocates Act, 1961 and Bar Council of India rules.
              </p>
              <h4 className="font-serif text-base text-gold pt-2">3. Third-Party Sharing</h4>
              <p>
                We do not sell, rent, or share personal data with commercial third parties. Data is shared only when required by court procedure, legal compulsion, or with your explicit client consent.
              </p>
              <h4 className="font-serif text-base text-gold pt-2">4. Contact Information</h4>
              <p>
                For questions regarding data privacy, reach out to our chambers at{" "}
                <a href="mailto:uholawclub@gmail.com" className="text-gold underline">
                uholawclub@gmail.com
                </a>
                .
              </p>
            </div>
          </>
        )}

        {activeModal === "terms" && (
          <>
            <DialogHeader className="space-y-2 border-b border-border/40 pb-4">
              <div className="flex items-center gap-2 text-gold">
                <FileText className="h-5 w-5" />
                <span className="font-mono text-xs uppercase tracking-widest text-gold/80">
                  UHO Law Club · Terms of Service
                </span>
              </div>
              <DialogTitle className="font-serif text-2xl text-paper">
                Terms of Service
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs font-mono">
                Effective: 2026 · Bar Council of India Compliant
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4 text-sm leading-relaxed text-paper/85 font-sans">
              <p>
                Welcome to the digital portal of <strong>UHO Law Club</strong> and Chambers of Advocate Avinash Pathak.
                By accessing or using this website, you agree to comply with the terms set forth herein.
              </p>
              <h4 className="font-serif text-base text-gold pt-2">1. Informational Purpose</h4>
              <p>
                The information provided on this platform is for general informational and educational purposes only and
                does not constitute binding legal advice or formal engagement of counsel.
              </p>
              <h4 className="font-serif text-base text-gold pt-2">2. Engagement of Counsel</h4>
              <p>
                Form submission or booking inquiry through this website does not automatically create an advocate-client relationship.
                Formal engagement commences only upon written confirmation, fee agreement, and vakalatnama execution.
              </p>
              <h4 className="font-serif text-base text-gold pt-2">3. Intellectual Property</h4>
              <p>
                Articles, books, case notes, and branding published under UHO Law Club belong to Advocate Avinash Pathak and United Human Organization. Unauthorized reproduction without attribution is prohibited.
              </p>
            </div>
          </>
        )}

        {activeModal === "disclaimer" && (
          <>
            <DialogHeader className="space-y-2 border-b border-border/40 pb-4">
              <div className="flex items-center gap-2 text-gold">
                <Scale className="h-5 w-5" />
                <span className="font-mono text-xs uppercase tracking-widest text-gold/80">
                  UHO Law Club · Legal Disclaimer
                </span>
              </div>
              <DialogTitle className="font-serif text-2xl text-paper">
                Bar Council Disclaimer
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs font-mono">
                Rule 36 of Bar Council of India Rules
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4 text-sm leading-relaxed text-paper/85 font-sans">
              <p className="italic bg-midnight/80 p-3 border-l-2 border-gold text-paper/90">
                As per the rules of the Bar Council of India, advocates are prohibited from soliciting work or advertising in any form or manner.
              </p>
              <p>
                By using this website, the user acknowledges and agrees to the following:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-paper/80">
                <li>
                  There has been no advertisement, personal communication, solicitation, invitation, or inducement of any sort whatsoever from Adv. Avinash Pathak or UHO Law Club to solicit work through this website.
                </li>
                <li>
                  The user wishes to gain information about UHO Law Club and Advocate Avinash Pathak for their own information and use.
                </li>
                <li>
                  The information provided under this website is made available to the user only at their request for informational purposes.
                </li>
                <li>
                  Any information downloaded or obtained from this website is completely at the user&apos;s volition.
                </li>
              </ul>
              <p className="pt-2 text-xs text-muted-foreground">
                UHO Law Club · Jhansi, Bundelkhand · Advocates & Solicitors
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
