"use client";

import { useRef } from "react";
import AnimatedLink from "./AnimatedLink";
import Reveal from "./Reveal";

function MagneticButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <button
      ref={ref}
      onClick={onClick}
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
    </button>
  );
}

import { useState } from "react";
import ContactPopup from "./ContactPopup";

export default function Footer() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <footer id="contact" className="w-full bg-mist-paper py-24 md:py-40 px-6 md:px-16 lg:px-24">
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-20 md:gap-12">
        <Reveal type="fade-up" className="w-full md:w-auto">
          <MagneticButton onClick={() => setPopupOpen(true)}>
            Написать
          </MagneticButton>
        </Reveal>

        <Reveal type="fade-up" delay={0.2} className="w-full md:w-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:flex md:flex-col gap-12 md:min-w-[340px]">
            <div className="flex flex-col gap-3 border-b border-forest-ink/10 pb-6">
              <span className="text-[14px] uppercase tracking-widest font-semibold text-forest-ink">Контакты</span>
              <AnimatedLink href="tel:+37369715536" className="text-[20px] text-sage-dust hover:text-forest-ink transition-colors">0697 15 536</AnimatedLink>
              <div className="flex gap-4 mt-2">
                <a href="https://t.me/+37369715536" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9] hover:text-white-sheet flex items-center justify-center transition-colors duration-300" aria-label="Telegram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2L2 10.5L9.5 13.5L14 21.5L21.5 2Z" />
                    <path d="M9.5 13.5L14 9" />
                  </svg>
                </a>
                <a href="https://wa.me/37369715536" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white-sheet flex items-center justify-center transition-colors duration-300" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>
                <a href="viber://chat?number=%2B37369715536" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#7360F2]/10 text-[#7360F2] hover:bg-[#7360F2] hover:text-white-sheet flex items-center justify-center transition-colors duration-300" aria-label="Viber">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-b border-forest-ink/10 pb-6">
              <span className="text-[14px] uppercase tracking-widest font-semibold text-forest-ink">Студия</span>
              <span className="text-[20px] text-sage-dust leading-relaxed">str. I. Creangă 1/2<br/>Chișinău, Moldova</span>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[14px] uppercase tracking-widest font-semibold text-forest-ink">Соцсети</span>
              <div className="flex flex-col sm:flex-row md:flex-col gap-1 sm:gap-4 md:gap-1">
                <AnimatedLink href="https://www.instagram.com/kineto_one/" external className="text-[20px] text-sage-dust hover:text-forest-ink transition-colors">Instagram</AnimatedLink>
                <AnimatedLink href="https://www.facebook.com/profile.php?id=61574692887644" external className="text-[20px] text-sage-dust hover:text-forest-ink transition-colors">Facebook</AnimatedLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="w-full mt-32 pt-8 border-t border-forest-ink/10 flex flex-col md:flex-row justify-between gap-4 text-[14px] text-pine-shadow">
        <span>© 2026 Kineto One.</span>
        <span>Сделано с заботой о теле</span>
      </div>

      <ContactPopup 
        isOpen={popupOpen} 
        onClose={() => setPopupOpen(false)} 
      />
    </footer>
  );
}
