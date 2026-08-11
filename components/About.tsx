"use client";

import { useState } from "react";
import AnimatedLink from "./AnimatedLink";
import FloatingShape from "./FloatingShape";
import Reveal from "./Reveal";
import ContactPopup from "./ContactPopup";

export default function About() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section id="about" className="relative w-full bg-white-sheet py-24 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden">
      <FloatingShape
        type="seed"
        size={80}
        color="#52756e"
        className="absolute top-[10%] right-[5%] opacity-10"
        duration={10}
        delay={-4}
      />

      <div className="w-full relative z-10">
        <Reveal type="fade-up">
          <div className="flex items-end justify-between border-b border-forest-ink/10 pb-6 mb-16 md:mb-24">
            <h2 className="text-[16px] md:text-[20px] font-semibold uppercase tracking-widest text-forest-ink">
              Ведущий специалист
            </h2>
            <span className="text-sage-dust text-[14px] md:text-[16px]">Kineto One</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
          <Reveal type="fade-up" delay={0.1}>
            <h3 className="text-forest-ink text-[8vw] md:text-[5vw] font-semibold leading-[0.9] tracking-tight">
              Профессионализм<br />
              <span className="italic-accent text-forest-ink">и забота о теле</span>,<br />
              когда здоровье этого требует.
            </h3>
          </Reveal>

          <div className="flex flex-col gap-8 text-[18px] md:text-[22px] leading-relaxed text-sage-dust md:pl-12">
            <Reveal type="fade-up" delay={0.2}>
              <p>
                Kineto One — это практика ведущего специалиста, кинетотерапевта с более чем
                8 годами опыта. Высшее медицинское образование, сертификация по
                миофасциальному релизу и ортопедическому массажу.
              </p>
            </Reveal>

            <Reveal type="fade-up" delay={0.3}>
              <p>
                Опыт разделён между клинической работой с травмами и тонким
                подходом к расслаблению. Это даёт уникальный
                метод — медицинская точность соединяется с заботой о каждом
                человеке.
              </p>
            </Reveal>

            <Reveal type="fade-up" delay={0.4}>
              <p>
                Мы не работаем по шаблону. Каждый сеанс начинается с диагностики —
                мы находим причину, а не просто убираем симптомы. Тело само
                знает, как восстановиться. Наша задача — помочь ему вспомнить.
              </p>
            </Reveal>

            <Reveal type="fade-up" delay={0.5}>
              <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-forest-ink/10">
                <span className="text-[14px] uppercase tracking-widest font-semibold text-forest-ink">Связаться</span>
                <button 
                  onClick={() => setPopupOpen(true)}
                  className="text-left w-fit link-underline inline-flex items-center gap-2 group text-[20px] text-sage-dust hover:text-forest-ink transition-colors"
                >
                  Записаться на приём
                </button>
                <AnimatedLink href="https://t.me/+37369715536" external>Telegram</AnimatedLink>
                <AnimatedLink href="https://www.instagram.com/kineto_one/" external>Instagram</AnimatedLink>
                <AnimatedLink href="https://www.facebook.com/profile.php?id=61574692887644" external>Facebook</AnimatedLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <ContactPopup 
        isOpen={popupOpen} 
        onClose={() => setPopupOpen(false)} 
        showPhone={true}
      />
    </section>
  );
}
