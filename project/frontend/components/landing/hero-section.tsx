"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react"
import { HeroModel } from "./hero-model" // The new Three.js Model

export function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-background pt-20">
      
      {/* Three.js Enhanced Background */}
      <HeroModel />

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 tracking-wide font-black uppercase text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to the New Paradigm</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 text-balance leading-tight">
            Education. <br className="md:hidden" />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-blue-500 to-purple-600">
              Perfected by AI.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed text-pretty font-medium">
            Axion Platform dynamically synthesizes curriculum, generates adaptive assessments, and provides real-time tutoring—making mastery inevitable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="h-14 px-10 text-lg font-black bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/25 hover:scale-105 transition-all w-full sm:w-auto">
              <Link href="/signup">
                Start Learning <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 px-10 text-lg font-bold border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted w-full sm:w-auto hover:scale-105 transition-all">
              <Link href="#demo">
                <PlayCircle className="mr-2 w-5 h-5 opacity-70" /> Watch Demo
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-6 opacity-60 text-xs font-bold uppercase tracking-widest text-muted-foreground">
             <span>Trusted by 10k+ Learners</span>
             <span className="w-1.5 h-1.5 rounded-full bg-border" />
             <span>GPT-4 Powered</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
