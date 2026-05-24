import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { User, Mail, Lock, Loader2, Save } from "lucide-react";

export default function Profile() {
  const { toast } = useToast();
  const { data: user, isLoading } = useQuery({ queryKey: ["/api/user"] });
  
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const updateMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("PATCH", "/api/user/update", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({ title: "Profile Updated", description: "Your changes have been saved successfully." });
      setPassword("");
    }
  });

  if (isLoading) return <div className="flex justify-center p-24"><Loader2 className="animate-spin h-12 w-12 text-primary" /></div>;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>
        </div>

        <Card className="border-primary/20 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your name or change your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input value={user?.email} disabled className="pl-10 bg-white/5" />
              </div>
              <p className="text-xs text-muted-foreground">Registered Gmail address cannot be changed.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="fullName"
                  placeholder={user?.fullName} 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Leave blank to keep current" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10" 
                />
              </div>
            </div>

            <Button 
              className="w-full gap-2" 
              onClick={() => updateMutation.mutate({ fullName, password })}
              disabled={updateMutation.isPending || (!fullName && !password)}
            >
              {updateMutation.isPending ? <Loader2 className="animate-spin h-4 w-4" /> : <Save size={18} />}
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}