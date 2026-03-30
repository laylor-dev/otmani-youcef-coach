"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * ScrollToTop
 * — Scrolls to top instantly on every route change (no smooth, avoids iOS issues)
 * — Shows a floating FAB button after the user scrolls down 400px
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // ── Force scroll to top on route change ──────────────────────────────────
  useEffect(() => {
    // Use setTimeout(0) so the new page has painted before we scroll,
    // which prevents a flash of the old scroll position on iOS Safari.
    const id = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }, 0);
    return () => clearTimeout(id);
  }, [pathname]);

  // ── Show/hide FAB based on scroll position ────────────────────────────────
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleTouch = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top-fab"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollUp}
          onTouchEnd={handleTouch}
          aria-label="Scroll to top"
          style={{
            position: "fixed",
            bottom: 28,
            right: 24,
            zIndex: 8000,
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FF2A2A",
            border: "none",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
            outline: "none",
            padding: 0,
          }}
          whileHover={{ scale: 1.1, backgroundColor: "#cc2020" }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowUp size={20} color="#fff" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
