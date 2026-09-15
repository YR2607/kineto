import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getAllServices } from "@/data/services";

export default function Footer() {
  const services = getAllServices();
  const navLinks = [
    { href: "/#process", label: "Как проходит" },
    { href: "/#specialist", label: "Специалист" },
    { href: "/#results", label: "Результаты" },
    { href: "/#studio", label: "Студия" },
    { href: "/#pricing", label: "Стоимость" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <footer id="contact" className="bg-mist-paper py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-semibold text-forest-ink">
              {siteConfig.name}
            </span>
            <p className="text-sm leading-relaxed text-sage-dust">
              Студия физической реабилитации в Кишинёве. Индивидуальный подход к
              восстановлению после травм, операций и боли.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium uppercase tracking-widest text-forest-ink">
              Услуги
            </span>
            <ul className="flex flex-col gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-sage-dust underline-offset-4 transition-colors hover:text-forest-ink hover:underline"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium uppercase tracking-widest text-forest-ink">
              Навигация
            </span>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sage-dust underline-offset-4 transition-colors hover:text-forest-ink hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium uppercase tracking-widest text-forest-ink">
              Контакты
            </span>
            <Link
              href={`tel:${siteConfig.phoneInternational}`}
              className="text-base font-medium text-forest-ink underline-offset-4 transition-colors hover:text-chartreuse-sprig hover:underline"
            >
              {siteConfig.phoneDisplay}
            </Link>
            <span className="text-sm leading-relaxed text-sage-dust">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, Moldova
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <Link
                href={siteConfig.channels.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sage-dust underline-offset-4 transition-colors hover:text-forest-ink hover:underline"
              >
                Telegram
              </Link>
              <Link
                href={siteConfig.channels.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sage-dust underline-offset-4 transition-colors hover:text-forest-ink hover:underline"
              >
                WhatsApp
              </Link>
              <Link
                href={siteConfig.channels.viber}
                className="text-sm text-sage-dust underline-offset-4 transition-colors hover:text-forest-ink hover:underline"
              >
                Viber
              </Link>
              <Link
                href={siteConfig.channels.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sage-dust underline-offset-4 transition-colors hover:text-forest-ink hover:underline"
              >
                Instagram
              </Link>
              <Link
                href={siteConfig.channels.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sage-dust underline-offset-4 transition-colors hover:text-forest-ink hover:underline"
              >
                Facebook
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-forest-ink/10 pt-8 text-sm text-pine-shadow md:flex-row md:justify-between">
          <span>© 2026 {siteConfig.name}. Студия физической реабилитации, Кишинёв.</span>
          <div className="flex gap-4">
            <span className="font-semibold text-forest-ink">RU</span>
            <span className="text-sage-dust">RO</span>
            <span className="text-sage-dust">EN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
