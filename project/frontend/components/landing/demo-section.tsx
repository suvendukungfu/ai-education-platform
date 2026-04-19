"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlayCircle, Play, ArrowRight } from "lucide-react"

export function DemoSection() {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const script = [
    { title: "Learning feels broken...", desc: "Traditional platforms are static and lonely. Axion is alive.", time: 3 },
    { title: "Meet Axion Intelligence", desc: "A world-class AI tutor tailored to your unique learning style.", time: 8 },
    { title: "Learn anything, at your pace", desc: "Curated paths that adapt as you grow.", time: 15 },
    { title: "Your personal AI tutor", desc: "Real-time socratic coaching that builds intuition, not just answers.", time: 22 },
    { title: "Stay motivated, every day", desc: "Gamified progression makes mastery feel like play.", time: 30 },
    { title: "Track your growth", desc: "Deep analytics and milestone celebrations.", time: 40 },
    { title: "Start learning smarter today", desc: "Join 1,000+ early adopters in the AI revolution.", time: 45 },
  ]

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % script.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPlaying, script.length])

  return (
    <section id="demo" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--color-electric-blue),0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-black uppercase tracking-widest"
          >
            <PlayCircle className="w-4 h-4 fill-electric-blue/20" /> Product Experience
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            See the <span className="text-electric-blue">Future</span> of Learning.
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            Watch how Axion transforms the educational journey in real-time.
          </p>
        </div>

        <div className="relative aspect-video max-w-5xl mx-auto group">
          {/* Glassmorphic Player Shell */}
          <div className="absolute inset-0 rounded-4xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
            
            {/* Mocked Video content (The "Story") */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
               <AnimatePresence mode="wait">
                  <motion.div 
                    key={step}
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 1 }}
                    className="text-center p-8 space-y-4"
                  >
                    <h3 className="text-3xl md:text-5xl font-black text-white drop-shadow-2xl">
                       {script[step].title}
                    </h3>
                    <p className="text-lg md:text-xl text-white/70 max-w-lg mx-auto font-medium">
                       {script[step].desc}
                    </p>
                  </motion.div>
               </AnimatePresence>

               {/* Simulated UI Overlay based on Step */}
               <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                       className="h-full bg-electric-blue shadow-[0_0_15px_rgba(var(--color-electric-blue),0.5)]"
                       initial={{ width: "0%" }}
                       animate={{ width: "100%" }}
                       key={step}
                       transition={{ duration: 5, ease: "linear" }}
                     />
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] font-black uppercase tracking-widest text-white/40">
                     <span>Scene {step + 1} / {script.length}</span>
                     <span>Auto-playing Preview</span>
                  </div>
               </div>
            </div>

            {/* Visual Accents */}
            <div className="absolute top-6 left-6 flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500/50" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
               <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>

            <div className="absolute top-6 right-6">
               <div className="px-3 py-1 rounded-lg bg-black/20 border border-white/10 backdrop-blur-sm text-[10px] font-black text-white/60">
                  HD • 60 FPS
               </div>
            </div>
          </div>

          {/* Player Controls (Floating) */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-background/80 backdrop-blur-xl border border-border px-6 py-3 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
             <Button 
               variant="ghost" 
               size="icon" 
               className="rounded-full hover:bg-electric-blue/10 hover:text-electric-blue"
               onClick={() => setIsPlaying(!isPlaying)}
             >
                {isPlaying ? <span className="text-xl">II</span> : <Play className="w-5 h-5 fill-current" />}
             </Button>
             <div className="w-px h-6 bg-border" />
             <div className="text-xs font-black uppercase tracking-tighter text-muted-foreground">
                Axion Engine v1.0 • Demo
             </div>
          </div>
        </div>
        
        {/* Next Step Indicator */}
        <div className="mt-16 text-center">
           <Button variant="link" className="text-muted-foreground hover:text-electric-blue transition-colors font-bold" onClick={() => setStep((step + 1) % script.length)}>
              Skip to next scene <ArrowRight className="ml-2 w-4 h-4" />
           </Button>
        </div>
      </div>
    </section>
  )
}
