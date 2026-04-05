import { motion } from "framer-motion";
import { Target, Users, Lightbulb } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono text-accent uppercase tracking-widest">About Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
              Turning Ideas Into <span className="text-gradient">Reality</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Genzi Tech is a forward-thinking technology company dedicated to delivering innovative digital solutions. We combine creativity with technical expertise to help startups and enterprises achieve their digital transformation goals.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our team of passionate developers, designers, and strategists work collaboratively to create products that make a lasting impact.
            </p>

            {/* Code block decoration */}
            <div className="p-4 rounded-lg bg-secondary/50 border border-border font-mono text-xs text-muted-foreground">
              <p><span className="text-accent">const</span> genziTech = {'{'}</p>
              <p className="pl-4"><span className="text-primary">mission</span>: <span className="text-foreground">"Innovate. Build. Transform."</span>,</p>
              <p className="pl-4"><span className="text-primary">team</span>: <span className="text-accent">30</span>+ experts,</p>
              <p className="pl-4"><span className="text-primary">founded</span>: <span className="text-accent">2021</span></p>
              <p>{'}'}</p>
            </div>
          </motion.div>

          {/* Right - Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To empower businesses with cutting-edge technology solutions that drive growth and efficiency.",
              },
              {
                icon: Lightbulb,
                title: "Innovation First",
                desc: "We stay ahead of the curve, leveraging the latest technologies and methodologies.",
              },
              {
                icon: Users,
                title: "Client-Centric",
                desc: "Every project is tailored to meet unique business needs with transparent communication.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="flex gap-5 p-6 rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
