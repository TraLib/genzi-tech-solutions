import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { allServices } from "@/data/services";

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

const RoadmapCard = ({ service, index }: { service: typeof allServices[0]; index: number }) => {
  const isLeft = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.6, 1]);
  const x = useTransform(scrollYProgress, [0, 0.6, 1], [isLeft ? -120 : 120, isLeft ? -30 : 30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [0.7, 0.9, 1]);

  const img = serviceImages[service.slug];

  return (
    <div ref={ref} className={`flex items-center w-full ${isLeft ? "justify-end md:justify-start" : "justify-end"}`}>
      {/* Left side card */}
      {isLeft && (
        <>
          <motion.div style={{ opacity, x, scale }} className="w-full md:w-[calc(50%-40px)]">
            <Link
              to={`/services/${service.slug}`}
              className="group block p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-glow transition-all duration-500 relative overflow-hidden"
            >
              {/* Glow accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
              
              <div className="flex items-start gap-4">
                {img && (
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all">
                    <img src={img} alt={service.title} className="w-9 h-9 object-contain" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{service.shortDesc}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
          {/* Connector line to pole */}
          <motion.div
            style={{ opacity }}
            className="hidden md:flex items-center"
          >
            <div className="w-8 h-[2px] bg-gradient-to-r from-primary/40 to-primary/80" />
          </motion.div>
        </>
      )}

      {/* Center node on pole */}
      <motion.div
        style={{ opacity, scale }}
        className="hidden md:flex relative z-10 w-14 h-14 rounded-full border-2 border-primary/60 bg-card items-center justify-center flex-shrink-0"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.2), transparent 70%)" }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-full border border-primary/40 border-t-primary border-r-primary/60 flex items-center justify-center"
        >
          <service.icon size={16} className="text-primary" />
        </motion.div>
        {/* Number badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-glow">
          {index + 1}
        </div>
      </motion.div>

      {/* Right side card */}
      {!isLeft && (
        <>
          {/* Connector line to pole */}
          <motion.div
            style={{ opacity }}
            className="hidden md:flex items-center"
          >
            <div className="w-8 h-[2px] bg-gradient-to-l from-primary/40 to-primary/80" />
          </motion.div>
          <motion.div style={{ opacity, x, scale }} className="w-full md:w-[calc(50%-40px)]">
            <Link
              to={`/services/${service.slug}`}
              className="group block p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-glow transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
              
              <div className="flex items-start gap-4">
                {img && (
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all">
                    <img src={img} alt={service.title} className="w-9 h-9 object-contain" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{service.shortDesc}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </>
      )}
    </div>
  );
};

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const poleRef = useRef<HTMLDivElement>(null);
  const [poleRotation, setPoleRotation] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.15], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Pole fill height based on scroll
  const poleFill = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);

  // Track scroll to rotate the pole orbs
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPoleRotation(v * 1440); // 4 full rotations across the section
  });

  return (
    <section id="services" className="py-24 relative" ref={containerRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            End-to-end technology solutions crafted to accelerate your business growth.
          </p>
        </motion.div>

        {/* Roadmap container */}
        <div className="relative" ref={poleRef}>
          {/* Central pole */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px]">
            {/* Pole background */}
            <div className="absolute inset-0 bg-border/40 rounded-full" />
            {/* Pole fill — glows as you scroll */}
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full"
              style={{
                height: poleFill,
                background: "linear-gradient(to bottom, hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.4))",
                boxShadow: "0 0 12px hsl(var(--primary) / 0.5), 0 0 30px hsl(var(--primary) / 0.2)",
              }}
            />

            {/* Rotating orb at fill tip */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-5 h-5"
              style={{ top: poleFill }}
            >
              <motion.div
                className="w-full h-full rounded-full border border-primary/60"
                style={{
                  rotate: poleRotation,
                  background: "conic-gradient(from 0deg, hsl(var(--primary)), transparent 40%, hsl(var(--primary) / 0.6), transparent 80%)",
                  boxShadow: "0 0 15px hsl(var(--primary) / 0.6)",
                }}
              />
            </motion.div>
          </div>

          {/* Top cap */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-3 w-7 h-7 rounded-full border-2 border-primary/50 bg-card items-center justify-center z-10">
            <motion.div
              className="w-3 h-3 rounded-full bg-primary"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          {/* Service cards */}
          <div className="flex flex-col gap-10 md:gap-16">
            {allServices.map((service, i) => (
              <RoadmapCard key={service.slug} service={service} index={i} />
            ))}
          </div>

          {/* Bottom cap */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-3 w-7 h-7 rounded-full border-2 border-primary/50 bg-card items-center justify-center z-10">
            <motion.div
              className="w-3 h-3 rounded-full bg-primary"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
