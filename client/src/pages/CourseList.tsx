import { useQuery } from "@tanstack/react-query";
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
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-center mb-16">Explore Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <span className="text-2xl font-bold">₹{course.price}</span>
                <Link href={`/course/${course.id}`}><Button>Details</Button></Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}