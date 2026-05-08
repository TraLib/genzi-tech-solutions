import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { allProjects } from "@/data/projects";

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
          {allProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative rounded-xl border border-border bg-card/50 overflow-hidden hover:border-primary/40 transition-all duration-300"
            >
              <Link to={`/projects/${project.slug}`} className="block">
              {/* Image preview area */}
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-24 h-24 object-contain drop-shadow-lg"
                  style={{ filter: "drop-shadow(0 0 12px hsl(var(--primary) / 0.4))" }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                {/* Floating particles in card */}
                {[...Array(3)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
                    style={{ left: `${20 + j * 30}%`, top: `${30 + j * 15}%` }}
                    animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2 + j, repeat: Infinity, delay: j * 0.5 }}
                  />
                ))}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <span className="text-xs font-mono text-accent mb-2 inline-block">{project.category}</span>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-1 rounded-full border border-border bg-secondary text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/40 text-foreground font-medium hover:bg-primary/10 transition-colors">
            Explore all projects <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
