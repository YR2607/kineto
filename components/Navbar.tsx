import Link from "next/link";
import { siteConfig } from "@/config/site";
import ContactTrigger from "./contact/ContactTrigger";
import MobileNavigation from "./MobileNavigation";

const navLinks = [
  { href: "/#process", label: "Как проходит" },
  { href: "/#specialist", label: "Специалист" },
  { href: "/#results", label: "Результаты" },
  { href: "/#studio", label: "Студия" },
  { href: "/#pricing", label: "Стоимость" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-4 md:px-16">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-forest-ink"
          aria-label={`${siteConfig.name} — на главную`}
        >
          {siteConfig.name}
        </Link>
        <nav className="hidden lg:flex" aria-label="Основная навигация">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="site-nav__link text-sm font-medium text-pine-shadow transition-colors hover:text-chartreuse-sprig"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex gap-2 text-sm">
            <span className="font-semibold text-forest-ink">RU</span>
            <span className="text-sage-dust">RO</span>
            <span className="text-sage-dust">EN</span>
          </div>
          <ContactTrigger className="site-nav__cta inline-flex min-h-11 items-center justify-center rounded-full bg-chartreuse-sprig px-6 text-sm font-semibold text-white-sheet shadow-sm transition-all duration-200 hover:bg-vivid-lime hover:shadow-md active:scale-[0.98]">
            Записаться
          </ContactTrigger>
        </div>
        <MobileNavigation links={navLinks} />
      </div>
    </header>
  );
}
