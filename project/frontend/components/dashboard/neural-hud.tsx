"use client"

import { motion } from "framer-motion"
import { Activity, Cpu, Database, Wifi, Gauge } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export function NeuralHUD() {
  const [syncStatus, setSyncStatus] = useState(94)
  const [fps, setFps] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    const updateStats = () => {
      const now = performance.now()
      frameCount.current++
      
      if (now - lastTime.current >= 1000) {
        setFps(frameCount.current)
        frameCount.current = 0
        lastTime.current = now
      }
      
      requestAnimationFrame(updateStats)
    }

    const statInterval = setInterval(() => {
      setSyncStatus(prev => {
        const diff = Math.random() * 2 - 1
        return Math.min(100, Math.max(85, prev + diff))
      })
    }, 3000)

    const frameId = requestAnimationFrame(updateStats)
    
    return () => {
      cancelAnimationFrame(frameId)
      clearInterval(statInterval)
    }
  }, [])

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed bottom-8 right-8 z-100 hidden xl:flex flex-col gap-2"
    >
      {/* Primary Sync HUD */}
      <div className="bg-black/80 backdrop-blur-3xl border border-white/20 rounded-2xl p-5 shadow-2xl flex items-center gap-5 group hover:border-electric-blue/50 transition-all duration-500 scale-105 origin-bottom-right">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-electric-blue/20 flex items-center justify-center">
            <Activity className="w-6 h-6 text-electric-blue animate-pulse" />
          </div>
          <svg className="absolute inset-0 w-12 h-12 -rotate-90">
             <circle 
               cx="24" cy="24" r="22" 
               stroke="currentColor" 
               strokeWidth="3" 
               fill="transparent" 
               className="text-electric-blue/10"
             />
             <circle 
               cx="24" cy="24" r="22" 
               stroke="currentColor" 
               strokeWidth="3" 
               fill="transparent" 
               strokeDasharray={138}
               strokeDashoffset={138 - (138 * syncStatus) / 100}
               className="text-electric-blue transition-all duration-1000"
             />
          </svg>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-electric-blue/80">Neural Connectivity</div>
            <div className={`w-1.5 h-1.5 rounded-full ${syncStatus > 90 ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
          </div>
          <div className="text-2xl font-black italic tracking-tighter text-white">
            {syncStatus.toFixed(1)}% <span className="text-[10px] text-muted-foreground not-italic uppercase tracking-widest ml-1">STABLE</span>
          </div>
        </div>
      </div>

      {/* Advanced Telemetry Tray */}
      <div className="grid grid-cols-4 gap-2">
         {[
           { icon: Gauge, label: "FPS", val: `${fps}`, color: "text-emerald-400" },
           { icon: Cpu, label: "Load", val: "Optimal", color: "text-electric-blue" },
           { icon: Database, label: "Mem", val: "244MB", color: "text-violet-glow" },
           { icon: Wifi, label: "Lat", val: "5.2ms", color: "text-pink-400" }
         ].map((stat, i) => (
           <div key={i} className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 group/stat hover:border-white/30 hover:bg-black/90 transition-all cursor-crosshair">
              <stat.icon className={`w-3.5 h-3.5 ${stat.color} group-hover/stat:scale-110 transition-transform`} />
              <div className="text-[9px] font-black text-white">{stat.val}</div>
           </div>
         ))}
      </div>
    </motion.div>
  )
}
