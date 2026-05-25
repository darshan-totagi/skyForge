import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, Lock, User, Loader2, ArrowRight, ShieldCheck, 
  Sparkles, BookOpen, TrendingUp, Eye, EyeOff 
} from "lucide-react";

export default function Auth() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [formData, setFormData] = useState({ email: "", otp: "", fullName: "", password: "" });

  const { data: user } = useQuery({ 
    queryKey: ["/api/user"],
    retry: false
  });

  useEffect(() => {
    if (user) {
      if (user.role?.trim() === "admin") {
        setLocation("/admin");
      } else {
        setLocation("/courses");
      }
    }
  }, [user, setLocation]);

  const loginMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/auth/login", { email: data.email, password: data.password });
      return await res.json();
    },
    onSuccess: (res: any) => { 
      toast({ title: "Welcome back!" }); 
      queryClient.setQueryData(["/api/user"], res.user);
      if (res.user?.role?.trim() === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/courses";
      }
    }
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => apiRequest("POST", "/api/auth/forgot-password", { email }),
    onSuccess: () => { setStep("otp"); setIsLogin(false); toast({ title: "Reset OTP Sent", description: "Check your Gmail inbox." }); }
  });

  const sendOtpMutation = useMutation({
    mutationFn: async (email: string) => apiRequest("POST", "/api/auth/send-otp", { email }),
    onSuccess: () => { setStep("otp"); toast({ title: "OTP Sent", description: "Check your Gmail inbox." }); }
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/auth/verify-otp", data);
      return await res.json();
    },
    onSuccess: (res: any) => { 
      toast({ title: "Welcome!" }); 
      queryClient.setQueryData(["/api/user"], res.user);
      if (res.user?.role?.trim() === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/courses";
      }
    }
  });

  if (user) return null;

  return (
    <MainLayout>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] pt-20">
        {/* Background Graphics - Simulating the reference image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Main Arch Graphic */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full flex items-center justify-center opacity-40">
            <div className="relative w-[600px] h-[800px]">
              {/* The Arch */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[500px] border-[40px] border-white/5 rounded-t-full" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[500px] bg-gradient-to-b from-primary/10 to-transparent rounded-t-full blur-2xl" />
              
              {/* Stairs simulation */}
              <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-96 h-40 flex flex-col items-center">
                <div className="w-full h-8 bg-white/5 mb-1 skew-x-[20deg]" />
                <div className="w-[90%] h-8 bg-white/5 mb-1 skew-x-[20deg]" />
                <div className="w-[80%] h-8 bg-white/5 mb-1 skew-x-[20deg]" />
              </div>

              {/* Sphere */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent shadow-[0_0_50px_rgba(255,255,255,0.05)]" 
              />
            </div>
          </div>

          {/* Energy Waves */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 18, repeat: Infinity }}
            className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            
            {/* Left Column: Branding & Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-8">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary/80">Secure Access</span>
              </div>

              <h1 className="text-6xl font-display font-extrabold tracking-tighter text-white mb-6 leading-tight">
                Welcome <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">back</span>
              </h1>
              <p className="text-xl text-muted-foreground/80 font-medium mb-12">
                Continue your learning journey
              </p>

              <div className="space-y-8 mb-16">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Secure & Private",
                    desc: "Your data is protected with enterprise level security."
                  },
                  {
                    icon: BookOpen,
                    title: "Seamless Learning",
                    desc: "Pick up where you left off and keep advancing."
                  },
                  {
                    icon: TrendingUp,
                    title: "Achieve More",
                    desc: "Track your progress and unlock new opportunities."
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-primary group-hover:border-primary/50 transition-colors shrink-0">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-6 opacity-40">
                <div className="flex items-center gap-2">
                  <Lock size={12} className="text-white" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">SSL Encrypted</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="flex items-center gap-2">
                  <ShieldCheck size={12} className="text-white" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Verified Secure</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Auth Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md mx-auto"
            >
              <Card className="border-white/5 bg-[#0a0f1e]/60 backdrop-blur-3xl shadow-2xl p-8 lg:p-10 rounded-[32px]">
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {isLogin ? "Login to your account" : "Create your account"}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {isLogin ? "Enter your credentials to continue" : "Join SkyForger to start learning"}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {isLogin ? (
                    <motion.form
                      key="login"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={(e) => { e.preventDefault(); loginMutation.mutate(formData); }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input 
                            type="email" 
                            placeholder="Gmail Address" 
                            className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary/20 transition-all" 
                            value={formData.email} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                            required 
                          />
                        </div>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            className="pl-12 pr-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary/20 transition-all" 
                            value={formData.password} 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                            required 
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button 
                          type="button" 
                          onClick={() => {
                            if (!formData.email) {
                              toast({ title: "Email Required", description: "Please enter your email first.", variant: "destructive" });
                              return;
                            }
                            forgotPasswordMutation.mutate(formData.email);
                          }} 
                          className="text-xs font-bold text-primary hover:text-white transition-colors"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <Button 
                        className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group transition-all" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? <Loader2 className="animate-spin h-5 w-5" /> : (
                          <>
                            <span>Login</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>

                      <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest"><span className="bg-[#0a0f1e] px-4 text-muted-foreground/40">OR</span></div>
                      </div>

                      <p className="text-center text-sm text-muted-foreground">
                        New to SKYFORGER?{" "}
                        <button 
                          type="button" 
                          onClick={() => setIsLogin(false)} 
                          className="text-primary font-bold hover:underline"
                        >
                          Create Account
                        </button>
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="signup"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {step === "email" ? (
                        <form onSubmit={(e) => { e.preventDefault(); sendOtpMutation.mutate(formData.email); }} className="space-y-6">
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input 
                              type="email" 
                              placeholder="your-email@gmail.com" 
                              className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary/20 transition-all" 
                              value={formData.email} 
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                              required 
                            />
                          </div>
                          <Button 
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group transition-all" 
                            disabled={sendOtpMutation.isPending}
                          >
                            {sendOtpMutation.isPending ? <Loader2 className="animate-spin h-5 w-5" /> : (
                              <>
                                <span>Send Verification Code</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </Button>
                          <p className="text-center text-sm text-muted-foreground">
                            Already registered?{" "}
                            <button 
                              type="button" 
                              onClick={() => setIsLogin(true)} 
                              className="text-primary font-bold hover:underline"
                            >
                              Sign In
                            </button>
                          </p>
                        </form>
                      ) : (
                        <form onSubmit={(e) => { e.preventDefault(); verifyOtpMutation.mutate(formData); }} className="space-y-4">
                          <div className="space-y-4">
                            <div className="relative group">
                              <Input 
                                placeholder="6-digit OTP" 
                                maxLength={6} 
                                className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary/20 text-center text-xl font-bold tracking-[0.5em]" 
                                value={formData.otp} 
                                onChange={(e) => setFormData({ ...formData, otp: e.target.value })} 
                                required 
                              />
                            </div>
                            <div className="relative group">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                              <Input 
                                placeholder="Full Name" 
                                className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary/20 transition-all" 
                                value={formData.fullName} 
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
                                required 
                              />
                            </div>
                            <div className="relative group">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                              <Input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Create Password" 
                                className="pl-12 pr-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary/20 transition-all" 
                                value={formData.password} 
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                                required 
                              />
                              <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                              >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>
                          </div>
                          <Button 
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group transition-all" 
                            disabled={verifyOtpMutation.isPending}
                          >
                            {verifyOtpMutation.isPending ? <Loader2 className="animate-spin h-5 w-5" /> : (
                              <>
                                <span>Complete Registration</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </Button>
                        </form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}