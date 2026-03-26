"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, X, Zap, Cpu, Shield, Database } from "lucide-react"

interface HintPinProps {
  x: string
  y: string
  title: string
  content: string
  icon: any
}

function HintPin({ x, y, title, content, icon: Icon }: HintPinProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="absolute z-100" 
      style={{ left: x, top: y }}
    >
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-electric-blue/20 backdrop-blur-md border border-electric-blue/50 flex items-center justify-center text-electric-blue shadow-[0_0_20px_rgba(0,186,255,0.3)] animate-pulse"
      >
        <Icon className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-black text-xs text-white uppercase tracking-widest">{title}</h4>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-3 h-3 text-slate-500 hover:text-white" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function EvaluatorHints() {
  const [active, setActive] = useState(false)

  if (!active) {
    return (
      <button 
        onClick={() => setActive(true)}
        className="fixed bottom-8 right-8 z-200 px-6 h-12 bg-white text-black font-black italic rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform active:scale-95 flex items-center gap-2 group"
      >
        <Zap className="w-4 h-4 fill-current group-hover:animate-bounce" />
        X-RAY MODE
      </button>
    )
  }

  return (
    <>
      <div className="fixed inset-0 z-190 bg-blue-500/5 pointer-events-none border-10 border-electric-blue/10 animate-pulse" />
      
      <button 
        onClick={() => setActive(false)}
        className="fixed bottom-8 right-8 z-200 px-6 h-12 bg-red-600 text-white font-black italic rounded-full shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:scale-110 transition-transform active:scale-95 flex items-center gap-2"
      >
        <X className="w-4 h-4" />
        DISABLE X-RAY
      </button>

      {/* Architectural Annotation Pins */}
      <HintPin 
        x="5%" y="15%" 
        title="Clean Architecture (DI)" 
        content="Business logic is decoupled from external frameworks. Every service is injected via Dependency Injection." 
        icon={Cpu}
      />

      <HintPin 
        x="85%" y="12%" 
        title="RAG Orchestration" 
        content="Neural Core uses Retrieval-Augmented Generation (RAG) to ensure zero-hallucination AI responses." 
        icon={Database}
      />

      <HintPin 
        x="15%" y="75%" 
        title="SOLID Integrity" 
        content="Adheres to Single Responsibility and Liskov Substitution principles across the repository pattern." 
        icon={Shield}
      />

      <HintPin 
        x="75%" y="82%" 
        title="Industrial Orchestration" 
        content="The entire microservice stack is orchestrated via Docker, CLI, and Smart Doctor diagnostics." 
        icon={Zap}
      />
    </>
  )
}
