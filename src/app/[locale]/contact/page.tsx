"use client";

import { motion } from "framer-motion";
import { Send, MessageCircle, Globe, Mail, MapPin, Clock, Phone, CheckCircle2, Copy, Check } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const GOALS = [
  "Weight Loss & Recomp",
  "Muscle Gain",
  "Competition Prep",
  "Sports Performance",
  "Elite Peanut Butter Order",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const t = useTranslations("Contact");

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("contact@youotmani.dz");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex flex-col lg:flex-row border-b border-white/5">
      
      {/* LEFT — Cinematic Form Section */}
      <div className="flex-1 relative z-10 px-6 md:px-16 pt-32 pb-24 flex flex-col justify-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 rounded-full border border-[#FF2A2A]/30 bg-[#FF2A2A]/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FF2A2A] animate-pulse" />
            <span className="text-[10px] font-primary font-bold tracking-[0.3em] text-white uppercase">
              {t("label")}
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-primary font-black uppercase tracking-tighter leading-[0.85] text-white mb-6">
            {t("title_line1")} <br />
            <span className="text-[#FF2A2A]">{t("title_line2")}</span>
          </h1>

          <p className="text-neutral-400 text-lg max-w-lg mb-12">
            {t("subtext")}
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-12 rounded-3xl bg-white/5 border border-white/10 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#FF2A2A]/15 border border-[#FF2A2A]/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#FF2A2A]" />
              </div>
              <h3 className="text-2xl font-primary font-black uppercase text-white mb-4">{t("success_title")}</h3>
              <p className="text-neutral-400">{t("success_p")}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-primary font-bold uppercase tracking-[0.2em] text-neutral-500">{t("first_name")}</label>
                  <input type="text" required placeholder="Youcef" className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#FF2A2A] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-primary font-bold uppercase tracking-[0.2em] text-neutral-500">{t("last_name")}</label>
                  <input type="text" required placeholder="Otmani" className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#FF2A2A] transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-primary font-bold uppercase tracking-[0.2em] text-neutral-500">{t("email")}</label>
                <input type="email" required placeholder="ton@email.com" className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#FF2A2A] transition-colors" />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-primary font-bold uppercase tracking-[0.2em] text-neutral-500 block">{t("goal_label")}</label>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map((g) => (
                    <label key={g} className="cursor-pointer">
                      <input type="radio" name="goal" value={g} className="sr-only peer" />
                      <span className="inline-block px-4 py-2 text-[10px] font-primary font-bold tracking-widest uppercase border border-white/10 text-neutral-500 rounded-full transition-all peer-checked:bg-[#FF2A2A] peer-checked:border-[#FF2A2A] peer-checked:text-white hover:text-white hover:border-white">{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-primary font-bold uppercase tracking-[0.2em] text-neutral-500">{t("why_you")}</label>
                <textarea rows={3} placeholder="Niveau, motivation, contraintes..." className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#FF2A2A] transition-colors resize-none" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative h-16 w-full md:w-auto px-12 bg-[#FF2A2A] text-white font-primary font-black text-sm tracking-[0.2em] uppercase transition-all shadow-[0_20px_40px_-5px_rgba(255,42,42,0.3)] hover:shadow-[0_25px_50px_-8px_rgba(255,42,42,0.5)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? "Processing..." : t("submit")}
                {!loading && <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* RIGHT — Cinematic Contact Sidebar */}
      <div className="flex-1 relative min-h-[500px] lg:min-h-screen overflow-hidden">
        <Image
          src="/coach-4.png"
          alt="Coach Youcef Otmani"
          fill
          className="object-cover object-top grayscale contrast-110 brightness-50"
        />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent" />

        <div className="absolute inset-0 z-10 p-6 md:p-16 flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-white font-primary font-black uppercase text-2xl tracking-tight mb-6">{t("direct_channels")}</h3>
                <div className="space-y-5">
                  <a href="https://wa.me/213540445141" target="_blank" rel="noreferrer" className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF2A2A] group-hover:border-[#FF2A2A] transition-all">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-primary font-bold tracking-[0.2em] text-[#FF2A2A] uppercase">WhatsApp</div>
                      <div className="text-white text-lg font-primary uppercase tracking-wider">+213 540 44 51 41</div>
                    </div>
                  </a>

                  <a href="https://instagram.com/youotmani" target="_blank" rel="noreferrer" className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF2A2A] group-hover:border-[#FF2A2A] transition-all">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-primary font-bold tracking-[0.2em] text-[#FF2A2A] uppercase">Instagram</div>
                      <div className="text-white text-lg font-primary uppercase tracking-wider">@youotmani</div>
                    </div>
                  </a>

                  <a href="https://www.linkedin.com/in/youcef-otmani-7b3807356/" target="_blank" rel="noreferrer" className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF2A2A] group-hover:border-[#FF2A2A] transition-all">
                      <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="w-5 h-5 text-white"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] font-primary font-bold tracking-[0.2em] text-[#FF2A2A] uppercase">LinkedIn</div>
                      <div className="text-white text-lg font-primary uppercase tracking-wider">Youcef Otmani</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-5 group relative">
                    <a href="mailto:contact@youotmani.dz" className="flex items-center gap-5 flex-1">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF2A2A] group-hover:border-[#FF2A2A] transition-all">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[10px] font-primary font-bold tracking-[0.2em] text-[#FF2A2A] uppercase">Email</div>
                        <div className="text-white text-lg font-primary uppercase tracking-wider">contact@youotmani.dz</div>
                      </div>
                    </a>
                    
                    <button 
                      onClick={copyEmail}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-neutral-500 hover:text-white"
                      title="Copy Email"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>

                    {copiedEmail && (
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#FF2A2A] text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                        Copied to Clipboard!
                      </span>
                    )}
                  </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-white/10">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF2A2A]" />
                <div>
                  <div className="text-[10px] font-primary font-bold tracking-[0.2em] text-neutral-500 uppercase">{t("location_label")}</div>
                  <div className="text-white text-sm font-bold uppercase tracking-widest mt-1">{t("location")}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#FF2A2A]" />
                <div>
                  <div className="text-[10px] font-primary font-bold tracking-[0.2em] text-neutral-500 uppercase">{t("response_time_label")}</div>
                  <div className="text-white text-sm font-bold uppercase tracking-widest mt-1">{t("response_time")}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </main>
  );
}
