import { Link } from "wouter";
import { Rocket, Mail, MapPin, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col group mb-8">
              <span className="font-display font-extrabold text-2xl tracking-tighter text-white leading-none">
                SKYFORGER
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mt-1">
                Technologies
              </span>
            </Link>
            <p className="text-muted-foreground/80 mb-8 max-w-xs text-lg font-medium leading-relaxed">
              Empowering the next generation of developers with real-world tech internships and hands-on experience.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/skyforger/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all group"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white mb-8">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-all text-sm font-bold tracking-[0.1em] uppercase">About Us</Link></li>
              <li><Link href="/programs" className="text-muted-foreground hover:text-primary transition-all text-sm font-bold tracking-[0.1em] uppercase">Internship Programs</Link></li>
              <li><Link href="/courses" className="text-muted-foreground hover:text-primary transition-all text-sm font-bold tracking-[0.1em] uppercase">LMS Courses</Link></li>
              <li><Link href="/auth" className="text-muted-foreground hover:text-primary transition-all text-sm font-bold tracking-[0.1em] uppercase">Student Login</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-all text-sm font-bold tracking-[0.1em] uppercase">FAQs</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-all text-sm font-bold tracking-[0.1em] uppercase">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white mb-8">Domains</h4>
            <ul className="space-y-4">
              <li className="text-muted-foreground text-sm font-bold tracking-[0.1em] uppercase">Artificial Intelligence</li>
              <li className="text-muted-foreground text-sm font-bold tracking-[0.1em] uppercase">MERN Stack Development</li>
              <li className="text-muted-foreground text-sm font-bold tracking-[0.1em] uppercase">Web Development</li>
              <li className="text-muted-foreground text-sm font-bold tracking-[0.1em] uppercase">UI/UX Design</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={14} />
                </div>
                <a href="mailto:skyforgertechnologies@gmail.com" className="text-muted-foreground hover:text-primary transition-all text-sm font-bold break-all leading-relaxed">
                  skyforgertechnologies@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/40">Copyright © 2026 SkyForger. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/40 hover:text-primary transition-all">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/40 hover:text-primary transition-all">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
