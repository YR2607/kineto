import ContactTrigger from "./contact/ContactTrigger";

export default function Studio() {
  return (
    <section id="studio" className="bg-white-sheet py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <p className="text-sm font-medium uppercase tracking-widest text-sage-dust">
          Студия
        </p>
        <div className="mt-6 grid gap-12 md:grid-cols-2">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-5xl">
            Подход, который строится на оценке и постепенной практике
          </h2>
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-sage-dust">
            <p>
              Kineto One — это студия физической реабилитации в Кишинёве. Работа
              ведётся с людьми разного возраста и уровня активности: от боли и
              скованности до восстановления после травм, операций и
              неврологических состояний.
            </p>
            <p>
              Каждая встреча начинается с оценки текущего состояния. Программа
              подбирается индивидуально и меняется по обратной связи. Студия не
              заменяет медицинскую диагностику или лечение у врача, когда они
              необходимы.
            </p>
            <p>
              Цель — помочь телу постепенно вернуть движение и уверенность в
              нагрузке, опираясь на профессиональную компетенцию и регулярный
              контроль прогресса.
            </p>
            <div className="mt-4">
              <ContactTrigger className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-chartreuse-sprig px-8 text-base font-semibold text-white-sheet shadow-sm transition-all duration-200 hover:bg-vivid-lime hover:shadow-md active:scale-[0.98] sm:w-auto sm:min-w-[200px]">
                Связаться
              </ContactTrigger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
