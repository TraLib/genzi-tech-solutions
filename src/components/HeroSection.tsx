import { motion } from "framer-motion";
import { ArrowRight, Code2, Zap, Rocket, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const floatingIcons = [
  { Icon: Code2, x: "10%", y: "20%", delay: 0, size: 28 },
  { Icon: Globe, x: "85%", y: "15%", delay: 0.3, size: 24 },
  { Icon: Shield, x: "75%", y: "70%", delay: 0.6, size: 26 },
  { Icon: Rocket, x: "15%", y: "75%", delay: 0.9, size: 22 },
  { Icon: Zap, x: "50%", y: "10%", delay: 1.2, size: 20 },
];

const techLogos = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 85% 45% / 0.15), transparent 70%)" }}
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 85% 55% / 0.12), transparent 70%)" }}
        animate={{ x: [0, -40, 50, 0], y: [0, 50, -30, 0], scale: [1, 0.85, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-primary/20"
          style={{ left: x, top: y }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay, ease: "easeInOut" }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      {/* Particle dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/30 pointer-events-none"
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
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
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
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.5, duration: 0.6 }}
              >
                We Build
              </motion.span>
              <motion.span
                className="block text-gradient"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.7, duration: 0.6 }}
              >
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
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
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

          {/* Right visual */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.6, duration: 0.8, type: "spring" }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              {/* Rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-primary/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Center logo area */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-card/80 backdrop-blur-xl border border-primary/20 flex items-center justify-center shadow-glow"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Rocket size={48} className="text-primary" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Orbiting tech logos */}
              {techLogos.map((logo, i) => {
                const angle = (i / techLogos.length) * Math.PI * 2;
                const radius = 140;
                return (
                  <motion.div
                    key={i}
                    className="absolute w-10 h-10 md:w-12 md:h-12 rounded-xl bg-card/90 backdrop-blur-sm border border-border p-2 flex items-center justify-center"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * radius}px - 20px)`,
                      top: `calc(50% + ${Math.sin(angle) * radius}px - 20px)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 4.0 + i * 0.15, type: "spring" }}
                    whileHover={{ scale: 1.3, zIndex: 10 }}
                  >
                    <img src={logo} alt="tech" className="w-full h-full object-contain" />
                  </motion.div>
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

        {/* Tech logos marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8 }}
          className="mt-16 overflow-hidden"
        >
          <p className="text-center text-xs text-muted-foreground font-mono mb-4 uppercase tracking-widest">Technologies We Work With</p>
          <div className="flex gap-8 items-center justify-center flex-wrap">
            {techLogos.map((logo, i) => (
              <motion.img
                key={i}
                src={logo}
                alt="technology"
                className="w-8 h-8 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
