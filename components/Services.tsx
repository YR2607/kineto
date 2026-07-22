import Reveal from "./Reveal";

const serviceCategories = [
  {
    title: "Диагностика",
    items: [
      "Оценка осанки",
      "Двигательные тесты",
      "Анализ боли",
      "Построение плана"
    ],
  },
  {
    title: "Кинетотерапия",
    items: [
      "Работа с травмами",
      "Суставная гимнастика",
      "Снятие блоков",
      "Восстановление"
    ],
  },
  {
    title: "Массаж",
    items: [
      "Лечебный массаж",
      "Миофасциальный релиз",
      "Спортивный массаж",
      "Расслабляющий"
    ],
  },
  {
    title: "Забота",
    items: [
      "Онлайн-сопровождение",
      "Домашние задания",
      "Коррекция привычек",
      "Поддержка"
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
              Услуги
            </h2>
            <span className="text-sage-dust text-[14px] md:text-[16px]">04 направления</span>
          </div>
        </Reveal>

        <Reveal type="fade-up">
          <h3 className="text-forest-ink text-[36px] md:text-[6vw] font-semibold leading-[0.9] tracking-tight mb-20 md:mb-28 max-w-[1000px]">
            Точно,{" "}
            <span className="italic-accent text-forest-ink">до самого конца</span>.
          </h3>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((cat, idx) => (
            <Reveal key={cat.title} type="fade-up" delay={idx * 0.1} threshold={0.1}>
              <div className="group h-full flex flex-col gap-6 p-6 rounded-2xl bg-white-sheet/60 border border-forest-ink/8 transition-all duration-500 hover:bg-white-sheet hover:border-forest-ink/15 hover:translate-y-[-4px] hover:shadow-[0_8px_30px_rgba(0,51,41,0.06)]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-chartreuse-sprig" />
                  <h4 className="text-[20px] md:text-[24px] font-semibold tracking-tight text-forest-ink">
                    {cat.title}
                  </h4>
                </div>
                <ul className="flex flex-col gap-3">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="text-[16px] md:text-[18px] text-sage-dust flex items-start gap-3 transition-colors duration-300 group-hover:text-forest-ink"
                    >
                      <span className="text-forest-ink/40 mt-[2px] group-hover:text-chartreuse-sprig transition-colors duration-300">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
