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
    <Card className="w-full flex-shrink-0 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-slate-300">
              <AvatarImage src={review.imageUrl || ""} alt={review.name} />
              <AvatarFallback><User className="w-5 h-5 text-slate-600" /></AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <p className="font-semibold text-slate-900">{review.name}</p>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <p className="text-xs text-slate-600 uppercase tracking-wider font-bold">{review.role}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {review.linkedinUrl && (
              <a 
                href={review.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-900 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-[10px] ${i < (review.rating || 5) ? "text-yellow-500" : "text-slate-300"}`}>★</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-slate-700 leading-relaxed text-[0.95rem] italic">"{review.content}"</p>
      </CardContent>
    </Card>
  );
};
