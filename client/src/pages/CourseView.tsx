import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlayCircle, Lock, Video, Loader2, CheckCircle2, CreditCard } from "lucide-react";
import type { Course, Module, Lesson, Enrollment } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

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

  const { data: enrollments } = useQuery<Enrollment[]>({
    queryKey: ["/api/user/enrollments"],
    retry: false
  });

  const isEnrolled = enrollments?.some(e => e.courseId === Number(id));

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
                <iframe 
                  src={currentVideoUrl.replace("watch?v=", "embed/")} 
                  className="w-full h-full" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen 
                />
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
              <p className="text-lg text-muted-foreground">{activeLesson ? "Complete this lesson to proceed." : course.description}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm sticky top-24">
              <CardContent className="p-6">
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
                      <div className="text-3xl font-bold">₹{course.price}</div>
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

  return (
    <div className="space-y-1">
      {lessons?.map((lesson) => {
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
              ) : hasAccess ? (
                <CheckCircle2 size={16} className="text-primary/60" />
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