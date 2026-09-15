import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";
import { getAllServiceSlugs } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  const paths = [
    "/",
    ...getAllServiceSlugs().map((slug) => `/services/${slug}`),
  ];
  return paths.map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
