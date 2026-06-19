import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Cpu, Smartphone, Wrench, Globe, ArrowRight, CheckCircle2, Code, Zap, Sparkles, Layout, Palette, LineChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const services = [
  {
    id: "web-development",
    title: "Web Development",
    icon: Globe,
    desc: "Build modern, responsive websites and web applications with cutting-edge technologies",
    number: "01"
  },
  {
    id: "app-development",
    title: "App Development",
    icon: Smartphone,
    desc: "Create native and cross-platform mobile applications for iOS and Android",
    number: "02"
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    icon: Wrench,
    desc: "Keep your applications running smoothly with our dedicated maintenance and support services",
    number: "03"
  },
  {
    id: "ai-ml",
    title: "AI/ML",
    icon: Cpu,
    desc: "Leverage artificial intelligence and machine learning to power your business solutions",
    number: "04"
  }
];

const whyChooseUs = [
  {
    id: "quality",
    title: "Exceptional Quality",
    desc: "Delivering pixel-perfect products that meet your requirements and exceed expectations with attention to detail",
    icon: CheckCircle2
  },
  {
    id: "professional",
    title: "Expert Team",
    desc: "Our experienced professionals bring industry knowledge and cutting-edge skills to every project we undertake",
    icon: Users
  },
  {
    id: "experience",
    title: "Innovative Solutions",
    desc: "Transforming businesses with modern, scalable, and future-ready solutions powered by the latest technologies",
    icon: Sparkles
  }
];

export default function Services() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-400">We Provide Outsourced</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6 text-white leading-tight">
              IT Services & 
              <span className="block">Solutions</span>
            </h1>
            <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">
              We help teams turn their ideas into reality. Our approach ensures high quality, scalability, and performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-none text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="text-white border border-white hover:bg-white hover:text-slate-900 font-bold px-10 py-4 rounded-none text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Cards Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Services Cards Grid */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Globe,
                    title: "Web Development",
                    desc: "Build modern, responsive websites and web applications with cutting-edge technologies."
                  },
                  {
                    icon: Smartphone,
                    title: "App Development",
                    desc: "Create native and cross-platform mobile applications for iOS and Android."
                  },
                  {
                    icon: Wrench,
                    title: "Maintenance & Support",
                    desc: "Keep your applications running smoothly with our dedicated maintenance and support services."
                  },
                  {
                    icon: Layout,
                    title: "ERP Systems",
                    desc: "Implement and customize enterprise resource planning systems to streamline your business operations."
                  }
                ].map((service, i) => {
                  const ServiceIcon = service.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      className="bg-white p-10 rounded-xl border border-slate-200 hover:border-blue-300 shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="w-24 h-24 rounded-full border-2 border-blue-600 flex items-center justify-center mb-6">
                        <ServiceIcon className="w-12 h-12 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-display font-extrabold mb-4 text-slate-900">{service.title}</h3>
                      <p className="text-lg text-slate-600 leading-relaxed">{service.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-4 block">Our Services</span>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 mb-8">
                Best IT Solutions For Your Business
              </h2>
              <p className="text-lg text-slate-700 mb-10 leading-relaxed">
                Deliver projects on time and on budget using agile methodologies, ensuring your business goals are achieved efficiently.
              </p>
              <div className="space-y-5 mb-10">
                {[
                  "Discover, define and scope the project",
                  "Design and development in an agile way",
                  "Test and deploy to production",
                  "Monitor, maintain and improve"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <span className="text-lg text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-none text-lg">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-slate-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-30" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-blue-600 mb-4 block">OUR STRENGTHS</span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-6">
              Why Choose Us?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We stand out with our commitment to excellence, innovative approaches, and customer-centric solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {whyChooseUs.map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -16, scale: 1.03, transition: { duration: 0.3 } }}
                  className="bg-white p-12 rounded-2xl border border-slate-200 shadow-xl hover:shadow-2xl hover:border-blue-300 transition-all duration-400 group relative overflow-hidden"
                >
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-70 group-hover:bg-blue-100 transition-colors duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg mb-8 group-hover:shadow-blue-200 group-hover:scale-110 transition-all duration-400">
                      <ItemIcon className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-4 text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-lg leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
