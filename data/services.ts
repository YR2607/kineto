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
