import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="min-h-screen w-full flex bg-slate-50">
      {/* Left Section: Hero */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) contrast(1.2)'
          }} />
        </div>
        {/* Overlay pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(315deg, rgba(255,255,255,0.05) 25%, transparent 25%)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 0, 20px -20px, 0px 20px'
        }} />
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 text-white font-bold">S</div>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">SkyForger</span>
          </div>
          
          {/* Hero Content */}
          <div className="mt-24">
            <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight mb-6">
              Edit Smarter. Export Faster. <br />
              Create Anywhere.
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed opacity-90 mb-8">
              Join our social media club to build unique videos. We present editor<br />
              you can work comfortably across devices.
            </p>
          </div>
          
          {/* Footer */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-blue-200 text-sm hover:text-white transition-colors">Privacy Policy</a>
            <div className="w-1 h-1 bg-blue-400 rounded-full" />
            <a href="#" className="text-blue-200 text-sm hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Right Section: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Back button (mobile/top) */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm">
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to Website</span>
            </Link>
          </div>
          
          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-2">
                Welcome Back!
              </h2>
              <p className="text-slate-500 text-sm">
                Login to start creating stunning videos with us.
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
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email</label>
                      <Input 
                        type="email" 
                        placeholder="Input your email" 
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all" 
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Password</label>
                      <div className="relative group">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Insert your company name" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl pr-12 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                          value={formData.password} 
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                          required 
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border border-slate-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                        <div className="w-3 h-3 bg-blue-600 rounded-sm" />
                      </div>
                      <span className="text-sm text-slate-600">Remember Me</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => {
                        if (!formData.email) {
                          toast({ title: "Email Required", description: "Please enter your email first.", variant: "destructive" });
                          return;
                        }
                        forgotPasswordMutation.mutate(formData.email);
                      }} 
                      className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <Button 
                    className="w-full h-12 rounded-full bg-black hover:bg-slate-800 text-white font-semibold text-base transition-all" 
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? <Loader2 className="animate-spin h-5 w-5" /> : "Login"}
                  </Button>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs font-medium text-slate-400">
                      <span className="bg-white px-4">or continue with</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full h-12 rounded-full border-slate-200 bg-white text-slate-800 hover:bg-slate-50 font-medium text-sm flex items-center justify-center gap-3 transition-all"
                  >
                    <div className="w-5 h-5">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    Continue with Google
                  </Button>

                  <p className="text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <button 
                      type="button" 
                      onClick={() => setIsLogin(false)} 
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      Sign up here
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
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <Input 
                          type="email" 
                          placeholder="your-email@gmail.com" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all" 
                          value={formData.email} 
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                          required 
                        />
                      </div>
                      <Button 
                        className="w-full h-12 rounded-full bg-black hover:bg-slate-800 text-white font-semibold text-base transition-all" 
                        disabled={sendOtpMutation.isPending}
                      >
                        {sendOtpMutation.isPending ? <Loader2 className="animate-spin h-5 w-5" /> : "Send Verification Code"}
                      </Button>
                      <p className="text-center text-sm text-slate-600">
                        Already registered?{" "}
                        <button 
                          type="button" 
                          onClick={() => setIsLogin(true)} 
                          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                          Sign In
                        </button>
                      </p>
                    </form>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); verifyOtpMutation.mutate(formData); }} className="space-y-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Verification Code</label>
                          <Input 
                            placeholder="6-digit OTP" 
                            maxLength={6} 
                            className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-center text-xl font-bold tracking-[0.5em]" 
                            value={formData.otp} 
                            onChange={(e) => setFormData({ ...formData, otp: e.target.value })} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Full Name</label>
                          <Input 
                            placeholder="Full Name" 
                            className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all" 
                            value={formData.fullName} 
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Password</label>
                          <div className="relative group">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Create Password" 
                              className="h-12 bg-slate-50 border-slate-200 rounded-xl pr-12 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                              value={formData.password} 
                              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                              required 
                            />
                            <button 
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>
                      </div>
                      <Button 
                        className="w-full h-12 rounded-full bg-black hover:bg-slate-800 text-white font-semibold text-base transition-all" 
                        disabled={verifyOtpMutation.isPending}
                      >
                        {verifyOtpMutation.isPending ? <Loader2 className="animate-spin h-5 w-5" /> : "Complete Registration"}
                      </Button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
