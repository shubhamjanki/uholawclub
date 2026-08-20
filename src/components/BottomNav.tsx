import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Home, Landmark, FileText, Calendar, Mail } from "lucide-react";
import { LegalModalType } from "./LegalModals";

interface BottomNavProps {
  onOpenLegalModal: (type: LegalModalType) => void;
}

export function BottomNav({ onOpenLegalModal }: BottomNavProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      label: "Home",
      to: "/",
      icon: Home,
      isActive: currentPath === "/",
    },
    {
      label: "Practice",
      to: "/practice",
      icon: Landmark,
      isActive: currentPath.startsWith("/practice"),
    },
    {
      label: "Insights",
      to: "/books",
      icon: FileText,
      isActive: currentPath.startsWith("/books"),
    },
    {
      label: "Events",
      to: "/initiatives",
      icon: Calendar,
      isActive: currentPath.startsWith("/initiatives"),
    },
    {
      label: "Contact",
      to: "/contact",
      icon: Mail,
      isActive: currentPath.startsWith("/contact"),
    },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden w-full bg-black/95 backdrop-blur-xl text-white border-t border-white/20 shadow-[0_-10px_35px_rgba(0,0,0,0.75)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Legal Links Row */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-3 pt-2 pb-1 border-b border-paper/10 text-[10px] font-medium">
        <button
          onClick={() => onOpenLegalModal("privacy")}
          className="text-white/70 hover:text-white transition-colors"
        >
          Privacy
        </button>
        <span className="text-white/30">•</span>
        <button
          onClick={() => onOpenLegalModal("terms")}
          className="text-white/70 hover:text-white transition-colors"
        >
          Terms
        </button>
        <span className="text-white/30">•</span>
        <button
          onClick={() => onOpenLegalModal("disclaimer")}
          className="text-white/70 hover:text-white transition-colors"
        >
          Disclaimer
        </button>
        <span className="text-white/30">•</span>
        <span className="text-white/50 italic font-serif text-[9px]">Counsel with conviction.</span>
      </div>

      {/* 5 Fixed Bottom Nav Tabs */}
      <div className="mx-auto max-w-md px-2 py-1.5">
        <nav
          aria-label="Bottom Navigation"
          className="grid grid-cols-5 items-center justify-items-center"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex flex-col items-center justify-center w-full py-1 px-1 rounded-xl transition-all duration-200 ${
                  item.isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                <div
                  className={`relative p-1.5 rounded-xl transition-all duration-200 group-active:scale-95 ${
                    item.isActive
                      ? "bg-white/20 text-white ring-1 ring-white/60 shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                      : "group-hover:bg-white/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${item.isActive ? "text-gold stroke-[2.25]" : "stroke-[1.75]"}`}
                  />
                </div>
                <span
                  className={`mt-0.5 text-[10px] tracking-tight transition-colors ${
                    item.isActive ? "font-bold text-gold" : "font-medium text-paper/70"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
