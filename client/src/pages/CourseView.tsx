import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlayCircle, Lock, Video, Loader2, CheckCircle2, CreditCard, Trophy, Linkedin, User, Info, BookOpen } from "lucide-react";
import type { Course, Module, Lesson, Enrollment, UserProgress } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CourseView() {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  const { data: course, isLoading: courseLoading } = useQuery<Course>({
    queryKey: ["/api/courses", id],
  });

  const { data: modules, isLoading: modulesLoading } = useQuery<Module[]>({
    queryKey: ["/api/courses", id, "modules"],
    enabled: !!id,
  });

  const { data: userProgress } = useQuery<UserProgress[]>({
    queryKey: ["/api/user/progress", id],
    enabled: !!id
  });

  const { data: enrollments } = useQuery<Enrollment[]>({
    queryKey: ["/api/user/enrollments"],
    retry: false
  });

  const isEnrolled = enrollments?.some(e => e.courseId === Number(id));

  // Calculate Progress Percentage
  const totalLessons = modules?.reduce((acc, mod) => acc + (queryClient.getQueryData<Lesson[]>([`/api/modules/${mod.id}/lessons`])?.length || 0), 0) || 0;
  const completedLessons = userProgress?.filter(p => p.isCompleted).length || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const markAsComplete = async (lessonId: number) => {
    try {
      await apiRequest("POST", "/api/progress", { lessonId, isCompleted: true });
      queryClient.invalidateQueries({ queryKey: ["/api/user/progress", id] });
    } catch (err) {
      console.error("Progress update failed");
    }
  };

  const handleGenerateCertificate = async () => {
    setIsGeneratingCert(true);
    try {
      await apiRequest("POST", "/api/certificates/generate", { courseId: id });
      toast({ title: "Congratulations!", description: "Your certificate has been generated. Check the Certificate page." });
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
    } catch (err: any) {
      toast({ title: "Not Ready", description: err.message, variant: "destructive" });
    } finally {
      setIsGeneratingCert(false);
    }
  };

  const handleEnroll = async () => {
    setIsProcessing(true);
    try {
      // 1. Create order on backend
      const order = await apiRequest("POST", "/api/payments/create-order", { courseId: id });
      const orderData = await order.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "", // Public key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SkyForger",
        description: `Enrollment for ${course.title}`,
        order_id: orderData.id,
        handler: async (response: any) => {
          try {
            // 3. Verify payment on backend
            await apiRequest("POST", "/api/payments/verify", {
              ...response,
              courseId: id
            });
            
            toast({
              title: "Success!",
              description: "You have successfully enrolled in this course.",
            });
            
            // Refresh enrollments
            queryClient.invalidateQueries({ queryKey: ["/api/user/enrollments"] });
          } catch (err) {
            toast({
              title: "Verification Failed",
              description: "There was an issue verifying your payment.",
              variant: "destructive"
            });
          }
        },
        prefill: {
          name: "", // Can be filled if we have user data
          email: "",
        },
        theme: {
          color: "#3b82f6",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (courseLoading || modulesLoading) return <div className="flex justify-center p-24"><Loader2 className="animate-spin h-12 w-12 text-primary" /></div>;
  if (!course) return <div>Course not found</div>;

  const currentVideoUrl = activeLesson?.videoUrl || course.demoVideoUrl;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
              {currentVideoUrl ? (
                currentVideoUrl.includes("youtube.com") || currentVideoUrl.includes("vimeo.com") ? (
                  <iframe 
                    src={currentVideoUrl.replace("watch?v=", "embed/")} 
                    className="w-full h-full" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen 
                  />
                ) : (
                  <video 
                    key={currentVideoUrl}
                    src={currentVideoUrl} 
                    controls 
                    className="w-full h-full"
                    onEnded={() => activeLesson && markAsComplete(activeLesson.id)}
                  />
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white/40">
                  <Video size={48} className="mb-4" />
                  <p>Video content not available</p>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider">
                {activeLesson ? `Module ${activeLesson.moduleId} • Lesson` : "Course Overview"}
              </div>
              <h1 className="text-4xl font-bold font-display">{activeLesson?.title || course.title}</h1>
              <p className="text-lg text-muted-foreground">{activeLesson ? "Complete this lesson to proceed." : "Master this subject with our comprehensive curriculum and expert guidance."}</p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-card border border-primary/10 w-full justify-start h-auto p-1 mb-8">
                <TabsTrigger value="overview" className="py-3 px-6"><Info size={16} className="mr-2"/> Overview</TabsTrigger>
                <TabsTrigger value="curriculum" className="py-3 px-6 lg:hidden"><BookOpen size={16} className="mr-2"/> Curriculum</TabsTrigger>
                <TabsTrigger value="instructor" className="py-3 px-6"><User size={16} className="mr-2"/> Instructor</TabsTrigger>
                <TabsTrigger value="certificate" className="py-3 px-6"><Award size={16} className="mr-2"/> Certificate</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-2xl font-bold mb-4">About this course</h3>
                  <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed text-lg">
                    {course.description}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                  <Card className="bg-primary/5 border-primary/10 p-6">
                    <h4 className="font-bold mb-2 flex items-center gap-2 text-primary">
                      <CheckCircle2 size={18} /> What you'll learn
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {course.whatWillLearn ? course.whatWillLearn.split('\n').map((item, i) => (
                        <li key={i}>{item.startsWith('-') ? item : `• ${item}`}</li>
                      )) : (
                        <>
                          <li>• Hands-on industry projects</li>
                          <li>• Expert-led video sessions</li>
                          <li>• Lifetime access to materials</li>
                          <li>• Professional certification</li>
                        </>
                      )}
                    </ul>
                  </Card>
                  <Card className="bg-primary/5 border-primary/10 p-6">
                    <h4 className="font-bold mb-2 flex items-center gap-2 text-primary">
                      <Lock size={18} /> Prerequisites
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {course.prerequisites || "No prior experience required. We start from the absolute basics and take you to an advanced level."}
                    </p>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="lg:hidden">
                <Card className="border-primary/10 bg-card/50">
                  <CardContent className="p-4">
                    <Accordion type="single" collapsible className="w-full">
                      {modules?.map((mod, index) => (
                        <AccordionItem key={mod.id} value={`item-${index}`} className="border-white/5">
                          <AccordionTrigger className="hover:no-underline py-4 text-left">
                            Module {index + 1}: {mod.title}
                          </AccordionTrigger>
                          <AccordionContent className="space-y-1">
                            <LessonsList 
                              moduleId={mod.id} 
                              isEnrolled={!!isEnrolled} 
                              onSelectLesson={setActiveLesson}
                              activeLessonId={activeLesson?.id}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="animate-in fade-in slide-in-from-bottom-2">
                {/* ... existing instructor card ... */}
              </TabsContent>

              <TabsContent value="certificate" className="animate-in fade-in slide-in-from-bottom-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-primary">Get Certified</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Stand out from the crowd with a professional certification from SkyForger Technologies. 
                      Upon 100% completion of all modules and assignments, you will be awarded a verified certificate 
                      that you can share on LinkedIn, your resume, or with potential employers.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="text-green-500" size={20} />
                        Verified Certificate ID
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="text-green-500" size={20} />
                        Shareable on LinkedIn & Resume
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="text-green-500" size={20} />
                        Lifetime Validity
                      </li>
                    </ul>
                  </div>
                  <Card className="bg-black/40 border-primary/20 p-4 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 group">
                    <div className="relative aspect-[1.414/1] bg-white rounded-sm overflow-hidden shadow-inner">
                      <img 
                        src="/certificates/sample-certificate.jpeg" 
                        alt="Sample Certificate" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1000&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-primary text-white px-4 py-2 rounded-full font-bold shadow-lg">Sample Preview</span>
                      </div>
                    </div>
                    <p className="text-center text-[10px] text-muted-foreground mt-4 uppercase tracking-tighter">Your actual certificate will feature your name and unique ID</p>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm sticky top-24">
              <CardContent className="p-6">
                {isEnrolled && (
                  <div className="mb-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Your Progress</span>
                      <span className="text-sm font-bold text-primary">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                    {progressPercent === 100 && (
                      <Button 
                        onClick={handleGenerateCertificate} 
                        disabled={isGeneratingCert}
                        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
                      >
                        {isGeneratingCert ? <Loader2 className="animate-spin" /> : <><Trophy size={16} className="mr-2" /> Claim Certificate</>}
                      </Button>
                    )}
                  </div>
                )}
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <PlayCircle className="text-primary" /> Course Curriculum
                </h3>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                  {modules?.map((mod, index) => (
                    <AccordionItem key={mod.id} value={`item-${index}`} className="border-white/5">
                      <AccordionTrigger className="hover:no-underline py-4 text-left">
                        Module {index + 1}: {mod.title}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        <LessonsList 
                          moduleId={mod.id} 
                          isEnrolled={!!isEnrolled} 
                          onSelectLesson={setActiveLesson}
                          activeLessonId={activeLesson?.id}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {!isEnrolled && (
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="mb-4">
                      <div className="text-sm text-muted-foreground mb-1">Course Price</div>
                      <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-bold">₹{course.price}</div>
                        {course.originalPrice && (
                          <div className="text-lg text-muted-foreground line-through decoration-primary/50">₹{course.originalPrice}</div>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={handleEnroll}
                      disabled={isProcessing}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>
                          <CreditCard size={20} />
                          Enroll Now
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-widest">
                      {course.originalPrice && (
                        <span className="text-primary font-bold mr-1">
                          {Math.round(((Number(course.originalPrice) - Number(course.price)) / Number(course.originalPrice)) * 100)}% OFF •
                        </span>
                      )}
                      Lifetime Access • Certificate Included
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

interface LessonsListProps {
  moduleId: number;
  isEnrolled: boolean;
  onSelectLesson: (lesson: Lesson) => void;
  activeLessonId?: number;
}

function LessonsList({ moduleId, isEnrolled, onSelectLesson, activeLessonId }: LessonsListProps) {
  const { data: lessons } = useQuery<Lesson[]>({
    queryKey: ["/api/modules", moduleId, "lessons"],
  });

  const { data: userProgress } = useQuery<UserProgress[]>({
    queryKey: ["/api/user/progress"], 
  });

  return (
    <div className="space-y-1">
      {lessons?.map((lesson) => {
        const isCompleted = userProgress?.some(p => p.lessonId === lesson.id && p.isCompleted);
        const hasAccess = isEnrolled || lesson.isDemo;
        const isActive = activeLessonId === lesson.id;

        return (
          <button
            key={lesson.id}
            disabled={!hasAccess}
            onClick={() => onSelectLesson(lesson)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all text-left ${
              isActive 
                ? 'bg-primary/20 text-primary border border-primary/20' 
                : 'hover:bg-white/5 text-muted-foreground'
            } ${!hasAccess && 'opacity-50 cursor-not-allowed'}`}
          >
            <div className="flex items-center gap-3">
              {isActive ? (
                <PlayCircle size={16} className="animate-pulse" />
              ) : isCompleted ? (
                <CheckCircle2 size={16} className="text-green-500" />
              ) : hasAccess ? (
                <PlayCircle size={16} className="text-primary/60" />
              ) : (
                <Lock size={16} />
              )}
              <span className={`text-sm ${isActive ? 'font-bold' : ''}`}>{lesson.title}</span>
            </div>
            {lesson.isDemo && !isActive && (
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold uppercase">Free</span>
            )}
          </button>
        );
      })}
    </div>
  );
}