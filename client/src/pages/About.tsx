import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Target, Eye, Flag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-6 py-16 lg:py-24 relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About <span className="text-primary">SkyForger</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            We bridge the gap between academic learning and industry requirements by providing hands-on, task-based internship experiences in cutting-edge technologies.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "To empower students and early-career professionals with practical skills, building a resilient workforce ready for the challenges of tomorrow's tech industry."
            },
            {
              icon: Eye,
              title: "Our Vision",
              text: "To be the premier global launchpad for tech talent, recognized for transforming potential into measurable technical excellence."
            },
            {
              icon: Flag,
              title: "Our Objectives",
              text: "Deliver project-driven learning, foster a culture of continuous improvement, and provide undeniable proof of capability through verifiable certificates."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
            >
              <Card className="glass-card h-full text-center hover:border-primary/50 transition-colors duration-300">
                <CardContent className="pt-10 pb-10 px-8 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <item.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
