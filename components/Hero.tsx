import Image from "next/image";
import { MapPin } from "lucide-react";
import ContactTrigger from "./contact/ContactTrigger";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1540205895360-4ad4cffb3aa8?q=80&w=1200&auto=format&fit=crop";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white-sheet">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:gap-16 md:px-16 md:py-24">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-chartreuse-sprig">
            Физическая реабилитация в Кишинёве
          </p>
          <h1 className="mt-5 text-[36px] font-semibold leading-[1.05] tracking-tight text-forest-ink md:text-[56px]">
            Восстановить движение, силу и уверенность
          </h1>
          <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-sage-dust">
            Помогаем после травм, операций и боли. Индивидуальный план, постепенная
            нагрузка и контроль прогресса.
          </p>
          <p className="mt-4 text-sm font-medium text-pine-shadow">
            Спина · суставы · спортивные травмы · после операций · неврореабилитация
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ContactTrigger className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-chartreuse-sprig px-8 text-base font-semibold text-white-sheet shadow-sm transition-all duration-200 hover:bg-vivid-lime hover:shadow-md active:scale-[0.98] sm:w-auto sm:min-w-[240px]">
              Записаться на первичную оценку
            </ContactTrigger>
            <ContactTrigger className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-forest-ink/15 px-8 text-base font-medium text-forest-ink transition-all duration-200 hover:border-chartreuse-sprig hover:text-chartreuse-sprig active:scale-[0.98] sm:w-auto sm:min-w-[180px]">
              Задать вопрос
            </ContactTrigger>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-sage-dust">
            <MapPin size={16} strokeWidth={1.75} className="text-chartreuse-sprig" />
            Chișinău · str. I. Creangă 1/2
          </p>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-mist-paper md:aspect-[4/3]">
          <Image
            src={HERO_IMAGE}
            alt="Специалист работает с пациентом в процессе реабилитации"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
