import { afterEach, describe, expect, it, vi } from "vitest";

const originalUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalUrl) process.env.NEXT_PUBLIC_SITE_URL = originalUrl;
  else delete process.env.NEXT_PUBLIC_SITE_URL;
  vi.resetModules();
});

describe("SEO route functions", () => {
  it("lists the homepage and eight services for a configured origin", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://kineto-one.example";
    const { default: sitemap } = await import("@/app/sitemap");
    const entries = sitemap();
    expect(entries).toHaveLength(9);
    expect(entries.map((entry) => entry.url)).toContain(
      "https://kineto-one.example/services/massage",
    );
  });

  it("does not emit invented absolute URLs without an origin", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    const { default: sitemap } = await import("@/app/sitemap");
    expect(sitemap()).toEqual([]);
  });

  it("references the sitemap only when an origin exists", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://kineto-one.example";
    const { default: robots } = await import("@/app/robots");
    expect(robots()).toMatchObject({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://kineto-one.example/sitemap.xml",
      host: "https://kineto-one.example",
    });
  });
});
