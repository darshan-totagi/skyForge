import { Link } from "wouter";
import { Rocket, Mail, MapPin, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-12 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col group mb-4">
              <span className="font-display font-extrabold text-xl tracking-tighter text-slate-900 leading-none">
                SKYFORGER
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase mt-1">
                Technologies
              </span>
            </Link>
            <p className="text-slate-600 mb-4 max-w-xs text-sm leading-relaxed">
              Empowering the next generation of developers.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-slate-600 hover:text-blue-600 transition-all text-xs font-semibold">About Us</Link></li>
              <li><Link href="/programs" className="text-slate-600 hover:text-blue-600 transition-all text-xs font-semibold">Programs</Link></li>
              <li><Link href="/courses" className="text-slate-600 hover:text-blue-600 transition-all text-xs font-semibold">Courses</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-blue-600 transition-all text-xs font-semibold">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-900 mb-4">Domains</h4>
            <ul className="space-y-2">
              <li className="text-slate-600 text-xs font-semibold">AI & ML</li>
              <li className="text-slate-600 text-xs font-semibold">MERN Stack</li>
              <li className="text-slate-600 text-xs font-semibold">Web Dev</li>
              <li className="text-slate-600 text-xs font-semibold">UI/UX Design</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail size={14} />
                </div>
                <a href="mailto:skyforgertechnologies@gmail.com" className="text-slate-600 hover:text-blue-600 transition-all text-xs font-semibold break-all">
                  skyforgertechnologies@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail size={14} />
                </div>
                <a href="mailto:info@skyforgertechnologies.me" className="text-slate-600 hover:text-blue-600 transition-all text-xs font-semibold break-all">
                  info@skyforgertechnologies.me
                </a>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center text-blue-600 shrink-0">
                  <Linkedin size={14} />
                </div>
                <a href="https://www.linkedin.com/company/skyforger/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-all text-xs font-semibold break-all">
                  Follow us on LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-500">Copyright © 2026 SkyForger. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-500 hover:text-blue-600 transition-all">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-500 hover:text-blue-600 transition-all">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}