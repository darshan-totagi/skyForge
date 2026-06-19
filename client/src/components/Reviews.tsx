import React from "react";
import { motion } from "framer-motion";
import { ReviewCard } from "./ReviewCard";
import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Review } from "@shared/schema";
import { Loader2 } from "lucide-react";

const ReviewColumn = ({ items, duration = 40, reverse = false }: { items: Review[], duration?: number, reverse?: boolean }) => {
  if (items.length === 0) return null;
  
  const displayItems = items.length < 4 ? [...items, ...items, ...items, ...items] : [...items, ...items];

  return (
    <div className="flex flex-col gap-6 relative overflow-hidden h-[600px]">
      <motion.div
        animate={{
          y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex flex-col gap-6"
      >
        {displayItems.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
};

export const Reviews = () => {
  const { data: reviews, isLoading, isError, error } = useQuery<Review[]>({
    queryKey: [api.reviews.list.path],
  });

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary opacity-50" />
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary/40">Loading Testimonials...</p>
      </div>
    );
  }

  if (isError) {
    console.error("Reviews fetch error:", error);
    return null;
  }

  const placeholderReviews: Review[] = [
    {
      id: 1,
      name: "Shankargouda Patil",
      role: "Full Stack Intern",
      content: "I had a great learning experience at SkyForger Technologies working on a MERN stack project. It improved my practical web development skills and gave me valuable real-world exposure.",
      rating: 5,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "Anjali Kodoli",
      role: "Full Stack Intern",
      content: "This internship strengthened my development skills and gave me confidence in solving real-world problems.",
      rating: 5,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      name: "Soniya Patil",
      role: "Full Stack Intern",
      content: "It helped me understand real-world software development, teamwork, task management, and meeting deadlines effectively.",
      rating: 5,
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      name: "Sheetal DP",
      role: "Full Stack Intern",
      content: "The hands-on projects and mentorship helped me build a strong portfolio and improve my problem-solving skills.",
      rating: 5,
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      name: "Sheetal Kulkarni",
      role: "AI Intern",
      content: "Great learning experience with real projects and excellent mentor support throughout the program.",
      rating: 5,
      createdAt: new Date().toISOString()
    }
  ];

  const userReviews = reviews || [];
  const sortedUserReviews = [...userReviews].sort((a, b) => 
    new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
  
  const displayReviews = [...sortedUserReviews, ...placeholderReviews];

  const col1: Review[] = [];
  const col2: Review[] = [];
  const col3: Review[] = [];

  displayReviews.forEach((review, i) => {
    if (i % 3 === 0) col1.push(review);
    else if (i % 3 === 1) col2.push(review);
    else col3.push(review);
  });

  if (displayReviews.length > 0) {
    if (col2.length === 0) col2.push(...col1);
    if (col3.length === 0) col3.push(...col1);
  }

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="w-1.5 h-1.5 bg-slate-900" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-700">Testimonials</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-display font-extrabold tracking-tighter text-slate-900 mb-6">
            Student Success Stories
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Join hundreds of students who have launched their tech careers through our specialized internship programs.
          </p>
        </div>

        <div className="relative h-[600px] overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
            <ReviewColumn items={col1} duration={30} />
            <ReviewColumn items={col2} duration={40} reverse />
            <ReviewColumn items={col3} duration={35} />
          </div>
        </div>
      </div>
    </section>
  );
};
