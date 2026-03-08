import { MainLayout } from "@/components/layout/MainLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "Are the internships fully remote?",
    a: "Yes, all SkyForger internships are 100% remote. You can complete the tasks from anywhere in the world, on your own schedule, as long as deadlines are met."
  },
  {
    q: "What is the duration of the program?",
    a: "Our standard internship programs run for 4 weeks. During this time, you will receive a series of structured tasks designed to simulate real project sprints."
  },
  {
    q: "Do I get a certificate upon completion?",
    a: "Absolutely. Upon successful completion of all assigned tasks, you will receive a verifiable Certificate of Completion detailing your domain and the skills demonstrated."
  },
  {
    q: "Do I need prior experience to apply?",
    a: "Basic foundational knowledge in your chosen domain is recommended (e.g., basic HTML/CSS for Frontend, basic Python for AI). Our tasks are designed to challenge you and build upon those foundations."
  },
  {
    q: "What is the selection process?",
    a: "After you submit your application, our team reviews your profile and statement of interest. Selected candidates will receive an acceptance email with instructions to begin their first task."
  }
];

export default function FAQ() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-6 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Frequently Asked <span className="text-primary">Questions</span></h1>
            <p className="text-muted-foreground text-lg">Find answers to common questions about our internship programs.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-10 shadow-xl"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
