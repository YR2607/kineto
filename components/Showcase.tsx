import Reveal from "./Reveal";

const works = [
  {
    title: "Спортивное\nвосстановление",
    description:
      "Кинетотерапия после травм. Поэтапное возвращение амплитуды, снятие блоков и возвращение уверенности в движении.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1800&auto=format&fit=crop",
    tag: "01",
    duration: "8–12 сеансов",
  },
  {
    title: "Хронический\nстресс",
    description:
      "Глубокая работа с зажимами шеи и спины. Миофасциальный релиз для полного обнуления нервной системы.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1800&auto=format&fit=crop",
    tag: "02",
    duration: "6–10 сеансов",
  },
  {
    title: "Осознанное\nтело",
    description:
      "Профилактический массаж и коррекция осанки. Инвестиция в то, как вы будете чувствовать себя через 10 лет.",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1800&auto=format&fit=crop",
    tag: "03",
    duration: "Регулярно",
  },
  {
    title: "После\nродов",
    description:
      "Восстановление мышц тазового дна и брюшной стенки. Мягкая техника без боли и спешки — тело само задаёт темп.",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1800&auto=format&fit=crop",
    tag: "04",
    duration: "10–14 сеансов",
  },
  {
    title: "Мигрень\nи шея",
    description:
      "Краниосакральная терапия и работа с триггерными точками. Снижение частоты и интенсивности головных болей.",
    image:
      "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=1800&auto=format&fit=crop",
    tag: "05",
    duration: "6–8 сеансов",
  },
  {
    title: "Суставная\nмобильность",
    description:
      "Артикуляция, растяжка и ФНМ-техники. Увеличение диапазона движения и устранение суставных ограничений.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1800&auto=format&fit=crop",
    tag: "06",
    duration: "8–12 сеансов",
  },
];

const STICKY_OFFSET = 80;
const GROUP_SIZE = 3;

type Work = (typeof works)[number];

export default function Showcase() {
  const groups: Work[][] = [];
  for (let g = 0; g < works.length; g += GROUP_SIZE) {
    groups.push(works.slice(g, g + GROUP_SIZE));
  }

  return (
    <section id="work" className="relative w-full bg-white-sheet">
      {/* Header */}
      <div className="px-6 md:px-16 lg:px-24 py-6 md:py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-forest-ink text-[11px] md:text-[12px] font-medium uppercase tracking-[0.2em]">
            Избранная практика
          </h2>
          <span className="text-sage-dust text-[11px] md:text-[12px] tracking-wide">
            {works.length} направлений
          </span>
        </div>
      </div>

      {/* Works — split into groups, each group stacks independently */}
      {groups.map((group, gi) => (
        <div key={gi} className="flex flex-col">
          {group.map((work, i) => (
            <article
              key={`${gi}-${i}`}
              className="group md:sticky bg-white-sheet overflow-hidden border-t border-forest-ink/8"
              style={{ top: `${i * STICKY_OFFSET}px`, zIndex: gi * GROUP_SIZE + i + 1 }}
            >
              <div className="relative w-full min-h-[55vh] md:min-h-[calc(100vh-80px)] flex items-center">
                {/* Content — text left, image right */}
                <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-10 md:py-16 lg:py-20">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 lg:gap-12">

                    {/* Text — left side (desktop), below image (mobile) */}
                    <div className="order-2 md:order-1 flex flex-col justify-center gap-4 md:gap-6 md:pr-8 lg:pr-12 md:w-[42%] lg:w-[38%] shrink-0">
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] md:text-[14px] font-medium text-forest-ink/40 tabular-nums">
                          {work.tag}
                        </span>
                        <span className="h-px w-8 bg-forest-ink/20" />
                        <span className="text-[12px] md:text-[13px] text-sage-dust tracking-wide">
                          {work.duration}
                        </span>
                      </div>

                      <h3 className="text-forest-ink text-[10vw] md:text-[4vw] lg:text-[3.5vw] font-semibold leading-[0.95] tracking-[-0.04em] whitespace-pre-line group-hover:text-sage-dust transition-colors duration-700">
                        {work.title}
                      </h3>

                      <p className="text-sage-dust text-[15px] md:text-[17px] lg:text-[19px] leading-[1.55] max-w-md">
                        {work.description}
                      </p>

                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-forest-ink text-[14px] md:text-[15px] font-medium border-b border-forest-ink/25 hover:border-forest-ink hover:gap-3 pb-1 transition-all duration-300 w-fit"
                      >
                        Подробнее
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>

                    {/* Image — right side (desktop), full-width card (mobile) */}
                    <div className="order-1 md:order-2 relative md:flex-1 min-w-0">
                      <div className="relative w-full aspect-[16/10] md:aspect-[4/3] lg:aspect-[4/3] overflow-hidden rounded-2xl md:rounded-l-3xl">
                        <img
                          src={work.image}
                          alt={work.title}
                          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ))}
    </section>
  );
}
