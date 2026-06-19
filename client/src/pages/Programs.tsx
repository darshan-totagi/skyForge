import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BrainCircuit, Code2, LayoutTemplate, Palette, Briefcase, Award, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const programs = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: BrainCircuit,
    description: "AI-integrated curriculum with project-based learning. Build real-world AI projects like chatbots, image recognition systems, and predictive models. Every phase is structured around how the best technical teams work today. Updated quarterly with industry trends."
  },
  {
    id: "fullstack",
    title: "MERN Stack Development",
    icon: Code2,
    description: "Master full-stack web development using MongoDB, Express.js, React, and Node.js. Design, develop, and deploy scalable web applications while working on authentication systems, APIs, dashboards, e-commerce platforms, and cloud deployment projects."
  },
  {
    id: "frontend",
    title: "Web Development",
    icon: LayoutTemplate,
    description: "Project-based curriculum that moves as the market does. Build responsive websites, PWAs, and modern web apps using React and cutting-edge technologies. Your portfolio will showcase real, deployable projects."
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    icon: Palette,
    description: "Create intuitive and visually appealing digital experiences through user-centered design. Learn wireframing, prototyping, user research, design systems, and industry-standard tools like Figma while building portfolio-ready projects for web and mobile applications."
  }
];

const internshipFeatures = [
  {
    icon: Briefcase,
    title: "Real-World Projects",
    description: "Work on live industry projects that add real value to your portfolio"
  },
  {
    icon: Award,
    title: "Industry-Recognized Certificate",
    description: "Receive a verified certificate upon successful completion of your internship"
  },
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    description: "Get personalized guidance from industry experts throughout your internship"
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Learn at your own pace with a schedule that fits your lifestyle"
  }
];

export default function Programs() {
  return (
    <MainLayout>
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden pt-20 bg-gradient-to-br from-blue-900 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-8 md:px-16 relative z-10 py-16">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-[11px] md:text-xs font-bold tracking-[0.4em] uppercase text-blue-300">
                WHY SKYFORGER
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-display font-extrabold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Project-Based Internship <span className="text-blue-400">Designed to Last</span>
            </motion.h1>

            <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
              Four things no other program gives you - real projects, real mentorship, real experience
            </p>
          </div>
        </div>
      </section>



      {/* Programs Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8 md:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 mb-4">
              Choose Your Specialization
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Pick the track that aligns with your career goals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog, i) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="border-l-4 border-blue-600 bg-white border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6">
                  <prog.icon className="w-10 h-10 text-blue-600" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {prog.title}
                </h3>

                <p className="text-slate-600 leading-relaxed text-sm">
                  {prog.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-8 md:px-16">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tighter text-slate-900">
              Ready to start your professional journey?
            </h2>
            <Link href="/apply">
              <Button className="h-16 px-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-[0.2em] uppercase flex items-center gap-4 rounded-none transition-all duration-300">
                Begin Application
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
