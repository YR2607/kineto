# Foundation, Security, and Accessibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a secure, tested, keyboard-accessible foundation before changing the content architecture or visual system.

**Architecture:** Upgrade the patched framework version and add explicit lint, unit, component, and production E2E gates. Replace five independently rendered contact popups with one root-level native dialog, convert the FAQ and mobile menu to native controls, and remove scroll-driven React state updates.

**Tech Stack:** Next.js 16.3.5 App Router, React 19.2.4, TypeScript 5, Tailwind CSS 4, Vitest 5, Testing Library, Playwright 1.63, axe-core, ESLint 10.

## Global Constraints

- Preserve all existing service URLs and real contact details.
- Present Kineto One as a studio brand serving a broad audience.
- Use `Связаться` consistently for the contact-dialog intent.
- Include phone, Telegram, WhatsApp, and Viber; do not add a contact form.
- Do not fabricate reviews, ratings, certifications, opening hours, team members, or medical outcomes.
- Keep the approved Human Botanical, Trust-first, Living Forest design for Plan 3.
- Use `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 3`, and `VISUAL_DENSITY: 3`.
- Keep the redesign light-only; do not add a dark theme.
- Keep hero/LCP content visible immediately and honor `prefers-reduced-motion`.
- Preserve unrelated uncommitted work. Stage only files named by the current task.
- Read the relevant files in `node_modules/next/dist/docs/` before each Next.js-specific change.
- Do not use `npm audit fix --force`.

---

## File Structure

- `eslint.config.mjs`: Next.js 16 flat ESLint configuration.
- `vitest.config.mts`: jsdom component-test configuration.
- `tests/setup.ts`: jest-dom matchers and native dialog polyfill for jsdom.
- `playwright.config.ts`: production-build browser-test server and device configuration.
- `tests/unit/testing-smoke.test.tsx`: confirms the component test harness.
- `tests/unit/contact-dialog.test.tsx`: contact dialog keyboard and focus regression tests.
- `tests/unit/faq.test.tsx`: FAQ semantics and keyboard regression tests.
- `tests/e2e/accessibility.spec.ts`: browser-level dialog, navigation, FAQ, overflow, and axe checks.
- `components/contact/ContactDialogProvider.tsx`: one global dialog state and trigger-focus restoration.
- `components/contact/ContactTrigger.tsx`: reusable dialog trigger.
- `components/contact/ContactDialog.tsx`: native dialog and real contact-channel links.
- `components/MobileNavigation.tsx`: accessible native mobile-menu dialog.
- `components/Navbar.tsx`: server-rendered navigation shell.
- `components/FAQ.tsx`: accessible accordion.
- `app/layout.tsx`: root provider, skip link, and main-content contract.
- `app/page.tsx`: stable `main-content` target.
- `app/services/[slug]/page.tsx`: stable `main-content` target.
- `app/globals.css`: focus, dialog, reduced-motion, and temporary contrast fixes.
- `next.config.ts`: production header cleanup.
- `package.json` and `package-lock.json`: exact framework and quality-tool versions.

### Task 1: Upgrade Next.js and install quality gates

**Files:**
- Modify: `package.json:5-24`
- Modify: `package-lock.json`
- Modify: `next.config.ts:3-16`
- Create: `eslint.config.mjs`
- Create: `vitest.config.mts`
- Create: `tests/setup.ts`
- Create: `tests/unit/testing-smoke.test.tsx`
- Create: `playwright.config.ts`

**Interfaces:**
- Consumes: existing npm project and Next.js configuration.
- Produces: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, and `npm run verify`.

- [ ] **Step 1: Record the baseline failures without modifying the worktree**

Run:

```bash
npm audit --omit=dev
npm run build
npx tsc --noEmit
```

Expected: the audit reports one critical and three high production vulnerabilities; build and TypeScript complete successfully.

- [ ] **Step 2: Install the exact reviewed versions**

Run:

```bash
npm install next@16.3.5
npm install -D eslint@10.10.0 eslint-config-next@16.3.5 vitest@5.0.0 @vitejs/plugin-react@6.1.1 jsdom@30.0.1 @testing-library/react@16.3.3 @testing-library/dom@10.4.1 @testing-library/jest-dom@7.0.1 @testing-library/user-event@14.6.7 vite-tsconfig-paths@6.1.1 @playwright/test@1.63.0 @axe-core/playwright@4.13.0
```

Expected: `package.json` pins Next.js to `^16.3.5` or `16.3.5` and adds the listed development dependencies. Do not accept unrelated dependency replacements.

- [ ] **Step 3: Add deterministic npm scripts**

Set `package.json` scripts to this exact object while preserving dependency sections:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "verify": "npm run lint && npm run typecheck && npm run test && npm run build && npm run test:e2e"
  }
}
```

- [ ] **Step 4: Add the Next.js 16 flat ESLint config**

Create `eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    ".superpowers/**",
    "next-env.d.ts",
  ]),
]);
```

- [ ] **Step 5: Add Vitest configuration and setup**

Create `vitest.config.mts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    restoreMocks: true,
  },
});
```

Create `tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";

if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true;
  };
}

if (!HTMLDialogElement.prototype.close) {
  HTMLDialogElement.prototype.close = function close() {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
}

if (!globalThis.requestAnimationFrame) {
  globalThis.requestAnimationFrame = (callback) => window.setTimeout(() => callback(performance.now()), 0);
}
```

- [ ] **Step 6: Write the test-harness smoke test**

Create `tests/unit/testing-smoke.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

function Smoke() {
  return <button type="button">Связаться</button>;
}

describe("test infrastructure", () => {
  it("renders React components with accessible queries", () => {
    render(<Smoke />);
    expect(screen.getByRole("button", { name: "Связаться" })).toBeVisible();
  });
});
```

- [ ] **Step 7: Add the production Playwright server**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "chromium-mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 8: Stop exposing the framework header**

Change `next.config.ts` to:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 9: Run the new gates**

Run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm audit --omit=dev
```

Expected: lint, typecheck, smoke test, and build pass. The production audit reports zero vulnerabilities; if it does not, stop and report the exact remaining advisory.

- [ ] **Step 10: Commit only the infrastructure files**

```bash
git add package.json package-lock.json next.config.ts eslint.config.mjs vitest.config.mts playwright.config.ts tests/setup.ts tests/unit/testing-smoke.test.tsx
git commit -m "build: add secure quality gates"
```

### Task 2: Build one root-level contact dialog with regression tests

**Files:**
- Create: `components/contact/ContactDialogProvider.tsx`
- Create: `components/contact/ContactTrigger.tsx`
- Create: `components/contact/ContactDialog.tsx`
- Create: `tests/unit/contact-dialog.test.tsx`
- Modify: `app/layout.tsx:24-35`
- Modify: `components/Hero.tsx:1-159`
- Modify: `components/Showcase.tsx:1-170`
- Modify: `components/About.tsx:1-93`
- Modify: `components/Footer.tsx:1-138`
- Modify: `components/Navbar.tsx:1-205`
- Delete after migration: `components/ContactPopup.tsx`

**Interfaces:**
- Produces: `useContactDialog(): { openContactDialog(trigger: HTMLElement): void; closeContactDialog(): void }`.
- Produces: `ContactTrigger` with native button props and a required accessible text child.
- Consumes: the existing phone and messenger URLs.

- [ ] **Step 1: Write the failing dialog regression tests**

Create `tests/unit/contact-dialog.test.tsx`:

```tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactDialogProvider } from "@/components/contact/ContactDialogProvider";
import { ContactTrigger } from "@/components/contact/ContactTrigger";

function Subject() {
  return (
    <ContactDialogProvider>
      <ContactTrigger>Связаться</ContactTrigger>
    </ContactDialogProvider>
  );
}

describe("contact dialog", () => {
  it("mounts one named modal only while open", async () => {
    const user = userEvent.setup();
    render(<Subject />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Связаться" }));

    expect(screen.getAllByRole("dialog")).toHaveLength(1);
    expect(screen.getByRole("dialog", { name: "Связаться с Kineto One" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Позвонить" })).toHaveAttribute("href", "tel:+37369715536");
  });

  it("closes with Escape and restores trigger focus", async () => {
    const user = userEvent.setup();
    render(<Subject />);
    const trigger = screen.getByRole("button", { name: "Связаться" });

    await user.click(trigger);
    const dialog = screen.getByRole("dialog");
    fireEvent(dialog, new Event("cancel", { cancelable: true }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("gives the close button an accessible name", async () => {
    const user = userEvent.setup();
    render(<Subject />);
    await user.click(screen.getByRole("button", { name: "Связаться" }));
    expect(screen.getByRole("button", { name: "Закрыть окно связи" })).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the test and verify the missing-module failure**

Run:

```bash
npm run test -- tests/unit/contact-dialog.test.tsx
```

Expected: FAIL because the contact provider and trigger modules do not exist.

- [ ] **Step 3: Implement the dialog component**

Create `components/contact/ContactDialog.tsx`:

```tsx
"use client";

import { MessageCircle, Phone, Send, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface ContactDialogProps {
  onClose: () => void;
}

const channels = [
  { href: "tel:+37369715536", label: "Позвонить", Icon: Phone },
  { href: "https://t.me/+37369715536", label: "Написать в Telegram", Icon: Send, external: true },
  { href: "https://wa.me/37369715536", label: "Написать в WhatsApp", Icon: MessageCircle, external: true },
  { href: "viber://chat?number=%2B37369715536", label: "Написать в Viber", Icon: MessageCircle },
] as const;

export function ContactDialog({ onClose }: ContactDialogProps) {
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
        <button type="button" aria-label="Закрыть окно связи" className="contact-dialog__close" onClick={onClose}>
          <X aria-hidden="true" size={18} strokeWidth={1.75} />
        </button>
        <h2 id="contact-dialog-title">Связаться с Kineto One</h2>
        <p id="contact-dialog-description">Выберите удобный способ связи. Мы ответим и согласуем дальнейшие шаги.</p>
        <div className="contact-dialog__channels">
          {channels.map(({ href, label, Icon, ...channel }) => (
            <a
              key={label}
              href={href}
              target={"external" in channel && channel.external ? "_blank" : undefined}
              rel={"external" in channel && channel.external ? "noopener noreferrer" : undefined}
            >
              <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </dialog>
  );
}
```

- [ ] **Step 4: Implement the provider and trigger**

Create `components/contact/ContactDialogProvider.tsx`:

```tsx
"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { ContactDialog } from "./ContactDialog";

interface ContactDialogContextValue {
  openContactDialog: (trigger: HTMLElement) => void;
  closeContactDialog: () => void;
}

const ContactDialogContext = createContext<ContactDialogContextValue | null>(null);

export function ContactDialogProvider({ children }: { children: React.ReactNode }) {
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
    <ContactDialogContext value={{ openContactDialog, closeContactDialog }}>
      {children}
      {open ? <ContactDialog onClose={closeContactDialog} /> : null}
    </ContactDialogContext>
  );
}

export function useContactDialog() {
  const value = useContext(ContactDialogContext);
  if (!value) throw new Error("useContactDialog must be used inside ContactDialogProvider");
  return value;
}
```

Create `components/contact/ContactTrigger.tsx`:

```tsx
"use client";

import type { ButtonHTMLAttributes } from "react";
import { useContactDialog } from "./ContactDialogProvider";

export function ContactTrigger({ children, type = "button", onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
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
```

- [ ] **Step 5: Mount the provider once at the root**

In `app/layout.tsx`, import `ContactDialogProvider` and make the body exact structure:

```tsx
<body className="min-h-full flex flex-col">
  <a href="#main-content" className="skip-link">Перейти к основному содержанию</a>
  <ContactDialogProvider>{children}</ContactDialogProvider>
</body>
```

Add `id="main-content"` to the one `<main>` in both `app/page.tsx` and `app/services/[slug]/page.tsx`.

- [ ] **Step 6: Replace every local popup trigger**

In `components/Hero.tsx`, remove `useState`, `ContactPopup`, `popupOpen`, and the trailing popup render. Import `ContactTrigger` and replace the hero button with:

```tsx
<ContactTrigger className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap border-b border-forest-ink pb-1 text-[14px] font-medium text-forest-ink transition-[gap,color] duration-150 hover:gap-4 md:text-[16px]">
  Связаться
  <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
</ContactTrigger>
```

Import `ArrowRight` from `lucide-react` and remove the hand-written arrow SVG.

In `components/Showcase.tsx`, remove the section-level `popupOpen` state, `ContactPopup` import, callback prop, and trailing popup render. Import `ContactTrigger`; change `ShowcaseCard` to accept only `{ work, index }`; replace its popup button with:

```tsx
<ContactTrigger className="inline-flex min-h-11 w-fit items-center gap-2 whitespace-nowrap border-b border-forest-ink/30 pb-1 text-[15px] font-medium text-forest-ink transition-[gap,border-color] duration-150 hover:gap-3 hover:border-forest-ink md:text-[17px]">
  Связаться
  <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
</ContactTrigger>
```

Import `ArrowRight` from `lucide-react`. Render cards as:

```tsx
{works.map((work, index) => <ShowcaseCard key={work.title} work={work} index={index} />)}
```

In `components/About.tsx`, remove `useState`, `ContactPopup`, local popup state, and the trailing popup render. Import `ContactTrigger` and replace the booking button with:

```tsx
<ContactTrigger className="link-underline inline-flex min-h-11 w-fit items-center text-left text-[20px] text-sage-dust transition-colors duration-150 hover:text-forest-ink">
  Связаться
</ContactTrigger>
```

In `components/Footer.tsx`, remove local popup state and `ContactPopup`. Import `ContactTrigger`. Change `MagneticButton` to accept only `children`, remove the `onClick` prop from its interface, and replace its outer `motion.button` with:

```tsx
<ContactTrigger className="group inline-flex min-h-11 items-center gap-4 text-forest-ink md:gap-6">
  <motion.span
    whileHover={{ scale: 1.04 }}
    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
    className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-chartreuse-sprig text-forest-ink md:h-[120px] md:w-[120px]"
  >
    <ArrowUpRight aria-hidden="true" className="h-7 w-7 md:h-12 md:w-12" strokeWidth={1.75} />
  </motion.span>
  <span className="text-[12vw] font-semibold leading-[0.9] tracking-tight transition-colors duration-150 group-hover:text-sage-dust md:text-[8vw]">
    {children}
  </span>
</ContactTrigger>
```

Import `ArrowUpRight` from `lucide-react`, remove pointer-position motion values and handlers, and render `<MagneticButton>Связаться</MagneticButton>`.

In the current `components/Navbar.tsx`, remove `popupOpen`, `setPopupOpen`, `openPopup`, `ContactPopup`, and its trailing render. Import `ContactTrigger`. Replace the desktop phone button with:

```tsx
<a href="tel:+37369715536" className="inline-flex min-h-11 items-center text-[15px] font-semibold tracking-tight text-forest-ink transition-colors duration-150 hover:text-sage-dust">
  0697 15 536
</a>
```

Replace the desktop CTA with:

```tsx
<ContactTrigger className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest-ink/5 px-4 text-[14px] font-medium text-forest-ink transition-colors duration-150 hover:bg-chartreuse-sprig/60">
  Связаться
  <ArrowRight aria-hidden="true" size={14} strokeWidth={1.75} />
</ContactTrigger>
```

Replace the mobile phone button with:

```tsx
<a href="tel:+37369715536" className="inline-flex min-h-11 items-center text-[15px] font-medium text-sage-dust transition-colors duration-150 hover:text-forest-ink">
  0697 15 536
</a>
```

Replace the mobile CTA with:

```tsx
<ContactTrigger onClick={() => setMobileOpen(false)} className="inline-flex min-h-12 items-center justify-between rounded-2xl bg-chartreuse-sprig/50 px-5 text-[16px] font-medium text-forest-ink">
  Связаться
  <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
</ContactTrigger>
```

Import `ArrowRight` from `lucide-react`. After all five migrations, delete `components/ContactPopup.tsx` and verify the symbol is gone:

```bash
npm run lint
```

Expected: no unresolved `ContactPopup` import and no unused popup state.

- [ ] **Step 7: Add temporary dialog and focus styling**

Append to `app/globals.css`:

```css
.skip-link {
  position: fixed;
  inset-block-start: 0.75rem;
  inset-inline-start: 0.75rem;
  z-index: 200;
  transform: translateY(-200%);
  border-radius: 999px;
  background: var(--color-forest-ink);
  color: var(--color-white-sheet);
  padding: 0.75rem 1rem;
}

.skip-link:focus-visible {
  transform: translateY(0);
}

:where(a, button, input, select, textarea, summary):focus-visible {
  outline: 2px solid var(--color-forest-ink);
  outline-offset: 3px;
}

.contact-dialog {
  width: min(26rem, calc(100% - 2rem));
  max-height: calc(100dvh - 2rem);
  margin: auto;
  border: 0;
  border-radius: 1.5rem;
  background: transparent;
  color: var(--color-forest-ink);
  padding: 0;
}

.contact-dialog::backdrop {
  background: rgb(0 51 41 / 0.32);
  backdrop-filter: blur(4px);
}

.contact-dialog__panel {
  position: relative;
  border-radius: inherit;
  background: var(--color-white-sheet);
  padding: 2rem;
}

.contact-dialog__close {
  position: absolute;
  inset-block-start: 1rem;
  inset-inline-end: 1rem;
  display: grid;
  min-width: 44px;
  min-height: 44px;
  place-items: center;
  border-radius: 999px;
  background: var(--color-mist-paper);
}

.contact-dialog__panel h2 {
  max-width: 16rem;
  padding-inline-end: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.contact-dialog__panel p {
  margin-block-start: 0.75rem;
  color: var(--color-pine-shadow);
  line-height: 1.5;
}

.contact-dialog__channels {
  display: grid;
  gap: 0.75rem;
  margin-block-start: 1.5rem;
}

.contact-dialog__channels a {
  display: flex;
  min-height: 52px;
  align-items: center;
  gap: 0.875rem;
  border: 1px solid rgb(0 51 41 / 0.14);
  border-radius: 0.875rem;
  padding: 0.875rem 1rem;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 8: Run the focused tests**

Run:

```bash
npm run test -- tests/unit/contact-dialog.test.tsx
npm run lint
npm run typecheck
```

Expected: all three dialog tests pass; lint and TypeScript pass.

- [ ] **Step 9: Commit the dialog migration**

```bash
git add app/layout.tsx app/page.tsx "app/services/[slug]/page.tsx" app/globals.css components/contact components/Hero.tsx components/Showcase.tsx components/About.tsx components/Footer.tsx components/Navbar.tsx components/ContactPopup.tsx tests/unit/contact-dialog.test.tsx
git commit -m "fix: centralize accessible contact dialog"
```

### Task 3: Convert FAQ to a native accessible accordion

**Files:**
- Modify: `components/FAQ.tsx:1-110`
- Create: `tests/unit/faq.test.tsx`

**Interfaces:**
- Consumes: the existing six question and answer strings.
- Produces: native question buttons with `aria-expanded`, `aria-controls`, and stable answer IDs.

- [ ] **Step 1: Write the failing FAQ regression test**

Create `tests/unit/faq.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import FAQ from "@/components/FAQ";

vi.mock("@/components/Reveal", () => ({ default: ({ children }: { children: React.ReactNode }) => children }));

describe("FAQ", () => {
  it("uses named buttons and synchronizes expanded state", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const question = screen.getByRole("button", { name: "Можно ли заниматься после операции?" });

    expect(question).toHaveAttribute("aria-expanded", "false");
    await user.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Можно ли заниматься после операции?" })).toBeVisible();
  });

  it("works with native keyboard activation", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const question = screen.getByRole("button", { name: "Сколько нужно занятий?" });
    question.focus();
    await user.keyboard("{Enter}");
    expect(question).toHaveAttribute("aria-expanded", "true");
  });
});
```

- [ ] **Step 2: Run the test and verify it fails against the clickable div**

Run:

```bash
npm run test -- tests/unit/faq.test.tsx
```

Expected: FAIL because the questions are not buttons and expose no expanded state.

- [ ] **Step 3: Replace the clickable FAQ container with button semantics**

Keep the `faqs` array and section layout. Replace the map body with:

```tsx
{faqs.map((faq, idx) => {
  const isOpen = openIdx === idx;
  const buttonId = `faq-question-${idx}`;
  const panelId = `faq-answer-${idx}`;
  return (
    <Reveal key={faq.q} type="fade-up" delay={idx * 0.04}>
      <article className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
        <h3>
          <button
            id={buttonId}
            type="button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => setOpenIdx(isOpen ? null : idx)}
            className="faq-item__trigger"
          >
            <span>{faq.q}</span>
            <ChevronDown aria-hidden="true" size={20} strokeWidth={1.75} className="faq-item__icon" />
          </button>
        </h3>
        {isOpen ? (
          <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-item__panel">
            <p>{faq.a}</p>
          </div>
        ) : null}
      </article>
    </Reveal>
  );
})}
```

Import `ChevronDown` from `lucide-react`. Change the section's left display heading from `h3` to a styled paragraph so the question headings descend directly from the section `h2`.

- [ ] **Step 4: Add the FAQ classes to `app/globals.css`**

```css
.faq-item {
  border: 1px solid rgb(0 51 41 / 0.1);
  border-radius: 1rem;
  background: rgb(255 255 255 / 0.72);
}

.faq-item__trigger {
  display: flex;
  width: 100%;
  min-height: 56px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem;
  text-align: start;
}

.faq-item__icon {
  flex: none;
  transition: transform 150ms cubic-bezier(0.2, 0, 0, 1);
}

.faq-item--open .faq-item__icon {
  transform: rotate(180deg);
}

.faq-item__panel {
  padding: 0 1.25rem 1.25rem;
}

.faq-item__panel p {
  max-width: 65ch;
  border-top: 1px solid rgb(0 51 41 / 0.08);
  padding-top: 1rem;
  color: var(--color-pine-shadow);
  line-height: 1.6;
}

@media (prefers-reduced-motion: reduce) {
  .faq-item__icon {
    transition: none;
  }
}
```

- [ ] **Step 5: Verify and commit**

Run:

```bash
npm run test -- tests/unit/faq.test.tsx
npm run lint
npm run typecheck
```

Expected: both FAQ tests pass, followed by clean lint and TypeScript output.

```bash
git add components/FAQ.tsx app/globals.css tests/unit/faq.test.tsx
git commit -m "fix: make faq keyboard accessible"
```

### Task 4: Replace the scroll listener and accessible mobile navigation

**Files:**
- Create: `components/MobileNavigation.tsx`
- Modify: `components/Navbar.tsx:1-205`
- Modify: `app/globals.css`
- Create: `tests/unit/mobile-navigation.test.tsx`

**Interfaces:**
- `MobileNavigation` consumes `links: ReadonlyArray<{ href: string; label: string }>`.
- Navbar becomes a server component with a static desktop nav and one client mobile island.
- Contact actions consume `ContactTrigger` from Task 2.

- [ ] **Step 1: Write the failing menu tests**

Create `tests/unit/mobile-navigation.test.tsx`:

```tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactDialogProvider } from "@/components/contact/ContactDialogProvider";
import MobileNavigation from "@/components/MobileNavigation";

const links = [{ href: "/#services", label: "Услуги" }];

describe("mobile navigation", () => {
  it("opens one named modal menu and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<ContactDialogProvider><MobileNavigation links={links} /></ContactDialogProvider>);
    const trigger = screen.getByRole("button", { name: "Открыть меню" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Навигация" })).toBeVisible();
    fireEvent(screen.getByRole("dialog"), new Event("cancel", { cancelable: true }));
    expect(screen.queryByRole("dialog", { name: "Навигация" })).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("closes after selecting a destination", async () => {
    const user = userEvent.setup();
    render(<ContactDialogProvider><MobileNavigation links={links} /></ContactDialogProvider>);
    await user.click(screen.getByRole("button", { name: "Открыть меню" }));
    await user.click(screen.getByRole("link", { name: "Услуги" }));
    expect(screen.queryByRole("dialog", { name: "Навигация" })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm the module is missing**

```bash
npm run test -- tests/unit/mobile-navigation.test.tsx
```

Expected: FAIL because `MobileNavigation` does not exist.

- [ ] **Step 3: Implement the native mobile-menu dialog**

Create `components/MobileNavigation.tsx`:

```tsx
"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ContactTrigger } from "@/components/contact/ContactTrigger";

interface MobileNavigationProps {
  links: ReadonlyArray<{ href: string; label: string }>;
}

export default function MobileNavigation({ links }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.showModal();
  }, [open]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      <button ref={triggerRef} type="button" aria-label="Открыть меню" aria-haspopup="dialog" onClick={() => setOpen(true)} className="mobile-menu-trigger">
        <Menu aria-hidden="true" size={22} strokeWidth={1.75} />
      </button>
      {open ? (
        <dialog ref={dialogRef} aria-label="Навигация" className="mobile-menu" onCancel={(event) => { event.preventDefault(); close(); }}>
          <div className="mobile-menu__panel">
            <button type="button" aria-label="Закрыть меню" onClick={close} className="mobile-menu__close">
              <X aria-hidden="true" size={22} strokeWidth={1.75} />
            </button>
            <nav aria-label="Мобильная навигация" className="mobile-menu__links">
              {links.map((link) => <Link key={link.href} href={link.href} onClick={close}>{link.label}</Link>)}
            </nav>
            <a href="tel:+37369715536">0697 15 536</a>
            <ContactTrigger onClick={close} className="mobile-menu__contact">Связаться</ContactTrigger>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
```

- [ ] **Step 4: Convert Navbar to a static server shell**

Replace `components/Navbar.tsx` with:

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactTrigger } from "@/components/contact/ContactTrigger";
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
        <Link href="/" className="site-brand">Kineto One</Link>
        <div className="site-nav__links">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </div>
        <div className="site-nav__actions">
          <a href="tel:+37369715536">0697 15 536</a>
          <ContactTrigger className="site-nav__contact">Связаться <ArrowUpRight aria-hidden="true" size={16} /></ContactTrigger>
        </div>
        <MobileNavigation links={links} />
      </nav>
    </header>
  );
}
```

This intentionally deletes the native `window.scroll` listener, progress bar, hide-on-scroll state, repeated popup state, and delayed `setTimeout`.

- [ ] **Step 5: Add temporary responsive navigation styling**

Append to `app/globals.css`:

```css
.site-header {
  position: sticky;
  inset-block-start: 0;
  z-index: 40;
  border-bottom: 1px solid rgb(0 51 41 / 0.08);
  background: rgb(229 231 235 / 0.92);
  backdrop-filter: blur(12px);
}

.site-nav {
  display: grid;
  min-height: 68px;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
  padding-inline: clamp(1.25rem, 5vw, 6rem);
}

.site-brand {
  font-size: 1.25rem;
  font-weight: 600;
}

.site-nav__links,
.site-nav__actions {
  display: flex;
  align-items: center;
}

.site-nav__links {
  justify-content: center;
  gap: clamp(1.25rem, 3vw, 3rem);
}

.site-nav__actions {
  gap: 1rem;
}

.site-nav__contact,
.mobile-menu-trigger,
.mobile-menu__close,
.mobile-menu__contact {
  min-height: 44px;
}

.site-nav__contact {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 999px;
  background: var(--color-chartreuse-sprig);
  padding-inline: 1rem;
}

.mobile-menu-trigger {
  display: none;
  min-width: 44px;
  place-items: center;
}

.mobile-menu {
  width: 100%;
  max-width: none;
  height: 100dvh;
  max-height: none;
  border: 0;
  background: var(--color-mist-paper);
  padding: 0;
}

.mobile-menu::backdrop {
  background: var(--color-mist-paper);
}

.mobile-menu__panel {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  padding: 1.25rem;
}

.mobile-menu__close {
  display: grid;
  min-width: 44px;
  align-self: flex-end;
  place-items: center;
}

.mobile-menu__links {
  display: grid;
  gap: 0.5rem;
  margin-block: auto;
}

.mobile-menu__links a {
  padding-block: 0.5rem;
  font-size: clamp(2rem, 10vw, 3rem);
  font-weight: 600;
  line-height: 1.1;
}

.mobile-menu__contact {
  margin-block-start: 1rem;
  border-radius: 999px;
  background: var(--color-chartreuse-sprig);
  padding-inline: 1rem;
}

@media (max-width: 767px) {
  .site-nav {
    min-height: 60px;
    grid-template-columns: 1fr auto;
    padding-inline: 1.25rem;
  }

  .site-nav__links,
  .site-nav__actions {
    display: none;
  }

  .mobile-menu-trigger {
    display: grid;
  }
}
```

- [ ] **Step 6: Verify and commit**

Run:

```bash
npm run test -- tests/unit/mobile-navigation.test.tsx
npm run lint
npm run typecheck
npm run build
```

Expected: both menu tests pass; lint, TypeScript, and production build pass.

```bash
git add components/Navbar.tsx components/MobileNavigation.tsx app/globals.css tests/unit/mobile-navigation.test.tsx
git commit -m "fix: make navigation keyboard accessible"
```

### Task 5: Add production browser regressions and complete the foundation gate

**Files:**
- Create: `tests/e2e/accessibility.spec.ts`
- Modify: `.gitignore:13-41`

**Interfaces:**
- Consumes: the production server configured in `playwright.config.ts`.
- Produces: browser evidence for keyboard flows, axe, overflow, and one-dialog constraints.

- [ ] **Step 1: Write the browser regression suite**

Create `tests/e2e/accessibility.spec.ts`:

```ts
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const widths = [1440, 390, 320] as const;

test("contact dialog has one accessible instance and restores focus", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Связаться" }).first();
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Связаться с Kineto One" })).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("faq toggles with keyboard", async ({ page }) => {
  await page.goto("/");
  const question = page.getByRole("button", { name: "Сколько нужно занятий?" });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(question).toHaveAttribute("aria-expanded", "true");
});

test("mobile navigation closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Открыть меню" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Навигация" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Навигация" })).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

for (const width of widths) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const sizes = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(sizes.scrollWidth).toBe(sizes.clientWidth);
  });
}

test("has no automatically detectable serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
});
```

- [ ] **Step 2: Ignore generated and visual-companion artifacts**

Append to `.gitignore`:

```gitignore
# browser tests
/playwright-report/
/test-results/

# local design exploration
/.superpowers/
```

- [ ] **Step 3: Run the complete foundation verification**

Run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm audit --omit=dev
git diff --check
```

Expected: all commands exit zero, all browser tests pass in desktop and mobile Chromium, and the production audit reports zero vulnerabilities.

- [ ] **Step 4: Commit the browser gate**

```bash
git add tests/e2e/accessibility.spec.ts .gitignore
git commit -m "test: cover accessible contact flows"
```
