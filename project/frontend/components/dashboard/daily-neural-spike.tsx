"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Check, ArrowRight, Trophy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { awardXP } from "@/lib/actions/award-xp"
import confetti from "canvas-confetti"

export function DailyNeuralSpike() {
  const [completed, setCompleted] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    const lastDaily = localStorage.getItem("axion_daily_spike")
    const today = new Date().toDateString()
    if (lastDaily === today) {
      setCompleted(true)
    }
  }, [])

  const handleClaim = async () => {
    setIsSyncing(true)
    try {
      await awardXP(50) // awarding 50 XP
      localStorage.setItem("axion_daily_spike", new Date().toDateString())
      setCompleted(true)
      confetti({
        particleCount: 100,
        spread: 60,
        colors: ['#00d4ff', '#ffffff']
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="p-8 rounded-[40px] bg-linear-to-br from-electric-blue/20 to-violet-glow/20 border border-electric-blue/30 shadow-2xl relative overflow-hidden group">
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-electric-blue/20 rounded-full blur-[80px]" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-6">
          <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-lg transition-all duration-500 ${
            completed ? "bg-green-500 text-black rotate-360" : "bg-electric-blue text-black animate-pulse"
          }`}>
             {completed ? <Check className="w-8 h-8" /> : <Zap className="w-8 h-8" />}
          </div>
          <div className="space-y-1">
             <div className="text-[10px] font-black uppercase tracking-[0.3em] text-electric-blue">Daily Neural Spike</div>
             <h3 className="text-2xl font-black italic tracking-tighter">Sync Your Consciousness.</h3>
             <p className="text-muted-foreground text-xs font-medium">Claim your daily +50 XP and stabilize your neural link.</p>
          </div>
        </div>

        <Button 
          onClick={handleClaim}
          disabled={completed || isSyncing}
          className={`h-14 px-8 rounded-full font-black text-sm transition-all shadow-xl hover:scale-105 active:scale-95 ${
            completed 
              ? "bg-white/5 border border-white/10 text-muted-foreground italic" 
              : "bg-electric-blue text-black hover:bg-white shadow-electric-blue/20"
          }`}
        >
          {completed ? "LINK STABILIZED" : isSyncing ? "SYNCING..." : "ACTIVATE SPIKE"}
          {!completed && !isSyncing && <Sparkles className="ml-2 w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}
