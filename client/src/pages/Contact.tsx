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
import { Loader2, Mail, Linkedin, Globe, Send } from "lucide-react";

const FloatingShape = () => {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto flex items-center justify-center">
      {/* Glow effect */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-full h-full bg-primary/20 blur-[80px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 w-full h-full">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-[1px] border-primary/20 rounded-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
        </motion.div>

        {/* Middle Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 border-[1px] border-secondary/30 rounded-full"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_12px_rgba(var(--secondary),0.8)]" />
        </motion.div>

        {/* Inner Ring with Dashed line */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-16 border-[1px] border-dashed border-accent/40 rounded-full"
        />

        {/* Core Tech Orb */}
        <div className="absolute inset-24 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 40px rgba(var(--primary), 0.3)",
                "0 0 60px rgba(var(--primary), 0.6)",
                "0 0 40px rgba(var(--primary), 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full rounded-full bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden flex items-center justify-center group"
          >
            {/* Animated internal lines */}
            <motion.div
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 w-full h-[2px] bg-white/20 blur-[1px]"
            />
            
            {/* Central icon or symbol */}
            <Globe className="w-1/2 h-1/2 text-white/90 drop-shadow-lg z-10" />
            
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Floating tech bits */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 40}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

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
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-1.5 h-1.5 bg-primary" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-muted-foreground/80">
                  Contact Support
                </span>
              </motion.div>

              <motion.h1 
                className="text-[10vw] md:text-[7vw] lg:text-[6vw] font-display font-extrabold mb-8 leading-[0.9] tracking-tighter"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              >
                Get In <br />
                <span className="text-foreground/90">Touch With</span> <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">Us</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl font-medium border-l border-white/10 pl-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Questions, ideas, or feedback—let's make progress together. Reach out through the form below.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Left Column: Visual & Social */}
              <div className="space-y-12">
                <div className="flex flex-col items-center lg:items-start">
                  <FloatingShape />
                  
                  <div className="mt-12 space-y-10 w-full max-w-md mx-auto lg:mx-0">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="group"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 mb-3">Email Address</p>
                      <a href="mailto:skyforgertechnologies@gmail.com" className="text-xl md:text-3xl font-display font-extrabold text-foreground hover:text-primary transition-all tracking-tight break-all">
                        skyforgertechnologies@gmail.com
                      </a>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-4"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 mb-3">Professional Network</p>
                      <div className="flex gap-6">
                        <a href="https://www.linkedin.com/company/skyforger/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all group">
                          <div className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </div>
                          <span className="font-bold tracking-tight text-lg">skyforger</span>
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="relative"
              >
                {/* Decorative Corner Elements */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/30 z-20" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/30 z-20" />

                <div className="glass-card border border-white/5 bg-black/40 backdrop-blur-3xl p-8 md:p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-[0.2em]">Full name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g. John Doe" 
                                className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all h-10 px-0 text-lg placeholder:text-muted-foreground/20" 
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
                            <FormLabel className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-[0.2em]">Email address</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="e.g. john@example.com" 
                                className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all h-10 px-0 text-lg placeholder:text-muted-foreground/20" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-[0.2em]">Company / Institution</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g. Tech University" 
                                className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all h-10 px-0 text-lg placeholder:text-muted-foreground/20" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-[0.2em]">Message or Inquiry</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How can we help you?" 
                                className="bg-transparent border border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all min-h-[120px] p-4 text-lg placeholder:text-muted-foreground/20 resize-none" 
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
                          className="w-full h-16 rounded-none bg-primary text-black hover:bg-white transition-all font-bold text-base tracking-[0.2em] uppercase group flex items-center justify-center gap-4 relative overflow-hidden"
                          disabled={mutation.isPending}
                        >
                          {mutation.isPending ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                          ) : (
                            <>
                              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              <span>Send Message</span>
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
        </div>
      </MainLayout>
    );
}
