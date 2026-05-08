import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Calendar, User, Clock, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { allProjects } from "@/data/projects";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = allProjects.find((p) => p.slug === slug);
  const idx = allProjects.findIndex((p) => p.slug === slug);

  if (!project) {
    return (
      <>
        <CustomCursor />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <Link to="/projects" className="text-primary hover:underline">← Back to Projects</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const prev = idx > 0 ? allProjects[idx - 1] : null;
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;
  const Icon = project.icon;

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <section className={`relative py-24 overflow-hidden bg-gradient-to-br ${project.color}`}>
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
            >
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-foreground">Projects</Link>
              <span>/</span>
              <span className="text-foreground">{project.title}</span>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <span className="text-xs font-mono text-accent uppercase tracking-widest">{project.category}</span>
                <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-5">
                  <span className="text-gradient">{project.title}</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">{project.longDescription}</p>
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><User size={14} className="text-primary" /> {project.client}</div>
                  <div className="flex items-center gap-2"><Clock size={14} className="text-primary" /> {project.duration}</div>
                  <div className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {project.year}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative aspect-square max-w-md mx-auto w-full"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-glow blur-3xl opacity-60" />
                <div className="absolute inset-4 rounded-2xl border border-primary/30 bg-card/40 backdrop-blur-md flex items-center justify-center">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-1/2 h-1/2 object-contain"
                    style={{ filter: "drop-shadow(0 0 25px hsl(var(--primary) / 0.5))" }}
                    animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <motion.div
                  className="absolute -top-4 -right-4 w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  <Icon size={26} className="text-primary-foreground" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Results metrics */}
        <section className="py-16 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="grid sm:grid-cols-3 gap-6">
              {project.results.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-8 rounded-2xl border border-border bg-card/50"
                >
                  <div className="text-5xl font-bold text-gradient mb-2">{r.value}</div>
                  <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{r.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features & Challenges */}
        <section className="py-20">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Sparkles size={20} className="text-primary" /> Key Features</h2>
              <div className="space-y-3">
                {project.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card/50">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6">Challenges We Solved</h2>
              <div className="space-y-4">
                {project.challenges.map((c, i) => (
                  <div key={c} className="relative pl-8 pb-4 border-l border-border last:border-l-transparent">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-glow" />
                    <div className="text-xs font-mono text-accent mb-1">CHALLENGE 0{i + 1}</div>
                    <p className="text-sm text-foreground">{c}</p>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-semibold mt-10 mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full border border-border bg-card/50 text-xs font-mono text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 bg-card/20">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Project Visualization</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {project.gallery.map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`aspect-square rounded-2xl border border-border bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden group`}
                >
                  <motion.img
                    src={g}
                    alt=""
                    className="w-1/3 h-1/3 object-contain"
                    style={{ filter: "drop-shadow(0 0 18px hsl(var(--primary) / 0.4))" }}
                    whileHover={{ scale: 1.2, rotate: 6 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + Nav */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center p-10 rounded-2xl border border-border bg-card/50 mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Have a similar project in mind?</h3>
              <p className="text-muted-foreground max-w-lg mx-auto mb-6">Let's craft something unforgettable together.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-opacity">
                Start a Project <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-8">
              {prev ? (
                <Link to={`/projects/${prev.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft size={16} /> {prev.title}
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/projects/${next.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {next.title} <ArrowRight size={16} />
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetailPage;