import Reveal from "./Reveal";

const steps = [
  {
    num: "01",
    title: "Оценка",
    description: "Проводим первичную оценку состояния и определяем основные ограничения.",
  },
  {
    num: "02",
    title: "Цели",
    description: "Определяем, чего необходимо достичь: уменьшить ограничения, восстановить движение, силу, равновесие или вернуться к спорту.",
  },
  {
    num: "03",
    title: "Программа",
    description: "Подбираем индивидуальный комплекс упражнений и методов физической реабилитации.",
  },
  {
    num: "04",
    title: "Контроль",
    description: "Отслеживаем изменения и постепенно адаптируем нагрузку.",
  },
  {
    num: "05",
    title: "Возвращение к активности",
    description: "Постепенно возвращаем человека к привычной жизни, работе, физической активности или спорту.",
  },
];

export default function Process() {
  return (
    <section id="process" className="w-full bg-white-sheet py-24 md:py-40 px-6 md:px-16 lg:px-24">
      <div className="w-full">
        <Reveal type="fade-up">
          <div className="flex items-end justify-between border-b border-forest-ink/10 pb-6 mb-16 md:mb-24">
            <h2 className="text-[16px] md:text-[20px] font-semibold uppercase tracking-widest text-forest-ink">
              Как проходит реабилитация?
            </h2>
            <span className="text-sage-dust text-[14px] md:text-[16px]">05 шагов</span>
          </div>
        </Reveal>

        <Reveal type="fade-up">
          <h3 className="text-forest-ink text-[32px] md:text-[5vw] font-semibold leading-[0.95] tracking-tight mb-20 md:mb-32 max-w-[1000px]">
            Мы оцениваем состояние → определяем задачи → подбираем нагрузку →{" "}
            <span className="italic-accent text-forest-ink">контролируем прогресс.</span>
          </h3>
        </Reveal>

        <div className="flex flex-col relative before:absolute before:left-[7px] md:before:left-[11px] before:top-4 before:bottom-12 before:w-[1px] before:bg-forest-ink/10">
          {steps.map((step, idx) => (
            <Reveal key={step.num} type="fade-up" delay={idx * 0.1}>
              <div className="relative flex flex-col md:flex-row gap-6 md:gap-16 py-8 md:py-16 group">
                <div className="absolute left-2 md:left-3 top-10 md:top-20 w-3 h-3 rounded-full bg-mist-paper border border-forest-ink/20 group-hover:bg-chartreuse-sprig group-hover:border-chartreuse-sprig group-hover:scale-125 transition-all duration-500 -translate-x-1/2" />
                
                <div className="md:w-[40%] flex items-start gap-8 md:gap-16 pl-10 md:pl-24">
                  <span className="text-forest-ink/30 text-[14px] md:text-[18px] font-medium tracking-widest mt-2 transition-colors duration-500 group-hover:text-forest-ink/60">
                    {step.num}
                  </span>
                  <h4 className="text-[24px] md:text-[40px] font-semibold text-forest-ink tracking-tight leading-[1]">
                    {step.title}
                  </h4>
                </div>
                
                <div className="md:w-[60%] flex items-center pl-10 md:pl-0">
                  <p className="text-[16px] md:text-[22px] text-sage-dust leading-[1.6] max-w-[600px] group-hover:text-forest-ink transition-colors duration-500">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}