const needs = [
  {
    title: "Боль в колене",
    description: "После травм, операций, перегрузок и спорта.",
  },
  {
    title: "Плечо",
    description: "Ограничение движения, травмы и восстановление после операций.",
  },
  {
    title: "Спина и шея",
    description: "Боль, ограничение движения и мышечное напряжение.",
  },
  {
    title: "Спортивные травмы",
    description: "Безопасное возвращение к тренировкам и соревнованиям.",
  },
  {
    title: "После операции",
    description: "Постепенное восстановление движения, силы и функции.",
  },
  {
    title: "Неврологическая реабилитация",
    description: "Работа над движением, координацией, балансом и самостоятельностью.",
  },
];

export default function Needs() {
  return (
    <section id="needs" className="bg-white-sheet py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-5xl">
          С чем к нам обращаются
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {needs.map((need) => (
            <div
              key={need.title}
              className="flex flex-col rounded-2xl border border-forest-ink/10 bg-mist-paper p-7 transition-all duration-200 hover:-translate-y-1 hover:border-chartreuse-sprig/40 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-forest-ink">
                {need.title}
              </h3>
              <p className="mt-3 leading-relaxed text-sage-dust">
                {need.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
