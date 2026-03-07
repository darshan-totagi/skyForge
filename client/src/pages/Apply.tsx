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
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

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
      <div className="container mx-auto px-4 py-12 lg:py-20 relative">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Internship <span className="text-primary">Application</span></h1>
            <p className="text-muted-foreground text-lg">Take the first step towards your tech career. Fill out the form below to register.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card border-white/10 p-2 md:p-4">
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
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
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="skyforgelearn@gmail.com" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="college"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>College / University *</FormLabel>
                            <FormControl>
                              <Input placeholder="Tech University" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="yearOfStudy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year of Study *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 3rd Year" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="domain"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Domain *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background/50 border-white/10 focus:ring-primary h-12">
                                  <SelectValue placeholder="Choose a domain" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-card border-white/10 text-foreground">
                                <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                                <SelectItem value="Full Stack Development">Full Stack Development</SelectItem>
                                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
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
                        <FormItem>
                          <FormLabel>GitHub / Portfolio URL (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/yourusername" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="statement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Statement of Interest *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Why do you want to join this internship and what do you hope to learn?" 
                              className="resize-none bg-background/50 border-white/10 focus-visible:ring-primary min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/25 border-0 mt-8"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
