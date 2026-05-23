import React, { ComponentType, useState, useEffect, MouseEvent } from "react";
import { 
  Briefcase, 
  Wallet2, 
  Calculator, 
  Compass, 
  Fingerprint, 
  Lock, 
  LineChart, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { submitLead } from "../utils/submitLead";

interface BenefitCard {
  title: string;
  description: string;
  badge?: string;
  icon: ComponentType<{ className?: string }>;
}

const BENEFITS: BenefitCard[] = [
  {
    title: "IPO Premium Guidance",
    description: "Get priority application guidance, listing predictions, and allocation strategies on major upcoming IPOs.",
    badge: "Hot",
    icon: Briefcase,
  },
  {
    title: "Mutual Fund Desk",
    description: "Integrated zero-commission direct mutual fund onboarding to grow your long-term capital seamlessly.",
    icon: Wallet2,
  },
  {
    title: "Strategic SIP Planning",
    description: "Tailor-made Systematic Investment Plans structured according to your lifetime financial milestone targets.",
    badge: "Essential",
    icon: Calculator,
  },
  {
    title: "Beginner Friendly Console",
    description: "No confusing trader jargon. Navigate clean wealth-creation instruments with zero stress or prior stock market knowledge.",
    icon: Compass,
  },
  {
    title: "100% Paperless KYC",
    description: "Skip physical forms entirely. Confirm identity online in under 5 minutes with complete Digilocker secure authentication.",
    badge: "Rapid",
    icon: Fingerprint,
  },
  {
    title: "Secure Router Onboarding",
    description: "Direct bank-grade encrypted redirection routing users straight into their final verified broker accounts.",
    icon: Lock,
  },
  {
    title: "Pro Wealth Forecaster",
    description: "Real-time, interactive tools to simulate compound interest and forecast exactly when you can retire financially free.",
    icon: LineChart,
  },
  {
    title: "WhatsApp Expert Advisory",
    description: "Direct access to real human wealth advisors on chat for solving registration bottlenecks or investment doubts.",
    badge: "24/7 Live",
    icon: HelpCircle,
  },
];

interface BenefitsProps {
  onOpenDematClick: () => void;
}

interface ToastItem {
  id: string;
  message: string;
}

export function Benefits({ onOpenDematClick }: BenefitsProps) {
  const SENTIMENTS = ["HIGH DEMAND", "MODERATE DEMAND", "STRONG RETAIL INTEREST"];
  const [sentimentIdx, setSentimentIdx] = useState(0);

  const BEGINNER_STATES = [
    "Beginner Ready",
    "Safe Learning Mode",
    "Guided Wealth Setup",
    "Assisted Investment Flow"
  ];
  const [beginnerIdx, setBeginnerIdx] = useState(0);

  const SMART_STATUSES = [
    "PCS Advisor Online",
    "Secure Investor Guidance",
    "SEBI Guided Support",
    "Smart Wealth Activation",
    "Beginner Safe Mode"
  ];
  const [statusIdx, setStatusIdx] = useState(0);

  const [activeCardIdx, setActiveCardIdx] = useState<number | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Form activation states
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitCard | null>(null);
  const [benefitFullName, setBenefitFullName] = useState("");
  const [benefitMobile, setBenefitMobile] = useState("");
  const [benefitCity, setBenefitCity] = useState("IPO Premium Guidance");
  const [isBenefitSubmitting, setIsBenefitSubmitting] = useState(false);
  const [benefitErrors, setBenefitErrors] = useState<{ fullName?: string; mobile?: string }>({});
  const [benefitSuccess, setBenefitSuccess] = useState(false);

  useEffect(() => {
    const handleGlobalToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const id = Math.random().toString();
      const message = customEvent.detail;
      setToasts((prev) => [...prev, { id, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };

    window.addEventListener("show-pcs-toast", handleGlobalToast);
    return () => window.removeEventListener("show-pcs-toast", handleGlobalToast);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSentimentIdx((prev) => (prev + 1) % SENTIMENTS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBeginnerIdx((prev) => (prev + 1) % BEGINNER_STATES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % SMART_STATUSES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const triggerToasts = () => {
    const messages = [
      "PCS Advisor Activated",
      "Advisor Connected",
      "Secure Guidance Enabled",
      "WhatsApp Support Activated",
      "Lead Synced Successfully"
    ];
    messages.forEach((msg, offset) => {
      setTimeout(() => {
        const id = Math.random().toString();
        setToasts((prev) => [...prev, { id, message: msg }]);
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
      }, offset * 450);
    });
  };

  const handleBenefitFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = benefitMobile.replace(/\D/g, "");
    if (!benefitFullName.trim()) {
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "Full Name is required" }));
      setBenefitErrors(prev => ({ ...prev, fullName: "Name is required" }));
      return;
    }
    if (!phoneNumber || phoneNumber.length < 10) {
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "Enter valid mobile number" }));
      setBenefitErrors(prev => ({ ...prev, mobile: "Please enter a valid 10-digit mobile number" }));
      return;
    }

    setIsBenefitSubmitting(true);
    setBenefitErrors({});

    try {
      let trackingCity = selectedBenefit?.title || "Premium Feature Desk";
      let waText = `Hello PCS Consultancy\n\nI am interested in ${trackingCity}`;

      if (trackingCity === "IPO Premium Guidance") {
        trackingCity = "IPO Premium Guidance";
        waText = "Hello PCS Consultancy I need IPO guidance";
      } else if (trackingCity === "Mutual Fund Desk") {
        trackingCity = "Mutual Fund Desk";
        waText = "Hello PCS Consultancy I need Mutual Fund support";
      } else if (trackingCity === "Beginner Friendly Console") {
        trackingCity = "Beginner Friendly Console";
        waText = "Hello PCS Consultancy I am a beginner investor";
      } else if (trackingCity === "Pro Wealth Forecaster") {
        trackingCity = "Pro Wealth Forecaster";
        waText = `Hello PCS Consultancy

My AI Wealth Analysis Summary:

Investor Type: Strategic High Growth Optimizer

Risk Profile: Strategic Balanced Alpha

Projected Wealth: ₹75,00,000

Wealth Score: 95/100

Please guide me with onboarding.`;
      } else if (trackingCity === "100% Paperless KYC") {
        waText = "Hello PCS Consultancy I want to start my 100% paperless KYC verification";
      } else if (trackingCity === "Secure Router Onboarding") {
        waText = "Hello PCS Consultancy I want to start my secure broker router onboarding";
      } else if (trackingCity === "WhatsApp Expert Advisory") {
        waText = "Hello PCS Consultancy I need expert assistance via WhatsApp";
      }

      // Submit lead to Google Sheets
      await submitLead({
        name: benefitFullName.trim(),
        phone: phoneNumber,
        city: trackingCity,
        time: new Date().toLocaleString()
      });

      setIsBenefitSubmitting(false);
      setBenefitSuccess(true);

      // Trigger toasts sequence
      const toastsToTrigger = [
        "Advisor Connected",
        "Lead Synced Successfully",
        "Secure Onboarding Activated"
      ];
      toastsToTrigger.forEach((msg, offset) => {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: msg }));
        }, offset * 400);
      });

      // Open WhatsApp advisor
      try {
        window.open(
          `https://wa.me/919330457995?text=${encodeURIComponent(waText)}`,
          "_blank"
        );
      } catch (wErr) {
        console.warn("WhatsApp blocked:", wErr);
      }

      // Redirect to Wealthy Broker
      setTimeout(() => {
        try {
          window.open("https://wealthy.in/broking?rcode=tanma54250", "_blank");
        } catch (bErr) {
          console.warn("Broker redirect blocked:", bErr);
        }
      }, 2000);

    } catch (err) {
      console.error(err);
      setIsBenefitSubmitting(false);
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "Submission failed" }));
    }
  };

  return (
    <section id="benefits-section" className="py-20 bg-gradient-to-b from-navy-950 to-[#050b18] relative">
      {/* Background radial soft light blobs for premium SaaS style */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Status ticker */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 font-mono text-xs uppercase tracking-wider bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-400/30 mb-3 transition-all duration-500 ease-in-out select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="text-slate-400 font-bold mr-1">Status:</span>
            <span className="text-gold-300 font-extrabold tracking-wide">{SMART_STATUSES[statusIdx]}</span>
          </div>
          <h2 className="text-3.5xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Premium Features for <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400 font-bold">Unmatched Long-Term Wealth</span>
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            PCS Consultancy equips beginner and sophisticated investors alike with secure, high-tech tools and onboarding support.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            const isIpoCard = benefit.title === "IPO Premium Guidance";
            const isBeginnerCard = benefit.title === "Beginner Friendly Console";
            const isActive = activeCardIdx === idx;

            const handleCardClick = () => {
              // Trigger active card visual state
              setActiveCardIdx(idx);
              setBenefitSuccess(false);
              setBenefitFullName("");
              setBenefitMobile("");

              if (benefit.title === "Strategic SIP Planning") {
                window.dispatchEvent(new CustomEvent("open-sip-form"));
                return;
              }

              setSelectedBenefit(benefit);
              setBenefitCity(benefit.title);

              // Scroll to form smoothly
              setTimeout(() => {
                const target = document.getElementById("benefits-onboard-form-container");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }, 100);
            };

            const handleQuickApply = (e: MouseEvent) => {
              e.stopPropagation();
              handleCardClick();
            };

            const handleBeginnerQuickStart = (e: MouseEvent) => {
              e.stopPropagation();
              handleCardClick();
            };

            return (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={handleCardClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick();
                  }
                }}
                className={`glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between relative group overflow-hidden cursor-pointer select-none ring-1 active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 ${
                  isActive
                    ? "bg-navy-900/70 border-gold-400/70 shadow-[0_0_40px_rgba(241,199,65,0.4)] scale-[0.99] ring-gold-400/40"
                    : isIpoCard || isBeginnerCard
                    ? "hover:bg-navy-900/50 hover:border-gold-400/50 hover:shadow-[0_0_30px_rgba(241,199,65,0.25)] ring-gold-400/5 lg:scale-[1.01] border-slate-800/80"
                    : "hover:bg-navy-900/40 hover:border-gold-400/30 active:shadow-[0_0_15px_rgba(229,193,88,0.15)] ring-transparent border-slate-800/80"
                }`}
              >
                {/* Decorative golden corner light */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gold-500/10 rounded-bl-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Shimmer light effect for IPO & Beginner Guidance */}
                {(isIpoCard || isBeginnerCard) && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/5 to-gold-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1800ms] ease-out pointer-events-none" />
                    <div className="absolute inset-0 rounded-2xl border border-gold-400/10 animate-pulse pointer-events-none" />
                  </>
                )}

                <div>
                  <div className="flex items-center justify-between mb-5 select-none">
                    <div className="p-3.5 rounded-xl bg-navy-950/90 border border-slate-800 text-gold-400 group-hover:text-gold-300 group-hover:border-gold-500/20 transition-all duration-300 pointer-events-none group-hover:rotate-6">
                      {isBeginnerCard ? (
                        <div className="relative group/icon-tooltip">
                          <IconComponent className="w-6 h-6 animate-pulse" />
                          <div className="absolute left-0 top-full mt-2 w-52 p-2 bg-slate-900 border border-slate-700/80 rounded text-[10px] lg:text-[9.5px] text-slate-200 opacity-0 group-hover/icon-tooltip:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl leading-relaxed normal-case font-sans">
                            PCS Consultancy helps beginners safely start investing with guided onboarding.
                          </div>
                        </div>
                      ) : (
                        <IconComponent className="w-6 h-6" />
                      )}
                    </div>
                    
                    {isIpoCard ? (
                      <div className="flex items-center gap-2">
                        {/* SEBI Guided Trust Badge */}
                        <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-mono font-medium pointer-events-none select-none">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse inline-block" />
                          SEBI Guided
                        </div>

                        {/* Interactive Tooltip Badge */}
                        <div className="relative group/tooltip pointer-events-auto">
                          <span className="text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded bg-gold-500/15 border border-gold-400/30 text-gold-300 cursor-help select-none">
                            {benefit.badge}
                          </span>
                          <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-slate-900 border border-slate-700/80 rounded text-[10px] lg:text-[9.5px] text-slate-300 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl leading-relaxed">
                            Priority onboarding support for trending IPO applications.
                            <div className="absolute right-4 top-full w-2 h-2 bg-slate-900 border-r border-b border-slate-700/80 transform rotate-45 -mt-1" />
                          </div>
                        </div>
                      </div>
                    ) : isBeginnerCard ? (
                      <div className="flex items-center gap-2">
                        {/* Trust badge with green verification dot */}
                        <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-mono font-medium pointer-events-none select-none">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse inline-block" />
                          SEBI Guided
                        </div>
                        {/* Beginner Badge */}
                        <span className="text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded bg-gold-500/15 border border-gold-400/30 text-gold-300 pointer-events-none">
                          Beginner Friendly
                        </span>
                      </div>
                    ) : (
                      benefit.badge && (
                        <span className="text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded bg-gold-500/15 border border-gold-400/30 text-gold-300 pointer-events-none">
                          {benefit.badge}
                        </span>
                      )
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 font-display tracking-tight mb-2 group-hover:text-white transition-colors pointer-events-none">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors pointer-events-none">
                    {benefit.description}
                  </p>

                  {/* IPO Demand Meter Indicator */}
                  {isIpoCard && (
                    <div className="mt-4 px-3 py-2 rounded-lg bg-navy-950/80 border border-slate-800/60 flex flex-col gap-1 select-none pointer-events-none">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 flex items-center justify-between">
                        <span>IPO Market Sentiment</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
                      </div>
                      <div className="text-xs font-bold font-mono text-gold-300 flex items-center gap-1.5 transition-all duration-500">
                        <TrendingUp className="w-3.5 h-3.5 text-gold-400 animate-bounce inline-block" />
                        {SENTIMENTS[sentimentIdx]}
                      </div>
                    </div>
                  )}

                  {/* Beginner Status & Comfort Score */}
                  {isBeginnerCard && (
                    <div className="mt-4 space-y-3 pointer-events-none select-none">
                      {/* Status Indicator */}
                      <div className="px-3 py-2 rounded-lg bg-navy-950/80 border border-slate-800/60 flex flex-col gap-1">
                        <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 flex items-center justify-between">
                          <span>Beginner Console Status</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                        <div className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1.5 transition-all duration-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                          {BEGINNER_STATES[beginnerIdx]}
                        </div>
                      </div>

                      {/* Investor Comfort Score Trust Meter */}
                      <div className="px-3 py-2 rounded-lg bg-navy-950/85 border border-slate-800/50 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>Investor Comfort Score</span>
                          <span className="text-gold-400 font-bold">96%</span>
                        </div>
                        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-gold-400 rounded-full animate-pulse" style={{ width: "96%" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-900/40 flex items-center justify-between">
                  {isIpoCard ? (
                    <button
                      type="button"
                      onClick={handleQuickApply}
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold text-xs font-mono tracking-tight transition-all active:scale-95 shadow-[0_0_12px_rgba(241,199,65,0.2)] hover:shadow-[0_0_18px_rgba(241,199,65,0.45)] cursor-pointer select-none z-10"
                    >
                      Quick Apply
                    </button>
                  ) : isBeginnerCard ? (
                    <button
                      type="button"
                      onClick={handleBeginnerQuickStart}
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold text-xs font-mono tracking-tight transition-all active:scale-95 shadow-[0_0_12px_rgba(241,199,65,0.2)] hover:shadow-[0_0_18px_rgba(241,199,65,0.45)] cursor-pointer select-none z-10"
                    >
                      Start Guided Setup
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 group-hover:text-gold-400/80 transition-colors pointer-events-none">
                      <span>Activation Ready</span>
                      <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}

                  {(isIpoCard || isBeginnerCard) && (
                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 group-hover:text-gold-400/80 transition-colors pointer-events-none">
                      <span>Premium Onboarding</span>
                      <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Premium Inline Onboarding Form */}
        {selectedBenefit && (
          <div 
            id="benefits-onboard-form-container"
            className="mt-12 max-w-2xl mx-auto bg-[#070e20]/95 border border-gold-400/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(241,199,65,0.1)] relative transition-all duration-500 overflow-hidden"
          >
            {/* Soft Glow border bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-emerald-500" />

            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-gold-400 uppercase tracking-widest block mb-1">
                  ● Secure Guided Console Onboarding
                </span>
                <h3 className="text-xl font-bold font-display text-white">
                  Activate {selectedBenefit.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedBenefit(null)} 
                className="text-[10px] uppercase font-mono tracking-wider text-slate-500 hover:text-slate-300 underline animate-pulse"
              >
                Close Form
              </button>
            </div>

            {/* Custom Interactive features inside the form */}
            {selectedBenefit.title === "Pro Wealth Forecaster" && (
              <div className="p-4 rounded-xl bg-gold-400/5 border border-gold-400/15 space-y-3.5 text-xs select-none">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-gold-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                  <span>AI INVESTOR COMMAND DECK</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[10px] text-slate-350">
                  <div className="p-3 bg-[#0a1226]/80 rounded border border-slate-900/80">
                    <span className="text-slate-500 block uppercase mb-1">Investor Archetype</span>
                    <strong className="text-slate-100 block text-xs">High CAGR Compounder</strong>
                  </div>
                  <div className="p-3 bg-[#0a1226]/80 rounded border border-slate-900/80">
                    <span className="text-slate-500 block uppercase mb-1">Risk Quotient</span>
                    <strong className="text-slate-100 block text-xs">Strategic Wealth Accrual</strong>
                  </div>
                  <div className="p-3 bg-[#0a1226]/80 rounded border border-slate-900/80">
                    <span className="text-slate-500 block uppercase mb-1">Wealth Success Metric</span>
                    <strong className="text-emerald-400 block text-xs">95% Success Probability</strong>
                  </div>
                  <div className="p-3 bg-[#0a1226]/80 rounded border border-slate-900/80">
                    <span className="text-slate-500 block uppercase mb-1">Investment Phase</span>
                    <strong className="text-slate-100 block text-xs">Accelerated Growth Corridor</strong>
                  </div>
                </div>
              </div>
            )}

            {selectedBenefit.title === "IPO Premium Guidance" && (
              <div className="p-4 rounded-xl bg-gold-400/5 border border-gold-400/15 space-y-3 text-xs select-none">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-gold-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                  <span>IPO DEMAND INTELLIGENCE METER</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Retail Listing Sentiment</span>
                    <span className="text-gold-400 font-bold font-mono">96% High Retail Demand</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold-500 to-emerald-400 rounded-full animate-pulse" style={{ width: "96%" }} />
                  </div>
                  <p className="text-[9.5px] font-mono text-slate-500 leading-normal">
                    *LISTING GAINS ESTIMATE: Very strong probability of listing gains above 35% on day 1. Priority channel open.
                  </p>
                </div>
              </div>
            )}

            {selectedBenefit.title === "Beginner Friendly Console" && (
              <div className="p-4 rounded-xl bg-gold-400/5 border border-gold-400/15 space-y-2 text-xs select-none">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-gold-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>BEGINNER SAFE MODE ACTIVE</span>
                </div>
                <div className="font-mono text-[10px] text-slate-400 space-y-1">
                  <p>● Trust Factor: <strong className="text-emerald-400 font-bold">5/5 Verified</strong></p>
                  <p>● Onboarding Readiness: <strong className="text-emerald-400 font-bold">100% Ready (Zero Market Experience Required)</strong></p>
                </div>
              </div>
            )}

            {!benefitSuccess ? (
              <form onSubmit={handleBenefitFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={benefitFullName} 
                      onChange={(e) => setBenefitFullName(e.target.value)}
                      placeholder="KYC Document Name"
                      className="w-full px-3 py-2.5 rounded bg-navy-950 font-mono text-xs text-white border border-slate-800 focus:outline-none focus:ring-1 focus:ring-gold-400/45"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                      Contact number (WhatsApp enabled)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs border-r border-slate-800 pr-2 font-mono">
                        +91
                      </span>
                      <input 
                        type="tel" 
                        maxLength={10}
                        required
                        value={benefitMobile} 
                        onChange={(e) => setBenefitMobile(e.target.value.replace(/\D/g, ""))}
                        placeholder="10-digit number"
                        className="w-full pl-14 pr-3 py-2.5 rounded bg-navy-950 font-mono text-xs text-white border border-slate-800 focus:outline-none focus:ring-1 focus:ring-gold-400/45 animate-pulse"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                    Target Feature Desk
                  </label>
                  <input 
                    type="text" 
                    readOnly 
                    value={benefitCity}
                    className="w-full px-3 py-2.5 rounded bg-navy-950/40 border border-slate-900 text-xs font-mono text-gold-400 focus:outline-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isBenefitSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-450 hover:to-gold-550 text-navy-950 font-bold font-display text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:shadow-[0_0_15px_rgba(241,199,65,0.3)] animate-pulse"
                >
                  {isBenefitSubmitting ? "Activating Secure Route..." : `Activate ${selectedBenefit.title} Desk`}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                
                <p className="text-[9px] text-[#5c6e8c] text-center font-mono select-none">
                  Encrypted SEBI route. Pressing submit opens direct encrypted communication lines.
                </p>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4">
                <Sparkles className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
                <h4 className="text-md font-bold text-emerald-400">Activation Triggered!</h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto font-mono">
                  Onboarding request for <strong className="text-white">{selectedBenefit.title}</strong> has been secured on our spreadsheet server. Routing to advisor next...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom CTA block */}
        <div className="mt-12 text-center">
          <button
            id="benefits-explore-cta"
            onClick={onOpenDematClick}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-navy-900 border border-gold-400/30 hover:border-gold-400 text-slate-200 hover:text-white font-semibold font-display tracking-wide text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-400/40 pointer group cursor-pointer shadow-lg"
          >
            Claim Your Complementary Demat Desk Pack
            <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Toast notifications container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-xs md:max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="p-3.5 bg-navy-950/95 border border-gold-400/40 text-slate-100 rounded-xl shadow-2xl text-[11px] font-mono flex items-center gap-2 pointer-events-auto shadow-gold-500/5 hover:border-gold-400 transition-all duration-300 animate-pulse shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
