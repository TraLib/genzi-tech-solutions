import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const techData: Record<string, { name: string; description: string; url: string; icon: string; useCases: string[]; color: string }> = {
  "react": { name: "React", description: "A JavaScript library for building user interfaces with component-based architecture.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", icon: "⚛️", useCases: ["Single Page Apps", "Dashboards", "E-commerce", "Social Media"], color: "61DAFB" },
  "nodejs": { name: "Node.js", description: "A runtime environment that executes JavaScript server-side for scalable network applications.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", icon: "🟢", useCases: ["REST APIs", "Real-time Apps", "Microservices", "CLI Tools"], color: "339933" },
  "python": { name: "Python", description: "A versatile programming language known for simplicity, used in AI, web, and data science.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", icon: "🐍", useCases: ["Machine Learning", "Data Analysis", "Web Backends", "Automation"], color: "3776AB" },
  "flutter": { name: "Flutter", description: "Google's UI toolkit for building natively compiled cross-platform applications.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", icon: "📱", useCases: ["Mobile Apps", "Desktop Apps", "Web Apps", "Embedded"], color: "02569B" },
  "aws": { name: "AWS", description: "Amazon Web Services — the world's most comprehensive cloud computing platform.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", icon: "☁️", useCases: ["Cloud Hosting", "Serverless", "Storage", "AI Services"], color: "FF9900" },
  "docker": { name: "Docker", description: "A platform for developing, shipping, and running applications in isolated containers.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", icon: "🐳", useCases: ["Containerization", "CI/CD", "Microservices", "Dev Environments"], color: "2496ED" },
  "typescript": { name: "TypeScript", description: "A typed superset of JavaScript that compiles to plain JavaScript for safer code.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", icon: "📘", useCases: ["Enterprise Apps", "Large Codebases", "APIs", "Libraries"], color: "3178C6" },
  "javascript": { name: "JavaScript", description: "The programming language of the web, enabling interactive and dynamic web pages.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", icon: "⚡", useCases: ["Web Development", "Browser Extensions", "Games", "Servers"], color: "F7DF1E" },
  "vuejs": { name: "Vue.js", description: "A progressive JavaScript framework for building user interfaces incrementally.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", icon: "💚", useCases: ["SPAs", "Dashboards", "PWAs", "Prototypes"], color: "4FC08D" },
  "angular": { name: "Angular", description: "A platform for building mobile and desktop web applications with TypeScript.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", icon: "🅰️", useCases: ["Enterprise Apps", "CRM Systems", "Portals", "E-commerce"], color: "DD0031" },
  "swift": { name: "Swift", description: "Apple's powerful programming language for iOS, macOS, and beyond.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", icon: "🍎", useCases: ["iOS Apps", "macOS Apps", "watchOS", "Server-side"], color: "FA7343" },
  "kotlin": { name: "Kotlin", description: "A modern language for Android and JVM development with concise syntax.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", icon: "🤖", useCases: ["Android Apps", "Backend", "Multiplatform", "Scripting"], color: "7F52FF" },
  "java": { name: "Java", description: "A robust, platform-independent language used worldwide for enterprise applications.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", icon: "☕", useCases: ["Enterprise", "Android", "Big Data", "Financial Systems"], color: "007396" },
  "go": { name: "Go", description: "Google's statically typed language designed for simplicity and high performance.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg", icon: "🔵", useCases: ["Cloud Services", "CLI Tools", "Networking", "DevOps"], color: "00ADD8" },
  "rust": { name: "Rust", description: "A systems language focused on safety, speed, and concurrency without garbage collection.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg", icon: "🦀", useCases: ["Systems Programming", "WebAssembly", "Embedded", "Game Engines"], color: "000000" },
  "cplusplus": { name: "C++", description: "A high-performance language for system software, game engines, and real-time simulations.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", icon: "⚙️", useCases: ["Game Development", "OS", "Embedded", "Competitive Programming"], color: "00599C" },
  "csharp": { name: "C#", description: "Microsoft's modern language for .NET development, games (Unity), and enterprise apps.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", icon: "🎮", useCases: ["Unity Games", ".NET Apps", "Desktop", "Cloud"], color: "239120" },
  "php": { name: "PHP", description: "A server-side scripting language powering a large portion of the web.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", icon: "🐘", useCases: ["WordPress", "Laravel", "E-commerce", "CMS"], color: "777BB4" },
  "ruby": { name: "Ruby", description: "A dynamic language focused on simplicity and productivity, powering Rails.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg", icon: "💎", useCases: ["Web Apps", "Startups", "APIs", "Prototyping"], color: "CC342D" },
  "django": { name: "Django", description: "A high-level Python web framework for rapid development and clean design.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", icon: "🎸", useCases: ["Web Apps", "REST APIs", "CMS", "Data Platforms"], color: "092E20" },
  "laravel": { name: "Laravel", description: "An elegant PHP framework for web artisans with expressive syntax.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", icon: "🔴", useCases: ["Web Apps", "APIs", "E-commerce", "SaaS"], color: "FF2D20" },
  "nextjs": { name: "Next.js", description: "A React framework for production with server-side rendering and static generation.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", icon: "▲", useCases: ["SSR Apps", "E-commerce", "Blogs", "Dashboards"], color: "000000" },
  "mongodb": { name: "MongoDB", description: "A NoSQL document database for modern applications with flexible schemas.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", icon: "🍃", useCases: ["NoSQL Storage", "Real-time Analytics", "Content Management", "IoT"], color: "47A248" },
  "postgresql": { name: "PostgreSQL", description: "The world's most advanced open-source relational database.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", icon: "🐘", useCases: ["Relational Data", "GIS", "Analytics", "OLTP"], color: "4169E1" },
  "mysql": { name: "MySQL", description: "The most popular open-source relational database management system.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", icon: "🗄️", useCases: ["Web Backends", "E-commerce", "CMS", "SaaS"], color: "4479A1" },
  "redis": { name: "Redis", description: "An in-memory data store used as a database, cache, and message broker.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", icon: "🔴", useCases: ["Caching", "Sessions", "Queues", "Real-time"], color: "DC382D" },
  "firebase": { name: "Firebase", description: "Google's platform for building mobile and web applications with backend services.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", icon: "🔥", useCases: ["Auth", "Realtime DB", "Hosting", "Analytics"], color: "FFCA28" },
  "graphql": { name: "GraphQL", description: "A query language for APIs that gives clients the power to ask for exactly what they need.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", icon: "◆", useCases: ["APIs", "Data Fetching", "Microservices", "Mobile"], color: "E10098" },
  "git": { name: "Git", description: "A distributed version control system for tracking changes in source code.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", icon: "📦", useCases: ["Version Control", "Collaboration", "CI/CD", "Code Review"], color: "F05032" },
  "linux": { name: "Linux", description: "An open-source operating system kernel powering servers, devices, and supercomputers.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", icon: "🐧", useCases: ["Servers", "Embedded", "DevOps", "Cloud"], color: "FCC624" },
  "kubernetes": { name: "Kubernetes", description: "An open-source container orchestration platform for automating deployment and scaling.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", icon: "⛵", useCases: ["Container Orchestration", "Microservices", "Auto-scaling", "CI/CD"], color: "326CE5" },
  "terraform": { name: "Terraform", description: "An infrastructure-as-code tool for building and managing cloud infrastructure.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg", icon: "🏗️", useCases: ["IaC", "Cloud Provisioning", "Multi-cloud", "Automation"], color: "7B42BC" },
  "tensorflow": { name: "TensorFlow", description: "Google's open-source machine learning framework for building AI models.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", icon: "🧠", useCases: ["Deep Learning", "Computer Vision", "NLP", "Production ML"], color: "FF6F00" },
  "pytorch": { name: "PyTorch", description: "A flexible deep learning framework favored by researchers and developers.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", icon: "🔦", useCases: ["Research", "Computer Vision", "NLP", "GANs"], color: "EE4C2C" },
  "figma": { name: "Figma", description: "A collaborative design tool for building user interfaces and prototypes.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", icon: "🎨", useCases: ["UI Design", "Prototyping", "Design Systems", "Collaboration"], color: "F24E1E" },
  "tailwind": { name: "Tailwind CSS", description: "A utility-first CSS framework for rapidly building custom user interfaces.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", icon: "🌊", useCases: ["Rapid UI", "Responsive Design", "Component Styling", "Prototyping"], color: "06B6D4" },
};

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const TechDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tech = slug ? techData[slug] : null;

  if (!tech) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Technology Not Found</h1>
            <Link to="/" className="text-primary hover:underline">Go Home</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Link to="/#technologies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Technologies
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-12 mt-8">
            {/* Left - Icon */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <motion.div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, #${tech.color}22, transparent 70%)` }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm flex items-center justify-center">
                <img src={tech.url} alt={tech.name} className="w-24 h-24 md:w-36 md:h-36 object-contain" />
              </div>
            </motion.div>

            {/* Right - Details */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-xs font-mono text-accent uppercase tracking-widest">Technology</span>
              <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4">{tech.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">{tech.description}</p>

              <h3 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">Common Use Cases</h3>
              <div className="grid grid-cols-2 gap-3">
                {tech.useCases.map((useCase, i) => (
                  <motion.div
                    key={useCase}
                    className="px-4 py-3 rounded-lg border border-border/50 bg-card/40 text-sm text-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    {useCase}
                  </motion.div>
                ))}
              </div>

              <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-all"
                >
                  Build with {tech.name} <ExternalLink size={14} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export { techData, slugify };
export default TechDetailPage;
