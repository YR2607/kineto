"use client";

import { useRef } from "react";
import AnimatedLink from "./AnimatedLink";
import Reveal from "./Reveal";

function MagneticButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group inline-flex items-center gap-4 md:gap-6 text-forest-ink transition-transform duration-300 ease-out will-change-transform"
    >
      <span className="bg-chartreuse-sprig text-forest-ink w-[72px] h-[72px] md:w-[120px] md:h-[120px] rounded-full flex items-center justify-center shrink-0 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-12">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="md:w-[48px] md:h-[48px] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </span>
      <span className="text-[16vw] md:text-[8vw] font-semibold leading-[0.85] tracking-tight group-hover:text-sage-dust transition-colors duration-300">
        {children}
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-mist-paper py-24 md:py-40 px-6 md:px-16 lg:px-24">
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-20 md:gap-12">
        <Reveal type="fade-up" className="w-full md:w-auto">
          <MagneticButton href="mailto:anna@korni-therapy.ru">
            Написать
          </MagneticButton>
        </Reveal>

        <Reveal type="fade-up" delay={0.2} className="w-full md:w-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:flex md:flex-col gap-12 md:min-w-[340px]">
            <div className="flex flex-col gap-3 border-b border-forest-ink/10 pb-6">
              <span className="text-[14px] uppercase tracking-widest font-semibold text-forest-ink">Контакты</span>
              <AnimatedLink href="tel:+79991234567" className="text-[20px] text-sage-dust hover:text-forest-ink transition-colors">+7 (999) 123-45-67</AnimatedLink>
              <AnimatedLink href="mailto:anna@korni-therapy.ru" className="text-[20px] text-sage-dust hover:text-forest-ink transition-colors">anna@korni-therapy.ru</AnimatedLink>
            </div>

            <div className="flex flex-col gap-3 border-b border-forest-ink/10 pb-6">
              <span className="text-[14px] uppercase tracking-widest font-semibold text-forest-ink">Студия</span>
              <span className="text-[20px] text-sage-dust leading-relaxed">str. Ion Creangă 1<br/>Chișinău, Moldova</span>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[14px] uppercase tracking-widest font-semibold text-forest-ink">Соцсети</span>
              <div className="flex flex-col sm:flex-row md:flex-col gap-1 sm:gap-4 md:gap-1">
                <AnimatedLink href="#" className="text-[20px] text-sage-dust hover:text-forest-ink transition-colors">Instagram</AnimatedLink>
                <AnimatedLink href="#" className="text-[20px] text-sage-dust hover:text-forest-ink transition-colors">Telegram</AnimatedLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="w-full mt-32 pt-8 border-t border-forest-ink/10 flex flex-col md:flex-row justify-between gap-4 text-[14px] text-pine-shadow">
        <span>© 2026 Корни.</span>
        <span>Сделано с заботой о теле</span>
      </div>
    </footer>
  );
}
