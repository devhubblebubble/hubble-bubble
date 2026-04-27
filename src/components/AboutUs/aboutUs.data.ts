export type TeamMember = {
  id: string;
  name: string;
  title: string;
  aka: string;
  image: string;
  accent?: boolean;
};

export type TimelineItem = {
  id: string;
  year: string;
  title: string;
  description: string;
};

export type AboutLink = {
  label: string;
  href: string;
  active?: boolean;
};

export const aboutCopy = {
  heroTitle: "We didn't start this to send students abroad.",
  heroBody:
    "Too many students pick study destinations like they pick socks in the dark. We're here to fix that. With clarity and maybe a dash of cosmic stardust.",
  missionTitle: "why we are here?",
  missionKicker: "a. k. a",
  missionSubtitle: "the mission",
  missionBody:
    "To help students discover their dream-not just go abroad, but go in the right direction. No fake promises, no fine print, just honest mentoring.",
  visionTitle: "and where we are headed?",
  visionKicker: "a. k. a",
  visionSubtitle: "the vision",
  visionBody:
    "A future where every student gets real guidance, not a sales pitch. One where purpose leads the way, and passion powers the journey.",
  finalTitle: "If this feels right, let's talk!",
  finalBody: "We might just be the crew you need.",
};

export const aboutNavLinks: AboutLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Journey", href: "/journey" },
  { label: "Stories", href: "/about", active: true },
  { label: "Gallery", href: "/gallery" },
];

export const teamMembers: TeamMember[] = [
  {
    id: "jevin-zac",
    name: "Jevin Zac",
    title: "Chief Pathfinder",
    aka: "Founder",
    image: "https://www.figma.com/api/mcp/asset/29b5de4a-50e3-4849-a683-721824dd1442",
    accent: true,
  },
  {
    id: "fayzul-choudhury",
    name: "Fayzul Choudhury",
    title: "Mission Engineer",
    aka: "CFO",
    image: "https://www.figma.com/api/mcp/asset/ef0070dc-4793-480c-a4c7-cca7fb8db88b",
    accent: true,
  },
  {
    id: "sahil-anand",
    name: "Sahil Anand",
    title: "Stardust Strategist",
    aka: "Marketing Lead",
    image: "https://www.figma.com/api/mcp/asset/1900490c-66f5-47d8-a626-f7d5a566df85",
  },
  {
    id: "reha-simon",
    name: "Reha Simon",
    title: "Cosmic Researcher",
    aka: "Career & Course Advisor",
    image: "https://www.figma.com/api/mcp/asset/ac41b93d-3b76-4a60-b734-76282a8aabb3",
  },
];

export const timelineItems: TimelineItem[] = [
  {
    id: "spark-2018",
    year: "2018",
    title: "The Spark",
    description:
      "Jevin has an 'aha' moment after seeing friends frustrated abroad. Lightbulb goes off. So does the first Google Doc.",
  },
  {
    id: "takeoff-2019",
    year: "2019",
    title: "Takeoff",
    description:
      "Hubble Bubble is officially born. First few students mentored. Zero marketing. Just word-of-mouth and good vibes.",
  },
  {
    id: "broadcast-2022",
    year: "2022",
    title: "The First Broadcast",
    description:
      "Weekly Instagram webinars begin to answer student questions with no sales pitch. Attendance grows fast.",
  },
  {
    id: "youhavejz-2023",
    year: "2023",
    title: "YouHaveJZ is Born",
    description:
      "The mentoring project turns into a platform. Honest advice, passion-first alignment, and no shady commissions.",
  },
];

export const figmaAssetReference = {
  logo: "https://www.figma.com/api/mcp/asset/7ea43f38-806a-4578-b389-84b8af1812db",
  teamJevin: "https://www.figma.com/api/mcp/asset/29b5de4a-50e3-4849-a683-721824dd1442",
  teamFayzul: "https://www.figma.com/api/mcp/asset/ef0070dc-4793-480c-a4c7-cca7fb8db88b",
  teamSahil: "https://www.figma.com/api/mcp/asset/1900490c-66f5-47d8-a626-f7d5a566df85",
  teamReha: "https://www.figma.com/api/mcp/asset/ac41b93d-3b76-4a60-b734-76282a8aabb3",
};
