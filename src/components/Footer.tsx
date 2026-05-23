import { Shield, Phone, Mail, Clock, ShieldAlert } from "lucide-react";
import { SUPPORT_EMAIL, WHATSAPP_NUMBER } from "../constants/config";
import { PcsLogo } from "./PcsLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="premium-footer" className="bg-[#010309] border-t border-slate-900 pt-16 pb-8 relative overflow-hidden">
      {/* Structural bottom light shine */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Column 1: Brand details (Col: 5/12) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <PcsLogo className="h-10 w-auto" showText={true} />
            </div>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              We leverage safe, state-of-the-art fintech routing corridors to onboard ambitious wealth creators onto the Wealthy Broking dashboard cleanly, with premium personal advisor backings.
            </p>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
              <Clock className="w-3.5 h-3.5 text-gold-400/85" />
              <span>Support Working Timing: 09:00 AM - 08:30 PM (IST)</span>
            </div>
          </div>

          {/* Column 2: Quick navigation (Col: 3/12) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 font-mono">Quick Access</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => document.getElementById("benefits-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-slate-400 hover:text-gold-400 transition-colors"
                >
                  Member Privileges
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("why-pcs-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-slate-400 hover:text-gold-400 transition-colors"
                >
                  Security Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("wealth-forecaster-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-slate-400 hover:text-gold-400 transition-colors"
                >
                  Wealth Forecaster (SIP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("faqs-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-slate-400 hover:text-gold-400 transition-colors"
                >
                  Faq Center
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact card links (Col: 4/12) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 font-mono">Consultancy Headquarters</h4>
            <div className="space-y-3">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-navy-950 border border-slate-800 text-gold-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="block text-slate-500 font-mono font-semibold">Priority Helpline</span>
                  <a href={`tel:+919330457995`} className="font-semibold text-slate-200 hover:text-gold-400 font-mono transition-colors">
                    +91 93304 57995
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-navy-950 border border-slate-800 text-blue-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="block text-slate-500 font-mono font-semibold">Direct Desk Email</span>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-slate-200 hover:text-gold-400 font-mono transition-colors">
                    pcschairman53@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory SEBI Disclosure Footnote as standard fintech demands */}
        <div className="pt-8 border-t border-slate-900 space-y-4">
          <div className="p-4 bg-navy-950/40 rounded-xl border border-slate-950 text-[10px] text-slate-550 max-w-5xl leading-relaxed font-mono flex gap-3 text-slate-500">
            <ShieldAlert className="w-4 h-4 text-amber-500/80 shrink-0 mt-0.5" />
            <div>
              <strong>Standard Market Disclaimer:</strong> Investment in securities market are subject to market risks. Read all the related documents carefully before investing. PCS Consultancy is an independent digitized support onboarding desk coordinating with Wealthy Broking for client registration, identification, and routing support. Final account activations, trading controls, and financial clearing services are provided under full licensing of the host broker. We do not solicit personal banking PINs or security passwords. Protect credentials actively.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-550 font-mono text-slate-500">
            <span>© {currentYear} PCS Consultancy Premium Demat Desk. All Human Rights Reserved.</span>
            <div className="flex gap-4">
              <span>SEBI Registration Associated ID: ARN-1154250</span>
              <span>•</span>
              <span>Encrypted via AES 256 TLS 1.3</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
