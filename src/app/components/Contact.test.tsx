import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Contact } from "./Contact";

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Alex Taylor" } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "alex@example.com" } });
  fireEvent.change(screen.getByLabelText(/message/i), {
    target: { value: "I would like to discuss CargoFish." },
  });
  fireEvent.click(screen.getByLabelText(/I agree/i));
}

describe("Contact", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows field-specific validation errors before submitting", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    render(<Contact />);

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Enter a message with at least 10 characters.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("renders a success state only after the server confirms acceptance", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );

    render(<Contact />);
    fillRequiredFields();
    fireEvent.change(screen.getByLabelText(/inquiry type/i), { target: { value: "investor" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/CargoFish received your inquiry/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText(/full name/i)).toHaveValue(""));
  });

  it("renders a direct email fallback when delivery fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          ok: false,
          message: "Contact delivery failed. Please email info@cargofish.com directly.",
        }),
      }),
    );

    render(<Contact />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/Contact delivery failed/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Email info@cargofish.com/i })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:info@cargofish.com"),
    );
  });
});
