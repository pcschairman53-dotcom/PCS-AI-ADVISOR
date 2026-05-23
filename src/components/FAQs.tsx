import { useState } from "react";
import { Plus, Minus, HelpCircle, ArrowUpRight } from "lucide-react";
import { SUPPORT_EMAIL, WHATSAPP_ADVISOR_LINK } from "../constants/config";

interface FAQItemData {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItemData[] = [
  {
    question: "Is Demat Account opening completely free through PCS Consultancy?",
    answer: "Yes, account opening is 100% free with premium onboarding support. There are absolutely no hidden registration broker desk fees when you sign up using the official PCS link and complete your profile.",
  },
  {
    question: "How long does the digital KYC verification take?",
    answer: "The digital onboarding flow is paperless. Once redirected to the Wealthy Broking platform, standard Aadhaar & PAN authorization with Digilocker takes less than 5 minutes. Accounts are usually activated and ready for trading/investing within a few hours.",
  },
  {
    question: "Is an Aadhaar card mandatory to start?",
    answer: "Yes, to open a SEBI registered investment profile in India, an Aadhaar card linked with an active mobile number is required for OTP based secure e-signing, alongside a valid PAN card and active landing bank credentials.",
  },
  {
    question: "Can beginners start a Monthly SIP with small budgets?",
    answer: "Absolutely! Beginners can start high-priority Systematic Investment Plans (SIP) with as low as ₹500 or ₹1,000 per month. SIPs are perfect for compounding wealth without needing to time stock market cycles.",
  },
  {
    question: "Is there human advisory support available during the sign-up process?",
    answer: "Yes! PCS Consultancy is famous for its handholding support. If you face any validation errors, network issues, or have questions about selecting ideal mutual funds, our WhatsApp Expert Help is available 24/7.",
  },
];

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // keeps first item open by default for premium design flow

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs-section" className="py-20 bg-[#020617] border-t border-slate-900 relative">
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/5 rounded-full text-gold-400 text-xs tracking-wider uppercase border border-gold-400/20 mb-3 font-mono">
            <HelpCircle className="w-4 h-4" /> Help Desk center
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 font-bold">Inquiries</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Get instant solutions to common challenges on account initialization, credentials, and SIP deployment.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#070e20] border-gold-400/30 shadow-[0_4px_25px_-5px_rgba(229,193,88,0.08)]"
                    : "bg-[#040816]/60 border-slate-900 hover:border-slate-800"
                }`}
              >
                {/* Accordion Header Trigger */}
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 font-display font-bold text-sm sm:text-base text-slate-100 hover:text-white transition-colors cursor-pointer focus:outline-none"
                >
                  <span>{item.question}</span>
                  <span className={`p-1.5 rounded-lg shrink-0 transition-all duration-300 ${
                    isOpen ? "bg-gold-400 text-navy-950 rotate-180" : "bg-slate-900 text-slate-400"
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Accordion Content Panel */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 opacity-100 border-t border-slate-900/50" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 py-5">
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Callout Footnote */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#070e20] to-[#040816]/40 border border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-200 font-display">Need deeper clarification?</h4>
            <p className="text-xs text-slate-400">Our desk chairman and direct support experts are always text-away.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={WHATSAPP_ADVISOR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-400/25 hover:bg-emerald-500/15 text-emerald-400 text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              WhatsApp Desktop Advice
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="px-4 py-2 rounded-lg bg-[#0b1329] hover:bg-[#121c38] border border-slate-800 text-slate-350 hover:text-slate-200 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1"
            >
              Email Desk
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
