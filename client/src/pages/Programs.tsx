import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BrainCircuit, Code2, LayoutTemplate, Clock, Globe, CheckCircle2, Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const programs = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: BrainCircuit,
    color: "text-blue-400",
    border: "border-blue-400/20",
    bg: "bg-blue-400/5",
    description: "Build a strong foundation in AI and Machine Learning through practical Python-based projects. Dive into machine learning, neural networks, and data processing.",
    details: [
      "Data preprocessing and analysis",
      "Building regression and classification models",
      "Introduction to Deep Learning",
      "Deploying ML models"
    ]
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    icon: Code2,
    color: "text-purple-400",
    border: "border-purple-400/20",
    bg: "bg-purple-400/5",
    description: "Learn to build complete web applications from database to UI using modern frameworks. Master both frontend and backend to build complete web applications.",
    details: [
      "Developing web application projects",
      "Working with databases applications",
      "Understanding frontend and backend integration",
      "End-to-end application development"
    ]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: LayoutTemplate,
    color: "text-pink-400",
    border: "border-pink-400/20",
    bg: "bg-pink-400/5",
    description: "Master the art of creating beautiful, interactive user interfaces and web experiences. Create stunning, responsive, and accessible user interfaces.",
    details: [
      "Building responsive user interfaces",
      "Creating interactive web pages",
      "Improving UI usability and design",
      "Performance optimization"
    ]
  }
];

export default function Programs() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <MainLayout>
      {/* Hero Section - Matching Home Page Style - More Compact */}
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden pt-20 bg-[#020617]">
        {/* Background Energy Waves & Tech Motif */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 z-[1] opacity-[0.15] pointer-events-none noise" />
          
          <motion.div
            animate={{
              x: ["-25%", "25%", "-25%"],
              y: ["-15%", "15%", "-15%"],
              scale: [1, 1.3, 1],
              rotate: [12, 18, 12],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-20%] w-[150%] h-[100%] energy-wave opacity-60 mix-blend-screen bg-primary/40 blur-[100px]"
          />
          
          <div 
            className="absolute inset-0 opacity-[0.2] pointer-events-none"
            style={{ 
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 py-16">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-1.5 h-1.5 bg-primary" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-muted-foreground/80">
                Specialized Learning Paths
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-8 tracking-tighter leading-none"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              Choose Your <br />
              <span className="text-foreground/90">Path To</span> <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">Mastery</span>
            </motion.h1>
          </div>

          <div className="max-w-2xl mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="border-l border-white/10 pl-6"
            >
              <p className="text-lg text-muted-foreground/90 leading-relaxed font-medium">
                Our programs are intensive, remote-first, and designed to simulate real-world industry environments through task-based execution.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Content Section - More Compact Grid Layout */}
      <section className="py-24 bg-black relative overflow-hidden" ref={containerRef}>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="group relative flex flex-col h-full"
              >
                {/* Visual Module Header */}
                <div className="relative aspect-video bg-black border border-white/5 flex items-center justify-center overflow-hidden group-hover:border-primary/30 transition-all duration-500 mb-6">
                  <div className={`absolute inset-0 ${prog.bg} blur-[60px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity" 
                       style={{ 
                         backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                         backgroundSize: '16px 16px'
                       }} 
                  />
                  <prog.icon className={`w-16 h-16 ${prog.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 z-10`} />
                  
                  <div className="absolute top-4 left-4 text-[8px] font-bold tracking-[0.3em] uppercase text-muted-foreground/30">
                    Module_0{i + 1}
                  </div>
                </div>

                {/* Content Details */}
                <div className="flex-grow space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary" />
                      <span className={`text-[8px] font-bold tracking-[0.3em] uppercase ${prog.color}`}>Specialization</span>
                    </div>
                    <h2 className="text-3xl font-display font-extrabold tracking-tighter group-hover:text-primary transition-colors">{prog.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 font-medium">
                      {prog.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-white/5 bg-white/[0.01] space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className={`w-3 h-3 ${prog.color}`} />
                        <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Duration</span>
                      </div>
                      <p className="text-sm font-bold text-foreground">4 Weeks</p>
                    </div>
                    <div className="p-4 border border-white/5 bg-white/[0.01] space-y-1">
                      <div className="flex items-center gap-2">
                        <Globe className={`w-3 h-3 ${prog.color}`} />
                        <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Location</span>
                      </div>
                      <p className="text-sm font-bold text-foreground">Remote</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-muted-foreground/60">Core Competencies</span>
                    <ul className="space-y-2">
                      {prog.details.slice(0, 3).map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 group/item">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${prog.color} shrink-0 mt-0.5 opacity-40 group-hover/item:opacity-100 transition-opacity`} />
                          <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-auto">
                  <Link href="/apply" className="w-full">
                    <Button className="w-full h-12 rounded-none bg-white text-black hover:bg-primary hover:text-white transition-all font-bold text-[10px] tracking-[0.2em] uppercase group flex items-center justify-center gap-3 relative overflow-hidden">
                      <div className="w-1.5 h-1.5 bg-black group-hover:bg-white transition-colors" />
                      <span>Register Now</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section - More Compact */}
      <section className="py-24 relative bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tighter">
              Ready to start your professional journey?
            </h2>
            <Link href="/apply">
              <Button className="h-16 px-12 rounded-none bg-primary text-black hover:bg-white transition-all font-bold text-sm tracking-[0.2em] uppercase group flex items-center gap-4 relative overflow-hidden">
                <Sparkles className="w-5 h-5" />
                <span>Begin Application</span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/10" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
