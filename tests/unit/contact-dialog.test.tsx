import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactDialogProvider } from "@/components/contact/ContactDialogProvider";
import ContactTrigger from "@/components/contact/ContactTrigger";

function Subject() {
  return (
    <ContactDialogProvider>
      <ContactTrigger>Связаться</ContactTrigger>
    </ContactDialogProvider>
  );
}

describe("contact dialog", () => {
  it("mounts one named modal only while open", async () => {
    const user = userEvent.setup();
    render(<Subject />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Связаться" }));

    expect(screen.getAllByRole("dialog")).toHaveLength(1);
    expect(
      screen.getByRole("dialog", { name: "Связаться с Kineto One" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Позвонить" })).toHaveAttribute(
      "href",
      "tel:+37369715536",
    );
  });

  it("closes with cancel and restores trigger focus", async () => {
    const user = userEvent.setup();
    render(<Subject />);
    const trigger = screen.getByRole("button", { name: "Связаться" });

    await user.click(trigger);
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { cancelable: true }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("gives the close button an accessible name", async () => {
    const user = userEvent.setup();
    render(<Subject />);
    await user.click(screen.getByRole("button", { name: "Связаться" }));
    expect(
      screen.getByRole("button", { name: "Закрыть окно связи" }),
    ).toBeVisible();
  });
});
