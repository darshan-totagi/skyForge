import React from "react";
import { motion } from "framer-motion";

export const TechGrid = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 opacity-[0.1]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
        }}
      />
      
      {/* Moving highlights */}
      <motion.div
        animate={{
          x: ["-20%", "20%"],
          y: ["-20%", "20%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute w-[150%] h-[150%] opacity-[0.03] z-0"
        style={{
          background: "radial-gradient(circle at center, var(--primary) 0%, transparent 50%)",
          filter: "blur(120px)",
        }}
      />
    </div>
  );
};
