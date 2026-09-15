import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import FAQ from "@/components/FAQ";

describe("FAQ", () => {
  it("uses named buttons and synchronizes expanded state", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const question = screen.getByRole("button", {
      name: "Можно ли заниматься после операции?",
    });

    expect(question).toHaveAttribute("aria-expanded", "false");
    await user.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("region", {
        name: "Можно ли заниматься после операции?",
      }),
    ).toBeVisible();
  });

  it("works with native keyboard activation", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const question = screen.getByRole("button", {
      name: "Сколько занятий обычно требуется?",
    });
    question.focus();
    await user.keyboard("{Enter}");
    expect(question).toHaveAttribute("aria-expanded", "true");
  });
});
