import { MainLayout } from "@/components/layout/MainLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Linkedin, Mail, MapPin, Phone, Send, MessageSquare, Users, Zap } from "lucide-react";

export default function Contact() {
  const mutation = useSubmitContact();
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(data: InsertContactMessage) {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  }

  const steps = [
    {
      icon: MessageSquare,
      title: "We prepare a proposal",
      description: "Tell us about your project and we'll prepare a detailed proposal within 24 hours."
    },
    {
      icon: Users,
      title: "Together we discuss",
      description: "We'll have a call to discuss your requirements and fine-tune the proposal to your needs."
    },
    {
      icon: Zap,
      title: "Let's start building",
      description: "Once you're happy, we'll kick off the project and start bringing your ideas to life!"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex justify-between items-start mb-12">
            <div className="text-sm text-blue-300 mb-2">support@skyforger.com</div>
            <div className="flex items-center gap-6">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="text-sm text-blue-300">Begin project</div>
              <div className="text-sm text-blue-300">Contact</div>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold mb-4 text-white leading-tight">
                Contact Us
              </h1>
              <p className="text-xl text-blue-200 max-w-lg">
                Looking for a design partner? You found it.
              </p>
            </motion.div>
          </div>

          <div className="flex items-center gap-6 mt-12">
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              <div className="w-5 h-5 border-2 border-blue-300 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              </div>
            </a>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-blue-300"></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-8 text-slate-900">
                What will be your next step?
              </h2>
              <p className="text-slate-600 mb-10 text-lg">
                You are one step closer to build your perfect product.
              </p>

              <div className="space-y-8">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      className="relative pl-12"
                    >
                      {/* Numbered circle */}
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-pink-500 flex items-center justify-center">
                        <span className="text-pink-500 font-bold text-sm">{i + 1}</span>
                      </div>
                      
                      {/* Connecting line */}
                      {i < steps.length - 1 && (
                        <div className="absolute left-4 top-8 w-0.5 h-16 bg-pink-500"></div>
                      )}

                      <div className="flex items-start gap-4 mb-2">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-pink-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed ml-14">
                        {step.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-200">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Write us a few words about your project and we'll prepare a proposal for you within 24 hours.
                    </h3>
                  </div>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Your name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                className="bg-slate-50 border-slate-300 rounded-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all h-12 px-4" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Your email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="Your email" 
                                className="bg-slate-50 border-slate-300 rounded-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all h-12 px-4" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Company</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Company" 
                                className="bg-slate-50 border-slate-300 rounded-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all h-12 px-4" 
                                {...field} 
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Budget</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full bg-slate-50 border-slate-300 rounded-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all h-12 px-4"
                          >
                            <option>Select budget</option>
                            <option>$500 - $1000</option>
                            <option>$1000 - $5000</option>
                            <option>$5000 - $10000</option>
                            <option>$10000+</option>
                          </select>
                        </FormControl>
                      </FormItem>
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Project details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project" 
                              className="bg-slate-50 border-slate-300 rounded-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all min-h-[120px] p-4 resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-16 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white/70 rounded-full ml-1"></div>
                        <div className="w-1 h-1 bg-white/50 rounded-full ml-1"></div>
                      </div>
                      <span className="text-xs text-slate-500 italic">
                        0x0001 111E 015... It's not a hot
                      </span>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-14 rounded-none bg-slate-900 hover:bg-slate-800 text-white transition-all font-bold flex items-center justify-center gap-3"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send</span>
                        </>
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center">
                    If you need to send a DNA file, just contact us at <a href="mailto:skyforgertechnologies@gmail.com" className="text-blue-600 font-bold">skyforgertechnologies@gmail.com</a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-display font-extrabold text-white mb-4">
                Need a help?
              </h3>
              <p className="text-blue-200 mb-6">
                We are available for hire
              </p>
              <a href="#" className="text-white font-bold underline">
                Create a free consultation
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
                  Social
                </div>
                <div className="space-y-2 text-sm text-blue-200">
                  <div>LinkedIn</div>
                  <div>Behance</div>
                  <div>Dribbble</div>
                  <div>Instagram</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
                  Services
                </div>
                <div className="space-y-2 text-sm text-blue-200">
                  <div>UI/UX Design</div>
                  <div>Web Development</div>
                  <div>Mobile Apps</div>
                  <div>Branding</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
                  Case Studies
                </div>
                <div className="space-y-2 text-sm text-blue-200">
                  <div>Fintech</div>
                  <div>E-commerce</div>
                  <div>Healthcare</div>
                  <div>Education</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
                  About
                </div>
                <div className="space-y-2 text-sm text-blue-200">
                  <div>Our Story</div>
                  <div>Team</div>
                  <div>Careers</div>
                  <div>Blog</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-12 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <div className="w-5 h-5 border-2 border-blue-300 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                </div>
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-blue-300"></div>
                </div>
              </a>
            </div>
            <div className="text-lg font-display font-bold text-white">
              SKYFORGER
            </div>
            <div className="text-xs text-blue-400">
              2023 © SKYFORGER TECHNOLOGIES — All Rights Reserved
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
