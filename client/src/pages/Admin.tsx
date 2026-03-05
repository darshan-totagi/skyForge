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
import { Loader2, Plus, Trash2, LayoutDashboard, Megaphone, Users, Mail } from "lucide-react";
import type { Ad, InternshipApplication, ContactMessage } from "@shared/schema";
import { Navbar } from "@/components/layout/Navbar";

export default function AdminPage() {
  const { toast } = useToast();
  const [newAd, setNewAd] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    isActive: true
  });

  const { data: ads, isLoading: adsLoading } = useQuery<Ad[]>({
    queryKey: [api.ads.list.path]
  });

  const { data: applications, isLoading: appsLoading } = useQuery<InternshipApplication[]>({
    queryKey: [api.applications.list.path]
  });

  const { data: messages, isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: [api.contact.list.path]
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

  if (adsLoading || appsLoading || messagesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold font-display">Admin Dashboard</h1>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="bg-card border border-primary/20 p-1">
            <TabsTrigger value="applications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="h-4 w-4 mr-2" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Mail className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="ads" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Megaphone className="h-4 w-4 mr-2" />
              Manage Ads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <div className="grid gap-4">
              {applications?.map((app) => (
                <Card key={app.id} className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-primary">{app.fullName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{app.email} | {app.phone}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/20">
                        {app.domain}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="font-semibold">University</p>
                        <p>{app.college}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Year</p>
                        <p>{app.yearOfStudy}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Statement of Interest</p>
                      <p className="text-muted-foreground text-sm italic">"{app.statement}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages">
             <div className="grid gap-4">
              {messages?.map((msg) => (
                <Card key={msg.id} className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{msg.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{msg.message}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ads" className="space-y-8">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Create New Ad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Summer Sale" 
                      value={newAd.title} 
                      onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input 
                      id="imageUrl" 
                      placeholder="https://images.unsplash.com/..." 
                      value={newAd.imageUrl}
                      onChange={(e) => setNewAd({...newAd, imageUrl: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Get 50% off on all courses..." 
                    value={newAd.description}
                    onChange={(e) => setNewAd({...newAd, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkUrl">Destination Link</Label>
                  <Input 
                    id="linkUrl" 
                    placeholder="https://skyforge.com/sale" 
                    value={newAd.linkUrl}
                    onChange={(e) => setNewAd({...newAd, linkUrl: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="active" 
                    checked={newAd.isActive} 
                    onCheckedChange={(checked) => setNewAd({...newAd, isActive: checked})}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
                <Button 
                  className="w-full" 
                  disabled={createAdMutation.isPending}
                  onClick={() => createAdMutation.mutate(newAd)}
                >
                  {createAdMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
                  Create Ad
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads?.map((ad) => (
                <Card key={ad.id} className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
                  <div className="aspect-video relative">
                    <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2"
                      onClick={() => deleteAdMutation.mutate(ad.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg text-primary">{ad.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{ad.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={ad.isActive} 
                          onCheckedChange={(checked) => toggleAdMutation.mutate({ id: ad.id, isActive: checked })} 
                        />
                        <Label className="text-xs">Active</Label>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{new Date(ad.createdAt!).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
