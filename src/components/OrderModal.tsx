"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingBag, Phone, User, MapPin, MessageSquare } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { useTranslations, useLocale } from "next-intl";

const WILAYAS = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna", 
  "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira", 
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou", 
  "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda", 
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine", 
  "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla", 
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj", "35 - Boumerdès", 
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela", 
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma", 
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - El M'Ghair", "50 - El Meniaâ", 
  "51 - Ouled Djellal", "52 - Bordj Badji Mokhtar", "53 - Béni Abbès", "54 - Timimoun", "55 - Touggourt", 
  "56 - Djanet", "57 - In Salah", "58 - In Guezzam"
];

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: string;
  type: "coaching" | "product";
}

export function OrderModal({ isOpen, onClose, productName, productPrice, type }: OrderModalProps) {
  const t = useTranslations("OrderModal");
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    wilaya: "16 - Alger",
    notes: "",
    quantity: "1",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productName,
          type
        })
      });
      
      if (!response.ok) throw new Error('Order failed');
      
      setStep(2);
    } catch (error) {
      console.error(error);
      alert(t("error_alert"));
    } finally {
      setLoading(false);
    }
  };

  const accentColor = type === "product" ? "#FF6B00" : "#FF2A2A";
  const accentBg = type === "product" ? "rgba(255, 107, 0, 0.1)" : "rgba(255, 42, 42, 0.1)";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl"
            style={{ 
              "--radius": "24px",
              boxShadow: `0 0 80px ${accentBg}`
            } as any}
          >
            {/* Header / Product Info */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="p-1.5 flex items-center justify-center" style={{ backgroundColor: accentBg, color: accentColor, "--radius": "8px" } as any}>
                    {type === "coaching" ? <User size={14} /> : <ShoppingBag size={14} />}
                  </span>
                  <span className="text-[10px] font-primary font-bold tracking-[0.3em] text-neutral-500 uppercase">
                    {type === "coaching" ? t("badge_coaching") : t("badge_product")}
                  </span>
                </div>
                <h2 className="text-2xl font-primary font-black uppercase text-white tracking-tight">
                  {productName}
                </h2>
                <p className="font-primary font-bold text-lg" style={{ color: accentColor }}>{productPrice} DA</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 hover:text-white transition-colors"
                style={{ "--radius": "12px" } as any}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {step === 1 ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-primary font-bold uppercase tracking-[0.2em] text-neutral-500">
                        {t("label_name")}
                      </label>
                      <div className="relative">
                        <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input
                          type="text"
                          required
                          placeholder={t("placeholder_name")}
                          className="w-full bg-white/5 border border-white/10 py-3 ps-10 pe-4 text-white placeholder-white/20 focus:outline-none transition-colors text-sm"
                          style={{ "--radius": "12px" } as any}
                          onFocus={(e) => (e.target.style.borderColor = accentColor)}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-primary font-bold uppercase tracking-[0.2em] text-neutral-500">
                        {t("label_phone")}
                      </label>
                      <div className="relative">
                        <Phone className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input
                          type="tel"
                          required
                          placeholder={t("placeholder_phone")}
                          className="w-full bg-white/5 border border-white/10 py-3 ps-10 pe-4 text-white placeholder-white/20 focus:outline-none transition-colors text-sm"
                          style={{ "--radius": "12px" } as any}
                          onFocus={(e) => (e.target.style.borderColor = accentColor)}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-primary font-bold uppercase tracking-[0.2em] text-neutral-500">
                      {t("label_wilaya")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <select
                        className="w-full bg-white/5 border border-white/10 py-3 ps-10 pe-4 text-white appearance-none focus:outline-none focus:border-white/20 transition-colors text-sm"
                        style={{ "--radius": "12px" } as any}
                        value={formData.wilaya}
                        onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                        dir={isRTL ? "rtl" : "ltr"}
                      >
                        {WILAYAS.map((w) => (
                          <option key={w} value={w} className="bg-[#0a0a0a] text-white">
                            {w}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {type === "product" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-primary font-bold uppercase tracking-[0.2em] text-neutral-500">
                        {t("label_quantity")}
                      </label>
                      <div className="relative">
                        <ShoppingBag className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input
                          type="number"
                          min="1"
                          max="99"
                          required
                          className="w-full bg-white/5 border border-white/10 py-3 ps-10 pe-4 text-white placeholder-white/20 focus:outline-none transition-colors text-sm"
                          style={{ "--radius": "12px" } as any}
                          onFocus={(e) => (e.target.style.borderColor = accentColor)}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] font-primary font-bold uppercase tracking-[0.2em] text-neutral-500">
                      {t("label_notes")}
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute start-3 top-3 w-4 h-4 text-neutral-600" />
                      <textarea
                        rows={3}
                        placeholder={t("placeholder_notes")}
                        className="w-full bg-white/5 border border-white/10 py-3 ps-10 pe-4 text-white placeholder-white/20 focus:outline-none transition-colors resize-none text-sm"
                        style={{ "--radius": "12px" } as any}
                        onFocus={(e) => (e.target.style.borderColor = accentColor)}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={clsx(
                      "group w-full h-14 text-white font-primary font-black text-sm tracking-[0.2em] uppercase transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3",
                      loading ? "animate-pulse" : "hover:shadow-2xl"
                    )}
                    style={{ 
                      backgroundColor: loading ? `${accentColor}80` : accentColor,
                      "--radius": "12px" 
                    } as any}
                  >
                    {loading ? t("btn_loading") : t("btn_submit")}
                    {!loading && <Check className="w-4 h-4" />}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <div className="w-20 h-20 border flex items-center justify-center mb-6" style={{ backgroundColor: accentBg, borderColor: `${accentColor}30`, "--radius": "9999px" } as any}>
                    <Check className="w-10 h-10" style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-2xl font-primary font-black uppercase text-white mb-3">
                    {t("success_title")}
                  </h3>
                  <p className="text-neutral-400 max-w-sm mb-10 leading-relaxed">
                    {t("success_message1")} <span className="text-white font-bold">{formData.name}</span>. <br />
                    {t("success_message2")} <span className="text-white font-bold">{formData.phone}</span> {t("success_message3")}
                  </p>
                  <button
                    onClick={onClose}
                    className="h-14 px-10 bg-white/5 border border-white/10 text-white font-primary font-black text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all"
                    style={{ "--radius": "12px" } as any}
                  >
                    {t("btn_close")}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
