import { useState, useEffect } from "react";
import { Shield, Menu, X, MessageSquare, ExternalLink, ArrowRight } from "lucide-react";
import { BROKER_LINK, WHATSAPP_ADVISOR_LINK } from "../constants/config";
import { PcsLogo } from "./PcsLogo";

interface NavbarProps {
  onOpenDematClick: () => void;
}

export function Navbar({ onOpenDematClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor page scroll to activate dark glass background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Benefits", id: "benefits-section" },
    { label: "Why PCS", id: "why-pcs-section" },
    { label: "Wealth Forecaster", id: "wealth-forecaster-section" },
    { label: "FAQs", id: "faqs-section" },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset scroll slightly to account for fixed navbar height
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleOpenDemat = () => {
    setIsMobileMenuOpen(false);
    onOpenDematClick();
  };

  return (
    <>
      <nav
        id="premium-navbar"
        className={`fixed top-[43px] left-0 right-0 z-30 transition-all duration-350 border-b ${
          isScrolled
            ? "bg-[#030712]/90 backdrop-blur-md border-gold-400/15 shadow-[0_10px_30px_-15px_rgba(3,7,18,0.9)] py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo Identity */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <PcsLogo className="h-9 w-auto" showText={true} />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.id)}
                  className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-gold-400 transition-colors pointer cursor-pointer font-display"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Navigation CTA buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={WHATSAPP_ADVISOR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 hover:bg-emerald-500/15 text-emerald-400 text-xs font-semibold tracking-wider uppercase transition-all rounded-lg border border-emerald-500/25 flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Advisor
              </a>
              <button
                id="navbar-demat-cta"
                onClick={handleOpenDemat}
                className="px-4.5 py-2.5 rounded-lg bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 text-navy-950 font-bold text-xs uppercase tracking-widest transition-all hover:scale-102 hover:shadow-[0_4px_15px_-3px_rgba(229,193,88,0.4)] cursor-pointer"
              >
                Open Demat
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 rounded-lg bg-[#ffffff]/5 border border-[#ffffff]/10 text-slate-300 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gold-400" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay Backing */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/85 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel Drawer Drawer */}
      <div
        className={`fixed top-0 bottom-0 right-0 z-25 w-80 max-w-[85vw] bg-[#050b18]/95 border-l border-gold-400/20 shadow-2xl p-6 transition-transform duration-350 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center pb-6 border-b border-slate-900">
          <div className="flex items-center gap-2">
            <PcsLogo className="h-7 w-auto" showText={false} />
            <span className="text-xs font-extrabold tracking-wider text-slate-100 font-display">
              PCS DEMAT DESK
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 rounded bg-slate-900 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="py-8 space-y-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left text-sm font-semibold uppercase tracking-wider text-slate-300 hover:text-gold-400 py-2 border-b border-slate-950 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Action Buttons */}
        <div className="space-y-4 pt-6 border-t border-slate-900">
          <button
            onClick={handleOpenDemat}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 text-navy-950 font-bold text-xs uppercase tracking-widest text-center shadow-lg block"
          >
            Open Free Demat Account
          </button>
          
          <a
            href={WHATSAPP_ADVISOR_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-lg bg-[#0b1329] border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp Advice
          </a>
          
          <a
            href={BROKER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 text-slate-500 hover:text-slate-300 text-[11px] font-mono leading-none tracking-wider text-center flex items-center justify-center gap-1 mt-2 underline"
          >
            Direct Broker Access
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </>
  );
}
