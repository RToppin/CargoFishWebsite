import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoVideo } from "./DemoVideo";

describe("DemoVideo", () => {
  it("renders a professional fallback when no video URL is configured", () => {
    render(<DemoVideo />);

    expect(screen.getByText("Demonstration video coming soon")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /play/i })).not.toBeInTheDocument();
  });

  it("renders native video controls when a video URL is configured", () => {
    const { container } = render(
      <DemoVideo
        config={{
          title: "CargoFish test demo",
          url: "/media/cargofish-demo.mp4",
          posterUrl: "/media/cargofish-demo-poster.jpg",
          captionsUrl: "",
          fallbackHeading: "Demonstration video coming soon",
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
