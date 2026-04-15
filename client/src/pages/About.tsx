import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Target, Eye, Flag, Sparkles, ChevronDown, Award, Users, Globe, Zap } from "lucide-react";

export default function About() {
  return (
    <MainLayout>
      <div className="min-h-screen relative overflow-hidden bg-[#020617] pt-32 pb-24">
        {/* Advanced Animative Background - Matching Design System */}
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
          <motion.div
            animate={{
              x: ["25%", "-25%", "25%"],
              y: ["15%", "-15%", "15%"],
              scale: [1.2, 1, 1.2],
              rotate: [-6, -15, -6],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-20%] right-[-20%] w-[150%] h-[90%] energy-wave opacity-50 mix-blend-screen bg-secondary/40 blur-[100px]"
          />

          <div 
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{ 
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Hero Section */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-1.5 h-1.5 bg-primary" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-muted-foreground/80">
                Our Story & Vision
              </span>
            </motion.div>

            <motion.h1 
              className="text-[10vw] md:text-[7vw] lg:text-[6vw] font-display font-extrabold mb-8 leading-[0.9] tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              About <br />
              <span className="text-foreground/90">SkyForger</span> <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">Technologies</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl font-medium border-l border-white/10 pl-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We bridge the gap between academic learning and industry requirements by providing hands-on, task-based internship experiences in cutting-edge technologies.
            </motion.p>
          </div>

          {/* Values Grid - Matching Home Page Structure */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/5 bg-black/40 backdrop-blur-sm mb-32">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "To empower students and early-career professionals with practical skills, building a resilient workforce ready for the challenges of tomorrow's tech industry.",
                meta: "CORE_PURPOSE"
              },
              {
                icon: Eye,
                title: "Our Vision",
                text: "To be the premier global launchpad for tech talent, recognized for transforming potential into measurable technical excellence.",
                meta: "GLOBAL_IMPACT"
              },
              {
                icon: Flag,
                title: "Our Objectives",
                text: "Deliver project-driven learning, foster a culture of continuous improvement, and provide undeniable proof of capability through verifiable certificates.",
                meta: "KEY_GOALS"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="group relative p-12 md:p-16 border-white/5 border-b md:border-b-0 md:border-r last:border-r-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="mb-10 text-[10px] font-bold tracking-[0.3em] text-primary/40 group-hover:text-primary transition-colors uppercase">
                  {item.meta}
                </div>
                <div className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center mb-8 group-hover:border-primary transition-all duration-500">
                  <item.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-6 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats/Highlight Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter leading-none">
                Driving the <br /> <span className="text-primary">Next Generation</span> <br /> of Tech
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium max-w-lg">
                Since our inception, we've focused on one thing: results. Our programs aren't just about learning; they're about doing. We provide the environment for students to fail fast, learn faster, and build actual products.
              </p>
              <div className="flex gap-12 pt-4">
                <div>
                  <p className="text-4xl font-display font-black text-white">100+</p>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mt-2">Interns Mentored</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-black text-white">50+</p>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mt-2">Live Projects</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square md:aspect-video lg:aspect-square bg-black border border-white/5 flex items-center justify-center overflow-hidden group hover:border-primary/30 transition-all duration-700"
            >
              <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full opacity-40" />
              <div className="absolute inset-0 opacity-[0.05]" 
                   style={{ 
                     backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                     backgroundSize: '32px 32px'
                   }} 
              />
              <Zap className="w-32 h-32 md:w-48 md:h-48 text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 drop-shadow-[0_0_30px_rgba(var(--primary),0.5)]" />
              
              <div className="absolute top-8 left-8 text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/40">
                SYSTEM_STATUS: ACTIVE
              </div>
              <div className="absolute bottom-8 right-8 text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/40">
                INC_2026
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
