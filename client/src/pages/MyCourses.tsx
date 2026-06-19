import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PlayCircle, Clock, Award, Loader2, BookOpen } from "lucide-react";
import type { Enrollment, Course } from "@shared/schema";
import { useState, useEffect } from "react";

const loadingPrompts = [
  "Loading your courses...",
  "Fetching your progress...",
  "Preparing your dashboard...",
  "Almost there..."
];

export default function MyCourses() {
  const { data: enrollments, isLoading: loadingEnrollments } = useQuery<Enrollment[]>({ 
    queryKey: ["/api/user/enrollments"] 
  });
  
  const { data: allCourses } = useQuery<Course[]>({ 
    queryKey: ["/api/courses"] 
  });
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    if (!loadingEnrollments) return;
    
    const interval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % loadingPrompts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [loadingEnrollments]);

  if (loadingEnrollments) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50">
          <div className="relative">
            {/* Animated Spinner */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-24 h-24 border-4 border-purple-200 border-b-purple-600 rounded-full"
              />
            </div>

            {/* Animated Icons */}
            <div className="absolute -top-8 -left-12">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <BookOpenIcon className="w-8 h-8 text-blue-500 opacity-50" />
              </motion.div>
            </div>
            <div className="absolute -top-4 -right-12">
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <GraduationCapIcon className="w-8 h-8 text-purple-500 opacity-50" />
              </motion.div>
            </div>
            <div className="absolute -bottom-8 left-8">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <CodeIcon className="w-6 h-6 text-blue-400 opacity-40" />
              </motion.div>
            </div>
            <div className="absolute -bottom-4 right-8">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
              >
                <SparklesIcon className="w-6 h-6 text-purple-400 opacity-40" />
              </motion.div>
            </div>
          </div>

          {/* Animated Text Prompt */}
          <div className="mt-12 h-12">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentPromptIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-medium text-slate-700"
              >
                {loadingPrompts[currentPromptIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Progress Dots */}
          <div className="mt-8 flex gap-2">
            {loadingPrompts.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: currentPromptIndex === i ? 1.2 : 1,
                  backgroundColor: currentPromptIndex === i ? "#2563eb" : "#cbd5e1"
                }}
                className="w-2 h-2 rounded-full"
              />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  const myCourses = allCourses?.filter(c => enrollments?.some(e => e.courseId === c.id)) || [];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <BookOpen size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">My Learning</h1>
            <p className="text-muted-foreground">Continue where you left off</p>
          </div>
        </div>

        {myCourses.length === 0 ? (
          <Card className="border-dashed border-2 bg-transparent p-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">No courses yet</h2>
            <p className="text-muted-foreground mb-8">You haven't enrolled in any courses yet. Start your journey today!</p>
            <Link href="/courses">
              <Button size="lg">Browse All Courses</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myCourses.map((course) => (
              <Card key={course.id} className="group overflow-hidden border-primary/10 bg-card/50 hover:border-primary/40 transition-all flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-all" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/course/${course.id}`}>
                      <Button variant="secondary" className="gap-2">
                        <PlayCircle size={20} /> Continue Learning
                      </Button>
                    </Link>
                  </div>
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardFooter className="border-t border-white/5 pt-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={14} /> Lifetime Access</span>
                    <span className="flex items-center gap-1"><Award size={14} /> Verified</span>
                  </div>
                  <Link href={`/course/${course.id}`} className="w-full">
                    <Button className="w-full">Open Course</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

// Need to import these icons
function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  );
}
