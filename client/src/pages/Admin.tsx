import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { api } from "@shared/routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Trash2, LayoutDashboard, Megaphone, Users, Mail, Lock, LogOut, Award, UserPlus, Upload } from "lucide-react";
import type { Ad, InternshipApplication, ContactMessage, Certificate } from "@shared/schema";
import { Navbar } from "@/components/layout/Navbar";

export default function AdminPage() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [bulkInput, setBulkInput] = useState("");
  const [singleStudent, setSingleStudent] = useState({ name: "", domain: "Full Stack Development" });
  const [isBulk, setIsBulk] = useState(false);
  const [newAd, setNewAd] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    isActive: true
  });

  const { data: auth, isLoading: authLoading, refetch: refetchAuth } = useQuery<{ isAdmin: boolean }>({
    queryKey: ["/api/check-auth"]
  });

  const loginMutation = useMutation({
    mutationFn: async (pass: string) => {
      await apiRequest("POST", "/api/login", { password: pass });
    },
    onSuccess: async () => {
      await refetchAuth();
      toast({ title: "Welcome back", description: "Login successful" });
    },
    onError: (err: Error) => {
      toast({ 
        title: "Login failed", 
        description: err.message || "Invalid admin password",
        variant: "destructive"
      });
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: async () => {
      await refetchAuth();
      toast({ title: "Logged out", description: "Session ended successfully" });
    }
  });

  const { data: ads, isLoading: adsLoading } = useQuery<Ad[]>({
    queryKey: [api.ads.list.path],
    enabled: !!auth?.isAdmin
  });

  const { data: applications, isLoading: appsLoading } = useQuery<InternshipApplication[]>({
    queryKey: [api.applications.list.path],
    enabled: !!auth?.isAdmin
  });

  const { data: messages, isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: [api.contact.list.path],
    enabled: !!auth?.isAdmin
  });

  const { data: certificates, isLoading: certsLoading } = useQuery<Certificate[]>({
    queryKey: ["/api/certificates"],
    enabled: !!auth?.isAdmin
  });

  const createCertMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/certificates/bulk", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      setBulkInput("");
      setSingleStudent({ name: "", domain: "Full Stack Development" });
      toast({ title: "Success", description: "Certificates created successfully" });
    }
  });

  const createAdMutation = useMutation({
    mutationFn: async (ad: typeof newAd) => {
      await apiRequest("POST", api.ads.create.path, ad);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.ads.list.path] });
      setNewAd({ title: "", description: "", imageUrl: "", linkUrl: "", isActive: true });
      toast({ title: "Success", description: "Ad created successfully" });
    }
  });

  const toggleAdMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number, isActive: boolean }) => {
      await apiRequest("PATCH", `/api/ads/${id}`, { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.ads.list.path] });
    }
  });

  const deleteAdMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/ads/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.ads.list.path] });
      toast({ title: "Deleted", description: "Ad removed successfully" });
    }
  });

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!auth?.isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-24 flex items-center justify-center">
          <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-display">Admin Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  loginMutation.mutate(password);
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (adsLoading || appsLoading || messagesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold font-display">Admin Dashboard</h1>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="border-primary/20 text-muted-foreground hover:text-primary"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="bg-card border border-primary/20 p-1">
            <TabsTrigger value="applications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="h-4 w-4 mr-2" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Award className="h-4 w-4 mr-2" />
              Certificates
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Mail className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="ads" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Megaphone className="h-4 w-4 mr-2" />
              Manage Ads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="certificates" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Issue Certificates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <Button 
                    variant={!isBulk ? "default" : "outline"} 
                    onClick={() => setIsBulk(false)}
                    className="flex-1"
                  >
                    <UserPlus className="h-4 w-4 mr-2" /> Single Student
                  </Button>
                  <Button 
                    variant={isBulk ? "default" : "outline"} 
                    onClick={() => setIsBulk(true)}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" /> Bulk Upload
                  </Button>
                </div>

                {!isBulk ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Student Name</Label>
                      <Input 
                        placeholder="John Doe" 
                        value={singleStudent.name}
                        onChange={(e) => setSingleStudent({...singleStudent, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Domain</Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={singleStudent.domain}
                        onChange={(e) => setSingleStudent({...singleStudent, domain: e.target.value})}
                      >
                        <option>Full Stack Development</option>
                        <option>Frontend Development</option>
                        <option>Artificial Intelligence</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Bulk Entry (Format: Name, Domain - one per line)</Label>
                    <Textarea 
                      placeholder="John Doe, Full Stack Development&#10;Jane Smith, AI Development"
                      className="min-h-[150px] font-mono text-sm"
                      value={bulkInput}
                      onChange={(e) => setBulkInput(e.target.value)}
                    />
                  </div>
                )}

                <Button 
                  className="w-full" 
                  disabled={createCertMutation.isPending}
                  onClick={() => {
                    let students = [];
                    if (isBulk) {
                      students = bulkInput.split('\n')
                        .filter(line => line.includes(','))
                        .map(line => {
                          const [name, domain] = line.split(',');
                          return { studentName: name.trim(), domain: domain.trim() };
                        });
                    } else {
                      if (singleStudent.name) {
                        students = [{ studentName: singleStudent.name, domain: singleStudent.domain }];
                      }
                    }
                    if (students.length > 0) {
                      createCertMutation.mutate({ students });
                    }
                  }}
                >
                  {createCertMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Award className="h-4 w-4 mr-2" />}
                  Issue Certificate(s)
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <h2 className="text-2xl font-bold font-display text-primary mt-8 mb-4">Issued Certificates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificates?.map((cert) => (
                  <Card key={cert.id} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-bold">{cert.studentName}</CardTitle>
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm font-mono text-primary/70">{cert.certificateId}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{cert.domain}</p>
                      <p className="text-xs text-muted-foreground/60 mt-2">
                        Issued: {new Date(cert.issueDate!).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="grid gap-4">
              {applications?.map((app) => (
                <Card key={app.id} className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-primary">{app.fullName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{app.email} | {app.phone}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/20">
                        {app.domain}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="font-semibold">University</p>
                        <p>{app.college}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Year</p>
                        <p>{app.yearOfStudy}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Statement of Interest</p>
                      <p className="text-muted-foreground text-sm italic">"{app.statement}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="grid gap-4">
              {messages?.map((msg) => (
                <Card key={msg.id} className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{msg.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{msg.message}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ads" className="space-y-8">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Create New Ad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Summer Sale" 
                      value={newAd.title} 
                      onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input 
                      id="imageUrl" 
                      placeholder="https://images.unsplash.com/..." 
                      value={newAd.imageUrl}
                      onChange={(e) => setNewAd({...newAd, imageUrl: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Get 50% off on all courses..." 
                    value={newAd.description}
                    onChange={(e) => setNewAd({...newAd, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkUrl">Destination Link</Label>
                  <Input 
                    id="linkUrl" 
                    placeholder="https://skyforger.com/sale" 
                    value={newAd.linkUrl}
                    onChange={(e) => setNewAd({...newAd, linkUrl: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="active" 
                    checked={newAd.isActive} 
                    onCheckedChange={(checked) => setNewAd({...newAd, isActive: checked})}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
                <Button 
                  className="w-full" 
                  disabled={createAdMutation.isPending}
                  onClick={() => createAdMutation.mutate(newAd)}
                >
                  {createAdMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
                  Create Ad
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads?.map((ad) => (
                <Card key={ad.id} className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
                  <div className="aspect-video relative">
                    <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2"
                      onClick={() => deleteAdMutation.mutate(ad.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg text-primary">{ad.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{ad.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={!!ad.isActive} 
                          onCheckedChange={(checked) => toggleAdMutation.mutate({ id: ad.id, isActive: checked })} 
                        />
                        <Label className="text-xs">Active</Label>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{new Date(ad.createdAt!).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
