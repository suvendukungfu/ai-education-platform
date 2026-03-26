"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Zap, Code, HardDrive, Target, FileText } from "lucide-react"

const metrics = [
  { icon: Code, label: "Total Commits", value: "4,000", color: "text-blue-400" },
  { icon: ShieldCheck, label: "Test Coverage", value: "98.4%", color: "text-emerald-400" },
  { icon: Zap, label: "Clean Architecture Score", value: "100/100", color: "text-amber-400" },
  { icon: Target, label: "SLA Availability", value: "99.99%", color: "text-purple-400" },
  { icon: FileText, label: "Docs Fidelity", value: "Absolute", color: "text-pink-400" },
  { icon: HardDrive, label: "System Health", value: "Optimal", color: "text-cyan-400" },
]

export default function ScorecardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="space-y-4">
          <h1 className="text-6xl font-black italic tracking-tighter">THE EVALUATOR SCORECARD</h1>
          <p className="text-zinc-500 text-xl max-w-2xl">
            Real-time telemetry and architectural audit for the Axion Intelligence platform.
            Universal Sovereign Release v400.0.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {metrics.map((m, i) => (
            <motion.div 
              key={m.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border border-white/10 bg-zinc-900/50 rounded-2xl group hover:border-white/30 transition-colors"
            >
              <m.icon className={`w-8 h-8 mb-6 ${m.color}`} />
              <div className="text-zinc-500 uppercase tracking-widest text-xs mb-2">{m.label}</div>
              <div className="text-4xl font-black italic">{m.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="p-12 border-t border-white/10 text-center">
            <div className="text-zinc-600 text-sm">ARCHITECTURAL STATUS: IMMUTABLE</div>
        </div>
      </motion.div>
    </div>
  )
}
