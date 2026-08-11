"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showPhone?: boolean;
}

export default function ContactPopup({ isOpen, onClose, title = "Связаться с нами", showPhone = false }: ContactPopupProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[100] bg-forest-ink/20 backdrop-blur-sm transition-all duration-500 ease-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 z-[101] w-[92%] max-w-[400px] max-h-[90vh] overflow-y-auto bg-white-sheet rounded-[24px] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,51,41,0.1)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "-translate-y-1/2 opacity-100 scale-100" : "-translate-y-[40%] opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-mist-paper hover:bg-forest-ink/10 transition-colors text-forest-ink"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h3 className="text-[20px] md:text-[22px] font-semibold text-forest-ink mb-2 pr-8">{title}</h3>
        <p className="text-[14px] md:text-[15px] text-sage-dust mb-6 md:mb-8">Выберите удобный для вас способ связи. Мы ответим в ближайшее время.</p>

        <div className="flex flex-col gap-3">
          {showPhone && (
            <a 
              href="tel:+37369715536"
              className="flex items-center gap-4 w-full p-4 rounded-xl bg-mist-paper/50 border border-forest-ink/5 hover:bg-mist-paper hover:border-forest-ink/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-forest-ink text-white-sheet flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone size={18} />
              </div>
              <span className="text-[16px] font-medium text-forest-ink">Позвонить</span>
            </a>
          )}

          <a 
            href="https://t.me/+37369715536" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full p-4 rounded-xl bg-[#E3F2FD] border border-[#229ED9]/20 hover:bg-[#D0E9FA] transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#229ED9] text-white-sheet flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2L2 10.5L9.5 13.5L14 21.5L21.5 2Z" />
                <path d="M9.5 13.5L14 9" />
              </svg>
            </div>
            <span className="text-[16px] font-medium text-forest-ink">Написать в Telegram</span>
          </a>

          <a 
            href="https://wa.me/37369715536" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full p-4 rounded-xl bg-[#E8F5E9] border border-[#25D366]/20 hover:bg-[#D5EEDB] transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-white-sheet flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MessageCircle size={20} />
            </div>
            <span className="text-[16px] font-medium text-forest-ink">Написать в WhatsApp</span>
          </a>

          <a 
            href="viber://chat?number=%2B37369715536" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full p-4 rounded-xl bg-[#F3E5F5] border border-[#7360F2]/20 hover:bg-[#E8D5EB] transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#7360F2] text-white-sheet flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MessageCircle size={20} />
            </div>
            <span className="text-[16px] font-medium text-forest-ink">Написать в Viber</span>
          </a>
        </div>
      </div>
    </>
  );
}