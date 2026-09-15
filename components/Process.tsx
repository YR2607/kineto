const steps = [
  {
    num: "01",
    title: "Оценка",
    description:
      "На первой встрече специалист уточняет историю симптомов, оценивает доступный объём движения и обсуждает цели.",
  },
  {
    num: "02",
    title: "План",
    description:
      "Подбирается индивидуальная последовательность упражнений и ручных техник в пределах профессиональной компетенции студии.",
  },
  {
    num: "03",
    title: "Практика",
    description:
      "Постепенная работа с нагрузкой и движением, рекомендации для самостоятельной практики между встречами.",
  },
  {
    num: "04",
    title: "Контроль прогресса",
    description:
      "Регулярная оценка реакции на нагрузку и адаптация программы по обратной связи.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-mist-paper py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <p className="text-sm font-medium uppercase tracking-widest text-sage-dust">
          Как проходит работа
        </p>
        <h2 className="mt-5 max-w-[800px] text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-5xl">
          Оценка, план, практика и контроль прогресса
        </h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.num} className="flex flex-col">
              <span className="text-sm font-medium tracking-widest text-sage-dust">
                {step.num}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-forest-ink">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-sage-dust">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
