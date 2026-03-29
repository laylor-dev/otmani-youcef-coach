"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { X, ArrowRight, Trophy, Target, Zap, Waves } from "lucide-react";
import { MagneticCard } from "@/components/MagneticCard";

export const TRANSFORMATIONS = [
  { id: 1, img: "/transformations/Screenshot 2026-03-29 130937.png", name: "Client 1", result: "-15% Body Fat", time: "16 Weeks", category: "Results", protocol: { title: "Aggressive Cut & Recomp", duration: "16 Weeks", nutrition: "High protein (2.5g/kg), 500 kcal deficit, carb cycling on rest days.", training: "PPL Split (6x/week), progressive overload on compounds + 20 mins Stairmaster.", supplements: "Whey Isolate, Creatine Monohydrate, Omega 3." } },
  { id: 2, img: "/transformations/Screenshot 2026-03-29 130950.png", name: "Client 2", result: "+8kg Muscle", time: "12 Weeks", category: "Results", protocol: { title: "Lean Bulking Phase", duration: "12 Weeks", nutrition: "300 kcal surplus, high carbs before/after workouts.", training: "Upper/Lower Split (4x/week), extreme hypertrophy focus.", supplements: "Whey, Creatine, Citrulline Malate." } },
  { id: 3, img: "/transformations/Screenshot 2026-03-29 131014.png", name: "Client 3", result: "-12kg Fat", time: "20 Weeks", category: "Results", protocol: { title: "Steady Fat Loss", duration: "20 Weeks", nutrition: "Moderate deficit, intermittent fasting 16:8.", training: "Full Body (3x/week) + 3x 45 min LISS cardio.", supplements: "Whey Isolate, Caffeine, Vitamin D3." } },
  { id: 4, img: "/transformations/Screenshot 2026-03-29 131029.png", name: "Client 4", result: "Body Recomp", time: "14 Weeks", category: "Results", protocol: { title: "Metabolic Reset", duration: "14 Weeks", nutrition: "Maintenance calories, protein fixed at 200g/day.", training: "Push/Pull/Legs (5x/week).", supplements: "EAA, Creatine, Fish Oil." } },
  { id: 5, img: "/transformations/Screenshot 2026-03-29 131104.png", name: "Client 5", result: "-20kg Fat", time: "24 Weeks", category: "Results", protocol: { title: "Complete Overhaul", duration: "24 Weeks", nutrition: "Keto diet for first 8 weeks, then targeted carb reintroduction.", training: "Bro Split (5x/week) + daily 10k steps.", supplements: "Electrolytes, Whey Isolate." } },
  { id: 6, img: "/transformations/Screenshot 2026-03-29 131125.png", name: "Client 6", result: "Athletic Conditioning", time: "10 Weeks", category: "Results", protocol: { title: "Performance Prep", duration: "10 Weeks", nutrition: "Carb backloading, maintenance calories.", training: "Functional Hypertrophy + Plyometrics.", supplements: "Beta-Alanine, Creatine." } },
  { id: 7, img: "/transformations/Screenshot 2026-03-29 131140.png", name: "Client 7", result: "+5kg Keep Fat Low", time: "16 Weeks", category: "Results", protocol: { title: "Dry Mass Gain", duration: "16 Weeks", nutrition: "Slight 150 kcal surplus.", training: "Arnold Split (6x/week).", supplements: "Isolate, Multi-vitamin." } },
  { id: 8, img: "/transformations/Screenshot 2026-03-29 131152.png", name: "Client 8", result: "Shredding Phase", time: "8 Weeks", category: "Results", protocol: { title: "Summer Shred", duration: "8 Weeks", nutrition: "Aggressive PSMF (Protein Sparing Modified Fast) micro-cycles.", training: "Heavy Low Volume + HICT.", supplements: "Caffeine, EC Stack alternative." } },
  { id: 9, img: "/transformations/Screenshot 2026-03-29 131208.png", name: "Client 9", result: "-10kg Fat Loss", time: "12 Weeks", category: "Results", protocol: { title: "Sustainable Cut", duration: "12 Weeks", nutrition: "Flexible dieting, 80/20 rule, 400 kcal deficit.", training: "Upper/Lower (4x/week).", supplements: "Whey Isolate." } },
  { id: 10, img: "/transformations/Screenshot 2026-03-29 131252.png", name: "Client 10", result: "Strength Focus", time: "16 Weeks", category: "Results", protocol: { title: "Powerbuilding", duration: "16 Weeks", nutrition: "High carb, maintenance to slight surplus.", training: "5/3/1 method + Hypertrophy accessories.", supplements: "Creatine, Pre-workout." } },
  { id: 11, img: "/transformations/Screenshot 2026-03-29 131307.png", name: "Client 11", result: "-18kg Extreme Cut", time: "30 Weeks", category: "Results", protocol: { title: "Long-term Fat Loss", duration: "30 Weeks", nutrition: "Diet breaks every 6 weeks.", training: "PPL (6x/week) + 12k steps daily.", supplements: "Omega 3, Zinc, Magnesium." } },
  { id: 12, img: "/transformations/Screenshot 2026-03-29 131329.png", name: "Client 12", result: "Aesthetic V-Taper", time: "20 Weeks", category: "Results", protocol: { title: "Shoulder/Lat Specialization", duration: "20 Weeks", nutrition: "Maintenance, high protein.", training: "Specialized split with priority on Side Delts & Lats.", supplements: "Whey Isolate, Creatine." } },
  { id: 13, img: "/transformations/Screenshot 2026-03-29 131408.png", name: "Client 13", result: "Post-Injury Recomp", time: "24 Weeks", category: "Results", protocol: { title: "Rehab & Grow", duration: "24 Weeks", nutrition: "Anti-inflammatory diet, high protein.", training: "Tempo training, strict form, stability work.", supplements: "Collagen Peptides, Omega 3." } },
  { id: 14, img: "/transformations/Screenshot 2026-03-29 131436.png", name: "Client 14", result: "-5kg Stubborn Fat", time: "8 Weeks", category: "Results", protocol: { title: "Stubborn Fat Protocol", duration: "8 Weeks", nutrition: "Low carb, carb refeed once a week.", training: "Fasted cardio + Heavy Compounds.", supplements: "L-Carnitine, Caffeine." } },
];

export default function TransformationsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProtocol, setSelectedProtocol] = useState<typeof TRANSFORMATIONS[0] | null>(null);
  
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, TRANSFORMATIONS.length));
  };

  
  return (
    <main ref={containerRef} className="bg-black text-white overflow-hidden pb-32">
      
      {/* ══ CINEMATIC HERO 50/50 ════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-stretch border-b border-white/5">
        
        {/* LEFT — Copy */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-32 lg:py-0 relative z-10">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 rounded-full border border-[#FF2A2A]/30 bg-[#FF2A2A]/10 backdrop-blur-md">
              <Trophy className="w-3.5 h-3.5 text-[#FF2A2A]" />
              <span className="text-[10px] font-primary font-bold tracking-[0.3em] text-white uppercase">
                Wall of Performance
              </span>
            </div>

            <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-primary font-black uppercase tracking-tighter leading-[0.85] text-white mb-8">
              Real Humans. <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>
                Real Results.
              </span>
            </h1>

            <p className="text-neutral-400 text-lg md:text-xl max-w-lg leading-relaxed mb-12">
              Chaque transformation est une preuve vivante que la science alliée à la discipline ne ment jamais. 
              Voici l'élite de mes athlètes.
            </p>

            <div className="flex flex-wrap gap-8 items-center border-t border-white/10 pt-10">
              <div>
                <div className="text-4xl font-primary font-black text-white">+200</div>
                <div className="text-[10px] text-neutral-500 tracking-widest uppercase mt-1">Transformations</div>
              </div>
              <div>
                <div className="text-4xl font-primary font-black text-white">100%</div>
                <div className="text-[10px] text-neutral-500 tracking-widest uppercase mt-1">Engagement</div>
              </div>
              <div>
                <div className="text-4xl font-primary font-black text-[#FF2A2A]">Zero</div>
                <div className="text-[10px] text-neutral-500 tracking-widest uppercase mt-1">Excuses</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Featured Image with Parallax & Glow */}
        <div className="flex-1 relative min-h-[60vh] lg:min-h-screen overflow-hidden">
          <motion.div 
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/coach-5.png"
              alt="Elite Transformation Featured"
              fill
              className="object-cover object-top grayscale contrast-125 brightness-75"
            />
            {/* Blending Gradients */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            {/* Floating Glow */}
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-1/4 right-1/4 w-[50%] h-[50%] bg-[#FF2A2A]/20 blur-[120px] rounded-full mix-blend-screen"
            />
          </motion.div>
        </div>
      </section>

      {/* ══ THE GALLERY GRID ════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-16 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <span className="text-[#FF2A2A] font-primary font-bold tracking-[0.4em] text-xs uppercase block mb-4">
                Hall of Fame
              </span>
              <h2 className="text-3xl md:text-6xl font-primary font-black uppercase tracking-tighter text-white">
                Success <span className="text-neutral-700">Stories.</span>
              </h2>
            </div>
            <p className="text-neutral-500 text-sm max-w-xs md:text-right leading-relaxed font-light">
              Des résultats exceptionnels conçus sur mesure. Voici une sélection de transformations récentes de nos athlètes élites.
            </p>
          </div>

          <div className="columns-2 lg:columns-3 gap-3 md:gap-6 space-y-3 md:space-y-6">
            {TRANSFORMATIONS.slice(0, visibleCount).map((item, idx) => (
              <motion.div
                key={item.id}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="break-inside-avoid"
              >
                <MagneticCard
                  intensity={10}
                  className="group relative overflow-hidden rounded-xl border-4 border-neutral-800/80 cursor-pointer bg-neutral-900/40 hover:border-neutral-600 transition-colors duration-500"
                >
                  <div 
                    className="relative w-full aspect-[4/5]"
                    onClick={() => setSelectedProtocol(item)}
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover object-top transition-all duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Overlays */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent opacity-100" />
                    
                    {/* Static Badge / Hover Content */}
                    <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end">
                      <motion.div className="overflow-hidden mb-1 md:mb-3">
                        <span className="inline-block px-2 py-1 md:px-4 md:py-1.5 bg-[#FF2A2A] text-white text-[8px] md:text-[11px] font-primary font-black tracking-[0.1em] md:tracking-[0.25em] uppercase shadow-[0_4px_15px_rgba(255,42,42,0.4)]">
                          {item.category}
                        </span>
                      </motion.div>
                      
                      <div className="mt-1 md:mt-2 flex items-center gap-1 md:gap-2 text-[8px] md:text-[13px] font-primary font-bold tracking-[0.1em] md:tracking-[0.2em] text-[#FF2A2A] uppercase">
                        View Protocol <ArrowRight size={10} className="md:w-[14px] md:h-[14px] w-[10px] h-[10px] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </div>

          {/* Load More Pagination */}
          {visibleCount < TRANSFORMATIONS.length && (
            <div className="mt-16 flex flex-col items-center justify-center">
              <div className="text-neutral-500 font-primary font-bold tracking-widest text-sm mb-4">
                Showing {visibleCount} of {TRANSFORMATIONS.length}
              </div>
              <div className="w-48 h-1 bg-neutral-800 rounded-full mb-8 overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[#FF2A2A]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(visibleCount / TRANSFORMATIONS.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <button
                onClick={handleLoadMore}
                className="px-10 py-4 rounded-full border border-white/10 text-white font-primary font-bold uppercase tracking-[0.2em] text-sm hover:bg-white/5 active:scale-95 transition-all"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Protocol Modal */}
      {selectedProtocol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProtocol(null)}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={() => setSelectedProtocol(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="w-full md:w-1/2 relative min-h-[40vh] md:min-h-0 bg-neutral-900 border-b md:border-b-0 md:border-r border-white/5">
              <Image
                src={selectedProtocol.img}
                alt={selectedProtocol.name}
                fill
                className="object-contain"
              />
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="mb-8 border-b border-white/10 pb-8">
                <span className="inline-block px-3 py-1 bg-[#FF2A2A]/10 text-[#FF2A2A] border border-[#FF2A2A]/20 text-[10px] font-primary font-bold tracking-[0.2em] uppercase rounded-full mb-4">
                  Case Study
                </span>
                <h3 className="text-3xl font-primary font-black uppercase text-white mb-2 leading-none">
                  {selectedProtocol.protocol.title}
                </h3>
                <p className="text-neutral-400 text-sm font-semibold tracking-widest uppercase">
                  Duration: {selectedProtocol.protocol.duration}
                </p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="flex items-center gap-2 text-white font-primary font-bold tracking-widest uppercase text-sm mb-3">
                    <Target size={16} className="text-[#FF2A2A]" /> Nutrition Protocol
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {selectedProtocol.protocol.nutrition}
                  </p>
                </div>
                
                <div>
                  <h4 className="flex items-center gap-2 text-white font-primary font-bold tracking-widest uppercase text-sm mb-3">
                    <Zap size={16} className="text-[#FF2A2A]" /> Training Split
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {selectedProtocol.protocol.training}
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-white font-primary font-bold tracking-widest uppercase text-sm mb-3">
                    <Waves size={16} className="text-[#FF2A2A]" /> Supplementation
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {selectedProtocol.protocol.supplements}
                  </p>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <Link
                  href="/pricing"
                  className="w-full flex justify-center py-4 bg-[#FF2A2A] text-white font-primary font-bold uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-all"
                >
                  Start Your Protocol
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ══ CTA BOTTOM ══════════════════════════════════ */}
      <section className="mt-40 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-neutral-900/50 to-black p-1 rounded-3xl border border-white/5 overflow-hidden">
          <div className="bg-black/40 backdrop-blur-xl p-12 md:p-20 text-center rounded-[calc(1.5rem-2px)] relative">
            {/* Decorative background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#FF2A2A]/10 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-6xl font-primary font-black uppercase tracking-tighter text-white mb-8">
                Your Story <br />
                <span className="text-[#FF2A2A]">Starts Here.</span>
              </h2>
              <p className="text-neutral-500 text-lg max-w-lg mx-auto mb-12">
                Ne regarde pas seulement les autres réussir. Deviens celui que l'on regarde.
                Prêt pour ton protocole personnalisé ?
              </p>
              <Link
                href="/pricing"
                className="group inline-flex h-16 items-center px-12 bg-[#FF2A2A] text-white font-primary font-black text-sm tracking-[0.2em] uppercase rounded-xl hover:bg-white hover:text-black transition-all active:scale-95"
              >
                Join the Elite
                <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}
