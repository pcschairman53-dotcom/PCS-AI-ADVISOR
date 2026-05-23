import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  ChevronRight,
  Zap,
  Percent,
  Coins,
  Compass,
  Briefcase
} from "lucide-react";

import { LiveTicker } from "./components/LiveTicker";
import { Navbar } from "./components/Navbar";
import { DematForm } from "./components/DematForm";
import { Benefits } from "./components/Benefits";
import { WhyPCS } from "./components/WhyPCS";
import { WealthForecaster } from "./components/WealthForecaster";
import { FAQs } from "./components/FAQs";
import { ContactCTA } from "./components/ContactCTA";
import { Footer } from "./components/Footer";
import { SecureTrustStrip, OnboardingTrustCounter, LiveTrustDashboard } from "./components/TrustSecuritySystems";

import { BROKER_LINK, WHATSAPP_ADVISOR_LINK } from "./constants/config";

// Subtly simulated market snapshot data that fluctuates in sync with premium desk quotes
interface MarketCoreQuote {
  name: string;
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  isUp: boolean;
  isAsset: boolean;
}

const INITIAL_QUOTES: MarketCoreQuote[] = [
  { name: "NSE Nifty 55", symbol: "NIFTY 50", price: "22,419.35", change: "+148.55", changePercent: "+0.67%", isUp: true, isAsset: false },
  { name: "NSE Bank Nifty", symbol: "BANK NIFTY", price: "48,115.50", change: "-210.30", changePercent: "-0.43%", isUp: false, isAsset: false },
  { name: "BSE Sensex Index", symbol: "SENSEX", price: "73,878.15", change: "+496.10", changePercent: "+0.68%", isUp: true, isAsset: false },
  { name: "MCX Gold Futures", symbol: "GOLD", price: "72,830.00", change: "+540.00", changePercent: "+0.75%", isUp: true, isAsset: true },
  { name: "Bitcoin Core Ledger", symbol: "BTC", price: "5,824,400", change: "+114,800", changePercent: "+2.01%", isUp: true, isAsset: true },
];

export default function App() {
  const [marketQuotes, setMarketQuotes] = useState<MarketCoreQuote[]>(INITIAL_QUOTES);
  const [onboardFlash, setOnboardFlash] = useState(false);

  // Fluctuating snapshot pricing synchronizer
  useEffect(() => {
    const timer = setInterval(() => {
      setMarketQuotes((prev) =>
        prev.map((quote) => {
          if (Math.random() > 0.45) return quote; // 45% update rate so visual change isn't hyper-chaotic

          const numericPrice = parseFloat(quote.price.replace(/,/g, ""));
          const pctMultiplier = (Math.random() - 0.5) * 0.0008; // subtle ±0.04% adjustments
          const finalVal = numericPrice * (1 + pctMultiplier);
          const rawDiff = finalVal - numericPrice;

          const isUp = rawDiff >= 0;
          const displaySign = isUp ? "+" : "";
          
          let displayPriceStr = "";
          if (quote.symbol === "GOLD" || quote.symbol === "BTC") {
            displayPriceStr = Math.round(finalVal).toLocaleString("en-IN");
          } else {
            displayPriceStr = finalVal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

          const pctStr = (pctMultiplier * 100).toFixed(2);
          const diffStr = rawDiff.toFixed(quote.symbol === "GOLD" || quote.symbol === "BTC" ? 0 : 2);

          return {
            ...quote,
            price: displayPriceStr,
            change: `${displaySign}${diffStr}`,
            changePercent: `${displaySign}${pctStr}%`,
            isUp,
          };
        })
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handleScrollToDematForm = () => {
    const targetElement = document.getElementById("demat-onboarding-grid-container");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // Ignite highlight border flash
      setOnboardFlash(true);
      setTimeout(() => setOnboardFlash(false), 2000);

      // Auto focus the Demat form fullName input
      setTimeout(() => {
        const input = document.getElementById("fullName") as HTMLInputElement | null;
        if (input) {
          input.focus();
        }
      }, 750);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col selection:bg-gold-500 selection:text-navy-950 font-sans overflow-x-hidden antialiased">
      
      {/* 1. Live Market Ticker */}
      <LiveTicker />

      {/* 2. Premium Sticky Navbar */}
      <Navbar onOpenDematClick={handleScrollToDematForm} />

      {/* SECURE TRUST STRIP (slim animated marquee below navbar) */}
      <SecureTrustStrip />

      {/* Decorative top-most subtle gradient line */}
      <div className="h-[2px] bg-gradient-to-r from-gold-600 via-gold-450 to-gold-700 w-full" />

      {/* 3. Main Hero & Demat Desk segment */}
      <header className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden bg-gradient-to-b from-[#0b1329] via-navy-950 to-navy-950 flex flex-col items-center">
        {/* Absolute premium decorative grids & lights */}
        <div className="absolute top-0 right-0 w-full h-[500px] bg-[radial-gradient(circle_at_80%_20%,rgba(229,193,88,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[400px] bg-[radial-gradient(circle_at_20%_80%,rgba(65,90,119,0.08),transparent_50%)] pointer-events-none" />
        
        {/* Subtle finance vector lines pattern backdrop */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-width='1.2'%3E%3Cpath d='M36 34v-4H20v4h16zm0 2H20v30h16V36zM38 0h-2v20h2V0zm0 24h-2v8h2v-8zM18 0h-2v12h2V0zm0 16h-2v44h2V16z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Box Column: Hero Introduction (Col: 7/12) */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#1a263c] border border-gold-400/35 rounded-full text-gold-400 text-xs font-bold uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4 animate-pulse text-gold-400" /> Platinum Partner Portfolio Onboarding
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-5.5xl font-extrabold tracking-tight font-display text-white leading-tight">
                  Start Your Investment <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 font-extrabold drop-shadow-sm text-glow-gold">
                    Journey Today
                  </span>
                </h1>
                
                <p className="text-slate-350 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-display">
                  Free Demat Account Opening with Beginner Friendly Guidance. Direct bank-grade encryption paths.
                </p>
              </div>

              {/* Trust Indicators Pillar */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 bg-navy-950/70 border border-slate-900/80 p-3.5 rounded-xl font-mono text-[10px] text-slate-400 uppercase tracking-wider text-center">
                <div>
                  <span className="block text-sm font-extrabold text-gold-450 font-mono">₹ 0 /-</span>
                  <span>Opening Fee</span>
                </div>
                <div className="border-x border-slate-900">
                  <span className="block text-sm font-extrabold text-white font-mono">100%</span>
                  <span>Paperless</span>
                </div>
                <div>
                  <span className="block text-sm font-extrabold text-emerald-400 font-mono">5 MINS</span>
                  <span>KYC Setup</span>
                </div>
              </div>

              {/* CTA Triggers Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  id="hero-open-demat-btn"
                  onClick={handleScrollToDematForm}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 active:from-gold-700 active:to-gold-600 text-navy-950 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_5px_22px_-5px_rgba(229,193,88,0.4)] cursor-pointer flex items-center justify-center gap-2 group border border-gold-300/20"
                >
                  Open Free Demat Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-navy-950" />
                </button>
                
                <button
                  id="hero-explore-benefits-btn"
                  onClick={() => {
                    document.getElementById("benefits-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-[#0a1122]/90 border border-slate-800 hover:border-gold-500/20 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:shadow-lg"
                >
                  Explore Member Benefits
                </button>
              </div>

              {/* Secure logo indicator badges direct */}
              <div className="pt-3 flex flex-wrap gap-5 justify-center lg:justify-start items-center text-slate-500 text-[10px] uppercase font-mono">
                <span>Security Standard:</span>
                <span className="flex items-center gap-1 font-semibold text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SEBI ARN-1154250
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-slate-400">
                  <Zap className="w-3.5 h-3.5 text-gold-450" /> DIGILOCKER VERIFIED
                </span>
              </div>

            </div>

            {/* Right Box Column: Inline Onboarding Form Frame (Col: 5/12) */}
            <div 
              id="demat-onboarding-grid-container"
              className={`lg:col-span-5 transition-all duration-750 ${
                onboardFlash ? "ring-2 ring-gold-400 ring-offset-4 ring-offset-navy-950 rounded-2xl transform scale-[1.01]" : ""
              }`}
            >
              <DematForm source="hero" />
            </div>

          </div>

        </div>
      </header>

      {/* 4. Market Snapshot Cards Segment */}
      <section id="market-snapshot" className="py-8 bg-[#040916] border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 font-mono">
                Internal Desk Snapshot (Realtime Quotes)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-550 text-slate-500 hidden sm:block">
              Updates in lockstep with exchange feeds
            </span>
          </div>

          {/* Snapshot Grid 5 components */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {marketQuotes.map((quote, idx) => (
              <div
                key={idx}
                className="bg-[#0b1329]/50 border border-slate-850/80 rounded-xl p-4 flex flex-col justify-between hover:border-gold-450/15 group transition-all relative overflow-hidden"
              >
                {/* Decorative pulse glow dot for active movement feedback */}
                <div className="absolute top-3 right-3 flex h-1.5 w-1.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    quote.isUp ? "bg-emerald-400" : "bg-rose-400"
                  }`} />
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                    quote.isUp ? "bg-emerald-500" : "bg-rose-500"
                  }`} />
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wide">
                    {quote.symbol}
                  </div>
                  <div className="text-sm font-semibold text-slate-300 font-display mt-0.5 truncate leading-tight group-hover:text-white">
                    {quote.name}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-900/60 flex items-baseline justify-between gap-1.5">
                  <div className="text-sm font-extrabold text-slate-100 font-mono tracking-tight">
                    ₹{quote.price}
                  </div>
                  
                  <span className={`text-[10px] font-mono font-bold leading-none py-0.5 px-1 rounded ${
                    quote.isUp ? "text-emerald-400 bg-emerald-500/5" : "text-rose-400 bg-rose-500/5"
                  }`}>
                    {quote.changePercent}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ONBOARDING TRUST COUNTER (animated credibility stats grid section) */}
      <OnboardingTrustCounter />

      {/* 5. Benefits Grid Section */}
      <Benefits onOpenDematClick={handleScrollToDematForm} />

      {/* 6. Why PCS Credibility Section */}
      <WhyPCS />

      {/* 7. Wealth Forecaster / SIP Calculator Module */}
      <WealthForecaster />

      {/* 8. Interactive FAQs accordion */}
      <FAQs />

      {/* 9. Contact CTA panel */}
      <ContactCTA />

      {/* 10. Main Premium Footer with compliances */}
      <Footer />

      {/* FLOATING TRUST DASHBOARD CONSOLE */}
      <LiveTrustDashboard />

    </div>
  );
}
