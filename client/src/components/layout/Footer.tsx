import { Link } from "wouter";
import { Rocket, Mail, MapPin, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Rocket size={24} className="text-primary stroke-[2.5]" />
              <span className="font-display font-bold text-2xl tracking-wide text-foreground">
                Sky<span className="text-primary">Forge</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering the next generation of developers with real-world tech internships and hands-on experience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/programs" className="text-muted-foreground hover:text-primary transition-colors">Internship Programs</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">Domains</h4>
            <ul className="space-y-3">
              <li className="text-muted-foreground">Artificial Intelligence</li>
              <li className="text-muted-foreground">Full Stack Development</li>
              <li className="text-muted-foreground">Frontend Development</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail size={20} className="text-primary shrink-0 mt-0.5" />
                <span>skyforgelearn@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                <span>123 Innovation Drive<br/>Tech Valley, CA 94043</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Copyright © 2026 SkyForge. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
