"use client";

import { createElement, ElementType, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AnimationType =
  | "fade-up"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "mask-reveal";

interface RevealProps {
  children: React.ReactNode;
  type?: AnimationType;
  delay?: number;
  className?: string;
  as?: ElementType;
  threshold?: number;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

export default function Reveal({
  children,
  type = "fade-up",
  delay = 0,
  className = "",
  as = "div",
  threshold = 0.05,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const isMaskReveal = type === "mask-reveal";

  const initial = isMaskReveal
    ? { clipPath: "inset(100% 0 0 0)" }
    : {
        opacity: 1,
        y: type === "fade-up" ? 24 : 0,
        x:
          type === "slide-left"
            ? -40
            : type === "slide-right"
              ? 40
              : 0,
      };

  const animate = isMaskReveal
    ? { clipPath: "inset(0% 0% 0% 0%)" }
    : { opacity: 1, y: 0, x: 0 };

  const MotionTag = useMemo(() => motion.create(as as ElementType), [as]);

  return createElement(
    MotionTag,
    {
      className,
      initial: prefersReducedMotion ? false : initial,
      whileInView: prefersReducedMotion ? undefined : animate,
      viewport: { once: true, margin: `0px 0px -10% 0px`, amount: threshold },
      transition: { ...springTransition, delay },
    },
    children
  );
}
