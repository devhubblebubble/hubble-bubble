export type ServiceCard = {
  id: string;
  title: string;
  description: string;
};

export const servicesPageAssets = {
  heroBg:
    "https://www.figma.com/api/mcp/asset/8b92e74b-015e-4ab1-abbc-b37fd1193faf",
  logo: "https://www.figma.com/api/mcp/asset/60f23e6c-ba54-44b4-96d3-51ff35676b80",
  appStoreBadge:
    "https://www.figma.com/api/mcp/asset/54517372-b354-4d26-91be-2477d428f6f5",
  footerDivider:
    "https://www.figma.com/api/mcp/asset/c646d1d5-c50d-4f57-a16d-3216eac03985",
  socialGroup:
    "https://www.figma.com/api/mcp/asset/c9a62959-b7af-4b19-b188-cc20c7abb733",
} as const;

export const servicesPageCopy = {
  heroTitle: "Where Help Meets Intention",
  heroSubtitle:
    "Whether it's us or our partners, everything here serves a meaningful goal.",
  breadcrumb: [
    { label: "Menu", href: "/" },
    { label: "Blogs", href: "/blogs" },
    { label: "All Blogs", href: "/services", current: true },
  ],
  tabs: {
    primary: "Hubble Bubble Services",
    secondary: "Add On Services",
  },
  footerAddress: ["9 Sighthill Ct,", "Edinburgh", "EH11 4BN, United Kingdom"],
  footerLinks: [
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
    { label: "Blogs", href: "/blogs" },
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Collaborate", href: "/collaborate" },
  ],
  phone: "+44 43423 43242",
  email: "contact@hubblebubble.uk",
};

export const hubbleServiceCards: ServiceCard[] = [
  {
    id: "study-abroad",
    title: "Study Abroad Planning",
    description:
      "Make your study abroad journey more than just a relocation — it makes it a launchpad.",
  },
  {
    id: "pre-departure",
    title: "Pre-departure Preparation",
    description:
      "From what to carry to what to expect, this prepares students mentally and practically.",
  },
  {
    id: "cultural-immersion",
    title: "Cultural Immersion Workshops",
    description:
      "Designed to connect students with the local culture.",
  },
  {
    id: "language-support",
    title: "Language Support Programs",
    description:
      "Enhance your language skills with tailored programs that boost confidence and fluency.",
  },
  {
    id: "post-arrival",
    title: "Post-arrival Support",
    description:
      "Ongoing assistance to help you navigate your new environment and settle in.",
  },
];

export const addOnServiceCards: ServiceCard[] = [
  {
    id: "addon-master-uk",
    title: "Master UK University Like a Pro",
    description:
      "From Confused International Student to Top Graduate in Just 9 Months of Focused Hustle.",
  },
  {
    id: "addon-networking",
    title: "Networking for Success",
    description:
      "Building connections with peers and professors that can last a lifetime, fueling your career.",
  },
  {
    id: "addon-cultural",
    title: "Cultural Immersion Strategies",
    description:
      "Engage with the local culture through events, communities, and activities to enrich your experience.",
  },
  {
    id: "addon-job-hunt",
    title: "Job Hunt Essentials",
    description:
      "Master the art of CV writing and interview preparation to land your dream job after graduation.",
  },
];
