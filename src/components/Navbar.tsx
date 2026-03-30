"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
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

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
      {/* NAV BAR */}
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500",
          scrolled
            ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/5"
            : "py-5 bg-transparent"
        )}
        style={{ WebkitBackdropFilter: scrolled ? "blur(20px)" : "none" }}
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

        {/* CTA + LANG SWITCHER (desktop) */}
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

        {/* MOBILE HAMBURGER BUTTON — plain button, no framer-motion wrapper */}
        <button
          id="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          className="md:hidden relative z-[200] flex items-center justify-center"
          style={{
            width: 44,
            height: 44,
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          {/* Hamburger / X drawn in pure CSS — no animation library */}
          <span
            aria-hidden="true"
            style={{
              display: "block",
              position: "relative",
              width: 20,
              height: 14,
            }}
          >
            {/* Top bar */}
            <span
              style={{
                position: "absolute",
                left: 0,
                top: menuOpen ? "50%" : 0,
                width: "100%",
                height: 2,
                background: "#fff",
                borderRadius: 2,
                transform: menuOpen ? "translateY(-50%) rotate(45deg)" : "none",
                transition: "top 0.25s, transform 0.25s",
              }}
            />
            {/* Middle bar */}
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                width: "100%",
                height: 2,
                background: "#fff",
                borderRadius: 2,
                transform: "translateY(-50%)",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.15s",
              }}
            />
            {/* Bottom bar */}
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: menuOpen ? "50%" : 0,
                width: "100%",
                height: 2,
                background: "#fff",
                borderRadius: 2,
                transform: menuOpen ? "translateY(50%) rotate(-45deg)" : "none",
                transition: "bottom 0.25s, transform 0.25s",
              }}
            />
          </span>
        </button>
      </nav>

      {/* MOBILE FULL-SCREEN MENU OVERLAY */}
      {menuOpen && (
        <div
          id="mobile-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 150,
            background: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "0 2rem",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Red accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 2,
              background: "linear-gradient(to right, #FF2A2A, transparent)",
            }}
          />

          {/* CLOSE BUTTON — inside the overlay for accessibility */}
          <button
            id="mobile-menu-close"
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
            }}
          >
            {/* X icon */}
            <span style={{ position: "relative", display: "block", width: 18, height: 18 }}>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  margin: "auto",
                  width: "100%",
                  height: 2,
                  background: "#fff",
                  borderRadius: 2,
                  transform: "rotate(45deg)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  margin: "auto",
                  width: "100%",
                  height: 2,
                  background: "#fff",
                  borderRadius: 2,
                  transform: "rotate(-45deg)",
                }}
              />
            </span>
          </button>

          {/* NAV LINKS */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 0, width: "100%" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={closeMenu}
                className={clsx(
                  "flex items-center justify-between py-5 border-b font-primary font-black uppercase tracking-tight group transition-colors",
                  pathname === link.href
                    ? "text-[#FF2A2A] border-[#FF2A2A]/20"
                    : "text-white/50 hover:text-white border-white/5"
                )}
                style={{ fontSize: "clamp(1.75rem, 8vw, 3rem)" }}
              >
                {t(link.key)}
                <ArrowRight
                  className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0"
                  size={20}
                />
              </Link>
            ))}
          </nav>

          {/* BOTTOM: lang switcher + tagline */}
          <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => switchLocale(l.code)}
                  style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
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
          </div>
        </div>
      )}
    </>
  );
}
