"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// RevealText — Reveals text with a clip/slide animation on scroll or mount
// Usage: <RevealText>Any text or JSX here</RevealText>
// ─────────────────────────────────────────────────────────────────────────────
interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;        // extra delay in seconds (default 0)
  duration?: number;     // animation duration in seconds (default 0.8)
  once?: boolean;        // only animate once (default true)
  direction?: "up" | "down" | "left" | "right";
}

export function RevealText({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
  direction = "up",
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  const initialMap = {
    up:    { y: "100%", opacity: 0 },
    down:  { y: "-100%", opacity: 0 },
    left:  { x: "40px", opacity: 0 },
    right: { x: "-40px", opacity: 0 },
  };

  const animateMap = {
    up:    { y: "0%", opacity: 1 },
    down:  { y: "0%", opacity: 1 },
    left:  { x: "0px", opacity: 1 },
    right: { x: "0px", opacity: 1 },
  };

  return (
    // Clip container — hides the overflowing text before reveal
    <div ref={ref} style={{ overflow: "hidden" }} className={className}>
      <motion.div
        initial={initialMap[direction]}
        animate={isInView ? animateMap[direction] : initialMap[direction]}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RevealWords — Reveals each word with a staggered slide-up animation
// Best for headings.
// Usage: <RevealWords text="My Heading Text" className="text-4xl font-black" />
// ─────────────────────────────────────────────────────────────────────────────
interface RevealWordsProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;    // delay between each word (default 0.08s)
  once?: boolean;
}

export function RevealWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.08,
  once = true,
}: RevealWordsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RevealLine — A simple horizontal line that sweeps in from left
// Usage: <RevealLine className="h-px bg-white/10" delay={0.3} />
// ─────────────────────────────────────────────────────────────────────────────
interface RevealLineProps {
  className?: string;
  delay?: number;
  once?: boolean;
}

export function RevealLine({ className = "", delay = 0, once = true }: RevealLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="w-full h-full bg-current"
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
