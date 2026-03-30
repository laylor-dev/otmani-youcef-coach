"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Black curtain sweep — uses visibility:hidden (NOT pointer-events:none)
            so it is completely removed from the touch/click event pipeline on all
            browsers including old iOS Safari which ignores pointer-events:none on
            GPU-composited layers */}
        <motion.div
          className="fixed inset-0 z-[100] bg-black origin-bottom"
          style={{ visibility: "hidden" }}
          initial={{ scaleY: 0, visibility: "hidden" }}
          animate={{ scaleY: 0, visibility: "hidden" }}
          exit={{ scaleY: 1, visibility: "visible" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* Red flash line */}
        <motion.div
          className="fixed inset-x-0 top-0 z-[101] h-[3px] bg-[#FF2A2A] origin-left"
          style={{ visibility: "hidden" }}
          initial={{ scaleX: 0, visibility: "hidden" }}
          animate={{ scaleX: 0, visibility: "hidden" }}
          exit={{ scaleX: 1, visibility: "visible" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
