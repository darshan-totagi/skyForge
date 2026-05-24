import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Loader2 } from "lucide-react";

export default function Auth() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [formData, setFormData] = useState({ email: "", otp: "", fullName: "", password: "" });

  const { data: user } = useQuery({ 
    queryKey: ["/api/user"],
    retry: false
  });

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
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
      if (res.user?.role === "admin") {
        setLocation("/admin");
      } else {
        setLocation("/courses");
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
      if (res.user?.role === "admin") {
        setLocation("/admin");
      } else {
        setLocation("/courses");
      }
    }
  });

  if (user) return null;

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-primary/20 bg-card/50 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">{isLogin ? "Student Login" : "Create Account"}</CardTitle>
            <CardDescription>
              {isLogin 
                ? "Enter your credentials to access courses" 
                : step === "email" ? "Enter Gmail to receive code" : "Setup your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              <form onSubmit={(e) => { e.preventDefault(); loginMutation.mutate(formData); }} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input type="email" placeholder="Gmail Address" className="pl-10" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input type="password" placeholder="Password" className="pl-10" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                </div>
                <Button className="w-full" disabled={loginMutation.isPending}>
                  {loginMutation.isPending ? <Loader2 className="animate-spin" /> : "Login"}
                </Button>
                <div className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
                  <button 
                    type="button" 
                    onClick={() => {
                      if (!formData.email) {
                        toast({ title: "Email Required", description: "Please enter your email first.", variant: "destructive" });
                        return;
                      }
                      forgotPasswordMutation.mutate(formData.email);
                    }} 
                    className="text-primary hover:underline"
                  >
                    Forgot Password?
                  </button>
                  <p>
                    Don't have an account?{" "}
                    <button type="button" onClick={() => setIsLogin(false)} className="text-primary hover:underline font-medium">Sign Up</button>
                  </p>
                </div>
              </form>
            ) : (
              <>
                {step === "email" ? (
                  <form onSubmit={(e) => { e.preventDefault(); sendOtpMutation.mutate(formData.email); }} className="space-y-4">
                    <div className="relative"><Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" /><Input type="email" placeholder="your-email@gmail.com" className="pl-10" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div>
                    <Button className="w-full" disabled={sendOtpMutation.isPending}>{sendOtpMutation.isPending ? <Loader2 className="animate-spin" /> : "Send Code"}</Button>
                    <p className="text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <button type="button" onClick={() => setIsLogin(true)} className="text-primary hover:underline font-medium">Login</button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); verifyOtpMutation.mutate(formData); }} className="space-y-4">
                    <Input placeholder="6-digit OTP" maxLength={6} value={formData.otp} onChange={(e) => setFormData({ ...formData, otp: e.target.value })} required />
                    <div className="relative"><User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" /><Input placeholder="Full Name" className="pl-10" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required /></div>
                    <div className="relative"><Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" /><Input type="password" placeholder="Create Password" className="pl-10" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required /></div>
                    <Button className="w-full" disabled={verifyOtpMutation.isPending}>{verifyOtpMutation.isPending ? <Loader2 className="animate-spin" /> : "Register"}</Button>
                  </form>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}