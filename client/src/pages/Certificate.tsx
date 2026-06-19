import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle2, AlertCircle, Loader2, Award, ShieldCheck, Calendar, User, BookOpen, Rocket } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Certificate } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";

export default function Certificate() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: certificate, isLoading, isError } = useQuery<Certificate>({
    queryKey: ["/api/certificates/verify", { query: searchQuery }],
    enabled: !!searchQuery,
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/certificates/verify?query=${encodeURIComponent(searchQuery)}`);
      return res.json();
    },
    retry: false
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query.trim());
    }
  };

  const SectionHeading = ({ children, subtitle, badge }: { children: React.ReactNode; subtitle?: string; badge?: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-16"
    >
      {badge && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2 h-2 bg-blue-300 rounded-full" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-300">{badge}</span>
          <div className="w-2 h-2 bg-blue-300 rounded-full" />
        </div>
      )}
      <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-4 leading-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-700 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );

  return (
    <MainLayout>
      <div className="min-h-screen relative bg-gradient-to-b from-slate-50 to-white pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <SectionHeading 
            subtitle="Confirm the authenticity of SkyForger credentials instantly through our secure verification system."
            badge="OFFICIAL VERIFICATION PORTAL"
          >
            Verify Your Achievement
          </SectionHeading>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-2xl mx-auto mb-24"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex flex-col sm:flex-row gap-0 bg-white border border-slate-200 p-2 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex-grow flex items-center px-4">
                  <Search className="w-5 h-5 text-slate-400 mr-3" />
                  <Input
                    placeholder="Enter Student Name or Certificate ID..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-transparent border-none focus-visible:ring-0 text-lg h-16 px-0 placeholder:text-slate-400 font-medium"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-16 px-10 bg-blue-600 hover:bg-blue-700 text-white transition-all font-bold text-sm tracking-[0.2em] uppercase disabled:opacity-50 rounded-none"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify Now"}
                </Button>
              </div>
            </form>
          </motion.div>

          <AnimatePresence mode="wait">
            {certificate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="mt-16 w-full flex justify-center"
              >
                <Card className="bg-white text-slate-800 overflow-hidden relative shadow-xl w-full max-w-6xl border border-slate-200">
                  <div className="relative p-8 md:p-12 bg-gradient-to-br from-blue-50 to-slate-50">
                    <div className="border-2 border-blue-200 p-6 md:p-10 bg-white">
                      <div className="relative text-center">
                        <div className="absolute top-0 right-0 text-right">
                            <p className="text-xs text-blue-600 font-bold uppercase tracking-[0.2em] mb-1">Verification ID</p>
                            <p className="font-mono text-slate-900 font-bold text-lg border-b border-blue-200 pb-1">{certificate.certificateId}</p>
                        </div>

                        <div className="flex flex-col items-center mb-10">
                          <img src="/logo.png" alt="SkyForger Logo" className="h-20 w-20 mb-4" />
                          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">SkyForger</h2>
                          <div className="w-48 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent my-4"></div>
                          <p className="text-blue-600 font-bold tracking-[0.4em] text-xs uppercase">Certificate of Excellence</p>
                        </div>

                        <div className="space-y-8 my-16">
                          <p className="text-lg text-slate-600">This official record hereby confirms that</p>
                          
                          <div className="relative py-4">
                            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 font-display">
                              {certificate.studentName}
                            </h1>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                          </div>

                          <p className="text-lg text-slate-600">has successfully demonstrated proficiency and completed the</p>
                          
                          <div className="py-2">
                            <p className="text-3xl md:text-4xl font-bold text-slate-900 font-display">
                              {certificate.domain}
                            </p>
                            <p className="text-sm font-bold text-blue-600 mt-2 tracking-[0.2em] uppercase">Professional Internship Program</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 items-end gap-8 text-center">
                        <div className="flex flex-col items-center">
                          <div className="h-16 flex items-end justify-center mb-2">
                            <p className="text-2xl md:text-3xl text-slate-800 font-display">Darshan T</p>
                          </div>
                          <div className="w-full h-px bg-slate-300"></div>
                          <p className="text-xs font-bold uppercase mt-3 tracking-widest text-slate-600">Authorized Signatory</p>
                          <p className="text-xs font-bold uppercase text-blue-600">Founder, SkyForger</p>
                        </div>

                        <div className="flex justify-center order-first md:order-none -mb-4">
                          <div className="relative flex flex-col items-center">
                            <motion.div
                              initial={{ scale: 0, rotate: -30 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="w-32 h-32 md:w-40 md:h-40 relative"
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-100 p-1 shadow-lg">
                                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-2 border-blue-300 relative">
                                    <CheckCircle2 className="h-12 w-12 md:h-14 md:w-14 text-blue-600 relative z-10" />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="h-16 flex items-end justify-center mb-2">
                            <p className="text-lg font-bold text-slate-900">
                              {new Date(certificate.issueDate!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                          <div className="w-full h-px bg-slate-300"></div>
                          <p className="text-xs font-bold uppercase mt-3 tracking-widest text-slate-600">Date of Issue</p>
                          <p className="text-xs font-bold uppercase text-blue-600">Karnataka, India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {isError && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12"
              >
                <div className="max-w-md mx-auto p-8 bg-white border border-slate-200 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-xl font-bold text-slate-900">Verification Failed</p>
                    <p className="text-slate-600">No certificate record matches "{searchQuery}"</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
}
