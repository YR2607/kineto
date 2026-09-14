# Kineto One Full Redesign Design

**Date:** 2026-09-14

**Status:** Approved in conversation

## Summary

Kineto One will be redesigned as a trustworthy, accessible, mobile-first website for a physical rehabilitation studio in Chisinau. The redesign keeps all existing service URLs and real contact details while replacing the current presentation with the approved Human Botanical visual direction, Trust-first homepage structure, Living Forest color system, and calm motion language.

The implementation also resolves the security, accessibility, SEO, content, and maintainability issues found during the verified audit. The work is split into independently testable stages so foundational fixes are not mixed with visual changes.

## Approved Product Decisions

- Kineto One is presented as a studio brand, not as a single-person practice.
- The homepage serves a broad audience: people with pain or movement limitations, people recovering after injury or surgery, athletes, and people needing neurological rehabilitation.
- The primary action is `Связаться` and opens one accessible dialog containing phone, Telegram, WhatsApp, and Viber options.
- No contact form is included. The unused form that reports success without sending data is removed.
- Only stock photography is available. The redesign uses a coherent, realistic set focused on movement, rehabilitation interaction, and studio environments.
- Medical copy is rewritten conservatively. Absolute promises, guaranteed outcomes, unsupported diagnostic claims, and unverifiable qualifications are removed.
- No canonical production domain exists yet. Production URL handling uses `NEXT_PUBLIC_SITE_URL` or a verified deployment URL and never hardcodes an invented domain.

## Goals

1. Make the studio credible and understandable within the first viewport.
2. Give every visitor a clear path from their need to a relevant service and contact channel.
3. Meet keyboard, screen-reader, motion, contrast, and narrow-width accessibility requirements.
4. Give every service page unique, indexable metadata and valid internal linking.
5. Eliminate known production dependency vulnerabilities.
6. Reduce unnecessary client-side JavaScript and animation-driven rendering delays.
7. Establish regression tests for the critical user and SEO flows.

## Non-goals

- No booking backend, CRM, calendar integration, payments, user accounts, or admin interface.
- No fabricated reviews, ratings, certifications, opening hours, team members, or medical outcomes.
- No new route hierarchy or service slug migration.
- No dark theme in this redesign. The approved Living Forest direction is a single light theme.
- No high-intensity scroll choreography, parallax, marquee, magnetic cursor, or autoplaying media.
- No new component library unless an implementation requirement cannot be met with the platform and current stack.

## Visual Direction

### Design read

A local healthcare marketing site for a broad Russian-speaking audience. The design is calm, human, botanical, and professional. It uses organic visual cues without resembling a spa, beauty brand, or generic wellness template.

### Approved dials

- `DESIGN_VARIANCE: 6`
- `MOTION_INTENSITY: 3`
- `VISUAL_DENSITY: 3`

### Living Forest system

The color system contains one neutral ramp, one forest ramp, and one lime accent ramp. Components consume semantic tokens rather than raw colors.

Core visual anchors:

- page background: a light mineral green close to `#eef1e8`;
- primary text: a deep forest close to `#11372e`;
- secondary text: a darker accessible eucalyptus calibrated to pass WCAG AA on every surface;
- primary action: a living lime close to `#c8f36d` with deep forest text;
- elevated surface: an off-white green-tinted surface;
- borders: low-contrast forest-derived separators used only when spacing cannot communicate grouping.

Exact production values must be measured in rendered context. All normal text must reach 4.5:1 contrast, large text and non-text UI must reach 3:1, and focus indicators must remain visible against adjacent colors.

### Typography

- Use a modern sans-serif family loaded through the supported Next.js font API.
- Use an italic style from the same family for occasional display emphasis.
- Do not combine an unrelated display serif with the primary sans-serif.
- Use a small semantic type scale with body text at 16 px or larger.
- Body measure remains between 60 and 75 characters where content is long-form.
- Headings use balanced wrapping; descriptions use pretty wrapping.
- The hero heading occupies no more than two lines on desktop and remains readable without collision on 320 px screens.

### Shape and surfaces

- Buttons use a pill radius.
- Content cards and media use one soft radius scale.
- Nested radii are concentric.
- Shadows communicate elevation only. Structural grouping uses spacing before borders.
- Images receive a subtle neutral outline and fixed aspect ratio to avoid layout shift.

### Motion

- Hero text and the LCP element render immediately with no delayed opacity animation.
- Page transitions do not hide the full route on initial render.
- Hover, focus, and press feedback use explicit properties and finish within 150 ms for frequent actions.
- Optional section reveals are rare, use opacity and a small vertical offset, and do not delay content availability.
- `prefers-reduced-motion: reduce` receives static content and instant state changes.

## Information Architecture

### Preserved routes

- `/`
- `/services/back-pain`
- `/services/sports-rehab`
- `/services/post-op`
- `/services/neurology`
- `/services/joints`
- `/services/kinesiotherapy`
- `/services/massage`
- `/services/manual-therapy`

### Homepage sequence

1. Compact navigation with the studio name, service navigation, studio link, contacts, and one primary CTA.
2. Hero with one clear promise, a short explanation, one primary CTA, and one secondary service link.
3. Verified trust strip containing only facts that are confirmed in the project or by the owner.
4. `С чем помогаем` groups user needs in plain language.
5. All eight service directions with descriptive destination links.
6. Four-part process: assessment, plan, practice, progress review.
7. Studio section describing the approach without unsupported credentials or claims.
8. FAQ implemented as an accessible accordion.
9. Final contact CTA and complete visible NAP information.

### Service page sequence

1. Breadcrumb navigation.
2. Service-specific hero with unique H1, description, and relevant image.
3. Concise answer-first introduction.
4. Structured sections describing the need, approach, typical process, and expected scope without guarantees.
5. Related services.
6. Contact CTA.
7. Shared footer with visible contact details.

Every service page is linked from the homepage and included in the sitemap. Related-service links prevent orphaned or dead-end content.

## Component Architecture

### Server components

The root layout, homepage composition, service page composition, static content sections, metadata generation, sitemap, robots configuration, and structured data remain server-rendered. Client boundaries must not wrap static page sections.

### Client islands

Only these interactions require client components:

1. `MobileNavigation`: open and close state, Escape handling, focus restoration, and background inertness.
2. `ContactDialog`: one global dialog instance and channel links.
3. `FaqAccordion`: native buttons with expanded state and controlled panels.

### Global contact controller

A single client controller is mounted once near the root. CTA triggers reference the controller and open the same native `<dialog>` element. The dialog:

- has an accessible title and description;
- opens with `showModal()`;
- closes through its close button, backdrop interaction, or Escape;
- restores focus to the exact trigger;
- exposes phone, Telegram, WhatsApp, and Viber as real links;
- does not leave hidden controls in the accessibility tree or tab order;
- contains no simulated form submission.

### Navigation

- Internal navigation uses the framework link component.
- The phone number is a real `tel:` link.
- The mobile trigger exposes its current state through `aria-expanded` and names the controlled menu.
- The mobile menu closes on selection and Escape, restores focus, and prevents interaction with background content while open.
- The first focusable element in the document is a skip link to the main content.

### FAQ

Each question is a native button. It controls one answer region through stable IDs, `aria-expanded`, and `aria-controls`. Enter and Space work through native behavior. Motion is limited to an optional opacity change and is disabled under reduced motion.

## Content Model

The service model is converted from opaque HTML strings into structured, typed content.

```ts
interface ServiceSection {
  heading: string;
  paragraphs: string[];
  items?: string[];
}

interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  heroImage: string;
  heroAlt: string;
  sections: ServiceSection[];
  relatedSlugs: string[];
}
```

This model removes `dangerouslySetInnerHTML`, makes heading structure deterministic, supports unique metadata, and allows service relationships to be validated in tests.

## Content Policy

The visible copy must:

- use `Kineto One` consistently as the studio name;
- use `студия` consistently and never imply an unverified clinic status;
- describe assessment rather than claim medical diagnosis unless the legal and professional basis is supplied;
- avoid `гарантируем`, `навсегда`, `абсолютно безопасно`, `устраняем причину`, and equivalent promises;
- explain that suitability and load depend on individual assessment and relevant medical guidance;
- identify Chisinau naturally in metadata and contact context;
- keep button labels verb-first and consistent by intent;
- use `Связаться` for the contact dialog and service-specific destination labels for navigation;
- contain no fake testimonials, rankings, or precise outcome statistics.

## Image Strategy

- Use a coherent set of licensed stock photographs rather than the current unrelated mix of yoga, spa products, and generic treatment imagery.
- The hero uses one strong movement or rehabilitation image with stable dimensions and high fetch priority.
- Below-fold images are lazy-loaded through `next/image`.
- Decorative duplicates have empty alt text and are hidden from assistive technology.
- Informative images describe their purpose, not the service title repeated verbatim.
- Image URLs and crops are centralized so the same asset is not downloaded twice for decorative background and foreground use.
- The layout remains understandable if a remote image fails.

## SEO Design

### Metadata

- Root metadata defines a title template and default description.
- Each service uses `generateMetadata` derived from its typed content.
- Canonical and social URLs are generated only from a verified site URL.
- Open Graph and Twitter metadata use truthful titles, descriptions, locale, and a defined social image.

### Site URL resolution

The production origin is resolved from `NEXT_PUBLIC_SITE_URL` or a verified deployment URL. Local development may use `http://localhost:3000`. Production documentation and verification explicitly require a real origin before public deployment.

### Crawlability

- `app/robots.ts` allows normal search crawling and references the sitemap when a production origin exists.
- `app/sitemap.ts` lists the homepage and all eight service pages.
- Unknown service slugs continue to return `404` through `notFound()`.
- Service links use descriptive anchor text and all important pages remain one click from the homepage.

### Structured data

Structured data is rendered in initial server HTML and built only from verified configuration:

- `WebSite` and `Organization` for Kineto One;
- `LocalBusiness` for the studio, without a medical-clinic subtype until its legal status is confirmed;
- `Service` on each service page;
- `BreadcrumbList` on service pages.

No rating, review, opening hours, employee, qualification, or medical claim is added without source data.

## Accessibility Requirements

- One visible `main` landmark and one H1 per route.
- Heading levels descend without skips.
- All interactive controls have accessible names.
- All pointer actions have keyboard equivalents.
- Focus indicators use at least a 2 px perimeter and remain visible in forced-colors mode.
- Touch targets aim for 44 by 44 CSS pixels and never fall below WCAG 2.5.8 requirements.
- Normal text contrast reaches 4.5:1; large text and non-text UI reach 3:1.
- The interface reflows without horizontal scrolling at 320 px and 200 percent zoom.
- Motion honors reduced-motion preferences.
- Modal and menu overlays manage focus and background inertness.
- External channel links expose meaningful names.
- Decorative graphics use `aria-hidden="true"` or empty alt text.

## Performance Requirements

- The hero heading is not animated from opacity zero.
- The page-level template fade is removed.
- Scroll direction does not update React state on every native scroll event or recreate listeners per frame.
- Static sections remain server components.
- Repeated contact dialogs and duplicated decorative image requests are eliminated.
- Production laboratory targets are LCP below 2.5 seconds and CLS below 0.1.
- Performance reports clearly distinguish local lab data from unavailable CrUX field data.

## Security and Dependency Policy

- Upgrade Next.js from `16.2.10` to the patched `16.3.5` release identified by `npm audit`.
- The release is less than seven days old on 2026-09-14. The critical production advisory justifies the exception, followed by full regression verification.
- Do not use `npm audit fix --force` as a blind migration mechanism. Install the exact reviewed version through npm and inspect the lockfile diff.
- Run `npm audit --omit=dev` after the upgrade and report any remaining production advisory.
- Removing `dangerouslySetInnerHTML` prevents future content changes from becoming an injection boundary.

## Test Strategy

### Unit and component tests

Use Vitest, Testing Library, and user-event for:

- service lookup and static parameter generation;
- validation that all related slugs exist;
- metadata uniqueness and correct fallback behavior;
- FAQ keyboard behavior and ARIA state;
- contact dialog open, close, Escape, and focus restoration;
- mobile menu open, close, Escape, and focus restoration;
- conservative-copy guardrails for banned absolute claims.

### Browser tests

Use Playwright against the production build for:

- homepage and all eight service routes returning `200`;
- unknown service route returning `404`;
- one contact dialog instance;
- complete keyboard contact flow;
- all service cards reaching their intended pages;
- no horizontal overflow at 1440, 390, and 320 px;
- mobile navigation behavior;
- unique titles and descriptions;
- canonical behavior with configured site URL;
- sitemap and robots responses;
- absence of console errors and failed application requests.

### Automated quality gates

Run all of the following before completion:

1. lint;
2. TypeScript typecheck;
3. unit and component tests;
4. Playwright browser tests;
5. production build;
6. production dependency audit;
7. Lighthouse mobile accessibility and basic SEO;
8. production performance trace;
9. the Impeccable detector on changed UI targets;
10. desktop and mobile visual inspection in one batched pass, followed by at most one confirmation pass.

## Migration Plan

### Stage 1: Safety baseline

Add test and lint infrastructure, write failing regressions for confirmed bugs, upgrade the vulnerable framework release, and preserve all unrelated worktree changes.

### Stage 2: Interaction foundation

Centralize the contact dialog, rebuild FAQ and mobile navigation with native semantics, add skip and focus behavior, fix target sizes and contrast, and remove per-scroll React rerenders.

### Stage 3: Content and SEO foundation

Introduce typed service content, rewrite unsafe claims, add unique metadata, expose every service through internal links, and add crawl/schema routes driven by verified configuration.

### Stage 4: Visual redesign

Replace global tokens, typography, homepage sections, service templates, image choices, and motion behavior according to the approved Human Botanical, Trust-first, Living Forest direction.

### Stage 5: Cleanup and polish

Remove proven dead components, update project documentation, run full verification, perform the bounded visual QA cycle, and report any deployment-only requirements such as the production site URL.

## Acceptance Criteria

- Current real contact details and all existing service URLs remain intact.
- The page contains exactly one contact dialog and no hidden focusable duplicate dialogs.
- Dialog, FAQ, and mobile navigation complete their full flows with keyboard only.
- All normal text passes WCAG AA contrast.
- No horizontal overflow occurs at 320 px.
- All eight service pages are directly discoverable from the homepage.
- Each service page has unique metadata and structured content without raw HTML injection.
- Medical copy contains no guaranteed or absolute outcomes.
- Sitemap, robots, and structured data derive from verified configuration.
- The production dependency audit contains no known production vulnerability, or any unresolved advisory is explicitly reported as a blocker.
- Lint, typecheck, tests, browser tests, and production build pass in fresh verification runs.
- Final rendered pages match the approved Human Botanical, Trust-first, Living Forest system with calm motion.
