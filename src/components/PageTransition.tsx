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
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Black curtain sweep in — starts collapsed by default to avoid blocking screen if JS fails */}
        <motion.div
          className="fixed inset-0 z-[100] bg-black origin-bottom pointer-events-none"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* Red flash line */}
        <motion.div
          className="fixed inset-x-0 top-0 z-[101] h-[3px] bg-[#FF2A2A] origin-left pointer-events-none"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
