import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Ad } from "@shared/schema";
import { api } from "@shared/routes";

export function AdSection() {
  const { data: ads, isLoading } = useQuery<Ad[]>({
    queryKey: [api.ads.list.path],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  const activeAds = ads?.filter(ad => ad.isActive) || [];

  if (activeAds.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeAds.map((ad) => (
          <a 
            key={ad.id} 
            href={ad.linkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block group transition-transform hover:-translate-y-1"
            data-testid={`ad-card-${ad.id}`}
          >
            <Card className="overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
              <div className="aspect-video w-full overflow-hidden bg-black/40 flex items-center justify-center relative">
                <img 
                  src={ad.imageUrl} 
                  alt={ad.title} 
                  className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105 z-10"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x400/020617/primary?text=Image+Not+Found";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="text-xs font-mono tracking-tighter">SkyForger Tech</span>
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-primary">{ad.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">{ad.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
