import { Link, useLocation } from "wouter";
import { Menu, X, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/certificate", label: "Certificate" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <img 
              src="/logo.png" 
              alt="SkyForger Logo" 
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl md:text-2xl tracking-tighter text-foreground leading-none">
                SKYFORGER
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:text-primary relative group ${
                  location === link.href ? "text-primary" : "text-muted-foreground/70"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full ${location === link.href ? "w-full" : ""}`} />
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/contact">
              <Button variant="outline" className="text-[11px] font-bold tracking-[0.2em] uppercase border-white/20 hover:border-primary hover:bg-primary/10 transition-all px-8 h-12 rounded-none flex items-center gap-2 group">
                <div className="w-1.5 h-1.5 bg-primary group-hover:shadow-[0_0_10px_rgba(var(--primary),0.8)] transition-all" />
                Get in Touch
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl absolute top-full left-0 w-full overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium px-4 py-3 rounded-lg transition-colors ${
                    location === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-white/10 mt-2">
                <Link href="/apply">
                  <Button className="w-full font-semibold bg-gradient-to-r from-primary to-secondary text-lg py-6">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
