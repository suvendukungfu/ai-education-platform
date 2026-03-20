"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Sparkles, BrainCircuit, CheckCircle2 } from "lucide-react"

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Sticky line progress
  const lineScale = useTransform(scrollYProgress, [0.2, 0.8], [0, 1])

  const steps = [
    {
       num: "01",
       title: "Semantic Ingestion",
       desc: "Upload textbooks, lectures, or PDFs. Our system creates a dynamic semantic space, chunking your files perfectly for retrieval.",
       icon: Sparkles
    },
    {
       num: "02",
       title: "Neuro-Tolerant Chat",
       desc: "Communicate with an AI tutor that implicitly knows the exact context of your uploaded files, free of generalized hallucinations.",
       icon: BrainCircuit
    },
    {
       num: "03",
       title: "Absolute Mastery",
       desc: "Engage with perfectly-timed, auto-generated assessments that target your weakest knowledge vectors.",
       icon: CheckCircle2
    }
  ]

  return (
    <section id="methodology" className="py-32 bg-muted/20 relative" ref={ref}>
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-24 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">The Pedagogy Pipeline</h2>
          <p className="text-xl text-muted-foreground font-medium">How Axion accelerates cognitive capture.</p>
        </motion.div>

        <div className="relative">
          {/* Animated timeline background */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-border/40 md:-translate-x-1/2 rounded-full hidden sm:block" />
          
          {/* Animated timeline fill */}
          <motion.div 
             className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-primary md:-translate-x-1/2 rounded-full origin-top hidden sm:block"
             style={{ scaleY: lineScale }}
          />

          <div className="space-y-16 md:space-y-32 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isEven = idx % 2 === 0
              return (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
                   className={`flex flex-col sm:flex-row items-center justify-between gap-8 md:gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}
                >
                   {/* Content */}
                   <div className={`sm:w-1/2 flex flex-col ${isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'}`}>
                      <div className="text-sm font-black text-primary uppercase tracking-widest mb-2 shadow-sm bg-primary/10 px-3 py-1 rounded-full w-fit">Phase {step.num}</div>
                      <h3 className="text-3xl font-bold tracking-tight mb-4">{step.title}</h3>
                      <p className="text-muted-foreground font-medium leading-relaxed max-w-sm text-pretty">{step.desc}</p>
                   </div>

                   {/* Center Node */}
                   <div className="hidden sm:flex relative items-center justify-center w-14 h-14 rounded-full bg-background border-4 border-primary text-primary shadow-xl shadow-primary/20 z-20 mx-auto shrink-0 group hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 absolute" />
                   </div>

                   {/* Visual Placeholder (Could be an image or graphic in the future) */}
                   <div className="sm:w-1/2 w-full">
                      <div className={`aspect-video w-full rounded-2xl bg-linear-to-br from-muted to-background border border-border/50 shadow-2xl flex items-center justify-center overflow-hidden ${isEven ? 'md:rounded-tr-3xl md:rounded-br-3xl md:rounded-l-2xl' : 'md:rounded-tl-3xl md:rounded-bl-3xl md:rounded-r-2xl'}`}>
                         {/* Subtle placeholder content, can be replaced by real UI screenshots */}
                         <div className="w-3/4 h-3/4 bg-card/50 backdrop-blur rounded-xl border border-border/30 shadow-inner flex items-center justify-center">
                            <Icon className="w-16 h-16 text-muted-foreground/30" />
                         </div>
                      </div>
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
