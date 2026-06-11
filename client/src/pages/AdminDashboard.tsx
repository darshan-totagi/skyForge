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
  Printer, RefreshCw, BookOpen, Video, Layers, MessageSquareQuote, Linkedin,
  Info
} from "lucide-react";
import type { Ad, InternshipApplication, ContactMessage, Certificate, OfferLetter, Course, Module, Lesson, Review } from "@shared/schema";
import { MainLayout } from "@/components/layout/MainLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [bulkInput, setBulkInput] = useState("");
  const [singleStudent, setSingleStudent] = useState({ name: "", domain: "MERN Stack Development" });
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
    originalPrice: "1999",
    thumbnail: "",
    demoVideoUrl: "",
    tutorName: "",
    tutorImage: "",
    tutorLinkedin: "",
    tutorDesignation: "",
    whatWillLearn: "",
    prerequisites: "",
    isPublished: true
  });

  const [newOfferLetter, setNewOfferLetter] = useState({
    studentName: "",
    position: "MERN Stack Development Intern",
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
  const { data: offerLetters, isLoading: offersLoading } = useQuery<OfferLetter[]>({ queryKey: ["/api/offer-letters"] });
  const { data: reviews } = useQuery<Review[]>({ queryKey: [api.reviews.list.path] });
  
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
    mutationFn: async ({ file, type }: { file: File, type: 'video' | 'image' }) => {
      const formData = new FormData();
      formData.append(type === 'video' ? "video" : "image", file);
      
      const endpoint = type === 'video' ? "/api/upload" : "/api/upload-image";
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "File uploaded successfully" });
    }
  });

  const createCertMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/certificates/bulk", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      setBulkInput("");
      setSingleStudent({ name: "", domain: "MERN Stack Development" });
      toast({ title: "Success", description: "Certificates created" });
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
        position: "MERN Stack Development Intern",
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

  const uploadAdImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      return res.json();
    },
    onSuccess: (data) => {
      setNewAd({ ...newAd, imageUrl: data.url });
      toast({ title: "Success", description: "Ad image uploaded" });
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

  if (user.role?.trim() !== "admin") {
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
            <TabsTrigger value="reviews"><MessageSquareQuote className="h-4 w-4 mr-2" /> Reviews</TabsTrigger>
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
                              originalPrice: c.originalPrice || "",
                              thumbnail: c.thumbnail,
                              demoVideoUrl: c.demoVideoUrl || "",
                              tutorName: c.tutorName || "",
                              tutorImage: c.tutorImage || "",
                              tutorLinkedin: c.tutorLinkedin || "",
                              tutorDesignation: c.tutorDesignation || "",
                              whatWillLearn: c.whatWillLearn || "",
                              prerequisites: c.prerequisites || "",
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
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{selectedCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="col-span-2 space-y-2">
                          <Label>Course Title</Label>
                          <Input value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} placeholder="e.g. Java Masterclass" />
                        </div>
                        <div className="space-y-2">
                          <Label>Discounted Price (₹)</Label>
                          <Input value={courseForm.price} onChange={e => setCourseForm({...courseForm, price: e.target.value})} placeholder="499" />
                        </div>
                        <div className="space-y-2">
                          <Label>Original Price (Strike-through) (₹)</Label>
                          <Input value={courseForm.originalPrice} onChange={e => setCourseForm({...courseForm, originalPrice: e.target.value})} placeholder="1999" />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label>Description</Label>
                          <Textarea value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})} placeholder="What will students learn?" />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label>What you'll learn (One per line)</Label>
                          <Textarea value={courseForm.whatWillLearn} onChange={e => setCourseForm({...courseForm, whatWillLearn: e.target.value})} placeholder="- Hands-on industry projects&#10;- Expert-led video sessions" />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label>Prerequisites</Label>
                          <Input value={courseForm.prerequisites} onChange={e => setCourseForm({...courseForm, prerequisites: e.target.value})} placeholder="e.g. No prior experience required" />
                        </div>
                        
                        {/* Course Thumbnail Upload */}
                        <div className="space-y-2">
                          <Label>Course Poster (Thumbnail)</Label>
                          <div className="flex gap-2">
                            <Input 
                              type="file" 
                              accept="image/*" 
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const res = await uploadMutation.mutateAsync({ file, type: 'image' });
                                  setCourseForm({...courseForm, thumbnail: res.url});
                                }
                              }} 
                            />
                          </div>
                          {courseForm.thumbnail && <p className="text-[10px] text-primary truncate">{courseForm.thumbnail}</p>}
                        </div>

                        {/* Demo Video Upload */}
                        <div className="space-y-2">
                          <Label>Demo Video (Free Preview)</Label>
                          <div className="flex gap-2">
                            <Input 
                              type="file" 
                              accept="video/*" 
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const res = await uploadMutation.mutateAsync({ file, type: 'video' });
                                  setCourseForm({...courseForm, demoVideoUrl: res.url});
                                }
                              }} 
                            />
                          </div>
                          {courseForm.demoVideoUrl && <p className="text-[10px] text-primary truncate">{courseForm.demoVideoUrl}</p>}
                        </div>

                        {/* Tutor Details */}
                        <div className="col-span-2 border-t border-white/5 pt-4 mt-2">
                          <h4 className="text-sm font-bold mb-4">Tutor Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Tutor Name</Label>
                              <Input value={courseForm.tutorName} onChange={e => setCourseForm({...courseForm, tutorName: e.target.value})} placeholder="e.g. Dr. John Doe" />
                            </div>
                            <div className="space-y-2">
                              <Label>Tutor Designation</Label>
                              <Input value={courseForm.tutorDesignation} onChange={e => setCourseForm({...courseForm, tutorDesignation: e.target.value})} placeholder="e.g. Senior Software Engineer" />
                            </div>
                            <div className="space-y-2">
                              <Label>Tutor LinkedIn URL</Label>
                              <Input value={courseForm.tutorLinkedin} onChange={e => setCourseForm({...courseForm, tutorLinkedin: e.target.value})} placeholder="https://linkedin.com/in/..." />
                            </div>
                            <div className="space-y-2">
                              <Label>Tutor Profile Image</Label>
                              <Input 
                                type="file" 
                                accept="image/*" 
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const res = await uploadMutation.mutateAsync({ file, type: 'image' });
                                    setCourseForm({...courseForm, tutorImage: res.url});
                                  }
                                }} 
                              />
                              {courseForm.tutorImage && <p className="text-[10px] text-primary truncate">{courseForm.tutorImage}</p>}
                            </div>
                          </div>
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
                    setCourseForm({ 
                        title: "", 
                        description: "", 
                        price: "499", 
                        originalPrice: "1999", 
                        thumbnail: "", 
                        demoVideoUrl: "", 
                        tutorName: "",
                        tutorImage: "",
                        tutorLinkedin: "",
                        tutorDesignation: "",
                        whatWillLearn: "",
                        prerequisites: "",
                        isPublished: true 
                      });
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
                <div className="flex gap-4 mb-4">
                  <Button variant={!isBulk ? "default" : "outline"} onClick={() => setIsBulk(false)} className="flex-1">Single Issue</Button>
                  <Button variant={isBulk ? "default" : "outline"} onClick={() => setIsBulk(true)} className="flex-1">Bulk Upload</Button>
                </div>
                {!isBulk ? (
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Student Name" value={singleStudent.name} onChange={(e) => setSingleStudent({...singleStudent, name: e.target.value})} />
                    <select 
                      className="flex h-10 w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm"
                      value={singleStudent.domain}
                      onChange={(e) => setSingleStudent({...singleStudent, domain: e.target.value})}
                    >
                      <option>MERN Stack Development</option>
                      <option>Web Development</option>
                      <option>Artificial Intelligence</option>
                      <option>UI/UX Design</option>
                    </select>
                  </div>
                ) : (
                  <Textarea 
                    placeholder="Bulk: Name, Domain (one per line)" 
                    value={bulkInput} 
                    onChange={(e) => setBulkInput(e.target.value)}
                    className="min-h-[100px]"
                  />
                )}
                <Button className="w-full" onClick={() => {
                  if (isBulk) {
                    const students = bulkInput.split('\n').filter(l => l.includes(',')).map(l => {
                      const [name, domain] = l.split(',');
                      return { studentName: name.trim(), domain: domain.trim() };
                    });
                    if (students.length) createCertMutation.mutate({ students });
                  } else {
                    if (singleStudent.name) createCertMutation.mutate({ students: [{ studentName: singleStudent.name, domain: singleStudent.domain }] });
                  }
                }}>Issue Certificate(s)</Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {certificates?.map((cert) => (
                <Card key={cert.id} className="bg-card/50 border-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold">{cert.studentName}</CardTitle>
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-mono text-primary/70">{cert.certificateId}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{cert.domain}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offers" className="space-y-6">
            <Card className="bg-card/50 border-primary/20">
              <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Generate Offer Letter</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <Button variant={!isBulkOffer ? "default" : "outline"} onClick={() => setIsBulkOffer(false)} className="flex-1">Single Offer</Button>
                  <Button variant={isBulkOffer ? "default" : "outline"} onClick={() => setIsBulkOffer(true)} className="flex-1">Bulk Upload</Button>
                </div>
                {!isBulkOffer ? (
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Student Name" value={newOfferLetter.studentName} onChange={(e) => setNewOfferLetter({...newOfferLetter, studentName: e.target.value})} />
                    <Input placeholder="Position" value={newOfferLetter.position} onChange={(e) => setNewOfferLetter({...newOfferLetter, position: e.target.value})} />
                  </div>
                ) : (
                  <Textarea 
                    placeholder="Format: Name, Position, Department, Start Date, End Date" 
                    value={bulkOfferInput} 
                    onChange={(e) => setBulkOfferInput(e.target.value)}
                    className="min-h-[100px]"
                  />
                )}
                <Button className="w-full" onClick={() => {
                  if (isBulkOffer) {
                    const students = bulkOfferInput.split('\n').filter(l => l.includes(',')).map(l => {
                      const [name, pos, dept, start, end] = l.split(',').map(s => s.trim());
                      return { studentName: name, position: pos, department: dept, startDate: start, endDate: end };
                    });
                    if (students.length) createOfferLetterMutation.mutate({ students });
                  } else if (newOfferLetter.studentName) {
                    createOfferLetterMutation.mutate(newOfferLetter);
                  }
                }}>Generate Offer Letter(s)</Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {offerLetters?.map((offer) => (
                <Card key={offer.id} className="bg-card/50 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">{offer.studentName}</CardTitle>
                    <p className="text-sm text-primary/70">{offer.position}</p>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedOfferLetter(offer)}>View / Print</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ads" className="space-y-8">
            <Card className="bg-card/50 border-primary/20">
              <CardHeader><CardTitle>Create New Ad</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Ad Title</Label>
                      <Input placeholder="e.g. New Batch Starting" value={newAd.title} onChange={(e) => setNewAd({...newAd, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Ad details..." value={newAd.description} onChange={(e) => setNewAd({...newAd, description: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Target Link URL</Label>
                      <Input placeholder="https://..." value={newAd.linkUrl} onChange={(e) => setNewAd({...newAd, linkUrl: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 space-y-3">
                      <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                        <Info size={14} /> Image Configuration
                      </h4>
                      
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-tighter opacity-70">Option 1: Upload Image (Temporary)</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="file" 
                            accept="image/*" 
                            className="h-9 bg-white/5 border-primary/20 file:text-primary file:font-bold text-xs" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadAdImageMutation.mutate(file);
                            }} 
                          />
                          {uploadAdImageMutation.isPending && <Loader2 className="animate-spin h-4 w-4 text-primary" />}
                        </div>
                      </div>

                      <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold"><span className="bg-[#0f172a] px-2 text-muted-foreground">OR</span></div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-tighter opacity-70">Option 2: Permanent Path</Label>
                        <Input 
                          placeholder="/coming-soon.jpg" 
                          value={newAd.imageUrl} 
                          onChange={(e) => setNewAd({...newAd, imageUrl: e.target.value})}
                          className="h-9 font-mono text-xs"
                        />
                        <p className="text-[10px] text-muted-foreground leading-tight italic">
                          * Use permanent paths like <code className="text-primary">/coming-soon.jpg</code> for live site persistence.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Switch checked={newAd.isActive} onCheckedChange={(checked) => setNewAd({...newAd, isActive: checked})} />
                    <Label>Active Status</Label>
                  </div>
                  <Button onClick={() => createAdMutation.mutate(newAd)} disabled={createAdMutation.isPending}>
                    {createAdMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                    Create Ad
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ads?.map((ad) => (
                <Card key={ad.id} className="overflow-hidden bg-card/50 border-primary/20">
                  <div className="aspect-video w-full overflow-hidden bg-black/40 flex items-center justify-center">
                    <img src={ad.imageUrl} alt={ad.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{ad.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <Switch checked={!!ad.isActive} onCheckedChange={(checked) => toggleAdMutation.mutate({ id: ad.id, isActive: checked })} />
                      <Button variant="destructive" size="icon" onClick={() => deleteAdMutation.mutate(ad.id)}><Trash2 size={14} /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            {messages?.map((msg) => (
              <Card key={msg.id} className="bg-card/50 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{msg.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{msg.email}</p>
                </CardHeader>
                <CardContent><p className="italic">"{msg.message}"</p></CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-8">
             <Card className="bg-card/50 border-primary/20">
              <CardHeader><CardTitle>Add New Review</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Student Name" value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Role / Batch</Label>
                    <Input placeholder="e.g. MERN Stack Intern" value={newReview.role} onChange={(e) => setNewReview({...newReview, role: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn URL (Optional)</Label>
                    <Input placeholder="https://linkedin.com/in/..." value={newReview.linkedinUrl} onChange={(e) => setNewReview({...newReview, linkedinUrl: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Rating (1-5)</Label>
                    <Input type="number" min="1" max="5" value={newReview.rating} onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Student Image (Optional)</Label>
                    <div className="flex items-center gap-4">
                      <Input 
                        type="file" 
                        accept="image/*" 
                        className="bg-white/5 border-primary/20"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const res = await uploadMutation.mutateAsync({ file, type: 'image' });
                            setNewReview({...newReview, imageUrl: res.url});
                          }
                        }} 
                      />
                      {newReview.imageUrl && (
                        <div className="h-10 w-10 rounded-full overflow-hidden border border-primary/20">
                          <img src={newReview.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Review Content</Label>
                  <Textarea placeholder="Share their success story..." value={newReview.content} onChange={(e) => setNewReview({...newReview, content: e.target.value})} className="min-h-[100px]" />
                </div>
                <Button className="w-full" onClick={() => createReviewMutation.mutate(newReview)} disabled={createReviewMutation.isPending}>
                  {createReviewMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                  Add Review
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews?.map((review) => (
                <Card key={review.id} className="bg-card/50 border-primary/20 overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {review.imageUrl ? (
                          <div className="h-10 w-10 rounded-full overflow-hidden border border-primary/20">
                            <img src={review.imageUrl} alt={review.name} className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {review.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-primary leading-tight">{review.name}</h3>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{review.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => {
                        if(confirm("Delete this review?")) deleteReviewMutation.mutate(review.id);
                      }}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground italic line-clamp-4">"{review.content}"</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${i < (review.rating || 5) ? "text-yellow-500" : "text-muted-foreground"}`}>★</span>
                        ))}
                      </div>
                      {review.linkedinUrl && (
                        <a href={review.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                          <Linkedin size={14} />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

        </Tabs>

        {/* Offer Letter Preview Modal */}
        <Dialog open={!!selectedOfferLetter} onOpenChange={(open) => !open && setSelectedOfferLetter(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-8 text-black">
            <div id="offer-letter-content">
               {/* Simple Offer Letter Template */}
               <div className="text-center mb-8">
                 <h1 className="text-3xl font-bold uppercase tracking-widest text-blue-900">Offer Letter</h1>
                 <div className="h-1 w-24 bg-blue-900 mx-auto mt-2"></div>
               </div>
               <div className="space-y-6 text-sm leading-relaxed">
                 <p className="font-bold">Date: {new Date().toLocaleDateString()}</p>
                 <p>To,<br/><span className="text-lg font-bold">{selectedOfferLetter?.studentName}</span></p>
                 <p>Subject: Offer for <span className="font-bold">{selectedOfferLetter?.position}</span></p>
                 <p>Dear {selectedOfferLetter?.studentName},</p>
                 <p>We are pleased to offer you an internship at <span className="font-bold text-blue-900">SkyForger Technologies</span> as a <span className="font-bold">{selectedOfferLetter?.position}</span>. Your internship is scheduled to begin on <span className="font-bold">{selectedOfferLetter?.startDate}</span> and end on <span className="font-bold">{selectedOfferLetter?.endDate}</span>.</p>
                 <p>During this period, you will be part of the <span className="font-bold">{selectedOfferLetter?.department}</span> and will work on various real-world projects under industry mentorship.</p>
                 <p>We look forward to having you on our team.</p>
                 <div className="pt-12">
                   <p>Best Regards,</p>
                   <p className="font-bold mt-4">HR Department</p>
                   <p className="text-blue-900 font-bold">SkyForger Technologies</p>
                 </div>
               </div>
            </div>
            <div className="flex gap-4 mt-8 print:hidden">
              <Button onClick={() => window.print()} className="flex-1">Print / Save as PDF</Button>
              <Button variant="outline" onClick={() => setSelectedOfferLetter(null)} className="flex-1">Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}