"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Sparkles, BrainCircuit, CheckCircle2, Trophy } from "lucide-react"
import { KnowledgeGraph3D } from "./knowledge-graph-3d"

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  
  // Track scroll progress for the sticky line
  const { scrollYProgress: lineScrollXY } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  })

  const lineScale = useTransform(lineScrollXY, [0, 1], [0, 1])

  const steps = [
    {
       num: "INITIATE",
       title: "Generate a Course",
       desc: "Give Axion a topic, a goal, or a PDF. The living knowledge engine instantly maps a personalized, hyper-optimized syllabus.",
       icon: Sparkles
    },
    {
       num: "SYNC",
       title: "Learn with your AI Tutor",
       desc: "Chat with a vocal, intelligent AI companion that guides you. Say goodbye to static videos—this is active, dynamic combat.",
       icon: BrainCircuit
    },
    {
       num: "EVOLVE",
       title: "Survive The Arena",
       desc: "Face highly contextual, auto-generated assessments that target your weakest nodes. The difficulty scales inversely to your mastery.",
       icon: CheckCircle2
    },
    {
       num: "CONQUER",
       title: "Claim Neural Dominance",
       desc: "Secure top marks, rank up your XP multipliers, and dominate the unified multiplayer leaderboard against rival learners.",
       icon: Trophy
    }
  ]

  return (
    <section id="methodology" className="py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Visual Depth Gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-background to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent z-10" />

      <div className="container mx-auto px-4 max-w-6xl relative z-20">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-24 space-y-4"
        >
          <h2 className="text-5xl md:text-6xl font-black tracking-tight italic uppercase">The Neural Sequence</h2>
          <p className="text-xl text-electric-blue font-bold tracking-[0.2em] uppercase">How the Living Engine accelerates your mind.</p>
        </motion.div>

        <div className="relative">
          {/* Animated timeline background */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1.5 bg-muted/50 md:-translate-x-1/2 rounded-full hidden sm:block" />
          
          {/* Animated timeline fill */}
          <motion.div 
             className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1.5 bg-linear-to-b from-blue-500 via-purple-500 to-pink-500 md:-translate-x-1/2 rounded-full origin-top hidden sm:block shadow-[0_0_15px_rgba(168,85,247,0.5)]"
             style={{ scaleY: lineScale }}
          />

          <div className="space-y-24 md:space-y-40 relative z-30">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isEven = idx % 2 === 0
              return (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-10%" }}
                   transition={{ duration: 0.7, type: "spring", stiffness: 70 }}
                   className={`flex flex-col sm:flex-row items-center justify-between gap-8 md:gap-24 ${!isEven ? 'md:flex-row-reverse' : ''}`}
                >
                   {/* Text Content */}
                   <div className={`sm:w-1/2 flex flex-col ${isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'}`}>
                      <div className="text-sm font-black text-primary uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(var(--color-primary),0.2)] bg-primary/10 border border-primary/30 px-4 py-1.5 rounded-full w-fit">
                        {step.num}
                      </div>
                      <h3 className="text-4xl font-black tracking-tight mb-4">{step.title}</h3>
                      <p className="text-muted-foreground font-medium leading-relaxed max-w-sm text-pretty text-lg">{step.desc}</p>
                   </div>

                   {/* Center Node */}
                   <div className="hidden sm:flex relative items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-primary text-primary shadow-[0_0_30px_rgba(var(--color-primary),0.4)] z-40 mx-auto shrink-0 group hover:scale-125 transition-transform duration-300">
                      <Icon className="w-6 h-6 absolute" />
                   </div>

                   {/* Visual UX Mockup Card */}
                   <div className="sm:w-1/2 w-full">
                      <motion.div 
                        whileHover={{ scale: 1.02, rotateY: isEven ? -5 : 5 }} 
                        className={`aspect-4/3 w-full rounded-3xl bg-linear-to-br from-card to-background border border-border/50 shadow-2xl flex items-center justify-center overflow-hidden relative p-8 ${isEven ? 'md:rounded-tr-[4rem] md:rounded-bl-[4rem]' : 'md:rounded-tl-[4rem] md:rounded-br-[4rem]'}`}
                      >
                         {/* Fake "Glass" UI elements inside the card */}
                         <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
                         
                         <div className="w-full h-full bg-background/50 backdrop-blur-xl rounded-2xl border border-border/40 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
                             {/* 3D Knowledge Graph Integration */}
                             <div className="absolute inset-0 z-0 opacity-60">
                                <KnowledgeGraph3D />
                             </div>
                             
                             <div className="relative z-10 flex flex-col items-center gap-4 text-center p-6">
                                <div className="w-12 h-12 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center text-electric-blue mb-2">
                                   <Icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                   <div className="text-[10px] font-black text-electric-blue uppercase tracking-[0.3em]">Neural Sync active</div>
                                   <div className="text-xs font-bold text-muted-foreground leading-tight">Optimizing context weights...</div>
                                </div>
                             </div>

                             {/* Decorative scan line */}
                             <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-electric-blue/40 to-transparent animate-scan" />
                         </div>
                      </motion.div>
                   </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
