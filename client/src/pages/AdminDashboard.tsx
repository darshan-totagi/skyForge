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
import { 
  Loader2, Plus, Trash2, LayoutDashboard, Megaphone, Users, Mail, 
  LogOut, Award, UserPlus, Upload, FileText, Eye, X, Download, 
  Printer, RefreshCw, BookOpen, Video, Layers 
} from "lucide-react";
import type { Ad, InternshipApplication, ContactMessage, Certificate, OfferLetter, Course, Module, Lesson } from "@shared/schema";
import { MainLayout } from "@/components/layout/MainLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [bulkInput, setBulkInput] = useState("");
  const [singleStudent, setSingleStudent] = useState({ name: "", domain: "Full Stack Development" });
  const [isBulk, setIsBulk] = useState(false);
  const [isBulkOffer, setIsBulkOffer] = useState(false);
  const [bulkOfferInput, setBulkOfferInput] = useState("");
  const [selectedOfferLetter, setSelectedOfferLetter] = useState<OfferLetter | null>(null);
  
  // LMS State
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    price: "499",
    thumbnail: "",
    demoVideoUrl: "",
    isPublished: true
  });

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

  // Queries
  const { data: user, isLoading: userLoading, isError: userError } = useQuery({ 
    queryKey: ["/api/user"],
    retry: false,
    staleTime: 5 * 60 * 1000 // Cache for 5 mins
  });
  const { data: ads } = useQuery<Ad[]>({ queryKey: [api.ads.list.path] });
  const { data: applications } = useQuery<InternshipApplication[]>({ queryKey: [api.applications.list.path] });
  const { data: messages } = useQuery<ContactMessage[]>({ queryKey: [api.contact.list.path] });
  const { data: certificates } = useQuery<Certificate[]>({ queryKey: ["/api/certificates"] });
  const { data: offerLetters } = useQuery<OfferLetter[]>({ queryKey: ["/api/offer-letters"] });
  
  // LMS Queries
  const { data: courses } = useQuery<Course[]>({ queryKey: ["/api/courses"] });
  const { data: modules } = useQuery<Module[]>({ 
    queryKey: [`/api/courses/${selectedCourse}/modules`],
    enabled: !!selectedCourse 
  });
  const { data: lessons } = useQuery<Lesson[]>({ 
    queryKey: [`/api/modules/${selectedModule}/lessons`],
    enabled: !!selectedModule 
  });

  // Mutations
  const logoutMutation = useMutation({
    mutationFn: async () => apiRequest("POST", "/api/logout"),
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      setLocation("/auth");
    }
  });

  const createCourse = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/courses", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setCourseForm({ title: "", description: "", price: "499", thumbnail: "", demoVideoUrl: "", isPublished: true });
      toast({ title: "Success", description: "Course created" });
    }
  });

  const updateCourse = useMutation({
    mutationFn: async (data: any) => apiRequest("PATCH", `/api/courses/${selectedCourse}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setIsEditingCourse(false);
      toast({ title: "Success", description: "Course updated" });
    }
  });

  const createModule = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/modules", { ...data, courseId: selectedCourse }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [`/api/courses/${selectedCourse}/modules`] })
  });

  const createLesson = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/lessons", { ...data, moduleId: selectedModule }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [`/api/modules/${selectedModule}/lessons`] })
  });

  const deleteCourse = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/courses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setSelectedCourse(null);
      setSelectedModule(null);
      toast({ title: "Success", description: "Course deleted" });
    }
  });

  const deleteModule = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/modules/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${selectedCourse}/modules`] });
      setSelectedModule(null);
      toast({ title: "Success", description: "Module deleted" });
    }
  });

  const deleteLesson = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/lessons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/modules/${selectedModule}/lessons`] });
      toast({ title: "Success", description: "Lesson deleted" });
    }
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("video", file);
      
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        // Ensure credentials are included if using sessions
      });

      if (!res.ok) {
        let errorMessage = "Upload failed";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is HTML, fetch the text to see the error
          const text = await res.text();
          if (text.includes("<!DOCTYPE")) {
            errorMessage = `Server Error (${res.status}): The server returned an HTML page instead of JSON. Make sure the route is registered and the server was restarted.`;
          }
        }
        throw new Error(errorMessage);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response. Please restart your server.");
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast({ title: "Success", description: "Video uploaded successfully" });
    },
    onError: (error: Error) => {
      toast({ 
        title: "Upload Error", 
        description: error.message || "Failed to upload video", 
        variant: "destructive" 
      });
    }
  });

  const createCertMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/certificates/bulk", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      setBulkInput("");
      setSingleStudent({ name: "", domain: "Full Stack Development" });
      toast({ title: "Success", description: "Certificates created" });
    }
  });

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

  if (userLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Loader2 className="animate-spin h-12 w-12 text-primary" />
      <p className="text-muted-foreground animate-pulse">Verifying admin access...</p>
    </div>
  );

  if (userError || !user) {
    setLocation("/auth");
    return null;
  }

  if (user.role !== "admin") {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <Card className="max-w-md mx-auto border-destructive/20 bg-destructive/5 backdrop-blur-xl p-8">
            <h2 className="text-2xl font-bold text-destructive mb-4">Access Denied</h2>
            <p className="text-muted-foreground mb-6">Your account does not have admin privileges. If this is an error, please contact support.</p>
            <Button onClick={() => setLocation("/")}>Go to Home</Button>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold font-display">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={() => logoutMutation.mutate()} className="border-primary/20">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="lms" className="space-y-6">
          <TabsList className="bg-card border border-primary/20 p-1 flex-wrap h-auto">
            <TabsTrigger value="lms"><BookOpen className="h-4 w-4 mr-2" /> LMS</TabsTrigger>
            <TabsTrigger value="applications"><Users className="h-4 w-4 mr-2" /> Applications</TabsTrigger>
            <TabsTrigger value="certificates"><Award className="h-4 w-4 mr-2" /> Certificates</TabsTrigger>
            <TabsTrigger value="offers"><FileText className="h-4 w-4 mr-2" /> Offers</TabsTrigger>
            <TabsTrigger value="ads"><Megaphone className="h-4 w-4 mr-2" /> Ads</TabsTrigger>
            <TabsTrigger value="messages"><Mail className="h-4 w-4 mr-2" /> Messages</TabsTrigger>
          </TabsList>

          {/* LMS Tab */}
          <TabsContent value="lms" className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 bg-white/5 p-2 rounded-lg">
              <span className={selectedCourse ? "text-primary font-bold" : ""}>Courses</span>
              {selectedCourse && (
                <>
                  <span className="opacity-50">/</span>
                  <span className={selectedModule ? "text-primary font-bold" : ""}>
                    {courses?.find(c => c.id === selectedCourse)?.title}
                  </span>
                </>
              )}
              {selectedModule && (
                <>
                  <span className="opacity-50">/</span>
                  <span className="text-primary font-bold">
                    {modules?.find(m => m.id === selectedModule)?.title}
                  </span>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className={`bg-card/50 border-primary/20 transition-all ${!selectedCourse ? "ring-2 ring-primary" : "opacity-70"}`}>
                <CardHeader className="pb-3"><CardTitle className="text-lg flex items-center gap-2"><BookOpen size={18}/> 1. Select Course</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {courses?.map(c => (
                      <div key={c.id} className="flex gap-2">
                        <Button 
                          variant={selectedCourse === c.id ? "default" : "outline"} 
                          className="flex-1 justify-start overflow-hidden" 
                          onClick={() => { 
                            setSelectedCourse(c.id); 
                            setSelectedModule(null);
                            setCourseForm({
                              title: c.title,
                              description: c.description,
                              price: c.price,
                              thumbnail: c.thumbnail,
                              demoVideoUrl: c.demoVideoUrl || "",
                              isPublished: c.isPublished || false
                            });
                          }}
                        >
                          <span className="truncate">{c.title}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setIsEditingCourse(true)}
                          className="text-primary shrink-0"
                        >
                          <Eye size={14}/>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            if(confirm("Delete this course?")) deleteCourse.mutate(c.id);
                          }}
                        >
                          <Trash2 size={14}/>
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Dialog open={isEditingCourse} onOpenChange={setIsEditingCourse}>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{selectedCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} placeholder="e.g. Java Masterclass" />
                        </div>
                        <div className="space-y-2">
                          <Label>Price (₹)</Label>
                          <Input value={courseForm.price} onChange={e => setCourseForm({...courseForm, price: e.target.value})} placeholder="499" />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label>Description</Label>
                          <Textarea value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})} placeholder="What will students learn?" />
                        </div>
                        <div className="space-y-2">
                          <Label>Thumbnail URL (Poster)</Label>
                          <Input value={courseForm.thumbnail} onChange={e => setCourseForm({...courseForm, thumbnail: e.target.value})} placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                          <Label>Demo Video URL</Label>
                          <Input value={courseForm.demoVideoUrl} onChange={e => setCourseForm({...courseForm, demoVideoUrl: e.target.value})} placeholder="YouTube Link" />
                        </div>
                        <div className="flex items-center gap-2 pt-4">
                          <Switch checked={courseForm.isPublished} onCheckedChange={checked => setCourseForm({...courseForm, isPublished: checked})} />
                          <Label>Published</Label>
                        </div>
                      </div>
                      <Button className="w-full" onClick={() => {
                        if (selectedCourse) updateCourse.mutate(courseForm);
                        else createCourse.mutate(courseForm);
                      }}>
                        {selectedCourse ? "Save Changes" : "Create Course"}
                      </Button>
                    </DialogContent>
                  </Dialog>

                  <Button variant="secondary" className="w-full" onClick={() => {
                    setSelectedCourse(null);
                    setCourseForm({ title: "", description: "", price: "499", thumbnail: "", demoVideoUrl: "", isPublished: true });
                    setIsEditingCourse(true);
                  }}>
                    <Plus size={16} className="mr-2"/> Add New Course
                  </Button>
                </CardContent>
              </Card>

              <Card className={`bg-card/50 border-primary/20 transition-all ${selectedCourse && !selectedModule ? "ring-2 ring-primary" : "opacity-70"}`}>
                <CardHeader className="pb-3"><CardTitle className="text-lg flex items-center gap-2"><Layers size={18}/> 2. Modules</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {selectedCourse ? (
                    <>
                      <div className="space-y-2">
                        {modules?.map(m => (
                          <div key={m.id} className="flex gap-2">
                            <Button 
                              variant={selectedModule === m.id ? "default" : "outline"} 
                              className="flex-1 justify-start overflow-hidden" 
                              onClick={() => setSelectedModule(m.id)}
                            >
                              <span className="truncate">{m.title}</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive shrink-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                if(confirm("Delete this module and its lessons?")) deleteModule.mutate(m.id);
                              }}
                            >
                              <Trash2 size={14}/>
                            </Button>
                          </div>
                        ))}
                      </div>
                      <form onSubmit={(e: any) => { e.preventDefault(); createModule.mutate({ title: e.target.title.value, order: (modules?.length || 0) + 1 }); e.target.reset(); }} className="space-y-2 pt-4 border-t border-white/5">
                        <Input name="title" placeholder="Module Name" required />
                        <Button type="submit" variant="secondary" className="w-full"><Plus size={16} className="mr-2"/> Add Module</Button>
                      </form>
                    </>
                  ) : <p className="text-sm italic text-muted-foreground">Select a course</p>}
                </CardContent>
              </Card>

              <Card className={`bg-card/50 border-primary/20 transition-all ${selectedModule ? "ring-2 ring-primary" : "opacity-70"}`}>
                <CardHeader className="pb-3"><CardTitle className="text-lg flex items-center gap-2"><Video size={18}/> 3. Lessons</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {selectedModule ? (
                    <>
                      <div className="space-y-2">
                        {lessons?.map(l => (
                          <div key={l.id} className="p-3 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
                            <span className="text-sm truncate pr-2">{l.title}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive shrink-0"
                              onClick={() => {
                                if(confirm("Delete this lesson?")) deleteLesson.mutate(l.id);
                              }}
                            >
                              <Trash2 size={14}/>
                            </Button>
                          </div>
                        ))}
                      </div>
                      <form onSubmit={async (e: any) => { 
                        e.preventDefault();
                        const form = e.target;
                        const title = form.title.value;
                        let videoUrl = form.url.value;
                        const file = form.videoFile.files[0];
                        
                        try {
                          if (file) {
                            const uploadRes = await uploadMutation.mutateAsync(file);
                            videoUrl = uploadRes.url;
                          }

                          if (!videoUrl) {
                            toast({ title: "Missing Video", description: "Please upload a file or provide a URL", variant: "destructive" });
                            return;
                          }

                          await createLesson.mutateAsync({ 
                            title, 
                            videoUrl,
                            order: (lessons?.length || 0) + 1,
                            isDemo: false 
                          }); 
                          
                          form.reset();
                          toast({ title: "Lesson Added", description: "The video lesson has been saved." });
                        } catch (err) {
                          // Error is handled by mutations
                        }
                      }} className="space-y-2 pt-4 border-t border-white/5">
                        <Input name="title" placeholder="Lesson Title" required />
                        <div className="space-y-1">
                          <Label className="text-xs">Option 1: Upload Video</Label>
                          <Input name="videoFile" type="file" accept="video/*" className="cursor-pointer" />
                        </div>
                        <div className="relative py-2">
                          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
                          <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Option 2: Video URL</Label>
                          <Input name="url" placeholder="YouTube/Vimeo URL" />
                        </div>
                        <Button type="submit" className="w-full" disabled={createLesson.isPending || uploadMutation.isPending}>
                          {uploadMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Plus size={16} className="mr-2"/>}
                          {uploadMutation.isPending ? "Uploading..." : "Add Video Lesson"}
                        </Button>
                      </form>
                    </>
                  ) : <p className="text-sm italic text-muted-foreground">Select a module</p>}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <div className="grid gap-4">
              {applications?.map((app) => (
                <Card key={app.id} className="bg-card/50 border-primary/20">
                  <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-primary">{app.fullName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{app.email} | {app.phone}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">{app.domain}</span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm italic">"{app.statement}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add other TabContents here from the original Admin.tsx as needed */}
          <TabsContent value="certificates">
             <Card className="bg-card/50 border-primary/20">
              <CardHeader><CardTitle>Issue Certificates</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Bulk: Name, Domain (one per line)" 
                  value={bulkInput} 
                  onChange={(e) => setBulkInput(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button className="w-full" onClick={() => {
                  const students = bulkInput.split('\n').filter(l => l.includes(',')).map(l => {
                    const [name, domain] = l.split(',');
                    return { studentName: name.trim(), domain: domain.trim() };
                  });
                  if (students.length) createCertMutation.mutate({ students });
                }}>Issue Bulk</Button>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </MainLayout>
  );
}