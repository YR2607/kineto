import AnimatedLink from "./AnimatedLink";
import Reveal from "./Reveal";

const serviceCategories = [
  {
    title: "Спина и шея",
    href: "/services/back-pain",
    items: [
      "Боли в пояснице и шее",
      "Скованность движений",
      "Восстановление мышечного контроля",
    ],
  },
  {
    title: "Спорт",
    href: "/services/sports-rehab",
    items: [
      "Восстановление после травм",
      "Спортивные перегрузки",
      "Мобильность и выносливость",
    ],
  },
  {
    title: "После операций",
    href: "/services/post-op",
    items: [
      "Восстановление объема движений",
      "Постепенное укрепление мышц",
      "Развитие выносливости",
    ],
  },
  {
    title: "Неврология",
    href: "/services/neurology",
    items: [
      "Реабилитация после инсульта",
      "Тренировка равновесия",
      "Восстановление координации",
    ],
  },
  {
    title: "Суставы",
    href: "/services/joints",
    items: [
      "Плечо, колено, голеностоп",
      "Возврат подвижности",
      "Стабильность сустава",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full bg-mist-paper py-24 md:py-40 px-6 md:px-16 lg:px-24">
      <div className="w-full">

        <Reveal type="fade-up">
          <div className="flex items-end justify-between border-b border-forest-ink/10 pb-6 mb-16 md:mb-24">
            <h2 className="text-[16px] md:text-[20px] font-semibold uppercase tracking-widest text-forest-ink">
              Направления реабилитации
            </h2>
            <span className="text-sage-dust text-[14px] md:text-[16px]">05 направлений</span>
          </div>
        </Reveal>

        <Reveal type="fade-up">
          <h3 className="text-forest-ink text-[36px] md:text-[6vw] font-semibold leading-[0.9] tracking-tight mb-20 md:mb-28 max-w-[1000px]">
            Когда движение становится ограниченным — важно найти{" "}
            <span className="italic-accent text-forest-ink">правильный путь</span>{" "}
            к восстановлению.
          </h3>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {serviceCategories.map((cat, idx) => (
            <Reveal key={cat.title} type="fade-up" delay={idx * 0.1} threshold={0.1}>
              <div className="relative group h-full flex flex-col justify-between p-8 md:p-10 rounded-[24px] bg-white-sheet border border-forest-ink/5 transition-all duration-500 hover:border-forest-ink/15 hover:shadow-[0_20px_60px_rgba(0,51,41,0.06)] hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-chartreuse-sprig/20 rounded-bl-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700 ease-out pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-forest-ink/15 text-forest-ink/60 text-[14px] font-medium tracking-widest group-hover:bg-chartreuse-sprig group-hover:border-chartreuse-sprig group-hover:text-forest-ink transition-all duration-500">
                      0{idx + 1}
                    </span>
                    <h4 className="text-[22px] md:text-[26px] font-semibold tracking-tight text-forest-ink leading-[1.1]">
                      {cat.title}
                    </h4>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="text-[16px] md:text-[17px] text-sage-dust flex items-start gap-4 transition-colors duration-300 group-hover:text-forest-ink/80 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-chartreuse-sprig mt-[10px] flex-shrink-0 shadow-[0_0_8px_rgba(230,255,163,0.8)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="relative z-10 mt-10 pt-6 border-t border-forest-ink/5 group-hover:border-forest-ink/10 transition-colors duration-500">
                  <a href={cat.href} className="inline-flex items-center justify-between w-full text-[15px] md:text-[17px] font-medium text-forest-ink group/link">
                    <span>Узнать больше</span>
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-mist-paper flex items-center justify-center group-hover/link:bg-chartreuse-sprig group-hover/link:text-forest-ink transition-colors duration-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 transition-transform duration-300">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
