import { ArrowDown } from "lucide-react";

const cases = [
  {
    title: "Восстановление после травмы колена",
    problem: "[Описание проблемы пациента]",
    goal: "[Цель восстановления]",
    process: "[Краткое описание процесса]",
    result: "[Измеримый результат]",
    period: "[X недель]",
  },
];

export default function Results() {
  return (
    <section id="results" className="bg-white-sheet py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-5xl">
          Результаты, которые можно измерить
        </h2>
        <p className="mt-5 max-w-[600px] text-lg leading-relaxed text-sage-dust">
          Мы не обещаем гарантированного выздоровления. Но мы отслеживаем
          конкретные показатели и показываем, как меняется состояние.
        </p>
        <div className="mt-12 grid gap-6">
          {cases.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-forest-ink/10 bg-mist-paper p-7 md:p-10"
            >
              <h3 className="text-xl font-semibold text-forest-ink md:text-2xl">
                {item.title}
              </h3>
              <div className="mt-8 grid gap-6 md:grid-cols-4">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium uppercase tracking-widest text-chartreuse-sprig">
                    Проблема
                  </span>
                  <span className="text-base leading-relaxed text-sage-dust">
                    {item.problem}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowDown
                    size={20}
                    strokeWidth={1.75}
                    className="text-forest-ink/30 md:rotate-[-90deg]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium uppercase tracking-widest text-chartreuse-sprig">
                    Цель
                  </span>
                  <span className="text-base leading-relaxed text-sage-dust">
                    {item.goal}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium uppercase tracking-widest text-chartreuse-sprig">
                    Процесс
                  </span>
                  <span className="text-base leading-relaxed text-sage-dust">
                    {item.process}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 border-t border-forest-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium uppercase tracking-widest text-chartreuse-sprig">
                    Результат
                  </span>
                  <span className="text-base font-medium text-forest-ink">
                    {item.result}
                  </span>
                </div>
                <span className="text-sm text-sage-dust">
                  Период: {item.period}
                </span>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-sage-dust">
          Реальные кейсы будут добавлены после согласия пациентов. Мы не
          публикуем выдуманные результаты.
        </p>
      </div>
    </section>
  );
}
