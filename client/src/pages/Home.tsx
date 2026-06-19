import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Cpu, Code, Monitor, 
  UserPlus, FileCheck, FileCheck2, Send, Award, 
  Sparkles, ChevronDown, Palette, TrendingUp, Users, Zap, Star,
  Code2, BrainCircuit, LayoutTemplate
} from "lucide-react";
import { AdSection } from "@/components/AdSection";
import { TechTicker } from "@/components/TechTicker";
import { Reviews } from "@/components/Reviews";
import { useState } from "react";

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const heroParallaxY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  
  const steps = [
    { 
      icon: UserPlus, 
      title: "Get Enrolled", 
      desc: "Sign up and choose your domain of interest", 
      details: "Start your journey by creating your account and selecting the program that aligns with your career goals. Our team will guide you through the onboarding process to ensure you have everything you need." 
    },
    { 
      icon: FileCheck2, 
      title: "Learn Daily", 
      desc: "Complete curated learning modules and tasks", 
      details: "Follow our structured learning path with daily tasks, video lectures, and interactive exercises. Build your skills step by step with expert-curated content designed for real-world application." 
    },
    { 
      icon: Send, 
      title: "Submit Work", 
      desc: "Showcase your projects for expert feedback", 
      details: "Work on real industry projects and submit them for review. Get detailed feedback from our mentors to help you improve and refine your work to professional standards." 
    },
    { 
      icon: Award, 
      title: "Get Certified", 
      desc: "Earn your verified certificate of completion", 
      details: "Upon successful completion of all requirements, receive your industry-recognized certificate. Share it on your LinkedIn profile and resume to showcase your expertise to potential employers." 
    },
  ];

  const SectionHeading = ({ children, subtitle, badge }: { children: React.ReactNode; subtitle?: string; badge?: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-16"
    >
      {badge && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2 h-2 bg-blue-300 rounded-full" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-300">{badge}</span>
          <div className="w-2 h-2 bg-blue-300 rounded-full" />
        </div>
      )}
      <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-4 leading-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-700 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );

  return (
    <MainLayout>
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
        style={{ y: heroParallaxY }}
      >
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105"
          >
            <source src="/background.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/80" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold leading-tight mb-6 text-slate-900">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block"
              >
                Empowering Future
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block"
              >
                Innovators with Technology,
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="block"
              >
                Skills, and AI-Driven Learning
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-700 text-center max-w-2xl mb-12 leading-relaxed"
          >
            Whether you're building a business or building a career, our solutions and expert-led learning help you move forward with confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link href="/apply">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-8 rounded-none transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button className="bg-white text-blue-600 font-bold text-lg py-4 px-8 rounded-none border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Explore Programs
              </Button>
            </Link>
          </motion.div>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl"
          >
            {[
              { label: "Candidates", value: "300+", icon: Users },
              { label: "Certifications", value: "100+", icon: Star },
              { label: "Projects", value: "100+", icon: Code2 },
              { label: "Success Stories", value: "200+", icon: TrendingUp }
            ].map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
                  className="text-center bg-white/90 backdrop-blur p-8 rounded-lg shadow-lg border border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300"
                >
                  <StatIcon className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                  <div className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <ChevronDown className="w-8 h-8 text-slate-900" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Ad Section */}
      <div className="relative">
        <AdSection />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Programs Section */}
      <motion.section 
        className="py-24 bg-gradient-to-br from-white via-blue-50 to-blue-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <SectionHeading subtitle="Master the skills that matter with our industry-relevant programs" badge="OUR PROGRAMS">
            Choose Your Path
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BrainCircuit,
                title: "Artificial Intelligence",
                desc: "Build intelligent systems with Python, TensorFlow, and real-world projects"
              },
              {
                icon: Code2,
                title: "MERN Stack Development",
                desc: "Become a MERN stack pro with modern web development techniques"
              },
              {
                icon: LayoutTemplate,
                title: "Web Development",
                desc: "Create beautiful, responsive websites with React and modern CSS"
              },
              {
                icon: Palette,
                title: "UI/UX Design",
                desc: "Design intuitive user experiences with Figma and design systems"
              }
            ].map((program, i) => {
              const ProgramIcon = program.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.2 } }}
                  className="group relative bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-blue-300"
                >
                  <div className="mb-6">
                    <ProgramIcon className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-4">{program.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{program.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Tech Ticker */}
      <div className="relative bg-gradient-to-b from-blue-900 to-slate-50">
        <TechTicker />
      </div>

      {/* How It Works Section */}
      <motion.section 
        className="py-24 bg-slate-50 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <SectionHeading subtitle="Start your journey to success with our streamlined learning path" badge="HOW IT WORKS">
            Simple 4-Step Process
          </SectionHeading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Steps List */}
            <div className="lg:col-span-1 space-y-4">
              {steps.map((step, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setActiveStep(i)}
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                  className={`w-full text-left p-6 rounded-lg transition-all duration-300 ${
                    activeStep === i 
                      ? 'bg-blue-900 text-white shadow-xl scale-105' 
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                      activeStep === i ? 'bg-blue-600' : 'bg-slate-200 text-slate-700'
                    }`}>
                      0{i+1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-sm opacity-80">{step.desc}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Details Box */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {(() => {
                  const currentStep = steps[activeStep];
                  const StepIcon = currentStep.icon;
                  return (
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, x: 40, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -40, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="bg-gradient-to-br from-blue-900 via-blue-900 to-slate-900 p-12 rounded-xl text-white shadow-2xl"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center">
                          <StepIcon className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-medium leading-[120%] tracking-[-1px] text-white sm:text-[44px]">0{activeStep+1} {currentStep.title}</h3>
                          <p className="text-blue-200">{currentStep.desc}</p>
                        </div>
                      </div>
                      <p className="text-lg text-blue-100 leading-relaxed mb-8">
                        {currentStep.details}
                      </p>
                      <Link href="/apply">
                        <Button className="bg-white text-blue-900 hover:bg-slate-100 text-lg font-bold py-4 px-8 rounded-none transition-all duration-300 hover:scale-105 hover:shadow-xl">
                          Get Started
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </Link>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Highlight */}
      <motion.section 
        className="py-24 bg-gradient-to-b from-slate-50 to-white relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading subtitle="Why choose us for your learning journey" badge="WHY CHOOSE US">
            What Sets Us Apart
          </SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Industry-Relevant", desc: "Curriculum designed with industry experts to ensure you learn what's actually in demand" },
              { icon: Users, title: "Mentor Support", desc: "Get personalized guidance and feedback from experienced professionals" },
              { icon: Sparkles, title: "Hands-On Projects", desc: "Build a strong portfolio with real-world projects and practical assignments" }
            ].map((feature, i) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group bg-white p-10 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-all duration-300">
                    <FeatureIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-700 leading-relaxed">{feature.desc}</p>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="w-12 h-1 bg-blue-600 rounded-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Reviews */}
      <motion.div 
        className="relative bg-gradient-to-b from-white to-blue-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Reviews />
      </motion.div>

      {/* CTA Section */}
      <motion.section 
        className="py-24 bg-gradient-to-b from-blue-50 to-blue-600 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full opacity-20"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 rounded-full opacity-20"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-slate-700 mb-10 max-w-2xl mx-auto">
              Join thousands of successful learners and transform your career today
            </p>
            <Link href="/apply">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-6 px-12 rounded-none transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                Enroll Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </MainLayout>
  );
}
