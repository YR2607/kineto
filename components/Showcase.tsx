"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";
import ContactPopup from "./ContactPopup";

const works = [
  {
    title: "Спортивное\nвосстановление",
    description:
      "Кинетотерапия после травм. Поэтапное возвращение амплитуды, снятие блоков и возвращение уверенности в движении.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1800&auto=format&fit=crop",
    tag: "01",
  },
  {
    title: "Хронический\nстресс",
    description:
      "Глубокая работа с зажимами шеи и спины. Миофасциальный релиз для полного обнуления нервной системы.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1800&auto=format&fit=crop",
    tag: "02",
  },
  {
    title: "Осознанное\nтело",
    description:
      "Профилактический массаж и коррекция осанки. Инвестиция в то, как вы будете чувствовать себя через 10 лет.",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1800&auto=format&fit=crop",
    tag: "03",
  },
];

const STICKY_OFFSET = 96;

export default function Showcase() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section id="work" className="relative w-full bg-white-sheet">
      {/* Header — full width, not sticky to avoid overlapping first case */}
      <div className="px-6 md:px-16 lg:px-24 py-5 md:py-7">
        <h2 className="text-forest-ink text-[11px] md:text-[12px] font-medium uppercase tracking-[0.2em]">
          Избранная практика ↓
        </h2>
      </div>

      {/* Works — full-bleed sticky stacking, background images, giant type */}
      <div className="flex flex-col">
        {works.map((work, i) => (
          <article
            key={i}
            className="group md:sticky bg-white-sheet overflow-hidden"
            style={{ top: `${i * STICKY_OFFSET}px` }}
          >
            <div className="relative w-full min-h-[60vh] md:min-h-[calc(100vh-96px)] flex items-center">
              {/* Background image — full bleed, very subtle */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover opacity-10 group-hover:opacity-15 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white-sheet/90 via-white-sheet/80 to-white-sheet/95" />
              </div>

              {/* Content — image left, text right on desktop */}
              <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-12 md:py-20">
                <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 lg:gap-24">
                  {/* Image card */}
                  <div className="relative w-full md:w-[40%] lg:w-[35%] shrink-0">
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-mist-paper shadow-[0_8px_40px_rgba(0,51,41,0.08)]">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white-sheet/90 backdrop-blur-sm px-3 py-1 rounded-full text-[12px] font-medium text-forest-ink">
                        {work.tag}
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col gap-6 md:gap-8 flex-1">
                    <h3 className="text-forest-ink text-[12vw] md:text-[6vw] lg:text-[5vw] font-semibold leading-[0.95] tracking-[-0.04em] whitespace-pre-line group-hover:text-sage-dust transition-colors duration-500">
                      {work.title}
                    </h3>

                    <p className="text-sage-dust text-[18px] md:text-[22px] lg:text-[24px] leading-[1.5] max-w-xl">
                      {work.description}
                    </p>

                    <button
                      onClick={() => setPopupOpen(true)}
                      className="inline-flex items-center gap-2 text-forest-ink text-[15px] md:text-[17px] font-medium border-b border-forest-ink/30 hover:border-forest-ink pb-1 transition-all duration-300 whitespace-nowrap w-fit"
                    >
                      Подробнее
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <ContactPopup 
        isOpen={popupOpen} 
        onClose={() => setPopupOpen(false)} 
        showPhone={true}
      />
    </section>
  );
}
