import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white relative selection:bg-blue-100 selection:text-blue-900">
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