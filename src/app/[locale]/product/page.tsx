"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticCard } from "@/components/MagneticCard";
import { ShoppingBag, ChevronDown, Droplets, FlameKindling, Leaf, Star, Zap, Info, ShieldCheck } from "lucide-react";
import { OrderModal } from "@/components/OrderModal";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ProductPage() {
  const t = useTranslations("Product");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const macros = [
    { icon: ShoppingBag, label: t("macro_protein"), value: "30g", sub: "/ 100g" },
    { icon: Droplets, label: t("macro_fat"), value: "52g", sub: "/ 100g" },
    { icon: FlameKindling, label: t("macro_calories"), value: "600", sub: "kcal / 100g" },
    { icon: Leaf, label: t("macro_palm"), value: "0%", sub: t("macro_natural") },
  ];

  return (
    <main ref={containerRef} className="relative bg-black overflow-hidden">

      {/* ══ HERO VIDEO SECTION ════════════════════════════ */}
      <section className="relative w-full h-screen overflow-hidden flex items-end">
        {/* Peanut butter video loop */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <video
            src="/peanut-butter-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,54,0.15)_0%,transparent_65%)]" />
        </motion.div>

        {/* Hero text over video */}
        <div className="relative z-10 w-full px-6 md:px-16 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 backdrop-blur-md" style={{ '--radius': '9999px' } as any}>
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" style={{ '--radius': '9999px' } as any} />
              <span className="text-xs font-bold tracking-[0.25em] text-[#FF6B00] uppercase">
                {t("badge_hero")}
              </span>
            </div>
            <h1 className="text-[clamp(3rem,12vw,8rem)] font-primary font-black uppercase tracking-tighter leading-[0.88] text-white">
              {t("hero_title1")} <br />
              <span className="text-transparent" style={{
                WebkitTextStroke: "2px #FF6B00",
              }}>
                {t("hero_title2")}
              </span>
            </h1>
            <p className="mt-6 text-neutral-300 text-lg max-w-lg leading-relaxed">
              {t("hero_desc")}
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <ChevronDown className="w-5 h-5 text-[#FF6B00]/60" />
        </motion.div>
      </section>

      {/* ══ PRODUCT SHOWCASE SPLIT ════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center gap-0">

        {/* LEFT — Product image 3D tilt */}
        <div className="relative flex-1 flex items-center justify-center py-24 px-6">
          {/* Ambient orange glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-[#FF6B00]/20 rounded-full blur-[120px]" style={{ '--radius': '9999px' } as any} />
          </div>

          <div style={{ '--radius': '60px' } as any}>
            <MagneticCard
              intensity={20}
              className="relative z-10 w-[350px] md:w-[480px] aspect-square overflow-hidden"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, 0, -1, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full flex items-center justify-center bg-neutral-900/50 backdrop-blur-3xl overflow-hidden"
                style={{ '--radius': '60px' } as any}
              >
              {/* Cinematic Glows behind the jar */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#FF6B00]/20 blur-[100px] rounded-full pointer-events-none" style={{ '--radius': '9999px' } as any} />
              
              <Image
                src="/peanut-butter.png"
                alt="YouOtmani Peanut Butter — Édition Limitée"
                width={800}
                height={800}
                className="relative z-10 transition-transform duration-700 w-[85%] h-[85%] object-cover contrast-110 brightness-110 scale-110"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(255,107,0,0.4))",
                  '--radius': '40px'
                } as any}
              />
              
              {/* Product Reflection/Shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-black/60 blur-[20px] rounded-full" style={{ '--radius': '9999px' } as any} />
            </motion.div>
          </MagneticCard>
          </div>
        </div>

        {/* RIGHT — Copy + Macros + CTA */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-24">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5" style={{ '--radius': '9999px' } as any}>
              <Star className="w-3 h-3 text-[#FF6B00]" fill="#FF6B00" />
              <span className="text-[10px] font-bold tracking-[0.25em] text-white uppercase">
                {t("brand_badge")}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-primary font-black uppercase tracking-tight text-white leading-none">
              {t("product_title1")} <br />
              <span className="text-[#FF6B00]">{t("product_title2")}</span>
            </h2>

            <p className="mt-6 text-neutral-400 leading-relaxed max-w-md">
              {t("product_desc")}
            </p>

            {/* Macros grid */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {macros.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-4 rounded-xl border border-white/8 bg-white/4"
                  style={{ '--radius': '12px' } as any}
                >
                  <m.icon className="w-4 h-4 text-[#FF6B00] mb-2" />
                  <div className="text-2xl font-primary font-black text-white">{m.value}</div>
                  <div className="text-[10px] text-neutral-500 tracking-wider uppercase mt-0.5">{m.label} {m.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative flex h-16 items-center justify-center gap-3 overflow-hidden bg-[#FF6B00] px-12 text-white font-primary font-black tracking-[0.2em] text-sm uppercase transition-all shadow-[0_20px_40px_-10px_rgba(255,107,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(255,107,0,0.5)] active:scale-95"
                style={{ '--radius': '12px' } as any}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Zap className="w-4 h-4 relative fill-current" />
                <span className="relative">{t("cta_order")}</span>
              </button>
            </div>

            <p className="mt-4 text-[11px] text-neutral-600 tracking-wider">
              {t("delivery")}
            </p>
          </motion.div>
        </div>
      </section>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName="Beurre de Cacahuète – Pure Performance"
        productPrice="570"
        type="product"
      />
    </main>
  );
}
