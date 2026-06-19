import React from "react";
import { motion } from "framer-motion";

const techWords = [
  "MERN STACK",
  "WEB DEVELOPMENT",
  "ARTIFICIAL INTELLIGENCE",
  "BACKEND",
  "WEB DEV",
  "DATA SCIENCE",
  "UI/UX DESIGN",
  "MOBILE DEV",
  "MACHINE LEARNING",
  "DEVOPS",
  "CLOUD COMPUTING",
  "CYBER SECURITY"
];

export const TechTicker = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 relative overflow-hidden border-y border-blue-100">
      <div className="container mx-auto px-6 md:px-12 relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-blue-600/70">
            Specializing in the industry's most essential technologies
          </p>
        </motion.div>
      </div>

      <div className="flex overflow-hidden">
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap gap-12 md:gap-24 items-center"
        >
          {[...techWords, ...techWords, ...techWords].map((word, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-slate-800 hover:text-blue-600 transition-all duration-500 cursor-default select-none"
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
      
      {/* Smooth Side Fades */}
      <div className="absolute inset-y-0 left-0 w-40 md:w-64 bg-gradient-to-r from-slate-50 via-slate-50/80 via-slate-50/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 md:w-64 bg-gradient-to-l from-slate-50 via-slate-50/80 via-slate-50/40 to-transparent z-10 pointer-events-none" />
    </div>
  );
};
