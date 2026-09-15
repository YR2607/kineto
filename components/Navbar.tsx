import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ContactTrigger from "@/components/contact/ContactTrigger";
import MobileNavigation from "./MobileNavigation";

const links = [
  { href: "/#needs", label: "С чем помогаем" },
  { href: "/#services", label: "Услуги" },
  { href: "/#studio", label: "Студия" },
  { href: "/#contact", label: "Контакты" },
] as const;

export default function Navbar() {
  return (
    <header className="site-header">
      <nav aria-label="Основная навигация" className="site-nav">
        <Link href="/" className="site-brand">
          Kineto One
        </Link>
        <div className="site-nav__links">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="site-nav__actions">
          <a href="tel:+37369715536">0697 15 536</a>
          <ContactTrigger className="site-nav__contact">
            Связаться
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} />
          </ContactTrigger>
        </div>
        <MobileNavigation links={links} />
      </nav>
    </header>
  );
}
