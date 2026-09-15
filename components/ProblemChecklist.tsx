import { Check } from "lucide-react";
import ContactTrigger from "./contact/ContactTrigger";

const signs = [
  "Вам больно при ходьбе или тренировке",
  "После травмы вы боитесь снова давать нагрузку",
  "После операции движение ещё ограничено",
  "Не можете полностью поднять руку",
  "Болит спина после работы",
  "Хотите безопасно вернуться к спорту",
];

export default function ProblemChecklist() {
  return (
    <section className="bg-mist-paper py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-4xl">
              Возможно, вы пришли к нам, если
            </h2>
            <p className="mt-6 max-w-[420px] text-lg leading-relaxed text-sage-dust">
              Не уверены, подходит ли вам реабилитация? Напишите нам, и специалист
              поможет понять, с чего начать.
            </p>
            <ContactTrigger className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-chartreuse-sprig px-8 text-base font-semibold text-chartreuse-sprig transition-all duration-200 hover:bg-chartreuse-sprig hover:text-white-sheet active:scale-[0.98] sm:w-auto sm:min-w-[220px]">
              Задать вопрос специалисту
            </ContactTrigger>
          </div>
          <ul className="grid gap-4">
            {signs.map((sign) => (
              <li
                key={sign}
                className="flex items-start gap-3 rounded-xl border border-forest-ink/10 bg-white-sheet px-5 py-4"
              >
                <Check
                  size={20}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-chartreuse-sprig"
                />
                <span className="text-base leading-relaxed text-forest-ink">
                  {sign}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
