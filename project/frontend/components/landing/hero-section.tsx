"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, PlayCircle, Sparkles, Brain, Code, Zap } from "lucide-react"
import { HeroModel } from "./hero-model"
import { NeuralOrb } from "@/components/ui/neural-orb"
import { useRef } from "react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0])

  const floatVariants: any = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  }

  return (
    <section ref={containerRef} className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-background pt-20">
      
      {/* 3D Interactive Neural Network Background */}
      <HeroModel />

      {/* Floating Neural Orb AI Core - Scroll Reactive */}
      <motion.div 
        style={{ scale: orbScale, opacity: orbOpacity }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
         <NeuralOrb size={1.8} className="w-[800px] h-[800px]" interactive={false} />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 max-w-5xl text-center">
        
        {/* Floating Decals for Gamified Feel */}
        <motion.div variants={floatVariants} animate="animate" className="hidden lg:flex absolute -left-12 top-10 flex-col items-center gap-2 p-3 rounded-2xl bg-background/50 backdrop-blur-md border border-border/50 shadow-2xl">
          <Brain className="w-6 h-6 text-purple-500" />
          <span className="text-[10px] font-bold uppercase">AI Tutor</span>
        </motion.div>
        
        <motion.div variants={floatVariants} animate="animate" style={{ animationDelay: "1s" }} className="hidden lg:flex absolute -right-4 top-32 flex-col items-center gap-2 p-3 rounded-2xl bg-background/50 backdrop-blur-md border border-border/50 shadow-2xl">
          <Code className="w-6 h-6 text-blue-500" />
          <span className="text-[10px] font-bold uppercase">Interactive</span>
        </motion.div>

        <motion.div variants={floatVariants} animate="animate" style={{ animationDelay: "0.5s" }} className="hidden lg:flex absolute left-10 bottom-10 flex-col items-center gap-2 p-3 rounded-2xl bg-background/50 backdrop-blur-md border border-border/50 shadow-2xl">
          <Zap className="w-6 h-6 text-amber-500" />
          <span className="text-[10px] font-bold uppercase">XP & Streaks</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Glowing Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue mb-8 tracking-wide font-black uppercase text-xs shadow-[0_0_20px_rgba(0,186,255,0.2)] relative">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>The Living Knowledge Engine</span>
            <div className="absolute inset-0 bg-primary/20 blur-xl -z-10 rounded-full animate-pulse" />
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 text-balance leading-[1.1]">
            Stop studying. <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-electric-blue via-purple-500 to-electric-blue animate-gradient-x italic pr-8">
              Start evolving.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed text-pretty font-medium">
            Experience a living knowledge engine that generates custom courses in seconds, adapts to your skill level, and rewards your master alongside a vocal AI tutor.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button size="lg" asChild className="h-14 px-8 text-lg font-black bg-electric-blue text-black hover:bg-white shadow-[0_0_40px_-10px_rgba(0,186,255,0.5)] transition-all w-full rounded-2xl uppercase tracking-widest">
                <Link href="/dashboard">
                  Start Evolving Free <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg font-bold border-border/50 bg-background/50 backdrop-blur-xl hover:bg-muted w-full transition-all rounded-2xl">
                <Link href="#demo">
                  <PlayCircle className="mr-2 w-5 h-5 opacity-70" /> Watch Trailer
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Social Proof Counters */}
          <div className="mt-16 pt-8 border-t border-border/40 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto opacity-80">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-foreground">10k+</span>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Students</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-foreground">1M+</span>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Questions Answered</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-foreground">GPT-4o</span>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Powered Engine</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-foreground">100%</span>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Personalized</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
