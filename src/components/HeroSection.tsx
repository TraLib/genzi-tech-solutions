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

// Hexagon clip path
const hexClip = "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";

// Honeycomb hex positions (row, col) for a nice honeycomb grid
// Row 0: 2 hexes, Row 1: 3 hexes, Row 2: 4 hexes, Row 3: 3 hexes
const hexLayout = [
  // Row 0 — top
  { row: 0, col: 0.5 },
  { row: 0, col: 1.5 },
  // Row 1
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  // Row 2 — center (widest)
  { row: 2, col: -0.5 },
  { row: 2, col: 0.5 },
  { row: 2, col: 1.5 },
  { row: 2, col: 2.5 },
  // Row 3
  { row: 3, col: 0 },
  { row: 3, col: 1 },
  { row: 3, col: 2 },
];

const HeroSection = () => {
  const hexSize = 72; // px width of each hex
  const hexH = hexSize * 1.1547; // height for regular hex
  const rowGap = hexH * 0.76;
  const colGap = hexSize * 1.02;

  // Center the grid
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
              style={{ width: gridWidth + hexSize, height: gridHeight + hexH }}
            >
              {/* Connecting lines glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, hsl(0 85% 45% / 0.08) 0%, transparent 70%)",
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {hexLayout.map((pos, i) => {
                const service = allServices[i % allServices.length];
                const isOddRow = pos.row % 2 !== 0;
                const offsetX = isOddRow ? 0 : colGap * 0.0; // already handled in col
                const x = (pos.col + 0.5) * colGap + offsetX;
                const y = pos.row * rowGap;

                return (
                  <motion.div
                    key={service.slug + "-" + i}
                    className="absolute group cursor-pointer"
                    style={{
                      left: x,
                      top: y,
                      width: hexSize,
                      height: hexH,
                    }}
                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      delay: 3.8 + i * 0.08,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.15, zIndex: 20 }}
                  >
                    {/* Hex outer glow */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        clipPath: hexClip,
                        background: "hsl(0 85% 45% / 0.15)",
                        filter: "blur(8px)",
                      }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Hex border */}
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath: hexClip,
                        background: "linear-gradient(135deg, hsl(0 85% 50% / 0.3), hsl(0 85% 35% / 0.15))",
                      }}
                    />

                    {/* Hex inner */}
                    <div
                      className="absolute inset-[2px] flex flex-col items-center justify-center gap-1 transition-all duration-300"
                      style={{
                        clipPath: hexClip,
                        background: "linear-gradient(160deg, hsl(0 0% 8%), hsl(0 0% 4%))",
                        boxShadow: "inset 0 0 20px hsl(0 85% 45% / 0.05)",
                      }}
                    >
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      >
                        <service.icon
                          size={20}
                          className="text-primary"
                          style={{ filter: "drop-shadow(0 0 8px hsl(0 85% 50% / 0.6))" }}
                        />
                      </motion.div>
                      <span className="text-[8px] md:text-[9px] font-mono text-muted-foreground text-center leading-tight px-1 max-w-[60px]">
                        {service.title}
                      </span>
                    </div>

                    {/* Hover tooltip */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-card border border-primary/20 text-[10px] text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg">
                      {service.shortDesc}
                    </div>

                    {/* Neon pulse on hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        clipPath: hexClip,
                        boxShadow: "0 0 30px hsl(0 85% 50% / 0.4), inset 0 0 20px hsl(0 85% 50% / 0.1)",
                        background: "hsl(0 85% 50% / 0.05)",
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Center glow pulse */}
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  width: 200,
                  height: 200,
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(circle, hsl(0 85% 50% / 0.1), transparent 70%)",
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
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
