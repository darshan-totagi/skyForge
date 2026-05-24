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
      <div className="min-h-screen relative overflow-hidden bg-[#020617] pt-32 pb-24">
        {/* Advanced Animative Background - Matching Design System */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 z-[1] opacity-[0.15] pointer-events-none noise" />
          
          <motion.div
            animate={{
              x: ["-25%", "25%", "-25%"],
              y: ["-15%", "15%", "-15%"],
              scale: [1, 1.3, 1],
              rotate: [12, 18, 12],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-20%] w-[150%] h-[100%] energy-wave opacity-60 mix-blend-screen bg-primary/40 blur-[100px]"
          />
          <motion.div
            animate={{
              x: ["25%", "-25%", "25%"],
              y: ["15%", "-15%", "15%"],
              scale: [1.2, 1, 1.2],
              rotate: [-6, -15, -6],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-20%] right-[-20%] w-[150%] h-[90%] energy-wave opacity-50 mix-blend-screen bg-secondary/40 blur-[100px]"
          />

          <div 
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{ 
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Official Verification Portal
            </motion.div>
            
            <motion.h1 
              className="text-[10vw] md:text-[7vw] lg:text-[6vw] font-display font-extrabold mb-8 leading-[0.9] tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              Verify Your <br />
              <span className="text-foreground/90">Achievement</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Confirm the authenticity of SkyForger credentials instantly through our secure blockchain-style verification system.
            </motion.p>
          </div>

          {/* Search Box - Redesigned */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mb-24"
          >
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-none blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative flex flex-col sm:flex-row gap-0 bg-black/40 backdrop-blur-3xl border border-white/5 p-2">
                <div className="flex-grow flex items-center px-4">
                  <Search className="w-5 h-5 text-muted-foreground/40 mr-3" />
                  <Input
                    placeholder="Enter Student Name or Certificate ID..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-transparent border-none focus-visible:ring-0 text-lg h-16 px-0 placeholder:text-muted-foreground/30 font-medium"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="h-16 px-10 rounded-none bg-primary text-black hover:bg-white transition-all font-bold text-sm tracking-[0.2em] uppercase disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify Now"}
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
      </div>
    </MainLayout>
  );
}
