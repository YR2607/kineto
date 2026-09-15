import Link from "next/link";
import { siteConfig } from "@/config/site";
import ContactTrigger from "./contact/ContactTrigger";

export default function Footer() {
  return (
    <footer id="contact" className="bg-mist-paper py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-5xl">
              Готовы начать?
            </h2>
            <p className="max-w-[480px] text-lg leading-relaxed text-sage-dust">
              Выберите удобный канал связи — специалист ответит на вопросы и
              поможет определить подходящее направление.
            </p>
            <ContactTrigger className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-chartreuse-sprig px-8 text-base font-semibold text-white-sheet shadow-sm transition-all duration-200 hover:bg-vivid-lime hover:shadow-md active:scale-[0.98] sm:w-auto sm:min-w-[200px]">
              Связаться
            </ContactTrigger>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium uppercase tracking-widest text-forest-ink">
                Телефон
              </span>
              <Link
                href={`tel:${siteConfig.phoneInternational}`}
                className="text-lg font-medium text-forest-ink underline-offset-4 transition-colors hover:text-sage-dust hover:underline"
              >
                {siteConfig.phoneDisplay}
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium uppercase tracking-widest text-forest-ink">
                Адрес
              </span>
              <span className="text-lg leading-relaxed text-sage-dust">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, Moldova
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium uppercase tracking-widest text-forest-ink">
                Каналы связи
              </span>
              <div className="flex flex-col gap-2">
                <Link
                  href={siteConfig.channels.telegram}
                  className="text-lg text-sage-dust underline-offset-4 transition-colors hover:text-forest-ink hover:underline"
                >
                  Telegram
                </Link>
                <Link
                  href={siteConfig.channels.whatsapp}
                  className="text-lg text-sage-dust underline-offset-4 transition-colors hover:text-forest-ink hover:underline"
                >
                  WhatsApp
                </Link>
                <Link
                  href={siteConfig.channels.viber}
                  className="text-lg text-sage-dust underline-offset-4 transition-colors hover:text-forest-ink hover:underline"
                >
                  Viber
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium uppercase tracking-widest text-forest-ink">
                Соцсети
              </span>
              <div className="flex flex-col gap-2">
                <Link
                  href={siteConfig.channels.instagram}
                  className="text-lg text-sage-dust underline-offset-4 transition-colors hover:text-forest-ink hover:underline"
                >
                  Instagram
                </Link>
                <Link
                  href={siteConfig.channels.facebook}
                  className="text-lg text-sage-dust underline-offset-4 transition-colors hover:text-forest-ink hover:underline"
                >
                  Facebook
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-forest-ink/10 pt-8 text-sm text-pine-shadow md:flex-row md:justify-between">
          <span>© 2026 {siteConfig.name}.</span>
          <span>Студия физической реабилитации, Кишинёв</span>
        </div>
      </div>
    </footer>
  );
}
