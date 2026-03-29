"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Globe } from "lucide-react";
import clsx from "clsx";

const NAV_LINKS = [
  { key: "identity", href: "/" },
  { key: "transformations", href: "/transformations" },
  { key: "nutrition", href: "/product" },
  { key: "pricing", href: "/pricing" },
  { key: "contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navbar");

  const LOCALES = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
    { code: "ar", label: "عر" },
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener("click", close, { once: true });
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500",
          scrolled
            ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/5"
            : "py-5 bg-transparent"
        )}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <span className="font-primary text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
              Y
            </span>
            <span className="font-primary text-xl md:text-2xl font-black tracking-tighter uppercase text-[#FF2A2A]">
              O
            </span>
          </div>
          <div
            className={clsx(
              "overflow-hidden transition-all duration-500",
              scrolled ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
            )}
          >
            <span className="font-primary text-xs tracking-[0.3em] text-neutral-500 uppercase ml-2 whitespace-nowrap">
              Elite Coaching
            </span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={clsx(
                "relative text-xs font-primary font-bold tracking-[0.2em] uppercase transition-colors duration-300",
                pathname === link.href ? "text-white" : "text-neutral-500 hover:text-white"
              )}
            >
              {t(link.key)}
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF2A2A]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA + LANG SWITCHER */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 transition-colors text-[10px] font-primary font-bold tracking-[0.2em] uppercase"
              aria-label="Switch language"
            >
              <Globe className="w-3 h-3" />
              {locale.toUpperCase()}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 bg-black border border-white/10 flex flex-col min-w-[80px] z-50"
                >
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => switchLocale(l.code)}
                      className={clsx(
                        "px-4 py-2.5 text-[10px] font-primary font-bold tracking-[0.2em] uppercase text-left transition-colors",
                        locale === l.code ? "text-[#FF2A2A] bg-white/5" : "text-neutral-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden border border-white/15 px-5 py-2.5 text-white transition-all hover:border-[#FF2A2A] hover:bg-[#FF2A2A] active:scale-95"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative text-[10px] font-primary font-black tracking-[0.2em] uppercase">
              {t("cta")}
            </span>
            <ArrowRight className="w-3 h-3 relative transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden z-50 w-10 h-10 flex items-center justify-center border border-white/10 rounded-lg bg-black/50 backdrop-blur-md"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={18} className="text-white" />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={18} className="text-white" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.nav>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-start justify-center px-8"
          >
            {/* Red line accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF2A2A] to-transparent" />

            <nav className="flex flex-col gap-2 w-full">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className={clsx(
                      "flex items-center justify-between py-5 border-b font-primary font-black uppercase text-3xl md:text-5xl tracking-tight group transition-colors",
                      pathname === link.href
                        ? "text-[#FF2A2A] border-[#FF2A2A]/20"
                        : "text-white/50 hover:text-white border-white/5"
                    )}
                  >
                    {t(link.key)}
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col gap-4"
            >
              {/* Mobile language switcher */}
              <div className="flex gap-2">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={clsx(
                      "px-4 py-2 text-[10px] font-primary font-bold tracking-[0.2em] uppercase border transition-colors",
                      locale === l.code
                        ? "border-[#FF2A2A] text-[#FF2A2A]"
                        : "border-white/10 text-neutral-600 hover:text-white hover:border-white/30"
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-primary tracking-[0.3em] text-neutral-700 uppercase">
                YouOtmani · Elite Performance Coaching · Alger, DZ
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
