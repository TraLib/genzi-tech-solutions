import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Smartphone, Server, Palette, ShieldCheck, BarChart3 } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks for optimal performance and scalability.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that deliver seamless user experiences.",
  },
  {
    icon: Server,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and DevOps services to power your digital operations.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces designed with user-centric methodologies.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    description: "Comprehensive security audits, penetration testing, and secure architecture design.",
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    description: "Data-driven strategies for SEO, social media, and performance marketing campaigns.",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.95, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale, rotateX }}
      className="group p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-glow transition-all duration-300"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
        className="w-12 h-12 rounded-lg bg-gradient-glow flex items-center justify-center mb-5 group-hover:bg-gradient-primary transition-all"
      >
        <service.icon size={22} className="text-primary group-hover:text-primary-foreground transition-colors" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 + index * 0.1 }}
        className="text-lg font-semibold mb-2 text-foreground"
      >
        {service.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + index * 0.1 }}
        className="text-sm text-muted-foreground leading-relaxed"
      >
        {service.description}
      </motion.p>
    </motion.div>
  );
};

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="services" className="py-24 relative" ref={containerRef}>
      <div className="container mx-auto px-6">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            End-to-end technology solutions crafted to accelerate your business growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
