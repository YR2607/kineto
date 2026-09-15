"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ContactTrigger from "@/components/contact/ContactTrigger";

interface MobileNavigationProps {
  links: ReadonlyArray<{ href: string; label: string }>;
}

export default function MobileNavigation({ links }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
  }, [open]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Открыть меню"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="mobile-menu-trigger"
      >
        <Menu aria-hidden="true" size={22} strokeWidth={1.75} />
      </button>
      {open ? (
        <dialog
          ref={dialogRef}
          aria-label="Навигация"
          className="mobile-menu"
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <div className="mobile-menu__panel">
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={close}
              className="mobile-menu__close"
            >
              <X aria-hidden="true" size={22} strokeWidth={1.75} />
            </button>
            <nav aria-label="Мобильная навигация" className="mobile-menu__links">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={close}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <a href="tel:+37369715536">0697 15 536</a>
            <ContactTrigger
              onClick={close}
              className="mobile-menu__contact"
            >
              Связаться
            </ContactTrigger>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
