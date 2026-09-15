import Link from "next/link";
import { servicesData, type ServiceSlug } from "@/data/services";

export default function RelatedServices({ slugs }: { slugs: ServiceSlug[] }) {
  return (
    <section
      aria-labelledby="related-services-title"
      className="bg-white-sheet py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-16">
        <h2
          id="related-services-title"
          className="text-2xl font-semibold leading-tight tracking-tight text-forest-ink md:text-3xl"
        >
          Другие направления
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {slugs.map((slug) => {
            const service = servicesData[slug];
            return (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="group flex min-h-14 items-center rounded-xl border border-forest-ink/10 bg-mist-paper px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-chartreuse-sprig hover:shadow-sm"
              >
                <span className="font-medium text-forest-ink">
                  {service.shortTitle}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto transition-transform duration-150 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
