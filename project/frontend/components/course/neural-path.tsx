"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PlayCircle, Clock, CheckCircle2, Lock, Zap, Brain, Hexagon, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Module {
  id: string
  title: string
  lessons: { id: string; title: string }[]
}

interface NeuralPathProps {
  modules: Module[]
  courseId: string
  isEnrolled: boolean
}

export function NeuralPathCurriculum({ modules, courseId, isEnrolled }: NeuralPathProps) {
   const [previewModuleId, setPreviewModuleId] = useState<string | null>(null)

   return (
    <div className="relative py-12 px-4 selection:bg-electric-blue/20">
      {/* Central Neural Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-electric-blue/5 via-electric-blue/20 to-violet-glow/5 -translate-x-1/2 pointer-events-none" />
      
      <div className="space-y-32 relative z-10">
        {modules.map((module, idx) => {
          const isEven = idx % 2 === 0
          const isLocked = !isEnrolled && idx > 0
          const isPreviewing = previewModuleId === module.id
          
          return (
            <div key={module.id} className="relative">
              {/* Module Entry Point / Hexagon */}
              <div className="absolute left-1/2 -top-16 -translate-x-1/2 flex flex-col items-center gap-2">
                 <motion.div 
                   whileHover={{ scale: 1.1, rotate: 10 }}
                   className={`w-16 h-16 bg-black border-2 rounded-[20px] shadow-2xl flex items-center justify-center relative group transition-all duration-500 ${isLocked ? 'border-white/10 text-white/20' : 'border-electric-blue/50 text-electric-blue shadow-electric-blue/20'}`}
                 >
                    <div className="absolute inset-0 bg-electric-blue/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Hexagon className="w-8 h-8 relative z-10" />
                    <span className={`absolute -top-3 -right-3 text-[10px] font-black px-2 py-0.5 rounded-md shadow-lg ${isLocked ? 'bg-white/10 text-white/40' : 'bg-electric-blue text-black'}`}>{idx + 1}</span>
                 </motion.div>
                 <div className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isLocked ? 'text-white/20' : 'text-electric-blue/60 group-hover:text-electric-blue'}`}>
                    {isLocked ? 'Neural Lock Active' : 'Phase Synchronized'}
                 </div>
              </div>

              {/* Module Content Card */}
              <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 pt-12`}>
                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'} space-y-4`}>
                   <div className="flex items-center gap-2 justify-center md:justify-start">
                      {isLocked && <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[8px] font-black">PRO EXCLUSIVE</Badge>}
                   </div>
                   <h3 className={`text-3xl font-black tracking-tighter uppercase line-clamp-2 transition-opacity ${isLocked ? 'opacity-40' : 'opacity-100'}`}>{module.title}</h3>
                   <p className={`text-muted-foreground text-sm font-medium leading-relaxed max-w-sm mx-auto md:mx-0 transition-opacity ${isLocked ? 'opacity-30' : 'opacity-100'}`}>
                      {isLocked 
                        ? "Advanced neural architecture. Scale your link to unlock the deep synthesis modules."
                        : "Neural adaptation for this phase involves mastering key cognitive nodes and stabilizing the link."}
                   </p>
                   <div className={`flex flex-wrap items-center gap-4 transition-opacity ${isLocked ? 'opacity-30' : 'opacity-100'} ${isEven ? 'justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                         <PlayCircle className="w-3.5 h-3.5" /> {module.lessons.length} LESSONS
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                         <Zap className="w-3.5 h-3.5 text-amber-500" /> +500 XP
                      </div>
                   </div>
                </div>

                <div className="w-full md:w-1/2">
                   <div className="p-1 rounded-[40px] bg-linear-to-br from-white/10 to-transparent border border-white/5 backdrop-blur-3xl shadow-2xl relative">
                      {isLocked && (
                         <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-[40px]">
                            <motion.button 
                              onClick={() => setPreviewModuleId(isPreviewing ? null : module.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-xl px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl transition-all"
                            >
                               {isPreviewing ? 'HIDE OBJECTIVES' : 'PREVIEW NEURAL OBJECTIVES'}
                            </motion.button>
                         </div>
                      )}

                      <div className={`bg-black/60 rounded-[38px] p-6 space-y-4 overflow-hidden relative transition-all duration-500 ${isLocked ? 'blur-sm grayscale' : ''}`}>
                         <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/5 rounded-full blur-3xl" />
                         
                         {isPreviewing ? (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                               className="min-h-[200px] flex flex-col justify-center gap-4 relative z-30"
                            >
                               <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                                  <Brain className="w-4 h-4" /> Cognitive Targets:
                               </div>
                               <ul className="space-y-3">
                                  {["Neural Weights Calibration", "Vector Context Retrieval", "Cross-Attention Stabilization"].map((obj, i) => (
                                     <li key={i} className="flex items-center gap-3 text-sm font-bold text-foreground/80 text-left">
                                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> {obj}
                                     </li>
                                  ))}
                               </ul>
                               <p className="text-[10px] text-muted-foreground italic font-medium mt-4 text-left">Required for Phase {idx + 1} Mastery.</p>
                            </motion.div>
                         ) : (
                           module.lessons.map((lesson, lIdx) => (
                              <motion.div 
                                key={lesson.id}
                                whileHover={{ x: isEven ? -5 : 5 }}
                                className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-electric-blue/30 transition-all cursor-pointer"
                              >
                                 <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-electric-blue/10 flex items-center justify-center text-electric-blue text-[10px] font-black group-hover:bg-electric-blue group-hover:text-black transition-colors">
                                       {lIdx + 1}
                                    </div>
                                    <span className="text-sm font-bold tracking-tight opacity-70 group-hover:opacity-100">{lesson.title}</span>
                                 </div>
                                 {!isLocked && isEnrolled ? (
                                    <CheckCircle2 className="w-4 h-4 text-white/20 group-hover:text-electric-blue transition-colors" />
                                 ) : (
                                    <Lock className="w-4 h-4 text-white/10" />
                                 )}
                              </motion.div>
                           ))
                         )}
                         
                         <Link 
                           href="/pricing"
                           className={`flex items-center justify-center w-full p-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl mt-4 group relative z-30 ${isLocked ? 'bg-amber-500 text-black hover:bg-white shadow-amber-500/20' : 'bg-electric-blue text-black hover:bg-white shadow-electric-blue/20'}`}
                         >
                            {isLocked ? 'SCALE NEURAL LINK' : isEnrolled ? 'INITIALIZE SYNC' : 'AUTHORIZE LINK'}
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                         </Link>
                      </div>
                   </div>
                </div>
              </div>

              {/* Path Connector Deviation */}
              {idx < modules.length - 1 && (
                 <div className={`hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none`}>
                    <svg width="100%" height="100%" viewBox="0 0 200 130" fill="none" preserveAspectRatio="none">
                       <path 
                         d={isEven ? "M100 0 C100 65, 180 65, 100 130" : "M100 0 C100 65, 20 65, 100 130"} 
                         stroke="currentColor" 
                         strokeWidth="2" 
                         className="text-electric-blue/20"
                         strokeDasharray="8 8"
                       />
                    </svg>
                 </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
