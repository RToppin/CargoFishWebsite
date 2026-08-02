import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConferenceShowcase } from "./ConferenceShowcase";

describe("ConferenceShowcase", () => {
  it("renders diagram and conference video fallback states when media is not configured", () => {
    render(<ConferenceShowcase />);

    expect(screen.getByText("Diagram ready")).toBeInTheDocument();
    expect(screen.getAllByText("Conference video slot ready")).toHaveLength(2);
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
