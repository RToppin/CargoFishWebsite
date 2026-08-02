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
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("shows field-specific validation errors before submitting", () => {
    const clickMock = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined);

    render(<Contact />);

    fireEvent.click(screen.getByRole("button", { name: /open email/i }));

    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Enter a message with at least 10 characters.")).toBeInTheDocument();
    expect(clickMock).not.toHaveBeenCalled();
  });

  it("opens a prepared email and resets the form after validation passes", async () => {
    const clickMock = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined);

    render(<Contact />);
    fillRequiredFields();
    fireEvent.change(screen.getByLabelText(/inquiry type/i), { target: { value: "investor" } });
    fireEvent.click(screen.getByRole("button", { name: /open email/i }));

    expect(await screen.findByText(/Your email app should open/i)).toBeInTheDocument();
    expect(clickMock).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByLabelText(/full name/i)).toHaveValue(""));
  });

  it("renders a direct email fallback when an email client cannot be opened", async () => {
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {
      throw new Error("Navigation blocked");
    });

    render(<Contact />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /open email/i }));

    expect(await screen.findByText(/Your email app could not be opened/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Email contact.cargofish@gmail.com/i })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:contact.cargofish@gmail.com"),
    );
  });
});
