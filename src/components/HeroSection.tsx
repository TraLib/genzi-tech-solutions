import { motion } from "framer-motion";
import { ArrowRight, Code2, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { allServices } from "@/data/services";
import { slugify } from "@/pages/TechDetailPage";
import { allServices } from "@/data/services";

// Service images (transparent PNG illustrations)
const serviceImages: Record<string, string> = {
  "web-development": "https://cdn-icons-png.flaticon.com/512/1055/1055666.png",
  "mobile-apps": "https://cdn-icons-png.flaticon.com/512/2920/2920349.png",
  "cloud-solutions": "https://cdn-icons-png.flaticon.com/512/4215/4215831.png",
  "ui-ux-design": "https://cdn-icons-png.flaticon.com/512/2620/2620634.png",
  "cybersecurity": "https://cdn-icons-png.flaticon.com/512/2092/2092663.png",
  "digital-marketing": "https://cdn-icons-png.flaticon.com/512/1998/1998087.png",
  "ai-ml-solutions": "https://cdn-icons-png.flaticon.com/512/4529/4529980.png",
  "database-management": "https://cdn-icons-png.flaticon.com/512/2906/2906274.png",
  "saas-development": "https://cdn-icons-png.flaticon.com/512/2282/2282188.png",
  "it-consulting": "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
  "devops": "https://cdn-icons-png.flaticon.com/512/10169/10169724.png",
  "custom-software": "https://cdn-icons-png.flaticon.com/512/1005/1005141.png",
};

const hexClip = "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";

// Honeycomb layout positions
const hexLayout = [
  { row: 0, col: 0.5 },
  { row: 0, col: 1.5 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  { row: 2, col: -0.5 },
  { row: 2, col: 0.5 },
  { row: 2, col: 1.5 },
  { row: 2, col: 2.5 },
  { row: 3, col: 0 },
  { row: 3, col: 1 },
  { row: 3, col: 2 },
];

// 50+ technology logos
const techLogos = [
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Flutter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Vue.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  { name: "Angular", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Swift", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
  { name: "Kotlin", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
  { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Go", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
  { name: "Rust", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
  { name: "C++", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "C#", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "PHP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "Ruby", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
  { name: "Django", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Laravel", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "GraphQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Terraform", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
  { name: "Jenkins", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
  { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Sass", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
  { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Bootstrap", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Webpack", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
  { name: "Nginx", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "Electron", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" },
  { name: "Unity", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
  { name: "TensorFlow", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "Pandas", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "NumPy", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { name: "Dart", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { name: "Svelte", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
  { name: "Elixir", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg" },
  { name: "Scala", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg" },
  { name: "Haskell", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg" },
  { name: "R", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
  { name: "Solidity", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
  { name: "Bash", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
  { name: "Vim", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg" },
  { name: "VS Code", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
];

// Inverted triangle (▽): widest row first, narrowing down
const invertedTriangleRows = [13, 11, 9, 7, 5, 3, 1];

const HeroSection = () => {
  const hexSize = 100;
  const hexH = hexSize * 1.1547;
  const rowGap = hexH * 0.77;
  const colGap = hexSize * 1.04;

  const gridWidth = 3.5 * colGap;
  const gridHeight = 3.5 * rowGap;

  // Build triangle layout data
  let techIdx = 0;
  const triangleData: { row: number; logos: typeof techLogos }[] = [];
  for (const count of triangleRows) {
    const rowLogos = techLogos.slice(techIdx, techIdx + count);
    triangleData.push({ row: triangleData.length, logos: rowLogos });
    techIdx += count;
    if (techIdx >= techLogos.length) break;
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Neon glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.12), transparent 70%)" }}
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.1), transparent 70%)" }}
        animate={{ x: [0, -40, 50, 0], y: [0, 50, -30, 0], scale: [1, 0.85, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particle dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/40 pointer-events-none"
          style={{ left: `${5 + Math.random() * 90}%`, top: `${5 + Math.random() * 90}%` }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-6"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                <Zap size={14} className="text-accent" />
              </motion.div>
              <span className="text-xs font-mono text-accent">Innovating the Digital Future</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              <motion.span className="block" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.5, duration: 0.6 }}>
                We Build
              </motion.span>
              <motion.span className="block text-gradient" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.7, duration: 0.6 }}>
                Digital Excellence
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.9, duration: 0.5 }}
              className="max-w-lg text-muted-foreground text-lg mb-8 leading-relaxed"
            >
              We craft cutting-edge software solutions, mobile apps, and web platforms that drive businesses forward.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-all"
              >
                Start a Project
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-border text-foreground font-medium hover:bg-card hover:border-primary/30 transition-all"
              >
                <Code2 size={16} /> Our Services
              </Link>
            </motion.div>
          </div>

          {/* Right visual — Hexagon honeycomb grid with lightning borders */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.6, duration: 0.8, type: "spring" }}
          >
            <div
              className="relative mx-auto"
              style={{ width: gridWidth + hexSize + 20, height: gridHeight + hexH + 20 }}
            >
              {/* Center glow */}
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: "50%", top: "50%", width: 280, height: 280,
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(circle, hsl(var(--primary) / 0.12), transparent 70%)",
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {hexLayout.map((pos, i) => {
                const service = allServices[i % allServices.length];
                const x = (pos.col + 0.5) * colGap;
                const y = pos.row * rowGap;
                const img = serviceImages[service.slug];

                return (
                  <Link to={`/services/${service.slug}`} key={service.slug + "-" + i}>
                    <motion.div
                      className="absolute group cursor-pointer"
                      style={{ left: x, top: y, width: hexSize, height: hexH }}
                      initial={{ opacity: 0, scale: 0, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        delay: 3.8 + i * 0.08,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.2,
                        zIndex: 20,
                        transition: { duration: 0.3, type: "spring", stiffness: 300 },
                      }}
                    >
                      {/* Lightning outer glow — animated electric pulse */}
                      <motion.div
                        className="absolute -inset-3"
                        style={{
                          clipPath: hexClip,
                          filter: "blur(6px)",
                        }}
                        animate={{
                          background: [
                            "linear-gradient(0deg, hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.05))",
                            "linear-gradient(60deg, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.3))",
                            "linear-gradient(120deg, hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.05))",
                            "linear-gradient(180deg, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.3))",
                            "linear-gradient(240deg, hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.05))",
                            "linear-gradient(300deg, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.4))",
                            "linear-gradient(360deg, hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.05))",
                          ],
                          opacity: [0.4, 1, 0.6, 1, 0.4],
                        }}
                        transition={{
                          duration: 2 + (i % 3) * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Lightning border — electric arc effect */}
                      <motion.div
                        className="absolute -inset-[1px]"
                        style={{ clipPath: hexClip }}
                        animate={{
                          background: [
                            "conic-gradient(from 0deg, hsl(var(--primary) / 0.8), transparent 30%, hsl(var(--primary) / 0.6), transparent 60%, hsl(var(--primary) / 0.9), transparent 90%)",
                            "conic-gradient(from 120deg, hsl(var(--primary) / 0.9), transparent 30%, hsl(var(--primary) / 0.7), transparent 60%, hsl(var(--primary) / 0.8), transparent 90%)",
                            "conic-gradient(from 240deg, hsl(var(--primary) / 0.7), transparent 30%, hsl(var(--primary) / 0.9), transparent 60%, hsl(var(--primary) / 0.6), transparent 90%)",
                            "conic-gradient(from 360deg, hsl(var(--primary) / 0.8), transparent 30%, hsl(var(--primary) / 0.6), transparent 60%, hsl(var(--primary) / 0.9), transparent 90%)",
                          ],
                          boxShadow: [
                            "inset 0 0 15px hsl(var(--primary) / 0.3)",
                            "inset 0 0 25px hsl(var(--primary) / 0.5)",
                            "inset 0 0 10px hsl(var(--primary) / 0.2)",
                            "inset 0 0 20px hsl(var(--primary) / 0.4)",
                          ],
                        }}
                        transition={{
                          duration: 1.5 + (i % 4) * 0.3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Hex inner fill */}
                      <div
                        className="absolute inset-[2px] flex flex-col items-center justify-center gap-1.5 transition-all duration-300"
                        style={{
                          clipPath: hexClip,
                          background: "linear-gradient(160deg, hsl(0 0% 9%), hsl(0 0% 4%))",
                        }}
                      >
                        {/* Service image */}
                        <motion.img
                          src={img}
                          alt={service.title}
                          className="w-8 h-8 md:w-10 md:h-10 object-contain"
                          style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))" }}
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                        />

                        {/* Service title */}
                        <span className="text-[8px] md:text-[10px] font-semibold text-foreground/90 text-center leading-tight px-2 max-w-[85px]">
                          {service.title}
                        </span>
                      </div>

                      {/* Hover neon overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          clipPath: hexClip,
                          background: "linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--primary) / 0.04))",
                        }}
                      />

                      {/* Tooltip */}
                      <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-md bg-card border border-primary/25 text-[10px] text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-xl font-mono">
                        {service.shortDesc}
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.4, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "150+", label: "Projects Delivered" },
            { value: "50+", label: "Happy Clients" },
            { value: "5+", label: "Years Experience" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.5 + i * 0.1 }}
              whileHover={{ borderColor: "hsl(var(--primary) / 0.4)", scale: 1.05 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1 font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech logos — Triangle layout */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.8 }} className="mt-20 overflow-hidden">
          <p className="text-center text-xs text-muted-foreground font-mono mb-8 uppercase tracking-widest">Technologies We Work With</p>
          <div className="flex flex-col items-center gap-3">
            {triangleData.map((row, rowIdx) => (
              <motion.div
                key={rowIdx}
                className="flex items-center justify-center gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5 + rowIdx * 0.1 }}
              >
                {row.logos.map((logo, logoIdx) => (
                  <motion.div
                    key={logo.name}
                    className="group relative w-10 h-10 md:w-12 md:h-12 rounded-lg border border-border/30 bg-card/40 backdrop-blur-sm flex items-center justify-center hover:border-primary/50 transition-all duration-300"
                    whileHover={{ scale: 1.3, zIndex: 10 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 5.1 + rowIdx * 0.08 + logoIdx * 0.03 }}
                  >
                    <img
                      src={logo.url}
                      alt={logo.name}
                      className="w-6 h-6 md:w-7 md:h-7 opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-card border border-border text-[9px] text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-mono">
                      {logo.name}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
