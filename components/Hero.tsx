import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col">
      {/* Background image — bleeds behind text with blur */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover scale-110 blur-[6px] opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mist-paper/60 via-mist-paper/40 to-mist-paper" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-6 md:px-16 lg:px-24 pt-32 md:pt-36 pb-6 md:pb-8">
        {/* Top bar */}
        <div className="w-full flex items-center justify-between">
          <Reveal type="fade-up" delay={0.05}>
            <p className="text-[13px] md:text-[14px] text-sage-dust tracking-wide">
              Кинетотерапия — Кишинёв
            </p>
          </Reveal>
          <Reveal type="fade-up" delay={0.1}>
            <span className="inline-flex items-center gap-2 text-[12px] md:text-[13px] text-forest-ink bg-chartreuse-sprig/50 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-ink animate-pulse" />
              Запись открыта
            </span>
          </Reveal>
        </div>

        {/* Main content */}
        <div className="w-full flex-1 flex flex-col justify-center py-6 md:py-10">
          <h1 className="text-forest-ink text-[14vw] md:text-[6.5vw] lg:text-[5.5vw] font-semibold leading-[0.9] tracking-[-0.05em]">
            <Reveal type="fade-up" delay={0.15} as="span" className="block">
              Тело, которое
            </Reveal>
            <Reveal type="fade-up" delay={0.3} as="span" className="block">
              <span className="italic-accent text-forest-ink">дышит</span>{" "}
              <span className="text-sage-dust">свободно</span>
            </Reveal>
            <Reveal type="fade-up" delay={0.45} as="span" className="block">
              и движется
            </Reveal>
            <Reveal type="fade-up" delay={0.6} as="span" className="block">
              без боли.
            </Reveal>
          </h1>

          <Reveal type="fade-up" delay={0.75}>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-w-3xl">
              <p className="max-w-sm text-sage-dust text-base md:text-lg leading-relaxed">
                Кинетотерапия и лечебный массаж. Индивидуальный подход к восстановлению и здоровью вашего тела.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-forest-ink text-[15px] md:text-[16px] font-medium border-b border-forest-ink pb-1 hover:gap-4 transition-all duration-300"
              >
                Записаться на приём
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <Reveal type="fade-up" delay={0.85}>
          <div className="w-full flex items-center justify-between border-t border-forest-ink/10 pt-5 md:pt-6">
            <div className="flex items-center gap-6 md:gap-10">
              <span className="text-pine-shadow text-[12px] md:text-[13px]">© Корни, 2026</span>
              <span className="hidden md:inline text-pine-shadow text-[12px] md:text-[13px]">8 лет практики</span>
            </div>
            <a
              href="#work"
              className="text-pine-shadow text-[12px] md:text-[13px] flex items-center gap-2 hover:text-forest-ink transition-colors"
            >
              Смотреть практику
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
