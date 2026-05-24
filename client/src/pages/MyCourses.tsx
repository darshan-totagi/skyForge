import { useQuery } from "@tanstack/react-query";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PlayCircle, Clock, Award, Loader2, BookOpen } from "lucide-react";
import type { Enrollment, Course } from "@shared/schema";

export default function MyCourses() {
  const { data: enrollments, isLoading: loadingEnrollments } = useQuery<Enrollment[]>({ 
    queryKey: ["/api/user/enrollments"] 
  });
  
  const { data: allCourses } = useQuery<Course[]>({ 
    queryKey: ["/api/courses"] 
  });

  if (loadingEnrollments) return (
    <MainLayout>
      <div className="flex justify-center p-24"><Loader2 className="animate-spin h-12 w-12 text-primary" /></div>
    </MainLayout>
  );

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