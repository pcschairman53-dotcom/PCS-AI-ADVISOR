import React, { useState, useEffect, useMemo } from "react";
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle,
  HelpCircle,
  TrendingUp,
  Percent,
  Calendar,
  DollarSign,
  Loader
} from "lucide-react";
import { BROKER_LINK, WHATSAPP_NUMBER } from "../constants/config";
import { submitSipLead } from "../utils/submission";
import { submitLead } from "../utils/submitLead";

export function WealthForecaster() {
  // Calculator Input States
  const [monthlyInvest, setMonthlyInvest] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [durationYears, setDurationYears] = useState<number>(10);

  // Calculator Output States
  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [estReturns, setEstReturns] = useState<number>(0);
  const [finalWealth, setFinalWealth] = useState<number>(0);

  // SIP Form Expandable States
  const [isFormExpanded, setIsFormExpanded] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [monthlySipGoal, setMonthlySipGoal] = useState<string>("10000");

  const [formErrors, setFormErrors] = useState<{ fullName?: string; mobile?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(3);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  // Advanced AI SIP Conversion States & Memos
  const WEALTH_INSIGHTS = useMemo(() => [
    "Starting 5 years earlier may double final wealth.",
    "12% CAGR historically outperforms inflation.",
    "Long-term SIP reduces volatility risk."
  ], []);

  const [insightIdx, setInsightIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setInsightIdx((prev) => (prev + 1) % WEALTH_INSIGHTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [WEALTH_INSIGHTS]);

  const investorCategory = useMemo(() => {
    if (monthlyInvest < 5000) return "Starter Investor";
    if (monthlyInvest < 20000) return "Growth Investor";
    if (monthlyInvest < 50000) return "Premium Wealth Builder";
    return "High Value Investor";
  }, [monthlyInvest]);

  const recommendationText = useMemo(() => {
    if (monthlyInvest < 5000) {
      return "Increase SIP by ₹2,000 to potentially reach ₹1Cr faster.";
    }
    if (durationYears < 10) {
      return "Longer investment horizon improves compounding.";
    }
    return "Balanced SIP structure detected.";
  }, [monthlyInvest, durationYears]);

  const probabilityScore = useMemo(() => {
    let score = 75;
    if (durationYears > 25) score += 15;
    else if (durationYears > 15) score += 10;
    else if (durationYears > 7) score += 5;

    if (expectedReturn > 25) score -= 10;
    else if (expectedReturn > 18) score -= 5;
    else if (expectedReturn < 10) score += 5;

    return Math.min(Math.max(score, 60), 98);
  }, [durationYears, expectedReturn]);

  const [sipToasts, setSipToasts] = useState<Array<{ id: string; message: string }>>([]);

  const triggerSipToasts = () => {
    const messages = [
      "SIP Projection Calculated",
      "Wealth Route Activated",
      "Advisor Connected",
      "Lead Synced Successfully",
      "Premium Investor Flow Enabled"
    ];
    messages.forEach((msg, offset) => {
      setTimeout(() => {
        const id = Math.random().toString();
        setSipToasts((prev) => [...prev, { id, message: msg }]);
        setTimeout(() => {
          setSipToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
      }, offset * 450);
    });
  };

  useEffect(() => {
    const handleHighlightSip = () => {
      const target = document.getElementById("wealth-forecaster-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 2000);
    };

    const handleOpenSipForm = () => {
      setIsFormExpanded(true);
      const target = document.getElementById("wealth-forecaster-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setTimeout(() => {
        const input = document.getElementById("sipFullName") as HTMLInputElement | null;
        if (input) {
          input.focus();
        }
      }, 850);
    };

    window.addEventListener("highlight-sip-calculator", handleHighlightSip);
    window.addEventListener("open-sip-form", handleOpenSipForm);

    return () => {
      window.removeEventListener("highlight-sip-calculator", handleHighlightSip);
      window.removeEventListener("open-sip-form", handleOpenSipForm);
    };
  }, []);

  // Re-calculate live on input changes
  useEffect(() => {
    const P = monthlyInvest;
    const annualReturnRate = expectedReturn;
    const years = durationYears;

    const n = years * 12; // total months
    const i = (annualReturnRate / 12) / 100; // monthly rate

    // Indian standard SIP formula: M = P * [((1 + i)^n - 1) / i] * (1 + i)
    const totalPrincipal = P * n;
    let maturityValue = 0;

    if (i > 0) {
      maturityValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    } else {
      maturityValue = totalPrincipal;
    }

    const estimatedGains = maturityValue - totalPrincipal;

    setTotalInvested(Math.round(totalPrincipal));
    setEstReturns(Math.round(estimatedGains));
    setFinalWealth(Math.round(maturityValue));
    
    // Automatically keep the inline form monthly goal state in sync with calculator
    setMonthlySipGoal(monthlyInvest.toString());
  }, [monthlyInvest, expectedReturn, durationYears]);

  const validateSipForm = () => {
    const errors: { fullName?: string; mobile?: string } = {};

    if (!fullName.trim()) {
      errors.fullName = "Name is required to assign advisor";
    } else if (fullName.trim().length < 3) {
      errors.fullName = "Name should be at least 3 characters";
    }

    const numericPhone = mobile.replace(/\D/g, "");
    if (!numericPhone) {
      errors.mobile = "Mobile number is required";
    } else if (numericPhone.length !== 10) {
      errors.mobile = "Please input a valid 10-digit mobile number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = mobile.replace(/\D/g, "");
    if (!fullName.trim()) {
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "Full Name is required" }));
      setFormErrors(prev => ({ ...prev, fullName: "Name is required to assign advisor" }));
      return;
    }
    if (!phoneNumber || phoneNumber.length < 10) {
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "Enter valid mobile number" }));
      setFormErrors(prev => ({ ...prev, mobile: "Please enter a valid 10-digit mobile number" }));
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const parsedGoal = parseFloat(monthlySipGoal) || monthlyInvest;
    try {
      // STEP 3: POST data using submitLead with EXACT requested payload structure
      await submitLead({
        name: fullName.trim(),
        phone: phoneNumber,
        city: "Strategic SIP Planning",
        time: new Date().toLocaleString(),
        // Internal analysis tags appended under the hood
        sipAmount: monthlyInvest,
        expectedReturn: expectedReturn,
        investmentYears: durationYears,
        projectedWealth: finalWealth,
        investorCategory: investorCategory
      } as any);

      // Maintain local backup state
      await submitSipLead({
        fullName: fullName.trim(),
        mobile: phoneNumber,
        monthlySip: parsedGoal,
        expectedReturn,
        years: durationYears,
        estimatedWealth: finalWealth.toLocaleString("en-IN"),
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      });

      // Trigger premium floating toasts stack sequentially
      triggerSipToasts();

      setIsSubmitting(false);
      setIsSuccess(true);

      // Generate dynamic WhatsApp text matching prompt format
      const sipText = `Hello PCS Consultancy

My SIP Analysis:

Monthly SIP: ₹${monthlyInvest}

Expected Return: ${expectedReturn}%

Duration: ${durationYears} Years

Projected Wealth: ₹${finalWealth}

Investor Category: ${investorCategory}

Please guide me for onboarding.`;

      // Open WhatsApp advisor safely
      try {
        window.open(
          `https://wa.me/919330457995?text=${encodeURIComponent(sipText)}`,
          "_blank"
        );
      } catch (wErr) {
        console.warn("WhatsApp popup was blocked:", wErr);
      }

      // After 2 seconds, redirect to partner broker interface
      setTimeout(() => {
        try {
          window.open("https://wealthy.in/broking?rcode=tanma54250", "_blank");
        } catch (bErr) {
          console.warn("Broker redirection blocked:", bErr);
        }
      }, 2000);

    } catch (error) {
      console.error("SIP Form submission error:", error);
      setIsSubmitting(false);
      setSubmitError("Server busy. Please try again.");
    }
  };

  // WhatsApp advisor link pre-configured with calculator values
  const handleTalkToAdvisor = () => {
    // Trigger calculated report toasts on demand
    triggerSipToasts();

    const sipText = `Hello PCS Consultancy

My SIP Analysis:

Monthly SIP: ₹${monthlyInvest}

Expected Return: ${expectedReturn}%

Duration: ${durationYears} Years

Projected Wealth: ₹${finalWealth}

Investor Category: ${investorCategory}

Please guide me for onboarding.`;

    const url = `https://wa.me/919330457995?text=${encodeURIComponent(sipText)}`;
    window.open(url, "_blank");

    // After 2 seconds, redirect to partner broker interface
    setTimeout(() => {
      try {
        window.open("https://wealthy.in/broking?rcode=tanma54250", "_blank");
      } catch (bErr) {
        console.warn("Broker redirection blocked:", bErr);
      }
    }, 2000);
  };

  return (
    <section id="wealth-forecaster-section" className="py-20 bg-gradient-to-b from-[#050b18] to-navy-950 relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/5 rounded-full text-gold-400 text-xs tracking-wider uppercase border border-gold-400/20 mb-3 font-mono">
            <Calculator className="w-4 h-4" /> Compound Wealth Engine
          </div>
          <h2 className="text-3.5xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            PCS Demat <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 font-bold">Wealth Forecaster</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            See how very small monthly disciplined SIP allocations grow over time into an incredible retirement chest.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Slider Inputs Controls (Col: 7/12) */}
          <div 
            id="sip-calculator-inputs-container"
            className={`lg:col-span-7 bg-[#070e20]/90 border rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl transition-all duration-700 ${
              isHighlighted ? "ring-2 ring-gold-400 ring-offset-4 ring-offset-navy-950 border-gold-400" : "border-slate-800/80"
            }`}
          >
            
            <h3 className="text-lg font-bold font-display text-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded bg-gold-400 block" />
              Adjust Investment Model
            </h3>

            {/* Indicator Sliders */}
            <div className="space-y-6">
              
              {/* Monthly Investment */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-gold-400" />
                    Monthly Investment
                  </label>
                  <span className="text-base font-extrabold text-gold-400 font-mono">
                    ₹ {monthlyInvest.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={500}
                  value={monthlyInvest}
                  onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                  className="w-full h-1.5 bg-navy-950 rounded-lg appearance-none cursor-ew-resize accent-gold-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>₹ 1k</span>
                  <span>₹ 25k</span>
                  <span>₹ 50k</span>
                  <span>₹ 75k</span>
                  <span>₹ 100k</span>
                </div>
              </div>

              {/* Expected Return Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5 text-emerald-400" />
                    Expected Return Run-rate
                  </label>
                  <span className="text-base font-extrabold text-emerald-400 font-mono">
                    {expectedReturn}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={0.5}
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-1.5 bg-navy-950 rounded-lg appearance-none cursor-ew-resize accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5% (Conservative)</span>
                  <span>12% (Equity Avg)</span>
                  <span>18% (Growth)</span>
                  <span>30% (High Cap)</span>
                </div>
              </div>

              {/* Duration in Years */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    Investment Period
                  </label>
                  <span className="text-base font-extrabold text-blue-400 font-mono">
                    {durationYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  step={1}
                  value={durationYears}
                  onChange={(e) => setDurationYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-navy-950 rounded-lg appearance-none cursor-ew-resize accent-blue-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 Year</span>
                  <span>10 Years</span>
                  <span>20 Years</span>
                  <span>30 Years</span>
                  <span>40 Years</span>
                </div>
              </div>

            </div>

            {/* Quick Helper Tips */}
            <div className="p-4 rounded-xl bg-gold-400/5 border border-gold-400/10 space-y-3.5 text-xs text-slate-450 leading-relaxed relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 -translate-x-full animate-shimmer pointer-events-none" style={{ animationDuration: '4s' }} />
              <div className="flex gap-3.5">
                <div className="p-1 rounded bg-[#0b1329] border border-slate-800 text-gold-400 shrink-0 h-fit">
                  <TrendingUp className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div>
                  <strong className="text-slate-200 font-semibold block transition-colors mb-0.5">Live Market Insight:</strong>
                  <span className="text-slate-300 font-medium transition-all duration-500">{WEALTH_INSIGHTS[insightIdx]}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800/60 flex gap-3.5">
                <div className="p-1 rounded bg-[#0b1329] border border-slate-800 text-emerald-400 shrink-0 h-fit">
                  <HelpCircle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-slate-200 font-semibold block mb-0.5">Advisor Suggestion:</strong>
                  <span className="text-slate-300 font-medium">{recommendationText}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Results Summary and Action Onboarding Card (Col: 5/12) */}
          <div className="lg:col-span-5 bg-[#070e20]/90 border border-gold-400/10 rounded-2xl p-6 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Ambient indicator card header */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-gold-400" />

            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Calculation Output Report
            </h3>

            {/* Detailed numeric reports */}
            <div className="grid grid-cols-1 divide-y divide-slate-850 bg-navy-950/80 rounded-xl border border-slate-900 overflow-hidden relative">
              {/* micro shimmer sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 -translate-x-full animate-shimmer pointer-events-none" style={{ animationDuration: '3.5s' }} />
              
              <div className="p-4 flex items-center justify-between">
                <span className="text-xs text-slate-400">Total Invested Principal</span>
                <span className="text-md font-bold text-slate-200 font-mono transition-all">
                  ₹ {totalInvested.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-xs text-slate-400">Estimated Returns (Gains)</span>
                <span className="text-md font-bold text-emerald-400 font-mono transition-all">
                  + ₹ {estReturns.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="p-4 flex flex-col gap-2.5 bg-gold-400/5 select-none relative">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-gold-300">Total Projected Wealth</span>
                  <span className="text-lg font-extrabold text-gold-400 font-mono animate-pulse">
                    ₹ {finalWealth.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-gold-400/10 text-[10px] font-mono">
                  <span className="text-slate-400 uppercase tracking-widest">Investor Category</span>
                  <span className="text-gold-300 font-extrabold bg-gold-400/10 px-2 py-0.5 rounded border border-gold-400/20 shadow-[0_0_10px_rgba(241,199,65,0.05)]">
                    {investorCategory}
                  </span>
                </div>
              </div>

              {/* Smart Projection Meter showing Wealth Probability Score */}
              <div className="p-4 bg-navy-950/90 border-t border-slate-900 space-y-2 select-none">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Wealth Probability Score
                  </span>
                  <span className="text-emerald-400 font-bold transition-all duration-300">{probabilityScore}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-gold-400 rounded-full transition-all duration-550" 
                    style={{ width: `${probabilityScore}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Main Interactive Action Choice Panels */}
            {!isFormExpanded ? (
              <div className="space-y-3 pt-2">
                <button
                  id="sip-start-portfolio-btn"
                  onClick={() => setIsFormExpanded(true)}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-450 hover:to-gold-550 text-navy-950 font-bold font-display text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 group shadow-[0_4px_15px_-3px_rgba(229,193,88,0.3)]"
                >
                  Start Your SIP Portfolio
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  id="sip-talk-advisor-btn"
                  onClick={handleTalkToAdvisor}
                  className="w-full py-3 px-5 rounded-xl bg-navy-950 hover:bg-navy-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  Talk To SIP Advisor
                </button>
              </div>
            ) : (
              /* Inline Expandable Demat Onboarding Form specifically parameterized for SIP Goal */
              <div className="pt-2 border-t border-slate-900 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gold-400 font-mono uppercase tracking-wider">
                    ● Premium SIP Mutual Onboarding
                  </h4>
                  <button
                    onClick={() => setIsFormExpanded(false)}
                    className="text-[10px] text-slate-500 hover:text-slate-300 underline font-mono"
                  >
                    Back to options
                  </button>
                </div>

                {!isSuccess ? (
                  <form onSubmit={handleSipSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <input
                        id="sipFullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (formErrors.fullName) setFormErrors(prev => ({ ...prev, fullName: undefined }));
                        }}
                        placeholder="Your Name (for KYC Allocation)"
                        className={`w-full px-3 py-2.5 rounded bg-navy-950 text-xs text-slate-150 border focus:outline-none focus:ring-1 focus:ring-gold-400/40 ${
                          formErrors.fullName ? "border-rose-500/60" : "border-slate-800"
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[10px] text-rose-450 font-mono mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs border-r border-slate-800 pr-2 font-mono">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={mobile}
                          onChange={(e) => {
                            setMobile(e.target.value.replace(/\D/g, ""));
                            if (formErrors.mobile) setFormErrors(prev => ({ ...prev, mobile: undefined }));
                          }}
                          placeholder="Contact mobile number"
                          className={`w-full pl-14 pr-3 py-2.5 rounded bg-navy-950 text-xs text-slate-150 border focus:outline-none focus:ring-1 focus:ring-gold-400/40 font-mono ${
                            formErrors.mobile ? "border-rose-500/60" : "border-slate-800"
                          }`}
                        />
                      </div>
                      {formErrors.mobile && (
                        <p className="text-[10px] text-rose-450 font-mono mt-1">{formErrors.mobile}</p>
                      )}
                    </div>

                    {/* Pre-filled Monthly SIP Goal */}
                    <div>
                      <label htmlFor="goalLabel" className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-1">
                        Assigned Monthly Target Allocation (₹)
                      </label>
                      <input
                        id="goalLabel"
                        type="text"
                        readOnly
                        value={`₹ ${monthlyInvest.toLocaleString("en-IN")} / month`}
                        className="w-full px-3 py-2 rounded bg-[#0b1329] border border-slate-800 text-xs text-slate-300 font-mono focus:outline-none"
                      />
                    </div>

                    {submitError && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded text-xs font-mono text-center flex items-center justify-center gap-1.5 leading-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping shrink-0" />
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-450 hover:to-emerald-555 text-navy-950 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-3.5 h-3.5 animate-spin" />
                          Analyzing Wealth Projection...
                        </>
                      ) : (
                        <>
                          Register & Start Onboard
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                    <p className="text-[9px] text-[#5c6e8c] text-center font-mono">
                      Security Check: Safe routing via bank-grade redirect.
                    </p>
                  </form>
                ) : (
                  <div className="py-4 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-sm font-bold text-emerald-400">SIP Interest Recorded!</h4>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      We recorded your preference of <strong className="text-slate-100">₹{monthlyInvest.toLocaleString("en-IN")}/mo</strong> successfully. Pre-loading official broking interface...
                    </p>
                    <div className="bg-[#0b1329] p-2.5 rounded border border-slate-800 max-w-xs mx-auto">
                      <div className="text-[10px] text-slate-400 font-mono">
                        Redirection starting in <strong className="text-gold-400">{redirectCountdown}s</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Floating live toast notifications container for Wealth Forecaster flow */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-xs md:max-w-sm pointer-events-none">
        {sipToasts.map((toast) => (
          <div
            key={toast.id}
            className="p-3.5 bg-navy-950/95 border border-gold-400/40 text-slate-150 rounded-xl shadow-2xl text-[11px] font-mono flex items-center gap-2 pointer-events-auto shadow-gold-500/5 hover:border-gold-450 transition-all duration-300 animate-pulse shrink-0 animate-fade-in"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
