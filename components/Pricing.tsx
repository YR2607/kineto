import ContactTrigger from "./contact/ContactTrigger";

const pricing = [
  {
    name: "Первичная оценка",
    price: "[XXX MDL]",
    description:
      "Знакомство, оценка состояния и обсуждение целей. Основа для дальнейшего плана.",
  },
  {
    name: "Индивидуальная реабилитация",
    price: "[XXX MDL]",
    description:
      "Программа работы с движением, силой и нагрузкой под вашим состоянием.",
    featured: true,
  },
  {
    name: "Другие услуги",
    price: "[XXX MDL]",
    description:
      "Массаж, мануальная терапия и дополнительные направления по запросу.",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-mist-paper py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-5xl">
          Стоимость
        </h2>
        <p className="mt-5 max-w-[600px] text-lg leading-relaxed text-sage-dust">
          Точные цены будут указаны после согласования. Если вы не уверены, какая
          услуга подходит, напишите нам, и специалист поможет определить
          следующий шаг.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pricing.map((item) => (
            <div
              key={item.name}
              className={`flex flex-col rounded-2xl border p-7 ${
                item.featured
                  ? "border-chartreuse-sprig bg-white-sheet shadow-sm"
                  : "border-forest-ink/10 bg-white-sheet"
              }`}
            >
              <h3 className="text-lg font-semibold text-forest-ink">
                {item.name}
              </h3>
              <p className="mt-4 text-3xl font-semibold text-forest-ink">
                {item.price}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-sage-dust">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <ContactTrigger className="mt-10 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-chartreuse-sprig px-8 text-base font-semibold text-white-sheet shadow-sm transition-all duration-200 hover:bg-vivid-lime hover:shadow-md active:scale-[0.98] sm:w-auto sm:min-w-[240px]">
          Записаться на первичную оценку
        </ContactTrigger>
      </div>
    </section>
  );
}
