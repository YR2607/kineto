"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import ContactDialog from "./ContactDialog";

interface ContactDialogContextValue {
  openContactDialog: (trigger: HTMLElement) => void;
  closeContactDialog: () => void;
}

const ContactDialogContext = createContext<ContactDialogContextValue | null>(
  null,
);

export function ContactDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openContactDialog = useCallback((trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setOpen(true);
  }, []);

  const closeContactDialog = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <ContactDialogContext.Provider
      value={{ openContactDialog, closeContactDialog }}
    >
      {children}
      {open ? <ContactDialog onClose={closeContactDialog} /> : null}
    </ContactDialogContext.Provider>
  );
}

export function useContactDialog() {
  const value = useContext(ContactDialogContext);
  if (!value) {
    throw new Error(
      "useContactDialog must be used inside ContactDialogProvider",
    );
  }
  return value;
}
