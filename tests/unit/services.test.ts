import { describe, expect, it } from "vitest";
import { getAllServices, getAllServiceSlugs, servicesData } from "@/data/services";

const expectedSlugs = [
  "back-pain",
  "sports-rehab",
  "post-op",
  "neurology",
  "joints",
  "kinesiotherapy",
  "massage",
  "manual-therapy",
] as const;

const forbiddenClaims = [
  /гарант/iu,
  /навсегда/iu,
  /абсолютно безопас/iu,
  /устран(?:ить|яем) причин/iu,
  /точн(?:ая|ой) диагностик/iu,
];

describe("service registry", () => {
  it("contains every preserved slug exactly once", () => {
    expect(getAllServiceSlugs()).toEqual(expectedSlugs);
    expect(new Set(getAllServiceSlugs()).size).toBe(expectedSlugs.length);
  });

  it("contains unique metadata", () => {
    const services = getAllServices();
    expect(new Set(services.map((service) => service.metaTitle)).size).toBe(
      services.length,
    );
    expect(
      new Set(services.map((service) => service.metaDescription)).size,
    ).toBe(services.length);
    for (const service of services) {
      expect(service.metaTitle.length).toBeLessThanOrEqual(60);
      expect(service.metaDescription.length).toBeLessThanOrEqual(155);
      expect(service.heroAlt.length).toBeGreaterThanOrEqual(10);
    }
  });

  it("contains only valid related-service references", () => {
    for (const service of getAllServices()) {
      expect(service.relatedSlugs).not.toContain(service.slug);
      for (const relatedSlug of service.relatedSlugs) {
        expect(servicesData[relatedSlug]).toBeDefined();
      }
    }
  });

  it("contains no absolute medical outcome claims", () => {
    const copy = JSON.stringify(getAllServices());
    for (const claim of forbiddenClaims) expect(copy).not.toMatch(claim);
  });
});
