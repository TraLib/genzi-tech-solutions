import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { allServices } from "@/data/services";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Community", href: "/community" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isServicesActive = location.pathname.startsWith("/services");

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Genzi Tech" className="h-10 w-auto" />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </Link>
          </li>

          {/* Services Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isServicesActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Services
              <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-4 grid grid-cols-2 gap-1"
                >
                  {allServices.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <service.icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground block">{service.title}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">{service.shortDesc}</span>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 border-t border-border mt-2 pt-2">
                    <Link
                      to="/services"
                      onClick={() => setServicesOpen(false)}
                      className="text-xs text-primary hover:underline font-medium px-3"
                    >
                      View All Services →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {navLinks.slice(1).map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden md:inline-flex px-5 py-2 text-sm font-medium rounded-lg bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Get Started
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-card border-b border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="flex flex-col p-6 gap-4">
              <li>
                <Link to="/" onClick={() => setMobileOpen(false)}
                  className={`text-sm ${location.pathname === "/" ? "text-primary" : "text-muted-foreground"}`}>
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`flex items-center gap-1 text-sm w-full ${isServicesActive ? "text-primary" : "text-muted-foreground"}`}
                >
                  Services
                  <ChevronDown size={14} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 flex flex-col gap-2 overflow-hidden"
                    >
                      {allServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to={`/services/${s.slug}`}
                            onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                          >
                            <s.icon size={14} className="text-primary" />
                            {s.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          to="/services"
                          onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                          className="text-xs text-primary font-medium"
                        >
                          View All →
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link to={link.href} onClick={() => setMobileOpen(false)}
                    className={`text-sm ${location.pathname === link.href ? "text-primary" : "text-muted-foreground"}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" onClick={() => setMobileOpen(false)}
                  className="inline-flex px-5 py-2 text-sm font-medium rounded-lg bg-gradient-primary text-primary-foreground">
                  Get Started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
