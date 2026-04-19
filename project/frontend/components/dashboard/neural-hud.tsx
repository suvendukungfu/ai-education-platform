"use client"

import { motion } from "framer-motion"
import { Activity, Cpu, Database, Wifi } from "lucide-react"
import { useEffect, useState } from "react"

export function NeuralHUD() {
  const [syncStatus, setSyncStatus] = useState(94)

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncStatus(prev => {
        const diff = Math.random() * 2 - 1
        return Math.min(100, Math.max(85, prev + diff))
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed bottom-8 right-8 z-100 hidden xl:flex flex-col gap-2"
    >
      <div className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 group hover:border-electric-blue/50 transition-all duration-500">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-electric-blue/20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-electric-blue animate-pulse" />
          </div>
          <svg className="absolute inset-0 w-10 h-10 -rotate-90">
             <circle 
               cx="20" cy="20" r="18" 
               stroke="currentColor" 
               strokeWidth="2" 
               fill="transparent" 
               className="text-electric-blue/10"
             />
             <circle 
               cx="20" cy="20" r="18" 
               stroke="currentColor" 
               strokeWidth="2" 
               fill="transparent" 
               strokeDasharray={113}
               strokeDashoffset={113 - (113 * syncStatus) / 100}
               className="text-electric-blue transition-all duration-1000"
             />
          </svg>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-electric-blue">Neural Sync Status</div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div className="text-xl font-black italic tracking-tighter">
            {syncStatus.toFixed(1)}% <span className="text-[10px] text-muted-foreground not-italic uppercase tracking-widest ml-1">STABLE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
         {[
           { icon: Cpu, label: "Core", val: "Optimal" },
           { icon: Database, label: "Nodes", val: "128/128" },
           { icon: Wifi, label: "Link", val: "5.2ms" }
         ].map((stat, i) => (
           <div key={i} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-2 flex flex-col items-center justify-center gap-1 group/stat hover:border-electric-blue/30 transition-all cursor-crosshair">
              <stat.icon className="w-3 h-3 text-muted-foreground group-hover/stat:text-electric-blue transition-colors" />
              <div className="text-[8px] font-black uppercase text-muted-foreground/60">{stat.label}</div>
           </div>
         ))}
      </div>
    </motion.div>
  )
}
