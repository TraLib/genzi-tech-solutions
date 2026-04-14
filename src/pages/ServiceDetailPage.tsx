import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
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

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = allServices.find((s) => s.slug === slug);
  const currentIndex = allServices.findIndex((s) => s.slug === slug);

  if (!service) {
    return (
      <>
        <CustomCursor />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <Link to="/services" className="text-primary hover:underline">← Back to Services</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const prevService = currentIndex > 0 ? allServices[currentIndex - 1] : null;
  const nextService = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : null;

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="pt-16">
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
            >
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-foreground">Services</Link>
              <span>/</span>
              <span className="text-foreground">{service.title}</span>
            </motion.div>

            {/* Header */}
            <div className="flex flex-col lg:flex-row gap-12 mb-16">
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon size={32} className="text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-gradient">{service.title}</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {service.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-opacity"
                >
                  Get a Quote <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-8">What We Offer</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card/50"
                  >
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-8">Technologies We Use</h2>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between border-t border-border pt-8">
              {prevService ? (
                <Link to={`/services/${prevService.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft size={16} /> {prevService.title}
                </Link>
              ) : <div />}
              {nextService ? (
                <Link to={`/services/${nextService.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {nextService.title} <ArrowRight size={16} />
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

export default ServiceDetailPage;
