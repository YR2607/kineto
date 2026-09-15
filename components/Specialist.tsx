import Image from "next/image";
import ContactTrigger from "./contact/ContactTrigger";

const SPECIALIST_IMAGE =
  "https://images.unsplash.com/photo-1611608822650-925c227ef4d2?q=80&w=900&auto=format&fit=crop";

export default function Specialist() {
  return (
    <section id="specialist" className="bg-mist-paper py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-forest-ink/5">
            <Image
              src={SPECIALIST_IMAGE}
              alt="Специалист Kineto One"
              fill
              sizes="(max-width: 1023px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-4xl">
              Ваш специалист
            </h2>
            <p className="mt-4 text-xl font-semibold text-forest-ink">
              [Имя и фамилия специалиста]
            </p>
            <p className="mt-1 text-base text-sage-dust">
              [Профессия, специализация]
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-medium uppercase tracking-widest text-chartreuse-sprig">
                  Образование
                </dt>
                <dd className="text-base leading-relaxed text-sage-dust">
                  [Учебное заведение, год окончания]
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-medium uppercase tracking-widest text-chartreuse-sprig">
                  Опыт
                </dt>
                <dd className="text-base leading-relaxed text-sage-dust">
                  [Количество лет практики]
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-medium uppercase tracking-widest text-chartreuse-sprig">
                  Сертификаты
                </dt>
                <dd className="text-base leading-relaxed text-sage-dust">
                  [Дополнительные квалификации]
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-medium uppercase tracking-widest text-chartreuse-sprig">
                  Языки
                </dt>
                <dd className="text-base leading-relaxed text-sage-dust">
                  [Языки общения]
                </dd>
              </div>
            </dl>
            <div className="mt-8 border-l-2 border-chartreuse-sprig pl-5">
              <p className="text-base leading-relaxed text-pine-shadow">
                [Здесь будет короткая история специалиста: почему он занимается
                реабилитацией, какой подход считает важным и чего хочет помочь
                достичь каждому пациенту.]
              </p>
            </div>
            <ContactTrigger className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-chartreuse-sprig px-8 text-base font-semibold text-white-sheet shadow-sm transition-all duration-200 hover:bg-vivid-lime hover:shadow-md active:scale-[0.98] sm:w-auto sm:min-w-[220px]">
              Записаться на первичную оценку
            </ContactTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
