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
                <Card className="bg-[#fdfdfa] text-slate-800 overflow-hidden relative shadow-2xl shadow-primary/20 w-full max-w-6xl border-0">
                  {/* Background Texture/Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}></div>
                  
                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                    <img 
                      src="/logo.png" 
                      alt="Watermark" 
                      className="w-1/2 h-1/2 object-contain opacity-[0.02] -rotate-12"
                    />
                  </div>

                  {/* Outer Border */}
                  <div className="relative p-6 border-[12px] border-[#e2d1a7]">
                    {/* Inner Border */}
                    <div className="border-[1px] border-[#c5a059] p-1">
                      <div className="border-[4px] border-double border-[#c5a059] p-10 relative">
                        {/* Corner Ornaments */}
                        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-[#c5a059]"></div>
                        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-[#c5a059]"></div>
                        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-[#c5a059]"></div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-[#c5a059]"></div>

                        <div className="relative text-center">
                          {/* Certificate ID Top Right */}
                          <div className="absolute top-0 right-0 text-right">
                              <p className="text-[10px] text-[#c5a059] font-bold uppercase tracking-[0.2em] mb-1">Verification ID</p>
                              <p className="font-mono text-slate-800 font-bold text-lg border-b border-[#c5a059]/30 pb-1">{certificate.certificateId}</p>
                          </div>

                          {/* Header */}
                          <div className="flex flex-col items-center mb-8">
                            <img src="/logo.png" alt="SkyForger Logo" className="h-20 w-20 mb-4 drop-shadow-sm" />
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 uppercase" style={{ fontFamily: 'Oxanium, sans-serif' }}>SkyForger</h2>
                            <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#c5a059] to-transparent my-4"></div>
                            <p className="text-[#c5a059] font-bold tracking-[0.4em] text-xs uppercase">Certificate of Excellence</p>
                          </div>

                          {/* Body */}
                          <div className="space-y-8 my-16">
                            <p className="text-xl italic text-slate-500 font-serif">This official record hereby confirms that</p>
                            
                            <div className="relative py-4">
                              <h1 className="text-7xl font-bold text-slate-900" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                                {certificate.studentName}
                              </h1>
                              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent"></div>
                            </div>

                            <p className="text-xl text-slate-500 font-serif italic">has successfully demonstrated proficiency and completed the</p>
                            
                            <div className="py-2">
                              <p className="text-4xl font-bold text-slate-800 tracking-tight uppercase" style={{ fontFamily: 'Oxanium, sans-serif' }}>
                                {certificate.domain}
                              </p>
                              <p className="text-sm font-bold text-[#c5a059] mt-2 tracking-[0.2em] uppercase">Professional Internship Program</p>
                            </div>
                          </div>
                        </div>

                        {/* Footer with Seal, Date, Signature */}
                        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 items-end gap-12 text-center">
                          {/* Signature */}
                          <div className="flex flex-col items-center">
                            <div className="h-16 flex items-end justify-center mb-2">
                              <p className="text-4xl text-slate-800 opacity-90" style={{ fontFamily: '"Dancing Script", cursive' }}>Darshan T</p>
                            </div>
                            <div className="w-full h-[1px] bg-slate-300"></div>
                            <p className="text-[10px] font-bold uppercase mt-3 tracking-widest text-slate-500">Authorized Signatory</p>
                            <p className="text-[9px] font-bold uppercase text-[#c5a059]">Founder, SkyForger</p>
                          </div>

                          {/* Seal */}
                          <div className="flex justify-center order-first md:order-none -mb-4">
                            <div className="relative flex flex-col items-center group">
                              <motion.div 
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="w-40 h-40 relative"
                              >
                                {/* Outer Spinning Ring */}
                                <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow opacity-80 group-hover:opacity-100 transition-opacity">
                                  <defs>
                                    <path id="sealPath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                                  </defs>
                                  <text className="text-[7.5px] font-bold fill-[#c5a059] uppercase tracking-[0.25em]">
                                    <textPath href="#sealPath">
                                      OFFICIAL VERIFIED • SKYFORGER ACADEMY • EXCELLENCE • AUTHENTIC •
                                    </textPath>
                                  </text>
                                </svg>
                                
                                {/* Inner Wax Seal Look */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#f2e2ba] via-[#c5a059] to-[#8a6d3b] p-1 shadow-xl shadow-amber-900/20">
                                    <div className="w-full h-full rounded-full bg-[#fdfdfa] flex items-center justify-center border-2 border-[#c5a059]/30 relative overflow-hidden">
                                      {/* Seal Pattern */}
                                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c5a059 0px, #c5a059 1px, transparent 1px, transparent 10px)' }}></div>
                                      <CheckCircle2 className="h-12 w-12 text-[#c5a059] relative z-10 drop-shadow-sm" />
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </div>

                          {/* Date */}
                          <div className="flex flex-col items-center">
                            <div className="h-16 flex items-end justify-center mb-2">
                              <p className="text-lg font-bold text-slate-800 font-serif">
                                {new Date(certificate.issueDate!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                            <div className="w-full h-[1px] bg-slate-300"></div>
                            <p className="text-[10px] font-bold uppercase mt-3 tracking-widest text-slate-500">Date of Issue</p>
                            <p className="text-[9px] font-bold uppercase text-[#c5a059]">Karnataka, India</p>
                          </div>
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
