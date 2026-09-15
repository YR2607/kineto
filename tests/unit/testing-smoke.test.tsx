import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

function Smoke() {
  return <button type="button">Связаться</button>;
}

describe("test infrastructure", () => {
  it("renders React components with accessible queries", () => {
    render(<Smoke />);
    expect(screen.getByRole("button", { name: "Связаться" })).toBeVisible();
  });
});
