import { motion } from "framer-motion";
import { ArrowRight, Code2, Zap, Rocket } from "lucide-react";
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

const HeroSection = () => {
  const orbitServices = allServices.slice(0, 8);
  const outerOrbitServices = allServices.slice(8);

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
      {Array.from({ length: 25 }).map((_, i) => (
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

          {/* Right visual — Orbiting services circle */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.6, duration: 0.8, type: "spring" }}
          >
            <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] mx-auto">
              {/* Outer ring — neon glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1.5px solid hsl(0 85% 45% / 0.25)",
                  boxShadow: "0 0 30px hsl(0 85% 45% / 0.1), inset 0 0 30px hsl(0 85% 45% / 0.05)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />

              {/* Second ring — dashed, neon */}
              <motion.div
                className="absolute inset-6 md:inset-8 rounded-full"
                style={{
                  border: "1px dashed hsl(0 85% 50% / 0.2)",
                  boxShadow: "0 0 20px hsl(0 85% 50% / 0.08)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner ring */}
              <motion.div
                className="absolute inset-[52px] md:inset-[70px] rounded-full"
                style={{
                  border: "1px solid hsl(0 85% 45% / 0.15)",
                  boxShadow: "0 0 15px hsl(0 85% 45% / 0.06)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              />

              {/* Center — Rocket with neon glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center relative"
                  style={{
                    background: "linear-gradient(135deg, hsl(0 0% 8%), hsl(0 0% 5%))",
                    border: "1px solid hsl(0 85% 45% / 0.3)",
                    boxShadow: "0 0 40px hsl(0 85% 45% / 0.2), 0 0 80px hsl(0 85% 45% / 0.1), inset 0 0 30px hsl(0 85% 45% / 0.05)",
                  }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Rocket animation — looping launch */}
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Rocket size={40} className="text-primary" style={{ filter: "drop-shadow(0 0 12px hsl(0 85% 50% / 0.6))" }} />
                  </motion.div>

                  {/* Flame trail */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 rounded-full"
                    style={{ background: "linear-gradient(to bottom, hsl(0 85% 50% / 0.6), transparent)" }}
                    animate={{ height: [8, 20, 8], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>

              {/* Inner orbit — 8 services auto-rotating */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {orbitServices.map((service, i) => {
                  const angle = (i / orbitServices.length) * Math.PI * 2 - Math.PI / 2;
                  const radius = 130;
                  const mdRadius = 170;
                  return (
                    <motion.div
                      key={service.slug}
                      className="absolute group"
                      style={{
                        left: `calc(50% + ${Math.cos(angle) * radius}px - 20px)`,
                        top: `calc(50% + ${Math.sin(angle) * radius}px - 20px)`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1, rotate: -360 }}
                      transition={{
                        opacity: { delay: 3.8 + i * 0.1 },
                        scale: { delay: 3.8 + i * 0.1, type: "spring" },
                        rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                      }}
                    >
                      {/* Responsive positioning via CSS */}
                      <div
                        className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center relative cursor-pointer transition-transform hover:scale-125"
                        style={{
                          background: "hsl(0 0% 6%)",
                          border: "1px solid hsl(0 85% 45% / 0.25)",
                          boxShadow: "0 0 15px hsl(0 85% 45% / 0.15), 0 0 4px hsl(0 85% 45% / 0.1)",
                        }}
                      >
                        <service.icon size={18} className="text-primary" style={{ filter: "drop-shadow(0 0 6px hsl(0 85% 50% / 0.5))" }} />
                        {/* Tooltip */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-card border border-border text-[10px] text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          {service.title}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Outer orbit — remaining services, slower rotation */}
              {outerOrbitServices.length > 0 && (
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                >
                  {outerOrbitServices.map((service, i) => {
                    const angle = (i / outerOrbitServices.length) * Math.PI * 2 - Math.PI / 2;
                    const radius = 155;
                    return (
                      <motion.div
                        key={service.slug}
                        className="absolute group"
                        style={{
                          left: `calc(50% + ${Math.cos(angle) * radius}px - 16px)`,
                          top: `calc(50% + ${Math.sin(angle) * radius}px - 16px)`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: 360 }}
                        transition={{
                          opacity: { delay: 4.2 + i * 0.1 },
                          scale: { delay: 4.2 + i * 0.1, type: "spring" },
                          rotate: { duration: 50, repeat: Infinity, ease: "linear" },
                        }}
                      >
                        <div
                          className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-125"
                          style={{
                            background: "hsl(0 0% 5%)",
                            border: "1px solid hsl(0 85% 45% / 0.18)",
                            boxShadow: "0 0 10px hsl(0 85% 45% / 0.1)",
                          }}
                        >
                          <service.icon size={14} className="text-primary/80" style={{ filter: "drop-shadow(0 0 4px hsl(0 85% 50% / 0.4))" }} />
                          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-card border border-border text-[9px] text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {service.title}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Neon pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: "1px solid hsl(0 85% 50% / 0.1)" }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
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
