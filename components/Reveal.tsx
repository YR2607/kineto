"use client";

import { createElement, ElementType, useEffect, useRef, useState } from "react";

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

export default function Reveal({
  children,
  type = "fade-up",
  delay = 0,
  className = "",
  as = "div",
  threshold = 0.05,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const isMaskReveal = type === "mask-reveal";

  const baseStyle: React.CSSProperties = isMaskReveal
    ? {
        clipPath: visible
          ? "inset(0 0 0 0)"
          : "inset(100% 0 0 0)",
        transition: `clip-path 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "clip-path",
      }
    : {
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate(0, 0)"
          : type === "fade-up"
            ? "translateY(20px)"
            : type === "slide-left"
              ? "translateX(-40px)"
              : type === "slide-right"
                ? "translateX(40px)"
                : "none",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
      };

  const Tag = as;

  return createElement(
    Tag,
    {
      ref: ref as React.RefObject<HTMLElement>,
      style: baseStyle,
      className: className,
    },
    children
  );
}
