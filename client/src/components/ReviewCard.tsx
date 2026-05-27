import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Instagram, CheckCircle2, User } from "lucide-react";

interface ReviewCardProps {
  review: {
    name: string;
    role: string;
    content: string;
    linkedinUrl?: string | null;
    imageUrl?: string | null;
    rating?: number | null;
  };
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card className="glass-card w-full flex-shrink-0 border-white/[0.08] hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-primary/20">
              <AvatarImage src={review.imageUrl || ""} alt={review.name} />
              <AvatarFallback><User className="w-5 h-5 text-muted-foreground" /></AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <p className="font-semibold text-foreground">{review.name}</p>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{review.role}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {review.linkedinUrl && (
              <a 
                href={review.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground/60 hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-[10px] ${i < (review.rating || 5) ? "text-yellow-500" : "text-muted-foreground/20"}`}>★</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-foreground leading-relaxed text-[0.95rem] opacity-90 italic">"{review.content}"</p>
      </CardContent>
    </Card>
  );
};
