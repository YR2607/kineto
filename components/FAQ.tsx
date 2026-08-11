"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Можно ли заниматься, если у меня болит спина?",
    a: "Это зависит от причины боли и состояния человека. Перед началом занятий необходимо провести оценку и определить, какие нагрузки допустимы.",
  },
  {
    q: "Можно ли заниматься после операции?",
    a: "Да, физическая реабилитация часто является важной частью восстановления после операций. Сроки и программа зависят от вида операции и этапа восстановления.",
  },
  {
    q: "Можно ли заниматься после инсульта?",
    a: "Да. Программа неврологической реабилитации подбирается индивидуально с учетом состояния и возможностей человека.",
  },
  {
    q: "Можно ли спортсмену вернуться к тренировкам после травмы?",
    a: "Да, но возвращение должно быть постепенным. Важно восстановить не только движение, но и силу, координацию, стабильность и способность переносить необходимые нагрузки.",
  },
  {
    q: "Сколько нужно занятий?",
    a: "Количество занятий индивидуально. Оно зависит от проблемы, целей, состояния человека и динамики восстановления.",
  },
  {
    q: "Нужна ли консультация перед первым занятием?",
    a: "Да. Первичная оценка помогает определить состояние и выбрать наиболее подходящую программу.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full bg-mist-paper py-24 md:py-40 px-6 md:px-16 lg:px-24">
      <div className="w-full">
        <Reveal type="fade-up">
          <div className="flex items-end justify-between border-b border-forest-ink/10 pb-6 mb-16 md:mb-24">
            <h2 className="text-[16px] md:text-[20px] font-semibold uppercase tracking-widest text-forest-ink">
              Вопросы и ответы
            </h2>
            <span className="text-sage-dust text-[14px] md:text-[16px]">FAQ</span>
          </div>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/3">
            <Reveal type="fade-up">
              <div className="sticky top-32">
                <h3 className="text-forest-ink text-[36px] md:text-[4vw] lg:text-[3.5vw] font-semibold leading-[0.95] tracking-tight">
                  Часто{" "}
                  <span className="italic-accent text-forest-ink block">задаваемые</span>
                  вопросы
                </h3>
              </div>
            </Reveal>
          </div>

          <div className="lg:w-2/3 flex flex-col gap-3 md:gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <Reveal key={idx} type="fade-up" delay={idx * 0.1}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className={`group w-full text-left p-6 md:p-8 rounded-[20px] transition-all duration-500 border ${
                      isOpen
                        ? "bg-white-sheet border-forest-ink/15 shadow-[0_8px_30px_rgba(0,51,41,0.06)] scale-[1.01]"
                        : "bg-white-sheet/50 border-forest-ink/5 hover:bg-white-sheet/90 hover:scale-[1.005]"
                    }`}
                  >
                    <div className="flex justify-between items-center gap-6">
                      <h4 className={`text-[18px] md:text-[22px] font-semibold pr-8 transition-colors duration-300 ${isOpen ? "text-forest-ink" : "text-forest-ink/80 group-hover:text-forest-ink"}`}>
                        {faq.q}
                      </h4>
                      <span className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-500 ${isOpen ? "rotate-180 bg-chartreuse-sprig border-chartreuse-sprig text-forest-ink shadow-sm" : "border-forest-ink/10 text-forest-ink/50 group-hover:border-forest-ink/20 group-hover:text-forest-ink"}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </div>
                    
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[16px] md:text-[18px] text-sage-dust leading-relaxed pt-2 border-t border-forest-ink/5">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}