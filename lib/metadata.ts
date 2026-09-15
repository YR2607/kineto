import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/config/site";
import type { ServiceData } from "@/data/services";

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
