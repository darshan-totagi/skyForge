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

  return (
    <MainLayout>
      <section className="w-full px-4 md:px-8 py-24 min-h-[90vh] flex flex-col items-center">
        <div className="w-full max-w-6xl text-center space-y-12">
          {/* Header Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
            >
              <ShieldCheck className="h-4 w-4" />
              Official Verification Portal
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight text-white">
              Verify Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary animate-gradient">Achievement</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Confirm the authenticity of SkyForger credentials. Enter a Name or Certificate ID below.
            </p>
          </div>

          {/* Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto"
          >
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex gap-2 p-2 bg-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl">
                <Input
                  placeholder="Student Name or Certificate ID..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent border-none focus-visible:ring-0 text-lg py-7 px-4 placeholder:text-muted-foreground/50"
                />
                <Button type="submit" size="lg" className="px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                  <span className="ml-2 hidden sm:inline">Verify</span>
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Result Section */}
          <AnimatePresence mode="wait">
            {certificate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="mt-16 w-full flex justify-center"
              >
                <Card className="bg-[#fdfdfa] text-slate-800 overflow-hidden relative shadow-2xl shadow-primary/20 w-full max-w-6xl border-4 border-white/50">
                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <img 
                      src="/logo.png" 
                      alt="Watermark" 
                      className="w-1/3 h-1/3 object-contain opacity-5"
                    />
                  </div>

                  {/* Borders */}
                  <div className="relative p-4 border-8 border-amber-100">
                    <div className="border-2 border-amber-300 p-8">
                      <div className="relative text-center">
                        {/* Certificate ID Top Right */}
                        <div className="absolute top-0 right-0 text-right">
                            <p className="text-sm text-slate-500 font-semibold uppercase tracking-widest">Certificate ID</p>
                            <p className="font-mono text-primary font-extrabold text-2xl mt-1 tracking-tighter">{certificate.certificateId}</p>
                        </div>

                        {/* Header */}
                        <div className="flex justify-center items-center gap-4 mb-4">
                          <img src="/logo.png" alt="SkyForger Logo" className="h-14 w-14" />
                          <h2 className="text-4xl font-bold font-display text-slate-900">SkyForger</h2>
                        </div>
                        <p className="text-primary font-semibold tracking-[0.3em] text-sm uppercase mb-12">Internship Verification Result</p>

                        {/* Body */}
                        <p className="text-xl text-slate-500">Official record confirms that</p>
                        <h1 className="text-6xl font-bold text-primary my-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                          {certificate.studentName}
                        </h1>
                        <p className="text-xl text-slate-500">is a verified intern who completed the</p>
                        <p className="text-3xl font-bold text-slate-800 mt-2">{certificate.domain}</p>
                        <p className="text-xl text-slate-500">at SkyForger Internship Program</p>
                      </div>

                      {/* Footer with Seal, Date, Signature */}
                      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 items-end gap-8 text-center">
                        {/* Signature */}
                        <div className="flex flex-col items-center">
                          <p className="text-3xl" style={{ fontFamily: '"Dancing Script", cursive' }}>Darshan T</p>
                          <div className="border-t-2 border-slate-400 w-4/5 mt-1"></div>
                          <p className="text-xs font-bold uppercase mt-2">Founder, SkyForger</p>
                        </div>

                        {/* Seal */}
                        <div className="flex justify-center order-first md:order-none">
                          {/* THE SEAL */}
                          <div className="relative flex flex-col items-center">
                            <motion.div 
                              initial={{ scale: 0, rotate: -20 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="w-32 h-32 relative"
                            >
                              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                                <defs>
                                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                </defs>
                                <text className="text-[10px] font-bold fill-amber-500/80 uppercase tracking-[0.2em]">
                                  <textPath href="#circlePath">
                                    Verified • SkyForger • Authentic • Excellence •
                                  </textPath>
                                </text>
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 border-4 border-double border-amber-400/50 flex items-center justify-center shadow-inner shadow-amber-900/10">
                                  <CheckCircle2 className="h-10 w-10 text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.4)]" />
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>

                        {/* Date & ID */}
                        <div className="flex flex-col items-center">
                          <p className="text-lg font-bold text-slate-700">
                            {new Date(certificate.issueDate!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                          <div className="border-t-2 border-slate-400 w-4/5 mt-1"></div>
                          <p className="text-xs font-bold uppercase mt-2">Verification Date</p>
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
                <div className="max-w-md mx-auto p-8 bg-destructive/5 border border-destructive/20 rounded-2xl flex flex-col items-center gap-4 text-destructive">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold">Verification Failed</p>
                    <p className="text-muted-foreground">No certificate record matches "{searchQuery}"</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </MainLayout>
  );
}
