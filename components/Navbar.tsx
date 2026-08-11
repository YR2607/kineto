"use client";

import { useEffect, useState } from "react";
import ContactPopup from "./ContactPopup";

const links = [
  { href: "/#work", label: "Практика" },
  { href: "/#services", label: "Услуги" },
  { href: "/#about", label: "О специалисте" },
  { href: "/#contact", label: "Контакты" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > 200);
      setLastY(y);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-mist-paper/70 backdrop-blur-xl border-b border-forest-ink/8"
            : "bg-transparent"
        } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <nav className="mx-auto flex w-full items-center justify-between px-6 md:px-16 lg:px-24 py-4 md:py-5">
          {/* Brand */}
          <a
            href="/"
            className="text-forest-ink text-[20px] md:text-[24px] font-semibold tracking-[-0.02em] hover:text-sage-dust transition-colors duration-300 flex items-center gap-2"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-chartreuse-sprig" />
            Kineto One
          </a>

          {/* Desktop links — horizontal */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-forest-ink text-[15px] lg:text-[16px] font-medium tracking-tight">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline hover:text-sage-dust transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setPopupOpen(true)}
              className="text-forest-ink text-[15px] font-semibold tracking-tight hover:text-sage-dust transition-colors duration-300"
            >
              0697 15 536
            </button>

            {/* CTA button */}
            <button
              onClick={() => setPopupOpen(true)}
              className="inline-flex items-center gap-2 text-forest-ink text-[14px] font-medium bg-forest-ink/5 hover:bg-chartreuse-sprig/60 px-4 py-2 rounded-full transition-all duration-300"
            >
              Записаться
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative flex flex-col justify-center items-center w-10 h-10 md:hidden"
            aria-label="Меню"
            aria-expanded={mobileOpen}
          >
            <span
              className={`absolute block h-[1.5px] w-6 bg-forest-ink transition-transform duration-300 ${
                mobileOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute block h-[1.5px] w-6 bg-forest-ink transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block h-[1.5px] w-6 bg-forest-ink transition-transform duration-300 ${
                mobileOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-mist-paper transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full px-6 pt-24 pb-12">
          <div className="flex flex-col gap-2">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-forest-ink text-[40px] sm:text-[52px] font-semibold tracking-tight leading-[1.15] py-3 hover:text-sage-dust hover:pl-3 transition-all duration-300"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileOpen(false);
              setTimeout(() => setPopupOpen(true), 300);
            }}
            className="inline-flex items-center justify-between text-forest-ink text-[18px] font-medium bg-chartreuse-sprig/50 px-5 py-4 rounded-2xl"
          >
            Записаться на приём
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      <ContactPopup 
        isOpen={popupOpen} 
        onClose={() => setPopupOpen(false)} 
        showPhone={true}
      />
    </>
  );
}
