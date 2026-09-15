import Image from "next/image";
import Link from "next/link";
import ContactTrigger from "./contact/ContactTrigger";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-mist-paper">
      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-[1200px] flex-col justify-center px-6 py-24 md:px-16 md:py-32">
        <p className="text-sm font-medium uppercase tracking-widest text-sage-dust">
          Студия физической реабилитации — Кишинёв
        </p>
        <h1 className="mt-6 max-w-[900px] text-[40px] font-semibold leading-[1.02] tracking-tight text-forest-ink md:text-[68px] lg:text-[76px]">
          Помогаем телу{" "}
          <span className="italic-accent">двигаться свободно</span>
          <br />
          и без лишней боли
        </h1>
        <p className="mt-7 max-w-[560px] text-lg leading-relaxed text-sage-dust md:text-xl">
          Индивидуальная физическая реабилитация для взрослых, спортсменов и
          людей после травм, операций и неврологических состояний.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <ContactTrigger className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-chartreuse-sprig px-8 text-base font-semibold text-white-sheet shadow-sm transition-all duration-200 hover:bg-vivid-lime hover:shadow-md active:scale-[0.98] sm:w-auto sm:min-w-[200px]">
            Связаться
          </ContactTrigger>
          <Link
            href="/#services"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-forest-ink/20 px-8 text-base font-medium text-forest-ink transition-all duration-200 hover:border-chartreuse-sprig hover:text-chartreuse-sprig active:scale-[0.98] sm:w-auto sm:min-w-[200px]"
          >
            Смотреть направления
          </Link>
        </div>
      </div>
      <div className="relative aspect-[4/3] w-full md:absolute md:inset-0 md:z-0 md:aspect-auto">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2000&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 md:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mist-paper via-mist-paper/70 to-mist-paper" />
      </div>
    </section>
  );
}
