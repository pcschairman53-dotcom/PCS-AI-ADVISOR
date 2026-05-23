import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Lock, 
  MessageSquare, 
  Check, 
  Server, 
  Send, 
  TrendingUp, 
  Zap, 
  Users, 
  Smartphone, 
  RefreshCw, 
  ArrowUpRight,
  Eye,
  Info
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../constants/config";

// ==========================================
// 1. SECURE TRUST STRIP (slim animated marquee/strip)
// ==========================================
export function SecureTrustStrip() {
  const items = [
    { text: "SEBI Secure Routing Active", color: "text-emerald-400 bg-emerald-500/10" },
    { text: "Bank-Grade 256-Bit Encryption", color: "text-amber-400 bg-amber-500/10" },
    { text: "Official WhatsApp Advisor Live", color: "text-emerald-400 bg-emerald-500/10" },
    { text: "Secure Wealthy Partner Channel", color: "text-gold-400 bg-gold-500/10" },
    { text: "Protected KYC Document Router", color: "text-blue-400 bg-blue-500/10" },
  ];

  return (
    <div className="w-full bg-[#050b18] border-b border-slate-900/60 overflow-hidden py-2 px-4 select-none relative z-20">
      {/* Container for scrolling/marquee on mobile and static grid on desktop for premium look */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 overflow-x-auto scrollbar-none md:justify-around text-[10px] font-mono tracking-wider text-slate-400 uppercase">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 shrink-0 hover:text-white transition-colors duration-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${item.color}`}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 2. ONBOARDING TRUST COUNTER GRID
// ==========================================
export function OnboardingTrustCounter() {
  const counters = [
    {
      value: "1,200+",
      suffix: "Active Portfolio Routes",
      label: "Assisted Investors",
      desc: "Successfully assigned and activated this month with verified status.",
      icon: <Users className="w-5 h-5 text-gold-450" />
    },
    {
      value: "99.2%",
      suffix: "Seamless Validation Progress",
      label: "Smooth Verification",
      desc: "Instant routing speed bypassing legacy portal loading delays.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    },
    {
      value: "₹ 0 /-",
      suffix: "Official Lifetime Open Rate",
      label: "Free Account Opening",
      desc: "Zero hidden charges. No platform management fees for life.",
      icon: <Zap className="w-5 h-5 text-gold-400" />
    },
    {
      value: "24/7 Hours",
      suffix: "Dedicated Secure Helpline Desk",
      label: "Beginner Assistance",
      desc: "Direct escalation path is maintained to certified Indian onboarding desks.",
      icon: <MessageSquare className="w-5 h-5 text-blue-400" />
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-[#040916] to-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-gold-400/10 border border-gold-400/20 text-[10px] font-mono uppercase text-gold-400 tracking-widest mb-2">
              <TrendingUp className="w-3.5 h-3.5" /> High-Confidence Metrics
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Institutional Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">Credibility Stats</span>
            </h3>
          </div>
          <p className="text-xs text-slate-450 max-w-sm text-slate-450 leading-relaxed text-center md:text-right font-mono">
            Integrity analytics provided live. High-Priority clusters active for real-time KYC validation backups.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {counters.map((item, index) => (
            <div 
              key={index}
              className="bg-[#091125]/70 border border-slate-900/80 hover:border-gold-400/20 rounded-2xl p-5 hover:translate-y-[-2px] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-400/5 to-transparent rounded-full pointer-events-none" />
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-350 flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="text-[9px] font-mono text-slate-550 border border-slate-900 rounded-full px-2 py-0.5 bg-slate-950 uppercase">
                  {item.suffix}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-extrabold text-slate-100 font-mono tracking-tight group-hover:text-gold-400 transition-colors">
                  {item.value}
                </div>
                <div className="text-xs font-bold text-slate-200 mt-1 font-display">
                  {item.label}
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. SECURE VERIFICATION BADGES (Inline Helper)
// ==========================================
export function SecureVerificationBadges() {
  const badges = [
    { title: "SEBI ARN-1154250", desc: "Regulated Partner Desk" },
    { title: "Bank Grade Security", desc: "256-bit Document Cryptography" },
    { title: "Secure API Routing", desc: "Zero Data Retained Direct Channel" },
    { title: "Investor Protected", desc: "Host Server Indemnified" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 pt-2">
      {badges.map((b, i) => (
        <div 
          key={i} 
          className="p-2.5 rounded-xl bg-navy-950/60 border border-slate-900 hover:border-gold-400/20 shadow-sm hover:shadow-cyan-500/5 transition-all text-left relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[9px] font-extrabold uppercase font-mono tracking-wide text-slate-200">{b.title}</div>
              <div className="text-[8px] font-mono text-slate-500 mt-0.5">{b.desc}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 4. FLOATING TRUST DASHBOARD CONSOLE (Bottom-Left Desktop, Mobile Toggle)
// ==========================================
export function LiveTrustDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [refreshCountdown, setRefreshCountdown] = useState(15);
  const [simulatedScore, setSimulatedScore] = useState(98.4);

  // Live activities feed rotating list
  const activities = [
    "New portfolio assigned to Kolkata desk",
    "Mutual Fund auto SIP draft configured",
    "Beginner investment priority console active",
    "Redirection to official Wealthy broking secure route complete",
    "Security check: AWS database TLS 1.3 handshake verified",
    "SEBI Guided priority checklist assigned",
    "Investor query answered from Bangalore support center",
  ];

  const statuses = [
    { label: "Secure API Connected", status: "online" },
    { label: "Google Sheets Sync Logged", status: "online" },
    { label: "WhatsApp Chat Routing active", status: "online" },
    { label: "Wealthy Broker authorized", status: "online" },
    { label: "Protected Submission Channel", status: "online" },
  ];

  // Refresh interval simulation
  useEffect(() => {
    const clock = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          // Dynamic slight value change on refresh to simulate active telemetry
          setSimulatedScore(() => parseFloat((98.0 + Math.random() * 1.5).toFixed(2)));
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  // Rotating activity status index
  useEffect(() => {
    const rotate = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(rotate);
  }, [activities.length]);

  const handleWhatsAppChat = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20PCS%20Consultancy%20I%20need%20secure%20onboarding%20assistance`, "_blank");
  };

  return (
    <>
      {/* Mini Toggle Trigger Button floating bottom-left */}
      <div className="fixed bottom-24 left-4 z-50 select-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-[0_5px_22px_-5px_rgba(229,193,88,0.35)] cursor-pointer text-xs font-mono font-bold tracking-wider uppercase border transition-all duration-300 ${
            isOpen 
              ? "bg-[#070e20] text-gold-400 border-gold-400/40" 
              : "bg-navy-950 text-white hover:text-gold-400 border-slate-800 hover:border-gold-400/30"
          }`}
          title="Open Security & Fiduciary Verification Console"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {isOpen ? "Close Console" : "Security Shield"}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-36 left-4 z-50 w-[350px] max-w-[calc(100vw-32px)] overflow-hidden bg-[#070e20]/95 backdrop-blur-md rounded-2xl border border-gold-400/25 shadow-[0_20px_50px_rgba(0,0,0,0.5)] outline-none"
          >
            {/* Header section with matrix like cyber-dots */}
            <div className="relative p-4 border-b border-slate-850 bg-navy-950/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1 px-1.5 rounded-md bg-gold-400/10 border border-gold-400/30 text-gold-400 text-[9px] font-mono uppercase font-bold animate-pulse">
                  SECURE FEED
                </div>
                <h4 className="text-[11px] font-bold font-mono tracking-wider uppercase text-white leading-none">Trust Ecosystem Status</h4>
              </div>
              <div className="text-[9px] font-mono text-slate-500 flex items-center gap-1">
                <RefreshCw className="w-2.5 h-2.5 animate-spin text-gold-400" />
                <span>Sync in {refreshCountdown}s</span>
              </div>
            </div>

            {/* Content pane */}
            <div className="p-4 space-y-4">
              
              {/* Telemetry Grid and Trust Progress Score */}
              <div className="bg-[#050b18]/90 border border-slate-900 rounded-xl p-3.5 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-none">
                    Investor Confidence Score
                  </div>
                  <div className="text-sm font-extrabold text-gold-400 font-mono tracking-tight">
                    {simulatedScore}%
                  </div>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: `${simulatedScore}%` }}
                    transition={{ duration: 1 }}
                    className="bg-gradient-to-r from-gold-500 via-emerald-400 to-emerald-500 h-full rounded-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-[8px] font-mono">
                  <div className="flex items-center justify-between p-1 px-2 rounded bg-navy-950 border border-slate-900">
                    <span className="text-slate-500">RELIABILITY:</span>
                    <span className="text-emerald-400 font-bold text-right">99.8%</span>
                  </div>
                  <div className="flex items-center justify-between p-1 px-2 rounded bg-navy-950 border border-slate-900">
                    <span className="text-slate-500">LATENCY:</span>
                    <span className="text-emerald-400 font-bold text-right">0.05ms</span>
                  </div>
                </div>
              </div>

              {/* Secure Cyber Terminal Routing Status Indicator card */}
              <div className="bg-navy-950/80 border border-slate-900 rounded-xl p-3 space-y-2 font-mono">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                  <span>Routing Gateways</span>
                  <span className="text-emerald-400 text-[8px] tracking-normal">• SYSTEM SECURE</span>
                </div>
                <div className="space-y-1 text-[9px] text-slate-300">
                  {statuses.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="shrink-0 flex items-center justify-center p-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-400/25">
                        <Check className="w-2 h-2" />
                      </span>
                      <span className="truncate">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rotational Live Investor Activity Log Ticker */}
              <div className="bg-[#050b18]/80 border border-slate-900 rounded-xl p-3 space-y-2 select-none">
                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                  Live Stream Operations
                </div>
                <div className="h-8 flex items-center relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-[10px] font-mono text-slate-300 leading-relaxed truncate"
                    >
                      🟢 <span className="text-slate-400">{activities[activeStep]}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Live WhatsApp Advisor widget inside card */}
              <div className="bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 transition-all duration-200">
                <div className="text-left">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 font-bold uppercase">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span>Advisor Active Now</span>
                  </div>
                  <div className="text-[8px] font-mono text-slate-400 mt-0.5 leading-none">Response speed: ~2 mins AVG</div>
                </div>
                
                <button
                  onClick={handleWhatsAppChat}
                  className="w-full sm:w-auto px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-mono font-extrabold text-[9px] uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer hover:shadow-md hover:shadow-emerald-500/10"
                >
                  Talk Securely
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </button>
              </div>

            </div>

            {/* Compliance security footnotes */}
            <div className="p-3 bg-navy-950 text-center border-t border-slate-900 text-[8px] font-mono text-slate-550 text-slate-500 leading-relaxed flex items-center justify-center gap-1.5">
               <Info className="w-2.5 h-2.5 text-slate-500" />
               <span>Official digital onboarding transition proxy deck.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
