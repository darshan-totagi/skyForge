import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Video, BookOpen, Layers, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Course, Module, Lesson } from "@shared/schema";

export default function LMSAdmin() {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({ queryKey: ["/api/courses"] });
  const { data: modules } = useQuery<Module[]>({ queryKey: ["/api/courses", selectedCourse, "modules"], enabled: !!selectedCourse });
  const { data: lessons } = useQuery<Lesson[]>({ queryKey: ["/api/modules", selectedModule, "lessons"], enabled: !!selectedModule });

  if (coursesLoading) return <div className="flex justify-center p-24"><Loader2 className="animate-spin" /></div>;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold font-display">LMS Administration</h1>
          <Button onClick={() => toast({ title: "Coming Soon", description: "Use the API to add courses for now." })}>
            <Plus className="mr-2 h-4 w-4" /> New Course
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="col-span-1">
            <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Courses</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {courses?.map((course) => (
                <Button key={course.id} variant={selectedCourse === course.id ? "default" : "outline"} className="w-full justify-start text-left h-auto py-3" onClick={() => { setSelectedCourse(course.id); setSelectedModule(null); }}>
                  <div><div className="font-semibold">{course.title}</div><div className="text-xs opacity-70">₹{course.price}</div></div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <div className="col-span-2 space-y-8">
            {selectedCourse ? (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="flex items-center gap-2"><Layers className="h-5 w-5 text-primary" /> Modules</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    {modules?.map((mod) => (
                      <Button key={mod.id} variant={selectedModule === mod.id ? "secondary" : "ghost"} className="h-auto py-4 border border-dashed border-primary/20" onClick={() => setSelectedModule(mod.id)}>{mod.title}</Button>
                    ))}
                  </CardContent>
                </Card>
                {selectedModule && (
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Video className="h-5 w-5 text-primary" /> Lessons</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      {lessons?.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-4 bg-card border rounded-lg">
                          <div className="flex items-center gap-3"><Video className="h-4 w-4 text-muted-foreground" /><span className="font-medium">{lesson.title}</span></div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-card/20 rounded-2xl border-2 border-dashed border-primary/10 p-12">
                <BookOpen className="h-12 w-12 mb-4 opacity-20" />
                <p>Select a course to manage its content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}