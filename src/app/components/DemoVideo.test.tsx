import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoVideo } from "./DemoVideo";

describe("DemoVideo", () => {
  it("renders a professional fallback when no media is configured", () => {
    render(
      <DemoVideo
        config={{
          title: "CargoFish test demo",
          embedUrl: "",
          url: "",
          posterUrl: "",
          captionsUrl: "",
          fallbackHeading: "Demonstration video unavailable",
          fallbackBody: "Fallback copy",
        }}
      />,
    );

    expect(screen.getByText("Demonstration video unavailable")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /play/i })).not.toBeInTheDocument();
  });

  it("renders a LinkedIn embed when an embed URL is configured", () => {
    render(<DemoVideo />);

    expect(screen.getByTitle("CargoFish demonstration video")).toHaveAttribute(
      "src",
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7361406325236346880?compact=1",
    );
  });

  it("renders native video controls when a video URL is configured", () => {
    const { container } = render(
      <DemoVideo
        config={{
          title: "CargoFish test demo",
          embedUrl: "",
          url: "/media/cargofish-demo.mp4",
          posterUrl: "/media/cargofish-demo-poster.jpg",
          captionsUrl: "",
          fallbackHeading: "Demonstration video unavailable",
          fallbackBody: "Fallback copy",
        }}
      />,
    );

    const video = container.querySelector("video");
    const source = container.querySelector("source");

    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).toHaveAttribute("poster", "/media/cargofish-demo-poster.jpg");
    expect(source).toHaveAttribute("src", "/media/cargofish-demo.mp4");
    expect(source).toHaveAttribute("type", "video/mp4");
  });
});
