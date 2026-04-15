import React from "react";
import { motion } from "framer-motion";
import { ReviewCard } from "./ReviewCard";

const reviews = [
  {
    name: "Joelle",
    handle: "@joelledesigner",
    platform: "instagram" as const,
    avatar: "https://i.pravatar.cc/150?u=joelle",
    content: "Uizard isn't your average AI tool that overpromises and under delivers - it has actually useful features that are designed to speed up your design process.",
    verified: false,
  },
  {
    name: "Carl",
    handle: "@carlvellotti",
    platform: "twitter" as const,
    avatar: "https://i.pravatar.cc/150?u=carl",
    content: "I'm so freaking impressed with Uizard.",
    verified: true,
  },
  {
    name: "Janus Tiu",
    handle: "@janustiu",
    platform: "instagram" as const,
    avatar: "https://i.pravatar.cc/150?u=janus",
    content: "Tried out this AI-powered UI design assistant tool today. It has a couple of amazing features including turning screenshots to wireframes, converting sketches into mock-ups and my favourite - an AI text writer 👾",
    verified: true,
  },
  {
    name: "Kyle",
    handle: "@kanekallaway",
    platform: "instagram" as const,
    avatar: "https://i.pravatar.cc/150?u=kyle",
    content: "One of my favourite design platforms is called Uizard. Autodesigner is only 1 of 9 AI tools on the platform. And the AI tools are actually useful for designers fostering better collaboration in the product team.",
    verified: false,
  },
  {
    name: "Alex Rivera",
    handle: "@arivera_dev",
    platform: "linkedin" as const,
    avatar: "https://i.pravatar.cc/150?u=alex",
    content: "Finally, an AI tool that actually understands the nuances of UI/UX. It's been a game changer for my development process.",
    verified: true,
  },
  {
    name: "Sarah Miller",
    handle: "@sarahm_design",
    platform: "twitter" as const,
    avatar: "https://i.pravatar.cc/150?u=sarah",
    content: "The workflow efficiency gained with this tool is incredible. Highly recommend for any fast-paced design team.",
    verified: false,
  },
  {
    name: "Mia Zhang",
    handle: "@miazhang_ai",
    platform: "twitter" as const,
    avatar: "https://i.pravatar.cc/150?u=mia",
    content: "The AI text writer is surprisingly good. It saves me so much time when drafting initial copy for my designs.",
    verified: true,
  },
  {
    name: "David Chen",
    handle: "@dchen_tech",
    platform: "linkedin" as const,
    avatar: "https://i.pravatar.cc/150?u=david",
    content: "Build prototypes in minutes. This tool has significantly reduced our time-to-market for new features.",
    verified: true,
  },
];

const ReviewColumn = ({ items, duration = 40, reverse = false }: { items: typeof reviews, duration?: number, reverse?: boolean }) => {
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
        {[...items, ...items].map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </motion.div>
    </div>
  );
};

export const Reviews = () => {
  const column1 = reviews.slice(0, 3);
  const column2 = reviews.slice(3, 5);
  const column3 = reviews.slice(5, 8);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6 tracking-tight">
            What our customers say about us
          </h2>
        </div>

        <div className="relative h-[600px] overflow-hidden">
          {/* Blur/Fade effect at top and bottom */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
            <ReviewColumn items={column1} duration={35} />
            <ReviewColumn items={column2} duration={45} />
            <ReviewColumn items={column3} duration={40} />
          </div>
        </div>
      </div>
    </section>
  );
};
