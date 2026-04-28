export type TeamMember = {
  id: string;
  name: string;
  title: string;
  aka: string;
  image: string;
};

export type TimelineItem = {
  id: string;
  year: string;
  title: string;
  description: string;
};

export const aboutCopy = {
  heroBody:
    "Too many students pick study destinations like they pick socks in the dark. We're here to fix that. With clarity, honesty, and maybe a dash of cosmic stardust.",
  galaxy:
    "Because education isn't just a destination — it's a direction. And we help every student find theirs.",
  missionTitle: "why we are here?",
  visionTitle: "and where we are headed?",
};

export const teamMembers: TeamMember[] = [
  {
    id: "jevin-zac",
    name: "Jevin Zac",
    title: "Chief Pathfinder",
    aka: "Founder",
    image: "/images/Teams/jevin.png",
  },
  {
    id: "fayzul-choudhury",
    name: "Fayzul Choudhury",
    title: "Mission Engineer",
    aka: "CFO",
    image: "/images/Teams/fayzul.png",
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
      "Weekly Instagram webinars begin — answering student questions with no sales pitch. Attendance grows fast.",
  },
  {
    id: "youhavejz-2023",
    year: "2023",
    title: "YouHaveJZ is Born",
    description:
      "The mentoring project turns into a platform. Honest advice, passion-first alignment, and zero shady commissions.",
  },
  {
    id: "hubblex-2025",
    year: "2025",
    title: "Hubble Goes Global",
    description:
      "HubbleX launches — a full-stack platform for international students. One place for guidance, planning, and community across borders.",
  },
];
