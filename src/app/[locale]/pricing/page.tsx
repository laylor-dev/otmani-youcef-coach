"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { MagneticCard } from "@/components/MagneticCard";
import { Check, Star, Shield, Zap, ArrowRight } from "lucide-react";
import clsx from "clsx";
import ClientIntakeModal from "@/components/ClientIntakeModal";

const OFFERS = [
  {
    target: "ordinaire",
    name: "Ordinaire",
    icon: Shield,
    price: { "3": "18 000", "6": "32 000" },
    originalPrice: { "3": "24 000", "6": "48 000" },
    priceEur: { "3": "120", "6": "200" },
    originalPriceEur: { "3": "160", "6": "260" },
    desc: "L'essentiel pour démarrer avec structure et précision.",
    features: [
      "Programme d'entraînement personnalisé",
      "Plan nutritionnel adapté",
      "Suivi toutes les 2 semaines",
      "Accès à la bibliothèque d'exercices",
    ],
    highlight: false,
    badge: null,
  },
  {
    target: "golden",
    name: "Golden",
    icon: Zap,
    price: { "3": "25 000", "6": "45 000" },
    originalPrice: { "3": "35 000", "6": "70 000" },
    priceEur: { "3": "160", "6": "300" },
    originalPriceEur: { "3": "220", "6": "400" },
    desc: "Un accompagnement plus poussé, plus réactif, et plus précis.",
    features: [
      "Programme d'entraînement évolutif",
      "Plan nutritionnel optimisé",
      "Suivi hebdomadaire avec ajustements",
      "Contact WhatsApp privilégié",
      "Analyse photo mensuelle",
    ],
    highlight: true,
    badge: "popular",
  },
  {
    target: "vip",
    name: "VIP Premium",
    icon: Star,
    price: { "3": "40 000", "6": "70 000" },
    originalPrice: { "3": "60 000", "6": "120 000" },
    priceEur: { "3": "250", "6": "400" },
    originalPriceEur: { "3": "350", "6": "550" },
    desc: "L'accompagnement le plus complet qu'un coach puisse offrir.",
    features: [
      "Programme 100% personnalisé & évolutif",
      "Plan nutritionnel ultra-précis & ajusté",
      "Suivi hebdomadaire ultra-détaillé",
      "Contact quotidien (WhatsApp / téléphone)",
      "Check-up mensuel en présentiel",
      "Suivi complet de progression",
      "Encadrement compléments alimentaires",
      "Accompagnement performance & transformation",
    ],
    highlight: false,
    badge: "elite",
  },
];

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [duration, setDuration] = useState<"3" | "6">("3");
  const [currency, setCurrency] = useState<"DZD" | "EUR">("DZD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof OFFERS[0] | null>(null);
  
  const headerRef = useRef<HTMLDivElement>(null);

  const offers = [
    {
      ...OFFERS[0],
      name: t("plans.ordinaire.name"),
      desc: t("plans.ordinaire.desc"),
      features: t.raw("plans.ordinaire.features") as string[],
    },
    {
      ...OFFERS[1],
      name: t("plans.golden.name"),
      desc: t("plans.golden.desc"),
      features: t.raw("plans.golden.features") as string[],
    },
    {
      ...OFFERS[2],
      name: t("plans.elite.name"),
      desc: t("plans.elite.desc"),
      features: t.raw("plans.elite.features") as string[],
    },
  ];

  const handleSelect = (offer: typeof OFFERS[0]) => {
    setSelectedPlan(offer);
    setIsModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">

      {/* Static 3D background — same aesthetic as Spline but instant load */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/spline-bg-pricing.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        {/* Gradient overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,42,42,0.08),transparent)]" />
      </div>

      <div className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">

          {/* HEADER */}
          <div ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <span className="text-[#FF2A2A] font-primary tracking-[0.25em] font-bold text-xs uppercase">
                {t("invest_label")}
              </span>
              <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-primary font-black uppercase tracking-tight text-white leading-none">
                {t("page_title")} <span className="text-neutral-600">{t("page_title2")}</span>
              </h1>
              <p className="max-w-lg mx-auto mt-6 text-neutral-400 leading-relaxed">
                {t("page_desc")}
              </p>
              <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mt-6">
                {t("subtext")}
              </p>
            </motion.div>
          </div>

          {/* DURATION & CURRENCY TOGGLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="inline-flex items-center p-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl relative">
              <motion.div
                layoutId="duration-bg"
                className="absolute h-[calc(100%-12px)] w-[calc(50%-6px)] bg-[#FF2A2A] rounded-xl"
                animate={{ x: duration === "3" ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setDuration("3")}
                className={clsx(
                  "relative z-10 px-8 py-3 text-xs font-primary font-bold tracking-[0.2em] uppercase transition-colors",
                  duration === "3" ? "text-white" : "text-neutral-500 hover:text-white"
                )}
              >
                {t("months_3")}
              </button>
              <button
                onClick={() => setDuration("6")}
                className={clsx(
                  "relative z-10 px-8 py-3 text-xs font-primary font-bold tracking-[0.2em] uppercase transition-colors",
                  duration === "6" ? "text-white" : "text-neutral-500 hover:text-white"
                )}
              >
                {t("months_6")}
              </button>
            </div>

            <div className="inline-flex items-center p-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl relative">
              <motion.div
                layoutId="currency-bg"
                className="absolute h-[calc(100%-12px)] w-[calc(50%-6px)] bg-[#FF2A2A] rounded-xl"
                animate={{ x: currency === "DZD" ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setCurrency("DZD")}
                className={clsx(
                  "relative z-10 px-8 py-3 text-xs font-primary font-bold tracking-[0.2em] uppercase transition-colors",
                  currency === "DZD" ? "text-white" : "text-neutral-500 hover:text-white"
                )}
              >
                DZD
              </button>
              <button
                onClick={() => setCurrency("EUR")}
                className={clsx(
                  "relative z-10 px-8 py-3 text-xs font-primary font-bold tracking-[0.2em] uppercase transition-colors",
                  currency === "EUR" ? "text-white" : "text-neutral-500 hover:text-white"
                )}
              >
                EUR
              </button>
            </div>
          </motion.div>

          {/* BENTO GRID */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch w-full">
            {offers.map((offer, idx) => (
              <motion.div
                key={offer.target}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <MagneticCard
                  intensity={offer.highlight ? 8 : 12}
                  className={clsx(
                    "relative flex flex-col h-full p-8 rounded-2xl border overflow-hidden transition-all duration-500",
                    offer.highlight
                      ? "border-[#FF2A2A]/40 bg-gradient-to-b from-[#180404] to-black shadow-[0_0_60px_-10px_rgba(255,42,42,0.35)]"
                      : "border-white/8 bg-white/4 hover:border-white/20"
                  )}
                >
                  {/* Badge */}
                  {offer.badge && (
                    <div className={clsx(
                      "absolute top-5 right-5 px-3 py-1 text-[10px] font-primary font-bold tracking-[0.2em] uppercase rounded-full",
                      offer.highlight
                        ? "bg-[#FF2A2A] text-white"
                        : "bg-white/10 text-white"
                    )}>
                      {offer.badge === 'popular' ? t('badge_popular') : t('badge_elite')}
                    </div>
                  )}

                  {/* Icon + Name */}
                  <div className={clsx("flex items-center gap-4 mb-8", isRTL && "flex-row-reverse text-right")}>
                    <div className={clsx(
                      "p-3 rounded-xl shrink-0",
                      offer.highlight ? "bg-[#FF2A2A]/15 text-[#FF2A2A]" : "bg-white/8 text-white"
                    )}>
                      <offer.icon size={22} />
                    </div>
                    <div className={isRTL ? "text-right" : ""}>
                      <h3 className="text-lg font-primary font-black uppercase tracking-wider text-white">
                        {offer.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">{offer.desc}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <motion.div
                      key={duration}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-1.5"
                    >
                      <div className={clsx("flex items-center gap-3", isRTL ? "justify-end" : "")} dir="ltr">
                        <span className="text-xl md:text-2xl font-primary font-bold text-white/30 line-through decoration-[#FF2A2A] decoration-2">
                          {currency === "DZD" ? offer.originalPrice[duration] : offer.originalPriceEur[duration]} {currency === "DZD" ? "DA" : "€"}
                        </span>
                        <div className="px-2 py-0.5 bg-[#FF2A2A]/20 text-[#FF2A2A] text-[10px] font-bold tracking-[0.2em] uppercase border border-[#FF2A2A]/30">
                          -{(100 - (parseInt((currency === "DZD" ? offer.price[duration] : offer.priceEur[duration]).replace(" ", "")) / parseInt((currency === "DZD" ? offer.originalPrice[duration] : offer.originalPriceEur[duration]).replace(" ", "")) * 100)).toFixed(0)}%
                        </div>
                      </div>
                      <div className={clsx("flex items-baseline gap-2 mt-1", isRTL ? "justify-end" : "")} dir="ltr">
                        <span className="text-3xl md:text-5xl font-primary font-black text-white">
                          {currency === "DZD" ? offer.price[duration] : offer.priceEur[duration]} {currency === "DZD" ? "DA" : "€"}
                        </span>
                        <span className="text-neutral-500 font-primary text-xs uppercase tracking-widest font-bold">/ {duration} {t("months_label")}</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="h-px w-full bg-white/8 mb-8" />

                  {/* Features */}
                  <ul className={clsx("flex-1 space-y-3.5 mb-10", isRTL && "text-right")}>
                    {offer.features.map((f, i) => (
                      <li key={i} className={clsx("flex gap-3 items-start", isRTL && "flex-row-reverse")}>
                        <Check
                          size={16}
                          className={clsx("shrink-0 mt-0.5", offer.highlight ? "text-[#FF2A2A]" : "text-neutral-500")}
                        />
                        <span className="text-sm text-neutral-300 leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelect(offer)}
                    className={clsx(
                      "group w-full py-4 text-center font-primary font-black text-sm tracking-[0.15em] uppercase rounded-xl border transition-all flex items-center justify-center gap-2 active:scale-95",
                      offer.highlight
                        ? "bg-[#FF2A2A] border-[#FF2A2A] text-white hover:bg-transparent hover:text-[#FF2A2A]"
                        : "bg-transparent border-white/15 text-white hover:bg-white hover:text-black hover:border-white"
                    )}
                  >
                    {t("select")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </MagneticCard>
              </motion.div>
            ))}
          </div>

          {/* Guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center text-neutral-600 text-sm"
          >
            <p>{t("guarantee")}</p>
          </motion.div>

        </div>
      </div>

      <ClientIntakeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planName={selectedPlan ? `${selectedPlan.name} · ${currency === 'DZD' ? selectedPlan.price[duration] : selectedPlan.priceEur![duration]} ${currency === 'DZD' ? 'DA' : '€'} / ${duration} ${t("months_label")}` : ""}
      />
    </main>
  );
}
