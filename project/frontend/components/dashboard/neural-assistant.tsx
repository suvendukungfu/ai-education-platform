"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NeuralOrb } from "@/components/ui/neural-orb"
import { Brain, Sparkles, Trophy, Zap, MessageSquare, X } from "lucide-react"

interface NeuralAssistantProps {
  user: {
    name?: string | null
    xp?: number
    level?: number
  }
}

export function NeuralAssistant({ user }: NeuralAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [mood, setMood] = useState<"HAPPY" | "THINKING" | "EXCITED" | "CALM">("CALM")

  useEffect(() => {
    // Neural Greeting Logic
    const greetings = [
      `Initializing neural sync... Welcome back, ${user.name || "Learner"}.`,
      `Optimal learning windows detected. Ready to scale?`,
      `Your cognitive signature is peaking today. Let's mastery something new.`,
      `Neural Link Stable. Level ${user.level} achieved. What's next?`
    ]
    
    setTimeout(() => {
      setMessage(greetings[Math.floor(Math.random() * greetings.length)])
      setIsOpen(true)
      setMood("HAPPY")
    }, 2000)
  }, [user.name, user.level])

  return (
    <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-4">
      {/* Speech Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 max-w-xs p-6 rounded-[32px] bg-card/80 backdrop-blur-2xl border border-border/50 shadow-2xl relative"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[10px] font-black text-electric-blue uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> Neural Insight
              </div>
              <p className="text-sm font-medium leading-relaxed italic">"{message}"</p>
              <div className="flex gap-2 pt-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black">
                  <Zap className="w-2.5 h-2.5 text-amber-500" /> SYNC 100%
                </div>
              </div>
            </div>
            {/* Tail */}
            <div className="absolute -bottom-2 right-12 w-4 h-4 bg-card/80 border-r border-b border-border/50 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Avatar Character */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-24 h-24 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center group overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-linear-to-b from-electric-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <NeuralOrb size={1.2} mood={mood} interactive={false} className="w-32 h-32" />
        
        {/* Status Ring */}
        <div className="absolute inset-0 border-2 border-electric-blue/20 rounded-full animate-spin-slow" />
      </motion.button>
    </div>
  )
}
