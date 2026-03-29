"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, CheckCircle2, Loader2, AlertCircle, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useTranslations, useLocale } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

interface IntakeData {
  name: string;
  email: string;
  whatsapp: string;
  age: string;
  gender: string;
  country: string;
  weight: string;
  height: string;
  goal: string;
  activity: string;
  healthConditions: string;
  notes: string;
  frontPic: File | null;
  sidePic: File | null;
  backPic: File | null;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
}

const initialData: IntakeData = {
  name: "", email: "", whatsapp: "", age: "", gender: "", country: "",
  weight: "", height: "", goal: "muscle", activity: "", healthConditions: "", notes: "",
  frontPic: null, sidePic: null, backPic: null,
};

// ─── Style helpers ──────────────────────────────────────────────────────────

const inputCls = "w-full bg-white/5 border border-white/10 focus:border-[#FF2A2A]/60 outline-none px-4 py-3 text-white placeholder:text-white/25 text-sm transition-all duration-200";
const selectCls = `${inputCls} appearance-none cursor-pointer`;
const textareaCls = `${inputCls} resize-none`;

function FieldWrapper({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mb-2">
        {label}{required && <span className="text-[#FF2A2A] mx-1">*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Image Upload ────────────────────────────────────────────────────────────

function ImageUpload({ label, value, onChange }: { label: string; value: File | null; onChange: (f: File | null) => void }) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-white/40">{label}</span>
      <label className={`relative flex flex-col items-center justify-center w-full h-28 border-2 border-dashed transition-all cursor-pointer overflow-hidden ${value ? "border-[#FF2A2A] bg-[#FF2A2A]/5" : "border-white/15 bg-white/3 hover:bg-white/5 hover:border-white/30"}`}>
        {preview && <img src={preview} alt={label} className="absolute inset-0 w-full h-full object-cover opacity-30" />}
        <div className="z-10 flex flex-col items-center justify-center text-center p-3">
          {value ? (
            <div className="flex items-center gap-1.5 bg-[#FF2A2A] text-white text-[10px] font-bold px-3 py-1">
              <CheckCircle2 size={12} /> Done
            </div>
          ) : (
            <>
              <Upload size={16} className="text-white/30 mb-1" />
              <span className="text-[10px] uppercase tracking-wider font-bold text-white/30">Upload</span>
            </>
          )}
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </label>
    </div>
  );
}

// ─── Steps ───────────────────────────────────────────────────────────────────

function Step1({ data, update, t }: { data: IntakeData; update: (k: keyof IntakeData, v: string) => void; t: ReturnType<typeof useTranslations<"Intake">> }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FieldWrapper label={t("name")} required>
          <input type="text" className={inputCls} placeholder="Ali Benali" value={data.name} onChange={e => update("name", e.target.value)} />
        </FieldWrapper>
        <FieldWrapper label={t("age")} required>
          <input type="number" min={14} max={80} className={inputCls} placeholder="25" value={data.age} onChange={e => update("age", e.target.value)} />
        </FieldWrapper>
      </div>
      <FieldWrapper label={t("email")}>
        <input type="email" className={inputCls} placeholder="your@email.com" value={data.email} onChange={e => update("email", e.target.value)} />
      </FieldWrapper>
      <FieldWrapper label={t("whatsapp")} required>
        <input type="tel" className={inputCls} placeholder="+213 7XX XXX XXX" value={data.whatsapp} onChange={e => update("whatsapp", e.target.value)} />
      </FieldWrapper>
      <div className="grid grid-cols-2 gap-3">
        <FieldWrapper label={t("gender")} required>
          <div className="grid grid-cols-2 gap-2">
            {[{ v: "male", l: t("genderM") }, { v: "female", l: t("genderF") }].map(opt => (
              <button key={opt.v} type="button" onClick={() => update("gender", opt.v)}
                className={`py-3 text-sm font-bold border transition-all ${data.gender === opt.v ? "border-[#FF2A2A] bg-[#FF2A2A]/10 text-white" : "border-white/10 bg-white/3 text-white/40 hover:border-white/20"}`}>
                {opt.l}
              </button>
            ))}
          </div>
        </FieldWrapper>
        <FieldWrapper label={t("country")} required>
          <input type="text" className={inputCls} placeholder="Algérie…" value={data.country} onChange={e => update("country", e.target.value)} />
        </FieldWrapper>
      </div>
    </div>
  );
}

function Step2({ data, update, t }: { data: IntakeData; update: (k: keyof IntakeData, v: string) => void; t: ReturnType<typeof useTranslations<"Intake">> }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FieldWrapper label={t("weight")} required>
          <input type="number" className={inputCls} placeholder="80 kg" value={data.weight} onChange={e => update("weight", e.target.value)} />
        </FieldWrapper>
        <FieldWrapper label={t("height")} required>
          <input type="number" className={inputCls} placeholder="175 cm" value={data.height} onChange={e => update("height", e.target.value)} />
        </FieldWrapper>
      </div>
      <FieldWrapper label={t("goal")} required>
        <select className={selectCls} value={data.goal} onChange={e => update("goal", e.target.value)}>
          <option value="muscle" className="bg-[#0d0d0d]">{t("goalMuscle")}</option>
          <option value="fat-loss" className="bg-[#0d0d0d]">{t("goalFat")}</option>
          <option value="recomp" className="bg-[#0d0d0d]">{t("goalRecomp")}</option>
          <option value="endurance" className="bg-[#0d0d0d]">{t("goalEndurance")}</option>
          <option value="health" className="bg-[#0d0d0d]">{t("goalHealth")}</option>
        </select>
      </FieldWrapper>
      <FieldWrapper label={t("activity")}>
        <select className={selectCls} value={data.activity} onChange={e => update("activity", e.target.value)}>
          <option value="" className="bg-[#0d0d0d]">—</option>
          <option value="sedentary" className="bg-[#0d0d0d]">{t("actSedentary")}</option>
          <option value="light" className="bg-[#0d0d0d]">{t("actLight")}</option>
          <option value="moderate" className="bg-[#0d0d0d]">{t("actModerate")}</option>
          <option value="active" className="bg-[#0d0d0d]">{t("actActive")}</option>
          <option value="athlete" className="bg-[#0d0d0d]">{t("actAthlete")}</option>
        </select>
      </FieldWrapper>
      <FieldWrapper label={t("healthConditions")}>
        <textarea rows={2} className={textareaCls} placeholder={t("healthPlaceholder")} value={data.healthConditions} onChange={e => update("healthConditions", e.target.value)} />
      </FieldWrapper>
      <FieldWrapper label={t("notes")}>
        <textarea rows={2} className={textareaCls} placeholder={t("notesPlaceholder")} value={data.notes} onChange={e => update("notes", e.target.value)} />
      </FieldWrapper>
    </div>
  );
}

function Step3({ data, setFile, t }: { data: IntakeData; setFile: (k: "frontPic" | "sidePic" | "backPic", v: File | null) => void; t: ReturnType<typeof useTranslations<"Intake">> }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-white/50 leading-relaxed">{t("photoInstruction")}</p>
      <div className="grid grid-cols-3 gap-3">
        <ImageUpload label={t("front")} value={data.frontPic} onChange={f => setFile("frontPic", f)} />
        <ImageUpload label={t("side")} value={data.sidePic} onChange={f => setFile("sidePic", f)} />
        <ImageUpload label={t("back")} value={data.backPic} onChange={f => setFile("backPic", f)} />
      </div>
      {data.gender === "female" && (
        <p className="text-[11px] text-[#FF2A2A]/70 italic">{t("photoOptionalFemale")}</p>
      )}
    </div>
  );
}

// ─── Validators ───────────────────────────────────────────────────────────────

function isStep1Valid(d: IntakeData) {
  return !!d.name.trim() && !!d.whatsapp.trim() && !!d.age && !!d.gender && !!d.country.trim();
}
function isStep2Valid(d: IntakeData) {
  return !!d.weight && !!d.height && !!d.goal;
}
function isStep3Valid(d: IntakeData) {
  if (d.gender === "female") return true;
  return !!d.frontPic && !!d.sidePic && !!d.backPic;
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function ClientIntakeModal({ isOpen, onClose, planName }: Props) {
  const t = useTranslations("Intake");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [step, setStep] = useState(0);
  const [data, setData] = useState<IntakeData>(initialData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = useCallback((key: keyof IntakeData, value: string) => {
    setData(d => ({ ...d, [key]: value }));
  }, []);

  const setFile = useCallback((key: "frontPic" | "sidePic" | "backPic", value: File | null) => {
    setData(d => ({ ...d, [key]: value }));
  }, []);

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep(0); setData(initialData); setStatus("idle"); }, 400);
  };

  const uploadPhoto = async (file: File, path: string): Promise<string | null> => {
    const { error } = await supabase.storage
      .from("intake-photos")
      .upload(path, file, { upsert: true });
    if (error) { console.error("Upload error:", error); return null; }
    const { data: urlData } = supabase.storage.from("intake-photos").getPublicUrl(path);
    return urlData?.publicUrl ?? null;
  };

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      // Upload photos
      const ts = Date.now();
      const slug = data.name.toLowerCase().replace(/\s+/g, "-");
      const [frontUrl, sideUrl, backUrl] = await Promise.all([
        data.frontPic ? uploadPhoto(data.frontPic, `${slug}-${ts}-front.jpg`) : Promise.resolve(null),
        data.sidePic ? uploadPhoto(data.sidePic, `${slug}-${ts}-side.jpg`) : Promise.resolve(null),
        data.backPic ? uploadPhoto(data.backPic, `${slug}-${ts}-back.jpg`) : Promise.resolve(null),
      ]);

      // Insert into Supabase
      const { error: dbError } = await supabase.from("client_intakes").insert([{
        full_name: data.name,
        email: data.email || null,
        phone: data.whatsapp,
        age: parseInt(data.age) || null,
        gender: data.gender,
        country: data.country,
        current_weight: parseFloat(data.weight) || null,
        height: parseFloat(data.height) || null,
        fitness_goal: data.goal,
        activity_level: data.activity || null,
        health_conditions: data.healthConditions || null,
        notes: data.notes || null,
        photo_front: frontUrl,
        photo_side: sideUrl,
        photo_back: backUrl,
        plan: planName || null,
        status: "pending",
      }]);

      if (dbError) throw dbError;

      // Send email via Resend API
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, plan: planName }),
      }).catch(e => console.warn("Email send failed (non-critical):", e));

      setStatus("success");
    } catch (err) {
      console.error("Intake submission error:", err);
      setStatus("error");
    }
  };

  const canProceed = step === 0 ? isStep1Valid(data) : step === 1 ? isStep2Valid(data) : isStep3Valid(data);

  const STEP_LABELS = [t("step1"), t("step2"), t("step3")];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ backdropFilter: "blur(16px)", backgroundColor: "rgba(0,0,0,0.88)" }}
          onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-[#0a0a0a] border border-white/8 shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Top red accent line */}
            <div className="h-[3px] w-full bg-[#FF2A2A]" />

            {/* Close */}
            <button
              onClick={handleClose}
              className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} z-10 w-8 h-8 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all`}
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="px-7 pt-6 pb-5 border-b border-white/5 shrink-0">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#FF2A2A] uppercase">{planName ? `${planName} · ` : ""}{t("label")}</span>
              <h2 className="mt-1 text-xl font-black uppercase tracking-tighter text-white">{t("title")}</h2>
              <p className="text-xs text-white/35 mt-0.5">{t("subtitle")}</p>

              {/* Step indicator */}
              {status === "idle" && (
                <div className="flex items-center gap-1.5 mt-4">
                  {STEP_LABELS.map((label, i) => (
                    <React.Fragment key={i}>
                      <div className={`flex items-center gap-1.5 ${i < step ? "text-[#FF2A2A]" : i === step ? "text-white" : "text-white/20"}`}>
                        <div className={`w-5 h-5 flex items-center justify-center text-[10px] font-black border transition-all ${i < step ? "border-[#FF2A2A] bg-[#FF2A2A] text-white" : i === step ? "border-[#FF2A2A]/60 text-[#FF2A2A]" : "border-white/10 text-white/20"}`}>
                          {i < step ? "✓" : i + 1}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">{label}</span>
                      </div>
                      {i < STEP_LABELS.length - 1 && (
                        <div className={`flex-1 h-px transition-all ${i < step ? "bg-[#FF2A2A]" : "bg-white/8"}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-7 py-6">
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: isRTL ? -16 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 16 : -16 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step === 0 && <Step1 data={data} update={update} t={t} />}
                    {step === 1 && <Step2 data={data} update={update} t={t} />}
                    {step === 2 && <Step3 data={data} setFile={setFile} t={t} />}
                  </motion.div>
                )}

                {status === "loading" && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 size={36} className="text-[#FF2A2A] animate-spin" />
                    <p className="text-white/40 text-sm font-light tracking-widest uppercase">{t("submitting")}</p>
                  </motion.div>
                )}

                {status === "success" && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                    <div className="w-16 h-16 border border-[#FF2A2A]/40 bg-[#FF2A2A]/10 flex items-center justify-center">
                      <CheckCircle2 size={28} className="text-[#FF2A2A]" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-white">{t("successTitle")}</h3>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xs">{t("successMsg")}</p>
                    <button onClick={handleClose} className="mt-4 h-11 px-10 bg-[#FF2A2A] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#FF4444] transition-colors">
                      {t("close")}
                    </button>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                    <AlertCircle size={36} className="text-[#FF2A2A]" />
                    <p className="text-white/50 text-sm">{t("errorMsg")}</p>
                    <button onClick={() => setStatus("idle")} className="text-[#FF2A2A] font-bold text-sm uppercase tracking-widest underline underline-offset-4">
                      {t("retry")}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer nav */}
            {status === "idle" && (
              <div className="px-7 pb-6 pt-4 border-t border-white/5 flex items-center justify-between shrink-0">
                {step > 0 ? (
                  <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 text-white/40 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors">
                    {isRTL ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    {t("backBtn")}
                  </button>
                ) : <div />}

                {step < 2 ? (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    disabled={!canProceed}
                    className={`flex items-center gap-2 h-11 px-8 text-white font-bold text-xs uppercase tracking-widest transition-all ${canProceed ? "bg-[#FF2A2A] hover:bg-[#FF4444] active:scale-95" : "bg-white/5 text-white/20 cursor-not-allowed"}`}
                  >
                    {t("next")}
                    {isRTL ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceed}
                    className={`flex items-center gap-2 h-11 px-8 text-white font-bold text-xs uppercase tracking-widest transition-all ${canProceed ? "bg-[#FF2A2A] hover:bg-[#FF4444] active:scale-95" : "bg-white/5 text-white/20 cursor-not-allowed"}`}
                  >
                    {t("submit")}
                    {isRTL ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
