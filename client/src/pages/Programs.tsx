import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BrainCircuit, Code2, LayoutTemplate, Clock, Globe, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const programs = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: BrainCircuit,
    color: "from-blue-500 to-cyan-400",
    textColor: "text-blue-400",
    shadow: "shadow-blue-500/20",
    description: "Build a strong foundation in AI and Machine Learning through practical Python-based projects.",
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
    color: "from-purple-500 to-pink-500",
    textColor: "text-purple-400",
    shadow: "shadow-purple-500/20",
    description: "Learn to build complete web applications from database to UI using modern frameworks.",
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
    color: "from-orange-500 to-amber-500",
    textColor: "text-orange-400",
    shadow: "shadow-orange-500/20",
    description: "Master the art of creating beautiful, interactive user interfaces and web experiences.",
    details: [
      "Building responsive user interfaces",
      "Creating interactive web pages",
      "Improving UI usability and design",
      "Performance optimization"
    ]
  }
];

export default function Programs() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-6 py-16 lg:py-32 relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Future-ready skills</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-display font-extrabold mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            Internship <span className="text-gradient">Programs</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            Choose your specialized path. All programs are intensive, remote, and designed to simulate real industry work environments.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <Card className={`glass-card h-full flex flex-col hover:border-white/20 transition-all duration-500 group overflow-hidden border-white/5`}>
                <div className={`h-1.5 w-full bg-gradient-to-r ${prog.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                <CardHeader className="pt-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center mb-8 shadow-lg ${prog.shadow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <prog.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-display font-bold group-hover:text-white transition-colors">{prog.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 px-8 pb-8">
                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed group-hover:text-foreground/80 transition-colors">{prog.description}</p>
                  
                  <div className="flex flex-col gap-4 mb-10">
                    <div className="flex items-center gap-4 text-sm font-semibold bg-white/5 rounded-xl p-4 border border-white/5 group-hover:bg-white/10 transition-colors">
                      <Clock className={`w-5 h-5 ${prog.textColor}`} />
                      <span className="text-foreground">Duration: 4 Weeks</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-semibold bg-white/5 rounded-xl p-4 border border-white/5 group-hover:bg-white/10 transition-colors">
                      <Globe className={`w-5 h-5 ${prog.textColor}`} />
                      <span className="text-foreground">Mode: 100% Remote</span>
                    </div>
                  </div>

                  <h4 className="font-bold text-foreground mb-5 flex items-center gap-2">
                    <Sparkles className={`w-4 h-4 ${prog.textColor}`} />
                    Skills Covered:
                  </h4>
                  <ul className="space-y-4">
                    {prog.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground group-hover:text-foreground/70 transition-colors">
                        <CheckCircle2 className={`w-5 h-5 ${prog.textColor} shrink-0 mt-0.5`} />
                        <span className="text-[15px]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8 pt-4">
                  <Link href="/apply" className="w-full">
                    <Button className={`w-full py-7 text-xl font-bold bg-gradient-to-r ${prog.color} hover:opacity-90 border-0 text-white shadow-xl ${prog.shadow} rounded-2xl group/btn transition-all hover:scale-[1.02] active:scale-[0.98] shimmer`}>
                      Register Now
                      <ArrowRight className="ml-2 w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
