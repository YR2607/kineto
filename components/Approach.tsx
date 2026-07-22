import Reveal from "./Reveal";

const approachCategories = [
  {
    title: "Диагностика",
    items: [
      "Оценка осанки и движения",
      "Анализ болевых паттернов",
      "Тестирование подвижности суставов",
    ],
  },
  {
    title: "Тело",
    items: [
      "Кинетотерапия",
      "Миофасциальный релиз",
      "Лечебный массаж",
      "Расслабляющий массаж",
    ],
  },
  {
    title: "Движение",
    items: [
      "Коррекция двигательных стереотипов",
      "Упражнения для самостоятельной работы",
      "Восстановление после травм",
    ],
  },
  {
    title: "Забота",
    items: [
      "Сопровождение между сеансами",
      "Рекомендации по образу жизни",
      "Консультации онлайн",
    ],
  },
];

export default function Approach() {
  return (
    <section id="approach" className="bg-white-sheet py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal type="fade-up">
          <h2 className="heading-text text-forest-ink pb-16">
            Подход
          </h2>
        </Reveal>

        <div className="flex flex-col gap-12 max-w-[760px] pb-16">
          <Reveal type="fade-up" delay={0.1}>
            <h3 className="text-forest-ink text-[36px] font-semibold leading-[1] tracking-[-1.4px]">
              Меньше, но{" "}
              <span className="italic-accent text-forest-ink">
                точнее
              </span>
              .
            </h3>
          </Reveal>
          <Reveal type="fade-up" delay={0.2}>
            <p className="body-lg-text text-sage-dust">
              На любом этапе — от разовой консультации до полного курса — один
              принцип: не больше, а правильнее. Диагностика, которая находит
              истину. Техника, которая попадает точно в цель. Движение, которое
              возвращает телу свободу.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {approachCategories.map((cat, idx) => (
            <Reveal key={cat.title} type="fade-up" delay={idx * 0.1}>
              <div className="flex flex-col gap-4">
                <h3 className="subheading-text text-forest-ink">
                  {cat.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="body-sm-text text-sage-dust flex items-start gap-2"
                    >
                      <span className="text-forest-ink mt-[2px]">—</span>
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
