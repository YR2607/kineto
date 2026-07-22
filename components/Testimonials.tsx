import Reveal from "./Reveal";

const testimonials = [
  {
    text: "После трёх сеансов кинетотерапии перестала болеть спина, которая мучила годами. Анна нашла причину там, где врачи только назначали обезболивающие.",
    author: "Мария К.",
    role: "дизайнер интерьеров",
  },
  {
    text: "Пришёл после травмы колена — не мог нормально ходить. Через месяц вернулся к тренировкам. Грамотный подход и очень внимательное отношение.",
    author: "Дмитрий П.",
    role: "бегун-любитель",
  },
  {
    text: "Лучший массаж в городе. Ухожу каждый раз как заново родившаяся. Анна чувствует тело так, будто знает его лучше тебя самой.",
    author: "Елена С.",
    role: "учитель",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-mist-paper py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal type="fade-up">
          <h2 className="heading-text text-forest-ink pb-16">
            Отзывы
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {testimonials.map((t, idx) => (
            <Reveal key={t.author} type="fade-up" delay={idx * 0.1}>
              <div
                className={`flex flex-col gap-5 py-10 ${
                  idx !== testimonials.length - 1
                    ? "border-b border-white-sheet"
                    : ""
                }`}
              >
                <p className="body-lg-text text-forest-ink max-w-[680px]">
                  {t.text}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-forest-ink text-[14px] font-semibold">
                    {t.author}
                  </span>
                  <span className="body-sm-text text-sage-dust">
                    — {t.role}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
