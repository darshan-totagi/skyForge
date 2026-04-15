import { MainLayout } from "@/components/layout/MainLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { motion, AnimatePresence } from "framer-motion";
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
import { Loader2, Mail, MapPin, Instagram, Linkedin, Globe } from "lucide-react";

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
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 md:px-6 relative overflow-hidden bg-background">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full opacity-30" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full opacity-30" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="container max-w-7xl mx-auto relative z-10"
        >
          {/* Main Container with Border */}
          <div className="glass-card border border-white/5 rounded-[2rem] overflow-hidden relative shadow-2xl bg-black/40 backdrop-blur-3xl p-8 md:p-12 lg:p-16">
            
            {/* Top Indicator */}
            <div className="flex justify-center mb-12">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground/80">Our Users</span>
              </motion.div>
            </div>

            {/* Header */}
            <div className="text-center mb-16">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6 tracking-tight"
              >
                We're Here to Help
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium"
              >
                Questions, ideas, or feedback—let's make progress together.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Left Column: Details & Visual */}
              <div className="space-y-12">
                <div className="flex flex-col items-center lg:items-start">
                  <FloatingShape />
                  
                  <div className="mt-12 space-y-8 w-full max-w-md mx-auto lg:mx-0">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="group"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Email</p>
                      <a href="mailto:skyforgertechnologies@gmail.com" className="text-xl md:text-2xl font-display font-bold text-foreground hover:text-primary transition-colors flex items-center gap-3">
                        skyforgertechnologies@gmail.com
                      </a>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Location</p>
                      <div className="text-xl md:text-2xl font-display font-bold text-foreground flex items-center gap-3">
                        Tech Innovation Hub, <br /> Innovation Street, Remote-First
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-4"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Social Media</p>
                      <div className="flex gap-6">
                        <a href="https://www.linkedin.com/company/skyforger/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                          <Linkedin className="w-5 h-5" />
                          <span className="font-semibold">skyforger</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                          <Instagram className="w-5 h-5" />
                          <span className="font-semibold">@skyforger.tech</span>
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative"
              >
                {/* Yellow dot above form */}
                <div className="flex items-center gap-2 mb-8 ml-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-muted-foreground/60 text-xs font-bold uppercase tracking-widest ml-1">Full name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="" 
                              className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-colors h-10 px-1 placeholder:text-muted-foreground/30" 
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
                        <FormItem className="space-y-1">
                          <FormLabel className="text-muted-foreground/60 text-xs font-bold uppercase tracking-widest ml-1">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="" 
                              className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-colors h-10 px-1 placeholder:text-muted-foreground/30" 
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
                        <FormItem className="space-y-1">
                          <FormLabel className="text-muted-foreground/60 text-xs font-bold uppercase tracking-widest ml-1">Company</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="" 
                              className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-colors h-10 px-1 placeholder:text-muted-foreground/30" 
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
                        <FormItem className="space-y-1">
                          <FormLabel className="text-muted-foreground/60 text-xs font-bold uppercase tracking-widest ml-1">Message or Inquiry</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="" 
                              className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-colors min-h-[120px] px-1 resize-none placeholder:text-muted-foreground/30" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-white text-black hover:bg-white/90 font-bold h-14 rounded-xl text-lg transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
