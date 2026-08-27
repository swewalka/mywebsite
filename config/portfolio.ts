export type Project = {
  id: string;
  title: string;
  description: string;
  planet: string;
  planetSize: "medium" | "large" | "wide";
  projectUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
};

export const portfolio = {
  name: "Simon Wewalka",
  monogram: "SW",
  location: "Vienna, Austria",
  role: "Engineering · Software · Product",
  metadata: {
    title: "Simon Wewalka",
    description:
      "Mechanical engineering student working across technology, product development, and ambitious side projects.",
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Student · Engineer · Maker",
    title: ["Building things", "with space", "in mind."],
    description:
      "I’m Simon, a mechanical engineering student interested in space, machines, and making useful things.",
    primaryCta: { label: "View selected work", href: "#work" },
    secondaryCta: { label: "Contact", href: "#contact" },
  },
  projects: [
    {
      id: "first-model-rocket",
      title: "First Model Rocket",
      description:
        "I built this model rocket with three other students and took on the role of team captain. It was our FIRST project, the introductory rocket-building project completed by new members of the TU Wien Space Team.",
      planet: "/assets/optimized/planet-3.webp",
      planetSize: "large",
      githubUrl: "https://github.com/swewalka/FIRST-Space-Team-project",
    },
    {
      id: "eduplanner",
      title: "EduPlanner",
      description:
        "EduPlanner is the biggest project I have worked on so far. Over two years, I helped develop the platform to support students and teachers in schools with open learning systems. It is still used at Vienna’s largest school, but the project is now being wound down because the market proved too small. Along the way, I learned a great deal about building a real product, working with users, and entrepreneurship.",
      planet: "/assets/optimized/planet-4.webp",
      planetSize: "medium",
      projectUrl: "https://eduplanner.pallasys.at/",
    },
    {
      id: "portable-wind-station",
      title: "Portable Wind Station",
      description:
        "A personal project born from my love of kitesurfing. I’m developing a partly 3D printable, self-sufficient wind station for live wind measurements that can be placed at the beach or mounted on a car.",
      planet: "/assets/optimized/planet-6.webp",
      planetSize: "wide",
    },
  ] satisfies Project[],
  about: {
    eyebrow: "About",
    body:
      "I study mechanical engineering at TU Wien and am part of the TU Wien Space Team. Most of what interests me involves designing, testing, and improving real things, whether it’s a university project, a prototype, or something I’m making simply because I want to see if it works.",
    focus: [
      "Mechanical engineering",
      "Designing and prototyping",
      "Space-related projects",
      "FPV and making",
    ],
  },
  skills: {
    eyebrow: "Capabilities",
    intro: "A cross-disciplinary toolkit for taking ideas from first principles to working prototypes.",
    groups: [
      {
        name: "Engineering",
        items: ["CAD", "Mechanical design", "Prototyping", "Testing"],
      },
      {
        name: "Software",
        items: ["TypeScript", "Python", "React / Next.js", "Linux"],
      },
      {
        name: "Product",
        items: ["Product strategy", "Interaction design", "Rapid validation", "Project leadership"],
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    prompt: "Have an interesting project?",
    cta: "Let’s talk.",
    email: "hello@example.com",
    links: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
    ],
  },
  year: "2026",
} as const;
