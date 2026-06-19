import { MainLayout } from "@/components/layout/MainLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, Sparkles, ChevronDown, Circle } from "lucide-react";

const faqs = [
  {
    q: "Are the internships fully remote?",
    a: "Yes, all SkyForger internships are 100% remote. You can complete the tasks from anywhere in the world, on your own schedule, as long as deadlines are met.",
    meta: "FLEXIBILITY",
    category: "popular"
  },
  {
    q: "What is the duration of the program?",
    a: "Our standard internship programs run for 4 weeks. During this time, you will receive a series of structured tasks designed to simulate real project sprints.",
    meta: "TIMELINE",
    category: "popular"
  },
  {
    q: "Do I get a certificate upon completion?",
    a: "Absolutely. Upon successful completion of all assigned tasks, you will receive a verifiable Certificate of Completion detailing your domain and the skills demonstrated.",
    meta: "CREDENTIALS",
    category: "popular"
  },
  {
    q: "Do I need prior experience to apply?",
    a: "Basic foundational knowledge in your chosen domain is recommended (e.g., basic HTML/CSS for Frontend, basic Python for AI). Our tasks are designed to challenge you and build upon those foundations.",
    meta: "PREREQUISITES",
    category: "general"
  },
  {
    q: "What is the selection process?",
    a: "After you submit your application, our team reviews your profile and statement of interest. Selected candidates will receive an acceptance email with instructions to begin their first task.",
    meta: "PROCESS",
    category: "general"
  }
];

export default function FAQ() {
  const popularFaqs = faqs.filter(faq => faq.category === "popular");
  const generalFaqs = faqs.filter(faq => faq.category === "general");

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-3">
              <a href="#" className="text-sm text-slate-600 hover:text-slate-900">Home</a>
              <span className="text-slate-400">/</span>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-900">Company</a>
              <span className="text-slate-400">/</span>
              <a href="#" className="text-sm text-blue-600 font-bold">Support</a>
            </div>
          </div>
          
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 mb-4"
            >
              Frequently Asked Questions
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              We've categorized the most common questions to make it easier for you to find the answers you need.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            {/* Popular Questions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 mb-8 text-center">
                Popular Questions
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {popularFaqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`popular-${i}`}
                    className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:bg-slate-50 transition-colors hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-lg md:text-xl font-semibold text-slate-900">{faq.q}</span>
                        <Circle className="w-6 h-6 text-slate-300" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-0 text-base md:text-lg text-slate-600">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* General Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 mb-8 text-center">
                General Information
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {generalFaqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`general-${i}`}
                    className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:bg-slate-50 transition-colors hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-lg md:text-xl font-semibold text-slate-900">{faq.q}</span>
                        <Circle className="w-6 h-6 text-slate-300" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-0 text-base md:text-lg text-slate-600">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
