import {
  LineChart, Stethoscope, Leaf, ShoppingBag, GraduationCap, Plane,
  Music, Dumbbell, Building2, Car, Utensils, Brain,
  type LucideIcon,
} from "lucide-react";

export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  color: string;
  image: string;
  client: string;
  duration: string;
  year: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  results: { label: string; value: string }[];
  gallery: string[];
}

export const allProjects: ProjectData[] = [
  {
    slug: "finflow-dashboard",
    title: "FinFlow Dashboard",
    category: "Web Application",
    description: "Real-time financial analytics platform with AI-powered insights.",
    longDescription:
      "FinFlow is an enterprise-grade analytics suite that streams live market data, runs predictive models, and surfaces personalized investment intelligence to thousands of concurrent users.",
    icon: LineChart,
    color: "from-primary/20 to-accent/20",
    image: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
    client: "Apex Capital",
    duration: "9 months",
    year: "2025",
    technologies: ["React", "TypeScript", "D3.js", "Node.js", "Postgres", "Redis", "AWS"],
    features: ["Live market streaming", "AI insights engine", "Custom dashboards", "Risk modelling", "Multi-tenant SSO", "PDF reporting"],
    challenges: ["Sub-second data refresh", "Compliance with SOC2", "Scaling to 50k concurrent traders"],
    results: [
      { label: "Daily users", value: "12k+" },
      { label: "Latency", value: "< 200ms" },
      { label: "Revenue lift", value: "+38%" },
    ],
    gallery: [
      "https://cdn-icons-png.flaticon.com/512/4222/4222019.png",
      "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
      "https://cdn-icons-png.flaticon.com/512/3281/3281289.png",
    ],
  },
  {
    slug: "mediconnect",
    title: "MediConnect",
    category: "Mobile App",
    description: "Healthcare appointment and telemedicine platform serving 10k+ users.",
    longDescription:
      "MediConnect bridges patients and providers with secure video consultations, e-prescriptions, and an intelligent appointment engine across iOS and Android.",
    icon: Stethoscope,
    color: "from-accent/20 to-primary/20",
    image: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
    client: "HealthBridge Inc.",
    duration: "7 months",
    year: "2025",
    technologies: ["React Native", "Expo", "WebRTC", "Firebase", "Stripe", "Twilio"],
    features: ["HD video consults", "E-prescriptions", "Smart scheduling", "HIPAA-grade chat", "Insurance billing", "Wearable sync"],
    challenges: ["End-to-end encryption", "Cross-platform parity", "Low-bandwidth video"],
    results: [
      { label: "Active patients", value: "10k+" },
      { label: "Avg. rating", value: "4.8★" },
      { label: "Wait time", value: "-65%" },
    ],
    gallery: [
      "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
      "https://cdn-icons-png.flaticon.com/512/3departments/3departments.png",
      "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    ],
  },
  {
    slug: "ecotrack",
    title: "EcoTrack",
    category: "IoT + Cloud",
    description: "Environmental monitoring system with real-time sensor data visualization.",
    longDescription:
      "EcoTrack ingests data from thousands of distributed environmental sensors and visualizes air, water, and soil health on an interactive geospatial dashboard.",
    icon: Leaf,
    color: "from-primary/20 to-accent/10",
    image: "https://cdn-icons-png.flaticon.com/512/2917/2917995.png",
    client: "GreenGrid Foundation",
    duration: "11 months",
    year: "2024",
    technologies: ["Next.js", "MQTT", "InfluxDB", "Grafana", "AWS IoT", "Mapbox"],
    features: ["Live sensor map", "Alert thresholds", "Historical analytics", "Open data API", "Mobile field app", "Citizen reports"],
    challenges: ["Edge offline buffering", "Multi-region sync", "Battery-efficient firmware"],
    results: [
      { label: "Sensors online", value: "5,200" },
      { label: "Cities", value: "42" },
      { label: "Alerts/day", value: "180" },
    ],
    gallery: [
      "https://cdn-icons-png.flaticon.com/512/2917/2917995.png",
      "https://cdn-icons-png.flaticon.com/512/484/484167.png",
      "https://cdn-icons-png.flaticon.com/512/3094/3094842.png",
    ],
  },
  {
    slug: "shopsphere",
    title: "ShopSphere",
    category: "E-Commerce",
    description: "Multi-vendor marketplace with advanced inventory and payment systems.",
    longDescription:
      "ShopSphere powers a multi-vendor marketplace with intelligent inventory, dynamic pricing, and a frictionless checkout that converts at industry-leading rates.",
    icon: ShoppingBag,
    color: "from-accent/10 to-primary/20",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
    client: "BazaarX",
    duration: "10 months",
    year: "2025",
    technologies: ["Next.js", "Stripe", "Algolia", "Postgres", "Vercel", "Sanity"],
    features: ["Vendor onboarding", "AI product search", "Subscription orders", "Loyalty engine", "Multi-currency", "Headless CMS"],
    challenges: ["Real-time inventory", "Global tax compliance", "Sub-second search"],
    results: [
      { label: "GMV", value: "$24M" },
      { label: "Vendors", value: "1,400" },
      { label: "Conversion", value: "+27%" },
    ],
    gallery: [
      "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
      "https://cdn-icons-png.flaticon.com/512/891/891462.png",
      "https://cdn-icons-png.flaticon.com/512/2331/2331966.png",
    ],
  },
  {
    slug: "learnloop",
    title: "LearnLoop LMS",
    category: "EdTech Platform",
    description: "Adaptive learning platform with gamified courses and AI tutors.",
    longDescription:
      "LearnLoop personalizes learning journeys for K-12 and adult learners with AI tutors, adaptive assessments, and rich live-class tooling.",
    icon: GraduationCap,
    color: "from-primary/20 to-accent/20",
    image: "https://cdn-icons-png.flaticon.com/512/3976/3976625.png",
    client: "EduNova",
    duration: "8 months",
    year: "2025",
    technologies: ["React", "tRPC", "Prisma", "OpenAI", "WebRTC", "Postgres"],
    features: ["AI tutor chat", "Adaptive quizzes", "Live classrooms", "Gamified XP", "Parent portal", "Offline lessons"],
    challenges: ["Personalization at scale", "Live class reliability", "Content moderation"],
    results: [
      { label: "Students", value: "85k" },
      { label: "Course completion", value: "+54%" },
      { label: "NPS", value: "72" },
    ],
    gallery: [
      "https://cdn-icons-png.flaticon.com/512/3976/3976625.png",
      "https://cdn-icons-png.flaticon.com/512/2620/2620634.png",
      "https://cdn-icons-png.flaticon.com/512/2784/2784065.png",
    ],
  },
  {
    slug: "skyroute",
    title: "SkyRoute",
    category: "Travel Platform",
    description: "AI-driven flight and itinerary planner with dynamic pricing.",
    longDescription:
      "SkyRoute orchestrates multi-leg journeys, predicts the best booking windows, and stitches together flights, stays, and experiences in a single seamless flow.",
    icon: Plane,
    color: "from-accent/20 to-primary/10",
    image: "https://cdn-icons-png.flaticon.com/512/201/201623.png",
    client: "Voyagr",
    duration: "6 months",
    year: "2024",
    technologies: ["Next.js", "Python", "FastAPI", "Postgres", "Stripe", "Mapbox"],
    features: ["Smart itineraries", "Fare prediction", "Group bookings", "Loyalty miles", "Visa assistant", "Trip wallet"],
    challenges: ["Live fare APIs", "Multi-currency settlement", "Personalization"],
    results: [
      { label: "Trips booked", value: "320k" },
      { label: "Avg. savings", value: "$112" },
      { label: "Repeat rate", value: "61%" },
    ],
    gallery: [
      "https://cdn-icons-png.flaticon.com/512/201/201623.png",
      "https://cdn-icons-png.flaticon.com/512/2972/2972216.png",
      "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    ],
  },
  {
    slug: "soundwave",
    title: "SoundWave",
    category: "Music Streaming",
    description: "High-fidelity music streaming app with personalized AI playlists.",
    longDescription:
      "SoundWave delivers lossless audio, deep personalization, and creator-first analytics for an emerging generation of independent artists and listeners.",
    icon: Music,
    color: "from-primary/20 to-accent/30",
    image: "https://cdn-icons-png.flaticon.com/512/727/727245.png",
    client: "WaveLabs",
    duration: "9 months",
    year: "2025",
    technologies: ["React Native", "Node.js", "Redis", "S3", "Elasticsearch"],
    features: ["Lossless audio", "AI playlists", "Creator studio", "Social listening", "Offline mode", "Live sessions"],
    challenges: ["Bandwidth optimization", "Royalty engine", "Creator analytics"],
    results: [
      { label: "MAU", value: "1.2M" },
      { label: "Listening time", value: "+44%" },
      { label: "Artists", value: "9k" },
    ],
    gallery: [
      "https://cdn-icons-png.flaticon.com/512/727/727245.png",
      "https://cdn-icons-png.flaticon.com/512/3659/3659784.png",
      "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
    ],
  },
  {
    slug: "fitpulse",
    title: "FitPulse",
    category: "Health & Fitness",
    description: "Wearable-connected fitness coach with adaptive workout plans.",
    longDescription:
      "FitPulse syncs with leading wearables to deliver real-time coaching, recovery insights, and adaptive plans tuned to each user's biometrics.",
    icon: Dumbbell,
    color: "from-accent/30 to-primary/10",
    image: "https://cdn-icons-png.flaticon.com/512/2964/2964514.png",
    client: "PulseFit Studios",
    duration: "5 months",
    year: "2025",
    technologies: ["Flutter", "HealthKit", "Google Fit", "Firebase", "Node.js"],
    features: ["Live HR coaching", "Recovery score", "Adaptive plans", "Nutrition log", "Community challenges", "Wearable sync"],
    challenges: ["Multi-device sync", "Real-time HR pipeline", "Personalization models"],
    results: [
      { label: "Active users", value: "240k" },
      { label: "Workout streak", value: "21d avg" },
      { label: "Retention 30d", value: "68%" },
    ],
    gallery: [
      "https://cdn-icons-png.flaticon.com/512/2964/2964514.png",
      "https://cdn-icons-png.flaticon.com/512/2829/2829830.png",
      "https://cdn-icons-png.flaticon.com/512/1041/1041873.png",
    ],
  },
  {
    slug: "estatehub",
    title: "EstateHub",
    category: "PropTech",
    description: "3D virtual property tours with smart mortgage matchmaking.",
    longDescription:
      "EstateHub combines immersive 3D tours, AI valuation, and instant mortgage pre-approvals to redefine the home-buying journey.",
    icon: Building2,
    color: "from-primary/10 to-accent/20",
    image: "https://cdn-icons-png.flaticon.com/512/489/489969.png",
    client: "NovaRealty",
    duration: "7 months",
    year: "2024",
    technologies: ["React", "Three.js", "Mapbox", "Node.js", "Stripe", "Postgres"],
    features: ["3D tours", "AI valuation", "Mortgage match", "Smart filters", "Agent CRM", "Document e-sign"],
    challenges: ["Realistic 3D streaming", "Lender integrations", "Document compliance"],
    results: [
      { label: "Listings", value: "62k" },
      { label: "Tour completion", value: "+78%" },
      { label: "Loans matched", value: "$310M" },
    ],
    gallery: [
      "https://cdn-icons-png.flaticon.com/512/489/489969.png",
      "https://cdn-icons-png.flaticon.com/512/1946/1946488.png",
      "https://cdn-icons-png.flaticon.com/512/2784/2784403.png",
    ],
  },
  {
    slug: "rideflow",
    title: "RideFlow",
    category: "Mobility",
    description: "Electric vehicle ride-sharing network with smart fleet routing.",
    longDescription:
      "RideFlow operates an EV-only ride-sharing fleet powered by ML routing, predictive charging, and a delightful rider experience across major cities.",
    icon: Car,
    color: "from-accent/10 to-primary/30",
    image: "https://cdn-icons-png.flaticon.com/512/3097/3097180.png",
    client: "Voltride",
    duration: "12 months",
    year: "2025",
    technologies: ["React Native", "Go", "PostGIS", "Kafka", "AWS", "Mapbox"],
    features: ["ML routing", "Driver app", "Predictive charging", "Carbon dashboard", "Loyalty pass", "In-app payments"],
    challenges: ["Realtime routing", "Charge-station integration", "Surge pricing fairness"],
    results: [
      { label: "Rides/month", value: "1.8M" },
      { label: "CO₂ saved", value: "9.4kt" },
      { label: "Driver earnings", value: "+22%" },
    ],
    gallery: [
      "https://cdn-icons-png.flaticon.com/512/3097/3097180.png",
      "https://cdn-icons-png.flaticon.com/512/2972/2972216.png",
      "https://cdn-icons-png.flaticon.com/512/484/484167.png",
    ],
  },
  {
    slug: "feastly",
    title: "Feastly",
    category: "Food & Delivery",
    description: "Cloud-kitchen ordering platform with hyper-local logistics.",
    longDescription:
      "Feastly powers ghost kitchens with menu engineering, smart dispatch, and a customer-loved app that turns first-time orders into loyal habits.",
    icon: Utensils,
    color: "from-primary/30 to-accent/10",
    image: "https://cdn-icons-png.flaticon.com/512/3170/3170733.png",
    client: "Feastly Co.",
    duration: "6 months",
    year: "2024",
    technologies: ["Next.js", "Node.js", "Postgres", "Twilio", "Stripe", "Mapbox"],
    features: ["Smart dispatch", "Menu engineering", "Loyalty engine", "Promo studio", "POS integrations", "Analytics suite"],
    challenges: ["Last-mile latency", "Demand forecasting", "Multi-brand kitchens"],
    results: [
      { label: "Orders/day", value: "42k" },
      { label: "Delivery time", value: "-31%" },
      { label: "Repeat rate", value: "58%" },
    ],
    gallery: [
      "https://cdn-icons-png.flaticon.com/512/3170/3170733.png",
      "https://cdn-icons-png.flaticon.com/512/562/562678.png",
      "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    ],
  },
  {
    slug: "neurosense",
    title: "NeuroSense",
    category: "AI Research",
    description: "Generative AI workbench for medical imaging and diagnostics.",
    longDescription:
      "NeuroSense empowers radiologists with a collaborative AI workbench that accelerates triage, annotation, and diagnostic reporting at hospital scale.",
    icon: Brain,
    color: "from-accent/20 to-primary/20",
    image: "https://cdn-icons-png.flaticon.com/512/4359/4359963.png",
    client: "VitaScan Labs",
    duration: "14 months",
    year: "2025",
    technologies: ["Python", "PyTorch", "FastAPI", "React", "Postgres", "K8s"],
    features: ["Image triage", "AI annotations", "DICOM viewer", "Reporting AI", "Audit trail", "Role-based access"],
    challenges: ["Model accuracy", "PHI data handling", "Hospital integrations"],
    results: [
      { label: "Scans/day", value: "18k" },
      { label: "Triage time", value: "-58%" },
      { label: "Hospitals", value: "32" },
    ],
    gallery: [
      "https://cdn-icons-png.flaticon.com/512/4359/4359963.png",
      "https://cdn-icons-png.flaticon.com/512/4380/4380285.png",
      "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
    ],
  },
];