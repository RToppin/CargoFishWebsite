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
  tagline: "The Physical Internet",
  siteUrl: "https://www.cargofish.com",
  contact: {
    email: "info@cargofish.com",
    location: "New Jersey, USA",
    socialLinks: [],
  },
  seo: {
    title: "CargoFish LLC | The Physical Internet",
    description:
      "CargoFish is developing an underground delivery utility for moving consumer packaged goods through automated infrastructure.",
  },
  hero: {
    eyebrow: "CargoFish LLC",
    headline: "The Physical Internet",
    description:
      "CargoFish is developing an underground delivery utility for moving consumer packaged goods through automated, pipe-based infrastructure.",
    kicker: "Move Only What Matters!",
  },
  mission: [
    "CargoFish envisions a day when delivery inefficiencies can be reduced through a new kind of utility: an underground physical internet for everyday goods.",
    "The concept is modeled on how information moves instantly across digital networks. CargoFish applies that utility mindset to physical products by moving packages through enclosed underground pathways.",
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
      "CargoFish is described in the supplied material as a miniature subway-like system using cylinder-shaped tunnels with an 8-inch diameter. Vehicles move through energized rails that form an electrical circuit.",
    details: [
      "Transport vehicles are less than 4 feet long.",
      "Each vehicle is described as holding approximately 20 pounds, similar to one grocery bag or two gallon jugs of milk.",
      "Vehicles include a computerized component for destination entry.",
      "Vehicles are self-propelled on energized rails within enclosed tunnels.",
    ],
    process: [
      "The vehicle arrives at the intended destination.",
      "The system ejects the complete vehicle for unloading.",
      "The recipient removes the package.",
      "The container can be reused, returned for recycling, or loaded with a new payload.",
    ],
    traffic:
      "The supplied material describes onboard switching and distributed, cooperative vehicle traffic algorithms, rather than pre-set switches or traffic signals.",
    throughput:
      "Company-supplied estimates state that vehicle throughput per lane-mile could exceed ordinary highway car limits and pneumatic systems. These figures require confirmation before being presented as independently verified performance.",
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
        "CargoFish estimates that lightweight vehicles on rails could use far less energy per delivery than road-based alternatives.",
    },
    {
      title: "Reduced packaging waste",
      description:
        "Reusable containers could reduce plastic grocery bags and protective packaging used for small shipments.",
    },
  ],
  energyClaim: {
    title: "electric rail delivery",
    value: "Clean energy",
    body:
      "CargoFish uses electric vehicles running on energized rails, eliminating onboard gasoline or diesel engines and positioning the system for clean-energy operation.",
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
    url: import.meta.env.VITE_DEMO_VIDEO_URL || "",
    posterUrl: import.meta.env.VITE_DEMO_VIDEO_POSTER_URL || "",
    captionsUrl: "",
    fallbackHeading: "Demonstration video coming soon",
    fallbackBody:
      "CargoFish can publish an MP4 or WebM demo here once a production video URL, poster, and optional captions are supplied.",
  },
  conferenceShowcase: {
    eyebrow: "Conference media",
    title: "NYC Fleet Show demonstration materials",
    description:
      "A dedicated place for the diagram and videos from CargoFish's public proof-of-concept demonstration at the NYC Fleet Show.",
    eventName: "NYC Fleet Show",
    date: "May 15, 2025",
    location: "Corona Flushing Meadows Park, Queens, New York",
    diagram: {
      title: "CargoFish system diagram",
      alt:
        "CargoFish conference diagram showing the underground delivery utility concept and vehicle movement through enclosed infrastructure.",
      url: import.meta.env.VITE_CONFERENCE_DIAGRAM_URL || "",
      fallbackBody:
        "Add the conference diagram or system schematic here once the final image is supplied.",
    },
    videos: [
      {
        title: "Conference demonstration video",
        label: "Primary conference clip",
        url: import.meta.env.VITE_CONFERENCE_VIDEO_1_URL || "",
        posterUrl: import.meta.env.VITE_CONFERENCE_VIDEO_1_POSTER_URL || "",
        captionsUrl: import.meta.env.VITE_CONFERENCE_VIDEO_1_CAPTIONS_URL || "",
      },
      {
        title: "Additional conference video",
        label: "Supplemental clip",
        url: import.meta.env.VITE_CONFERENCE_VIDEO_2_URL || "",
        posterUrl: import.meta.env.VITE_CONFERENCE_VIDEO_2_POSTER_URL || "",
        captionsUrl: import.meta.env.VITE_CONFERENCE_VIDEO_2_CAPTIONS_URL || "",
      },
    ],
  },
};
