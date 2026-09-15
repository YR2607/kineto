const facts = [
  { label: "Студия", value: "Kineto One" },
  { label: "Город", value: "Chișinău" },
  { label: "Направлений", value: "8" },
  { label: "Каналов связи", value: "5" },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="О студии"
      className="border-y border-forest-ink/10 bg-white-sheet"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-px px-6 py-10 md:grid-cols-4 md:px-16">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1 md:px-6">
            <span className="text-sm font-medium uppercase tracking-widest text-sage-dust">
              {fact.label}
            </span>
            <span className="text-2xl font-semibold text-forest-ink md:text-3xl">
              {fact.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
