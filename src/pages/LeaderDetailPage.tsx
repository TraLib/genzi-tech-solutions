import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Award, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { allLeaders } from "@/data/leaders";
import { allProjects } from "@/data/projects";

const LeaderDetailPage = () => {
  const { slug } = useParams();
  const leader = allLeaders.find((l) => l.slug === slug);

  if (!leader) {
    return (
      <>
        <CustomCursor />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Leader Not Found</h1>
            <Link to="/community" className="text-primary hover:underline">← Back to Community</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const featuredProjects = allProjects.filter((p) => leader.projects.includes(p.slug));
  const accentStyle = { background: `linear-gradient(135deg, hsl(${leader.accent}), hsl(0 85% 45%))` };

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
            style={accentStyle}
          />
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/community" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
              <ArrowLeft size={16} /> Back to Community
            </Link>

            <div className="grid lg:grid-cols-[auto,1fr] gap-12 items-center">
              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative mx-auto"
              >
                <div className="absolute inset-0 rounded-full blur-2xl opacity-70" style={accentStyle} />
                <motion.div
                  className="relative w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center text-6xl md:text-7xl font-bold text-primary-foreground shadow-glow border-4 border-background"
                  style={accentStyle}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {leader.initials}
                </motion.div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-card border border-border text-xs font-mono text-foreground whitespace-nowrap">
                  {leader.role}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <span className="text-xs font-mono text-accent uppercase tracking-widest">{leader.title}</span>
                <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-4">
                  <span className="text-gradient">{leader.name}</span>
                </h1>
                <p className="text-lg text-muted-foreground italic mb-6">"{leader.tagline}"</p>
                <p className="text-base text-foreground leading-relaxed max-w-2xl mb-8">{leader.longBio}</p>

                <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> {leader.location}</div>
                  <div className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> Joined {leader.joined}</div>
                  <a href={`mailto:${leader.email}`} className="flex items-center gap-2 hover:text-foreground"><Mail size={14} className="text-primary" /> {leader.email}</a>
                  <a href={`tel:${leader.phone}`} className="flex items-center gap-2 hover:text-foreground"><Phone size={14} className="text-primary" /> {leader.phone}</a>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {leader.expertise.map((e) => (
                    <span key={e} className="px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs text-foreground">{e}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 border-y border-border">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-10 flex items-center gap-2"><Sparkles size={20} className="text-primary" /> Core Skills</h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
              {leader.skills.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground font-medium">{s.name}</span>
                    <span className="text-muted-foreground font-mono">{s.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-primary"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience timeline */}
        <section className="py-20">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><Briefcase size={20} className="text-primary" /> Experience</h2>
              <div className="relative pl-6 border-l border-border space-y-8">
                {leader.experience.map((e, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-primary shadow-glow" />
                    <div className="text-xs font-mono text-accent mb-1">{e.year}</div>
                    <h3 className="text-lg font-semibold text-foreground">{e.role} <span className="text-muted-foreground text-sm font-normal">· {e.company}</span></h3>
                    <p className="text-sm text-muted-foreground mt-1">{e.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><Award size={20} className="text-primary" /> Achievements</h2>
              <div className="space-y-3">
                {leader.achievements.map((a) => (
                  <div key={a} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card/50">
                    <Award size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{a}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mt-10 mb-6 flex items-center gap-2"><GraduationCap size={20} className="text-primary" /> Education</h2>
              <div className="space-y-3">
                {leader.education.map((ed) => (
                  <div key={ed.degree} className="p-4 rounded-lg border border-border bg-card/50">
                    <div className="text-sm font-semibold text-foreground">{ed.degree}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">{ed.school} · {ed.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured projects */}
        {featuredProjects.length > 0 && (
          <section className="py-16 bg-card/20">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/projects/${p.slug}`}
                    className={`group rounded-xl border border-border bg-gradient-to-br ${p.color} p-6 hover:border-primary/40 transition-all`}
                  >
                    <img src={p.image} alt={p.title} className="w-16 h-16 object-contain mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)] group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-mono text-accent mb-1">{p.category}</div>
                    <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{p.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Connect */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto p-10 rounded-2xl border border-border bg-card/50">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Let's connect</h3>
              <p className="text-muted-foreground mb-6">Reach out for collaborations, speaking, or to just say hi.</p>
              <div className="flex flex-wrap justify-center gap-3">
                {leader.socials.map((s) => (
                  <a key={s.label} href={s.url} className="px-5 py-2.5 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/10 transition-colors text-sm">
                    {s.label}
                  </a>
                ))}
                <a href={`mailto:${leader.email}`} className="px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-opacity text-sm">
                  Email {leader.name.split(" ")[0]}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LeaderDetailPage;