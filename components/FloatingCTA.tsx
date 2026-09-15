"use client";

import { useState } from "react";
import { Phone, Send, MessageCircle, Plus } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);

  const channels = [
    {
      href: `tel:${siteConfig.phoneInternational}`,
      label: "Позвонить",
      Icon: Phone,
    },
    {
      href: siteConfig.channels.telegram,
      label: "Telegram",
      Icon: Send,
      external: true,
    },
    {
      href: siteConfig.channels.whatsapp,
      label: "WhatsApp",
      Icon: MessageCircle,
      external: true,
    },
  ];

  return (
    <div
      className="fixed bottom-4 right-4 z-50 sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {open && (
        <div className="mb-3 flex flex-col gap-2">
          {channels.map(({ href, label, Icon, ...rest }) => {
            const external = "external" in rest && rest.external;
            return (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 rounded-full bg-white-sheet px-5 py-3 text-sm font-medium text-forest-ink shadow-lg"
              >
                <Icon size={18} strokeWidth={1.75} className="text-chartreuse-sprig" />
                {label}
              </a>
            );
          })}
        </div>
      )}
      <button
        type="button"
        aria-label={open ? "Закрыть меню связи" : "Записаться"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-chartreuse-sprig text-white-sheet shadow-lg transition-all duration-200 hover:bg-vivid-lime active:scale-95"
      >
        <Plus
          size={24}
          strokeWidth={2}
          className={`transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        />
      </button>
    </div>
  );
}
