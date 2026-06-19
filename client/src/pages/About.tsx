import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Users, Code, Award, Target, Heart, Lightbulb, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-28 pb-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="pt-8"
              >
                <span className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-4 block">About Us</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 mb-8 leading-tight">
                  Empowering Future Tech Professionals
                </h1>
                <p className="text-lg text-slate-700 leading-relaxed mb-10">
                  At SkyForger Technologies, we believe that practical experience is the key to unlocking potential in the tech industry. Our mission is to bridge the gap between academic learning and real-world application through hands-on internships, mentorship programs, and industry-focused training.
                </p>
                <Link href="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-none text-lg">
                    Contact Us
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-md mx-auto"
            >
              <img 
                src="/vector.png" 
                alt="About Us" 
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {[
                { number: "300+", label: "Interns Mentored", icon: Users },
                { number: "100+", label: "Live Projects", icon: Code },
                { number: "200+", label: "Success Stories", icon: Award },
                { number: "100+", label: "Certifications", icon: Target }
              ].map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: -12, transition: { duration: 0.2 } }}
                    className="p-10 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <StatIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <p className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 mb-3">
                      {stat.number}
                    </p>
                    <p className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-16 bg-blue-600 rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900">
                    Our Story
                  </h2>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <p className="text-lg text-slate-700 leading-relaxed">
                  Founded in 2022, SkyForger Technologies was born from a simple observation: too many talented individuals were struggling to transition from academic environments to professional roles. We realized that traditional education often lacked the practical, hands-on experience that employers truly value.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Our founders, having experienced this gap firsthand, set out to create a different kind of learning platform—one that combines real-world projects with expert mentorship. Today, we've helped hundreds of individuals launch their tech careers through our immersive internship programs.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  What makes us different is our commitment to quality over quantity. We work closely with industry partners to ensure our programs stay relevant, and we provide personalized support to every intern who joins our community.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-16 bg-blue-400 rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-display font-extrabold">
                    Our Mission
                  </h2>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <p className="text-xl text-slate-200 leading-relaxed">
                  To empower students and early-career professionals with practical, industry-relevant skills, building a resilient workforce ready for the challenges of tomorrow's tech industry.
                </p>
                <div className="pt-4">
                  <h3 className="text-xl font-bold text-blue-300 mb-6">Our Core Values:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { icon: Heart, label: "Excellence" },
                      { icon: Lightbulb, label: "Innovation" },
                      { icon: Globe, label: "Integrity" },
                      { icon: Users, label: "Community" }
                    ].map((value, i) => {
                      const ValueIcon = value.icon;
                      return (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                          <ValueIcon className="w-6 h-6 text-blue-300" />
                          <span className="text-lg text-slate-200">{value.label} in everything we do</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-16 bg-blue-600 rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900">
                    Our Vision
                  </h2>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <p className="text-lg text-slate-700 leading-relaxed">
                  To be the premier global launchpad for tech talent, recognized for transforming potential into measurable technical excellence. We envision a future where every aspiring technologist has access to the practical experience, mentorship, and opportunities they need to thrive.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  We're building a community where learning isn't just about acquiring knowledge—it's about applying it, making an impact, and growing together.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
