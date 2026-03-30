"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { MagneticCard } from "@/components/MagneticCard";
import { ArrowRight, ChevronDown, Zap, Target, Brain } from "lucide-react";
import { RevealText, RevealWords } from "@/components/RevealText";

// ── Staggered letter reveal ──────────────────────────────────────────────────
function SplitText({ text, className, locale }: { text: string; className?: string; locale?: string }) {
  if (!text) return null;
  
  if (locale === 'ar') {
    return (
      <span className={`inline-block overflow-hidden ${className ?? ""}`}>
        <motion.span
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </span>
    );
  }

  return (
    <span className={`inline-block overflow-hidden ${className ?? ""}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.05 * i + 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// ── Stat badge for hero ──────────────────────────────────────────────────────
function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center px-6 py-4 border border-white/10 bg-white/5 backdrop-blur-md">
      <span className="text-2xl font-primary font-bold text-white">{value}</span>
      <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mt-1">{label}</span>
    </div>
  );
}

const marqueeItems = [
  "+200 Athlètes Transformés", "★ ★ ★ ★ ★",
  "Coaching Science-Based", "★ ★ ★ ★ ★",
  "#1 Coach DZ", "★ ★ ★ ★ ★",
  "Résultats Prouvés", "★ ★ ★ ★ ★",
  "Transformation Réelle", "★ ★ ★ ★ ★",
];

export default function Home() {
  const locale = useLocale();
  const t = useTranslations("Hero");
  const b = useTranslations("Bio");
  const m = useTranslations("Manifesto");
  const p = useTranslations("Pillars");
  
  const heroRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const isManifestoVisible = useInView(manifestoRef, { once: true, margin: "-20%" });
  const pillarsRef = useRef<HTMLDivElement>(null);
  const isPillarsVisible = useInView(pillarsRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-black text-white">

      {/* ════════════════════════════════════════════
          SECTION 1 — CINEMATIC HERO
      ════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex items-end pb-24 md:pb-32 overflow-hidden bg-[#030303]"
      >
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Portrait of Youcef — fills the whole hero */}
          <div className="absolute inset-0 w-full h-full opacity-70">
            <Image
              src="/coach-hero.jpg"
              alt="Youcef Otmani"
              fill
              priority
              className="object-cover object-[center_30%] grayscale contrast-105 brightness-95"
            />
            {/* Left fade — gives text contrast smoothly 50/50 */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/95 via-black/70 via-50% to-transparent" />
            {/* Bottom fade into page */}
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black to-transparent" />
            {/* Top fade into navbar */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
          </div>

          {/* Static 3D crystal layer — Right side 50/50 gradient mask */}
          <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden flex items-center justify-end">
            <div 
              className="w-full h-full absolute inset-0 opacity-60 mix-blend-screen"
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 40%, black 60%, black 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, transparent 40%, black 60%, black 100%)"
              }}
            >
              {/* Scaled-down wrapper to shrink shards, feathered heavily on all sides so no straight bounding boxes are visible */}
              <div 
                className="absolute top-1/2 right-0 -translate-y-1/2 w-[120vw] h-[70vh] md:w-[70vw] md:h-[80vh]"
                style={{
                  WebkitMaskImage: "radial-gradient(ellipse at center right, black 20%, transparent 80%)",
                  maskImage: "radial-gradient(ellipse at center right, black 20%, transparent 80%)"
                }}
              >
                <Image
                  src="/spline-bg-home.png"
                  alt=""
                  fill
                  priority
                  className="object-cover object-right"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Layer - Positioned Left */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 px-6 md:px-16 w-full md:w-[60%] lg:w-[55%] pt-32 pb-12 flex flex-col justify-end h-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-5 py-2 mb-10 border border-white/10 bg-white/5 backdrop-blur-md w-fit"
          >
            <span className="w-2 h-2 bg-[#FF2A2A] shadow-[0_0_15px_rgba(255,42,42,0.8)] animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-white uppercase">
              {t("title")}
            </span>
          </motion.div>

          <h1 className="font-primary font-black uppercase leading-[0.82] tracking-tighter">
            <div className="overflow-hidden pb-1">
              <SplitText
                text={t("name1")}
                locale={locale}
                className="block text-[clamp(2.75rem,12vw,9rem)] text-white drop-shadow-2xl"
              />
            </div>
            <div className="overflow-hidden pb-3 -mt-4 md:-mt-8">
              <SplitText
                text={t("name2")}
                locale={locale}
                className="block text-[clamp(2.75rem,12vw,9rem)] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.6)]"
              />
            </div>
            <div className="overflow-hidden mt-6">
              <motion.span
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[clamp(0.9rem,3vw,1.8rem)] font-sans font-light tracking-[0.35em] text-neutral-400 uppercase"
              >
                {t("role_word1")}<span className="text-[#FF2A2A] font-bold mx-2">/</span>{t("role_word2")}
              </motion.span>
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 space-y-3"
          >
            <p className="text-sm md:text-base font-primary font-bold tracking-[0.08em] text-[#FF2A2A] uppercase">
              {b("cert_1")}
            </p>
            <p className="text-xs md:text-sm text-neutral-500 uppercase tracking-widest leading-relaxed max-w-lg">
              {b("cert_2")}
            </p>
            <p className="text-base md:text-lg text-neutral-400 max-w-xl leading-relaxed mt-4">
              {b("description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="mt-10 flex flex-col sm:flex-row items-start gap-4"
          >
            <Link
              href="/pricing"
              className="group relative flex h-14 items-center gap-3 overflow-hidden bg-[#FF2A2A] pl-8 pr-6 text-white active:scale-95 transition-transform"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative font-primary font-bold tracking-[0.15em] text-sm uppercase">
                {t("cta_primary")}
              </span>
              <ArrowRight className="w-4 h-4 relative transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/transformations"
              className="flex h-14 items-center gap-3 border border-white/20 px-8 text-white hover:bg-white/5 hover:border-white/50 transition-all active:scale-95"
            >
              <span className="font-primary font-bold tracking-[0.15em] text-sm uppercase">
                {t("cta_secondary")}
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="mt-12 flex gap-4 flex-wrap"
          >
            <StatBadge value="+200" label="Athlètes" />
            <StatBadge value="5★" label="Satisfaction" />
            <StatBadge value="4y+" label="Expérience" />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-primary tracking-[0.3em] text-neutral-500 uppercase">{t("scroll_hint")}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-neutral-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — MARQUEE PROOF BAR
      ════════════════════════════════════════════ */}
      <section className="relative w-full py-8 border-y border-white/5 overflow-hidden bg-[#050505]">
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-16 pr-16"
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="text-xs md:text-sm font-primary font-bold tracking-[0.2em] text-neutral-500 uppercase flex items-center gap-2"
              >
                {item.includes("★") ? (
                  <span className="text-[#FF2A2A]">{item}</span>
                ) : item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3 — IDENTITY / MANIFESTO
      ════════════════════════════════════════════ */}
      <section
        ref={manifestoRef}
        className="relative w-full min-h-screen flex items-center px-6 md:px-16 py-32 overflow-hidden"
      >
        <div className="absolute left-10 lg:left-[5vw] top-0 bottom-0 w-[45%] hidden lg:block overflow-hidden">
          <motion.div 
            initial={{ scale: 1.05, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/coach-1.png"
              alt="Youcef Otmani Training"
              fill
              className="object-cover object-left-top grayscale brightness-90 contrast-110"
            />
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black to-transparent" />
            <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-black to-transparent" />
          </motion.div>
        </div>

        <div className="relative z-10 ml-auto max-w-xl lg:max-w-lg">
          <RevealText delay={0} direction="up" className="text-[#FF2A2A] font-primary font-bold tracking-[0.3em] text-xs uppercase">
            {m("label")}
          </RevealText>

          <div className="mt-4 text-3xl md:text-5xl lg:text-6xl font-primary font-black uppercase tracking-tighter leading-[0.88] text-white">
            <RevealWords text={m("title_line1")} delay={0.1} /> <br />
            <span className="text-neutral-500"><RevealWords text={m("title_line2")} delay={0.2} /></span>
          </div>

          <div className="mt-8 space-y-6">
            {[m("p1"), m("p2"), m("p3")].map((text, i) => (
              <RevealText
                key={i}
                delay={0.3 + i * 0.15}
                className="text-neutral-400 leading-relaxed text-lg"
              >
                {text}
              </RevealText>
            ))}
          </div>

          <RevealText delay={0.8} direction="left" className="mt-12">
            <Link
              href="/transformations"
              className="group inline-flex items-center gap-3 text-white font-primary font-bold tracking-[0.2em] uppercase text-sm border-b-2 border-[#FF2A2A] pb-1 hover:gap-5 transition-all"
            >
              {m("cta")} <ArrowRight className="w-4 h-4 text-[#FF2A2A]" />
            </Link>
          </RevealText>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4 — 3D MAGNETIC PILLAR CARDS
      ════════════════════════════════════════════ */}
      <section
        ref={pillarsRef}
        className="relative w-full py-32 px-6 md:px-16 bg-[#030303] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20"
          >
            <div>
              <span className="text-[#FF2A2A] font-primary font-bold tracking-[0.3em] text-xs uppercase block mb-4">
                {p("label")}
              </span>
              <h2 className="text-4xl md:text-7xl font-primary font-black uppercase tracking-tighter text-white leading-[0.85]">
                {p("title_line1")}<br />{p("title_line2")}
              </h2>
            </div>
            <p className="text-neutral-500 text-sm md:text-base max-w-sm leading-relaxed md:text-right font-light">
              {p("subtext")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num, i) => {
              const Icon = i === 0 ? Zap : i === 1 ? Target : Brain;
              const title = p(`p${num}_title`);
              const desc = p(`p${num}_desc`);
              const image = i === 0 ? "/coach-3.png" : i === 1 ? "/coach-6.jpg" : "/coach-7.jpg";

              return (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MagneticCard
                     intensity={12}
                     className="group relative overflow-hidden cursor-default h-[400px] md:h-[500px] bg-[#030303]"
                  >
                    {/* Animated Spinning Edge Light */}
                    <div className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#FF2A2A_360deg)] animate-[spin_4s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    {/* Inner Card Surface (Leaves 1px edge visible) */}
                    <div className="absolute inset-[1px] z-10 bg-[#050505] overflow-hidden">
                      {/* Sub-Border to give depth */}
                      <div className="absolute inset-0 border border-white/5 z-20 pointer-events-none" />

                      <div className="absolute inset-0 z-0 pointer-events-none">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-cover object-top grayscale opacity-40 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
                      </div>

                      <div className="absolute top-4 right-6 z-10 select-none pointer-events-none">
                        <span className="text-[10rem] font-primary font-black leading-none text-white/[0.08] group-hover:text-white/[0.15] transition-colors duration-500">
                          0{num}
                        </span>
                      </div>

                    <div className="relative z-10 h-full flex flex-col justify-end p-10">
                      <div className="mb-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                        <Icon className="w-8 h-8 text-[#FF2A2A]" />
                      </div>
                      <h3 className="text-4xl font-primary font-black uppercase tracking-tight text-white leading-none mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                        {title}
                      </h3>
                      <div className="max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500 ease-out">
                        <p className="text-neutral-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                          {desc}
                        </p>
                      </div>
                    </div>
                    </div>
                  </MagneticCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 5 — COACH GALLERY / LIFESTYLE
      ════════════════════════════════════════════ */}
      <section className="relative w-full py-32 px-6 md:px-16 bg-[#030303] overflow-hidden border-t border-white/5">
        {/* Adds a dynamic red ambient glow behind the gallery for contrast */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[#FF2A2A] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="text-[#FF2A2A] font-primary font-bold tracking-[0.3em] text-xs uppercase">
              Lifestyle
            </span>
            <h2 className="mt-4 text-3xl md:text-6xl font-primary font-black uppercase text-white tracking-tighter">
              {t("lifestyle_title")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-center">
            {[
              { src: "/coach-3.png", ratio: "aspect-[3/5.5]" },
              { src: "/lifestyle-1.png", ratio: "aspect-[3/4]" },
              { src: "/lifestyle-2.png", ratio: "aspect-[3/4]" },
              { src: "/lifestyle-video.mp4", ratio: "aspect-[3/5.5]" }
            ].map((media, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden bg-neutral-900 border border-white/5 ${media.ratio}`}
              >
                {/* Subtle red tint overlay on hover for contrast */}
                <div className="absolute inset-0 bg-[#FF2A2A]/0 group-hover:bg-[#FF2A2A]/10 transition-colors duration-700 z-10 pointer-events-none" />
                
                {media.src.endsWith(".mp4") ? (
                  <video
                    src={media.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.8] contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                  />
                ) : (
                  <Image
                    src={media.src}
                    alt="Youcef Otmani Lifestyle"
                    fill
                    className="object-cover object-top grayscale-[0.8] contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 z-[5] pointer-events-none" />
                
                {/* Frame corners for the "Elite" aesthetic */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FF2A2A]/0 group-hover:border-[#FF2A2A] transition-colors duration-700 z-20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FF2A2A]/0 group-hover:border-[#FF2A2A] transition-colors duration-700 z-20 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 6 — CALL TO ACTION (VIDEO)
      ════════════════════════════════════════════ */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <video
          src="/workout-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        
        <div className="relative z-10 text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-8xl font-primary font-black uppercase tracking-tighter text-white"
          >
            {t("ready_text")} <br />
            <span className="text-[#FF2A2A]">{t("shatter_text")}</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <Link
              href="/pricing"
              className="inline-flex h-16 items-center px-12 bg-white text-black font-primary font-black text-lg tracking-[0.2em] uppercase hover:bg-[#FF2A2A] hover:text-white transition-all duration-500 active:scale-95"
            >
              {t("cta_start")}
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
