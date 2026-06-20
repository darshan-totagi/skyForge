import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";

export default function CourseList() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-4">
            Courses Coming Soon
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We're working on amazing courses for you! Stay tuned for updates.
          </p>
        </motion.div>
      </div>
    </MainLayout>
  );
}
