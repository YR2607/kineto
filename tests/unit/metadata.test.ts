import { describe, expect, it } from "vitest";
import { buildServiceMetadata } from "@/lib/metadata";
import { servicesData } from "@/data/services";

describe("service metadata", () => {
  it("uses the unique service title and description", () => {
    const service = servicesData["back-pain"];
    const metadata = buildServiceMetadata(service);
    expect(metadata.title).toEqual({ absolute: service.metaTitle });
    expect(metadata.description).toBe(service.metaDescription);
    expect(metadata.openGraph).toMatchObject({
      title: service.metaTitle,
      description: service.metaDescription,
      type: "website",
      locale: "ru_MD",
    });
  });
});
