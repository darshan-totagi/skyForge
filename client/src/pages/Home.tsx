import { Link } from "wouter";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, Code2, LayoutTemplate, UserPlus, FileCheck2, Send, Award, Download, Sparkles, ChevronDown } from "lucide-react";
import { AdSection } from "@/components/AdSection";
import { TechGrid } from "@/components/TechGrid";
import { Counter } from "@/components/Counter";
import { Reviews } from "@/components/Reviews";
import { TechTicker } from "@/components/TechTicker";

export default function Home() {
  return (
    <MainLayout>
      {/* New Hero Section Inspired by Reference */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 bg-[#020617]">
        {/* Grain Overlay */}
        <div className="absolute inset-0 z-[1] opacity-[0.15] pointer-events-none noise" />

        {/* Background Energy Waves - More Prominent */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              x: ["-25%", "25%", "-25%"],
              y: ["-15%", "15%", "-15%"],
              scale: [1, 1.3, 1],
              rotate: [12, 18, 12],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-20%] w-[150%] h-[100%] energy-wave opacity-70 mix-blend-screen bg-primary/40 blur-[100px]"
          />
          <motion.div
            animate={{
              x: ["25%", "-25%", "25%"],
              y: ["15%", "-15%", "15%"],
              scale: [1.2, 1, 1.2],
              rotate: [-6, -15, -6],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-20%] right-[-20%] w-[150%] h-[90%] energy-wave opacity-60 mix-blend-screen bg-secondary/40 blur-[100px]"
          />

          {/* New: Moving Blending Orbs */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              animate={{
                x: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                ],
                y: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                ],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 mix-blend-overlay"
              style={{
                background: i % 2 === 0 
                  ? "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)"
                  : "radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)",
                top: "-20%",
                left: "-20%",
              }}
            />
          ))}

          {/* New: Moving Spotlights */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`spotlight-${i}`}
              animate={{
                x: ["0%", "100%", "0%"],
                y: ["0%", "50%", "0%"],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full"
              style={{
                top: `${i * 30}%`,
                left: `${i * 20}%`,
              }}
            />
          ))}
          
          {/* Shifting Aurora effect - More active */}
          <motion.div 
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.2, 1],
              background: [
                "radial-gradient(circle at 50% 50%, rgba(var(--primary), 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 70%, rgba(var(--secondary), 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 30%, rgba(var(--accent), 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, rgba(var(--primary), 0.2) 0%, transparent 50%)",
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 blur-[100px]"
          />

          {/* New: Grid Overlay for tech feel - More structured */}
          <div 
            className="absolute inset-0 opacity-[0.2] pointer-events-none"
            style={{ 
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* New: Data Stream lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`stream-${i}`}
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear",
              }}
              className="absolute h-[1px] w-[200px] bg-gradient-to-r from-transparent via-primary to-transparent blur-[1px]"
              style={{
                top: `${15 + i * 18}%`,
                left: "-10%",
              }}
            />
          ))}

          {/* New: Floating Tech Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: ["0%", "-100%"],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear",
              }}
              className="absolute w-[1px] h-32 bg-gradient-to-t from-transparent via-primary/50 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: "100%",
              }}
            />
          ))}

          {/* New: Shimmering Tech Beams */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`beam-${i}`}
              animate={{
                x: ["-100%", "200%"],
                opacity: [0, 0.2, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 10,
                repeat: Infinity,
                delay: i * 3,
                ease: "linear",
              }}
              className="absolute w-[300px] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent blur-[2px]"
              style={{
                top: `${20 + i * 20}%`,
                left: "-50%",
                transform: "rotate(-15deg)",
              }}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col h-full justify-between py-20">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-1.5 h-1.5 bg-primary" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-muted-foreground/80">
                Innovation. Acceleration. Growth.
              </span>
            </motion.div>

            <motion.h1 
              className="text-[13vw] md:text-[8vw] lg:text-[7vw] font-display font-extrabold mb-12 leading-[0.9] tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              Digital Futures <br />
              <span className="text-foreground/90">That Drive</span> <br />
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">Impact</span>
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mt-20 md:mt-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-md border-l border-white/10 pl-8"
            >
              <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed font-medium">
                We help students and innovators build scalable tech careers, master modern systems, and unlock real-world growth through task-based internships.
              </p>
              
              <div className="mt-12 flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-none border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                  <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground group-hover:text-primary transition-colors">Scroll</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-start md:justify-end"
            >
              <Link href="/apply">
                <Button className="h-20 px-12 rounded-none bg-primary text-black hover:bg-white transition-all font-bold text-sm tracking-[0.2em] uppercase group flex items-center gap-4 relative overflow-hidden">
                  <div className="w-2 h-2 bg-black group-hover:bg-primary transition-colors" />
                  <span>Apply for Internship</span>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/10" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <AdSection />

      {/* Domains Section - Redesigned */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="w-1.5 h-1.5 bg-primary" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">Specializations</span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-display font-extrabold tracking-tighter">Our Internship Domains</h2>
            </div>
            <p className="text-muted-foreground/80 max-w-xs text-lg font-medium border-l border-white/10 pl-6">
              Specialize in the most in-demand technologies of tomorrow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/5">
            {[
              {
                icon: BrainCircuit,
                title: "Artificial Intelligence",
                desc: "Dive into machine learning, neural networks, and data processing.",
                color: "text-blue-400",
                bg: "bg-blue-400/5"
              },
              {
                icon: Code2,
                title: "Full Stack Development",
                desc: "Master both frontend and backend to build complete web applications.",
                color: "text-purple-400",
                bg: "bg-purple-400/5"
              },
              {
                icon: LayoutTemplate,
                title: "Frontend Development",
                desc: "Create stunning, responsive, and accessible user interfaces.",
                color: "text-pink-400",
                bg: "bg-pink-400/5"
              }
            ].map((domain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="group relative p-12 md:p-16 border-white/5 border-b md:border-b-0 md:border-r last:border-r-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-none border border-white/10 flex items-center justify-center mb-10 group-hover:border-primary transition-colors`}>
                    <domain.icon className={`w-6 h-6 ${domain.color}`} />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-6 tracking-tight group-hover:text-primary transition-colors">{domain.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg mb-10">{domain.desc}</p>
                  
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${domain.color}`}>Learn more</span>
                    <ArrowRight className={`w-4 h-4 ${domain.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      >
        <TechTicker />
      </motion.div>

      {/* How It Works - Redesigned */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <div className="w-1.5 h-1.5 bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">Process</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-display font-extrabold tracking-tighter">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5">
            {[
              { icon: UserPlus, title: "Register", desc: "Fill out the simple application form to join our talent pool." },
              { icon: FileCheck2, title: "Get Tasks", desc: "Receive real-world projects based on your chosen domain." },
              { icon: Send, title: "Submit Work", desc: "Complete tasks and submit for review by industry experts." },
              { icon: Award, title: "Certificate", desc: "Earn your verified internship completion certificate." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                className="relative p-12 md:p-16 border-white/5 border-b md:border-b-0 md:border-r last:border-r-0 group hover:bg-white/[0.02] transition-colors"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="mb-10 text-[10px] font-bold tracking-[0.3em] text-primary/40 group-hover:text-primary transition-colors">
                  STEP 0{i + 1}
                </div>
                <div className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center mb-8 group-hover:border-primary transition-all duration-500">
                  <step.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Redesigned */}
      <section className="py-32 relative bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5 bg-black">
            {[
              { label: "Interns Joined", value: "100+", icon: Sparkles },
              { label: "Projects Completed", value: "50+", icon: Code2 },
              { label: "Learning Tasks", value: "200+", icon: FileCheck2 },
              { label: "Success Rate", value: "98%", icon: Award }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="p-10 md:p-16 border-white/5 border-r last:border-r-0 flex flex-col items-center text-center group hover:bg-white/[0.02] transition-colors"
              >
                <div className="text-4xl md:text-6xl font-display font-extrabold text-white mb-6 tracking-tighter group-hover:text-primary transition-colors">
                  <Counter value={stat.value} />
                </div>
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      >
        <Reviews />
      </motion.div>

      {/* Why Choose Us - Redesigned */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-8">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="w-1.5 h-1.5 bg-primary" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">Value Proposition</span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-display font-extrabold tracking-tighter">Why Choose SkyForger?</h2>
            </div>
            <p className="text-muted-foreground/80 max-w-xs text-lg font-medium border-l border-white/10 pl-6">
              We bridge the gap between academia and industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/5">
            {[
              { 
                title: "Real-World Experience", 
                desc: "Work on actual projects that solve real problems, giving you substance for your resume and portfolio.",
                icon: <Code2 className="w-6 h-6" />,
                delay: 0.1
              },
              { 
                title: "Structured Learning", 
                desc: "Follow a carefully designed curriculum that ensures you master the most relevant tools and technologies.",
                icon: <BrainCircuit className="w-6 h-6" />,
                delay: 0.2
              },
              { 
                title: "Verified Certification", 
                desc: "Receive a professional certificate upon successful completion to showcase your skills to employers.",
                icon: <Award className="w-6 h-6" />,
                delay: 0.3,
                action: (
                  <a href="/certificates/sample-certificate.png" download="SkyForger-Sample-Certificate.jpeg" className="inline-block">
                    <Button variant="outline" size="sm" className="mt-8 bg-transparent border-white/10 hover:border-primary hover:bg-primary/5 text-muted-foreground hover:text-primary rounded-none font-bold tracking-[0.1em] uppercase h-12 px-8">
                      <Download className="w-4 h-4 mr-2" /> Download Sample
                    </Button>
                  </a>
                )
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: benefit.delay, ease: [0.23, 1, 0.32, 1] }}
                className="p-12 md:p-16 border-white/5 border-r last:border-r-0 group hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center mb-10 group-hover:border-primary transition-colors">
                  <span className="text-foreground group-hover:text-primary transition-colors">{benefit.icon}</span>
                </div>
                <h3 className="text-3xl font-display font-bold mb-6 tracking-tight group-hover:text-primary transition-colors">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">{benefit.desc}</p>
                {benefit.action && benefit.action}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
