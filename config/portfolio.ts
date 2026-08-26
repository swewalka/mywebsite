export type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  href?: string;
  image?: string;
};

export const portfolio = {
  name: "Simon Wewalka",
  monogram: "SW",
  location: "Vienna, Austria",
  role: "Engineering · Software · Product",
  metadata: {
    title: "Simon Wewalka — Engineering, Software & Product",
    description:
      "Mechanical engineering student working across technology, product development, and ambitious side projects.",
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Engineering · Software · Product",
    title: ["Building things", "between engineering", "and software."],
    description:
      "Mechanical engineering student working across technology, product development and ambitious side projects.",
    primaryCta: { label: "View selected work", href: "#work" },
    secondaryCta: { label: "About me", href: "#about" },
  },
  projects: [
    {
      title: "Flight Control Workspace",
      description:
        "A focused desktop environment for reviewing FPV footage, telemetry and flight data without breaking creative flow.",
      tags: ["Product", "TypeScript", "Systems"],
      year: "2026",
      href: "#contact",
    },
    {
      title: "Instrumented Test Rig",
      description:
        "A modular hardware and software platform for repeatable mechanical testing, live measurement and rapid iteration.",
      tags: ["Engineering", "Prototyping", "Python"],
      year: "2025",
      href: "#contact",
    },
    {
      title: "Orbital Systems Study",
      description:
        "An independent exploration of mission constraints, subsystem trade-offs and clear technical communication.",
      tags: ["Aerospace", "Research", "Design"],
      year: "2025",
      href: "#contact",
    },
  ] satisfies Project[],
  about: {
    eyebrow: "About",
    body:
      "I’m a mechanical engineering student who likes working where physical systems, useful software and thoughtful product decisions meet. I’m most engaged by practical problems that reward curiosity, disciplined iteration and a willingness to make things real.",
    focus: [
      "Mechanical engineering",
      "Software systems",
      "Product development",
      "Aerospace · FPV · Making",
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
