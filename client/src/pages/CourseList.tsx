import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play, Clock, Award, Star, Loader2 } from "lucide-react";
import type { Course } from "@shared/schema";

export default function CourseList() {
  const { data: courses, isLoading } = useQuery<Course[]>({ queryKey: ["/api/courses"] });
  if (isLoading) return <div className="flex justify-center p-24"><Loader2 className="animate-spin h-12 w-12 text-primary" /></div>;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Energy Wave similar to Home */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-primary/20 blur-[120px] rounded-full"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-5xl md:text-8xl font-display font-extrabold tracking-tighter text-center mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Courses <br /> Coming Soon
          </h1>
          <p className="text-muted-foreground text-center max-w-lg mb-12 text-lg md:text-xl">
            We're working hard to bring you the best technical education. Stay tuned for our upcoming expert-led courses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-10">
          {courses?.map((course) => (
            <Card key={course.id} className="group overflow-hidden border-primary/10 bg-card/50 hover:border-primary/40 transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-all" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"><Play className="text-white h-12 w-12 fill-white" /></div>
              </div>
              <CardHeader><CardTitle>{course.title}</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Clock size={14} /> Lifetime</span><span className="flex items-center gap-1"><Award size={14} /> Certificate</span></div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex flex-col">
                  {course.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</span>
                  )}
                  <span className="text-2xl font-bold">₹{course.price}</span>
                </div>
                <Link href={`/course/${course.id}`}><Button>Details</Button></Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}