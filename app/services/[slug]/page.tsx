import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import RelatedServices from "@/components/RelatedServices";
import ServiceArticle from "@/components/ServiceArticle";
import ContactTrigger from "@/components/contact/ContactTrigger";
import { getSiteUrl, siteConfig } from "@/config/site";
import { getAllServiceSlugs, getServiceBySlug } from "@/data/services";
import { buildServiceMetadata } from "@/lib/metadata";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return buildServiceMetadata(service);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const siteUrl = getSiteUrl();
  const serviceUrl = siteUrl
    ? new URL(`/services/${service.slug}`, siteUrl).toString()
    : undefined;
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        ...(siteUrl ? { item: siteUrl.toString() } : {}),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: service.title,
        ...(serviceUrl ? { item: serviceUrl } : {}),
      },
    ],
  };

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col bg-white-sheet">
        <div className="mx-auto max-w-[1200px] w-full px-6 pt-8 md:px-16">
          <Breadcrumbs title={service.title} />
        </div>
        <section className="mx-auto max-w-[1200px] w-full px-6 py-12 md:px-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-sage-dust">
                {service.category}
              </p>
              <h1 className="mt-5 text-[32px] font-semibold leading-tight tracking-tight text-forest-ink md:text-[48px]">
                {service.title}
              </h1>
              <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-sage-dust">
                {service.subtitle}
              </p>
              <ContactTrigger className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-chartreuse-sprig px-10 text-base font-semibold text-white-sheet shadow-sm transition-all duration-200 hover:bg-vivid-lime hover:shadow-md active:scale-[0.98] sm:w-auto sm:min-w-[200px]">
                Связаться
              </ContactTrigger>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist-paper">
              <Image
                src={service.heroImage}
                alt={service.heroAlt}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1200px] w-full px-6 py-16 md:px-16 md:py-24">
          <ServiceArticle sections={service.sections} />
        </section>
        <RelatedServices slugs={service.relatedSlugs} />
        <section className="bg-mist-paper py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-16">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <h2 className="max-w-[600px] text-2xl font-semibold leading-tight tracking-tight text-forest-ink md:text-3xl">
                Хотите уточнить подходящее направление?
              </h2>
              <ContactTrigger className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-chartreuse-sprig px-10 text-base font-semibold text-white-sheet shadow-sm transition-all duration-200 hover:bg-vivid-lime hover:shadow-md active:scale-[0.98] sm:w-auto sm:min-w-[200px]">
                Связаться
              </ContactTrigger>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
