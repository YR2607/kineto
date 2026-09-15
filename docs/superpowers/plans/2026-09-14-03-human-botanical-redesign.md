# Human Botanical Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current interface with the approved Human Botanical, Trust-first, Living Forest experience while preserving routes, verified content, and accessible interaction foundations.

**Architecture:** Static marketing sections are Server Components and consume the typed service registry from Plan 2. Tailwind 4 semantic tokens define the single light theme; only the contact dialog, mobile menu, and FAQ remain client islands. Motion is limited to CSS hover, focus, and press feedback so the hero and LCP content render immediately.

**Tech Stack:** Next.js 16.3.5 App Router, React 19.2.4, TypeScript 5, Tailwind CSS 4, `next/font` Source Sans 3, `next/image`, Lucide React, Playwright.

## Global Constraints

- Apply Human Botanical, Trust-first narrative, and Living Forest.
- Use `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 3`, and `VISUAL_DENSITY: 3`.
- Keep one light theme; do not add a dark theme or theme switcher.
- Use one lime accent for primary actions and no unrelated accent colors.
- Use one soft radius system for cards/media and pill radius for buttons.
- Use Source Sans 3 normal and italic from the same family.
- Keep the hero heading at two lines or fewer on desktop and readable at 320 px.
- Do not hide hero text or the LCP element behind an entrance animation.
- Do not add parallax, marquee, magnetic movement, scroll progress, custom cursors, glow effects, or `transition-all`.
- Use only the existing Lucide icon family and never hand-write icon SVG paths.
- Keep one contact intent label: `Связаться`.
- Keep all eight service pages one click from the homepage.
- Keep medical language conservative and do not fabricate trust signals.
- Preserve unrelated worktree changes and stage only files named by each task.

---

## File Structure

- `app/globals.css`: final Living Forest semantic tokens, base rules, shared controls, dialog, navigation, FAQ, and service prose.
- `app/layout.tsx`: Source Sans 3, root metadata, provider, JSON-LD, and skip link.
- `components/home/HomeHero.tsx`: immediate, two-column first viewport.
- `components/home/TrustStrip.tsx`: three verifiable facts.
- `components/home/Needs.tsx`: user-need entry points.
- `components/home/ServicesGrid.tsx`: all eight typed services.
- `components/home/RehabilitationProcess.tsx`: four-step process.
- `components/home/StudioSection.tsx`: studio positioning without unsupported credentials.
- `components/Footer.tsx`: final contact and NAP footer.
- `app/page.tsx`: trust-first homepage composition.
- `app/services/[slug]/page.tsx`: final service composition.
- `tests/e2e/design-system.spec.ts`: layout, content, targets, contrast, and reduced-motion checks.
- `README.md`: real project commands and deployment requirements.

### Task 1: Install the final typography and Living Forest token system

**Files:**
- Modify: `app/layout.tsx:1-37`
- Replace: `app/globals.css:1-369`
- Create: `tests/unit/site-shell.test.tsx`

**Interfaces:**
- Produces: CSS variables `--color-canvas`, `--color-surface`, `--color-ink`, `--color-muted`, `--color-accent`, and `--color-border`.
- Produces: `--font-sans` from Source Sans 3 normal and italic.
- Consumers: all homepage, service, navigation, FAQ, dialog, and footer components.

- [ ] **Step 1: Write the failing shell test**

Create `tests/unit/site-shell.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

function Shell() {
  return (
    <>
      <a href="#main-content" className="skip-link">Перейти к основному содержанию</a>
      <main id="main-content"><h1>Kineto One</h1></main>
    </>
  );
}

describe("site shell", () => {
  it("provides a skip destination and one page heading", () => {
    render(<Shell />);
    expect(screen.getByRole("link", { name: "Перейти к основному содержанию" })).toHaveAttribute("href", "#main-content");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Configure Source Sans 3 through the supported Next.js API**

In `app/layout.tsx`, replace the existing font imports and declarations with:

```tsx
import { Source_Sans_3 } from "next/font/google";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["cyrillic", "latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});
```

Set the root element to:

```tsx
<html lang="ru" className={`${sourceSans.variable} h-full antialiased`}>
```

Delete the Inter and DM Serif declarations. Keep the approved metadata, JSON-LD, provider, skip link, and body structure from Plans 1 and 2.

- [ ] **Step 3: Replace `app/globals.css` with the final system**

```css
@import "tailwindcss";

@theme {
  --color-canvas: #eef1e8;
  --color-surface: #f8faf5;
  --color-ink: #11372e;
  --color-muted: #45675e;
  --color-accent: #c8f36d;
  --color-accent-hover: #b6e85a;
  --color-border: rgb(17 55 46 / 0.14);
  --font-sans: var(--font-source-sans), ui-sans-serif, system-ui, sans-serif;
  --radius-card: 1.25rem;
  --radius-media: 1.5rem;
}

:root {
  --page-gutter: clamp(1.25rem, 5vw, 6rem);
  --section-space: clamp(5rem, 10vw, 10rem);
  --content-max: 90rem;
}

* {
  box-sizing: border-box;
}

html {
  overflow-x: clip;
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}

body {
  min-width: 320px;
  background: var(--color-canvas);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.5;
}

button,
a,
input,
select,
textarea,
summary {
  -webkit-tap-highlight-color: transparent;
}

button,
a {
  touch-action: manipulation;
}

button {
  cursor: pointer;
}

img {
  display: block;
  height: auto;
  max-width: 100%;
}

::selection {
  background: var(--color-accent);
  color: var(--color-ink);
}

:where(h1, h2, h3) {
  text-wrap: balance;
}

:where(p) {
  text-wrap: pretty;
}

:where(a, button, input, select, textarea, summary):focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 3px;
}

.skip-link {
  position: fixed;
  inset-block-start: 0.75rem;
  inset-inline-start: 0.75rem;
  z-index: 200;
  transform: translateY(-200%);
  border-radius: 999px;
  background: var(--color-ink);
  color: var(--color-surface);
  padding: 0.75rem 1rem;
}

.skip-link:focus-visible {
  transform: translateY(0);
}

.site-header {
  position: sticky;
  inset-block-start: 0;
  z-index: 40;
  border-bottom: 1px solid var(--color-border);
  background: rgb(238 241 232 / 0.92);
  backdrop-filter: blur(12px);
}

.site-nav {
  display: grid;
  width: min(100%, var(--content-max));
  min-height: 68px;
  margin-inline: auto;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
  padding-inline: var(--page-gutter);
}

.site-brand {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: var(--color-ink);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  text-decoration: none;
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

.site-nav__links a,
.site-nav__actions > a {
  min-height: 44px;
  align-content: center;
  color: var(--color-ink);
  text-decoration: none;
  text-underline-offset: 0.3em;
}

.site-nav__links a:hover,
.site-nav__actions > a:hover {
  text-decoration: underline;
  text-decoration-thickness: from-font;
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

.site-nav__contact,
.mobile-menu__contact {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-ink);
  padding-inline: 1rem;
  font-weight: 600;
  transition: background-color 150ms cubic-bezier(0.2, 0, 0, 1), transform 150ms cubic-bezier(0.2, 0, 0, 1);
}

.site-nav__contact:hover,
.mobile-menu__contact:hover {
  background: var(--color-accent-hover);
}

.site-nav__contact:active,
.mobile-menu__contact:active {
  transform: scale(0.96);
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
  background: var(--color-canvas);
  color: var(--color-ink);
  padding: 0;
}

.mobile-menu::backdrop {
  background: var(--color-canvas);
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
  border-radius: 999px;
}

.mobile-menu__links {
  display: grid;
  gap: 0.5rem;
  margin-block: auto;
}

.mobile-menu__links a {
  padding-block: 0.5rem;
  color: var(--color-ink);
  font-size: clamp(2rem, 10vw, 3rem);
  font-weight: 600;
  line-height: 1.1;
  text-decoration: none;
}

.contact-dialog {
  width: min(27rem, calc(100% - 2rem));
  max-height: calc(100dvh - 2rem);
  margin: auto;
  border: 0;
  border-radius: var(--radius-media);
  background: transparent;
  color: var(--color-ink);
  padding: 0;
}

.contact-dialog::backdrop {
  background: rgb(17 55 46 / 0.38);
  backdrop-filter: blur(4px);
}

.contact-dialog__panel {
  position: relative;
  border-radius: inherit;
  background: var(--color-surface);
  padding: clamp(1.5rem, 5vw, 2.25rem);
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
  background: var(--color-canvas);
  color: var(--color-ink);
}

.contact-dialog__panel h2 {
  max-width: 17rem;
  padding-inline-end: 2rem;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.035em;
}

.contact-dialog__panel > p {
  max-width: 36ch;
  margin-block-start: 0.75rem;
  color: var(--color-muted);
}

.contact-dialog__channels {
  display: grid;
  gap: 0.75rem;
  margin-block-start: 1.5rem;
}

.contact-dialog__channels a {
  display: flex;
  min-height: 54px;
  align-items: center;
  gap: 0.875rem;
  border: 1px solid var(--color-border);
  border-radius: 0.875rem;
  color: var(--color-ink);
  padding: 0.875rem 1rem;
  text-decoration: none;
  transition: background-color 150ms cubic-bezier(0.2, 0, 0, 1), transform 150ms cubic-bezier(0.2, 0, 0, 1);
}

.contact-dialog__channels a:hover {
  background: var(--color-canvas);
}

.contact-dialog__channels a:active {
  transform: scale(0.96);
}

.faq-list {
  display: grid;
  gap: 0.75rem;
}

.faq-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  background: var(--color-surface);
}

.faq-item__trigger {
  display: flex;
  width: 100%;
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem;
  color: var(--color-ink);
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
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
  color: var(--color-muted);
  line-height: 1.6;
}

.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: var(--color-muted);
  font-size: 0.875rem;
  list-style: none;
}

.breadcrumbs li:not(:last-child)::after {
  content: "/";
  margin-inline-start: 0.5rem;
}

.breadcrumbs a {
  color: inherit;
  text-underline-offset: 0.25em;
}

.service-article {
  width: min(100%, 48rem);
  margin-inline: auto;
}

.service-article section + section {
  margin-block-start: 4rem;
}

.service-article h2 {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.service-article p,
.service-article li {
  color: var(--color-muted);
  font-size: clamp(1rem, 1.8vw, 1.125rem);
  line-height: 1.65;
}

.service-article h2 + p,
.service-article p + p,
.service-article p + ul {
  margin-block-start: 1.25rem;
}

.service-article ul {
  display: grid;
  gap: 0.75rem;
  margin-block-start: 1.5rem;
  padding-inline-start: 1.25rem;
}

@media (max-width: 767px) {
  :root {
    --section-space: 5rem;
  }

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

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .site-nav__contact,
  .mobile-menu__contact,
  .contact-dialog__channels a,
  .faq-item__icon {
    transition: none;
  }
}

@media (forced-colors: active) {
  :where(a, button, input, select, textarea, summary):focus-visible {
    outline-color: Highlight;
  }
}
```

- [ ] **Step 4: Run shell, lint, typecheck, and build checks**

```bash
npm run test -- tests/unit/site-shell.test.tsx
npm run lint
npm run typecheck
npm run build
```

Expected: all commands pass and the build downloads/self-hosts Source Sans 3 with Cyrillic support.

- [ ] **Step 5: Commit the visual foundation**

```bash
git add app/layout.tsx app/globals.css tests/unit/site-shell.test.tsx
git commit -m "feat: add Living Forest design system"
```

### Task 2: Build the trust-first homepage as Server Components

**Files:**
- Create: `components/home/HomeHero.tsx`
- Create: `components/home/TrustStrip.tsx`
- Create: `components/home/Needs.tsx`
- Create: `components/home/ServicesGrid.tsx`
- Create: `components/home/RehabilitationProcess.tsx`
- Create: `components/home/StudioSection.tsx`
- Replace: `components/Footer.tsx`
- Replace: `app/page.tsx`
- Create: `tests/unit/homepage-components.test.tsx`

**Interfaces:**
- `ServicesGrid` consumes `getAllServices()` directly on the server.
- `Needs` links user needs to preserved service URLs.
- `HomeHero` and Footer render `ContactTrigger` client leaves.
- The page produces one `main#main-content` and one H1.

- [ ] **Step 1: Write failing homepage component tests**

Create `tests/unit/homepage-components.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomeHero from "@/components/home/HomeHero";
import ServicesGrid from "@/components/home/ServicesGrid";
import { ContactDialogProvider } from "@/components/contact/ContactDialogProvider";

vi.mock("next/image", () => ({ default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} /> }));
vi.mock("next/link", () => ({ default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a> }));

describe("trust-first homepage", () => {
  it("renders one immediate hero heading and contact action", () => {
    render(<ContactDialogProvider><HomeHero /></ContactDialogProvider>);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Движение, к которому хочется вернуться." })).toBeVisible();
    expect(screen.getByRole("button", { name: "Связаться" })).toBeVisible();
  });

  it("links all eight service pages", () => {
    render(<ServicesGrid />);
    expect(screen.getAllByRole("link")).toHaveLength(8);
    expect(screen.getByRole("link", { name: /Массаж/ })).toHaveAttribute("href", "/services/massage");
    expect(screen.getByRole("link", { name: /Мануальные техники/ })).toHaveAttribute("href", "/services/manual-therapy");
  });
});
```

- [ ] **Step 2: Run and confirm missing-component failures**

```bash
npm run test -- tests/unit/homepage-components.test.tsx
```

Expected: FAIL because the new homepage components do not exist.

- [ ] **Step 3: Create `HomeHero.tsx` and `TrustStrip.tsx`**

Create `components/home/HomeHero.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactTrigger } from "@/components/contact/ContactTrigger";

export default function HomeHero() {
  return (
    <section className="mx-auto grid min-h-[calc(100dvh-68px)] w-full max-w-[var(--content-max)] items-center gap-10 px-[var(--page-gutter)] py-12 md:grid-cols-[1.05fr_0.95fr] md:py-16">
      <div className="max-w-3xl">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-muted">Физическая реабилитация в Кишинёве</p>
        <h1 className="max-w-[12ch] text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-ink">
          Движение, к которому <em className="text-muted">хочется вернуться.</em>
        </h1>
        <p className="mt-7 max-w-[48ch] text-lg leading-relaxed text-muted md:text-xl">Понятный план восстановления с вниманием к вашему состоянию и привычному ритму жизни.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ContactTrigger className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 font-semibold text-ink transition-[background-color,transform] duration-150 hover:bg-accent-hover active:scale-[0.96]">
            Связаться <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
          </ContactTrigger>
          <Link href="#services" className="inline-flex min-h-12 items-center rounded-full border border-border px-5 font-semibold text-ink transition-[background-color,transform] duration-150 hover:bg-surface active:scale-[0.96]">Посмотреть услуги</Link>
        </div>
      </div>
      <div className="relative aspect-[4/5] min-h-[28rem] overflow-hidden rounded-[var(--radius-media)] bg-surface outline outline-1 outline-black/10 md:aspect-[5/6]">
        <Image
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=85&w=1600&auto=format&fit=crop"
          alt="Спокойная практика движения в светлом пространстве"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 46vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
```

Create `components/home/TrustStrip.tsx`:

```tsx
const facts = ["Кишинёв", "8 направлений", "Индивидуальная программа"] as const;

export default function TrustStrip() {
  return (
    <section aria-label="Кратко о студии" className="bg-ink text-surface">
      <div className="mx-auto grid w-full max-w-[var(--content-max)] gap-px bg-white/15 md:grid-cols-3">
        {facts.map((fact) => <p key={fact} className="bg-ink px-[var(--page-gutter)] py-6 text-sm font-semibold tracking-wide">{fact}</p>)}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `Needs.tsx` and `ServicesGrid.tsx`**

Create `components/home/Needs.tsx`:

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const needs = [
  { title: "Боль и ограничения", text: "Спина, шея и суставы мешают привычному движению.", href: "/services/back-pain" },
  { title: "После травмы или операции", text: "Нужно постепенно вернуть движение, силу и бытовую активность.", href: "/services/post-op" },
  { title: "Возвращение к спорту", text: "Важно подготовить тело к специфической нагрузке без спешки.", href: "/services/sports-rehab" },
  { title: "Неврологическое восстановление", text: "Работа над равновесием, координацией и повседневными навыками.", href: "/services/neurology" },
] as const;

export default function Needs() {
  return (
    <section id="needs" aria-labelledby="needs-title" className="px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto w-full max-w-[var(--content-max)]">
        <h2 id="needs-title" className="max-w-[12ch] text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">С чем можно обратиться</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {needs.map((need, index) => (
            <Link key={need.title} href={need.href} className={`group min-h-64 rounded-[var(--radius-card)] p-7 text-ink outline outline-1 outline-black/5 transition-[background-color,transform] duration-150 hover:-translate-y-1 ${index === 0 ? "bg-accent" : "bg-surface"}`}>
              <div className="flex h-full flex-col justify-between gap-8">
                <ArrowUpRight aria-hidden="true" className="self-end transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
                <div><h3 className="text-2xl font-semibold tracking-[-0.035em]">{need.title}</h3><p className="mt-3 max-w-[38ch] text-muted">{need.text}</p></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `components/home/ServicesGrid.tsx`:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllServices } from "@/data/services";

export default function ServicesGrid() {
  const services = getAllServices();
  return (
    <section id="services" aria-labelledby="services-title" className="bg-surface px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto w-full max-w-[var(--content-max)]">
        <h2 id="services-title" className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">Направления работы</h2>
        <p className="mt-5 max-w-[58ch] text-lg text-muted">Выберите направление, чтобы узнать, как строится оценка и программа восстановления.</p>
        <div className="mt-12 grid gap-x-8 md:grid-cols-2">
          {services.map((service, index) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group grid min-h-32 grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-border py-6 text-ink no-underline">
              <span aria-hidden="true" className="text-sm tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
              <span><strong className="block text-xl font-semibold tracking-[-0.025em] md:text-2xl">{service.shortTitle}</strong><span className="mt-1 block text-sm text-muted">{service.category}</span></span>
              <ArrowRight aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create process and studio sections**

Create `components/home/RehabilitationProcess.tsx`:

```tsx
const steps = [
  ["Оценка", "Обсуждаем состояние, ограничения и задачи, затем смотрим базовые движения."],
  ["План", "Определяем ближайшие цели и выбираем допустимую последовательность нагрузки."],
  ["Практика", "Осваиваем упражнения и техники с понятными критериями выполнения."],
  ["Контроль", "Отслеживаем реакцию и меняем программу по мере восстановления."],
] as const;

export default function RehabilitationProcess() {
  return (
    <section id="process" aria-labelledby="process-title" className="px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto grid w-full max-w-[var(--content-max)] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div><h2 id="process-title" className="text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">Как проходит работа</h2><p className="mt-5 max-w-[38ch] text-lg text-muted">Четыре понятных этапа без универсальных обещаний и одинаковых программ.</p></div>
        <ol className="grid gap-3">
          {steps.map(([title, text], index) => (
            <li key={title} className="grid grid-cols-[auto_1fr] gap-5 rounded-[var(--radius-card)] bg-surface p-6">
              <span aria-hidden="true" className="text-sm tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
              <div><h3 className="text-2xl font-semibold tracking-[-0.035em]">{title}</h3><p className="mt-2 max-w-[48ch] text-muted">{text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

Create `components/home/StudioSection.tsx`:

```tsx
import Image from "next/image";
import { ContactTrigger } from "@/components/contact/ContactTrigger";

export default function StudioSection() {
  return (
    <section id="studio" aria-labelledby="studio-title" className="bg-ink px-[var(--page-gutter)] py-[var(--section-space)] text-surface">
      <div className="mx-auto grid w-full max-w-[var(--content-max)] gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] outline outline-1 outline-white/10">
          <Image src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=85&w=1600&auto=format&fit=crop" alt="Обсуждение индивидуального плана восстановления" fill sizes="(max-width: 1023px) 100vw, 48vw" className="object-cover" />
        </div>
        <div>
          <h2 id="studio-title" className="text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">Студия, где план объясняют</h2>
          <div className="mt-7 grid max-w-[56ch] gap-5 text-lg text-surface/80">
            <p>Kineto One работает с движением последовательно: оценивает текущие возможности, определяет ближайшую задачу и подбирает нагрузку.</p>
            <p>Вы понимаете, зачем выполняется каждое упражнение, на что обращать внимание и когда программа должна измениться.</p>
          </div>
          <ContactTrigger className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-5 font-semibold text-ink transition-[background-color,transform] duration-150 hover:bg-accent-hover active:scale-[0.96]">Связаться</ContactTrigger>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Replace Footer with the final server component**

Replace `components/Footer.tsx`:

```tsx
import { ArrowUpRight } from "lucide-react";
import { ContactTrigger } from "@/components/contact/ContactTrigger";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer id="contact" className="px-[var(--page-gutter)] py-16">
      <div className="mx-auto grid w-full max-w-[var(--content-max)] gap-14 border-t border-border pt-12 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Kineto One</p>
          <h2 className="mt-4 max-w-[12ch] text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">Обсудим следующий шаг</h2>
          <ContactTrigger className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 font-semibold text-ink transition-[background-color,transform] duration-150 hover:bg-accent-hover active:scale-[0.96]">Связаться <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.75} /></ContactTrigger>
        </div>
        <div className="grid content-start gap-8 text-muted sm:grid-cols-2 lg:min-w-[28rem]">
          <div><h3 className="font-semibold text-ink">Контакты</h3><a className="mt-3 inline-flex min-h-11 items-center text-lg text-muted" href={`tel:${siteConfig.phoneInternational}`}>{siteConfig.phoneDisplay}</a></div>
          <div><h3 className="font-semibold text-ink">Адрес</h3><p className="mt-3 text-lg">{siteConfig.address.street}<br />{siteConfig.address.city}, Moldova</p></div>
          <div><h3 className="font-semibold text-ink">Мессенджеры</h3><div className="mt-3 flex flex-col"><a className="min-h-11 content-center" href={siteConfig.channels.telegram} target="_blank" rel="noopener noreferrer">Telegram</a><a className="min-h-11 content-center" href={siteConfig.channels.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a><a className="min-h-11 content-center" href={siteConfig.channels.viber}>Viber</a></div></div>
          <div><h3 className="font-semibold text-ink">Соцсети</h3><div className="mt-3 flex flex-col"><a className="min-h-11 content-center" href={siteConfig.channels.instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a className="min-h-11 content-center" href={siteConfig.channels.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></div></div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex w-full max-w-[var(--content-max)] flex-wrap justify-between gap-3 border-t border-border pt-6 text-sm text-muted"><span>© 2026 Kineto One</span><span>Физическая реабилитация в Кишинёве</span></div>
    </footer>
  );
}
```

- [ ] **Step 7: Compose the final homepage**

Replace `app/page.tsx`:

```tsx
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import Needs from "@/components/home/Needs";
import RehabilitationProcess from "@/components/home/RehabilitationProcess";
import ServicesGrid from "@/components/home/ServicesGrid";
import StudioSection from "@/components/home/StudioSection";
import TrustStrip from "@/components/home/TrustStrip";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HomeHero />
        <TrustStrip />
        <Needs />
        <ServicesGrid />
        <RehabilitationProcess />
        <StudioSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
```

Restyle the existing accessible FAQ outer section with `px-[var(--page-gutter)] py-[var(--section-space)]`, wrap it in `max-w-[var(--content-max)] mx-auto`, use one `h2`, and assign `className="faq-list"` to the item container. Do not change the approved question and answer strings.

- [ ] **Step 8: Verify homepage structure and commit**

```bash
npm run test -- tests/unit/homepage-components.test.tsx
npm run test
npm run lint
npm run typecheck
npm run build
```

Expected: homepage component tests and all prior regressions pass; build keeps all routes static or SSG.

```bash
git add app/page.tsx components/home components/Footer.tsx components/FAQ.tsx tests/unit/homepage-components.test.tsx
git commit -m "feat: build trust-first homepage"
```

### Task 3: Apply the final service-page composition

**Files:**
- Modify: `app/services/[slug]/page.tsx`
- Modify: `components/RelatedServices.tsx`
- Create: `tests/unit/service-layout.test.tsx`

**Interfaces:**
- Consumes: typed `ServiceData`, breadcrumbs, JSON-LD, article sections, related services, Navbar, Footer, and ContactTrigger.
- Produces: one H1, one priority hero image, three semantic article sections, related links, and one contact action.

- [ ] **Step 1: Write the failing service-layout component test**

Create `tests/unit/service-layout.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RelatedServices from "@/components/RelatedServices";

vi.mock("next/link", () => ({ default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a> }));

describe("service layout", () => {
  it("gives related-service links descriptive names and valid targets", () => {
    render(<RelatedServices slugs={["back-pain", "massage", "kinesiotherapy"]} />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getByRole("link", { name: /Спина и шея/ })).toHaveAttribute("href", "/services/back-pain");
  });
});
```

- [ ] **Step 2: Restyle related links with the final system**

Replace the return value in `components/RelatedServices.tsx` with:

```tsx
return (
  <section aria-labelledby="related-services-title" className="bg-surface px-[var(--page-gutter)] py-[var(--section-space)]">
    <div className="mx-auto w-full max-w-[var(--content-max)]">
      <h2 id="related-services-title" className="text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">Другие направления</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {slugs.map((slug) => {
          const service = servicesData[slug];
          return (
            <Link key={slug} href={`/services/${slug}`} className="group flex min-h-48 flex-col justify-between rounded-[var(--radius-card)] bg-canvas p-6 text-ink outline outline-1 outline-black/5 transition-transform duration-150 hover:-translate-y-1">
              <ArrowUpRight aria-hidden="true" className="self-end" strokeWidth={1.5} />
              <span><strong className="block text-2xl font-semibold tracking-[-0.035em]">{service.shortTitle}</strong><span className="mt-2 block text-sm text-muted">{service.category}</span></span>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);
```

Import `ArrowUpRight` from `lucide-react`.

- [ ] **Step 3: Replace the visible service-page structure**

Keep `generateStaticParams`, `generateMetadata`, schema objects, and `notFound()`. Replace the JSX in `app/services/[slug]/page.tsx` with:

```tsx
return (
  <>
    <JsonLd data={[serviceSchema, breadcrumbSchema]} />
    <Navbar />
    <main id="main-content">
      <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)] pt-8">
        <Breadcrumbs slug={service.slug} title={service.title} />
      </div>
      <section className="mx-auto grid w-full max-w-[var(--content-max)] gap-10 px-[var(--page-gutter)] pb-[var(--section-space)] pt-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">{service.category}</p>
          <h1 className="mt-5 max-w-[13ch] text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.065em]">{service.title}</h1>
          <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl">{service.subtitle}</p>
          <ContactTrigger className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-5 font-semibold text-ink transition-[background-color,transform] duration-150 hover:bg-accent-hover active:scale-[0.96]">Связаться</ContactTrigger>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] bg-surface outline outline-1 outline-black/10">
          <Image src={service.heroImage} alt={service.heroAlt} fill sizes="(max-width: 1023px) 100vw, 45vw" priority className="object-cover" />
        </div>
      </section>
      <section className="px-[var(--page-gutter)] pb-[var(--section-space)]">
        <ServiceArticle sections={service.sections} />
      </section>
      <RelatedServices slugs={service.relatedSlugs} />
    </main>
    <Footer />
  </>
);
```

Import `ContactTrigger`. Do not add a second process section or duplicate the homepage FAQ on every service page.

- [ ] **Step 4: Verify and commit**

```bash
npm run test -- tests/unit/service-layout.test.tsx
npm run test
npm run lint
npm run typecheck
npm run build
npm run test:e2e -- tests/e2e/seo.spec.ts
```

Expected: component, route, metadata, schema, and build checks pass for all eight services.

```bash
git add "app/services/[slug]/page.tsx" components/RelatedServices.tsx tests/unit/service-layout.test.tsx
git commit -m "feat: redesign service pages"
```

### Task 4: Remove obsolete UI and animation dependencies

**Files:**
- Delete with explicit user confirmation at execution time: `app/template.tsx`
- Delete with explicit user confirmation at execution time: `components/About.tsx`
- Delete with explicit user confirmation at execution time: `components/Approach.tsx`
- Delete with explicit user confirmation at execution time: `components/Banner.tsx`
- Delete with explicit user confirmation at execution time: `components/Booking.tsx`
- Delete with explicit user confirmation at execution time: `components/BotanicalIllustration.tsx`
- Delete with explicit user confirmation at execution time: `components/FloatingShape.tsx`
- Delete with explicit user confirmation at execution time: `components/Hero.tsx`
- Delete with explicit user confirmation at execution time: `components/Process.tsx`
- Delete with explicit user confirmation at execution time: `components/Reveal.tsx`
- Delete with explicit user confirmation at execution time: `components/Services.tsx`
- Delete with explicit user confirmation at execution time: `components/Showcase.tsx`
- Delete with explicit user confirmation at execution time: `components/Testimonials.tsx`
- Delete with explicit user confirmation at execution time: `components/AnimatedLink.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: completed homepage and service imports.
- Produces: no dead components, no fake booking state, and no Framer Motion client bundle.

- [ ] **Step 1: Prove every deletion candidate is unused**

Use the repository search tool for every filename and verify no import remains outside the file itself. Then run:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected: all checks pass before deletion. If any candidate is imported, remove it from the deletion list and trace its owner before continuing.

- [ ] **Step 2: Ask for explicit deletion confirmation**

Present the exact file list above and wait for confirmation. Do not treat approval of this plan as permission to delete files under the destructive-operation policy.

- [ ] **Step 3: Delete the confirmed obsolete files and remove Framer Motion**

After confirmation, delete only the listed files and run:

```bash
npm uninstall framer-motion
```

Do not remove `lucide-react`; it is the single retained icon family.

- [ ] **Step 4: Ensure local design artifacts stay untracked**

Confirm `.gitignore` contains:

```gitignore
/.superpowers/
```

- [ ] **Step 5: Verify no stale imports or animation API remain**

Search the repository for `framer-motion`, `motion.`, `Reveal`, `animate-pulse`, `transition-all`, and `window.addEventListener("scroll"`. Expected: no application-code matches.

Run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Expected: all commands pass after deletion and dependency removal.

- [ ] **Step 6: Commit the cleanup**

```bash
git add -A app/template.tsx components package.json package-lock.json .gitignore
git commit -m "refactor: remove obsolete animated interface"
```

### Task 5: Add visual, responsive, reduced-motion, and design-system E2E checks

**Files:**
- Create: `tests/e2e/design-system.spec.ts`
- Modify: `README.md:1-36`

**Interfaces:**
- Consumes: completed production build.
- Produces: deterministic checks for the approved design constraints and accurate project documentation.

- [ ] **Step 1: Write the design-system browser suite**

Create `tests/e2e/design-system.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
  { name: "narrow", width: 320, height: 700 },
] as const;

for (const viewport of viewports) {
  test(`${viewport.name} preserves content and viewport boundaries`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Движение, к которому хочется вернуться." })).toBeVisible();
    await expect(page.getByRole("button", { name: "Связаться" }).first()).toBeVisible();
    const layout = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      dialogCount: document.querySelectorAll("dialog").length,
    }));
    expect(layout.scrollWidth).toBe(layout.clientWidth);
    expect(layout.dialogCount).toBe(0);
  });
}

test("all services are one click from the homepage", async ({ page }) => {
  await page.goto("/");
  const serviceLinks = page.locator('#services a[href^="/services/"]');
  await expect(serviceLinks).toHaveCount(8);
});

test("normal text tokens meet WCAG AA on primary surfaces", async ({ page }) => {
  await page.goto("/");
  const ratios = await page.evaluate(() => {
    const parse = (value: string) => {
      const normalized = value.trim();
      const hex = normalized.match(/^#([0-9a-f]{6})$/i)?.[1];
      if (hex) return [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
      return (normalized.match(/\d+(?:\.\d+)?/g) ?? []).slice(0, 3).map(Number);
    };
    const luminance = (color: number[]) => {
      const [r, g, b] = color.map((channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrast = (foreground: string, background: string) => {
      const a = luminance(parse(foreground));
      const b = luminance(parse(background));
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    };
    const style = getComputedStyle(document.documentElement);
    return {
      mutedOnCanvas: contrast(style.getPropertyValue("--color-muted"), style.getPropertyValue("--color-canvas")),
      mutedOnSurface: contrast(style.getPropertyValue("--color-muted"), style.getPropertyValue("--color-surface")),
      inkOnAccent: contrast(style.getPropertyValue("--color-ink"), style.getPropertyValue("--color-accent")),
    };
  });
  expect(ratios.mutedOnCanvas).toBeGreaterThanOrEqual(4.5);
  expect(ratios.mutedOnSurface).toBeGreaterThanOrEqual(4.5);
  expect(ratios.inkOnAccent).toBeGreaterThanOrEqual(4.5);
});

test("reduced motion leaves no long-running animation", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  const animations = await page.evaluate(() => document.getAnimations().filter((animation) => {
    const timing = animation.effect?.getTiming();
    return timing?.iterations === Infinity || Number(timing?.duration) > 200;
  }).length);
  expect(animations).toBe(0);
  await context.close();
});

test("interactive targets meet the 44px design target", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const failures = await page.locator("a,button").evaluateAll((elements) => elements.flatMap((element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden") return [];
    return rect.width < 44 || rect.height < 44 ? [{ text: element.textContent?.trim(), width: rect.width, height: rect.height }] : [];
  }));
  expect(failures).toEqual([]);
});
```

- [ ] **Step 2: Replace the starter README**

Replace `README.md` with:

~~~~md
# Kineto One

Marketing website for the Kineto One physical rehabilitation studio in Chisinau.

## Requirements

- Node.js 20 or newer
- npm

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm audit --omit=dev
```

`npm run verify` runs lint, typecheck, unit tests, production build, and Playwright tests in sequence.

## Production URL

Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin before public deployment. Without it, the application does not emit canonical URLs or sitemap entries, which prevents accidental publication of an invented domain.

## Content

Service content lives in `data/services/`. Keep medical wording conservative and do not add guaranteed outcomes, unverified credentials, ratings, or opening hours.
~~~~

- [ ] **Step 3: Run the complete automated gate**

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm audit --omit=dev
git diff --check
```

Expected: every command exits zero; both Playwright projects pass; the production dependency audit reports zero known vulnerabilities.

- [ ] **Step 4: Run deterministic UI and Lighthouse checks**

Run the Impeccable detector once on all changed UI targets:

```bash
node "/Users/yarik/.config/devin/skills/impeccable/scripts/detect.mjs" --json app components
```

Expected: no confirmed high-severity implementation-integrity finding. Review every reported item in context rather than suppressing it.

Use Chrome DevTools MCP on the production server:

1. run `lighthouse_audit` in mobile navigation mode;
2. require Accessibility at least 100, Best Practices 100, and no malformed accessibility-tree finding;
3. run `performance_start_trace` with reload and automatic stop;
4. require observed LCP below 2500 ms and CLS below 0.1;
5. inspect `LCPBreakdown` and confirm the hero text does not spend most of LCP in an intentional animation delay.

- [ ] **Step 5: Perform the bounded visual QA pass**

Start the production server without running a concurrent build:

```bash
npm run start -- --hostname 127.0.0.1 --port 3100
```

Inspect the homepage and one representative service page at 1440 by 900 and 390 by 844 in one pass. Verify:

- hero copy, CTA, and image fit the first viewport;
- navigation remains one line at desktop width;
- no text or CTA wraps unexpectedly;
- section layout families are visually distinct;
- all stock images share a coherent rehabilitation and movement tone;
- no service content is clipped;
- focus indicators are visible;
- contact dialog fits within the mobile viewport;
- Source Sans 3 italic descenders are not clipped;
- the page contains no em dash or en dash characters in visible copy.

Fix all confirmed defects in one batch, rerun the automated gate, then perform at most one confirmation visual pass.

- [ ] **Step 6: Commit documentation and final regressions**

```bash
git add tests/e2e/design-system.spec.ts README.md
git commit -m "test: verify Human Botanical redesign"
```

- [ ] **Step 7: Review the complete branch before integration**

Run in parallel:

```bash
git status --short
git diff --check
git log --oneline --decorate -12
git diff main...HEAD --stat
```

Confirm no `.superpowers/` artifact, generated report, secret, invented domain, or unrelated pre-existing modification is staged. Do not push or create a pull request unless the user explicitly asks.
