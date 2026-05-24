import { Link, useLocation } from "wouter";
import { Menu, X, Rocket, User, LogOut, LayoutDashboard, Award, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/certificate", label: "Certificate" },
];

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["/api/user"],
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => apiRequest("POST", "/api/logout"),
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      setLocation("/");
    },
  });

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-white/10 py-3 shadow-lg shadow-black/20"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/logo.png" 
              alt="SkyForger Logo" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="bg-primary/20 p-2 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors hidden">
              <Rocket size={8} className="stroke-[2.5]" />
            </div>
            <span className="font-display font-bold text-2xl tracking-wide text-foreground">
              Sky<span className="text-primary">Forger</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 font-semibold hover:text-primary"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <User size={18} />
                  {user.fullName.split(' ')[0]}
                </Button>
                
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-card border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden py-1">
                      <div className="px-4 py-2 border-b border-white/5 mb-1">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Student Menu</p>
                      </div>
                      <Link href="/my-courses">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 flex items-center gap-2">
                          <LayoutDashboard size={16} className="text-primary" /> My Courses
                        </button>
                      </Link>
                      <Link href="/profile">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 flex items-center gap-2">
                          <Settings size={16} className="text-primary" /> Profile Settings
                        </button>
                      </Link>
                      <Link href="/certificate">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 flex items-center gap-2">
                          <Award size={16} className="text-primary" /> My Certificates
                        </button>
                      </Link>
                      <div className="border-t border-white/5 mt-1 pt-1">
                        <button 
                          onClick={() => logoutMutation.mutate()}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 text-destructive flex items-center gap-2"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" className="font-semibold hover:text-primary">
                  Login
                </Button>
              </Link>
            )}
            <Link href="/apply">
              <Button className="font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/25 border-0">
                Apply Now
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
              <div className="px-4 pt-4 border-t border-white/10 mt-2 space-y-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2 text-primary font-medium">
                      <User size={20} /> {user.fullName}
                    </div>
                    <Link href="/courses">
                      <Button variant="outline" className="w-full font-semibold border-primary/20">
                        My Courses
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full text-destructive"
                      onClick={() => logoutMutation.mutate()}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/auth">
                    <Button variant="outline" className="w-full font-semibold border-primary/20 hover:bg-primary/10">
                      Login
                    </Button>
                  </Link>
                )}
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
