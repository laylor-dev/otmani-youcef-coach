"use client";

import { Link } from "@/i18n/routing";
import { Camera, Tv, MapPin, Copy, Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Highlight the nutrition page with orange theme (e.g. /product)
  // We check for 'product' in the suffix
  const isProductPage = pathname?.includes("/product");
  const accentColor = isProductPage ? "#FF6B00" : "#FF2A2A";
  const accentColorHover = isProductPage ? "#FF8533" : "#FF4D4D";

  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("contact@youotmani.dz");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full bg-[#030303] border-t border-white/5">

      {/* End main site, begin footer */}

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="font-primary text-3xl font-black tracking-tighter uppercase mb-5 block">
            You<span style={{ color: accentColor }}>Otmani</span>
          </Link>
          <p className="text-neutral-500 text-sm leading-relaxed mb-8 max-w-xs">
            Coaching de performance scientifique, nutrition d'élite, et transformation physique réelle.
            Rejoignez les meilleurs.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/youotmani"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-neutral-500 transition-all"
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = accentColor;
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "rgb(115,115,115)";
              }}
            >
              <Camera className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-neutral-500 transition-all"
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = accentColor;
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "rgb(115,115,115)";
              }}
            >
              <Tv className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 md:col-span-2">
          <div>
            <p className="text-[10px] font-primary font-black tracking-[0.3em] uppercase mb-5" style={{ color: accentColor }}>
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Accueil", href: "/" },
                { label: "Offres Coaching", href: "/pricing" },
                { label: "Peanut Butter", href: "/product" },
                { label: "Résultats", href: "/transformations" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-500 hover:text-white transition-colors uppercase tracking-wider font-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-primary font-black tracking-[0.3em] uppercase mb-5" style={{ color: accentColor }}>
              Info
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3 text-sm text-neutral-500">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
                <span>Alger, Algérie</span>
              </div>
              <div className="text-sm text-neutral-500 space-y-2 font-primary tracking-wider">
                <div className="relative group/mail flex items-center gap-2">
                  <a 
                    href="mailto:contact@youotmani.dz" 
                    className="hover:text-white transition-colors block uppercase"
                  >
                    contact@youotmani.dz
                  </a>
                  <button 
                    onClick={copyEmail}
                    className="p-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-neutral-500 hover:text-white"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#FF2A2A] text-white text-[10px] font-bold uppercase tracking-tighter rounded pointer-events-none animate-in fade-in zoom-in duration-200">
                      Copied!
                    </span>
                  )}
                </div>
                <p>+213 540 44 51 41</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 md:px-16 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-neutral-700 tracking-widest uppercase font-primary">
            © {currentYear} YouOtmani Coaching. Tous droits réservés.
          </span>
          <span className="text-[11px] text-neutral-700 tracking-widest uppercase font-primary">
            Developed by <a 
              href="https://www.instagram.com/youcef.dev_/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-white transition-colors underline decoration-white/20 underline-offset-4"
              onMouseOver={(e) => e.currentTarget.style.color = accentColor}
              onMouseOut={(e) => e.currentTarget.style.color = "white"}
            >@youcef.dev_</a>
          </span>
        </div>
      </div>

    </footer>
  );
}
