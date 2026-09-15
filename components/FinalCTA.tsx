import { siteConfig } from "@/config/site";
import ContactTrigger from "./contact/ContactTrigger";

export default function FinalCTA() {
  return (
    <section className="bg-forest-ink py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16 text-center">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white-sheet md:text-5xl">
          Не знаете, с чего начать восстановление?
        </h2>
        <p className="mx-auto mt-6 max-w-[520px] text-lg leading-relaxed text-white-sheet/70">
          Расскажите специалисту, что вас беспокоит. Поможем понять, какое
          направление подходит и какие шаги нужны.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <ContactTrigger className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-chartreuse-sprig px-8 text-base font-semibold text-white-sheet shadow-sm transition-all duration-200 hover:bg-vivid-lime hover:shadow-md active:scale-[0.98] sm:w-auto sm:min-w-[260px]">
            Записаться на первичную оценку
          </ContactTrigger>
          <a
            href={siteConfig.channels.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-white-sheet/30 px-8 text-base font-medium text-white-sheet transition-all duration-200 hover:border-white-sheet hover:bg-white-sheet/10 active:scale-[0.98] sm:w-auto sm:min-w-[200px]"
          >
            Написать в WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
