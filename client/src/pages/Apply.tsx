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
import { Loader2, Sparkles, Send, User, Mail, Phone, GraduationCap, Calendar, Globe, Briefcase } from "lucide-react";

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
      <div className="min-h-screen relative overflow-hidden bg-[#020617] pt-32 pb-24">
        {/* Advanced Animative Background - Matching Home Page */}
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

          {/* Moving Blending Orbs */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              animate={{
                x: [`${Math.random() * 80}%`, `${Math.random() * 80}%`],
                y: [`${Math.random() * 80}%`, `${Math.random() * 80}%`],
              }}
              transition={{
                duration: 25 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 mix-blend-overlay"
              style={{
                background: i % 2 === 0 
                  ? "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)"
                  : "radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)",
                top: i * 30 + "%",
                left: i * 20 + "%",
              }}
            />
          ))}

          {/* Tech Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{ 
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Data Stream lines */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`stream-${i}`}
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear",
              }}
              className="absolute h-[1px] w-[300px] bg-gradient-to-r from-transparent via-primary to-transparent blur-[1px]"
              style={{
                top: `${20 + i * 20}%`,
                left: "-10%",
              }}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-1.5 h-1.5 bg-primary" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted-foreground/80">
                  Career Launchpad
                </span>
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6 tracking-tighter"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              >
                Internship <span className="text-foreground/90">Application</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl font-medium border-l border-white/10 pl-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Take the first step towards your professional tech career. Fill out the secure form below to join our next cohort.
              </motion.p>
            </div>

            {/* Compact Internship Benefits Ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8 overflow-hidden relative max-w-4xl"
            >
              <div className="flex whitespace-nowrap gap-8 py-2 border-y border-white/5 bg-white/[0.02]">
                <motion.div
                  animate={{ x: [0, -1000] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="flex gap-12 items-center"
                >
                  {[...Array(3)].map((_, i) => (
                    <React.Fragment key={i}>
                      {[
                        "INDUSTRY MENTORSHIP",
                        "REAL-WORLD PROJECTS",
                        "VERIFIED CERTIFICATION",
                        "TASK-BASED LEARNING",
                        "REMOTE FLEXIBILITY"
                      ].map((text) => (
                        <div key={text} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          <span className="text-[9px] font-bold tracking-[0.2em] text-muted-foreground/60">{text}</span>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </motion.div>
              </div>
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#020617] to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#020617] to-transparent z-10" />
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="relative max-w-4xl"
            >
              {/* Decorative Corner Elements */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/30 z-20" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/30 z-20" />

              <div className="glass-card border border-white/5 bg-black/40 backdrop-blur-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <div className="flex items-center gap-2">
                              <User className="w-3.5 h-3.5 text-primary" />
                              <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Full name</FormLabel>
                            </div>
                            <FormControl>
                              <Input 
                                placeholder="e.g. John Doe" 
                                className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all h-10 px-0 text-base placeholder:text-muted-foreground/20" 
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
                          <FormItem className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-primary" />
                              <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Email address</FormLabel>
                            </div>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="e.g. john@example.com" 
                                className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all h-10 px-0 text-base placeholder:text-muted-foreground/20" 
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
                          <FormItem className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-primary" />
                              <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Phone number</FormLabel>
                            </div>
                            <FormControl>
                              <Input 
                                placeholder="+1 (555) 000-0000" 
                                className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all h-10 px-0 text-base placeholder:text-muted-foreground/20" 
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
                          <FormItem className="space-y-3">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-3.5 h-3.5 text-primary" />
                              <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">College / University</FormLabel>
                            </div>
                            <FormControl>
                              <Input 
                                placeholder="Tech University" 
                                className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all h-10 px-0 text-base placeholder:text-muted-foreground/20" 
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
                          <FormItem className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-primary" />
                              <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Year of study</FormLabel>
                            </div>
                            <FormControl>
                              <Input 
                                placeholder="e.g. 3rd Year" 
                                className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all h-10 px-0 text-base placeholder:text-muted-foreground/20" 
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
                          <FormItem className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-3.5 h-3.5 text-primary" />
                              <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Select specialization</FormLabel>
                            </div>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-transparent border-0 border-b border-white/10 rounded-none focus:ring-0 focus:border-primary transition-all h-10 px-0 text-base">
                                  <SelectValue placeholder="Choose a domain" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-black border-white/10 text-foreground">
                                <SelectItem value="Artificial Intelligence" className="focus:bg-primary/20">Artificial Intelligence</SelectItem>
                                <SelectItem value="Full Stack Development" className="focus:bg-primary/20">Full Stack Development</SelectItem>
                                <SelectItem value="Frontend Development" className="focus:bg-primary/20">Frontend Development</SelectItem>
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
                        <FormItem className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5 text-primary" />
                            <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">GitHub / Portfolio URL (Optional)</FormLabel>
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="https://github.com/yourusername" 
                              className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all h-10 px-0 text-base placeholder:text-muted-foreground/20" 
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
                        <FormItem className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Statement of Interest</FormLabel>
                          </div>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your background and why you want to join..." 
                              className="bg-transparent border border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all min-h-[120px] p-4 text-base placeholder:text-muted-foreground/20 resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-6">
                      <Button 
                        type="submit" 
                        className="w-full h-14 rounded-none bg-primary text-black hover:bg-white transition-all font-bold text-base tracking-[0.2em] uppercase group flex items-center justify-center gap-4 relative overflow-hidden disabled:opacity-50"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            <span>Submit Application</span>
                          </>
                        )}
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/10" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
