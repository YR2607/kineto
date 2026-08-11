import { backPain } from "./services/back-pain";
import { sportsRehab } from "./services/sports-rehab";
import { postOp } from "./services/post-op";
import { neurology } from "./services/neurology";
import { joints } from "./services/joints";
import { kinesiotherapy } from "./services/kinesiotherapy";
import { massage } from "./services/massage";
import { manualTherapy } from "./services/manual-therapy";

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  content: string; // HTML or Markdown
}

export const servicesData: Record<string, ServiceData> = {
  [backPain.slug]: backPain,
  [sportsRehab.slug]: sportsRehab,
  [postOp.slug]: postOp,
  [neurology.slug]: neurology,
  [joints.slug]: joints,
  [kinesiotherapy.slug]: kinesiotherapy,
  [massage.slug]: massage,
  [manualTherapy.slug]: manualTherapy,
};

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData[slug];
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(servicesData);
}