import { Check, ShieldCheck, Zap, Users, HelpCircle, Trophy } from "lucide-react";

interface TrustStat {
  value: string;
  label: string;
  sub: string;
}

const STATS: TrustStat[] = [
  { value: "5 MINS", label: "Average Setup Speed", sub: "Fully digital submission" },
  { value: "100%", label: "Paperless Redirection", sub: "Completely zero paperwork" },
  { value: "24/7", label: "WhatsApp Assistance", sub: "Human advisor backup" },
  { value: "0 FEE", label: "Demat Desk Opening", sub: "No hidden onboarding charges" },
];

const TRUST_POINTS = [
  {
    title: "Official Secure Broker Routing",
    description: "Your credentials are never stored. We route you directly to the verified SEBI-regulated Wealthy Broking server via official channels.",
  },
  {
    title: "Tailored Beginner Guidance",
    description: "Never feel left out in the dark. PCS Consultancy offers personal handholding checks if you face any validation failure during KYC.",
  },
  {
    title: "High-Priority Processing",
    description: "Leads processed through the PCS Demat Desk are assigned straight to quick-approval clusters inside the host provider database.",
  },
  {
    title: "Certified Investment Assistance",
    description: "Get curated portfolio guidance post-onboarding covering high-grade Mutual Funds, safe corporate FD baskets, and SIPs.",
  },
];

export function WhyPCS() {
  return (
    <section id="why-pcs-section" className="py-20 bg-[#020617] relative overflow-hidden border-t border-slate-900">
      {/* Visual background sparkles */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Trust text Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-xs text-emerald-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> SECURE FIDUCIARY TRUST STANDARDS
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
                Fintech Security You Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-450 to-gold-400">Rely On Unconditionally</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Opening an investment portfolio can feel intimidating. At PCS Consultancy, we serve as your direct digital transition desk, ensuring 100% data confidentiality and zero delay.
              </p>
            </div>

            {/* List of checked values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {TRUST_POINTS.map((pt, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="shrink-0 mt-1">
                    <div className="p-1 rounded-full bg-gold-400/10 border border-gold-400/40 text-gold-400">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 font-display">
                      {pt.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-900 flex flex-wrap gap-6 items-center">
              <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">Certified Trust Architecture:</div>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0b1329] border border-slate-800 text-slate-400 text-[10px] font-mono">
                  <Zap className="w-3.5 h-3.5 text-gold-400" /> INSTANT DIGILOCKER APPROVED
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0b1329] border border-slate-800 text-slate-400 text-[10px] font-mono">
                  <Users className="w-3.5 h-3.5 text-blue-400" /> 12,000+ DEMAT DESK ROUTES
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Statistics grid box */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400/5 to-blue-500/5 rounded-3xl blur-2xl" />
            
            <div className="relative bg-[#070d1e]/80 border border-gold-400/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-400/10 rounded-lg text-gold-400 text-xs font-mono mb-6">
                <Trophy className="w-4 h-4" /> LEADER IN DIGITIZED ONBOARDING
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-navy-950/70 border border-slate-800/80 rounded-2xl relative group hover:border-gold-400/20 transition-all">
                    <div className="text-lg sm:text-2xl font-extrabold text-gold-400 font-mono tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-slate-200 mt-2 font-display">
                      {stat.label}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 leading-tight font-mono">
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gold-400/5 border border-gold-400/10 text-center">
                <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                  We coordinate with host broking systems holding safe licenses. Secure, streamlined routing means your investment portfolio starts off in experienced hands.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
