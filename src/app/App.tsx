import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { DemoVideo } from "./components/DemoVideo";
import { ConferenceShowcase } from "./components/ConferenceShowcase";
import { About } from "./components/About";
import { Technology } from "./components/Technology";
import { Benefits } from "./components/Benefits";
import { Investors } from "./components/Investors";
// import { News } from "./components/News";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { LegalPage } from "./components/LegalPage";
import { Meta } from "./components/Meta";
import { siteContent } from "../content/siteContent";

type Route = "home" | "privacy" | "terms";

function getRoute(): Route {
  if (window.location.pathname === "/privacy") {
    return "privacy";
  }

  if (window.location.pathname === "/terms") {
    return "terms";
  }

  if (window.location.pathname === "/about") {
    return "home";
  }
  return "home";
}

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute);
  const hasDemoVideo = Boolean(siteContent.demoVideo.embedUrl || siteContent.demoVideo.url);
  const hasConferenceMedia =
    Boolean(siteContent.conferenceShowcase.diagram.url) ||
    siteContent.conferenceShowcase.videos.some((video) => Boolean(video.embedUrl || video.url));

  useEffect(() => {
    const onRouteChange = () => setRoute(getRoute());

    window.addEventListener("popstate", onRouteChange);
    return () => window.removeEventListener("popstate", onRouteChange);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-zinc-950">
      <Meta page={route} />
      <Navigation />
      {route === "privacy" ? (
        <LegalPage page="privacy" />
      ) : route === "terms" ? (
        <LegalPage page="terms" />
      ) : (
        <main>
          <Hero />
          {hasDemoVideo ? <DemoVideo /> : null}
          {hasConferenceMedia ? <ConferenceShowcase /> : null}
          <About />
          <Technology />
          <Benefits />
          <Investors />
          {/* <News /> is hidden until CargoFish asks for the Milestones section to be displayed again. */}
          <Contact />
        </main>
      )}
      <Footer />
    </div>
  );
}
