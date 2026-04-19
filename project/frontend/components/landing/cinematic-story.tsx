"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Brain, Zap, Shield, Rocket } from "lucide-react"
import { NeuralOrb } from "@/components/ui/neural-orb"

interface NarrativeBlockProps {
  title: string
  subtitle: string
  content: string
  index: number
  total: number
}

function NarrativeBlock({ title, subtitle, content, index, total }: NarrativeBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [100, 0, 0, -100])

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, scale, y }}
      className="min-h-screen flex flex-col items-center justify-center text-center p-8 sticky top-0"
    >
      <div className="max-w-4xl space-y-6">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue font-black uppercase text-[10px] tracking-widest shadow-[0_0_30px_rgba(0,186,255,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{subtitle}</span>
        </motion.div>
        
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight italic">
          {title.split(' ').map((word, i) => (
            <span key={i} className={i % 2 === 0 ? "text-white" : "text-electric-blue"}>
              {word}{' '}
            </span>
          ))}
        </h2>
        
        <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed text-pretty">
          {content}
        </p>

        {index === total - 1 && (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="pt-12"
           >
             <Button asChild size="lg" className="h-16 px-12 text-xl font-black rounded-3xl bg-white text-black hover:bg-white/90 shadow-[0_0_50px_rgba(255,255,255,0.2)] group transition-all">
                <Link href="/signup">
                  EVOLVE NOW <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
             </Button>
           </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export function CinematicStory() {
  const story = [
    {
      title: "Learning is broken.",
      subtitle: "The Old Guard",
      content: "Static textbooks, generalized lectures, and one-size-fits-all assessments. The traditional engine is sputtering in the age of high-frequency data."
    },
    {
      title: "AI changes everything.",
      subtitle: "The Catalyst",
      content: "A neural pivot. Axion transforms raw information into a living, breathing semantic network that adapts to your unique cognitive signature."
    },
    {
      title: "Meet Axion Intelligence.",
      subtitle: "The System",
      content: "A premium, startup-grade ecosystem where learning feels like exploration. Gamified mastery, interactive 3D, and zero-hallucination grounded AI."
    },
    {
      title: "Your AI Tutor.",
      subtitle: "The Companion",
      content: "Not a chatbot, but a strategist. Available 24/7 to breakdown complexity, generate perfect assessment loops, and scale your potential."
    },
    {
      title: "Your learning evolution.",
      subtitle: "The Future",
      content: "Unlock Mastery Badges, claim the Leaderboard, and build a world-class skill tree. The wait is over. The new standard is here."
    }
  ]

  return (
    <div className="relative z-10">
      {/* Persistent Story Avatar */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
         <NeuralOrb size={2} className="w-[800px] h-[800px]" />
      </div>

      {story.map((block, idx) => (
        <NarrativeBlock 
          key={idx} 
          {...block} 
          index={idx} 
          total={story.length} 
        />
      ))}
    </div>
  )
}
