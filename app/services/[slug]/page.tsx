import { notFound } from "next/navigation";
import Image from "next/image";
import { getServiceBySlug, getAllServiceSlugs } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Process from "@/components/Process";

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 bg-white-sheet pt-24 md:pt-32">
        {/* Service Hero */}
        <section className="relative w-full px-6 md:px-16 lg:px-24 py-12 md:py-20 flex flex-col items-center text-center">
          <Reveal type="fade-up" delay={0.1}>
            <span className="inline-block py-1 px-3 rounded-full bg-chartreuse-sprig/50 text-forest-ink text-[12px] md:text-[14px] font-medium tracking-wide uppercase mb-6">
              Направление
            </span>
          </Reveal>
          <Reveal type="fade-up" delay={0.2}>
            <h1 className="text-forest-ink text-[32px] md:text-[6vw] font-semibold leading-[0.95] tracking-tight max-w-[1000px] mb-8">
              {service.title}
            </h1>
          </Reveal>
          <Reveal type="fade-up" delay={0.3}>
            <p className="text-sage-dust text-[16px] md:text-[22px] max-w-[800px] leading-relaxed">
              {service.subtitle}
            </p>
          </Reveal>
        </section>

        {/* Featured Image */}
        <section className="px-6 md:px-16 lg:px-24 w-full">
          <Reveal type="fade-up" delay={0.4}>
            <div className="relative w-full h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,51,41,0.08)]">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </section>

        {/* Article Content */}
        <section className="w-full px-6 md:px-16 lg:px-24 py-16 md:py-32">
          <div className="mx-auto max-w-[800px]">
            <Reveal type="fade-up" delay={0.1}>
              <div 
                className="prose prose-base md:prose-lg prose-p:text-sage-dust prose-headings:text-forest-ink prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-forest-ink prose-a:underline-offset-4 hover:prose-a:text-sage-dust prose-li:text-sage-dust max-w-none prose-h2:mt-12 md:prose-h2:mt-16 prose-h2:mb-6 md:prose-h2:mb-8 prose-h3:mt-8 md:prose-h3:mt-10 prose-h3:mb-4 md:prose-h3:mb-6 prose-strong:text-forest-ink prose-strong:font-semibold prose-ul:my-6 md:prose-ul:my-8 prose-li:my-2 prose-ul:marker:text-chartreuse-sprig"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
            </Reveal>
          </div>
        </section>

        {/* Include Process section to add value and call-to-action */}
        <Process />

      </main>
      <Footer />
    </>
  );
}