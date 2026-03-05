import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BrainCircuit, Code2, LayoutTemplate, Clock, Globe, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const programs = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: BrainCircuit,
    color: "from-blue-500 to-cyan-400",
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
    shadow: "shadow-purple-500/20",
    description: "Learn to build complete web applications from database to UI using modern frameworks.",
    details: [
      "RESTful API design and creation",
      "Database modeling and management",
      "Authentication and Security",
      "End-to-end application deployment"
    ]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: LayoutTemplate,
    color: "from-orange-500 to-amber-500",
    shadow: "shadow-orange-500/20",
    description: "Master the art of creating beautiful, interactive user interfaces and web experiences.",
    details: [
      "Advanced CSS and Tailwind",
      "React state management",
      "Responsive and accessible design",
      "Performance optimization"
    ]
  }
];

export default function Programs() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-6 py-12 lg:py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Internship <span className="text-primary">Programs</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Choose your specialized path. All programs are intensive, remote, and designed to simulate real industry work environments.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <Card className={`glass-card h-full flex flex-col hover:border-white/20 transition-all duration-300 shadow-xl hover:${prog.shadow}`}>
                <div className={`h-2 w-full bg-gradient-to-r ${prog.color}`} />
                <CardHeader className="pt-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center mb-6`}>
                    <prog.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-display">{prog.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-6">{prog.description}</p>
                  
                  <div className="flex flex-col gap-3 mb-8">
                    <div className="flex items-center gap-3 text-sm font-medium bg-white/5 rounded-lg p-3">
                      <Clock className="w-5 h-5 text-primary" />
                      Duration: 4 Weeks
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium bg-white/5 rounded-lg p-3">
                      <Globe className="w-5 h-5 text-primary" />
                      Mode: 100% Remote
                    </div>
                  </div>

                  <h4 className="font-semibold text-foreground mb-4">Skills Covered:</h4>
                  <ul className="space-y-3">
                    {prog.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pb-8 pt-4">
                  <Link href="/apply" className="w-full">
                    <Button className={`w-full py-6 text-lg font-semibold bg-gradient-to-r ${prog.color} hover:opacity-90 border-0 text-white shadow-lg ${prog.shadow}`}>
                      Register Now
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
