import Link from "next/link";
import { getAllServices } from "@/data/services";

export default function Services() {
  const services = getAllServices();
  return (
    <section id="services" className="bg-white-sheet py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <p className="text-sm font-medium uppercase tracking-widest text-sage-dust">
          Направления
        </p>
        <h2 className="mt-5 max-w-[800px] text-3xl font-semibold leading-tight tracking-tight text-forest-ink md:text-5xl">
          Восемь направлений реабилитации и ухода
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col rounded-2xl border border-forest-ink/10 bg-mist-paper p-7 transition-all duration-200 hover:-translate-y-1 hover:border-chartreuse-sprig hover:shadow-lg"
            >
              <span className="text-sm font-medium uppercase tracking-widest text-sage-dust">
                {service.category}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-forest-ink">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-sage-dust">
                {service.subtitle}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-forest-ink">
                Подробнее
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-2">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
