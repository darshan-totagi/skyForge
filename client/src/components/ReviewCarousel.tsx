import React from "react";
import { motion } from "framer-motion";
import { ReviewCard } from "./ReviewCard";

const reviews = [
  {
    name: "John Vetans",
    handle: "John Vetan",
    platform: "linkedin" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    content: "Yesterday I was part of an exclusive group that got early access to #Autodesigner, Uizard's new AI prototyping tool. Although still in Alpha, the demo was impressive, and the potential is tremendous.",
  },
  {
    name: "Joanna",
    handle: "@joanna_socialnomad",
    platform: "twitter" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joanna",
    content: "With this AI tool you can create a beautiful website and app without costing you thousands of dollars on UX/UI designers. It's called Uizard. [...] All you need is an idea and Uizard will make it happen.",
  },
  {
    name: "Elizabeth",
    handle: "Elizabeth",
    platform: "linkedin" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth",
    content: "I honestly think this is the future of product design. It took me less than 2 minutes to generate this mockup. I can generate 10 completely different ones in 20 minutes.",
  },
  {
    name: "Andre",
    handle: "Andre",
    platform: "linkedin" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andre",
    content: "The workflow integration is seamless. It just changes the game for product teams who want to iterate fast without losing quality.",
  },
  {
    name: "Sarah Chen",
    handle: "@sarah_dev",
    platform: "twitter" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "As a frontend developer, this tool saves me hours of boilerplate work. The UI components are clean and disciplined.",
  },
  {
    name: "Marcus Miller",
    handle: "marcus_m",
    platform: "linkedin" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    content: "Best internship platform I've used. The project-based learning approach is exactly what students need for real-world prep.",
  }
];

export const ReviewCarousel = () => {
  // Split reviews into 3 columns for the effect
  const col1 = [...reviews, ...reviews];
  const col2 = [...reviews.slice().reverse(), ...reviews.slice().reverse()];
  const col3 = [...reviews, ...reviews];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] overflow-hidden relative group">
      {/* Gradient Overlays for smooth fading */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />

      {/* Column 1 */}
      <div className="flex flex-col gap-6">
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-6"
        >
          {col1.map((review, i) => (
            <ReviewCard key={`col1-${i}`} review={review} />
          ))}
        </motion.div>
      </div>

      {/* Column 2 - Moves Reverse */}
      <div className="flex flex-col gap-6">
        <motion.div
          animate={{ y: ["-50%", "0%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-6"
        >
          {col2.map((review, i) => (
            <ReviewCard key={`col2-${i}`} review={review} />
          ))}
        </motion.div>
      </div>

      {/* Column 3 */}
      <div className="hidden md:flex flex-col gap-6">
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-6"
        >
          {col3.map((review, i) => (
            <ReviewCard key={`col3-${i}`} review={review} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
