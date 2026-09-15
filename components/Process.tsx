const steps = [
  {
    num: "01",
    title: "Сначала поговорим",
    description:
      "Вы рассказываете, что произошло, где болит и чего хотите достичь. Мы слушаем и уточняем детали.",
  },
  {
    num: "02",
    title: "Проведём оценку",
    description:
      "Проверим движение, силу, ограничения и реакцию на нагрузку. Это основа для плана.",
  },
  {
    num: "03",
    title: "Составим план",
    description:
      "Определим, над чем будем работать и какие шаги нужны именно вам. Без шаблонных программ.",
  },
  {
    num: "04",
    title: "Начнём восстановление",
    description:
      "Постепенно увеличиваем нагрузку и отслеживаем изменения. Вы видите, как продвигаетесь.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-white-sheet py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-5xl">
          Как проходит реабилитация
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <li key={step.num} className="relative flex flex-col">
              <span className="text-sm font-semibold tracking-widest text-chartreuse-sprig">
                {step.num}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-forest-ink">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-sage-dust">
                {step.description}
              </p>
              {idx < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="mt-6 hidden h-px w-full bg-forest-ink/10 lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
