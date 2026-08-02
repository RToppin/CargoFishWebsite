import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConferenceShowcase } from "./ConferenceShowcase";

describe("ConferenceShowcase", () => {
  it("does not render empty media placeholders when media is not configured", () => {
    const { container } = render(
      <ConferenceShowcase
        config={{
          eyebrow: "Conference media",
          title: "Conference materials",
          description: "Conference media description.",
          eventName: "NYC Fleet Show",
          date: "May 15, 2025",
          location: "Queens, New York",
          diagram: {
            title: "CargoFish diagram",
            alt: "CargoFish system diagram",
            url: "",
            fallbackBody: "Diagram fallback",
          },
          videos: [],
        }}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders configured LinkedIn conference embeds", () => {
    render(<ConferenceShowcase />);

    expect(screen.getByTitle("Conference demonstration video")).toHaveAttribute(
      "src",
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7328832192959123457?compact=1",
    );
    expect(screen.getByTitle("Additional conference video")).toHaveAttribute(
      "src",
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7331798421789372416?compact=1",
    );
    expect(screen.queryByText("Diagram ready")).not.toBeInTheDocument();
  });

  it("renders configured diagram and native video controls", () => {
    const { container } = render(
      <ConferenceShowcase
        config={{
          eyebrow: "Conference media",
          title: "Conference materials",
          description: "Conference media description.",
          eventName: "NYC Fleet Show",
          date: "May 15, 2025",
          location: "Queens, New York",
          diagram: {
            title: "CargoFish diagram",
            alt: "CargoFish system diagram",
            url: "/media/conference-diagram.png",
            fallbackBody: "Diagram fallback",
          },
          videos: [
            {
              title: "Conference clip",
              label: "Primary clip",
              embedUrl: "",
              url: "/media/conference-clip.mp4",
              posterUrl: "/media/conference-clip.jpg",
              captionsUrl: "/media/conference-clip.vtt",
            },
          ],
        }}
      />,
    );

    expect(screen.getByAltText("CargoFish system diagram")).toHaveAttribute("src", "/media/conference-diagram.png");
    expect(container.querySelector("video")).toHaveAttribute("controls");
    expect(container.querySelector("source")).toHaveAttribute("type", "video/mp4");
    expect(container.querySelector("track")).toHaveAttribute("src", "/media/conference-clip.vtt");
  });
});
