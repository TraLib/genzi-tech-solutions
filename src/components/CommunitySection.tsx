import { motion } from "framer-motion";
import { Palette, Code2, Server, Smartphone, ArrowRight } from "lucide-react";

const teams = [
  {
    icon: Palette,
    count: "5+",
    title: "UI/UX Designers",
    desc: "Our design team crafts beautiful and intuitive user experiences",
    skills: ["Creative Design", "User Research", "Prototyping", "Visual Design"],
  },
  {
    icon: Code2,
    count: "8+",
    title: "Frontend Developers",
    desc: "Building responsive and interactive user interfaces",
    skills: ["React Specialists", "Vue Experts", "Angular Developers", "UI Engineers"],
  },
  {
    icon: Server,
    count: "6+",
    title: "Backend Developers",
    desc: "Creating robust and scalable server-side solutions",
    skills: ["Node.js Experts", "Python Developers", "Database Architects", "API Specialists"],
  },
  {
    icon: Smartphone,
    count: "4+",
    title: "Mobile Developers",
    desc: "Developing native and cross-platform mobile applications",
    skills: ["React Native", "Flutter", "iOS Native", "Android Native"],
  },
];

const technologies = [
  "React", "Node.js", "Python", "Flutter", "Next.js", "MongoDB", "PostgreSQL", "AWS",
];

const CommunitySection = () => {
  return (
    <section id="community" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest">Our Developer Community</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Meet the <span className="text-gradient">Talented Team</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Meet the talented team behind your success
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {teams.map((team, i) => (
            <motion.div
              key={team.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-glow transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-glow flex items-center justify-center mb-4 group-hover:bg-gradient-primary transition-all">
                <team.icon size={22} className="text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div className="text-4xl font-bold text-gradient mb-1">{team.count}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{team.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{team.desc}</p>
              <div className="flex flex-wrap gap-2">
                {team.skills.map((skill) => (
                  <span key={skill} className="text-xs px-2.5 py-1 rounded-full border border-border bg-secondary text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-2">
            Technologies <span className="text-gradient">We Work With</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-24"
        >
          {technologies.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-6 py-3 rounded-xl border border-border bg-card/50 text-foreground font-medium hover:border-primary/40 hover:shadow-glow transition-all cursor-default"
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-2xl border border-border bg-card/50 backdrop-blur-sm mb-24"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Join Our <span className="text-gradient">Community</span>
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            We're always looking for talented developers and designers to join our team
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-opacity"
          >
            Get In Touch <ArrowRight size={16} />
          </a>
        </motion.div>

        {/* Meet the Leaders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-12">
            Meet the <span className="text-gradient">Leaders</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { initials: "VR", name: "VINUS RAMANI", role: "Founder & CEO (Chief Executive Officer)" },
              { initials: "KG", name: "KEVINS GOLAKIYA", role: "Co-Founder & VP (Vice President)" },
              { initials: "SJ", name: "SNEHA JASANI", role: "HR (Human Resources)" },
            ].map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-glow transition-all duration-300"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-5 flex items-center justify-center text-3xl font-bold text-primary-foreground">
                  {leader.initials}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-1">{leader.name}</h4>
                <p className="text-sm text-muted-foreground font-mono">
                  {leader.role}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
