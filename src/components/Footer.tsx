import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2">
          <img src={logo} alt="Genzi Tech" className="h-8 w-auto" />
        </a>
        <p className="text-xs text-muted-foreground font-mono">
          © 2026 Genzi Tech Solution Pvt. Ltd. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Twitter", "LinkedIn", "GitHub"].map((s) => (
            <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
