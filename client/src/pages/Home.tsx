import { Link } from "wouter";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, Code2, LayoutTemplate, UserPlus, FileCheck2, Send, Award } from "lucide-react";
import { AdSection } from "@/components/AdSection";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
            >
              🚀 Launching careers in tech
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Forge Your Future with <br className="hidden md:block" />
              <span className="text-gradient">Real-World Tech</span> Internships
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Gain hands-on experience, build a professional portfolio, and accelerate your career with our remote, project-based internship programs.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/apply">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/25 border-0 rounded-xl">
                  Apply for Internship <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 text-foreground">
                  View Programs
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <AdSection />

      {/* Domains Section */}
      <section className="py-20 bg-black/20 border-y border-white/5 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Internship Domains</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Specialize in the most in-demand technologies of tomorrow.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BrainCircuit,
                title: "Artificial Intelligence",
                desc: "Dive into machine learning, neural networks, and data processing.",
                color: "text-blue-400",
                bg: "bg-blue-400/10"
              },
              {
                icon: Code2,
                title: "Full Stack Development",
                desc: "Master both frontend and backend to build complete web applications.",
                color: "text-purple-400",
                bg: "bg-purple-400/10"
              },
              {
                icon: LayoutTemplate,
                title: "Frontend Development",
                desc: "Create stunning, responsive, and accessible user interfaces.",
                color: "text-pink-400",
                bg: "bg-pink-400/10"
              }
            ].map((domain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="glass-card glass-card-hover h-full overflow-hidden border-0 relative group">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${domain.bg} blur-3xl -mr-10 -mt-10 rounded-full transition-opacity group-hover:opacity-100 opacity-50`} />
                  <CardContent className="p-8 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl ${domain.bg} flex items-center justify-center mb-6`}>
                      <domain.icon className={`w-7 h-7 ${domain.color}`} />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-3">{domain.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{domain.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">A streamlined process to get you started on your tech journey.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 z-0" />
            
            {[
              { icon: UserPlus, title: "1. Register", desc: "Fill out the simple application form to join." },
              { icon: FileCheck2, title: "2. Get Tasks", desc: "Receive real-world projects based on your domain." },
              { icon: Send, title: "3. Submit Work", desc: "Complete tasks and submit for review by experts." },
              { icon: Award, title: "4. Certificate", desc: "Earn your verified internship completion certificate." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                className="relative z-10 flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-24 h-24 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(var(--primary),0.15)] shadow-primary/20 group hover:border-primary transition-colors">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-card/30 border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Why Choose SkyForge?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">We provide the tools and guidance you need to bridge the gap between academia and industry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Real-World Experience", 
                desc: "Work on actual projects that solve real problems, giving you substance for your resume and portfolio.",
                icon: <Code2 className="w-8 h-8 text-primary" />
              },
              { 
                title: "Structured Learning", 
                desc: "Follow a carefully designed curriculum that ensures you master the most relevant tools and technologies.",
                icon: <BrainCircuit className="w-8 h-8 text-primary" />
              },
              { 
                title: "Verified Certification", 
                desc: "Receive a professional certificate upon successful completion to showcase your skills to employers.",
                icon: <Award className="w-8 h-8 text-primary" />
              }
            ].map((benefit, i) => (
              <Card key={i} className="bg-background/50 border-white/10 hover:border-primary/30 transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="mb-6 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
