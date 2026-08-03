export const inquiryTypes = [
  { value: "general", label: "General inquiry" },
  { value: "investor", label: "Investor inquiry" },
  { value: "partnership", label: "Strategic partnership" },
  { value: "municipal", label: "Municipal/pilot opportunity" },
  { value: "media", label: "Media/press" },
  { value: "careers", label: "Careers" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];

export const siteContent = {
  companyName: "CargoFish LLC",
  brandName: "CargoFish",
  tagline: "Move What Matters",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://www.cargofish.com",
  contact: {
    email: "contact.cargofish@gmail.com",
    location: "New Jersey, USA",
    socialLinks: [],
  },
  seo: {
    title: "CargoFish LLC | Move What Matters",
    description:
      "CargoFish is developing an underground delivery utility for moving consumer packaged goods through automated infrastructure.",
  },
  hero: {
    eyebrow: "CargoFish LLC",
    headline: "Move What Matters",
    description:
      "CargoFish is developing an underground delivery utility for moving consumer packaged goods through automated, pipe-based infrastructure.",
    kicker: "Fully electric rail delivery",
  },
  mission: [
    "CargoFish is developing a utility-style delivery system that moves everyday goods through underground pipe networks, reducing the friction, vehicle miles, and repeated surface trips built into today's delivery model.",
    "The concept is comparable to pneumatic tube systems used in hospitals and banks, expanded to a larger, computer-controlled network with greater routing flexibility, payload handling, and destination management.",
  ],
  problem: {
    intro:
      "Public data shows the U.S. household delivery challenge at real scale: more than 132 million households, high parcel volume, and more than 100 billion annual vehicle miles tied directly to shopping trips.",
    stats: [
      {
        value: "132.7M",
        label: "U.S. households",
        note: "U.S. Census Bureau, 2024 ACS 1-Year Estimates, Table S1101.",
        sourceLabel: "Census ACS",
        sourceUrl: "https://data.census.gov/table/ACSST1Y2024.S1101?g=&q=Families+and+Living+Arrangements",
      },
      {
        value: "107.9B",
        label: "annual shopping-trip miles",
        note: "Federal Highway Administration 2022 NHTS VMT for shop/buy/pick-up or return goods.",
        sourceLabel: "FHWA NHTS",
        sourceUrl: "https://nhts.ornl.gov/de/work/171564122580/171564122580.html",
      },
    ],
    outcomes: [
      "Vehicle miles from routine shopping and errands",
      "Fuel burned across repeated trips",
      "Road wear and repair demand",
      "Traffic congestion",
      "Accidents, injuries, and fatalities",
      "Packaging waste from small shipments",
    ],
    quote:
      "Standard shipping methods are simply not equipped to accommodate vast quantities of small packages delivered on a regular basis.",
  },
  grant: {
    amount: "$75,000",
    title: "Clean Tech Seed Grant",
    organization: "New Jersey Commission on Science Innovation and Technology",
    period: "Award announced October 15, 2024",
    status: "NJEDA public award list",
    sourceLabel: "NJEDA award list",
    sourceUrl:
      "https://www.njeda.gov/csit-awards-3m-to-41-new-jersey-based-start-ups-through-round-3-catalyst-and-clean-tech-seed-grant-programs/",
  },
  technology: {
    summary:
      "CargoFish is a miniature subway-style delivery network where multiple vehicles communicate and navigate through 8-inch pipe to reach destination nodes, unload payloads, and return to idle compartments or continue to the next pickup. Vehicles draw power from energized rails that form an electrical circuit.",
    details: [
      "Transport vehicles are less than 4 feet long and sized for everyday consumer goods.",
      "Each vehicle holds approximately 20 pounds, similar to one grocery bag or two gallon jugs of milk.",
      "Sensors and an onboard microcontroller support routing, positioning, and destination handling.",
      "Vehicles normally draw power from electrified rails and can use onboard drive capability through unpowered sections or rail dead spots.",
    ],
    process: [
      "The closest available vehicle is dispatched to the pickup location.",
      "The payload is loaded into the vehicle.",
      "The vehicle navigates through the pipe network to the destination node.",
      "The payload is dropped off for recipient retrieval.",
      "The vehicle returns to an idle compartment or continues to the next task.",
    ],
    traffic:
      "Programmed microcontrollers, sensors, and communication methods manage routing, spacing, switching, and cooperative vehicle traffic across the network.",
    throughput:
      "The rail-guided network is intended to deliver high-frequency movement of lightweight payloads by keeping multiple vehicles in motion through each lane-mile. Final throughput depends on routing design, station spacing, loading cycles, and validated operating parameters.",
  },
  benefits: [
    {
      title: "All-weather operation",
      description:
        "Underground routing is intended to reduce exposure to storms and surface disruptions.",
    },
    {
      title: "Improved package security",
      description:
        "Enclosed movement directly through pipes could reduce opportunities for theft or tampering.",
    },
    {
      title: "Lower transit liability",
      description:
        "A controlled automated environment may reduce common damage and loss points in last-mile delivery.",
    },
    {
      title: "Low marginal delivery cost",
      description:
        "The concept depends on utility-like infrastructure where high utilization can lower the cost of each shipment.",
    },
    {
      title: "Low specific energy",
      description:
        "Lightweight rail-guided vehicles are expected to require less energy per delivery than road-based alternatives, subject to validation under real operating conditions.",
    },
    {
      title: "Reduced packaging waste",
      description:
        "Reusable containers could reduce plastic grocery bags and protective packaging used for small shipments.",
    },
  ],
  energyClaim: {
    title: "Electrified rail delivery",
    value: "Fully electric",
    body:
      "Vehicles are designed to run fully electric on energized rails inside the pipe network, with no onboard gasoline or diesel engines and no onboard tailpipe emissions. The architecture remains a concept attribute that requires validation through engineering tests and pilot operation.",
  },
  marketContext: {
    body:
      "BEA data show U.S. consumers spent $4.24 trillion on nondurable goods in 2025. Pitney Bowes estimates 23.1 billion U.S. parcel shipments in 2025, equal to 171 parcels per household.",
    sources: [
      {
        label: "BEA/FRED nondurable goods",
        url: "https://fred.stlouisfed.org/series/PCNDA",
      },
      {
        label: "Pitney Bowes Parcel Shipping Index",
        url: "https://www.pitneybowes.com/us/shipping-index.html",
      },
    ],
  },
  milestones: [
    {
      date: "November 2024",
      title: "Clean Tech Seed Grant awarded",
      description:
        "CargoFish received a $75,000 Clean Tech Seed Grant from the New Jersey Commission on Science Innovation and Technology.",
      category: "Funding",
    },
    {
      date: "May 15, 2025",
      title: "Public proof-of-concept demonstration",
      description:
        "CargoFish presented a proof-of-concept prototype demonstration at the NYC Fleet Show in Corona Flushing Meadows Park, Queens, New York.",
      category: "Milestone",
    },
    {
      date: "August 4, 2025",
      title: "Elaborate prototype demonstration",
      description:
        "CargoFish presented a more elaborate prototype demonstration as a completed 2025 milestone.",
      category: "Milestone",
    },
  ],
  testimonial: {
    quote:
      "What a game-changing, genius innovation. I can't wait for the day when this delivery system is a reality. Infrastructure always seems daunting, but that's why the sophistication of a country is often measured by its infrastructure. What makes a nation 'developed' anyway?",
    attribution: "Sandy Zylka, VP Products & Technology at NextAxiom Technology",
  },
  investors: {
    description:
      "CargoFish is seeking conversations with investors, strategic partners, municipalities, and pilot-site stakeholders interested in new delivery infrastructure.",
    disclaimer:
      "This website is for informational purposes only and is not an offer to sell, or a solicitation of an offer to buy, securities or any other financial instrument.",
  },
  demoVideo: {
    title: "CargoFish demonstration video",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7361406325236346880?compact=1",
    url: "",
    posterUrl: "",
    captionsUrl: "",
    fallbackHeading: "Demonstration video unavailable",
    fallbackBody:
      "CargoFish can publish a direct MP4 or WebM demo here if the LinkedIn embed becomes unavailable.",
  },
  conferenceShowcase: {
    eyebrow: "Conference media",
    title: "NYC Fleet Show demonstration materials",
    description:
      "Proof-of-concept demonstration media from CargoFish's NYC Fleet Show appearance.",
    eventName: "NYC Fleet Show",
    date: "May 15, 2025",
    location: "Corona Flushing Meadows Park, Queens, New York",
    diagram: {
      title: "CargoFish system diagram",
      alt:
        "CargoFish conference diagram showing the underground delivery utility concept and vehicle movement through enclosed infrastructure.",
      url: "",
      fallbackBody:
        "Add the conference diagram or system schematic here once the final image is supplied.",
    },
    videos: [
      {
        title: "Conference demonstration video",
        label: "Primary conference clip",
        embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7328832192959123457?compact=1",
        url: "",
        posterUrl: "",
        captionsUrl: "",
      },
      {
        title: "Additional conference video",
        label: "Supplemental clip",
        embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7331798421789372416?compact=1",
        url: "",
        posterUrl: "",
        captionsUrl: "",
      },
    ],
  },
};
