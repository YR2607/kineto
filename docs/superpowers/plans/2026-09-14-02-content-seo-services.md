# Content, SEO, and Service Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace opaque medical HTML with conservative typed content and make every service page uniquely discoverable, indexable, and internally linked.

**Architecture:** A typed service registry becomes the single source for routes, metadata, sitemap entries, related-service links, and rendered page sections. Site-wide metadata and JSON-LD derive only from verified configuration; canonical URLs and sitemap entries are emitted only when a production origin is configured.

**Tech Stack:** Next.js 16.3.5 Metadata API, React 19 Server Components, TypeScript 5, Vitest 5, Playwright 1.63.

## Global Constraints

- Preserve `/` and all eight existing `/services/[slug]` URLs.
- Present Kineto One as a studio, not an unverified clinic or single-person practice.
- Preserve the real phone, address, Telegram, WhatsApp, Viber, Instagram, and Facebook values already in use.
- Do not fabricate reviews, ratings, certifications, opening hours, staff members, or medical outcomes.
- Remove absolute outcome language including `гарантируем`, `навсегда`, `абсолютно безопасно`, and `устраняем причину`.
- Use `NEXT_PUBLIC_SITE_URL` or a verified deployment URL; never hardcode an invented production domain.
- Render critical metadata and structured data in initial server HTML.
- Keep all service content in Russian and all code identifiers in English.
- Preserve unrelated uncommitted work and stage only files named by the current task.

---

## File Structure

- `data/services.ts`: service types, registry, lookup, and relationship validation.
- `data/services/*.ts`: conservative structured content for each preserved service slug.
- `config/site.ts`: verified studio identity and optional production origin.
- `lib/metadata.ts`: reusable root and service metadata builders.
- `components/JsonLd.tsx`: safely serialized server-rendered JSON-LD.
- `components/Breadcrumbs.tsx`: visible and semantic service breadcrumbs.
- `components/ServiceArticle.tsx`: deterministic typed-section renderer.
- `components/RelatedServices.tsx`: prevents dead-end service pages.
- `app/layout.tsx`: root metadata and organization JSON-LD.
- `app/services/[slug]/page.tsx`: unique metadata and semantic service page.
- `app/robots.ts`: crawler policy with conditional sitemap reference.
- `app/sitemap.ts`: homepage plus all eight service pages when an origin is configured.
- `tests/unit/services.test.ts`: registry, relationship, metadata, and copy policy tests.
- `tests/unit/seo-routes.test.ts`: sitemap, robots, and URL-resolution tests.
- `tests/e2e/seo.spec.ts`: initial-HTML and route verification.

### Task 1: Define the typed service registry and failing policy tests

**Files:**
- Modify: `data/services.ts:1-35`
- Create: `tests/unit/services.test.ts`

**Interfaces:**
- Produces: `ServiceSlug`, `ServiceSection`, `ServiceData`, `servicesData`, `getServiceBySlug`, `getAllServices`, and `getAllServiceSlugs`.
- Consumers: metadata, sitemap, homepage service grid, service pages, and related links.

- [ ] **Step 1: Write the failing registry tests**

Create `tests/unit/services.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { getAllServices, getAllServiceSlugs, servicesData } from "@/data/services";

const expectedSlugs = [
  "back-pain",
  "sports-rehab",
  "post-op",
  "neurology",
  "joints",
  "kinesiotherapy",
  "massage",
  "manual-therapy",
] as const;

const forbiddenClaims = [
  /гарант/iu,
  /навсегда/iu,
  /абсолютно безопас/iu,
  /устран(?:ить|яем) причин/iu,
  /точн(?:ая|ой) диагностик/iu,
];

describe("service registry", () => {
  it("contains every preserved slug exactly once", () => {
    expect(getAllServiceSlugs()).toEqual(expectedSlugs);
    expect(new Set(getAllServiceSlugs()).size).toBe(expectedSlugs.length);
  });

  it("contains unique metadata", () => {
    const services = getAllServices();
    expect(new Set(services.map((service) => service.metaTitle)).size).toBe(services.length);
    expect(new Set(services.map((service) => service.metaDescription)).size).toBe(services.length);
    for (const service of services) {
      expect(service.metaTitle.length).toBeLessThanOrEqual(60);
      expect(service.metaDescription.length).toBeLessThanOrEqual(155);
      expect(service.heroAlt.length).toBeGreaterThanOrEqual(10);
    }
  });

  it("contains only valid related-service references", () => {
    for (const service of getAllServices()) {
      expect(service.relatedSlugs).not.toContain(service.slug);
      for (const relatedSlug of service.relatedSlugs) expect(servicesData[relatedSlug]).toBeDefined();
    }
  });

  it("contains no absolute medical outcome claims", () => {
    const copy = JSON.stringify(getAllServices());
    for (const claim of forbiddenClaims) expect(copy).not.toMatch(claim);
  });
});
```

- [ ] **Step 2: Run the tests and verify they fail on the old HTML model**

```bash
npm run test -- tests/unit/services.test.ts
```

Expected: FAIL because `getAllServices`, metadata fields, related slugs, and structured sections do not exist.

- [ ] **Step 3: Replace the registry types and exports**

Replace `data/services.ts` with:

```ts
import { backPain } from "./services/back-pain";
import { sportsRehab } from "./services/sports-rehab";
import { postOp } from "./services/post-op";
import { neurology } from "./services/neurology";
import { joints } from "./services/joints";
import { kinesiotherapy } from "./services/kinesiotherapy";
import { massage } from "./services/massage";
import { manualTherapy } from "./services/manual-therapy";

export const serviceSlugs = [
  "back-pain",
  "sports-rehab",
  "post-op",
  "neurology",
  "joints",
  "kinesiotherapy",
  "massage",
  "manual-therapy",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export interface ServiceSection {
  heading: string;
  paragraphs: string[];
  items?: string[];
}

export interface ServiceData {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  heroImage: string;
  heroAlt: string;
  sections: ServiceSection[];
  relatedSlugs: ServiceSlug[];
}

const serviceList: ServiceData[] = [
  backPain,
  sportsRehab,
  postOp,
  neurology,
  joints,
  kinesiotherapy,
  massage,
  manualTherapy,
];

export const servicesData = Object.fromEntries(
  serviceList.map((service) => [service.slug, service]),
) as Record<ServiceSlug, ServiceData>;

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData[slug as ServiceSlug];
}

export function getAllServices(): ServiceData[] {
  return serviceSlugs.map((slug) => servicesData[slug]);
}

export function getAllServiceSlugs(): ServiceSlug[] {
  return [...serviceSlugs];
}
```

The eight content modules will fail TypeScript until Task 2 completes. Do not weaken `ServiceData` or add optional fields to hide those failures.

### Task 2: Migrate all eight services to conservative structured content

**Files:**
- Modify: `data/services/back-pain.ts`
- Modify: `data/services/sports-rehab.ts`
- Modify: `data/services/post-op.ts`
- Modify: `data/services/neurology.ts`
- Modify: `data/services/joints.ts`
- Modify: `data/services/kinesiotherapy.ts`
- Modify: `data/services/massage.ts`
- Modify: `data/services/manual-therapy.ts`

**Interfaces:**
- Consumes: `ServiceData` from Task 1.
- Produces: eight complete records with metadata, structured sections, and related links.

- [ ] **Step 1: Replace `back-pain.ts`**

```ts
import type { ServiceData } from "../services";

export const backPain: ServiceData = {
  slug: "back-pain",
  title: "Реабилитация при боли в спине и шее",
  shortTitle: "Спина и шея",
  subtitle: "Оценка движения и индивидуальная программа для постепенного уменьшения ограничений и возвращения к привычной активности.",
  metaTitle: "Реабилитация при боли в спине | Kineto One",
  metaDescription: "Физическая реабилитация при боли и скованности в спине и шее в Кишинёве. Оценка состояния и индивидуальная программа нагрузки.",
  category: "Боль и ограничения",
  heroImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1800&auto=format&fit=crop",
  heroAlt: "Спокойное упражнение на подвижность спины под контролем специалиста",
  sections: [
    {
      heading: "Когда стоит обратиться",
      paragraphs: [
        "Боль, скованность и ограничение движения в спине или шее могут мешать работе, отдыху и обычной физической активности. Причины и допустимая нагрузка различаются, поэтому работа начинается с оценки текущего состояния.",
        "Если боль появилась внезапно, усиливается или сопровождается онемением, слабостью, температурой либо другими тревожными симптомами, сначала обратитесь за медицинской помощью.",
      ],
    },
    {
      heading: "Как строится программа",
      paragraphs: [
        "На первой встрече специалист уточняет историю симптомов, оценивает доступный объём движения и обсуждает цели. После этого подбирается последовательность упражнений и ручных техник в пределах профессиональной компетенции студии.",
      ],
      items: [
        "постепенное восстановление подвижности",
        "упражнения для контроля и выносливости мышц",
        "рекомендации для самостоятельной практики",
        "регулярная оценка реакции на нагрузку",
      ],
    },
    {
      heading: "Чего ожидать от процесса",
      paragraphs: [
        "Темп зависит от причины ограничений, длительности симптомов, общего состояния и регулярности занятий. Программа меняется по обратной связи и не заменяет диагностику или лечение у врача, когда они необходимы.",
      ],
    },
  ],
  relatedSlugs: ["kinesiotherapy", "manual-therapy", "massage"],
};
```

- [ ] **Step 2: Replace `sports-rehab.ts`**

```ts
import type { ServiceData } from "../services";

export const sportsRehab: ServiceData = {
  slug: "sports-rehab",
  title: "Спортивная реабилитация",
  shortTitle: "Спорт",
  subtitle: "Постепенное восстановление силы, координации и переносимости нагрузки после травмы, операции или перерыва.",
  metaTitle: "Спортивная реабилитация в Кишинёве | Kineto One",
  metaDescription: "Индивидуальное восстановление после спортивных травм и операций: движение, сила, координация и постепенный возврат к тренировкам.",
  category: "Возвращение к активности",
  heroImage: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1800&auto=format&fit=crop",
  heroAlt: "Спортсмен выполняет контролируемое упражнение для восстановления движения",
  sections: [
    {
      heading: "Возвращение к нагрузке без спешки",
      paragraphs: [
        "После травмы важно восстановить не только комфорт в покое, но и способность выполнять движения, характерные для вашего спорта. Сроки зависят от типа повреждения, этапа заживления и рекомендаций лечащего врача.",
      ],
    },
    {
      heading: "Что входит в работу",
      paragraphs: [
        "Программа строится от базовых движений к более сложным спортивным задачам. Нагрузка увеличивается только после оценки реакции на предыдущий этап.",
      ],
      items: [
        "восстановление доступной амплитуды движения",
        "развитие силы и мышечной выносливости",
        "тренировка равновесия и координации",
        "постепенное возвращение бега, прыжков и смены направления",
      ],
    },
    {
      heading: "Совместная работа",
      paragraphs: [
        "После операции или серьёзной травмы программа учитывает медицинские ограничения и протокол восстановления. При необходимости студия просит согласовать нагрузку с врачом или другим профильным специалистом.",
      ],
    },
  ],
  relatedSlugs: ["joints", "post-op", "kinesiotherapy"],
};
```

- [ ] **Step 3: Replace `post-op.ts`**

```ts
import type { ServiceData } from "../services";

export const postOp: ServiceData = {
  slug: "post-op",
  title: "Реабилитация после операций",
  shortTitle: "После операций",
  subtitle: "Дозированная физическая нагрузка с учётом этапа заживления, рекомендаций врача и ваших повседневных задач.",
  metaTitle: "Реабилитация после операций | Kineto One",
  metaDescription: "Физическая реабилитация после ортопедических операций в Кишинёве. Постепенное восстановление движения, силы и бытовой активности.",
  category: "После лечения",
  heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1800&auto=format&fit=crop",
  heroAlt: "Специалист обсуждает с клиентом план восстановления после операции",
  sections: [
    {
      heading: "Когда начинать восстановление",
      paragraphs: [
        "Начало и объём реабилитации определяются видом операции, состоянием тканей и рекомендациями хирурга. Перед первой встречей подготовьте выписку и ограничения по нагрузке, если они были назначены.",
      ],
    },
    {
      heading: "Последовательность работы",
      paragraphs: [
        "Программа начинается с задач, доступных на текущем этапе, и постепенно усложняется. Специалист отслеживает переносимость нагрузки и корректирует упражнения.",
      ],
      items: [
        "безопасное бытовое движение в рамках назначенных ограничений",
        "постепенное восстановление амплитуды",
        "укрепление мышц и развитие выносливости",
        "возвращение к работе, прогулкам и выбранной активности",
      ],
    },
    {
      heading: "Взаимодействие с врачом",
      paragraphs: [
        "Физическая реабилитация дополняет медицинское наблюдение и не заменяет его. При изменении симптомов или сомнениях в допустимой нагрузке требуется консультация лечащего врача.",
      ],
    },
  ],
  relatedSlugs: ["joints", "sports-rehab", "kinesiotherapy"],
};
```

- [ ] **Step 4: Replace `neurology.ts`**

```ts
import type { ServiceData } from "../services";

export const neurology: ServiceData = {
  slug: "neurology",
  title: "Неврологическая реабилитация",
  shortTitle: "Неврология",
  subtitle: "Индивидуальная работа над движением, равновесием и повседневной самостоятельностью с учётом текущих возможностей.",
  metaTitle: "Неврологическая реабилитация | Kineto One",
  metaDescription: "Физическая неврологическая реабилитация в Кишинёве: движение, равновесие, координация и бытовые навыки по индивидуальной программе.",
  category: "Неврологические состояния",
  heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1800&auto=format&fit=crop",
  heroAlt: "Специалист поддерживает клиента во время упражнения на равновесие",
  sections: [
    {
      heading: "Цели неврологической реабилитации",
      paragraphs: [
        "После инсульта, черепно-мозговой травмы или при других неврологических состояниях возможности и темп восстановления различаются. Работа строится вокруг конкретных функций, которые важны человеку в повседневной жизни.",
      ],
    },
    {
      heading: "Над чем можно работать",
      paragraphs: [
        "Задачи выбираются после оценки и пересматриваются по мере изменений. Приоритетом остаются безопасность и практическая применимость движений.",
      ],
      items: [
        "контроль положения тела и перенос веса",
        "равновесие в положении сидя и стоя",
        "элементы ходьбы и перемещения",
        "координация и функциональные бытовые действия",
      ],
    },
    {
      heading: "Участие близких и медицинской команды",
      paragraphs: [
        "По согласованию в процесс могут включаться близкие человека. Программа учитывает рекомендации врача и других специалистов, особенно при изменении состояния или лекарственной терапии.",
      ],
    },
  ],
  relatedSlugs: ["kinesiotherapy", "post-op", "joints"],
};
```

- [ ] **Step 5: Replace `joints.ts`**

```ts
import type { ServiceData } from "../services";

export const joints: ServiceData = {
  slug: "joints",
  title: "Реабилитация суставов",
  shortTitle: "Суставы",
  subtitle: "Работа над подвижностью, силой и устойчивостью суставов после травм, операций или длительного ограничения активности.",
  metaTitle: "Реабилитация суставов в Кишинёве | Kineto One",
  metaDescription: "Индивидуальная реабилитация плеча, колена, тазобедренного и голеностопного суставов: движение, сила и контроль нагрузки.",
  category: "Боль и ограничения",
  heroImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1800&auto=format&fit=crop",
  heroAlt: "Контролируемое упражнение для восстановления подвижности коленного сустава",
  sections: [
    {
      heading: "Какие задачи решает программа",
      paragraphs: [
        "Ограничение движения, чувство нестабильности и снижение силы могут возникать после травмы, операции или периода низкой активности. Перед нагрузкой важно понять текущее состояние и медицинские ограничения.",
      ],
    },
    {
      heading: "От подвижности к функции",
      paragraphs: [
        "Работа идёт последовательно и привязана к действиям, которые нужно вернуть: ходьбе, подъёму по лестнице, работе руками или спортивным движениям.",
      ],
      items: [
        "доступная и контролируемая амплитуда",
        "сила окружающих сустав мышц",
        "координация и равновесие",
        "переносимость бытовой или спортивной нагрузки",
      ],
    },
    {
      heading: "Контроль реакции",
      paragraphs: [
        "Интенсивность меняется по самочувствию и объективным признакам выполнения. Выраженная боль, отёк или ухудшение функции требуют пересмотра нагрузки и, при необходимости, консультации врача.",
      ],
    },
  ],
  relatedSlugs: ["sports-rehab", "post-op", "manual-therapy"],
};
```

- [ ] **Step 6: Replace `kinesiotherapy.ts`**

```ts
import type { ServiceData } from "../services";

export const kinesiotherapy: ServiceData = {
  slug: "kinesiotherapy",
  title: "Кинезитерапия",
  shortTitle: "Кинезитерапия",
  subtitle: "Индивидуально подобранные упражнения для развития движения, силы, координации и уверенности в повседневной активности.",
  metaTitle: "Кинезитерапия в Кишинёве | Kineto One",
  metaDescription: "Индивидуальные занятия кинезитерапией в Кишинёве: оценка движения, дозированная нагрузка и постепенное развитие функций тела.",
  category: "Движение и профилактика",
  heroImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1800&auto=format&fit=crop",
  heroAlt: "Клиент выполняет индивидуально подобранное упражнение на силу и контроль",
  sections: [
    {
      heading: "Что такое кинезитерапия",
      paragraphs: [
        "Кинезитерапия использует движение и дозированную физическую нагрузку как часть реабилитационного процесса. Упражнения выбираются по текущим возможностям, целям и ограничениям человека.",
      ],
    },
    {
      heading: "Как проходит занятие",
      paragraphs: [
        "Сначала специалист оценивает базовые движения и обсуждает задачи. На занятии отрабатывается небольшое количество упражнений с понятными критериями выполнения.",
      ],
      items: [
        "упражнения с собственным весом",
        "работа с эспандерами и небольшим сопротивлением",
        "задачи на координацию и равновесие",
        "домашняя практика в согласованном объёме",
      ],
    },
    {
      heading: "Как меняется программа",
      paragraphs: [
        "Нагрузка увеличивается постепенно, когда движение выполняется уверенно и без нежелательной реакции. При медицинских ограничениях программа согласуется с рекомендациями профильного врача.",
      ],
    },
  ],
  relatedSlugs: ["back-pain", "joints", "sports-rehab"],
};
```

- [ ] **Step 7: Replace `massage.ts`**

```ts
import type { ServiceData } from "../services";

export const massage: ServiceData = {
  slug: "massage",
  title: "Лечебный массаж",
  shortTitle: "Массаж",
  subtitle: "Ручная работа с мышечным напряжением как самостоятельная услуга или дополнение к программе активного восстановления.",
  metaTitle: "Лечебный массаж в Кишинёве | Kineto One",
  metaDescription: "Лечебный массаж и работа с мышечным напряжением в Кишинёве. Индивидуальный выбор техник с учётом состояния и целей.",
  category: "Восстановление и расслабление",
  heroImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1800&auto=format&fit=crop",
  heroAlt: "Специалист выполняет массаж мышц спины в спокойной обстановке",
  sections: [
    {
      heading: "Когда может подойти массаж",
      paragraphs: [
        "Массаж может использоваться при мышечном напряжении, ощущении усталости или как часть комплексной реабилитационной программы. Перед сеансом специалист уточняет состояние и возможные противопоказания.",
      ],
    },
    {
      heading: "Как выбираются техники",
      paragraphs: [
        "Интенсивность и область работы зависят от цели, чувствительности тканей и реакции человека. Сеанс не должен требовать терпеть выраженную боль.",
      ],
      items: [
        "работа с локальным мышечным напряжением",
        "мягкие миофасциальные техники",
        "подготовка к активным упражнениям",
        "восстановительный или расслабляющий формат",
      ],
    },
    {
      heading: "Массаж и активное восстановление",
      paragraphs: [
        "Если ограничения связаны не только с напряжением, массаж может дополняться упражнениями. Специалист объяснит, когда пассивной работы достаточно, а когда полезно добавить активную практику.",
      ],
    },
  ],
  relatedSlugs: ["back-pain", "manual-therapy", "kinesiotherapy"],
};
```

- [ ] **Step 8: Replace `manual-therapy.ts`**

```ts
import type { ServiceData } from "../services";

export const manualTherapy: ServiceData = {
  slug: "manual-therapy",
  title: "Мануальная терапия",
  shortTitle: "Мануальные техники",
  subtitle: "Мягкие ручные техники для работы с подвижностью и комфортом движения в рамках индивидуальной программы.",
  metaTitle: "Мануальная терапия в Кишинёве | Kineto One",
  metaDescription: "Мягкие мануальные техники в Кишинёве для работы с подвижностью суставов и комфортом движения в индивидуальной программе.",
  category: "Боль и ограничения",
  heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1800&auto=format&fit=crop",
  heroAlt: "Специалист оценивает движение плечевого сустава перед ручной техникой",
  sections: [
    {
      heading: "Роль мануальных техник",
      paragraphs: [
        "Ручные техники могут использоваться для временного улучшения комфорта и доступного движения. Их необходимость определяется после оценки и обсуждения целей.",
      ],
    },
    {
      heading: "Как проходит работа",
      paragraphs: [
        "Специалист выбирает мягкую технику и контролирует реакцию во время сеанса. Подход не строится вокруг резких манипуляций и не заменяет медицинское обследование при тревожных симптомах.",
      ],
      items: [
        "мягкая мобилизация суставов",
        "работа с окружающими мягкими тканями",
        "движение в комфортной амплитуде",
        "проверка изменений после техники",
      ],
    },
    {
      heading: "Закрепление результата",
      paragraphs: [
        "Когда это уместно, ручная работа дополняется упражнениями. Активная практика помогает использовать доступное движение в повседневных задачах и постепенно развивать нагрузку.",
      ],
    },
  ],
  relatedSlugs: ["back-pain", "joints", "massage"],
};
```

- [ ] **Step 9: Run the registry tests and commit the content model**

```bash
npm run test -- tests/unit/services.test.ts
npm run typecheck
npm run lint
```

Expected: all four registry tests pass; typecheck and lint pass.

```bash
git add data/services.ts data/services tests/unit/services.test.ts
git commit -m "refactor: structure conservative service content"
```

### Task 3: Add verified site configuration and metadata builders

**Files:**
- Create: `config/site.ts`
- Create: `lib/metadata.ts`
- Modify: `tests/unit/services.test.ts`
- Modify: `app/layout.tsx:1-37`
- Modify: `app/services/[slug]/page.tsx:1-84`

**Interfaces:**
- Produces: `siteConfig`, `getSiteUrl()`, `buildRootMetadata()`, and `buildServiceMetadata(service)`.
- Consumes: `ServiceData` and environment variables.

- [ ] **Step 1: Add failing metadata tests**

Append to `tests/unit/services.test.ts`:

```ts
import { buildServiceMetadata } from "@/lib/metadata";

describe("service metadata", () => {
  it("uses the service title and description", () => {
    const service = servicesData["back-pain"];
    const metadata = buildServiceMetadata(service);
    expect(metadata.title).toEqual({ absolute: service.metaTitle });
    expect(metadata.description).toBe(service.metaDescription);
    expect(metadata.openGraph).toMatchObject({
      title: service.metaTitle,
      description: service.metaDescription,
      type: "website",
      locale: "ru_MD",
    });
  });

  it("omits canonical URLs when no verified origin exists", () => {
    const previous = {
      configured: process.env.NEXT_PUBLIC_SITE_URL,
      production: process.env.VERCEL_PROJECT_PRODUCTION_URL,
      deployment: process.env.VERCEL_URL,
    };
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    delete process.env.VERCEL_URL;
    const metadata = buildServiceMetadata(servicesData["massage"]);
    expect(metadata.alternates).toBeUndefined();
    for (const [key, value] of Object.entries({
      NEXT_PUBLIC_SITE_URL: previous.configured,
      VERCEL_PROJECT_PRODUCTION_URL: previous.production,
      VERCEL_URL: previous.deployment,
    })) {
      if (value) process.env[key] = value;
      else delete process.env[key];
    }
  });
});
```

- [ ] **Step 2: Run and confirm the metadata module is missing**

```bash
npm run test -- tests/unit/services.test.ts
```

Expected: FAIL because `lib/metadata.ts` does not exist.

- [ ] **Step 3: Create the verified site configuration**

Create `config/site.ts`:

```ts
export const siteConfig = {
  name: "Kineto One",
  description: "Студия физической реабилитации и массажа в Кишинёве.",
  locale: "ru_MD",
  language: "ru",
  phoneDisplay: "0697 15 536",
  phoneInternational: "+37369715536",
  address: {
    street: "str. I. Creangă 1/2",
    city: "Chișinău",
    country: "MD",
  },
  channels: {
    telegram: "https://t.me/+37369715536",
    whatsapp: "https://wa.me/37369715536",
    viber: "viber://chat?number=%2B37369715536",
    instagram: "https://www.instagram.com/kineto_one/",
    facebook: "https://www.facebook.com/profile.php?id=61574692887644",
  },
} as const;

export function getSiteUrl(): URL | null {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  const value = configured ?? (deploymentHost ? `https://${deploymentHost}` : null);
  if (!value) return null;
  const url = new URL(value);
  return new URL(url.origin);
}
```

- [ ] **Step 4: Create metadata builders**

Create `lib/metadata.ts`:

```ts
import type { Metadata } from "next";
import type { ServiceData } from "@/data/services";
import { getSiteUrl, siteConfig } from "@/config/site";

export function buildRootMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  return {
    ...(siteUrl ? { metadataBase: siteUrl } : {}),
    title: {
      default: "Kineto One | Физическая реабилитация в Кишинёве",
      template: "%s | Kineto One",
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: "Kineto One | Физическая реабилитация в Кишинёве",
      description: siteConfig.description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
  };
}

export function buildServiceMetadata(service: ServiceData): Metadata {
  const siteUrl = getSiteUrl();
  const path = `/services/${service.slug}`;
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    ...(siteUrl ? { alternates: { canonical: new URL(path, siteUrl) } } : {}),
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      ...(siteUrl ? { url: new URL(path, siteUrl) } : {}),
      images: [{ url: service.heroImage, alt: service.heroAlt }],
    },
  };
}
```

- [ ] **Step 5: Connect root and service metadata**

In `app/layout.tsx`:

```ts
import { buildRootMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildRootMetadata();
```

Delete the old inline metadata object.

In `app/services/[slug]/page.tsx`, add:

```ts
import type { Metadata } from "next";
import { buildServiceMetadata } from "@/lib/metadata";

type ServicePageProps = PageProps<"/services/[slug]">;

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return buildServiceMetadata(service);
}
```

Use `ServicePageProps` for the page function and keep `await params`, matching the Next.js 16 generated PageProps contract.

- [ ] **Step 6: Verify and commit**

```bash
npm run test -- tests/unit/services.test.ts
npm run typecheck
npm run lint
npm run build
```

Expected: unique metadata tests pass and all nine routes build successfully.

```bash
git add config/site.ts lib/metadata.ts app/layout.tsx "app/services/[slug]/page.tsx" tests/unit/services.test.ts
git commit -m "feat: add unique service metadata"
```

### Task 4: Add conditional robots and sitemap routes

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `tests/unit/seo-routes.test.ts`

**Interfaces:**
- Consumes: `getSiteUrl()` and `getAllServiceSlugs()`.
- Produces: `robots(): MetadataRoute.Robots` and `sitemap(): MetadataRoute.Sitemap`.

- [ ] **Step 1: Write failing route-function tests**

Create `tests/unit/seo-routes.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from "vitest";

const originalUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalUrl) process.env.NEXT_PUBLIC_SITE_URL = originalUrl;
  else delete process.env.NEXT_PUBLIC_SITE_URL;
  vi.resetModules();
});

describe("SEO route functions", () => {
  it("lists the homepage and eight services for a configured origin", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://kineto-one.example";
    const { default: sitemap } = await import("@/app/sitemap");
    const entries = sitemap();
    expect(entries).toHaveLength(9);
    expect(entries.map((entry) => entry.url)).toContain("https://kineto-one.example/services/massage");
  });

  it("does not emit invented absolute URLs without an origin", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    const { default: sitemap } = await import("@/app/sitemap");
    expect(sitemap()).toEqual([]);
  });

  it("references the sitemap only when an origin exists", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://kineto-one.example";
    const { default: robots } = await import("@/app/robots");
    expect(robots()).toMatchObject({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://kineto-one.example/sitemap.xml",
      host: "https://kineto-one.example",
    });
  });
});
```

- [ ] **Step 2: Run and confirm missing-route failures**

```bash
npm run test -- tests/unit/seo-routes.test.ts
```

Expected: FAIL because `app/robots.ts` and `app/sitemap.ts` do not exist.

- [ ] **Step 3: Implement `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";
import { getAllServiceSlugs } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  const paths = ["/", ...getAllServiceSlugs().map((slug) => `/services/${slug}`)];
  return paths.map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
```

Do not add artificial `lastModified`, `priority`, or `changeFrequency` values.

- [ ] **Step 4: Implement `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteUrl
      ? {
          sitemap: new URL("/sitemap.xml", siteUrl).toString(),
          host: siteUrl.origin,
        }
      : {}),
  };
}
```

- [ ] **Step 5: Verify and commit**

```bash
npm run test -- tests/unit/seo-routes.test.ts
npm run typecheck
npm run lint
npm run build
```

Expected: all three route tests pass; build output includes `/robots.txt` and `/sitemap.xml`.

```bash
git add app/robots.ts app/sitemap.ts tests/unit/seo-routes.test.ts
git commit -m "feat: add verified crawl metadata"
```

### Task 5: Render semantic service content, breadcrumbs, related links, and JSON-LD

**Files:**
- Create: `components/JsonLd.tsx`
- Create: `components/Breadcrumbs.tsx`
- Create: `components/ServiceArticle.tsx`
- Create: `components/RelatedServices.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/services/[slug]/page.tsx`
- Create: `tests/unit/service-page-components.test.tsx`

**Interfaces:**
- `JsonLd` consumes `Record<string, unknown> | Array<Record<string, unknown>>`.
- `ServiceArticle` consumes `sections: ServiceSection[]`.
- `RelatedServices` consumes `slugs: ServiceSlug[]`.
- `Breadcrumbs` consumes the current service title and slug.

- [ ] **Step 1: Write component tests**

Create `tests/unit/service-page-components.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RelatedServices from "@/components/RelatedServices";
import ServiceArticle from "@/components/ServiceArticle";
import { servicesData } from "@/data/services";

describe("service page components", () => {
  it("renders typed content with descending headings", () => {
    render(<ServiceArticle sections={servicesData["back-pain"].sections} />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(3);
    expect(screen.getByText("постепенное восстановление подвижности")).toBeVisible();
  });

  it("renders descriptive related-service destinations", () => {
    render(<RelatedServices slugs={["massage", "kinesiotherapy"]} />);
    expect(screen.getByRole("link", { name: "Массаж" })).toHaveAttribute("href", "/services/massage");
  });

  it("renders valid escaped JSON-LD", () => {
    const { container } = render(<JsonLd data={{ "@context": "https://schema.org", name: "Kineto One <studio>" }} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.textContent).toContain("\\u003cstudio>");
    expect(() => JSON.parse(script?.textContent ?? "")).not.toThrow();
  });

  it("renders visible breadcrumbs", () => {
    render(<Breadcrumbs slug="massage" title="Лечебный массаж" />);
    expect(screen.getByRole("navigation", { name: "Хлебные крошки" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Главная" })).toHaveAttribute("href", "/");
  });
});
```

- [ ] **Step 2: Run and verify missing-component failures**

```bash
npm run test -- tests/unit/service-page-components.test.tsx
```

Expected: FAIL because the four components do not exist.

- [ ] **Step 3: Create the reusable server components**

Create `components/JsonLd.tsx`:

```tsx
interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
```

This is the only permitted `dangerouslySetInnerHTML` boundary; it serializes application-owned structured data and escapes `<`.

Create `components/Breadcrumbs.tsx`:

```tsx
import Link from "next/link";
import type { ServiceSlug } from "@/data/services";

export default function Breadcrumbs({ slug, title }: { slug: ServiceSlug; title: string }) {
  return (
    <nav aria-label="Хлебные крошки" className="breadcrumbs">
      <ol>
        <li><Link href="/">Главная</Link></li>
        <li><Link href="/#services">Услуги</Link></li>
        <li aria-current="page">{title}</li>
      </ol>
    </nav>
  );
}
```

Create `components/ServiceArticle.tsx`:

```tsx
import type { ServiceSection } from "@/data/services";

export default function ServiceArticle({ sections }: { sections: ServiceSection[] }) {
  return (
    <div className="service-article">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.items ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
        </section>
      ))}
    </div>
  );
}
```

Create `components/RelatedServices.tsx`:

```tsx
import Link from "next/link";
import { servicesData, type ServiceSlug } from "@/data/services";

export default function RelatedServices({ slugs }: { slugs: ServiceSlug[] }) {
  return (
    <section aria-labelledby="related-services-title" className="related-services">
      <h2 id="related-services-title">Другие направления</h2>
      <div>
        {slugs.map((slug) => {
          const service = servicesData[slug];
          return <Link key={slug} href={`/services/${slug}`}>{service.shortTitle}</Link>;
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add truthful JSON-LD builders inline with server pages**

In `app/layout.tsx`, inside the provider before `{children}`, render:

```tsx
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    ...(getSiteUrl() ? { url: getSiteUrl()?.toString() } : {}),
    telephone: siteConfig.phoneInternational,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    sameAs: [siteConfig.channels.instagram, siteConfig.channels.facebook],
  }}
/>
```

Import `JsonLd`, `siteConfig`, and `getSiteUrl`. Use `Organization`, not a medical clinic subtype, until legal status is confirmed.

In `app/services/[slug]/page.tsx`, build and render:

```tsx
const siteUrl = getSiteUrl();
const serviceUrl = siteUrl ? new URL(`/services/${service.slug}`, siteUrl).toString() : undefined;
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  description: service.metaDescription,
  ...(serviceUrl ? { url: serviceUrl } : {}),
  provider: { "@type": "Organization", name: siteConfig.name },
  areaServed: { "@type": "City", name: "Chișinău" },
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", ...(siteUrl ? { item: siteUrl.toString() } : {}) },
    { "@type": "ListItem", position: 2, name: service.title, ...(serviceUrl ? { item: serviceUrl } : {}) },
  ],
};
```

Render `<JsonLd data={[serviceSchema, breadcrumbSchema]} />` before the visible page content.

- [ ] **Step 5: Replace the raw service article**

In `app/services/[slug]/page.tsx`, remove the prose `dangerouslySetInnerHTML` block and render:

```tsx
<Breadcrumbs slug={service.slug} title={service.title} />
<section className="service-hero">
  <div>
    <p>Физическая реабилитация в Кишинёве</p>
    <h1>{service.title}</h1>
    <p>{service.subtitle}</p>
  </div>
  <Image src={service.heroImage} alt={service.heroAlt} width={1800} height={1200} sizes="(max-width: 767px) 100vw, 50vw" priority />
</section>
<ServiceArticle sections={service.sections} />
<RelatedServices slugs={service.relatedSlugs} />
```

Keep Navbar, the single `main id="main-content"`, contact CTA, and Footer. Remove `Reveal` from the service template so initial content is never hidden.

- [ ] **Step 6: Verify and commit**

```bash
npm run test -- tests/unit/service-page-components.test.tsx
npm run test
npm run typecheck
npm run lint
npm run build
```

Expected: all component and registry tests pass; no raw service HTML remains; all service routes build.

```bash
git add components/JsonLd.tsx components/Breadcrumbs.tsx components/ServiceArticle.tsx components/RelatedServices.tsx app/layout.tsx "app/services/[slug]/page.tsx" tests/unit/service-page-components.test.tsx
git commit -m "feat: render semantic service pages"
```

### Task 6: Add SEO browser verification

**Files:**
- Create: `tests/e2e/seo.spec.ts`

**Interfaces:**
- Consumes: production build with `NEXT_PUBLIC_SITE_URL=https://kineto-one.example` in Playwright's server environment.
- Produces: route, metadata, initial-HTML, sitemap, robots, and internal-link regression coverage.

- [ ] **Step 1: Set the test-only production origin**

Update `playwright.config.ts` `webServer` object with:

```ts
env: {
  NEXT_PUBLIC_SITE_URL: "https://kineto-one.example",
},
```

This value is test-only and must never be used as a deployed canonical URL.

- [ ] **Step 2: Write the E2E SEO suite**

Create `tests/e2e/seo.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

const services = [
  ["back-pain", "Реабилитация при боли в спине"],
  ["sports-rehab", "Спортивная реабилитация"],
  ["post-op", "Реабилитация после операций"],
  ["neurology", "Неврологическая реабилитация"],
  ["joints", "Реабилитация суставов"],
  ["kinesiotherapy", "Кинезитерапия"],
  ["massage", "Лечебный массаж"],
  ["manual-therapy", "Мануальная терапия"],
] as const;

test("homepage has one h1 and initial server content", async ({ request }) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain("<main");
  expect(html).toContain("Движение");
  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
});

for (const [slug, title] of services) {
  test(`${slug} has unique metadata and semantic content`, async ({ page }) => {
    await page.goto(`/services/${slug}`);
    await expect(page).toHaveTitle(new RegExp(title));
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://kineto-one.example/services/${slug}`);
    await expect(page.getByRole("heading", { level: 1, name: new RegExp(title) })).toHaveCount(1);
    await expect(page.locator('script[type="application/ld+json"]')).not.toHaveCount(0);
  });
}

test("unknown service returns 404", async ({ request }) => {
  expect((await request.get("/services/not-a-service")).status()).toBe(404);
});

test("sitemap contains the homepage and all services", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  expect((xml.match(/<loc>/g) ?? [])).toHaveLength(9);
  for (const [slug] of services) expect(xml).toContain(`https://kineto-one.example/services/${slug}`);
});

test("robots allows crawling and references the configured sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toContain("User-Agent: *");
  expect(text).toContain("Allow: /");
  expect(text).toContain("Sitemap: https://kineto-one.example/sitemap.xml");
});
```

- [ ] **Step 3: Run the complete content and SEO gate**

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
git diff --check
```

Expected: all checks pass; nine sitemap locations and eight unique service titles are verified against the production server.

- [ ] **Step 4: Commit the SEO browser gate**

```bash
git add playwright.config.ts tests/e2e/seo.spec.ts
git commit -m "test: verify service seo routes"
```
