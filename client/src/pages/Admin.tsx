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
import { Loader2, Plus, Trash2, LayoutDashboard, Megaphone, Users, Mail, Lock, LogOut, Award, UserPlus, Upload, FileText, Eye, X, Download, Printer, RefreshCw, MessageSquareQuote, Linkedin } from "lucide-react";
import type { Ad, InternshipApplication, ContactMessage, Certificate, OfferLetter, Review } from "@shared/schema";
import { Navbar } from "@/components/layout/Navbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

export default function AdminPage() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [bulkInput, setBulkInput] = useState("");
  const [singleStudent, setSingleStudent] = useState({ name: "", domain: "Full Stack Development" });
  const [isBulk, setIsBulk] = useState(false);
  const [isBulkOffer, setIsBulkOffer] = useState(false);
  const [bulkOfferInput, setBulkOfferInput] = useState("");
  const [selectedOfferLetter, setSelectedOfferLetter] = useState<OfferLetter | null>(null);
  
  const handlePrint = (studentName?: string) => {
    if (studentName) {
      const originalTitle = document.title;
      document.title = `${studentName}_Offer_Letter`;
      window.print();
      document.title = originalTitle;
    } else {
      window.print();
    }
  };

  const [newOfferLetter, setNewOfferLetter] = useState({
    studentName: "",
    position: "Full Stack Development Intern",
    department: "Tech Team",
    startDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  });
  const [newAd, setNewAd] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    isActive: true
  });
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    content: "",
    linkedinUrl: "",
    imageUrl: "",
    rating: 5
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

  const { data: offerLetters, isLoading: offersLoading } = useQuery<OfferLetter[]>({
    queryKey: ["/api/offer-letters"],
    enabled: !!auth?.isAdmin
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: [api.reviews.list.path],
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

  const createOfferLetterMutation = useMutation({
    mutationFn: async (data: any) => {
      if (isBulkOffer) {
        await apiRequest("POST", "/api/offer-letters/bulk", data);
      } else {
        await apiRequest("POST", "/api/offer-letters", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/offer-letters"] });
      setNewOfferLetter({
        studentName: "",
        position: "Full Stack Development Intern",
        department: "Tech Team",
        startDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      });
      setBulkOfferInput("");
      toast({ title: "Success", description: "Offer letter(s) generated successfully" });
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

  const createReviewMutation = useMutation({
    mutationFn: async (review: typeof newReview) => {
      await apiRequest("POST", api.reviews.create.path, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.reviews.list.path] });
      setNewReview({ name: "", role: "", content: "", linkedinUrl: "", imageUrl: "", rating: 5 });
      toast({ title: "Success", description: "Review added successfully" });
    }
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.reviews.list.path] });
      toast({ title: "Deleted", description: "Review removed successfully" });
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

  if (adsLoading || appsLoading || messagesLoading || reviewsLoading) {
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
            <TabsTrigger value="offers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="h-4 w-4 mr-2" />
              Offer Letters
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Mail className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquareQuote className="h-4 w-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="ads" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Megaphone className="h-4 w-4 mr-2" />
              Manage Ads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="offers" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generate Offer Letter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <Button 
                    variant={!isBulkOffer ? "default" : "outline"} 
                    onClick={() => setIsBulkOffer(false)}
                    className="flex-1"
                  >
                    <UserPlus className="h-4 w-4 mr-2" /> Single Offer
                  </Button>
                  <Button 
                    variant={isBulkOffer ? "default" : "outline"} 
                    onClick={() => setIsBulkOffer(true)}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" /> Bulk Upload
                  </Button>
                </div>

                {!isBulkOffer ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Student Name</Label>
                      <Input 
                        placeholder="Kavya PH" 
                        value={newOfferLetter.studentName}
                        onChange={(e) => setNewOfferLetter({...newOfferLetter, studentName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input 
                        placeholder="Full Stack Development Intern" 
                        value={newOfferLetter.position}
                        onChange={(e) => setNewOfferLetter({...newOfferLetter, position: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input 
                        placeholder="Tech Team" 
                        value={newOfferLetter.department}
                        onChange={(e) => setNewOfferLetter({...newOfferLetter, department: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration (Start - End)</Label>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="20 March 2026" 
                          value={newOfferLetter.startDate}
                          onChange={(e) => setNewOfferLetter({...newOfferLetter, startDate: e.target.value})}
                        />
                        <Input 
                          placeholder="20 April 2026" 
                          value={newOfferLetter.endDate}
                          onChange={(e) => setNewOfferLetter({...newOfferLetter, endDate: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Bulk Entry (Format: Name, Position, Department, Start Date, End Date - one per line)</Label>
                    <Textarea 
                      placeholder="John Doe, Full Stack Intern, Tech, 20 March 2026, 20 April 2026&#10;Jane Smith, AI Intern, AI Team, 20 March 2026, 20 April 2026"
                      className="min-h-[150px] font-mono text-sm"
                      value={bulkOfferInput}
                      onChange={(e) => setBulkOfferInput(e.target.value)}
                    />
                  </div>
                )}

                <Button 
                  className="w-full" 
                  disabled={createOfferLetterMutation.isPending}
                  onClick={() => {
                    if (isBulkOffer) {
                      const students = bulkOfferInput.split('\n')
                        .filter(line => line.includes(','))
                        .map(line => {
                          const [name, pos, dept, start, end] = line.split(',').map(s => s.trim());
                          return { 
                            studentName: name, 
                            position: pos || newOfferLetter.position, 
                            department: dept || newOfferLetter.department,
                            startDate: start || newOfferLetter.startDate,
                            endDate: end || newOfferLetter.endDate
                          };
                        });
                      if (students.length > 0) {
                        createOfferLetterMutation.mutate({ students });
                      }
                    } else {
                      if (newOfferLetter.studentName) {
                        createOfferLetterMutation.mutate(newOfferLetter);
                      }
                    }
                  }}
                >
                  {createOfferLetterMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  Generate Offer Letter(s)
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-8 mb-4 gap-4">
                <h2 className="text-2xl font-bold font-display text-primary">Generated Offer Letters</h2>
                <div className="flex gap-2 w-full md:w-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      // Bulk print by setting a flag or iterating
                      toast({ title: "Bulk Download", description: "Opening print dialogs for all letters. Please save each as PDF." });
                      offerLetters?.forEach((offer, index) => {
                        setTimeout(() => {
                          setSelectedOfferLetter(offer);
                          setTimeout(() => handlePrint(offer.studentName), 500);
                        }, index * 2000); // 2s delay between each to allow browser to handle
                      });
                    }}
                    className="border-primary/20 flex-1"
                    disabled={!offerLetters?.length}
                  >
                    <Download className="h-4 w-4 mr-2" /> Download All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/offer-letters"] })}
                    className="border-primary/20"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {offersLoading ? (
                  <div className="col-span-full flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : offerLetters?.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground bg-card/30 rounded-xl border border-dashed border-primary/20">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No offer letters generated yet.</p>
                  </div>
                ) : (
                  offerLetters?.map((offer) => (
                    <Card key={offer.id} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-bold">{offer.studentName}</CardTitle>
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-primary/70">{offer.position}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">
                          Duration: {offer.startDate} - {offer.endDate}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setSelectedOfferLetter(offer)}
                          >
                            <Eye className="h-4 w-4 mr-2" /> View
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => {
                              setSelectedOfferLetter(offer);
                              setTimeout(() => handlePrint(offer.studentName), 100);
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" /> Save PDF
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

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
                    let studentsList: { studentName: string; domain: string }[] = [];
                    if (isBulk) {
                      studentsList = bulkInput.split('\n')
                        .filter(line => line.includes(','))
                        .map(line => {
                          const [name, domain] = line.split(',');
                          return { studentName: name.trim(), domain: domain.trim() };
                        });
                    } else {
                      if (singleStudent.name) {
                        studentsList = [{ studentName: singleStudent.name, domain: singleStudent.domain }];
                      }
                    }
                    if (studentsList.length > 0) {
                      createCertMutation.mutate({ students: studentsList });
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

          <TabsContent value="reviews" className="space-y-8">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Add New Review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="review-name">Name</Label>
                    <Input 
                      id="review-name" 
                      placeholder="Student Name" 
                      value={newReview.name} 
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-role">Role / Domain</Label>
                    <Input 
                      id="review-role" 
                      placeholder="Full Stack Intern" 
                      value={newReview.role}
                      onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-content">Content</Label>
                  <Textarea 
                    id="review-content" 
                    placeholder="Their experience at SkyForger..." 
                    value={newReview.content}
                    onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="review-linkedin">LinkedIn URL</Label>
                    <Input 
                      id="review-linkedin" 
                      placeholder="https://linkedin.com/in/..." 
                      value={newReview.linkedinUrl}
                      onChange={(e) => setNewReview({...newReview, linkedinUrl: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-image">Image URL (Optional)</Label>
                    <Input 
                      id="review-image" 
                      placeholder="https://images.unsplash.com/..." 
                      value={newReview.imageUrl}
                      onChange={(e) => setNewReview({...newReview, imageUrl: e.target.value})}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  disabled={createReviewMutation.isPending}
                  onClick={() => createReviewMutation.mutate(newReview)}
                >
                  {createReviewMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
                  Add Review
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews?.map((review) => (
                <Card key={review.id} className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                          {review.imageUrl ? (
                            <img src={review.imageUrl} alt={review.name} className="w-full h-full object-cover" />
                          ) : (
                            <Users className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg text-primary">{review.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">{review.role}</p>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => deleteReviewMutation.mutate(review.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-4">
                    <p className="text-sm text-muted-foreground italic">"{review.content}"</p>
                    {review.linkedinUrl && (
                      <div className="flex items-center gap-2 text-xs text-primary">
                        <Linkedin className="h-3 w-3" />
                        <a href={review.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
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

      {/* Offer Letter Preview Modal */}
      <Dialog open={!!selectedOfferLetter} onOpenChange={(open) => !open && setSelectedOfferLetter(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-0 border-none print-container [&>button]:hidden">
          <div className="sticky top-0 right-0 p-4 flex justify-end gap-2 bg-slate-100/80 backdrop-blur-sm border-b z-20 print:hidden">
            <Button variant="default" size="sm" onClick={() => handlePrint(selectedOfferLetter?.studentName)} className="bg-sky-600 hover:bg-sky-700">
              <Printer className="h-4 w-4 mr-2" /> Print / Save as PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedOfferLetter(null)}>
              <X className="h-4 w-4" /> Close
            </Button>
          </div>
          <DialogHeader className="sr-only">
            <DialogTitle>Offer Letter Preview</DialogTitle>
          </DialogHeader>
          {selectedOfferLetter && (
            <div className="bg-white flex justify-center p-0 md:p-8 print:p-0">
              <div className="relative bg-white text-slate-800 p-12 shadow-2xl font-sans leading-relaxed w-[210mm] min-h-[297mm] flex flex-col print:shadow-none print:w-full overflow-hidden">
                {/* Blue Geometric Graphics */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#0ea5e9] clip-path-header-left opacity-100 z-0"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#0ea5e9] clip-path-header-right opacity-100 z-0"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0ea5e9] clip-path-footer-left opacity-100 z-0"></div>

                {/* Header Content */}
                <div className="flex items-center mb-2 relative z-10 border-b border-sky-600 pb-2">
                  <div className="flex items-center gap-4">
                    <img src="/logo.png" alt="SkyForger" className="w-16 h-16 object-contain" />
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-[#1e293b]">SkyForger</h2>
                      <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">TECHNOLOGIES</p>
                    </div>
                  </div>
                </div>

                {/* Main Title */}
                <div className="text-center mb-10 relative z-10">
                  <h1 className="text-3xl font-bold text-[#1e1b4b] inline-block border-b-4 border-[#1e1b4b] pb-1">
                    Internship Offer Letter
                  </h1>
                </div>

                {/* Info Section */}
                <div className="space-y-1 mb-2 text-[13px] font-semibold text-slate-800 relative z-10">
                  <p><span className="w-28 inline-block">Date:</span> {new Date(selectedOfferLetter.createdAt!).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p><span className="w-28 inline-block">Student Name:</span> {selectedOfferLetter.studentName}</p>
                  <p><span className="w-28 inline-block">Position:</span> {selectedOfferLetter.position}</p>
                  <p><span className="w-28 inline-block">Department:</span> {selectedOfferLetter.department}</p>
                  <p><span className="w-28 inline-block">Duration:</span> {selectedOfferLetter.startDate} - {selectedOfferLetter.endDate}</p>
                </div>

                {/* Content Section */}
                <div className="relative z-10">
                  {/* Watermark Logo */}
                  <img src="/logo.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.04] pointer-events-none" alt="" />
                  
                  <div className="space-y-3 text-[14px] text-justify text-slate-700">
                    <p>Dear {selectedOfferLetter.studentName}</p>
                    <p className="font-bold">Greetings from SkyForger Technologies.</p>
                    <p>
                      We are pleased to offer you the position of {selectedOfferLetter.position} with the SkyForger Tech Team. Based on your interest in technology, we believe you will be a valuable addition to our team during the internship period.
                    </p>
                    <p>
                      During this internship, you will work on and gaining hands-on experience in real-world projects while developing practical technical and problem-solving skills. You will also have the opportunity to gain exposure to the Education and Technology domain and collaborate with mentors and fellow interns.
                    </p>
                    
                    <div className="space-y-1">
                      <p className="font-bold">Internship Terms:</p>
                      <ul className="list-disc pl-5 space-y-0.5">
                        <li>This internship is intended for educational and skill-development purposes.</li>
                        <li>Interns are expected to complete assigned tasks and maintain professionalism.</li>
                        <li>A Certificate of Completion will be issued upon successful completion of the internship.</li>
                        <li>SkyForger reserves the right to discontinue the internship if terms are violated.</li>
                      </ul>
                    </div>

                    <p>
                      Please confirm your acceptance by replying to this email before {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}. We look forward to welcoming you to SkyForger and supporting your professional growth.
                    </p>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="mt-12 flex justify-between items-center relative z-10">
                  <div className="space-y-1">
                    <p className="font-bold mb-4 text-slate-800 text-[14px]">Sincerely,</p>
                    <div className="h-16 flex items-end">
                      <img src="/WhatsApp Image 2026-04-15 at 12.08.19 PM.jpeg" alt="Signature" className="h-full object-contain" />
                    </div>
                    <div className="border-t border-slate-400 pt-1">
                      <p className="font-bold text-slate-800 text-[13px]">Founder, SkyForger Technologies</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative w-48 h-48">
                      <img src="/WhatsApp Image 2026-04-15 at 12.07.06 PM.jpeg" alt="MSME Seal" className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
