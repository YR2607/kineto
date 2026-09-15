const needs = [
  {
    title: "Боль и скованность",
    description:
      "Дискомфорт в спине, шее или суставах, который мешает работе, отдыху и обычной активности.",
    services: ["back-pain", "joints"],
  },
  {
    title: "Восстановление после травмы",
    description:
      "Постепенное возвращение движения и нагрузки после спортивных и бытовых травм.",
    services: ["sports-rehab", "manual-therapy"],
  },
  {
    title: "Реабилитация после операции",
    description:
      "Поэтапное восстановление объёма движений, силы и выносливости под контролем специалиста.",
    services: ["post-op", "kinesiotherapy"],
  },
  {
    title: "Неврологические состояния",
    description:
      "Работа с движением, равновесием и координацией после неврологических изменений.",
    services: ["neurology", "kinesiotherapy"],
  },
  {
    title: "Профилактика и уход",
    description:
      "Поддержание подвижности, снятие напряжения и регулярный уход за телом.",
    services: ["massage", "manual-therapy"],
  },
  {
    title: "Движение и контроль",
    description:
      "Улучшение контроля над телом, осанки и выносливости в повседневной активности.",
    services: ["kinesiotherapy", "massage"],
  },
];

export default function Needs() {
  return (
    <section id="needs" className="bg-mist-paper py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <p className="text-sm font-medium uppercase tracking-widest text-sage-dust">
          С чем помогаем
        </p>
        <h2 className="mt-5 max-w-[800px] text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-5xl">
          Разные причины прийти — один подход: оценка, план и постепенная
          практика
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {needs.map((need) => (
            <div
              key={need.title}
              className="flex flex-col rounded-2xl border border-forest-ink/10 bg-white-sheet p-7 transition-all duration-200 hover:-translate-y-1 hover:border-forest-ink/20 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-forest-ink">
                {need.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-sage-dust">
                {need.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
