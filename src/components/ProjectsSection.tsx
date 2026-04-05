import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "FinFlow Dashboard",
    category: "Web Application",
    description: "Real-time financial analytics platform with AI-powered insights.",
    color: "from-primary/20 to-accent/20",
  },
  {
    title: "MediConnect",
    category: "Mobile App",
    description: "Healthcare appointment and telemedicine platform serving 10k+ users.",
    color: "from-accent/20 to-primary/20",
  },
  {
    title: "EcoTrack",
    category: "IoT + Cloud",
    description: "Environmental monitoring system with real-time sensor data visualization.",
    color: "from-primary/20 to-accent/10",
  },
  {
    title: "ShopSphere",
    category: "E-Commerce",
    description: "Multi-vendor marketplace with advanced inventory and payment systems.",
    color: "from-accent/10 to-primary/20",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A selection of our recent work showcasing innovation and technical excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative rounded-xl border border-border bg-card/50 overflow-hidden hover:border-primary/40 transition-all duration-300"
            >
              {/* Gradient preview area */}
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <span className="font-mono text-sm text-muted-foreground/60">{'<'}{project.category}{' />'}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs font-mono text-accent mb-2 inline-block">{project.category}</span>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
