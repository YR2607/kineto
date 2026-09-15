"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

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
    <section id="faq" className="bg-mist-paper py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <p className="text-sm font-medium uppercase tracking-widest text-sage-dust">
          Вопросы и ответы
        </p>
        <h2 className="mt-5 max-w-[800px] text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-5xl">
          Часто задаваемые вопросы
        </h2>
        <div className="mt-12 flex flex-col gap-3 md:gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const buttonId = `faq-question-${idx}`;
            const panelId = `faq-answer-${idx}`;

            return (
              <article
                key={faq.q}
                className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="faq-item__trigger"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      aria-hidden="true"
                      size={20}
                      strokeWidth={1.75}
                      className="faq-item__icon"
                    />
                  </button>
                </h3>
                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="faq-item__panel"
                  >
                    <p>{faq.a}</p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
