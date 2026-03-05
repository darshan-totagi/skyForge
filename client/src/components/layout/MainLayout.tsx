import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background relative selection:bg-primary/30 selection:text-primary-foreground">
      {/* Global Ambient Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center overflow-hidden">
        <div className="w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] mix-blend-screen transform -translate-y-1/2" />
      </div>
      
      <Navbar />
      
      <motion.main 
        className="flex-1 relative z-10 pt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  );
}
