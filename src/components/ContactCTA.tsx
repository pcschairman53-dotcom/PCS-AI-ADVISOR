import React, { useState } from "react";
import { MessageSquare, PhoneCall, Link, ShieldCheck, Mail, Sparkles, ArrowRight } from "lucide-react";
import { BROKER_LINK, WHATSAPP_NUMBER, SUPPORT_EMAIL } from "../constants/config";
import { submitLead } from "../utils/submitLead";
import { PcsLogo } from "./PcsLogo";

export function ContactCTA() {
  const [activeTab, setActiveTab] = useState<"instant" | "callback">("instant");
  
  // Callback Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("General Wealth Consultation");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20PCS%20Consultancy%20I%20need%20investment%20guidance`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:+91${WHATSAPP_NUMBER}`;
  };

  const handleDemat = () => {
    window.open(BROKER_LINK, "_blank");
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = phone.replace(/\D/g, "");
    if (!name.trim()) {
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "Full Name is required" }));
      return;
    }
    if (!cleanPhone || cleanPhone.length < 10) {
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "Enter valid mobile number" }));
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLead({
        name: name.trim(),
        phone: cleanPhone,
        city: topic,
        time: new Date().toLocaleString()
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "Callback Scheduled!" }));
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "Lead Synced Successfully" }));

      // Redirect to WhatsApp
      setTimeout(() => {
        const waText = `Hello PCS Consultancy\n\nI just scheduled a callback request regarding "${topic}". Please connect with me.`;
        try {
          window.open(`https://wa.me/919330457995?text=${encodeURIComponent(waText)}`, "_blank");
        } catch (wErr) {
          console.warn("WhatsApp blocked:", wErr);
        }
      }, 1000);

      // Redirect to Wealthy Broker
      setTimeout(() => {
        try {
          window.open("https://wealthy.in/broking?rcode=tanma54250", "_blank");
        } catch (bErr) {
          console.warn("Broker redirect blocked:", bErr);
        }
      }, 2500);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      window.dispatchEvent(new CustomEvent("show-pcs-toast", { detail: "Submission failed" }));
    }
  };

  return (
    <section id="contacts-section" className="py-20 bg-gradient-to-b from-[#050b18] to-[#020617] relative">
      {/* Background soft highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="glass-card rounded-3xl border-gold-400/15 overflow-hidden shadow-2xl bg-gradient-to-r from-navy-900 to-[#040816] p-8 sm:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: text content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex justify-center sm:justify-start mb-4">
                <PcsLogo className="h-7 w-auto" showText={true} />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/5 rounded-full text-gold-400 text-xs font-mono border border-gold-400/20">
                <ShieldCheck className="w-3.5 h-3.5" /> OFFICIAL BROKERAGE INTEGRATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
                Ready to Start Growing <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">Your Wealth Portfolio?</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Connect directly with certified onboarding guides to complete your paperless profile, resolve errors instantly, or schedule an automated secure advisor callback.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1">✔ SEBI ID Partner</span>
                <span className="flex items-center gap-1">✔ Bank-Grade Encryption</span>
                <span className="flex items-center gap-1">✔ Free Dedicated Onboard Pack</span>
              </div>
            </div>

            {/* Right Column: CTA Buttons stack or Callback Form */}
            <div className="lg:col-span-6 space-y-5 relative overflow-hidden">
              {/* Backing low-opacity ghost logo watermark */}
              <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none select-none">
                <PcsLogo className="h-32 w-auto" showText={false} />
              </div>
              
              {/* Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-navy-950/80 border border-slate-805 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab("instant")}
                  className={`py-2 px-3 text-center rounded-lg text-xs font-mono transition-all uppercase tracking-wide cursor-pointer select-none ${
                    activeTab === "instant"
                      ? "bg-gold-500 text-navy-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  🚀 Instant Portals
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("callback");
                    setIsSuccess(false);
                  }}
                  className={`py-2 px-3 text-center rounded-lg text-xs font-mono transition-all uppercase tracking-wide cursor-pointer select-none ${
                    activeTab === "callback"
                      ? "bg-gold-500 text-navy-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  📞 Request Callback
                </button>
              </div>

              {activeTab === "instant" ? (
                <div className="space-y-4">
                  {/* WhatsApp Card */}
                  <button
                    id="contact-whatsapp-btn"
                    onClick={handleWhatsApp}
                    className="w-full text-left p-4 rounded-2xl bg-[#091526]/80 hover:bg-[#0c1f38] border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-100 font-display">Chat with WhatsApp Advisor</h3>
                        <p className="text-xs text-emerald-400 mt-0.5 font-mono">Instant Support desk (24/7)</p>
                      </div>
                    </div>
                    <div className="p-1.5 rounded-full bg-slate-900 text-slate-400 group-hover:text-emerald-400 group-hover:bg-[#020617] transition-all">
                      <Link className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Instant Redirection Link */}
                  <button
                    id="contact-demat-btn"
                    onClick={handleDemat}
                    className="w-full text-left p-4 rounded-2xl bg-[#12161f]/80 hover:bg-[#191e2a] border border-gold-400/20 hover:border-gold-400/40 transition-all flex items-center justify-between group cursor-pointer animate-pulse"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-xl bg-gold-400/10 text-gold-400 animate-pulse">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-100 font-display">Open Premium Demat Desk</h3>
                        <p className="text-xs text-gold-400 mt-0.5 font-mono">100% Free Paperless Link</p>
                      </div>
                    </div>
                    <div className="p-1.5 rounded-full bg-slate-900 text-slate-400 group-hover:text-gold-400 group-hover:bg-[#020617] transition-all">
                      <Link className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Call Support Button */}
                  <div className="flex gap-4">
                    <button
                      id="contact-call-btn"
                      onClick={handleCall}
                      className="flex-1 p-3.5 rounded-xl bg-navy-950/90 hover:bg-navy-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold font-display uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <PhoneCall className="w-4 h-4 text-gold-450" />
                      Call Support
                    </button>
                    <a
                      href={`mailto:${SUPPORT_EMAIL}`}
                      className="p-3.5 rounded-xl bg-navy-950/90 hover:bg-navy-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold font-display uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Mail className="w-4 h-4 text-blue-450" />
                      Email Desk
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-[#070e20]/90 border border-gold-400/20 rounded-2xl p-5 space-y-4">
                  {!isSuccess ? (
                    <form onSubmit={handleCallbackSubmit} className="space-y-3">
                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your official document name"
                          className="w-full px-3 py-2 rounded bg-navy-950 font-mono text-xs text-white border border-slate-800 focus:outline-none focus:ring-1 focus:ring-gold-400/40"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                          WhatsApp Enabled Mobile Number
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-mono border-r border-slate-800 pr-2">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            placeholder="10-digit number"
                            className="w-full pl-14 pr-3 py-2 rounded bg-navy-950 font-mono text-xs text-white border border-slate-800 focus:outline-none focus:ring-1 focus:ring-gold-400/40"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                          Callback Topic Descriptor
                        </label>
                        <select
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-navy-950 font-mono text-xs text-white border border-slate-800 focus:outline-none focus:ring-1 focus:ring-gold-400/40"
                        >
                          <option value="General Wealth Consultation">General Wealth Consultation</option>
                          <option value="Mutual Fund Desk Activation">Mutual Fund Desk Activation</option>
                          <option value="Strategic SIP Milestone Setup">Strategic SIP Milestone Setup</option>
                          <option value="IPO Premium Priority Access">IPO Premium Priority Access</option>
                          <option value="Beginner Safe Learning Mode">Beginner Safe Learning Mode</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-450 hover:to-gold-550 text-navy-950 font-bold font-display text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {isSubmitting ? "Syncing Secure Server..." : "Request Call Now"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  ) : (
                    <div className="py-6 text-center space-y-3 font-mono">
                      <Sparkles className="w-10 h-10 text-emerald-400 mx-auto animate-pulse" />
                      <h4 className="text-xs font-bold text-emerald-400 uppercase">Interactive Call Queued</h4>
                      <p className="text-[10px] text-slate-300 leading-relaxed max-w-xs mx-auto">
                        Your callback request has been logged on line A-D under "{topic}". Redirecting to advisor chat...
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
