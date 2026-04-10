import {
  Globe, Smartphone, Server, Palette, ShieldCheck, BarChart3,
  Brain, Database, Cloud, Headphones, Settings, Code2,
  type LucideIcon,
} from "lucide-react";

export interface ServiceData {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDesc: string;
  description: string;
  features: string[];
  technologies: string[];
}

export const allServices: ServiceData[] = [
  {
    slug: "web-development",
    icon: Globe,
    title: "Web Development",
    shortDesc: "Modern, performant web applications",
    description: "Custom web applications built with modern frameworks for optimal performance, scalability, and exceptional user experience. From single-page apps to complex enterprise platforms.",
    features: ["Responsive Design", "Progressive Web Apps", "E-Commerce Solutions", "CMS Development", "API Integration", "Performance Optimization"],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
  },
  {
    slug: "mobile-apps",
    icon: Smartphone,
    title: "Mobile Apps",
    shortDesc: "iOS & Android applications",
    description: "Native and cross-platform mobile applications that deliver seamless user experiences across all devices. We build apps that users love.",
    features: ["Cross-Platform Development", "Native Performance", "Push Notifications", "Offline Support", "App Store Optimization", "In-App Purchases"],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Expo"],
  },
  {
    slug: "cloud-solutions",
    icon: Server,
    title: "Cloud Solutions",
    shortDesc: "Scalable cloud infrastructure",
    description: "Scalable cloud infrastructure and DevOps services to power your digital operations. We design, deploy, and manage cloud architectures that grow with your business.",
    features: ["Cloud Migration", "Auto-Scaling", "CI/CD Pipelines", "Containerization", "Monitoring & Logging", "Cost Optimization"],
    technologies: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Jenkins"],
  },
  {
    slug: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design",
    shortDesc: "Beautiful, intuitive interfaces",
    description: "Beautiful, intuitive interfaces designed with user-centric methodologies. We create designs that are both visually stunning and functionally brilliant.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing", "Brand Identity"],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Framer", "Principle"],
  },
  {
    slug: "cybersecurity",
    icon: ShieldCheck,
    title: "Cybersecurity",
    shortDesc: "Protect your digital assets",
    description: "Comprehensive security audits, penetration testing, and secure architecture design. We keep your data and systems safe from threats.",
    features: ["Penetration Testing", "Security Audits", "Compliance (GDPR, HIPAA)", "Incident Response", "Vulnerability Assessment", "Security Training"],
    technologies: ["OWASP", "Burp Suite", "Nessus", "Wireshark", "Metasploit", "Snort"],
  },
  {
    slug: "digital-marketing",
    icon: BarChart3,
    title: "Digital Marketing",
    shortDesc: "Data-driven growth strategies",
    description: "Data-driven strategies for SEO, social media, and performance marketing campaigns that deliver measurable results and sustainable growth.",
    features: ["SEO Optimization", "Social Media Marketing", "PPC Campaigns", "Content Marketing", "Email Marketing", "Analytics & Reporting"],
    technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Mailchimp", "HubSpot", "Meta Ads"],
  },
  {
    slug: "ai-ml-solutions",
    icon: Brain,
    title: "AI & ML Solutions",
    shortDesc: "Intelligent automation & insights",
    description: "Harness the power of artificial intelligence and machine learning to automate processes, gain insights, and create intelligent applications.",
    features: ["Natural Language Processing", "Computer Vision", "Predictive Analytics", "Chatbots & Assistants", "Recommendation Systems", "Data Pipeline Automation"],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain", "Hugging Face"],
  },
  {
    slug: "database-management",
    icon: Database,
    title: "Database Management",
    shortDesc: "Reliable data infrastructure",
    description: "Design, optimize, and manage database systems that ensure your data is secure, accessible, and performant at any scale.",
    features: ["Database Design", "Migration & Optimization", "Backup & Recovery", "Real-time Sync", "Data Warehousing", "Query Optimization"],
    technologies: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Supabase", "DynamoDB"],
  },
  {
    slug: "saas-development",
    icon: Cloud,
    title: "SaaS Development",
    shortDesc: "Build scalable SaaS products",
    description: "End-to-end SaaS product development from ideation to launch. We build multi-tenant, subscription-based platforms that scale.",
    features: ["Multi-Tenancy", "Subscription Billing", "Role-Based Access", "API-First Architecture", "White-Label Solutions", "Analytics Dashboard"],
    technologies: ["React", "Node.js", "Stripe", "Auth0", "AWS", "Vercel"],
  },
  {
    slug: "it-consulting",
    icon: Headphones,
    title: "IT Consulting",
    shortDesc: "Expert technology guidance",
    description: "Strategic technology consulting to help you make informed decisions, optimize operations, and align IT with your business goals.",
    features: ["Technology Assessment", "Digital Strategy", "Vendor Selection", "Process Automation", "Team Augmentation", "Tech Stack Advisory"],
    technologies: ["Jira", "Confluence", "Slack", "Microsoft 365", "Notion", "Asana"],
  },
  {
    slug: "devops",
    icon: Settings,
    title: "DevOps & Automation",
    shortDesc: "Streamline development workflows",
    description: "Implement DevOps practices that accelerate delivery, improve reliability, and automate repetitive tasks across your development lifecycle.",
    features: ["CI/CD Pipelines", "Infrastructure as Code", "Container Orchestration", "Monitoring & Alerts", "Release Management", "Environment Management"],
    technologies: ["GitHub Actions", "Docker", "Kubernetes", "Ansible", "Prometheus", "Grafana"],
  },
  {
    slug: "custom-software",
    icon: Code2,
    title: "Custom Software",
    shortDesc: "Tailored business solutions",
    description: "Bespoke software solutions designed to address your unique business challenges. We build exactly what you need, nothing more, nothing less.",
    features: ["Requirements Analysis", "Agile Development", "System Integration", "Legacy Modernization", "API Development", "Ongoing Support"],
    technologies: ["TypeScript", "Python", "Go", "Rust", "GraphQL", "REST"],
  },
];
