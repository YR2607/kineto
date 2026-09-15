"use client";

import { MessageCircle, Phone, Send, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface ContactDialogProps {
  onClose: () => void;
}

const channels = [
  { href: "tel:+37369715536", label: "Позвонить", Icon: Phone },
  {
    href: "https://t.me/+37369715536",
    label: "Написать в Telegram",
    Icon: Send,
    external: true,
  },
  {
    href: "https://wa.me/37369715536",
    label: "Написать в WhatsApp",
    Icon: MessageCircle,
    external: true,
  },
  {
    href: "viber://chat?number=%2B37369715536",
    label: "Написать в Viber",
    Icon: MessageCircle,
  },
] as const;

export default function ContactDialog({ onClose }: ContactDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="contact-dialog-title"
      aria-describedby="contact-dialog-description"
      className="contact-dialog"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="contact-dialog__panel">
        <button
          type="button"
          aria-label="Закрыть окно связи"
          className="contact-dialog__close"
          onClick={onClose}
        >
          <X aria-hidden="true" size={18} strokeWidth={1.75} />
        </button>
        <h2 id="contact-dialog-title">Связаться с Kineto One</h2>
        <p id="contact-dialog-description">
          Выберите удобный способ связи. Мы ответим и согласуем дальнейшие шаги.
        </p>
        <div className="contact-dialog__channels">
          {channels.map(({ href, label, Icon, ...channel }) => {
            const external = "external" in channel && channel.external;
            return (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
                <span>{label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </dialog>
  );
}
