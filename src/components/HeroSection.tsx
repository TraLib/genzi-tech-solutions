import { motion } from "framer-motion";
import { ArrowRight, Code2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { allServices } from "@/data/services";

const techLogos = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
];

const hexClip = "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";

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

const HeroSection = () => {
  const hexSize = 100;
  const hexH = hexSize * 1.1547;
  const rowGap = hexH * 0.77;
  const colGap = hexSize * 1.04;

  const gridWidth = 3.5 * colGap;
  const gridHeight = 3.5 * rowGap;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Neon glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 85% 50% / 0.12), transparent 70%)" }}
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 85% 55% / 0.1), transparent 70%)" }}
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

          {/* Right visual — Hexagon honeycomb grid */}
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
                  background: "radial-gradient(circle, hsl(0 85% 50% / 0.12), transparent 70%)",
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
                      {/* Hex outer glow — pulses */}
                      <motion.div
                        className="absolute -inset-2"
                        style={{
                          clipPath: hexClip,
                          background: "hsl(0 85% 45% / 0.12)",
                          filter: "blur(10px)",
                        }}
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {/* Hex border gradient */}
                      <div
                        className="absolute inset-0 transition-all duration-300 group-hover:shadow-[0_0_40px_hsl(0_85%_50%/0.4)]"
                        style={{
                          clipPath: hexClip,
                          background: "linear-gradient(135deg, hsl(0 85% 50% / 0.4), hsl(0 85% 35% / 0.15))",
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
                          style={{ filter: "drop-shadow(0 0 8px hsl(0 85% 50% / 0.5))" }}
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
                          background: "linear-gradient(135deg, hsl(0 85% 50% / 0.12), hsl(0 85% 50% / 0.04))",
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
              whileHover={{ borderColor: "hsl(0 85% 45% / 0.4)", scale: 1.05 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1 font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech logos */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.8 }} className="mt-16 overflow-hidden">
          <p className="text-center text-xs text-muted-foreground font-mono mb-4 uppercase tracking-widest">Technologies We Work With</p>
          <div className="flex gap-8 items-center justify-center flex-wrap">
            {techLogos.map((logo, i) => (
              <motion.img key={i} src={logo} alt="technology" className="w-8 h-8 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" whileHover={{ scale: 1.2 }} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
