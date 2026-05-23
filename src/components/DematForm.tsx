import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, ShieldCheck, ArrowRight, CornerDownRight, Loader } from "lucide-react";
import { BROKER_LINK, WHATSAPP_NUMBER } from "../constants/config";
import { submitDematLead } from "../utils/submission";
import { submitLead } from "../utils/submitLead";
import { motion, AnimatePresence } from "motion/react";
import { SecureVerificationBadges } from "./TrustSecuritySystems";
import { PcsLogo } from "./PcsLogo";

interface DematFormProps {
  source?: "direct" | "hero" | "benefits" | "contacts";
  isInitiallyOpen?: boolean;
}

export function DematForm({ source = "direct", isInitiallyOpen = true }: DematFormProps) {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  
  const [errors, setErrors] = useState<{ fullName?: string; mobile?: string; city?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  const containerRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    const newErrors: { fullName?: string; mobile?: string; city?: string } = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    const cleanMobile = mobile.replace(/\D/g, "");
    if (!cleanMobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (cleanMobile.length !== 10) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!city.trim()) {
      newErrors.city = "Please enter your city";
    } else if (city.trim().length < 2) {
      newErrors.city = "Please enter a valid city name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = mobile.replace(/\D/g, "");
    if (!fullName.trim()) {
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "Full Name is required" }));
      setErrors(prev => ({ ...prev, fullName: "Please enter your full name" }));
      return;
    }
    if (!phoneNumber || phoneNumber.length < 10) {
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "Enter valid mobile number" }));
      setErrors(prev => ({ ...prev, mobile: "Please enter a valid 10-digit mobile number" }));
      return;
    }
    if (!city.trim()) {
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "City is required" }));
      setErrors(prev => ({ ...prev, city: "Please enter your city" }));
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // STEP 3: POST data using submitLead with exact schema
      await submitLead({
        name: fullName.trim(),
        phone: phoneNumber,
        city: "Open Demat Account",
        time: new Date().toLocaleString()
      });

      // Maintain internal backup flow
      await submitDematLead({
        fullName: fullName.trim(),
        mobile: phoneNumber,
        city: city.trim(),
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        source,
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger floating toasts stack
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

      // STEP 5: Open WhatsApp automatically
      try {
        window.open(
          "https://wa.me/919330457995?text=Hello%20PCS%20Consultancy%20I%20submitted%20my%20demat%20request",
          "_blank"
        );
      } catch (wErr) {
        console.warn("WhatsApp popup was blocked:", wErr);
      }

      // STEP 6: After 2 seconds, redirect to Wealthy broking
      setTimeout(() => {
        try {
          window.open(BROKER_LINK, "_blank");
        } catch (rErr) {
          console.warn("Broker redirection popup was blocked: falling back to redirecting directly in current tab", rErr);
          window.location.href = BROKER_LINK;
        }
      }, 2000);

      // Keep the countdown local state animated
      let count = 3;
      const interval = setInterval(() => {
        count -= 1;
        setRedirectCountdown(count);
        if (count <= 0) {
          clearInterval(interval);
        }
      }, 1000);

    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
      setSubmitError("Server busy. Please try again.");
    }
  };

  return (
    <div 
      id="demat-registration-card" 
      ref={containerRef}
      className="w-full max-w-lg mx-auto glass-card rounded-2xl border-gold-400/20 shadow-2xl relative overflow-hidden transition-all duration-300"
    >
      {/* Premium Header/Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-700" />
      
      <div className="p-6 sm:p-8">
        {!isSuccess ? (
          <div>
            {isSubmitting ? (
              <div id="secure-onboarding-loading-screen" className="py-12 text-center space-y-6 font-mono animate-fadeIn">
                <div className="relative inline-block">
                  <div className="absolute inset-0 rounded-full bg-gold-400/15 blur-2xl animate-pulse" />
                  <PcsLogo className="h-14 w-auto mx-auto relative z-10 animate-pulse [animation-duration:1.5s]" showText={false} />
                </div>
                <div className="space-y-2.5">
                  <h4 className="text-sm font-extrabold text-gold-400 uppercase tracking-widest animate-pulse">
                    Securing Investor Route...
                  </h4>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                    Connecting to Verified Broker Network...
                  </p>
                </div>
                <div className="flex justify-center items-center gap-1.5 pt-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center sm:text-left">
                  {/* Subtle brand watermark logo beside header */}
                  <div className="flex justify-center sm:justify-start mb-4">
                    <PcsLogo className="h-7 w-auto" showText={true} />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-xs text-gold-400 mb-3">
                    <ShieldCheck className="w-4 h-4" /> SECURE DEMAT ONBOARDING DESK
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-100 tracking-tight">
                    Open Your Free Demat Account
                  </h3>
                  <p className="text-sm text-slate-400 mt-1.5">
                    Complete the quick details below to register and safely route to the Wealthy platform.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }));
                      }}
                      placeholder="Enter full name (as in PAN card)"
                      className={`w-full px-4 py-3 rounded-lg bg-navy-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors ${
                        errors.fullName ? "border-rose-500/60 focus:border-rose-500" : "border-slate-800 focus:border-gold-500"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-rose-400 text-xs mt-1.5 flex items-center font-mono">
                        <CornerDownRight className="w-3 h-3 mr-1" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="mobile" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      10-Digit Mobile Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm border-r border-slate-800 pr-3">
                        +91
                      </span>
                      <input
                        id="mobile"
                        type="tel"
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => {
                          const clean = e.target.value.replace(/\D/g, "");
                          setMobile(clean);
                          if (errors.mobile) setErrors(prev => ({ ...prev, mobile: undefined }));
                        }}
                        placeholder="Enter mobile number"
                        className={`w-full pl-16 pr-4 py-3 rounded-lg bg-navy-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors font-mono ${
                          errors.mobile ? "border-rose-500/60 focus:border-rose-500" : "border-slate-800 focus:border-gold-500"
                        }`}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="text-rose-400 text-xs mt-1.5 flex items-center font-mono">
                        <CornerDownRight className="w-3 h-3 mr-1" />
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Your City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (errors.city) setErrors(prev => ({ ...prev, city: undefined }));
                      }}
                      placeholder="e.g. Kolkata, Mumbai, Delhi"
                      className={`w-full px-4 py-3 rounded-lg bg-navy-950/80 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors ${
                        errors.city ? "border-rose-500/60 focus:border-rose-500" : "border-slate-800 focus:border-gold-500"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-rose-400 text-xs mt-1.5 flex items-center font-mono">
                        <CornerDownRight className="w-3 h-3 mr-1" />
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                {submitError && (
                  <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-xs font-mono text-center flex items-center justify-center gap-1.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping shrink-0" />
                    {submitError}
                  </div>
                )}

                <button
                  id="submit-demat-btn"
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 active:from-gold-700 active:to-gold-600 text-navy-950 font-bold font-display uppercase tracking-widest text-[13px] shadow-[0_4px_20px_-5px_rgba(229,193,88,0.4)] disabled:opacity-75 transition-all flex items-center justify-center gap-2 cursor-pointer border border-gold-300/20"
                >
                  <>
                    Next: Secure Identity Verification
                    <ArrowRight className="w-4 h-4" />
                  </>
                </button>

                {/* Regulatory footnote */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>● Free Account Opening</span>
                  <span>● SEBI Registered Partner</span>
                  <span>● Complete Encryption</span>
                </div>

                {/* Secure Neon Verification Badges */}
                <div className="pt-2 border-t border-slate-900/40">
                  <SecureVerificationBadges />
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="py-8 text-center space-y-6">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400">
              <CheckCircle className="w-16 h-16" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold font-display text-emerald-400">
                Lead Registered Successfully!
              </h4>
              <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-100">{fullName}</strong>! Your Demat lead has been recorded securely. We are now preparing to redirect you directly to our official broker-portal to complete your onboarding checklist.
              </p>
            </div>

            <div className="p-4 bg-navy-950/90 rounded-lg border border-gold-400/20 max-w-sm mx-auto space-y-3">
              <div className="text-[11px] font-mono tracking-widest text-gold-400 uppercase">
                Redirecting to Wealthy Broking
              </div>
              <div className="flex justify-center items-center gap-3">
                <div className="text-3xl font-extrabold text-slate-100 font-mono animate-pulse">
                  {redirectCountdown}s
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce delay-75" />
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce delay-150" />
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce delay-300" />
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BROKER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold hover:text-gold-300 transition-colors underline decoration-gold-400/40 hover:decoration-gold-300 underline-offset-4"
              >
                Click here if you are not redirected automatically
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
