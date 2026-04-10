import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { allServices } from "@/data/services";

const ServiceCard = ({ service, index }: { service: typeof allServices[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.95, 1]);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale }}>
      <Link
        to={`/services/${service.slug}`}
        className="group block p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-glow transition-all duration-300 h-full"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.6, type: "spring" }}
          className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-all"
        >
          <service.icon size={22} className="text-primary" />
        </motion.div>
        <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {service.shortDesc}
        </p>
        <span className="inline-flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Learn More <ArrowRight size={12} />
        </span>
      </Link>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
