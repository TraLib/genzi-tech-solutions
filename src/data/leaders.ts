export interface LeaderData {
  slug: string;
  initials: string;
  name: string;
  role: string;
  title: string;
  tagline: string;
  bio: string;
  longBio: string;
  location: string;
  joined: string;
  email: string;
  phone: string;
  expertise: string[];
  skills: { name: string; level: number }[];
  experience: { year: string; role: string; company: string; desc: string }[];
  achievements: string[];
  projects: string[];
  education: { degree: string; school: string; year: string }[];
  socials: { label: string; url: string }[];
  accent: string; // hsl values for gradient accent
}

export const allLeaders: LeaderData[] = [
  {
    slug: "vinus-ramani",
    initials: "VR",
    name: "VINUS RAMANI",
    role: "Founder & CEO",
    title: "Chief Executive Officer",
    tagline: "Building products that matter, with people who care.",
    bio: "Founder & CEO who turned a freelance practice into a globally trusted product studio.",
    longBio:
      "Vinus founded the company with a simple belief: great software is shaped by great teams. Over a decade in product engineering, he has led launches for fintech, healthcare, and consumer platforms used by millions. He spends his time mentoring engineers, shaping product strategy, and obsessing over customer outcomes.",
    location: "Surat, India",
    joined: "2018",
    email: "vinus@studio.com",
    phone: "+91 98000 00001",
    expertise: ["Product Strategy", "Engineering Leadership", "SaaS", "Fintech", "Team Building"],
    skills: [
      { name: "Product Strategy", level: 96 },
      { name: "System Architecture", level: 92 },
      { name: "Leadership", level: 95 },
      { name: "Fundraising", level: 84 },
    ],
    experience: [
      { year: "2018 — Now", role: "Founder & CEO", company: "Studio", desc: "Scaled the studio from 2 to 30+ engineers, designers and operators." },
      { year: "2014 — 2018", role: "Lead Engineer", company: "Fintech Co.", desc: "Owned the core trading platform serving 200k traders." },
      { year: "2011 — 2014", role: "Software Engineer", company: "Consumer App", desc: "Shipped the v1 mobile experience used by 1M+ users." },
    ],
    achievements: [
      "Forbes 30 under 30 — Technology",
      "Delivered 80+ products across 12 countries",
      "Speaker at ProductCon, SaaStock, Web Summit",
      "Mentor at Y Combinator Startup School",
    ],
    projects: ["finflow-dashboard", "shopsphere", "neurosense"],
    education: [
      { degree: "B.Tech, Computer Science", school: "NIT Surat", year: "2011" },
    ],
    socials: [
      { label: "LinkedIn", url: "#" },
      { label: "Twitter", url: "#" },
      { label: "GitHub", url: "#" },
    ],
    accent: "0 85% 55%",
  },
  {
    slug: "kevins-golakiya",
    initials: "KG",
    name: "KEVINS GOLAKIYA",
    role: "Co-Founder & VP",
    title: "Vice President",
    tagline: "Operations is the design of growth — done quietly, daily.",
    bio: "Co-founder & VP turning ambitious roadmaps into shipped, profitable products.",
    longBio:
      "Kevins co-founded the studio and runs delivery, finance, and partnerships. He's the calm hand behind the scenes — turning chaos into clear plans, deadlines into delivery, and ideas into bottom-line outcomes for every client we serve.",
    location: "Ahmedabad, India",
    joined: "2018",
    email: "kevins@studio.com",
    phone: "+91 98000 00002",
    expertise: ["Operations", "Client Success", "Delivery", "Partnerships", "Finance"],
    skills: [
      { name: "Operations", level: 94 },
      { name: "Delivery", level: 96 },
      { name: "Client Success", level: 92 },
      { name: "Finance", level: 86 },
    ],
    experience: [
      { year: "2018 — Now", role: "Co-Founder & VP", company: "Studio", desc: "Built the operating system that delivers 40+ projects a year." },
      { year: "2015 — 2018", role: "Project Director", company: "Agency", desc: "Led a 50-person delivery org across enterprise clients." },
      { year: "2012 — 2015", role: "Project Manager", company: "Consulting", desc: "Drove digital transformation for retail and BFSI giants." },
    ],
    achievements: [
      "PMP & SAFe Agilist certified",
      "98% on-time delivery rate across 200+ projects",
      "Built partnerships with AWS, Stripe, Vercel",
      "Speaker at Agile India and DeliverConf",
    ],
    projects: ["mediconnect", "rideflow", "feastly"],
    education: [
      { degree: "MBA, Operations", school: "IIM Ahmedabad", year: "2012" },
    ],
    socials: [
      { label: "LinkedIn", url: "#" },
      { label: "Twitter", url: "#" },
    ],
    accent: "12 85% 55%",
  },
  {
    slug: "sneha-jasani",
    initials: "SJ",
    name: "SNEHA JASANI",
    role: "HR",
    title: "Human Resources",
    tagline: "People first — everything else follows.",
    bio: "HR leader nurturing a culture where designers, engineers and dreamers thrive.",
    longBio:
      "Sneha leads people, culture, and talent. She's built our hiring engine, mentorship circles, and the rituals that keep the team energized. Her work makes our studio a place engineers and designers don't just work at — they grow at.",
    location: "Surat, India",
    joined: "2020",
    email: "sneha@studio.com",
    phone: "+91 98000 00003",
    expertise: ["Talent Acquisition", "Culture", "Learning & Development", "Employee Experience", "Diversity"],
    skills: [
      { name: "Talent Acquisition", level: 95 },
      { name: "Culture Building", level: 93 },
      { name: "L&D", level: 88 },
      { name: "People Analytics", level: 82 },
    ],
    experience: [
      { year: "2020 — Now", role: "Head of HR", company: "Studio", desc: "Scaled the team to 30+ with a 92% retention rate." },
      { year: "2017 — 2020", role: "HR Manager", company: "Tech Startup", desc: "Hired 60+ engineers and product folks across 3 cities." },
      { year: "2014 — 2017", role: "Recruiter", company: "Talent Agency", desc: "Placed 200+ candidates across SaaS and consumer companies." },
    ],
    achievements: [
      "SHRM-CP certified",
      "Built our 'Grow With Us' mentorship program",
      "Speaker at HR Tech Summit India",
      "Featured in 'Best Places to Work' study",
    ],
    projects: ["learnloop", "fitpulse"],
    education: [
      { degree: "MBA, Human Resources", school: "Symbiosis Pune", year: "2014" },
    ],
    socials: [
      { label: "LinkedIn", url: "#" },
      { label: "Instagram", url: "#" },
    ],
    accent: "340 85% 60%",
  },
];