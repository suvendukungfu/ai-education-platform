"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowRight, Brain, Target, Zap, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export function OnboardingModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    const hasOnboarded = localStorage.getItem("axion_onboarded")
    if (!hasOnboarded) {
      setOpen(true)
    }
  }, [])

  const handleFinish = () => {
    localStorage.setItem("axion_onboarded", "true")
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00d4ff', '#9d50bb', '#ffffff']
    })
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            className="max-w-xl w-full bg-card/60 border border-white/10 rounded-[48px] p-12 text-center space-y-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-electric-blue to-violet-glow" />
            <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-electric-blue to-violet-glow mx-auto flex items-center justify-center shadow-lg">
               <Brain className="w-12 h-12 text-black" />
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-black tracking-tighter">Initialize Your Neural Link.</h2>
              <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                Welcome to Axion. We've detected high cognitive potential. Select your primary objective to calibrate the AI engine.
              </p>
            </div>
            <div className="grid gap-3">
               {["Build AI Engineering Mastery", "Design Advanced Neural Systems", "Lead Strategic AI Initiatives"].map((goal) => (
                  <button key={goal} onClick={() => setStep(2)} className="p-5 rounded-[24px] bg-white/5 border border-white/10 hover:border-electric-blue/50 text-left font-bold transition-all hover:bg-white/10 flex items-center justify-between group">
                     {goal} <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
               ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-w-xl w-full bg-card/60 border border-white/10 rounded-[48px] p-12 text-center space-y-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-violet-glow to-electric-blue" />
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-amber-400 to-orange-600 mx-auto flex items-center justify-center shadow-lg animate-bounce">
               <Trophy className="w-12 h-12 text-black" />
            </div>
            <div className="space-y-4">
              <div className="text-amber-500 font-black uppercase tracking-[0.3em] text-[10px]">Sync Reward Unlocked</div>
              <h2 className="text-5xl font-black tracking-tighter">Your First Win.</h2>
              <div className="text-3xl font-black text-white italic">+100 XP <span className="text-muted-foreground not-italic font-medium text-sm">Synchronized</span></div>
              <p className="text-muted-foreground font-medium text-lg">
                Your neural roadmap is now live. You are officially part of the Axion network. 
              </p>
            </div>
            <Button size="lg" className="w-full h-18 rounded-full bg-electric-blue text-black font-black hover:bg-white transition-colors text-xl shadow-xl shadow-electric-blue/20" onClick={handleFinish}>
               ENTER NEURAL HUB
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
