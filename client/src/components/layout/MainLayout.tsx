import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background relative selection:bg-primary/30 selection:text-primary-foreground">
      <div className="noise fixed inset-0 z-[9998] pointer-events-none" />
      
      {/* Global Ambient Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center overflow-hidden">
        <div className="w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] mix-blend-screen transform -translate-y-1/2" />
      </div>
      
      <Navbar />
      
      <motion.main 
        className="flex-1 relative z-10 pt-24"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  );
}
