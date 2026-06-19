import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play, Clock, Award, Star, Loader2 } from "lucide-react";
import type { Course } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";
import { useState, useEffect } from "react";

const loadingPrompts = [
  "Preparing your learning journey...",
  "Loading expert-led courses...",
  "Getting course materials ready...",
  "Setting up your dashboard...",
  "Almost there..."
];

export default function CourseList() {
  const { data: courses, isLoading } = useQuery<Course[]>({ queryKey: ["/api/courses"] });
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % loadingPrompts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  const prefetchCourse = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["/api/courses", String(id)],
      staleTime: 5 * 60 * 1000,
    });
    queryClient.prefetchQuery({
      queryKey: ["/api/courses", String(id), "modules"],
      staleTime: 5 * 60 * 1000,
    });
  };

  if (isLoading) {
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
                <BookOpen className="w-8 h-8 text-blue-500 opacity-50" />
              </motion.div>
            </div>
            <div className="absolute -top-4 -right-12">
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <GraduationCap className="w-8 h-8 text-purple-500 opacity-50" />
              </motion.div>
            </div>
            <div className="absolute -bottom-8 left-8">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <Code className="w-6 h-6 text-blue-400 opacity-40" />
              </motion.div>
            </div>
            <div className="absolute -bottom-4 right-8">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
              >
                <Sparkles className="w-6 h-6 text-purple-400 opacity-40" />
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24 min-h-[70vh] relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center mb-20"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-4 block">PROJECT-BASED LEARNING</span>
          <h1 className="text-4xl md:text-7xl font-display font-extrabold tracking-tighter text-center mb-6 text-slate-900">
            Our Courses
          </h1>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12 text-lg md:text-xl">
            Hands-on, project-based courses designed to give you real-world experience. Every course includes live projects, mentorship, and an industry-recognized certificate.
          </p>
        </motion.div>

        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-10">
            {courses?.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  className="group overflow-hidden border-slate-200 bg-white hover:border-blue-200 transition-all shadow-lg hover:shadow-xl"
                  onMouseEnter={() => prefetchCourse(course.id)}
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-2xl">
                    <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-all" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <div className="bg-blue-600 rounded-full p-4">
                        <Play className="text-white h-8 w-8 fill-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-display text-slate-900">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 line-clamp-2">{course.description}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} className="text-blue-600" />
                        Lifetime Access
                      </span>
                      <span className="flex items-center gap-1">
                        <Award size={14} className="text-blue-600" />
                        Internship Certificate
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t border-slate-200 pt-4">
                    <div className="flex flex-col">
                      {course.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">₹{course.originalPrice}</span>
                      )}
                      <span className="text-2xl font-bold text-slate-900">₹{course.price}</span>
                    </div>
                    <Link href={`/course/${course.id}`}>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white">
                        Enroll Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : null}
      </div>
    </MainLayout>
  );
}

// Need to import these icons
function BookOpen({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}

function GraduationCap({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}

function Code({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}

function Sparkles({ className }: { className?: string }) {
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
