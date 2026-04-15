import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Target, Eye, Flag, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-6 py-16 lg:py-32 relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Our Story & Vision</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-8xl font-display font-extrabold mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            About <span className="text-gradient">SkyForger</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            We bridge the gap between academic learning and industry requirements by providing hands-on, task-based internship experiences in cutting-edge technologies.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "To empower students and early-career professionals with practical skills, building a resilient workforce ready for the challenges of tomorrow's tech industry.",
              delay: 0.3
            },
            {
              icon: Eye,
              title: "Our Vision",
              text: "To be the premier global launchpad for tech talent, recognized for transforming potential into measurable technical excellence.",
              delay: 0.4
            },
            {
              icon: Flag,
              title: "Our Objectives",
              text: "Deliver project-driven learning, foster a culture of continuous improvement, and provide undeniable proof of capability through verifiable certificates.",
              delay: 0.5
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <Card className="glass-card h-full text-center hover:border-primary/50 transition-all duration-500 group overflow-hidden border-white/5 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="pt-12 pb-12 px-8 flex flex-col items-center relative z-10 h-full">
                  <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-white/5">
                    <item.icon className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-6 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-foreground/80 transition-colors flex-grow">{item.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
