import { MainLayout } from "@/components/layout/MainLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, Sparkles, ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Are the internships fully remote?",
    a: "Yes, all SkyForger internships are 100% remote. You can complete the tasks from anywhere in the world, on your own schedule, as long as deadlines are met.",
    meta: "FLEXIBILITY"
  },
  {
    q: "What is the duration of the program?",
    a: "Our standard internship programs run for 4 weeks. During this time, you will receive a series of structured tasks designed to simulate real project sprints.",
    meta: "TIMELINE"
  },
  {
    q: "Do I get a certificate upon completion?",
    a: "Absolutely. Upon successful completion of all assigned tasks, you will receive a verifiable Certificate of Completion detailing your domain and the skills demonstrated.",
    meta: "CREDENTIALS"
  },
  {
    q: "Do I need prior experience to apply?",
    a: "Basic foundational knowledge in your chosen domain is recommended (e.g., basic HTML/CSS for Frontend, basic Python for AI). Our tasks are designed to challenge you and build upon those foundations.",
    meta: "PREREQUISITES"
  },
  {
    q: "What is the selection process?",
    a: "After you submit your application, our team reviews your profile and statement of interest. Selected candidates will receive an acceptance email with instructions to begin their first task.",
    meta: "PROCESS"
  }
];

export default function FAQ() {
  return (
    <MainLayout>
      <div className="min-h-screen relative overflow-hidden bg-[#020617] pt-32 pb-24">
        {/* Advanced Animative Background - Matching Design System */}
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
          {/* Header Section */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-1.5 h-1.5 bg-primary" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-muted-foreground/80">
                Support & Information
              </span>
            </motion.div>

            <motion.h1 
              className="text-[10vw] md:text-[7vw] lg:text-[6vw] font-display font-extrabold mb-8 leading-[0.9] tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              Common <br />
              <span className="text-foreground/90">Questions</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl font-medium border-l border-white/10 pl-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Find detailed answers to common questions about our internship programs and application process.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            {/* Left Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="lg:col-span-1 space-y-8"
            >
              <div className="p-10 border border-white/5 bg-black/40 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full" />
                <HelpCircle className="w-12 h-12 text-primary mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                <h3 className="text-3xl font-display font-bold mb-6 tracking-tight">Need More Help?</h3>
                <p className="text-muted-foreground text-lg font-medium leading-relaxed mb-8">
                  Can't find what you're looking for? Our support team is ready to assist you with any specific inquiries.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Quick Contacts</div>
                  <a href="mailto:skyforgertechnologies@gmail.com" className="text-foreground hover:text-primary transition-colors font-bold tracking-tight">
                    skyforgertechnologies@gmail.com
                  </a>
                </div>
              </div>

              <div className="p-10 border border-white/5 bg-white/[0.02] relative overflow-hidden group">
                <Sparkles className="w-8 h-8 text-primary/40 mb-6" />
                <h4 className="text-xl font-display font-bold mb-4">Latest Cohort Status</h4>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Applications Open</span>
                </div>
              </div>
            </motion.div>

            {/* FAQ Accordion Section */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="lg:col-span-2"
            >
              <Accordion type="single" collapsible className="w-full space-y-6">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <AccordionItem value={`item-${i}`} className="border-white/5 bg-black/40 backdrop-blur-sm px-8 group">
                      <AccordionTrigger className="text-left text-2xl font-display font-bold hover:no-underline hover:text-primary transition-all py-8 group-data-[state=open]:text-primary">
                        <div className="flex flex-col gap-2">
                          <span className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground/40 uppercase group-data-[state=open]:text-primary/40 transition-colors">
                            {faq.meta}
                          </span>
                          <span>{faq.q}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-lg leading-relaxed font-medium pb-8 border-t border-white/5 pt-6">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
