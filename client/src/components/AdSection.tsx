import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { Ad } from "@shared/schema";
import { api } from "@shared/routes";

export function AdSection() {
  const { data: ads, isLoading } = useQuery<Ad[]>({
    queryKey: [api.ads.list.path],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  const activeAds = ads?.filter(ad => ad.isActive) || [];

  if (activeAds.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-4 block">
            Special Announcements
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mb-4">
            Don't Miss Out!
          </h2>
          <p className="text-lg text-slate-600">
            Check out our latest updates and exciting announcements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeAds.map((ad, index) => (
            <motion.a
              key={ad.id}
              href={ad.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group block"
              data-testid={`ad-card-${ad.id}`}
            >
              <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Image container */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                  <motion.img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // Try to see if it's a known static asset that might have moved
                      if (target.src.includes('coming-soon')) {
                        target.src = "/coming-soon.jpg";
                      } else if (target.src.includes('registrations')) {
                        target.src = "/registrations-open.jpg";
                      } else {
                        target.src = "https://placehold.co/600x400/020617/primary?text=Posters+Loading...";
                      }
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">New</span>
                    </motion.div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {ad.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {ad.description}
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-none group-hover:bg-blue-700 transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
