const advantages = [
  {
    title: "Индивидуальный подход",
    description:
      "Программа подбирается под ваше состояние, цели и темп восстановления.",
  },
  {
    title: "Работа с причиной",
    description:
      "Оцениваем не только симптом, но и его источник, чтобы влиять на основание проблемы.",
  },
  {
    title: "Контроль прогресса",
    description:
      "Регулярно отслеживаем изменения и адаптируем нагрузку по обратной связи.",
  },
  {
    title: "Возвращение к жизни",
    description:
      "Цель не просто снять боль, а вернуть движение, уверенность и способность к нагрузке.",
  },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Почему Kineto One"
      className="border-y border-forest-ink/10 bg-mist-paper"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-16 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-forest-ink md:text-3xl">
          Почему Kineto One
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage) => (
            <div key={advantage.title} className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-forest-ink">
                {advantage.title}
              </h3>
              <p className="text-sm leading-relaxed text-sage-dust">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
