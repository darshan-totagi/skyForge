import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Cpu, Smartphone, Palette, Database, Wrench, LineChart, ArrowRight, CheckCircle2, Code, Zap, Rocket, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const services = [
  {
    id: "web-dev",
    title: "Web Development",
    icon: Code,
    description: "Custom web applications built with modern frameworks and best practices for scalability and performance.",
    features: ["React / Next.js", "Vue.js / Nuxt", "Responsive Design", "API Integration", "SEO Optimization"],
    color: "from-primary to-secondary"
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    icon: Cpu,
    description: "Tailor-made software solutions designed specifically to address your unique business challenges and workflows.",
    features: ["Enterprise Solutions", "SaaS Applications", "Workflow Automation", "Legacy System Modernization", "Scalable Architecture"],
    color: "from-secondary to-accent"
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    icon: Palette,
    description: "Pixel-perfect designs focused on user satisfaction and conversion optimization for your digital products.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
    color: "from-accent to-primary"
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: Database,
    description: "Robust and scalable backend systems with secure APIs, databases, and cloud infrastructure.",
    features: ["Node.js / Express", "Python / Django", "PostgreSQL", "MongoDB", "REST & GraphQL APIs"],
    color: "from-primary to-accent"
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: Cpu,
    description: "Intelligent solutions powered by cutting-edge AI and machine learning technologies.",
    features: ["Custom AI Models", "NLP Solutions", "Computer Vision", "Predictive Analytics", "Automation"],
    color: "from-secondary to-primary"
  },
  {
    id: "maintenance",
    title: "Website Maintenance & Support",
    icon: RefreshCw,
    description: "Ongoing website maintenance, updates, and technical support to keep your digital presence running smoothly.",
    features: ["Regular Updates", "Bug Fixes", "Performance Optimization", "Security Monitoring", "24/7 Technical Support"],
    color: "from-accent to-secondary"
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Planning",
    description: "We deeply understand your requirements, goals, and target audience to create a comprehensive project roadmap."
  },
  {
    number: "02",
    title: "Design & Prototyping",
    description: "Creating visually stunning and user-friendly designs with interactive prototypes for your approval."
  },
  {
    number: "03",
    title: "Development",
    description: "Building your product using cutting-edge technologies, following best practices and agile methodologies."
  },
  {
    number: "04",
    title: "Testing & QA",
    description: "Rigorous testing across all platforms to ensure your product is bug-free and performs flawlessly."
  },
  {
    number: "05",
    title: "Launch & Support",
    description: "Deploying your product and providing ongoing support, maintenance, and updates as needed."
  }
];

export default function Services() {
  return (
    <MainLayout>
      <div className="min-h-screen relative overflow-hidden bg-[#020617] pt-32 pb-24">
        {/* Advanced Animative Background */}
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
                Professional Services
              </span>
            </motion.div>

            <motion.h1 
              className="text-[10vw] md:text-[7vw] lg:text-[6vw] font-display font-extrabold mb-8 leading-[0.9] tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              Building Digital <br />
              <span className="text-primary drop-shadow-[0_0_20px_rgba(var(--primary),0.3)]">Solutions</span> That Drive Results
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl font-medium border-l border-white/10 pl-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We deliver high-quality, scalable digital products tailored to your business needs. From startups to enterprises, we build solutions that make an impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <Button className="text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/25 border-0 py-6 px-10 group">
                  Start Your Project
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="text-lg font-semibold border border-white/10 hover:bg-white/5 py-6 px-10">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Services Grid */}
          <section className="mb-32">
            <div className="text-center mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-display font-extrabold mb-6 tracking-tight"
              >
                Our Services
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Comprehensive digital services to help your business thrive in the modern world.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="group relative"
                >
                  <div className="relative h-full bg-black/40 border border-white/5 hover:border-primary/30 transition-all duration-700 overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700`} />
                    
                    <div className="relative p-10 z-10">
                      {/* Icon */}
                      <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-8 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
                        <service.icon className="w-8 h-8 text-primary" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-display font-bold mb-6 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-4 mb-10">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground/90 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Link href="/contact">
                        <Button variant="ghost" className="w-full border border-white/10 hover:border-primary hover:bg-primary/10 group-hover:text-primary transition-all">
                          Get Started
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-32">
            <div className="text-center mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-display font-extrabold mb-6 tracking-tight"
              >
                Our Process
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                A proven, systematic approach to delivering exceptional digital products.
              </motion.p>
            </div>

            <div className="space-y-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="flex flex-col md:flex-row items-start md:items-center gap-8 bg-black/30 border border-white/5 p-10 hover:border-primary/20 transition-all duration-500"
                >
                  <div className="flex-shrink-0">
                    <span className="text-6xl md:text-8xl font-display font-extrabold text-primary/20">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5" />
            <div className="container mx-auto px-6 md:px-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center py-24"
              >
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-8" />
                <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-8 tracking-tight">
                  Ready to Bring Your <span className="text-primary">Vision</span> to Life?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                  Let's discuss your project and create something extraordinary together.
                </p>
                <Link href="/contact">
                  <Button className="text-xl font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/25 border-0 py-8 px-16 group">
                    Start Your Project
                    <Rocket className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
