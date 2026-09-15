import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RelatedServices from "@/components/RelatedServices";
import ServiceArticle from "@/components/ServiceArticle";
import { servicesData } from "@/data/services";

describe("service page components", () => {
  it("renders typed content with descending headings", () => {
    render(<ServiceArticle sections={servicesData["back-pain"].sections} />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(3);
    expect(screen.getByText("постепенное восстановление подвижности")).toBeVisible();
  });

  it("renders descriptive related-service destinations", () => {
    render(<RelatedServices slugs={["massage", "kinesiotherapy"]} />);
    expect(screen.getByRole("link", { name: "Массаж" })).toHaveAttribute(
      "href",
      "/services/massage",
    );
  });

  it("renders valid escaped JSON-LD", () => {
    const { container } = render(
      <JsonLd
        data={{ "@context": "https://schema.org", name: "Kineto One <studio>" }}
      />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.textContent).toContain("\\u003cstudio>");
    expect(() => JSON.parse(script?.textContent ?? "")).not.toThrow();
  });

  it("renders visible breadcrumbs", () => {
    render(<Breadcrumbs title="Лечебный массаж" />);
    expect(screen.getByRole("navigation", { name: "Хлебные крошки" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Главная" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
