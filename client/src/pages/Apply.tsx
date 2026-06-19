import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertApplicationSchema, type InsertApplication } from "@shared/schema";
import { useSubmitApplication } from "@/hooks/use-applications";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Send, User, Mail, Phone, GraduationCap, Calendar, Globe, Briefcase, ArrowRight, MessageSquare, Award, CheckCircle2 } from "lucide-react";

export default function Apply() {
  const mutation = useSubmitApplication();
  
  const form = useForm<InsertApplication>({
    resolver: zodResolver(insertApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      college: "",
      yearOfStudy: "",
      portfolioUrl: "",
      domain: undefined,
      statement: "",
    },
  });

  function onSubmit(data: InsertApplication) {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  }

  return (
    <MainLayout>
      <div className="min-h-screen w-full relative">
        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.3) contrast(1.2)'
            }} />
          </div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(315deg, rgba(255,255,255,0.05) 25%, transparent 25%)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 0, 20px -20px, 0px 20px'
          }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-3">
                <a href="#" className="text-sm text-blue-100 hover:text-white">Home</a>
                <span className="text-blue-300">/</span>
                <a href="#" className="text-sm text-blue-300 font-bold">Apply Now</a>
              </div>
            </div>
            
            <div className="text-center mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4"
              >
                Internship Application
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-blue-100 max-w-2xl mx-auto"
              >
                Take the first step towards your professional tech career. Fill out the secure form below to join our next cohort.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Left Column - Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 mb-4">
                    What will be your next step?
                  </h2>
                  <p className="text-lg text-slate-600 mb-8">
                    You are one step closer to building your perfect future with SkyForger Technologies.
                  </p>
                </div>

                {/* Benefits Steps */}
                <div className="space-y-6">
                  {[
                    {
                      num: "01",
                      title: "We process your application",
                      desc: "Our team reviews your profile and statement of interest carefully."
                    },
                    {
                      num: "02",
                      title: "Together we discuss your goals",
                      desc: "Selected candidates receive an acceptance email and onboarding details."
                    },
                    {
                      num: "03",
                      title: "Let's start building",
                      desc: "Begin your first task and start your journey towards tech excellence."
                    }
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-lg">{step.num}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-1">{step.title}</h3>
                        <p className="text-slate-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Benefits List */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Join Us?</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Industry Mentorship",
                      "Real-world Projects",
                      "Verified Certification",
                      "Task-based Learning",
                      "Remote Flexibility"
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-200">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Write to us a few words</h3>
                      <p className="text-slate-500 text-sm">about your project and we'll prepare a proposal for you within 24 hours.</p>
                    </div>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      
                      {/* Form Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium text-slate-700">Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g. John Doe" 
                                  className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all" 
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
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium text-slate-700">Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="e.g. john@example.com" 
                                  className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium text-slate-700">Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="+1 (555) 000-0000" 
                                  className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="college"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium text-slate-700">College / University</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Tech University" 
                                  className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="yearOfStudy"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium text-slate-700">Year of Study</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g. 3rd Year" 
                                  className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="domain"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium text-slate-700">Select Specialization</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all">
                                    <SelectValue placeholder="Choose a domain" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white border-slate-200 text-slate-900">
                                  <SelectItem value="Artificial Intelligence" className="focus:bg-blue-50">Artificial Intelligence</SelectItem>
                                  <SelectItem value="MERN Stack Development" className="focus:bg-blue-50">MERN Stack Development</SelectItem>
                                  <SelectItem value="Web Development" className="focus:bg-blue-50">Web Development</SelectItem>
                                  <SelectItem value="UI/UX Design" className="focus:bg-blue-50">UI/UX Design</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="portfolioUrl"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-medium text-slate-700">GitHub / Portfolio URL (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://github.com/yourusername" 
                                className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                {...field} 
                                value={field.value || ''} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="statement"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-medium text-slate-700">Statement of Interest (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your background and why you want to join..." 
                                className="bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[140px] p-4 resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          className="w-full h-12 rounded-full bg-black hover:bg-slate-800 text-white font-semibold text-base transition-all flex items-center justify-center gap-2"
                          disabled={mutation.isPending}
                        >
                          {mutation.isPending ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Application</span>
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>

                  <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-500">
                      If you want to hear from us directly, just contact us at <a href="mailto:contact@skyforger.com" className="text-blue-600 font-medium">contact@skyforger.com</a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-4">Need a help?</h2>
              <p className="text-blue-100 text-lg mb-8">We are available for hire</p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 rounded-full px-8">
                Create a free consultation
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
              {[
                { title: "Services", items: ["Web Development", "UI/UX Design", "AI Solutions"] },
                { title: "Company", items: ["About Us", "Careers", "Contact"] },
                { title: "Case Studies", items: ["E-commerce", "SaaS", "Mobile Apps"] },
                { title: "About Us", items: ["Our Story", "Team", "Blog"] }
              ].map((section, i) => (
                <div key={i}>
                  <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j}>
                        <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-blue-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-white font-bold">SkyForger</span>
              </div>
              <p className="text-blue-300 text-sm">© 2025 SkyForger Technologies. All rights reserved.</p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
