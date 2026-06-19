import { Link, useLocation } from "wouter";
import { Menu, X, Rocket, User, LogOut, LayoutDashboard, Award, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-blue-100 py-2 shadow-lg"
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <img 
              src="/logo.png" 
              alt="SkyForger Logo" 
              className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg md:text-xl tracking-tighter text-slate-900 leading-none">
                SKYFORGER
              </span>
              <span className="text-[9px] font-bold tracking-[0.3em] text-blue-600 uppercase mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
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
                className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative group ${
                  location === link.href ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full ${location === link.href ? "w-full" : ""}`} />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 font-semibold hover:text-blue-600 text-slate-700"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <User size={18} />
                  {user.fullName.split(' ')[0]}
                </Button>
                
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden py-1">
                      <div className="px-4 py-2 border-b border-slate-100 mb-1">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Student Menu</p>
                      </div>
                      <Link href="/my-courses">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700">
                          <LayoutDashboard size={16} className="text-blue-600" /> My Courses
                        </button>
                      </Link>
                      <Link href="/profile">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700">
                          <Settings size={16} className="text-blue-600" /> Profile Settings
                        </button>
                      </Link>
                      <Link href="/certificate">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700">
                          <Award size={16} className="text-blue-600" /> My Certificates
                        </button>
                      </Link>
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button 
                          onClick={() => logoutMutation.mutate()}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 text-red-600 flex items-center gap-2"
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
                <Button variant="ghost" className="font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                  Login
                </Button>
              </Link>
            )}
            <Link href="/apply">
              <Button className="font-semibold bg-blue-600 hover:bg-blue-700 border-0 text-white rounded-none">
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-800 p-2"
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
            className="md:hidden border-t border-blue-100 bg-white backdrop-blur-xl absolute top-full left-0 w-full overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium px-4 py-3 rounded-lg transition-colors ${
                    location === link.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-slate-100 mt-2 space-y-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2 text-blue-600 font-medium">
                      <User size={20} /> {user.fullName}
                    </div>
                    <Link href="/courses">
                      <Button variant="outline" className="w-full font-semibold border-blue-200 text-blue-600 hover:bg-blue-50">
                        My Courses
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full text-red-600 hover:bg-red-50"
                      onClick={() => logoutMutation.mutate()}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/auth">
                    <Button variant="outline" className="w-full font-semibold border-blue-200 hover:bg-blue-50 text-blue-600">
                      Login
                    </Button>
                  </Link>
                )}
                <Link href="/apply">
                  <Button className="w-full font-semibold bg-blue-600 hover:bg-blue-700 text-lg py-6 text-white rounded-none">
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