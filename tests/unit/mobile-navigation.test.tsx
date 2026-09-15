import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Navbar from "@/components/Navbar";
import { ContactDialogProvider } from "@/components/contact/ContactDialogProvider";

describe("mobile navigation", () => {
  it("opens one named modal menu and closes with cancel", async () => {
    const user = userEvent.setup();
    render(
      <ContactDialogProvider>
        <Navbar />
      </ContactDialogProvider>,
    );
    const trigger = screen.getByRole("button", { name: "Открыть меню" });

    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Навигация" });
    expect(dialog).toBeVisible();

    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    expect(screen.queryByRole("dialog", { name: "Навигация" })).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("closes after selecting a destination", async () => {
    const user = userEvent.setup();
    render(
      <ContactDialogProvider>
        <Navbar />
      </ContactDialogProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Открыть меню" }));
    await user.click(screen.getAllByRole("link", { name: "Услуги" }).at(-1)!);
    expect(screen.queryByRole("dialog", { name: "Навигация" })).not.toBeInTheDocument();
  });
});
