import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Instagram, CheckCircle2 } from "lucide-react";

interface ReviewCardProps {
  review: {
    name: string;
    handle: string;
    platform: "linkedin" | "twitter" | "instagram";
    avatar: string;
    content: string;
    verified?: boolean;
  };
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const getPlatformIcon = () => {
    switch (review.platform) {
      case "linkedin": return Linkedin;
      case "twitter": return Twitter;
      case "instagram": return Instagram;
      default: return Twitter;
    }
  };

  const PlatformIcon = getPlatformIcon();

  return (
    <Card className="glass-card w-full flex-shrink-0 border-white/[0.08] hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-primary/20">
              <AvatarImage src={review.avatar} alt={review.name} />
              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <p className="font-semibold text-foreground">{review.name}</p>
                {review.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />}
              </div>
              <p className="text-sm text-muted-foreground">{review.handle}</p>
            </div>
          </div>
          <PlatformIcon className="w-5 h-5 text-muted-foreground/60 hover:text-primary transition-colors" />
        </div>
        <p className="text-foreground leading-relaxed text-[0.95rem] opacity-90">{review.content}</p>
      </CardContent>
    </Card>
  );
};
