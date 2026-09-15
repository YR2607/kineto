export const siteConfig = {
  name: "Kineto One",
  description:
    "Студия физической реабилитации в Кишинёве. Восстановление после травм, операций и боли: спина, суставы, спортивные травмы, неврореабилитация. Индивидуальный план и контроль прогресса.",
  locale: "ru_MD",
  language: "ru",
  phoneDisplay: "0697 15 536",
  phoneInternational: "+37369715536",
  address: {
    street: "str. I. Creangă 1/2",
    city: "Chișinău",
    country: "MD",
  },
  channels: {
    telegram: "https://t.me/+37369715536",
    whatsapp: "https://wa.me/37369715536",
    viber: "viber://chat?number=%2B37369715536",
    instagram: "https://www.instagram.com/kineto_one/",
    facebook: "https://www.facebook.com/profile.php?id=61574692887644",
  },
} as const;

export function getSiteUrl(): URL | null {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const deploymentHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  const value = configured ?? (deploymentHost ? `https://${deploymentHost}` : null);
  if (!value) return null;
  const url = new URL(value);
  return new URL(url.origin);
}
