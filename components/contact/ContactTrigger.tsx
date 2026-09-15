"use client";

import type { ButtonHTMLAttributes } from "react";
import { useContactDialog } from "./ContactDialogProvider";

export default function ContactTrigger({
  children,
  type = "button",
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { openContactDialog } = useContactDialog();

  return (
    <button
      {...props}
      type={type}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) openContactDialog(event.currentTarget);
      }}
    >
      {children}
    </button>
  );
}
